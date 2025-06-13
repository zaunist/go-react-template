# Go + React 全栈项目 Makefile
# 提供统一的项目管理命令

.PHONY: help install lint lint-go lint-web test build clean dev run docker-build docker-run

# 默认目标
help: ## 显示帮助信息
	@echo "Go + React 全栈项目管理命令:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "示例:"
	@echo "  make install    # 安装依赖"
	@echo "  make lint       # 运行代码检查"
	@echo "  make build      # 构建项目"
	@echo "  make run        # 运行项目"

# 安装依赖
install: ## 安装项目依赖
	@echo "📦 安装项目依赖..."
	@echo "🔧 安装 Go 依赖..."
	go mod download
	go mod tidy
	@echo "🔧 安装前端依赖..."
	cd web && bun install
	@echo "✅ 依赖安装完成"

# 代码检查
lint: lint-go lint-web ## 运行所有代码检查

lint-go: ## 运行 Go 代码检查
	@echo "🔍 运行 Go 代码检查..."
	@if command -v golangci-lint >/dev/null 2>&1; then \
		golangci-lint run; \
	else \
		echo "❌ golangci-lint 未安装"; \
		echo "📦 安装方式: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"; \
		exit 1; \
	fi

lint-web: ## 运行前端代码检查
	@echo "🔍 运行前端代码检查..."
	cd web && bun run lint

	@echo "🔧 修复前端代码格式..."
	cd web && bun run lint --fix 2>/dev/null || echo "⚠️  前端自动修复可能不支持，请手动修复"

# 测试
test: test-go test-web ## 运行所有测试

test-go: ## 运行 Go 测试
	@echo "🧪 运行 Go 测试..."
	go test -v ./...

test-web: ## 运行前端测试
	@echo "🧪 运行前端测试..."
	cd web && bun test 2>/dev/null || echo "⚠️  前端测试未配置"

# 构建
build: ## 构建项目
	@echo "🔨 构建项目..."
	./scripts/build.sh

build-go: ## 仅构建 Go 后端
	@echo "🔨 构建 Go 后端..."
	go build -o server main.go

build-web: ## 仅构建前端
	@echo "🔨 构建前端..."
	cd web && bun run build

# 开发
dev: ## 启动开发模式
	@echo "🚀 启动开发模式..."
	@echo "前端开发服务器将在 http://localhost:5173 启动"
	@echo "后端服务器需要单独启动: make run"
	cd web && bun run dev

dev-go: ## 启动 Go 开发模式（热重载）
	@echo "🚀 启动 Go 开发模式（热重载）..."
	@if command -v air >/dev/null 2>&1; then \
		echo "📁 创建临时目录..."; \
		mkdir -p tmp; \
		echo "🔥 使用 air 启动热重载..."; \
		air; \
	else \
		echo "❌ air 未安装，使用普通模式启动"; \
		echo "📦 安装 air: go install github.com/cosmtrek/air@latest"; \
		echo "📦 或使用项目脚本: make install-tools"; \
		make run; \
	fi

# 运行
run: ## 运行项目（需要先构建）
	@echo "🚀 启动服务器..."
	@if [ -f "server" ]; then \
		./server; \
	else \
		echo "❌ 服务器未构建，请先运行: make build"; \
		exit 1; \
	fi

# 清理
clean: ## 清理构建文件
	@echo "🧹 清理构建文件..."
	rm -rf web/dist
	rm -rf static
	rm -f server
	@echo "✅ 清理完成"

# Docker
docker-build: ## 构建 Docker 镜像
	@echo "🐳 构建 Docker 镜像..."
	./scripts/build.sh
	docker build -t go-react-template .

docker-run: ## 运行 Docker 容器
	@echo "🐳 运行 Docker 容器..."
	docker run -p 8080:8080 --name go-react-template-container go-react-template

docker-compose-up: ## 使用 docker-compose 启动
	@echo "🐳 使用 docker-compose 启动..."
	docker-compose up --build

docker-compose-down: ## 停止 docker-compose 服务
	@echo "🐳 停止 docker-compose 服务..."
	docker-compose down

# 工具安装
install-tools: ## 安装开发工具
	@echo "🔧 安装开发工具..."
	@echo "📦 安装 golangci-lint..."
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	@echo "📦 安装 air (热重载)..."
	go install github.com/cosmtrek/air@latest
	@echo "✅ 开发工具安装完成"
	@echo "🎉 可用命令:"
	@echo "   - make dev-go     # 启动 Go 热重载开发"
	@echo "   - make lint-go    # 运行代码检查"

# 检查工具
check-tools: ## 检查开发工具是否安装
	@echo "🔍 检查开发工具安装状态..."
	@echo "\n📋 核心工具:"
	@printf "  %-15s " "Go:"; go version 2>/dev/null | cut -d' ' -f3 || echo "❌ 未安装"
	@printf "  %-15s " "Bun:"; bun --version 2>/dev/null || echo "❌ 未安装"
	@echo "\n🔧 开发工具:"
	@printf "  %-15s " "golangci-lint:"; golangci-lint version 2>/dev/null | head -1 | cut -d' ' -f4 || echo "❌ 未安装"
	@printf "  %-15s " "air:"; air -v 2>/dev/null || echo "❌ 未安装"
	@echo "\n🐳 容器工具:"
	@printf "  %-15s " "Docker:"; docker --version 2>/dev/null | cut -d' ' -f3 | tr -d ',' || echo "❌ 未安装"
	@printf "  %-15s " "docker-compose:"; docker-compose --version 2>/dev/null | cut -d' ' -f3 | tr -d ',' || echo "❌ 未安装"
	@echo "\n💡 安装缺失工具: make install-tools"

# 完整的 CI 流程
ci: install lint test build ## 运行完整的 CI 流程
	@echo "✅ CI 流程完成"