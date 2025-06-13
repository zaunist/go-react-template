# Go + React 全栈模板项目开发规约 (Project Rules)

## 1. 核心原则 ✨

**Less is More (少即是多)**

-   **只做必要的事**：避免过度设计和过早优化。只引入当前功能所必需的依赖和抽象。
-   **代码自解释**：优先通过清晰的命名（变量、函数、文件）和合理的代码结构来让代码不言自明，注释是必要的补充。
-   **利用框架/库的优势**：充分使用 Echo、Gorm、React、TailwindCSS 等工具提供的原生能力，而不是在其上构建不必要的封装。

## 2. 技术栈 (Tech Stack) 🛠️

### 后端 (Backend)

-   **语言**: Go 1.24+
-   **Web 框架**: Echo v4
-   **ORM**: Gorm
-   **数据库**: SQLite
-   **依赖管理**: Go Modules

### 前端 (Frontend)

-   **语言**: Typescript
-   **框架**: React 19+
-   **CSS**: TailwindCSS v4+
-   **状态管理**: Zustand
-   **路由**: React Router DOM
-   **UI 组件库**: shadcn/ui
-   **包管理器**: bun

## 3. 项目结构 (Project Structure) 📂


```plaintext
.
├── api/          # 存放 API 定义文件，例如 OpenAPI/Swagger 文档
├── configs/      # 配置文件模板或默认配置
├── pkg/          # 可在外部应用中使用的库代码 (Public Library Code)
│   ├── database/   # 数据库连接、初始化和迁移
│   ├── handler/    # HTTP 请求处理器 (Echo Handlers)
│   ├── model/      # 数据模型 (Gorm Models)
│   ├── service/    # 业务逻辑层
│   └── repo/       # 数据访问层
├── web/          # 前端 React 项目目录 (create-react-app 结构)
│   ├── public/
│   └── src/
│       ├── components/ # 可复用组件，包括 shadcn/ui
│       ├── lib/        # 工具函数，例如 cn()
│       ├── pages/      # 页面级组件
│       ├── router/     # 路由配置
│       └── store/      # Zustand store
│── main.go             # 项目主入口
├── go.mod
├── go.sum
└── README.md
```

## 4. 后端开发规约 (Backend Rules)

### 4.1 代码分层职责

-   `main.go`: 程序入口。负责初始化配置、数据库连接、Echo 实例、注册路由等。
-   `pkg/database`: 负责 Gorm 和 SQLite 的初始化，以及数据库迁移（AutoMigrate）。
-   `pkg/model`: 定义 Gorm 的数据结构（structs），只包含字段、tag 和表名定义。
-   `pkg/service`: 核心业务逻辑层。处理具体业务，如用户注册的校验、密码加密、数据写入等。**不直接操作 HTTP Request 和 Response**。
-   `pkg/handler`: HTTP 处理层。负责解析和校验 HTTP 请求参数，调用 `service` 层处理业务，并返回标准的 HTTP 响应（成功或失败的 JSON）。
-   `pkg/repo`: 数据访问层。负责与数据库进行交互，执行 CRUD 操作。

### 4.2 API 设计

-   所有 API 路由统一添加 `/api/v1` 前缀。
-   数据交换格式统一为 JSON。
-   返回格式统一：成功时返回 `{ "code": 0, "data": ..., "message": "success" }`，失败时返回 `{ "code": 1, "data": null, "message": "error description" }`。

### 4.3 注释

-   每个 `pkg` 包都需要有包级别的注释，说明该包的用途。
-   每个公开的函数（首字母大写）都需要有清晰的注释，说明其功能、参数和返回值。

## 5. 前端开发规约 (Frontend Rules)

### 5.1 组件化

-   **`pages/`**: 存放页面级组件，负责组织该页面的整体结构，并处理页面级的数据获取和状态。
-   **`components/`**: 存放可复用的 UI 组件。
    -   `components/ui/`: 存放由 `shadcn/ui` cli 生成的基础 UI 组件（Button, Input, Card 等）。
    -   `components/common/`: 存放项目中自定义的、可在多处复用的组合组件。

### 5.2 状态管理

-   **Zustand**: 用于全局状态管理，如用户登录状态、用户信息等。Store 的创建应遵循模块化，例如创建 `authStore` 来专门管理认证信息。
-   对于组件内部的临时状态，优先使用 React 自带的 `useState`。

### 5.3 路由

-   使用 React Router DOM 集中管理路由。在 `src/router/index.tsx` 文件中定义所有页面路由。

### 5.4 样式

-   **TailwindCSS**: 作为主要的样式方案，遵循其 "utility-first" 原则。
-   使用 `clsx` 或 `tailwind-merge` 配合 `shadcn/ui` 提供的 `lib/utils.ts` 中的 `cn` 函数来合并和管理 classNames。

### 5.5 注释

-   每个自定义组件（特别是在 `components/common/` 中）都应该有注释，说明其用途和 props。
-   复杂的业务逻辑或工具函数需要有 JSDoc 风格的注释。