// Package handler HTTP处理层，负责解析HTTP请求并返回响应
package handler

import (
	"net/http"
	"strconv"

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
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"code":    1,
			"data":    nil,
			"message": "用户ID格式错误",
		})
	}

	user, err := h.userService.GetUserByID(uint(id))
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
