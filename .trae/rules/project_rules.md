# Go + React 全栈模板项目开发规约 (Project Rules)

## 1. 核心原则 ✨

### 1.1 设计哲学

**Less is More (少即是多)**

- **只做必要的事**：避免过度设计和过早优化。只引入当前功能所必需的依赖和抽象。
- **代码自解释**：优先通过清晰的命名（变量、函数、文件）和合理的代码结构来让代码不言自明，注释是必要的补充。
- **利用框架/库的优势**：充分使用 Echo、Gorm、React、TailwindCSS 等工具提供的原生能力，而不是在其上构建不必要的封装。

### 1.2 开发原则

- **一致性优于个性**：团队内保持代码风格、命名规范、文件结构的一致性。
- **可读性优于简洁性**：代码应该易于理解和维护，而不是追求极致的简洁。
- **测试驱动开发**：重要的业务逻辑必须有对应的单元测试。
- **渐进式重构**：持续改进代码质量，但避免大规模重写。

## 2. 技术栈 (Tech Stack) 🛠️

### 后端 (Backend)

- **语言**: Go 1.24+
- **Web 框架**: Echo v4
- **ORM**: Gorm
- **数据库**: SQLite
- **依赖管理**: Go Modules

### 前端 (Frontend)

- **语言**: Typescript
- **框架**: React 19+
- **CSS**: TailwindCSS v4+
- **状态管理**: Zustand
- **路由**: React Router DOM
- **UI 组件库**: shadcn/ui
- **包管理器**: bun

## 3. 项目结构 (Project Structure) 📂

### 3.1 整体结构

```plaintext
.
├── .air.toml              # Air 热重载配置
├── .env.example           # 环境变量模板
├── .gitignore             # Git 忽略文件
├── .golangci.yml          # Go 代码检查配置
├── Dockerfile             # Docker 构建文件
├── Makefile               # 项目管理命令
├── README.md              # 项目说明文档
├── docker-compose.yml     # Docker Compose 配置
├── go.mod                 # Go 模块文件
├── go.sum                 # Go 依赖锁定文件
├── main.go                # 项目主入口
│
├── .github/               # GitHub 配置
│   └── workflows/         # CI/CD 工作流
│
├── .trae/                 # Trae AI 配置
│   └── rules/             # 项目规约文档
│
├── api/                   # API 定义文件
│   └── routes.go          # 路由定义
│
├── assets/                # 静态资源
│   └── logo.svg           # 项目图标
│
├── configs/               # 配置管理
│   └── config.go          # 配置文件
│
├── docs/                  # 项目文档
│   ├── air.md             # Air 热重载文档
│   ├── configuration.md   # 配置说明
│   ├── docker.md          # Docker 部署文档
│   └── golangci-lint.md   # 代码检查文档
│
├── pkg/                   # 核心业务代码
│   ├── database/          # 数据库连接、初始化和迁移
│   ├── handler/           # HTTP 请求处理器 (Echo Handlers)
│   ├── middleware/        # 中间件
│   ├── model/             # 数据模型 (Gorm Models)
│   ├── repo/              # 数据访问层
│   └── service/           # 业务逻辑层
│
├── scripts/               # 构建和部署脚本
│   ├── build.sh           # 完整构建脚本
│   └── lint.sh            # 代码检查脚本
│
└── web/                   # 前端 React 项目
    ├── public/            # 静态资源
    ├── src/               # 源代码
    │   ├── api/           # API 调用
    │   ├── assets/        # 前端资源
    │   ├── components/    # 可复用组件
    │   ├── lib/           # 工具函数
    │   ├── pages/         # 页面级组件
    │   ├── router/        # 路由配置
    │   └── store/         # Zustand store
    ├── components.json    # shadcn/ui 配置
    ├── package.json       # 前端依赖
    ├── tsconfig.json      # TypeScript 配置
    └── vite.config.ts     # Vite 构建配置
```

### 3.2 目录职责说明

#### 后端目录

- **`pkg/`**: 核心业务代码，按功能模块组织
- **`api/`**: API 路由定义和文档
- **`configs/`**: 配置文件和环境变量管理
- **`scripts/`**: 构建、部署和维护脚本

#### 前端目录

- **`web/src/components/`**: 可复用的 UI 组件
- **`web/src/pages/`**: 页面级组件
- **`web/src/lib/`**: 工具函数和通用逻辑
- **`web/src/store/`**: 全局状态管理

