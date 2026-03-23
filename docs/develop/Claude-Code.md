---
title: Claude Code指南
tags:
    - Claude
    - AI
    - Anthropic
---

# Claude Code 完全指南

## 什么是 Claude Code？

Claude Code 是 Anthropic 推出的 AI 驱动编程助手，以终端 CLI 为核心，能够读取整个代码库、编辑文件、运行命令并集成开发工具。它与 OpenAI Codex 并列为目前最强的编程智能体之一。

**一句话理解：Claude Code = 能直接操作你本地文件、执行命令、理解项目的 AI 同事。**

### 核心特点

- **本地环境集成**：直接读取你的文件，熟悉项目结构和编码规范
- **任务执行能力**：能运行测试、执行 lint 检查、读写文件、管理 Git 提交
- **复杂工作协同**：从多文件大规模重构到逐步规划实现新功能
- **多环境支持**：Terminal、VS Code、JetBrains、Desktop App、Web 五种运行环境

### 支持的运行环境

| 环境 | 说明 |
|------|------|
| Terminal | 命令行终端，核心使用方式 |
| VS Code | 通过 IDE 扩展集成 |
| JetBrains | IntelliJ IDEA、PyCharm 等 |
| Desktop App | 桌面应用程序 |
| Web | 网页版使用 |

## 系统要求

### 操作系统

- **macOS**：10.15+
- **Linux**：Ubuntu 20.04+ / Debian 10+
- **Windows**：Windows 10/11 或 WSL

### 硬件要求

- 最低 4GB 内存
- 推荐 8GB+ 内存

### 软件依赖

| 软件 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | 18+ | 必需 |
| Git | 2.23+ | 推荐 |
| GitHub CLI | 最新版 | 可选，用于 PR 工作流 |
| GitLab CLI | 最新版 | 可选，用于 PR 工作流 |
| ripgrep (rg) | 最新版 | 可选，增强文件搜索 |

## 安装指南

### 方式一：原生安装（推荐）

原生安装支持自动后台更新。

**macOS / Linux / WSL**：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell**：

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD**：

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### 方式二：通过 npm 安装

```bash
npm install -g @anthropic-ai/claude-code
```

### 方式三：通过 Homebrew 安装（macOS）

```bash
brew install claude-code
```

### 验证安装

```bash
claude --version
```

## 快速开始

### 1. 启动 Claude Code

```bash
# 进入项目目录
cd your-project

# 启动 Claude Code
claude
```

### 2. 首次配置

首次启动时，系统会引导你完成以下步骤：

1. **选择主题**：选择你喜欢的界面主题
2. **安全须知**：确认安全须知
3. **Terminal 配置**：使用默认配置
4. **工作目录信任**：信任当前目录
5. **登录认证**：通过 OAuth 完成 Claude 账户登录

### 3. 认证方式

Claude Code 支持两种认证方式：

| 方式 | 说明 |
|------|------|
| Claude.ai 账户 | 推荐，需要 Pro 及以上订阅 |
| Claude Console | API 密钥方式，按使用量计费 |

## 基本使用

### 常用命令

```bash
# 直接描述任务
claude "帮我修复 build 错误"

# 分析项目结构
claude "分析这个项目的架构"

# 编写测试
claude "为 utils/date.ts 编写单元测试"

# 重构代码
claude "重构 auth 模块，提高可读性"

# Git 操作
claude "创建一个 PR，描述今天的改动"
```

### 斜杠命令

Claude Code 提供了丰富的斜杠命令：

| 命令 | 说明 |
|------|------|
| `/init` | 生成项目 CLAUDE.md 文件，让 Claude 理解项目 |
| `/plan` | 让 Claude 先规划再动手，避免糟糕架构决策 |
| `/insights` | 根据使用习惯给出个性化建议 |
| `/effort` | 调节思考深度（low/mid/high/max） |
| `/compact` | 压缩对话上下文 |
| `/mcp` | 管理 MCP 服务器 |
| `/help` | 查看帮助信息 |
| `/clear` | 清除当前对话 |
| `/cost` | 查看当前会话的 token 消耗 |

### 思考深度设置

```bash
# 简单任务，节省 token
claude --effort low "格式化这个文件"

# 日常开发，平衡性能
claude --effort mid "添加一个新接口"

# 复杂任务，深度思考
claude --effort high "重构整个认证系统"

# 最深度思考（复杂推理）
claude --effort max "设计微服务架构"
```

## 模型选择

Claude Code 支持多种模型：

