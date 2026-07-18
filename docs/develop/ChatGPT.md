---
title: Codex指南
comments: true
tags:
    - Codex
    - AI
    - OpenAI
---

# OpenAI Codex 完全指南

## 什么是 Codex？

OpenAI Codex 是 OpenAI 在 2025 年正式推出的新一代 AI 软件工程智能体（Coding Agent），被定位为"AI 软件工程队友"。截至目前（2026 年），Codex 被认为是与 Claude Code 并列的最强编程智能体之一。

!!! info "注意"
    现在的 Codex 已经远超 2021 年的那个纯代码生成模型（那个老 Codex 早已下线），它是完整的自主编码 Agent 系统，能真正"像工程师一样工作"。

**一句话理解：Codex = 会"读项目、改代码、跑测试、给补丁"的 AI 程序员，而不是只会聊天的代码生成器。**

## Codex 的核心能力

- **代码生成**：通过自然语言描述生成代码
- **代码解释**：解释现有代码功能和逻辑
- **代码调试**：识别并修复代码错误
- **代码优化**：提供代码改进建议
- **多方案生成**：一次生成多个解决方案供选择
- **并行任务处理**：同时处理多个独立编程任务
- **多模态理解**：支持截图、草图等图像输入
- **沙盒环境**：在云端隔离容器中运行，安全可靠

## Codex 与普通 ChatGPT 写代码的区别

| 特性 | 普通 ChatGPT | Codex |
|------|-------------|-------|
| 代码执行 | ❌ 只能生成代码 | ✅ 可实际运行代码 |
| 项目理解 | ❌ 上下文有限 | ✅ 理解大型代码库 |
| 测试能力 | ❌ 无法测试 | ✅ 自动执行测试 |
| 文件操作 | ❌ 无法操作文件 | ✅ 读取/修改文件 |
| 环境控制 | ❌ 无环境 | ✅ 沙盒环境 |
| 执行时间 | 即时响应 | 1-30 分钟 |

## 使用 Codex 的方式

### 1. ChatGPT 中使用（推荐新手）

Codex 已集成到 ChatGPT 中，付费用户可直接使用：

1. 订阅 ChatGPT Plus/Pro（20美元/月起）
2. 在 ChatGPT 侧边栏找到 Codex 入口
3. 点击 "Code" 按钮分配编码任务
4. 点击 "Ask" 按钮咨询代码问题

**使用示例**：

```
帮我修复这个 bug
为这个函数编写单元测试
重构这个模块，提高性能
将这个 Python 脚本迁移到 TypeScript
```

**支持的订阅类型**：

| 订阅类型 | Codex 访问权限 |
|---------|---------------|
| Free | ❌ 不可用 |
| Plus | ✅ 可用 |
| Pro | ✅ 可用（优先） |
| Team | ✅ 可用 |
| Enterprise | ✅ 可用 |

### 2. Codex CLI（命令行工具）

Codex CLI 是 OpenAI 推出的开源命令行编码智能体，可在终端直接运行。

#### 系统要求

- Node.js 18 或更高版本
- npm、yarn、pnpm 或 bun 包管理器
- OpenAI API Key

#### 安装

```bash
# 推荐：通过 npm 安装
npm install -g @openai/codex

# 或使用 yarn
yarn global add @openai/codex

# 或使用 pnpm
pnpm add -g @openai/codex

# 或使用 bun
bun add -g @openai/codex
```

#### 验证安装

```bash
codex --version
```

#### 配置 API Key

```bash
# macOS/Linux（临时设置）
export OPENAI_API_KEY="sk-你的API密钥"

# macOS/Linux（永久设置，添加到 ~/.zshrc 或 ~/.bashrc）
echo 'export OPENAI_API_KEY="sk-你的API密钥"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell（临时）
$env:OPENAI_API_KEY="sk-你的API密钥"

# Windows CMD（临时）
set OPENAI_API_KEY=sk-你的API密钥
```

