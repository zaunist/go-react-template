// Package repo 数据访问层，负责与数据库进行交互
package repo

import (
	"errors"

	"go-react-template/pkg/database"
	"go-react-template/pkg/model"

	"gorm.io/gorm"
)

// UserRepo 用户数据访问接口.
type UserRepo interface {
	Create(user *model.User) error
	Update(user *model.User) error
	GetByEmail(email string) (*model.User, error)
	GetByID(id string) (*model.User, error)
	GetByUsername(username string) (*model.User, error)
	GetByGoogleID(googleID string) (*model.User, error)
}

// userRepo 用户数据访问实现.
type userRepo struct {
	db *gorm.DB
}

// NewUserRepo 创建用户数据访问实例.
func NewUserRepo() UserRepo {
	return &userRepo{
		db: database.GetDB(),
	}
}

// Create 创建用户.
func (r *userRepo) Create(user *model.User) error {
	return r.db.Create(user).Error
}

// Update 更新用户信息.
func (r *userRepo) Update(user *model.User) error {
	return r.db.Save(user).Error
}

// GetByEmail 根据邮箱获取用户.
func (r *userRepo) GetByEmail(email string) (*model.User, error) {
	var user model.User

	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}

		return nil, err
	}

	return &user, nil
}

// GetByID 根据ID获取用户.
func (r *userRepo) GetByID(id string) (*model.User, error) {
	var user model.User

	err := r.db.First(&user, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}

		return nil, err
	}

	return &user, nil
}

// GetByUsername 根据用户名获取用户.
func (r *userRepo) GetByUsername(username string) (*model.User, error) {
	var user model.User

	err := r.db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}

		return nil, err
	}

	return &user, nil
}

// GetByGoogleID 根据Google ID获取用户.
func (r *userRepo) GetByGoogleID(googleID string) (*model.User, error) {
	var user model.User

	err := r.db.Where("google_id = ?", googleID).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}

		return nil, err
	}

	return &user, nil
}
