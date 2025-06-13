# 使用最小的 Alpine 镜像作为基础镜像
FROM alpine:latest

# 安装必要的运行时依赖
RUN apk --no-cache add ca-certificates tzdata

# 设置工作目录
WORKDIR /app

# 创建非 root 用户
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# 复制二进制程序
COPY server /app/server

# 复制静态文件目录（如果存在）
COPY static /app/static

# 复制配置文件示例
COPY .env.example /app/.env.example

# 设置二进制程序的执行权限
RUN chmod +x /app/server

# 更改文件所有者
RUN chown -R appuser:appgroup /app

# 切换到非 root 用户
USER appuser

# 设置默认环境变量
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=8080
ENV DATABASE_DRIVER=sqlite
ENV DATABASE_DSN=./data.db
ENV JWT_SECRET=your-jwt-secret-key

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/health || exit 1

# 启动应用
CMD ["/app/server"]