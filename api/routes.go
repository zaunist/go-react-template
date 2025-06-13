// Package api 存放API路由定义
package api

import (
	"go-react-template/pkg/handler"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// SetupRoutes 设置所有API路由.
func SetupRoutes(e *echo.Echo, userHandler *handler.UserHandler) {
	// 添加CORS中间件
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// 添加日志中间件
	e.Use(middleware.Logger())
	// 添加恢复中间件
	e.Use(middleware.Recover())

	// API v1 路由组
	api := e.Group("/api/v1")

	// 认证相关路由
	auth := api.Group("/auth")
	auth.POST("/register", userHandler.Register)
	auth.POST("/login", userHandler.Login)

	// 用户相关路由
	user := api.Group("/user")
	user.GET("/profile/:id", userHandler.GetProfile)

	// 健康检查
	api.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]interface{}{
			"code":    0,
			"data":    nil,
			"message": "服务正常运行",
		})
	})
}
