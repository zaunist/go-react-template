// Package model 定义数据模型
package model

import (
	"time"

	"gorm.io/gorm"
)

// User 用户模型.
type User struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	Username  string         `json:"username" gorm:"uniqueIndex;not null;size:50" validate:"required,min=3,max=50"`
	Email     string         `json:"email" gorm:"uniqueIndex;not null;size:100" validate:"required,email"`
	Password  string         `json:"-" gorm:"not null;size:255" validate:"required,min=6"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// TableName 指定表名.
func (User) TableName() string {
	return "users"
}

// UserRegisterRequest 用户注册请求结构.
type UserRegisterRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

// UserLoginRequest 用户登录请求结构.
type UserLoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// UserResponse 用户响应结构（不包含密码）.
type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// ToResponse 将User转换为UserResponse.
func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:       u.ID,
		Username: u.Username,
		Email:    u.Email,
	}
}