#### 配置和文档

- **`docs/`**: 项目文档和使用指南
- **`.github/`**: GitHub Actions 和模板

## 4. 后端开发规约 (Backend Rules)

### 4.1 代码分层职责

#### 4.1.1 Handler 层 (pkg/handler/)

- **职责**：HTTP 请求解析、参数验证、响应格式化
- **原则**：
  - 不包含业务逻辑，只负责数据转换和验证
  - 使用 Echo 的绑定和验证功能
  - 统一错误处理和响应格式
  - 记录请求日志

```go
// 示例：用户注册处理器
func (h *UserHandler) Register(c echo.Context) error {
    var req UserRegisterRequest
    if err := c.Bind(&req); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
    }

    if err := c.Validate(&req); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }

    user, err := h.userService.Register(req)
    if err != nil {
        return err // 由中间件统一处理
    }

    return c.JSON(http.StatusCreated, map[string]interface{}{
        "success": true,
        "data":    user,
    })
}
```

#### 4.1.2 Service 层 (pkg/service/)

- **职责**：核心业务逻辑，处理复杂的业务规则和流程
- **原则**：
  - 包含所有业务规则和验证
  - 调用 Repository 层进行数据操作
  - 处理事务管理
  - 返回业务错误

#### 4.1.3 Repository 层 (pkg/repo/)

- **职责**：数据访问抽象，封装数据库操作
- **原则**：
  - 只负责数据的 CRUD 操作
  - 不包含业务逻辑
  - 使用 GORM 进行数据库操作
  - 定义清晰的接口

#### 4.1.4 Model 层 (pkg/model/)

- **职责**：数据结构定义，包括数据库模型和 DTO
- **原则**：
  - 数据库模型使用 GORM 标签
  - 请求/响应 DTO 使用 JSON 标签
  - 添加必要的验证标签

### 4.2 API 设计规范

#### 4.2.1 RESTful 设计

- **资源命名**：使用复数名词，如 `/api/v1/users`
- **HTTP 方法**：
  - `GET`: 获取资源
  - `POST`: 创建资源
  - `PUT`: 完整更新资源
  - `PATCH`: 部分更新资源
  - `DELETE`: 删除资源

#### 4.2.2 统一响应格式

```go
// 成功响应
{
    "success": true,
    "data": {},
    "message": "操作成功"
}

// 错误响应
{
    "success": false,
    "error": {
        "code": "USER_NOT_FOUND",
        "message": "用户不存在"
    }
}

// 分页响应
{
    "success": true,
    "data": {
        "items": [],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 100,
            "pages": 10
        }
    }
}
```

#### 4.2.3 错误处理

- **使用标准 HTTP 状态码**
- **提供清晰的错误信息**
- **定义业务错误码**
- **记录错误日志**

### 4.3 安全性规范

#### 4.3.1 输入验证

- **所有用户输入必须验证**
- **使用 validator 库进行参数验证**
- **防止 SQL 注入（使用 GORM）**
- **防止 XSS 攻击**

#### 4.3.2 身份认证

- **使用 JWT 进行身份认证**
- **密码使用 bcrypt 加密**
- **实现 token 刷新机制**
- **设置合理的 token 过期时间**

### 4.4 性能优化

#### 4.4.1 数据库优化

- **合理使用索引**
- **避免 N+1 查询问题**
- **使用预加载（Preload）**
- **分页查询大数据集**

#### 4.4.2 缓存策略

- **对频繁查询的数据使用缓存**
- **设置合理的缓存过期时间**
- **缓存失效策略**

### 4.5 日志和监控

#### 4.5.1 日志规范

- **使用结构化日志（logrus）**
- **记录关键操作和错误**
- **不记录敏感信息**
- **设置合适的日志级别**

### 4.6 注释规范

- **公开函数**：必须有清晰的注释说明功能、参数和返回值
- **复杂逻辑**：对于复杂的业务逻辑，添加必要的行内注释
- **接口定义**：所有接口必须有详细的注释
- **常量和变量**：重要的常量和全局变量需要注释说明

## 5. 前端开发规约 (Frontend Rules)

### 5.1 组件开发规范

#### 5.1.1 组件分类和组织

- **页面组件** (`pages/`): 路由对应的页面级组件
- **布局组件** (`components/layout/`): 页面布局相关组件
- **业务组件** (`components/business/`): 特定业务逻辑组件
- **通用组件** (`components/ui/`): 可复用的 UI 组件（基于 shadcn/ui）
- **表单组件** (`components/form/`): 表单相关组件

