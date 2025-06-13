# golangci-lint 代码质量检查

本项目集成了 [golangci-lint](https://golangci-lint.run/) 来确保 Go 代码质量和一致性。

## 📋 目录

- [安装](#安装)
- [使用方法](#使用方法)
- [配置说明](#配置说明)
- [IDE 集成](#ide-集成)
- [CI/CD 集成](#cicd-集成)
- [常见问题](#常见问题)
- [规则说明](#规则说明)

## 🔧 安装

### 方式 1: Go Install（推荐）

```bash
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

### 方式 2: Homebrew (macOS)

```bash
brew install golangci-lint
```

### 方式 3: 脚本安装

```bash
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.55.2
```

### 验证安装

```bash
golangci-lint version
```

## 🚀 使用方法

### 基本命令

```bash
# 运行所有检查
golangci-lint run

# 自动修复可修复的问题
golangci-lint run --fix

# 只检查新的或修改的代码
golangci-lint run --new

# 指定配置文件
golangci-lint run -c .golangci.yml

# 输出 JSON 格式结果
golangci-lint run --out-format json
```

### 项目脚本

```bash
# 使用项目提供的脚本
./scripts/lint.sh

# 使用 Makefile
make lint-go          # 只检查 Go 代码
make lint             # 检查所有代码（Go + 前端）
make fix-go           # 自动修复 Go 代码
make fix              # 自动修复所有代码
```

### 构建时检查

项目的构建脚本 `scripts/build.sh` 已经集成了 golangci-lint 检查：

```bash
./scripts/build.sh    # 构建前会自动运行代码检查
```

## ⚙️ 配置说明

项目的 golangci-lint 配置文件位于 `.golangci.yml`，主要配置包括：

### 启用的 Linters

| Linter | 说明 |
|--------|------|
| `errcheck` | 检查未处理的错误 |
| `gosimple` | 简化代码建议 |
| `govet` | Go 官方 vet 工具 |
| `ineffassign` | 检查无效赋值 |
| `staticcheck` | 静态分析工具 |
| `unused` | 检查未使用的代码 |
| `gofmt` | 检查代码格式 |
| `goimports` | 检查 import 格式 |
| `misspell` | 检查拼写错误 |
| `gocritic` | Go 代码审查工具 |
| `gocyclo` | 检查圈复杂度 |
| `gosec` | 安全检查 |
| `revive` | 快速、可配置的 Go linter |

### 重要配置项

```yaml
# 超时时间
run:
  timeout: 5m
  
# 圈复杂度阈值
linters-settings:
  gocyclo:
    min-complexity: 15
    
# 重复代码检查
  dupl:
    threshold: 100
```

### 排除规则

- 测试文件排除某些严格检查
- 生成的 `.pb.go` 文件排除格式检查
- 排除常见的误报

## 🔌 IDE 集成

### VS Code

项目已配置 VS Code 设置（`.vscode/settings.json`）：

```json
{
  "go.lintTool": "golangci-lint",
  "go.lintOnSave": "package",
  "go.lintFlags": ["--fast"]
}
```

### VS Code 任务

使用 `Ctrl+Shift+P` 打开命令面板，搜索 "Tasks: Run Task"：

- `Go: Lint` - 运行代码检查
- `Go: Lint Fix` - 自动修复问题
- `Project: Lint All` - 检查所有代码

### GoLand/IntelliJ IDEA

1. 打开 `Settings` → `Tools` → `Go Tools` → `Go Linter`
2. 选择 `golangci-lint`
3. 设置配置文件路径为 `.golangci.yml`

## 🔄 CI/CD 集成

### GitHub Actions

项目的 CI 流程（`.github/workflows/ci.yml`）包含：

```yaml
- name: Run golangci-lint
  uses: golangci/golangci-lint-action@v6
  with:
    version: latest
    args: --timeout=5m
```

### 本地 Git Hooks

可以设置 pre-commit hook：

```bash
# .git/hooks/pre-commit
#!/bin/bash
echo "Running golangci-lint..."
golangci-lint run
if [ $? -ne 0 ]; then
    echo "golangci-lint failed. Commit aborted."
    exit 1
fi
```

## 🐛 常见问题

### 1. 安装问题

**问题**: `golangci-lint: command not found`

**解决**:
```bash
# 确保 GOPATH/bin 在 PATH 中
export PATH=$PATH:$(go env GOPATH)/bin

# 或重新安装
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

### 2. 性能问题

**问题**: 检查速度慢

**解决**:
```bash
# 使用 --fast 模式
golangci-lint run --fast

# 或只检查修改的文件
golangci-lint run --new
```

### 3. 误报问题

**问题**: 某些检查结果不合理

**解决**: 在 `.golangci.yml` 中添加排除规则：

```yaml
issues:
  exclude-rules:
    - path: _test\.go
      linters:
        - gocyclo
```

### 4. 配置问题

**问题**: 配置不生效

**解决**:
```bash
# 验证配置文件
golangci-lint config

# 指定配置文件
golangci-lint run -c .golangci.yml
```

## 📚 规则说明

### 错误处理

```go
// ❌ 错误：未检查错误
file, _ := os.Open("file.txt")

// ✅ 正确：检查错误
file, err := os.Open("file.txt")
if err != nil {
    return err
}
```

### 代码格式

```go
// ❌ 错误：格式不规范
func main( ){
if true{
fmt.Println("hello" )
}
}

// ✅ 正确：使用 gofmt
func main() {
    if true {
        fmt.Println("hello")
    }
}
```

### 未使用的变量

```go
// ❌ 错误：未使用的变量
func example() {
    unused := "value"
    fmt.Println("hello")
}

// ✅ 正确：移除未使用的变量
func example() {
    fmt.Println("hello")
}
```

### 圈复杂度

```go
// ❌ 错误：复杂度过高
func complexFunction(x int) string {
    if x > 10 {
        if x > 20 {
            if x > 30 {
                // 嵌套过深
            }
        }
    }
    return ""
}

// ✅ 正确：拆分函数
func simpleFunction(x int) string {
    if x <= 10 {
        return handleSmall(x)
    }
    return handleLarge(x)
}
```

## 🔗 相关链接

- [golangci-lint 官方文档](https://golangci-lint.run/)
- [配置参考](https://golangci-lint.run/usage/configuration/)
- [Linters 列表](https://golangci-lint.run/usage/linters/)
- [GitHub Action](https://github.com/golangci/golangci-lint-action)

## 📝 更新日志

- **v1.0.0** - 初始配置，启用基础 linters
- **v1.1.0** - 添加安全检查和代码质量检查
- **v1.2.0** - 集成 CI/CD 和 IDE 支持