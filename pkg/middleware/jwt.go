package middleware

import (
	"net/http"
	"strings"
	"time"

	"go-react-template/configs"
	"go-react-template/pkg/model"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

// JWTClaims JWT声明结构
type JWTClaims struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}

// JWTMiddleware JWT中间件配置
type JWTMiddleware struct {
	Secret     string
	ExpireHour int
}

// NewJWTMiddleware 创建JWT中间件实例
func NewJWTMiddleware() *JWTMiddleware {
	return &JWTMiddleware{
		Secret:     configs.AppConfig.JWT.Secret,
		ExpireHour: configs.AppConfig.JWT.ExpireHour,
	}
}

// JWT 创建JWT认证中间件函数（类似于CORS、Logger的使用方式）
func JWT() echo.MiddlewareFunc {
	jwtMiddleware := NewJWTMiddleware()
	return jwtMiddleware.JWTAuth()
}

// OptionalJWT 创建可选JWT认证中间件函数
func OptionalJWT() echo.MiddlewareFunc {
	jwtMiddleware := NewJWTMiddleware()
	return jwtMiddleware.OptionalJWTAuth()
}

// GenerateToken 生成JWT token
func (j *JWTMiddleware) GenerateToken(user *model.User) (string, error) {
	// 设置过期时间
	expireTime := time.Now().Add(time.Hour * time.Duration(j.ExpireHour))

	// 创建声明
	claims := &JWTClaims{
		UserID:   user.ID,
		Username: user.Username,
		Email:    user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "webstyle",
			Subject:   user.ID,
		},
	}

	// 创建token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 签名token
	tokenString, err := token.SignedString([]byte(j.Secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ParseToken 解析JWT token
func (j *JWTMiddleware) ParseToken(tokenString string) (*JWTClaims, error) {
	// 解析token
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		// 验证签名方法
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, echo.NewHTTPError(http.StatusUnauthorized, "无效的签名方法")
		}
		return []byte(j.Secret), nil
	})

	if err != nil {
		return nil, err
	}

	// 验证token有效性
	if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, echo.NewHTTPError(http.StatusUnauthorized, "无效的token")
}

// JWTAuth JWT认证中间件
func (j *JWTMiddleware) JWTAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// 从请求头获取Authorization
			auth := c.Request().Header.Get("Authorization")
			if auth == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "缺少Authorization头")
			}

			// 检查Bearer前缀
			if !strings.HasPrefix(auth, "Bearer ") {
				return echo.NewHTTPError(http.StatusUnauthorized, "无效的Authorization格式")
			}

			// 提取token
			tokenString := strings.TrimPrefix(auth, "Bearer ")
			if tokenString == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "缺少token")
			}

			// 解析token
			claims, err := j.ParseToken(tokenString)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "无效的token")
			}

			// 将用户信息存储到context中
			c.Set("user_id", claims.UserID)
			c.Set("username", claims.Username)
			c.Set("email", claims.Email)
			c.Set("claims", claims)

			return next(c)
		}
	}
}

// OptionalJWTAuth 可选的JWT认证中间件（不强制要求认证）
func (j *JWTMiddleware) OptionalJWTAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// 从请求头获取Authorization
			auth := c.Request().Header.Get("Authorization")
			if auth != "" && strings.HasPrefix(auth, "Bearer ") {
				// 提取token
				tokenString := strings.TrimPrefix(auth, "Bearer ")
				if tokenString != "" {
					// 尝试解析token
					if claims, err := j.ParseToken(tokenString); err == nil {
						// 将用户信息存储到context中
						c.Set("user_id", claims.UserID)
						c.Set("username", claims.Username)
						c.Set("email", claims.Email)
						c.Set("claims", claims)
					}
				}
			}

			return next(c)
		}
	}
}

// GetUserIDFromContext 从context中获取用户ID
func GetUserIDFromContext(c echo.Context) string {
	if userID := c.Get("user_id"); userID != nil {
		if id, ok := userID.(string); ok {
			return id
		}
	}
	return ""
}

// GetUsernameFromContext 从context中获取用户名
func GetUsernameFromContext(c echo.Context) string {
	if username := c.Get("username"); username != nil {
		if name, ok := username.(string); ok {
			return name
		}
	}
	return ""
}

// GetEmailFromContext 从context中获取邮箱
func GetEmailFromContext(c echo.Context) string {
	if email := c.Get("email"); email != nil {
		if e, ok := email.(string); ok {
			return e
		}
	}
	return ""
}

// GetClaimsFromContext 从context中获取完整的claims
func GetClaimsFromContext(c echo.Context) *JWTClaims {
	if claims := c.Get("claims"); claims != nil {
		if c, ok := claims.(*JWTClaims); ok {
			return c
		}
	}
	return nil
}

// RefreshToken 刷新token
func (j *JWTMiddleware) RefreshToken(tokenString string) (string, error) {
	// 解析旧token
	claims, err := j.ParseToken(tokenString)
	if err != nil {
		return "", err
	}

	// 检查token是否即将过期（在过期前1小时内可以刷新）
	if time.Until(claims.ExpiresAt.Time) > time.Hour {
		return "", echo.NewHTTPError(http.StatusBadRequest, "token还未到刷新时间")
	}

	// 创建新的token
	user := &model.User{
		ID:       claims.UserID,
		Username: claims.Username,
		Email:    claims.Email,
	}

	return j.GenerateToken(user)
}

// ExtractUserID 从Echo上下文中提取用户ID
func ExtractUserID(c echo.Context) (string, error) {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return "", echo.NewHTTPError(http.StatusUnauthorized, "用户ID未找到")
	}
	return userID, nil
}

// ExtractUserIDFromContext 从Echo上下文中提取用户ID（别名函数）
func ExtractUserIDFromContext(c echo.Context) (string, error) {
	return ExtractUserID(c)
}