#### 5.1.2 组件设计原则

- **单一职责**：每个组件只负责一个功能或展示一个 UI 片段
- **可复用性**：通用组件应该高度可配置和可复用
- **可测试性**：组件应该易于单元测试
- **可访问性**：遵循 WCAG 无障碍访问标准

#### 5.1.3 组件命名规范

```typescript
// 组件文件命名：PascalCase
// UserProfile.tsx, LoginForm.tsx, DataTable.tsx

// 组件导出
export const UserProfile: React.FC<UserProfileProps> = ({ ... }) => {
  // 组件实现
};

// Props 类型定义
interface UserProfileProps {
  userId: string;
  onEdit?: (user: User) => void;
  className?: string;
}
```

#### 5.1.4 组件结构模板

```typescript
import React from "react";
import { cn } from "@/lib/utils";

// Props 接口定义
interface ComponentProps {
  // 必需属性
  title: string;
  // 可选属性
  description?: string;
  // 事件处理
  onClick?: () => void;
  // 样式相关
  className?: string;
  children?: React.ReactNode;
}

// 组件实现
export const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onClick,
  className,
  children,
}) => {
  return (
    <div className={cn("default-styles", className)}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

// 默认导出（如果需要）
export default Component;
```

### 5.2 状态管理规范 (Zustand)

#### 5.2.1 Store 设计原则

- **按功能模块分割**：每个业务模块一个 store
- **状态扁平化**：避免深层嵌套的状态结构
- **不可变更新**：使用 immer 或展开运算符更新状态

#### 5.2.2 Store 结构模板

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// 状态类型定义
interface UserState {
  // 状态数据
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;

  // 同步操作
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 异步操作
  fetchUser: (id: string) => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;

  // 重置操作
  reset: () => void;
}

