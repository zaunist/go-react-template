#!/bin/bash
set -euo pipefail

# Postmortem AI Analysis Script
# 支持三种模式: onboarding, pre-release, post-release

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
POSTMORTEM_DIR="./postmortem"
TEMPLATE_FILE="${POSTMORTEM_DIR}/TEMPLATE.md"

# 环境变量检查
check_env() {
    if [[ -z "${OPENAI_API_KEY:-}" ]]; then
        echo -e "${RED}Error: OPENAI_API_KEY is not set${NC}"
        exit 1
    fi

    OPENAI_BASE_URL="${OPENAI_BASE_URL:-https://api.openai.com}"
    # 确保 URL 以 /v1 结尾
    OPENAI_BASE_URL="${OPENAI_BASE_URL%/}"  # 移除尾部斜杠
    if [[ ! "$OPENAI_BASE_URL" =~ /v1$ ]]; then
        OPENAI_BASE_URL="${OPENAI_BASE_URL}/v1"
    fi
    OPENAI_MODEL="${OPENAI_MODEL:-claude-sonnet-4-5}"
}

# 调用 AI API
call_ai() {
    local prompt="$1"
    local system_prompt="$2"

    local response
    response=$(curl -s "${OPENAI_BASE_URL}/chat/completions" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${OPENAI_API_KEY}" \
        -d "$(jq -n \
            --arg model "$OPENAI_MODEL" \
            --arg system "$system_prompt" \
            --arg user "$prompt" \
            '{
                model: $model,
                messages: [
                    {role: "system", content: $system},
                    {role: "user", content: $user}
                ],
                temperature: 0.3
            }')")

    echo "$response" | jq -r '.choices[0].message.content // empty'
}

# 获取 fix commits
get_fix_commits() {
    local since="${1:-}"
    local until="${2:-}"

    local git_args=("log" "--oneline" "--grep=^fix" "-i")

    if [[ -n "$since" ]]; then
        git_args+=("--since=$since")
    fi
    if [[ -n "$until" ]]; then
        git_args+=("--until=$until")
    fi

    git "${git_args[@]}" 2>/dev/null || true
}

# 获取 commit 详情
get_commit_details() {
    local commit_hash="$1"

    echo "=== Commit: $commit_hash ==="
    git show --stat "$commit_hash"
    echo ""
    echo "=== Diff ==="
    git diff-tree -p "$commit_hash"
}

# 生成 postmortem ID
generate_pm_id() {
    local date_part
    date_part=$(date +%Y%m%d)
    local count
    count=$(find "$POSTMORTEM_DIR" -name "PM-${date_part}-*.md" 2>/dev/null | wc -l | tr -d ' ')
    printf "PM-%s-%03d" "$date_part" "$((count + 1))"
}

# 获取现有 postmortem 摘要
get_existing_postmortems() {
    local summaries=""

    for file in "$POSTMORTEM_DIR"/PM-*.md; do
        if [[ -f "$file" ]]; then
            local filename
            filename=$(basename "$file")
            local title
            title=$(head -1 "$file" | sed 's/^# Postmortem: //')
            local keywords
            keywords=$(grep -A 10 "### 关键词" "$file" 2>/dev/null | grep "^- " | head -5 || true)
            local patterns
            patterns=$(sed -n '/### 代码模式/,/### 关键词/p' "$file" 2>/dev/null | grep -v "^###" | head -10 || true)

            summaries+="
---
File: $filename
Title: $title
Keywords: $keywords
Patterns: $patterns
"
        fi
    done

    echo "$summaries"
}

# 模式1: Onboarding - 分析所有历史 fix commits
mode_onboarding() {
    echo -e "${BLUE}=== Postmortem Onboarding ===${NC}"
    echo "Analyzing all historical fix commits..."

    local fix_commits
    fix_commits=$(get_fix_commits)

    if [[ -z "$fix_commits" ]]; then
        echo -e "${YELLOW}No fix commits found in history${NC}"
        exit 0
    fi

    local commit_count
    commit_count=$(echo "$fix_commits" | wc -l | tr -d ' ')
    echo -e "${GREEN}Found $commit_count fix commits${NC}"

    # 逐个处理 fix commit
    while IFS= read -r line; do
        local commit_hash
        commit_hash=$(echo "$line" | awk '{print $1}')
        local commit_msg
        commit_msg=$(echo "$line" | cut -d' ' -f2-)

        echo -e "\n${YELLOW}Processing: $commit_hash - $commit_msg${NC}"

        # 检查是否已存在该 commit 的 postmortem
        if grep -r "$commit_hash" "$POSTMORTEM_DIR"/*.md 2>/dev/null | grep -q .; then
            echo -e "${BLUE}Skipping: Postmortem already exists for this commit${NC}"
            continue
        fi

        local commit_details
        commit_details=$(get_commit_details "$commit_hash")

        local pm_id
        pm_id=$(generate_pm_id)

        local system_prompt="你是一个专业的软件工程师，擅长编写详尽的 Postmortem 报告。
你需要分析 git commit 信息，生成结构化的 Postmortem 文档。
输出必须是纯 Markdown 格式，遵循提供的模板结构。
使用中文编写，但技术术语保持英文。"

        local user_prompt="请根据以下 git commit 信息生成一份 Postmortem 报告。

Commit 信息:
$commit_details

模板结构:
$(cat "$TEMPLATE_FILE")

要求:
1. Bug ID 使用: $pm_id
2. 根据 diff 分析根本原因
3. 提取可用于未来检测的代码模式和关键词
4. 如果信息不足，基于代码变更做合理推断
5. 直接输出 Markdown 内容，不要包含代码块标记"

        local postmortem
        postmortem=$(call_ai "$user_prompt" "$system_prompt")

        if [[ -n "$postmortem" ]]; then
            local filename="${POSTMORTEM_DIR}/${pm_id}.md"
            echo "$postmortem" > "$filename"
            echo -e "${GREEN}Created: $filename${NC}"
        else
            echo -e "${RED}Failed to generate postmortem for $commit_hash${NC}"
        fi

        # 避免 API 限流
        sleep 2
    done <<< "$fix_commits"

    echo -e "\n${GREEN}=== Onboarding Complete ===${NC}"
}

# 模式2: Pre-release - 检查当前 commits 是否触发已知问题
mode_pre_release() {
    local base_ref="${1:-origin/main}"
    local head_ref="${2:-HEAD}"

    echo -e "${BLUE}=== Pre-release Check ===${NC}"
    echo "Comparing $base_ref...$head_ref"

    # 获取待发布的 commits
    local commits_diff
    commits_diff=$(git log --oneline "$base_ref".."$head_ref" 2>/dev/null || true)

    if [[ -z "$commits_diff" ]]; then
        echo -e "${YELLOW}No new commits to check${NC}"
        exit 0
    fi

    # 获取所有变更的文件内容
    local changed_files
    changed_files=$(git diff --name-only "$base_ref".."$head_ref" 2>/dev/null || true)

    local diff_content
    diff_content=$(git diff "$base_ref".."$head_ref" 2>/dev/null || true)

    # 获取现有 postmortem 摘要
    local existing_postmortems
    existing_postmortems=$(get_existing_postmortems)

    if [[ -z "$existing_postmortems" ]]; then
        echo -e "${YELLOW}No existing postmortems to check against${NC}"
        exit 0
    fi

    local system_prompt="你是一个代码审查专家，负责检查新代码是否可能重复历史上已修复的 bug。
你需要对比新的代码变更和历史 Postmortem 记录，识别潜在的风险。
输出 JSON 格式的分析结果。"

    local user_prompt="请分析以下代码变更是否可能触发历史上已记录的问题。

## 待发布的 Commits:
$commits_diff

## 代码变更 (Diff):
$diff_content

## 历史 Postmortem 记录:
$existing_postmortems

请输出 JSON 格式的分析结果:
{
  \"risk_level\": \"high|medium|low|none\",
  \"issues\": [
    {
      \"postmortem_id\": \"PM-xxx\",
      \"risk_description\": \"描述为什么这个变更可能触发该问题\",
      \"affected_files\": [\"file1.go\", \"file2.ts\"],
      \"recommendation\": \"建议的修复或检查方式\"
    }
  ],
  \"summary\": \"总体评估摘要\"
}

如果没有发现风险，issues 数组为空，risk_level 为 none。"

    echo "Analyzing with AI..."
    local result
    result=$(call_ai "$user_prompt" "$system_prompt")

    if [[ -z "$result" ]]; then
        echo -e "${RED}Failed to get AI analysis${NC}"
        exit 1
    fi

    # 解析结果
    local risk_level
    risk_level=$(echo "$result" | jq -r '.risk_level // "unknown"' 2>/dev/null || echo "unknown")

    echo -e "\n${BLUE}=== Analysis Result ===${NC}"
    echo "$result" | jq '.' 2>/dev/null || echo "$result"

    case "$risk_level" in
        "high")
            echo -e "\n${RED}HIGH RISK DETECTED - Release blocked${NC}"
            exit 1
            ;;
        "medium")
            echo -e "\n${YELLOW}MEDIUM RISK - Review recommended${NC}"
            exit 1
            ;;
        "low")
            echo -e "\n${YELLOW}LOW RISK - Proceed with caution${NC}"
            exit 0
            ;;
        "none")
            echo -e "\n${GREEN}NO RISK - Safe to release${NC}"
            exit 0
            ;;
        *)
            echo -e "\n${YELLOW}Unable to determine risk level${NC}"
            exit 1
            ;;
    esac
}

# 模式3: Post-release - 为新的 fix commits 生成 postmortem
mode_post_release() {
    local previous_tag="${1:-}"
    local current_tag="${2:-}"

    echo -e "${BLUE}=== Post-release Postmortem Generation ===${NC}"

    local git_range=""
    if [[ -n "$previous_tag" && -n "$current_tag" ]]; then
        git_range="${previous_tag}..${current_tag}"
        echo "Analyzing fix commits between $previous_tag and $current_tag"
    else
        echo "Analyzing recent fix commits"
    fi

    # 获取 fix commits
    local fix_commits
    if [[ -n "$git_range" ]]; then
        fix_commits=$(git log --oneline --grep="^fix" -i "$git_range" 2>/dev/null || true)
    else
        fix_commits=$(get_fix_commits)
    fi

    if [[ -z "$fix_commits" ]]; then
        echo -e "${YELLOW}No fix commits found in this release${NC}"
        exit 0
    fi

    local commit_count
    commit_count=$(echo "$fix_commits" | wc -l | tr -d ' ')
    echo -e "${GREEN}Found $commit_count fix commits${NC}"

    # 获取现有 postmortem 用于去重和关联
    local existing_postmortems
    existing_postmortems=$(get_existing_postmortems)

    while IFS= read -r line; do
        local commit_hash
        commit_hash=$(echo "$line" | awk '{print $1}')
        local commit_msg
        commit_msg=$(echo "$line" | cut -d' ' -f2-)

        echo -e "\n${YELLOW}Processing: $commit_hash - $commit_msg${NC}"

        # 检查是否已存在
        if grep -r "$commit_hash" "$POSTMORTEM_DIR"/*.md 2>/dev/null | grep -q .; then
            echo -e "${BLUE}Skipping: Postmortem already exists${NC}"
            continue
        fi

        local commit_details
        commit_details=$(get_commit_details "$commit_hash")

        local pm_id
        pm_id=$(generate_pm_id)

        local system_prompt="你是一个专业的软件工程师，擅长编写详尽的 Postmortem 报告。
分析 git commit 生成结构化的 Postmortem 文档。
如果发现与现有 Postmortem 相关，请在报告中引用。
输出纯 Markdown 格式，使用中文，技术术语保持英文。"

        local user_prompt="请根据以下信息生成 Postmortem 报告。

## Commit 信息:
$commit_details

## 现有 Postmortem 记录 (用于关联):
$existing_postmortems

## 模板:
$(cat "$TEMPLATE_FILE")

要求:
1. Bug ID: $pm_id
2. 深入分析根本原因
3. 提取检测模式和关键词
4. 如果与现有 Postmortem 相关，在"相关链接"中引用
5. 直接输出 Markdown，不要代码块标记"

        local postmortem
        postmortem=$(call_ai "$user_prompt" "$system_prompt")

        if [[ -n "$postmortem" ]]; then
            local filename="${POSTMORTEM_DIR}/${pm_id}.md"
            echo "$postmortem" > "$filename"
            echo -e "${GREEN}Created: $filename${NC}"
        else
            echo -e "${RED}Failed to generate postmortem${NC}"
        fi

        sleep 2
    done <<< "$fix_commits"

    echo -e "\n${GREEN}=== Post-release Complete ===${NC}"
}

# 显示帮助
show_help() {
    cat << EOF
Postmortem AI Analysis Tool

Usage: $0 <mode> [options]

Modes:
  onboarding              Analyze all historical fix commits
  pre-release [base] [head]   Check if commits may trigger known issues
                          Default: origin/main...HEAD
  post-release [prev] [curr]  Generate postmortems for fix commits in release
                          If tags provided, analyzes commits between them

Environment Variables:
  OPENAI_API_KEY    (Required) API key for OpenAI-compatible service
  OPENAI_BASE_URL   (Optional) API base URL, default: https://api.openai.com/v1
  OPENAI_MODEL      (Optional) Model to use, default: gpt-4o

Examples:
  $0 onboarding
  $0 pre-release origin/main HEAD
  $0 post-release v1.0.0 v1.1.0
EOF
}

# 主入口
main() {
    local mode="${1:-}"

    if [[ -z "$mode" || "$mode" == "-h" || "$mode" == "--help" ]]; then
        show_help
        exit 0
    fi

    check_env

    # 确保 postmortem 目录存在
    mkdir -p "$POSTMORTEM_DIR"

    case "$mode" in
        onboarding)
            mode_onboarding
            ;;
        pre-release)
            mode_pre_release "${2:-origin/main}" "${3:-HEAD}"
            ;;
        post-release)
            mode_post_release "${2:-}" "${3:-}"
            ;;
        *)
            echo -e "${RED}Unknown mode: $mode${NC}"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