| 模型 | 输入价格 | 输出价格 | 适用场景 |
|------|---------|---------|----------|
| Claude Opus 4 | $15/MTok | $75/MTok | 复杂推理、高难度任务 |
| Claude Sonnet 4 | $3/MTok | $15/MTok | 日常开发、高性价比 |

### 切换模型

```bash
# 查看当前配置
claude config list

# 切换模型
claude config set model claude-sonnet-4-20250514
```

## CLAUDE.md 配置文件

### 什么是 CLAUDE.md？

`CLAUDE.md` 是一个特殊文件，Claude Code 在启动时会自动将其拉入上下文。这是让 Claude 理解你项目的关键。

### 文件位置

| 位置 | 说明 |
|------|------|
| 项目根目录 | 最常用，可提交到 Git 共享给团队 |
| `~/.claude/CLAUDE.md` | 用户级全局配置 |
| 子目录 | 按需加载的模块级规则 |

### 生成 CLAUDE.md

```bash
# 进入项目目录
cd your-project

# 让 Claude 自动分析项目并生成
claude "/init"
```

### CLAUDE.md 示例

```markdown
# 项目指南

## 常用命令
- `npm run build`: 构建项目
- `npm run test`: 运行测试
- `npm run typecheck`: 运行类型检查
- `npm run lint`: 代码检查

## 代码风格
- 使用 ES 模块 (import/export) 语法
- 尽可能使用解构导入
- 遵循 PEP 8 规范（Python）
- 使用 black 格式化代码

## 测试规范
- 每个新功能必须包含测试用例
- 测试覆盖率要求 80% 以上
- 使用 pytest 运行 Python 测试

## Git 规范
- 分支命名：feature/xxx, fix/xxx, refactor/xxx
- 提交信息遵循 Conventional Commits

## 注意事项
- 不要修改 .env 文件
- 不要直接提交到 main 分支
```

### CLAUDE.local.md

如果只想本地使用，可创建 `CLAUDE.local.md` 并添加到 `.gitignore`：

```bash
echo "CLAUDE.local.md" >> .gitignore
```

## Rules 规则系统

### 什么是 Rules？

Rules 是更细粒度的规则配置，可以针对不同模块设置不同的规则。

### 配置方式

在 `.claude/rules/` 目录下创建规则文件：

```
.claude/
├── rules/
│   ├── api.md          # API 相关规则
│   ├── frontend.md     # 前端相关规则
│   └── database.md     # 数据库相关规则
```

### Rules 示例

**`.claude/rules/api.md`**：

```markdown
---
globs: ["api/**", "src/api/**"]
---

# API 开发规则

## RESTful 规范
- 使用标准 HTTP 方法：GET, POST, PUT, DELETE
- 返回标准 JSON 格式
- 统一错误处理格式

## 安全要求
- 所有 API 必须验证 token
- 敏感数据必须加密
- 记录所有 API 调用日志
```

## Skills 技能系统

### 什么是 Skills？

Skills 是可复用的自动化工作流，可以把重复的工作打包成模块。

### 使用 Skills

Claude Code 支持从文件或交互方式创建 skills。创建后可以直接调用执行复杂工作流。

## Memory 记忆系统

Claude Code 具有 AI 自动记忆功能，可以记住你在项目中的偏好和习惯。

## MCP (Model Context Protocol)

### 什么是 MCP？

MCP (Model Context Protocol) 是 Anthropic 推出的开放标准协议，让 Claude 能够连接外部工具和数据源，扩展功能边界。

### MCP 架构

```
Host (Claude Desktop/IDE)
    ↔ MCP Client
    ↔ Transport (Stdio/SSE)
    ↔ MCP Server
    ↔ Data Source
```

### 添加 MCP 服务器

```bash
# 添加 Redis MCP 服务器
claude mcp add redis -e REDIS_URL="redis://localhost:6379" -- npx @modelcontextprotocol/server-redis

# 添加 Figma MCP 服务器
claude mcp add --transport http figma https://mcp.figma.com/mcp

# 查看已添加的 MCP 服务器
claude mcp list

# 删除 MCP 服务器
claude mcp remove figma
```

### 项目级 MCP 配置

创建 `.mcp.json` 文件：

```json
{
  "servers": {
    "puppeteer": {
      "command": "uvx",
      "args": ["mcp-server-puppeteer"]
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"]
    }
  }
}
```

### 常用 MCP 服务器

| 服务器 | 说明 |
|--------|------|
| filesystem | 文件系统操作 |
| git | Git 操作 |
| postgres | PostgreSQL 数据库 |
| redis | Redis 缓存 |
| brave-search | Brave 搜索 |
| google-drive | Google Drive |
| puppeteer | 浏览器自动化 |

