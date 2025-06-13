// Package service 业务逻辑层，处理核心业务逻辑
package service

import (
	"errors"
	"strings"

	"go-react-template/pkg/model"
	"go-react-template/pkg/repo"

	"golang.org/x/crypto/bcrypt"
)

// UserService 用户业务逻辑接口.
type UserService interface {
	Register(req *model.UserRegisterRequest) (*model.UserResponse, error)
	Login(req *model.UserLoginRequest) (*model.UserResponse, error)
	GetUserByID(id uint) (*model.UserResponse, error)
}

// userService 用户业务逻辑实现.
type userService struct {
	userRepo repo.UserRepo
}

// NewUserService 创建用户业务逻辑实例.
func NewUserService(userRepo repo.UserRepo) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

// Register 用户注册.
func (s *userService) Register(req *model.UserRegisterRequest) (*model.UserResponse, error) {
	// 验证输入
	if err := s.validateRegisterRequest(req); err != nil {
		return nil, err
	}

	// 检查邮箱是否已存在
	if _, err := s.userRepo.GetByEmail(req.Email); err == nil {
		return nil, errors.New("邮箱已被注册")
	}

	// 检查用户名是否已存在
	if _, err := s.userRepo.GetByUsername(req.Username); err == nil {
		return nil, errors.New("用户名已被使用")
	}

	// 加密密码
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("密码加密失败")
	}

	// 创建用户
	user := &model.User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, errors.New("用户创建失败")
	}

	response := user.ToResponse()

	return &response, nil
}

// Login 用户登录.
func (s *userService) Login(req *model.UserLoginRequest) (*model.UserResponse, error) {
	// 验证输入
	if err := s.validateLoginRequest(req); err != nil {
		return nil, err
	}

	// 根据邮箱获取用户
	user, err := s.userRepo.GetByEmail(req.Email)
	if err != nil {
		return nil, errors.New("邮箱或密码错误")
	}

	// 验证密码
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("邮箱或密码错误")
	}

	response := user.ToResponse()

	return &response, nil
}

// GetUserByID 根据ID获取用户信息.
func (s *userService) GetUserByID(id uint) (*model.UserResponse, error) {
	user, err := s.userRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	response := user.ToResponse()

	return &response, nil
}

// validateRegisterRequest 验证注册请求.
func (s *userService) validateRegisterRequest(req *model.UserRegisterRequest) error {
	if req.Username == "" {
		return errors.New("用户名不能为空")
	}

	if len(req.Username) < 3 || len(req.Username) > 50 {
		return errors.New("用户名长度必须在3-50个字符之间")
	}

	if req.Email == "" {
		return errors.New("邮箱不能为空")
	}

	if !strings.Contains(req.Email, "@") {
		return errors.New("邮箱格式不正确")
	}

	if req.Password == "" {
		return errors.New("密码不能为空")
	}

	if len(req.Password) < 6 {
		return errors.New("密码长度不能少于6个字符")
	}

	return nil
}

// validateLoginRequest 验证登录请求.
func (s *userService) validateLoginRequest(req *model.UserLoginRequest) error {
	if req.Email == "" {
		return errors.New("邮箱不能为空")
	}

	if !strings.Contains(req.Email, "@") {
		return errors.New("邮箱格式不正确")
	}

	if req.Password == "" {
		return errors.New("密码不能为空")
	}

	return nil
}
