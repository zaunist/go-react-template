# 配置系统使用说明

## 概述

本项目支持通过 `.env` 文件和环境变量进行配置管理。配置系统会按以下优先级读取配置：

1. 环境变量（最高优先级）
2. `.env` 文件
3. 默认值（最低优先级）

## 配置文件

### 创建配置文件

复制 `.env.example` 文件并重命名为 `.env`：

```bash
cp .env.example .env
```

### 配置项说明

#### 服务器配置

- `SERVER_PORT`: 服务器监听端口（默认: 1323）
- `SERVER_HOST`: 服务器监听地址（默认: 0.0.0.0）

#### 数据库配置

##### SQLite（默认）

```env
DB_DRIVER=sqlite
DB_PATH=app.db
```

##### MySQL

```env
DB_DRIVER=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=go_react_template
```

##### PostgreSQL

```env
DB_DRIVER=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=go_react_template
DB_SSLMODE=disable
```

#### SESSION 配置

- `SESSION_SECRET`: SESSION 签名密钥（生产环境必须修改）
- `SESSION_EXPIRE_HOUR`: SESSION 过期时间（小时，默认: 24）

## 使用方式

### 开发环境

1. 创建 `.env` 文件并配置所需参数
2. 运行程序：

```bash
go run main.go
```

### 生产环境

#### 方式一：使用 .env 文件

1. 在服务器上创建 `.env` 文件
2. 运行编译后的程序：

```bash
./server
```

#### 方式二：使用环境变量

```bash
export SERVER_PORT=8080
export DB_DRIVER=mysql
export DB_HOST=your-db-host
export DB_USERNAME=your-username
export DB_PASSWORD=your-password
export SESSION_SECRET=your-secret-key
./server
```

#### 方式三：Docker 环境变量

```dockerfile
ENV SERVER_PORT=8080
ENV DB_DRIVER=postgres
ENV DB_HOST=postgres-service
ENV SESSION_SECRET=your-secret-key
```

## 配置验证

程序启动时会显示配置信息：

```
2025/06/13 18:54:15 配置初始化完成: 服务器将在 localhost:8080 启动
2025/06/13 18:54:15 使用 SQLite 数据库: app.db
2025/06/13 18:54:15 数据库连接成功
2025/06/13 18:54:15 服务器启动在地址 localhost:8080
```

## 安全建议

1. **生产环境必须修改 SESSION_SECRET**
2. **不要将 `.env` 文件提交到版本控制系统**
3. **使用强密码和复杂的密钥**
4. **定期轮换密钥**
5. **限制数据库用户权限**

## 故障排除

### 常见错误

1. **配置未初始化**
   ```
   配置未初始化，请先调用 configs.Init()
   ```
   解决方案：确保在 `main.go` 中先调用 `configs.Init()`

2. **不支持的数据库驱动**
   ```
   不支持的数据库驱动: xxx
   ```
   解决方案：检查 `DB_DRIVER` 配置，支持的值：`sqlite`、`mysql`、`postgres`

3. **数据库连接失败**
   ```
   数据库连接失败: xxx
   ```
   解决方案：检查数据库配置参数和网络连接

### 调试技巧

1. 查看启动日志确认配置是否正确加载
2. 使用环境变量覆盖 `.env` 文件进行测试
3. 检查文件权限和路径是否正确