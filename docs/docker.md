# Docker 部署指南

本文档介绍如何使用 Docker 部署 Go + React 全栈应用。

## 📋 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- 已完成项目构建（运行 `./scripts/build.sh`）

## 🚀 快速开始

### 1. 构建项目

首先需要构建项目，生成二进制文件和静态资源：

```bash
# 在项目根目录执行
./scripts/build.sh
```

构建完成后，确保以下文件存在：
- `server` - Go 二进制程序
- `static/` - 前端静态文件目录

### 2. 构建 Docker 镜像

```bash
# 构建镜像
docker build -t go-react-app .

# 查看镜像
docker images | grep go-react-app
```

### 3. 运行容器

#### 方式一：使用 Docker 命令

```bash
# 运行容器
docker run -d \
  --name go-react-app \
  -p 8080:8080 \
  -e SERVER_HOST=0.0.0.0 \
  -e SERVER_PORT=8080 \
  -e DATABASE_DRIVER=sqlite \
  -e DATABASE_DSN=./data.db \
  -e SESSION_SECRET=your-secret-key \
  -v $(pwd)/data:/app/data \
  go-react-app
```

#### 方式二：使用 Docker Compose（推荐）

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 4. 访问应用

应用启动后，可以通过以下地址访问：

- **Web 应用**: http://localhost:8080
- **API 接口**: http://localhost:8080/api/v1

## ⚙️ 环境变量配置

### 服务器配置

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `SERVER_HOST` | `0.0.0.0` | 服务器监听地址 |
| `SERVER_PORT` | `8080` | 服务器监听端口 |

### 数据库配置

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `DATABASE_DRIVER` | `sqlite` | 数据库驱动 (sqlite/mysql/postgres) |
| `DATABASE_DSN` | `./data.db` | 数据库连接字符串 |

### SESSION 配置

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `SESSION_SECRET` | `your-secret-key` | SESSION 签名密钥 |

## 🗄️ 数据持久化

### SQLite 数据库

默认使用 SQLite 数据库，数据文件存储在容器的 `/app/data.db`。

为了数据持久化，建议挂载数据目录：

```bash
# 创建数据目录
mkdir -p ./data

# 运行时挂载数据目录
docker run -v $(pwd)/data:/app/data go-react-app
```

### 外部数据库

如果使用外部数据库（MySQL/PostgreSQL），可以通过环境变量配置：

```bash
# MySQL 示例
docker run \
  -e DATABASE_DRIVER=mysql \
  -e DATABASE_DSN="user:password@tcp(mysql-host:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local" \
  go-react-app

# PostgreSQL 示例
docker run \
  -e DATABASE_DRIVER=postgres \
  -e DATABASE_DSN="host=postgres-host user=user password=password dbname=dbname port=5432 sslmode=disable TimeZone=Asia/Shanghai" \
  go-react-app
```

## 🔍 健康检查

Docker 镜像内置了健康检查功能：

```bash
# 查看容器健康状态
docker ps

# 查看健康检查日志
docker inspect --format='{{json .State.Health}}' go-react-app
```

健康检查配置：
- **检查间隔**: 30秒
- **超时时间**: 3秒
- **启动等待**: 5秒
- **重试次数**: 3次

## 📊 监控和日志

### 查看日志

```bash
# Docker 命令方式
docker logs -f go-react-app

# Docker Compose 方式
docker-compose logs -f app
```

### 容器资源监控

```bash
# 查看容器资源使用情况
docker stats go-react-app

# 进入容器内部
docker exec -it go-react-app sh
```

## 🔧 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 检查容器日志
   docker logs go-react-app
   
   # 检查镜像是否正确构建
   docker images | grep go-react-app
   ```

2. **端口访问问题**
   ```bash
   # 检查端口映射
   docker port go-react-app
   
   # 检查防火墙设置
   netstat -tlnp | grep 8080
   ```

3. **数据库连接问题**
   ```bash
   # 检查环境变量
   docker exec go-react-app env | grep DATABASE
   
   # 检查数据库文件权限（SQLite）
   docker exec go-react-app ls -la /app/
   ```

### 调试模式

如需调试，可以以交互模式运行容器：

```bash
# 交互模式运行
docker run -it --rm \
  -p 8080:8080 \
  -v $(pwd)/data:/app/data \
  go-react-app sh

# 在容器内手动启动应用
/app/server
```

## 🚀 生产环境部署

### 安全建议

1. **更改默认密钥**
   ```bash
   # 生成随机 SESSION 密钥
   openssl rand -base64 32
   ```

2. **使用非 root 用户**
   - 镜像已配置为使用非 root 用户 `appuser`

3. **限制容器资源**
   ```bash
   docker run \
     --memory=512m \
     --cpus=1.0 \
     go-react-app
   ```

### 扩展部署

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    image: go-react-app:latest
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '1.0'
        reservations:
          memory: 256M
          cpus: '0.5'
    environment:
      - SESSION_SECRET=${SESSION_SECRET}
      - DATABASE_DSN=${DATABASE_DSN}
```

## 📝 总结

通过 Docker 部署的优势：

- ✅ **环境一致性**: 开发、测试、生产环境完全一致
- ✅ **快速部署**: 一键构建和部署
- ✅ **资源隔离**: 容器化运行，资源隔离
- ✅ **易于扩展**: 支持水平扩展
- ✅ **版本管理**: 镜像版本化管理

更多问题请参考项目文档或提交 Issue。