#### 基本使用

```bash
# 修复构建错误
codex "fix build errors"

# 编写单元测试
codex "Write unit tests for utils/date.ts"

# 解释正则表达式
codex "Explain what this regex does: ^(?=.*[A-Z]).{8,}$"

# 全自动模式生成迁移脚本
codex --approval-mode full-auto "Generate SQL migrations"

# 分析代码库
codex "Analyze the architecture of this project"

# 安全审计
codex "Find potential security vulnerabilities in this codebase"
```

#### 运行模式

| 模式 | 命令参数 | 说明 |
|------|---------|------|
| 建议模式 | `--approval-mode suggest` | 仅建议修改，不自动执行 |
| 半自动模式 | `--approval-mode auto-edit` | 自动修改，需确认 |
| 全自动模式 | `--approval-mode full-auto` | 全自动执行，无需确认 |

!!! warning "警告"
    使用 `full-auto` 模式时请确保在 Git 环境下工作，以便在出现问题时回滚更改。

#### 常用命令参数

```bash
# 指定模型
codex --model gpt-5-codex "你的任务"

# 设置推理努力程度
codex --reasoning-effort high "你的任务"

# 使用图片输入
codex --image screenshot.png "根据这个截图生成代码"

# 查看帮助
codex --help
```

### 3. VS Code 插件

1. 打开 VS Code 扩展市场
2. 搜索 "OpenAI Codex"
3. 安装官方插件
4. 配置 API 密钥
5. 使用快捷键或命令面板调用 Codex

### 4. API 调用

开发者可以通过 OpenAI API 直接调用 Codex：

```python
from openai import OpenAI

client = OpenAI(
    api_key="你的API密钥",
    base_url="https://api.openai.com/v1"
)

response = client.responses.create(
    model="codex-1",
    input="编写一个 Python 函数，实现快速排序算法",
    tools=[{
        "type": "code_interpreter"
    }]
)

print(response.output_text)
```

## 配置文件说明

Codex CLI 支持通过配置文件自定义行为。

### 配置文件位置

- **macOS/Linux**：`~/.codex/config.toml`
- **Windows**：`C:\Users\<用户名>\.codex\config.toml`

### 配置示例

```toml
# 模型配置
model = "gpt-5-codex"
model_reasoning_effort = "high"  # low, medium, high
disable_response_storage = true

# OpenAI 提供商配置
[model_providers.openai]
api_key = "你的API密钥"

# 自定义提供商（如使用中转服务）
[model_providers.custom]
name = "Custom Provider"
api_key = "你的API密钥"
base_url = "https://your-api-endpoint.com/v1"
```

## AGENTS.md 规范

Codex 支持通过 `AGENTS.md` 文件提供项目级别的指导，该文件可以放在项目的任何位置（通常在根目录）。

### 示例 AGENTS.md

```markdown
# 项目指南

## 测试规范
- 使用 pytest 运行测试：`pytest tests/`
- 测试覆盖率要求 80% 以上
- 每个新功能必须包含测试用例

## 代码风格
- 遵循 PEP 8 规范
- 使用 black 格式化代码
- 行长度限制 88 字符

## PR 要求
- 描述清晰的变更内容
- 关联相关 issue
- 通过所有 CI 检查

## 禁止事项
- 不要修改 .env 文件
- 不要直接提交到 main 分支
- 不要删除现有测试用例
```

## 最新模型

### GPT-5.2-Codex

2025 年 12 月发布，主要特性：

| 特性 | 说明 |
|------|------|
| 长程任务优化 | 原生上下文压缩技术，处理大型代码仓库不丢失进度 |
| 重构增强 | 大规模代码重构和迁移更稳定 |
| Windows 适配 | Windows 环境性能大幅提升 |
| 安全能力 | 网络安全能力显著增强 |
| 词元效率 | 编码任务的词元效率显著提升 |

