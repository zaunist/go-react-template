// Package database 负责数据库连接、初始化和迁移
package database

import (
	"fmt"
	"log"

	"go-react-template/configs"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Init 初始化数据库连接.
func Init() error {
	if configs.AppConfig == nil {
		return fmt.Errorf("配置未初始化，请先调用 configs.Init()")
	}

	var dialector gorm.Dialector

	dsn := configs.AppConfig.GetDatabaseDSN()

	// 根据配置选择数据库驱动
	switch configs.AppConfig.Database.Driver {
	case "sqlite":
		dialector = sqlite.Open(dsn)
		log.Printf("使用 SQLite 数据库: %s", dsn)
	case "mysql":
		dialector = mysql.Open(dsn)

		log.Printf("使用 MySQL 数据库: %s:%s/%s",
			configs.AppConfig.Database.Host,
			configs.AppConfig.Database.Port,
			configs.AppConfig.Database.DBName)
	case "postgres":
		dialector = postgres.Open(dsn)

		log.Printf("使用 PostgreSQL 数据库: %s:%s/%s",
			configs.AppConfig.Database.Host,
			configs.AppConfig.Database.Port,
			configs.AppConfig.Database.DBName)
	default:
		return fmt.Errorf("不支持的数据库驱动: %s", configs.AppConfig.Database.Driver)
	}

	var err error

	DB, err = gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("数据库连接失败: %w", err)
	}

	log.Println("数据库连接成功")

	return nil
}

// AutoMigrate 执行数据库迁移.
func AutoMigrate(models ...interface{}) error {
	return DB.AutoMigrate(models...)
}

// GetDB 获取数据库实例.
func GetDB() *gorm.DB {
	return DB
}
