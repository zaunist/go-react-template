#!/bin/bash

# Go + React 全栈项目构建脚本
# 构建前端静态文件并打包成单一二进制程序

set -e  # 遇到错误立即退出

echo "🚀 开始构建 Go + React 全栈项目..."

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "📁 项目根目录: $PROJECT_ROOT"

# 清理之前的构建文件
echo "🧹 清理之前的构建文件..."
rm -rf "$PROJECT_ROOT/web/dist"
rm -rf "$PROJECT_ROOT/static"
rm -f "$PROJECT_ROOT/server"

# 构建前端
echo "🔨 构建前端 React 项目..."
cd "$PROJECT_ROOT/web"
bun run build

if [ ! -d "dist" ]; then
    echo "❌ 前端构建失败，dist 目录不存在"
    exit 1
fi

echo "✅ 前端构建完成"

# 将前端构建文件复制到后端静态文件目录
echo "📦 复制前端静态文件到后端..."
cd "$PROJECT_ROOT"
mkdir -p static
cp -r web/dist/* static/

echo "✅ 静态文件复制完成"

# 代码质量检查
echo "🔍 运行代码质量检查..."
if command -v golangci-lint >/dev/null 2>&1; then
    echo "📋 运行 golangci-lint 检查..."
    golangci-lint run
    if [ $? -eq 0 ]; then
        echo "✅ 代码质量检查通过"
    else
        echo "❌ 代码质量检查失败，请修复问题后重新构建"
        exit 1
    fi
else
    echo "⚠️  golangci-lint 未安装，跳过代码质量检查"
    echo "   安装方式: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"
fi

# 构建后端 Go 程序
echo "🔨 构建后端 Go 程序..."
# go-sqlite3 需要 CGO 支持
CGO_ENABLED=1 go build -o server main.go

if [ ! -f "server" ]; then
    echo "❌ 后端构建失败"
    exit 1
fi

echo "✅ 后端构建完成"

# 显示构建结果
echo ""
echo "🎉 构建完成！"
echo "📊 构建结果:"
echo "   - 可执行文件: $PROJECT_ROOT/server"
echo "   - 静态文件目录: $PROJECT_ROOT/static/"
echo "   - 文件大小: $(du -h server | cut -f1)"
echo ""
echo "🚀 运行方式:"
echo "   ./server"
echo ""
echo "🌐 访问地址:"
echo "   http://localhost:1323"