### GPT-5.2-Codex-Max

更高性能变体，为复杂开发场景提供支持：

- 更强的推理能力
- 更长的上下文窗口
- 更复杂的多步骤任务处理

## Codex vs Claude Code

| 特性 | Codex | Claude Code |
|------|-------|-------------|
| 开发商 | OpenAI | Anthropic |
| 擅长领域 | 代码审查、问题发现、系统分析 | 原始代码生成、快速开发 |
| 推理风格 | 系统化、深入分析 | 快速、直觉式 |
| 多模态 | ✅ 支持 | ✅ 支持 |
| CLI | ✅ 开源 | ✅ 可用 |
| IDE 集成 | ✅ VS Code | ✅ 多种 IDE |

**推荐工作流**：使用 Claude Code 写代码，使用 Codex 做代码审查和 bug 检测。

## 实用技巧

### 1. 编写高效的 Prompt

```markdown
# 好的 Prompt 示例
为 utils/date.ts 文件中的 formatDate 函数编写单元测试：
- 测试正常日期格式化
- 测试边界情况（空值、无效日期）
- 测试不同时区的处理
- 使用 Jest 测试框架
```

```markdown
# 不好的 Prompt 示例
写个测试
```

### 2. 分步处理复杂任务

```bash
# 第一步：分析项目结构
codex "分析这个项目的架构和主要模块"

# 第二步：生成具体代码
codex "为 user 模块实现登录功能"

# 第三步：编写测试
codex "为登录功能编写单元测试和集成测试"

# 第四步：代码审查
codex "审查刚才的代码变更，检查潜在问题"
```

### 3. 使用 Git 工作流

```bash
# 在开始前创建新分支
git checkout -b codex-feature

# 运行 Codex 任务
codex "实现用户认证功能"

# 检查变更
git diff

# 如果满意，提交
git add .
git commit -m "feat: add user authentication"

# 如果不满意，回滚
git checkout .
```

### 4. 利用多模态能力

```bash
# 从截图生成代码
codex --image ui-design.png "根据这个设计图生成 React 组件"

# 分析架构图
codex --image architecture.png "根据这个架构图创建项目结构"
```

## 常见问题

### Q: Codex 任务需要多长时间？

大多数任务在 1 到 30 分钟内完成，具体取决于任务复杂度。

### Q: Codex 支持哪些编程语言？

支持主流编程语言，包括 Python、JavaScript、TypeScript、Go、Rust、Java、C/C++、Ruby、PHP 等。

### Q: 如何获取 OpenAI API Key？

1. 访问 [OpenAI API 平台](https://platform.openai.com/)
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key

### Q: Codex CLI 在国内如何使用？

可以使用 API 中转服务，在配置文件中设置自定义 `base_url`：

```toml
[model_providers.custom]
base_url = "https://your-proxy.com/v1"
```

### Q: 如何查看 Codex 的执行日志？

Codex 会记录详细的终端日志和测试结果，任务完成后可查看完整记录。

### Q: Codex 会修改我的代码吗？

取决于运行模式：

- `suggest` 模式：只提供建议，不修改
- `auto-edit` 模式：修改但需确认
- `full-auto` 模式：自动修改

## 官方资源

- **Codex 官方产品页**：https://openai.com/codex/
- **Codex 开发者文档**：https://developers.openai.com/codex/
- **Codex CLI GitHub**：https://github.com/openai/codex
- **OpenAI API 平台**：https://platform.openai.com/

## 注意事项

1. **API 费用**：API 调用为收费服务，注意监控使用量，避免意外账单
2. **代码审查**：生成的代码需人工审查，确保质量和安全性
3. **数据安全**：敏感项目谨慎使用，注意数据隐私
4. **版本控制**：强烈建议在 Git 环境下使用，方便回滚
5. **API Key 安全**：不要将 API Key 提交到代码仓库

---

*最后更新：2026年3月*


**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wcowin)