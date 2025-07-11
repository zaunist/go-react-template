package configs

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config 应用配置结构.
type Config struct {
	// 服务器配置
	Server ServerConfig `json:"server"`
	// 数据库配置
	Database DatabaseConfig `json:"database"`
	// Session配置
	Session SessionConfig `json:"session"`
}

// ServerConfig 服务器配置.
type ServerConfig struct {
	Port string `json:"port"` // 监听端口
	Host string `json:"host"` // 监听地址
}

// DatabaseConfig 数据库配置.
type DatabaseConfig struct {
	Driver   string `json:"driver"`   // 数据库驱动 (sqlite, mysql, postgres)
	Host     string `json:"host"`     // 数据库主机
	Port     string `json:"port"`     // 数据库端口
	Username string `json:"username"` // 用户名
	Password string `json:"password"` // 密码
	DBName   string `json:"dbname"`   // 数据库名
	SSLMode  string `json:"sslmode"`  // SSL模式
	Path     string `json:"path"`     // SQLite数据库文件路径
}

// SessionConfig Session配置.
type SessionConfig struct {
	Secret     string `json:"secret"`      // Session密钥
	ExpireHour int    `json:"expire_hour"` // 过期时间(小时)
}

// 全局配置实例.
var AppConfig *Config

// Init 初始化配置.
func Init() error {
	// 尝试加载.env文件
	if err := godotenv.Load(); err != nil {
		log.Println("警告: 未找到.env文件，将使用环境变量或默认值")
	}

	// 创建配置实例
	AppConfig = &Config{
		Server: ServerConfig{
			Port: getEnv("SERVER_PORT", "1323"),
			Host: getEnv("SERVER_HOST", "0.0.0.0"),
		},
		Database: DatabaseConfig{
			Driver:   getEnv("DB_DRIVER", "sqlite"),
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "3306"),
			Username: getEnv("DB_USERNAME", ""),
			Password: getEnv("DB_PASSWORD", ""),
			DBName:   getEnv("DB_NAME", "go_react_template"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
			Path:     getEnv("DB_PATH", "app.db"),
		},
		Session: SessionConfig{
			Secret:     getEnv("SESSION_SECRET", "your-secret-key"),
			ExpireHour: getEnvAsInt("SESSION_EXPIRE_HOUR", 24),
		},
	}

	log.Printf("配置初始化完成: 服务器将在 %s:%s 启动", AppConfig.Server.Host, AppConfig.Server.Port)

	return nil
}

// getEnv 获取环境变量，如果不存在则返回默认值.
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	return defaultValue
}

// getEnvAsInt 获取环境变量并转换为整数，如果不存在或转换失败则返回默认值.
func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}

	return defaultValue
}

// GetDatabaseDSN 获取数据库连接字符串.
func (c *Config) GetDatabaseDSN() string {
	switch c.Database.Driver {
	case "sqlite":
		return c.Database.Path
	case "mysql":
		return c.Database.Username + ":" + c.Database.Password + "@tcp(" + c.Database.Host + ":" + c.Database.Port + ")/" + c.Database.DBName + "?charset=utf8mb4&parseTime=True&loc=Local"
	case "postgres":
		return "host=" + c.Database.Host + " user=" + c.Database.Username + " password=" + c.Database.Password + " dbname=" + c.Database.DBName + " port=" + c.Database.Port + " sslmode=" + c.Database.SSLMode + " TimeZone=Asia/Shanghai"
	default:
		return c.Database.Path // 默认使用SQLite
	}
}

// GetServerAddress 获取服务器监听地址.
func (c *Config) GetServerAddress() string {
	return c.Server.Host + ":" + c.Server.Port
}