// Store 实现
export const useUserStore = create<UserState>()();
devtools(
  immer((set, get) => ({
    // 初始状态
    user: null,
    users: [],
    loading: false,
    error: null,

    // 同步操作
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // 异步操作
    fetchUser: async (id) => {
      set({ loading: true, error: null });
      try {
        const user = await userApi.getUser(id);
        set({ user, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    // 重置操作
    reset: () =>
      set({
        user: null,
        users: [],
        loading: false,
        error: null,
      }),
  })),
  { name: "user-store" }
);
```

#### 5.2.3 状态使用规范

- **选择性订阅**：只订阅组件需要的状态片段
- **避免过度渲染**：使用 shallow 比较或选择器函数

```typescript
// 好的做法：选择性订阅
const { user, loading } = useUserStore((state) => ({
  user: state.user,
  loading: state.loading,
}));

// 避免：订阅整个 store
const userStore = useUserStore(); // 会导致不必要的重渲染
```

### 5.3 路由管理规范 (React Router DOM)

#### 5.3.1 路由配置

```typescript
// router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// 懒加载页面组件
const HomePage = lazy(() => import("@/pages/HomePage"));
const UserPage = lazy(() => import("@/pages/UserPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users/:id",
        element: <UserPage />,
        loader: userLoader, // 数据预加载
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
```

#### 5.3.2 路由守卫

```typescript
// components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

### 5.4 样式开发规范 (TailwindCSS)

#### 5.4.1 样式组织

- **原子化优先**：优先使用 Tailwind 工具类
- **组件样式**：复杂样式使用 `@apply` 或 CSS-in-JS
- **主题定制**：TailwindCSS v4+ 使用 CSS 变量进行主题定制，无需配置文件

#### 5.4.2 响应式设计

```typescript
// 移动优先的响应式设计
<div
  className="
  w-full p-4
  sm:w-1/2 sm:p-6
  md:w-1/3 md:p-8
  lg:w-1/4 lg:p-10
"
>
  响应式内容
</div>
```

#### 5.4.3 样式复用

```typescript
// lib/styles.ts - 样式工具函数
export const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export const getButtonClasses = (variant: keyof typeof buttonVariants) => {
  return cn(
    "px-4 py-2 rounded-md font-medium transition-colors",
    buttonVariants[variant]
  );
};
```

### 5.5 API 调用规范

#### 5.5.1 API 客户端

```typescript
// api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 处理未授权
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

#### 5.5.2 API 服务层

```typescript
// api/userApi.ts
export const userApi = {
  getUser: (id: string): Promise<User> => apiClient.get(`/users/${id}`),

  createUser: (userData: CreateUserRequest): Promise<User> =>
    apiClient.post("/users", userData),

  updateUser: (id: string, userData: UpdateUserRequest): Promise<User> =>
    apiClient.put(`/users/${id}`, userData),

  deleteUser: (id: string): Promise<void> => apiClient.delete(`/users/${id}`),
};
```

### 5.6 性能优化

#### 5.6.1 代码分割

- **路由级分割**：使用 `React.lazy` 分割页面组件
- **组件级分割**：大型组件使用动态导入
- **第三方库分割**：大型依赖库单独打包

#### 5.6.2 渲染优化

- **使用 React.memo**：防止不必要的重渲染
- **使用 useMemo/useCallback**：缓存计算结果和函数
- **虚拟滚动**：长列表使用虚拟滚动

### 5.7 类型定义规范

#### 5.7.1 接口定义

```typescript
// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}
```

### 5.8 测试规范

#### 5.8.1 单元测试

- **组件测试**：测试组件的渲染和交互
- **Hook 测试**：测试自定义 Hook 的逻辑
- **工具函数测试**：测试纯函数的输入输出

### 5.9 注释规范

- **组件注释**：复杂组件需要说明其用途和主要功能
- **业务逻辑注释**：对于复杂的业务逻辑，添加必要的注释说明
- **类型注释**：复杂类型定义需要注释说明
- **API 注释**：API 调用需要注释说明用途和参数

## 6. 开发工具和环境 🛠️

### 6.1 必需工具

#### 6.1.1 后端开发工具

- **Go**: 1.24+ 版本
- **Air**: 热重载工具，提升开发效率
- **golangci-lint**: 代码质量检查工具
- **Docker**: 容器化部署
- **Make**: 项目管理和构建工具

#### 6.1.2 前端开发工具

- **Node.js**: 18+ 版本
- **Bun**: 快速的 JavaScript 运行时和包管理器
- **TypeScript**: 类型安全的 JavaScript
- **Vite**: 快速的构建工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化

### 6.2 Git 工作流

#### 6.2.1 分支策略

- **main**: 主分支，保持稳定可发布状态
- **develop**: 开发分支，集成最新功能
- **feature/\***: 功能分支，开发新功能
- **hotfix/\***: 热修复分支，紧急修复生产问题

#### 6.2.2 提交规范

```bash
# 提交格式
<type>(<scope>): <subject>

# 类型说明
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动

# 示例
feat(user): add user registration API
fix(auth): resolve JWT token validation issue
docs(readme): update installation instructions
```

## 7. 部署和运维 🚀

### 7.1 Docker 部署

#### 7.1.1 构建镜像

```bash
# 构建完整应用镜像（包含前端静态文件的单一二进制）
# 使用 Makefile 构建项目
make build

# 构建 Docker 镜像
docker build -t go-react-app .

# 直接运行容器
docker run -p 8080:8080 go-react-app

# 或使用 Makefile 的 Docker 命令
make docker-build
make docker-run

# 或使用 docker-compose 启动（推荐用于生产环境）
make docker-compose-up
```

#### 7.1.2 环境变量

```bash
# .env 文件示例
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-secret-key
PORT=8080
```

### 7.2 生产环境配置

#### 7.2.1 安全配置

- **HTTPS**: 使用 SSL/TLS 证书
- **CORS**: 配置正确的跨域策略
- **Rate Limiting**: 实现请求频率限制
- **Input Validation**: 严格的输入验证
- **Error Handling**: 不暴露敏感错误信息

#### 7.2.2 性能优化

- **数据库连接池**: 合理配置连接池大小
- **缓存策略**: Redis 缓存热点数据
- **CDN**: 静态资源使用 CDN
- **Gzip 压缩**: 启用响应压缩
- **监控告警**: 设置性能监控和告警

## 📚 参考资源

### 官方文档

- [Go 官方文档](https://golang.org/doc/)
- [Echo 框架文档](https://echo.labstack.com/)
- [GORM 文档](https://gorm.io/docs/)
- [React 官方文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)

### 工具文档

- [Air 热重载工具](./air.md)
- [golangci-lint 配置](./golangci-lint.md)
- [Docker 部署指南](./docker.md)
- [配置管理说明](./configuration.md)

---

**最后更新**: 2024 年 12 月
**维护者**: 项目团队
**版本**: v1.0.0
