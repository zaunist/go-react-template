# Air 热重载开发指南

[Air](https://github.com/cosmtrek/air) 是一个用于 Go 应用程序的实时重载工具，当你保存 Go 文件时，它会自动重新构建和重启你的应用程序。

## 📋 目录

- [安装](#安装)
- [使用方法](#使用方法)
- [配置说明](#配置说明)
- [IDE 集成](#ide-集成)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

## 🔧 安装

### 方式 1: 使用项目脚本（推荐）

```bash
# 安装所有开发工具（包括 air）
make install-tools
```

### 方式 2: 手动安装

```bash
# 使用 go install
go install github.com/cosmtrek/air@latest

# 验证安装
air -v
```

### 方式 3: 下载二进制文件

```bash
# macOS/Linux
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# Windows
iwr https://raw.githubusercontent.com/cosmtrek/air/master/install.ps1 -useb | iex
```

## 🚀 使用方法

### 基本使用

```bash
# 启动热重载开发模式
make dev-go

# 或直接使用 air
air

# 指定配置文件
air -c .air.toml
```

### 开发工作流

1. **启动热重载**
   ```bash
   make dev-go
   ```

2. **修改 Go 代码**
   - 编辑任何 `.go` 文件
   - Air 会自动检测文件变化
   - 自动重新构建和重启应用

3. **查看日志**
   - 构建日志会实时显示在终端
   - 应用日志也会同步显示
   - 错误信息会高亮显示

### 停止热重载

```bash
# 在终端中按 Ctrl+C
# 或者
pkill air
```

## ⚙️ 配置说明

项目的 Air 配置文件位于 `.air.toml`，主要配置包括：

### 监视设置

```toml
[build]
  # 监视的文件扩展名
  include_ext = ["go", "tpl", "tmpl", "html"]
  
  # 排除的目录
  exclude_dir = ["assets", "tmp", "vendor", "testdata", "web", "static"]
  
  # 排除测试文件
  exclude_regex = ["_test\.go"]
```

### 构建设置

```toml
[build]
  # 构建命令
  cmd = "go build -o ./tmp/main ."
  
  # 运行的二进制文件
  bin = "tmp/main"
  
  # 构建延迟（毫秒）
  delay = 1000
```

### 日志设置

```toml
[build]
  # 日志文件
  log = "tmp/air.log"
  
[log]
  # 显示时间戳
  time = false
  
  # 静默模式
  main_only = false
```

### 颜色配置

```toml
[color]
  main = "magenta"     # 主程序日志
  watcher = "cyan"     # 文件监视器
  build = "yellow"     # 构建过程
  runner = "green"     # 运行器
```

## 🔌 IDE 集成

### VS Code

项目已配置 VS Code 任务（`.vscode/tasks.json`）：

1. **使用命令面板**
   - 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
   - 搜索 "Tasks: Run Task"
   - 选择 "Go: Hot Reload (Air)"

2. **使用快捷键**
   - 按 `Ctrl+Shift+P` 然后输入 "task"
   - 选择对应的 Air 任务

3. **终端集成**
   - 在 VS Code 终端中直接运行 `make dev-go`

### GoLand/IntelliJ IDEA

1. **创建运行配置**
   - 打开 "Run/Debug Configurations"
   - 添加新的 "Shell Script" 配置
   - 设置脚本路径为 `air` 或 `make dev-go`

2. **使用外部工具**
   - 打开 "Settings" → "Tools" → "External Tools"
   - 添加新工具，命令为 `air`
   - 工作目录设置为项目根目录

## 🐛 常见问题

### 1. Air 未找到

**问题**: `air: command not found`

**解决**:
```bash
# 检查 GOPATH/bin 是否在 PATH 中
echo $PATH | grep $(go env GOPATH)/bin

# 如果没有，添加到 PATH
export PATH=$PATH:$(go env GOPATH)/bin

# 或重新安装
make install-tools
```

### 2. 构建失败

**问题**: Air 检测到文件变化但构建失败

**解决**:
```bash
# 检查 Go 代码语法
go build .

# 查看详细错误信息
air -d  # debug 模式
```

### 3. 文件变化未检测

**问题**: 修改文件后 Air 没有重新构建

**解决**:
```bash
# 检查文件是否在排除列表中
cat .air.toml | grep -A 10 exclude

# 检查文件扩展名是否被监视
cat .air.toml | grep -A 5 include_ext

# 重启 Air
pkill air && air
```

### 4. 端口占用

**问题**: 应用启动时端口被占用

**解决**:
```bash
# 查找占用端口的进程
lsof -i :1323

# 杀死进程
kill -9 <PID>

# 或使用不同端口
export SERVER_ADDRESS=":8080"
air
```

### 5. 性能问题

**问题**: Air 占用过多 CPU 或内存

**解决**:
```bash
# 增加构建延迟
# 在 .air.toml 中设置更大的 delay 值
delay = 2000  # 2秒

# 排除更多不必要的目录
exclude_dir = ["node_modules", "vendor", "tmp", "logs"]
```

## 💡 最佳实践

### 1. 项目结构优化

```bash
# 推荐的目录结构
.
├── main.go          # 入口文件
├── .air.toml        # Air 配置
├── tmp/             # Air 临时文件（已忽略）
├── pkg/             # 业务代码
└── web/             # 前端代码（已排除监视）
```

### 2. 环境变量管理

```bash
# 开发环境变量
export GO_ENV=development
export LOG_LEVEL=debug
export SERVER_ADDRESS=":1323"

# 在 .air.toml 中可以设置环境变量
[build]
  args_bin = ["-env=dev"]
```

### 3. 日志管理

```bash
# 分离 Air 日志和应用日志
# Air 日志: tmp/air.log
# 应用日志: 使用结构化日志输出到 stdout
```

### 4. 性能优化

```toml
# .air.toml 优化配置
[build]
  # 只监视必要的文件类型
  include_ext = ["go"]
  
  # 排除测试文件和临时文件
  exclude_regex = ["_test\.go", ".*_temp\.go"]
  
  # 适当的延迟避免频繁重建
  delay = 1000
  
  # 构建错误时停止旧进程
  stop_on_error = true
```

### 5. 团队协作

```bash
# 统一的开发命令
make dev-go          # 所有开发者使用相同命令

# 版本控制
# .air.toml 加入版本控制
# tmp/ 目录加入 .gitignore
```

## 🔗 相关链接

- [Air 官方文档](https://github.com/cosmtrek/air)
- [Air 配置参考](https://github.com/cosmtrek/air/blob/master/air_example.toml)
- [Go 热重载最佳实践](https://blog.golang.org/)

## 📝 更新日志

- **v1.0.0** - 初始 Air 配置
- **v1.1.0** - 添加 VS Code 集成
- **v1.2.0** - 优化配置和文档