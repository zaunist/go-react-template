// Package handler HTTP处理层，负责解析HTTP请求并返回响应
package handler

import (
	"net/http"

	"go-react-template/pkg/middleware"
	"go-react-template/pkg/model"
	"go-react-template/pkg/service"

	"github.com/labstack/echo/v4"
)

// UserHandler 用户HTTP处理器.
type UserHandler struct {
	userService service.UserService
}

// NewUserHandler 创建用户HTTP处理器实例.
func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// POST /api/v1/auth/register.
func (h *UserHandler) Register(c echo.Context) error {
	var req model.UserRegisterRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "请求参数格式错误",
		})
	}

	user, err := h.userService.Register(&req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    user,
		"message": "注册成功",
	})
}

// POST /api/v1/auth/login.
func (h *UserHandler) Login(c echo.Context) error {
	var req model.UserLoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "请求参数格式错误",
		})
	}

	user, err := h.userService.Login(&req)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    user,
		"message": "登录成功",
	})
}

// GET /api/v1/user/profile/:id.
func (h *UserHandler) GetProfile(c echo.Context) error {
	id := c.Param("id")

	user, err := h.userService.GetUserByID(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    user,
		"message": "获取成功",
	})
}

// POST /api/v1/auth/google.
func (h *UserHandler) GoogleLogin(c echo.Context) error {
	var req model.GoogleLoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "请求参数格式错误",
		})
	}

	loginResponse, err := h.userService.GoogleLogin(&req)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    loginResponse,
		"message": "Google登录成功",
	})
}

// POST /api/v1/auth/logout.
func (h *UserHandler) Logout(c echo.Context) error {
	// 从请求头中获取token
	token := c.Request().Header.Get("Authorization")
	if token == "" {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "未提供认证token",
		})
	}

	// 验证token格式（Bearer token）
	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:] // 移除 "Bearer " 前缀
	} else {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "token格式错误",
		})
	}

	// 验证JWT token的有效性
	userID := c.Get("user_id")
	if userID == nil {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "无效的token",
		})
	}

	// 在实际项目中，这里可以将token加入黑名单
	// 或者在Redis中记录已注销的token，防止token重复使用
	// 例如：h.tokenBlacklist.Add(token, time.Until(tokenExpiry))

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    nil,
		"message": "注销成功",
	})
}

// PUT /api/v1/user/profile.
func (h *UserHandler) UpdateProfile(c echo.Context) error {
	var req model.UserUpdateProfileRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "缺少用户ID参数",
		})
	}

	// 从JWT中获取用户ID
	userID, err := middleware.ExtractUserIDFromContext(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "未授权访问",
		})
	}

	user, err := h.userService.UpdateProfile(userID, &req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    user,
		"message": "更新成功",
	})
}

// POST /api/v1/user/change-password.
func (h *UserHandler) ChangePassword(c echo.Context) error {
	var req model.UserChangePasswordRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "请求参数格式错误",
		})
	}

	// 从JWT中获取用户ID
	userID, err := middleware.ExtractUserIDFromContext(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "未授权访问",
		})
	}

	err = h.userService.ChangePassword(userID, &req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"code":    0,
		"data":    nil,
		"message": "密码修改成功",
	})
}
