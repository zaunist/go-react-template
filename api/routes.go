// Package api 存放API路由定义
package api

import (
	"go-react-template/pkg/handler"
	"go-react-template/pkg/middleware"

	"github.com/labstack/echo/v4"
)

// SetupRoutes 设置所有API路由.
func SetupRoutes(e *echo.Echo, userHandler *handler.UserHandler) {

	// API v1 路由组
	api := e.Group("/api/v1")

	// 设置公开路由（无需认证）
	setupPublicRoutes(api, userHandler)

	// 设置受保护路由（需要认证）
	setupProtectedRoutes(api, userHandler)
}

// setupPublicRoutes 设置公开路由（无需认证）
func setupPublicRoutes(api *echo.Group, userHandler *handler.UserHandler) {
	// 健康检查
	api.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]interface{}{
			"success": true,
			"data": map[string]interface{}{
				"status":  "healthy",
				"service": "go-react-template",
				"version": "1.0.0",
			},
			"message": "服务正常运行",
		})
	})

	// 认证相关路由（公开）
	auth := api.Group("/auth")
	auth.POST("/register", userHandler.Register)
	auth.POST("/login", userHandler.Login)
	auth.POST("/google", userHandler.GoogleLogin) // Google第三方登录
}

// setupProtectedRoutes 设置受保护路由（需要认证）
func setupProtectedRoutes(api *echo.Group, userHandler *handler.UserHandler) {
	// 创建受保护的路由组，应用JWT中间件
	protected := api.Group("", middleware.JWT())

	// 受保护的认证路由
	protectedAuth := protected.Group("/auth")
	protectedAuth.POST("/logout", userHandler.Logout) // 用户注销

	// 受保护的用户路由
	userRoutes := protected.Group("/user")
	userRoutes.GET("/profile", userHandler.GetProfile)              // 获取当前用户资料
	userRoutes.PUT("/profile", userHandler.UpdateProfile)           // 更新个人资料
	userRoutes.POST("/change-password", userHandler.ChangePassword) // 更改密码
}
