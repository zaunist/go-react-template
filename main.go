package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"go-react-template/api"
	"go-react-template/configs"
	"go-react-template/pkg/database"
	"go-react-template/pkg/handler"
	"go-react-template/pkg/model"
	"go-react-template/pkg/repo"
	"go-react-template/pkg/service"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// 初始化配置
	if err := configs.Init(); err != nil {
		log.Fatal("配置初始化失败:", err)
	}

	// 初始化数据库
	if err := database.Init(); err != nil {
		log.Fatal("数据库初始化失败:", err)
	}

	// 执行数据库迁移
	if err := database.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("数据库迁移失败:", err)
	}

	// 初始化依赖
	userRepo := repo.NewUserRepo()
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	// 创建Echo实例
	e := echo.New()

	// 添加中间件
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// 设置API路由
	api.SetupRoutes(e, userHandler)

	// 设置静态文件服务
	setupStaticFiles(e)

	serverAddr := configs.AppConfig.GetServerAddress()
	log.Printf("服务器启动在地址 %s", serverAddr)
	e.Logger.Fatal(e.Start(serverAddr))
}

// setupStaticFiles 设置静态文件服务.
func setupStaticFiles(e *echo.Echo) {
	// 静态文件目录
	staticDir := "static"

	// 检查静态文件目录是否存在
	if _, err := os.Stat(staticDir); os.IsNotExist(err) {
		log.Printf("警告: 静态文件目录 %s 不存在，跳过静态文件服务设置", staticDir)
		return
	}

	// 服务静态文件
	e.Static("/assets", filepath.Join(staticDir, "assets"))
	e.File("/favicon.ico", filepath.Join(staticDir, "favicon.ico"))

	// 处理SPA路由，所有非API请求都返回index.html
	e.GET("/*", func(c echo.Context) error {
		path := c.Request().URL.Path

		// 如果是API请求，返回404
		if len(path) >= 4 && path[:4] == "/api" {
			return echo.NewHTTPError(http.StatusNotFound, "API endpoint not found")
		}

		// 检查请求的文件是否存在
		filePath := filepath.Join(staticDir, path)
		if path == "/" {
			filePath = filepath.Join(staticDir, "index.html")
		}

		if _, err := os.Stat(filePath); err == nil {
			return c.File(filePath)
		}

		// 文件不存在，返回index.html（SPA路由）
		return c.File(filepath.Join(staticDir, "index.html"))
	})
}