## API Key 配置

### 官方 API Key

```bash
# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-你的密钥"

# Windows PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-你的密钥"

# Windows CMD
set ANTHROPIC_API_KEY=sk-ant-你的密钥
```

### 使用中转服务

如果需要使用第三方 API 中转服务：

```bash
# 设置中转服务地址
export ANTHROPIC_BASE_URL="https://your-proxy.com/v1"

# 设置 API Key
export ANTHROPIC_API_KEY="你的密钥"
```

### 配置文件方式

在 `~/.claude/settings.json` 中配置：

```json
{
  "autoUpdatesChannel": "latest",
  "apiProvider": "anthropic",
  "baseUrl": "https://your-proxy.com/v1",
  "apiKey": "你的密钥"
}
```

## VS Code 集成

### 安装插件

1. 打开 VS Code 扩展市场
2. 搜索 "Claude Code"
3. 安装官方插件
4. 配置 API 密钥或登录账户

### 推荐配套插件

- **Chat for Claude Code**：让 AI 住进侧边栏
- **Live Preview**：微软官方嵌入式预览

## 实用技巧

### 1. 使用 /init 初始化项目

每次打开新项目都运行：

```bash
claude "/init"
```

这会让 Claude 自动分析项目结构，生成项目文档。

### 2. 复杂任务先规划

```bash
# 先规划再执行
claude "/plan 重构用户认证系统"
```

### 3. 使用 Git 工作流

```bash
# 让 Claude 创建 PR
claude "创建一个 PR，描述今天的改动"

# 让 Claude 提交代码
claude "提交这些更改，写一个清晰的 commit message"
```

### 4. 多模型协作工作流

有开发者分享的完整工作流：

1. 用 Gemini 和 Opus 做详细规划
2. 用 Claude Code 写代码和重构
3. 用 Codex 验证实现和更新测试

### 5. 让 Claude 更新文档

```bash
claude "更新相关的 CLAUDE.md 文件，记录刚才的改动"
```

### 6. 使用 Extended Thinking

对于复杂任务，启用深度思考模式：

```bash
claude --effort max "设计一个新的微服务架构"
```

## 常见问题

### Q: Claude Code 需要什么订阅？

需要 Claude Pro 及以上订阅，或通过 API 密钥按使用量付费。

### Q: 国内如何使用 Claude Code？

可以使用第三方 API 中转服务，配置 `ANTHROPIC_BASE_URL` 环境变量。

### Q: 如何查看当前使用的模型？

```bash
claude config list
```

### Q: 任务执行时间过长怎么办？

可以使用 `--effort low` 降低思考深度，或将复杂任务拆分为多个小任务。

### Q: 如何撤销 Claude 的更改？

在 Git 环境下工作，使用 `git checkout .` 或 `git restore` 撤销更改。

### Q: CLAUDE.md 应该写多长？

建议保持简洁且人类可读。可以定期让 Claude 自动更新，而非手动维护。

## Claude Code vs Codex

| 特性 | Claude Code | Codex |
|------|-------------|-------|
| 开发商 | Anthropic | OpenAI |
| 擅长领域 | 原始代码生成、快速开发 | 代码审查、问题发现、系统分析 |
| 推理风格 | 快速、直觉式 | 系统化、深入分析 |
| 多模态 | ✅ 支持 | ✅ 支持 |
| CLI | ✅ 可用 | ✅ 开源 |
| IDE 集成 | ✅ 多种 IDE | ✅ VS Code |
| 配置系统 | CLAUDE.md, rules, skills | AGENTS.md |
| 扩展能力 | MCP 协议 | 插件系统 |

**推荐工作流**：使用 Claude Code 写代码，使用 Codex 做代码审查和 bug 检测。

## 官方资源

- **Claude Code 官方文档**：https://code.claude.com/docs/zh-CN/overview
- **Claude Code GitHub**：https://github.com/anthropics/claude-code
- **Anthropic Console**：https://console.anthropic.com/
- **MCP 官方文档**：https://modelcontextprotocol.io/

## 注意事项

1. **订阅要求**：需要 Claude Pro 及以上订阅
2. **API 费用**：使用 API 密钥时注意监控使用量
3. **代码审查**：生成的代码需人工审查
4. **数据安全**：敏感项目谨慎使用
5. **版本控制**：建议在 Git 环境下使用
6. **网络要求**：需要稳定的网络连接

---

*最后更新：2026年3月*
