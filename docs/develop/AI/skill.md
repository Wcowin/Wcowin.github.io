---
title: Agent Skills 使用介绍（开放标准）
tags:
  - AI
  - Agent
  - Skill
  - MCP
---

# Agent Skills 使用介绍（开放标准）

> Agent Skills 是一套开放标准，用于为 AI 代理扩展领域能力。本文介绍在 Cursor、Codex、Claude Code 等环境中如何发现、安装、使用和自建 Skill。参考 [Agent Skills 官方规范](https://agentskills.io/)、[GitHub 仓库](https://github.com/agentskills/agentskills) 与 [Cursor 官方文档](https://cursor.com/changelog/2-4)。**内容与示例基于各平台最新版本及开放生态主流实践。**

**适用读者**：已在使用 Cursor、Codex、Claude Code、VS Code、OpenCode、Roo Code 或其他支持 Agent Skills 的 IDE/平台，希望为 Agent 增加可复用流程与规范的开发者或进阶用户。

**重要更新**：  

- **2025 年 12 月 18 日**：Anthropic 正式发布 [Agent Skills 开放标准](https://agentskills.io/)  
- **2026 年 1 月 22 日**：Cursor 2.4 正式引入 Agent Skills 支持，同时引入了 Subagents（子代理）功能  
- 目前已被 **35+** 个 Agent 产品采用

## 什么是 Skill

**Skill（技能）** 是一个可移植、可版本控制的「能力包」，用来教 Agent 如何完成某一类具体任务。它由 Anthropic 在 **2025 年 12 月 18 日**作为[开放标准](https://agentskills.io/)发布，目前已被 **35+** 个 Agent 产品采用，包括 Cursor、OpenAI Codex、Claude Code、OpenCode、Roo Code、Gemini CLI、VS Code、OpenHands、Goose、JetBrains Junie、Windsurf 等。

一个 Skill 可以包含：

- **说明文档**：在 `SKILL.md` 里写清何时用、怎么用、步骤与规范
- **脚本**：可执行的部署、校验、生成等脚本（放在 `scripts/` 目录）
- **参考资料与模板**：放在 `references/`、`assets/` 中，按需加载

---

## Subagents（子代理）简介

> **注意**：Subagents 是 Cursor 2.4+ 引入的功能，不同 Agent 产品对子代理的支持程度可能不同。

Subagents（子代理）是 Agent Skills 生态系统的重要组成部分，允许创建专门的独立代理来处理父代理任务中的特定部分：

### 核心特点

| 特性 | 说明 |
|------|------|
| **并行执行** | 多个子代理可同时运行，提升整体执行速度 |
| **独立上下文** | 每个子代理拥有独立的上下文，避免主对话过于臃肿 |
| **专用配置** | 可自定义提示词、工具访问权限和模型配置 |

### 典型应用场景

- **代码库分析**：专门处理大型代码库的搜索和理解
- **终端命令执行**：在隔离环境中安全执行命令
- **并行工作流**：同时处理多个独立任务

### 与 Skills 的关系

Skills 定义了「做什么」和「怎么做」，而 Subagents 提供了「谁来执行」的能力。二者结合可以实现：
- Skill 定义任务流程
- Subagent 专门执行特定类型的任务
- 主 Agent 协调调度

---

### Skill vs MCP vs Rules

| 特性 | Skill | MCP | Rules |
|------|-------|-----|-------|
| **用途** | 定义「如何做」的流程与规范 | 连接外部工具和数据源 | 始终生效的约束和标准 |
| **加载时机** | Agent 判断相关时动态加载 | 始终可用 | 始终在上下文中 |
| **Token 成本** | 仅元数据（~100 tokens），触发时才加载完整内容 | 工具定义（较小） | 始终占用上下文 |
| **适用场景** | 可复用的工作流程、领域专业知识 | 工具能力扩展 | 编码规范、架构约束 |
| **可移植性** | 跨平台（开放标准） | 跨平台（开放协议） | 平台特定 |

**简单理解**：
- **MCP** 提供「专业厨房」（工具、食材、设备的访问能力）
- **Skill** 提供「菜谱」（如何使用这些工具创造价值的步骤说明）
- **Rules** 提供「厨房规则」（始终遵守的卫生标准、安全规范）

三者结合使用效果最佳：MCP 负责「连工具」，Rules 负责「定规范」，Skill 负责「教流程」。

---

## 渐进式加载机制（Progressive Disclosure）

Agent Skills 最重要的设计是**三级渐进式加载**，最大化降低 Token 成本：

### Level 1: 元数据（~100 tokens/Skill）

启动时，只加载 YAML frontmatter 中的 `name` 和 `description`。Agent 知道这个 Skill 存在、做什么、何时用，但几乎不占用上下文。

```yaml
---
name: code-review
description: >
  Reviews code for bugs, security vulnerabilities, and performance issues.
  Use when user asks for code review, PR feedback, or security audit.
---
```

### Level 2: 完整说明（<5,000 tokens）

当 Agent 判断某个 Skill 相关时，才从文件系统读取完整的 `SKILL.md` 内容。这时详细的步骤、工作流程、示例才进入上下文。

### Level 3: 资源文件（按需加载）

`scripts/`、`references/`、`assets/` 中的文件只在说明中引用时才加载。可执行脚本通过 Shell 运行，只有输出（而非源码）进入上下文，极大节省 Token。

| 级别 | 加载时机 | Token 成本 | 内容 |
|------|---------|-----------|------|
| **元数据** | 启动时（始终） | ~100 tokens/Skill | `name` 和 `description` |
| **说明** | Skill 被触发时 | <5,000 tokens | `SKILL.md` 正文 |
| **资源** | 按需引用时 | 几乎无限制 | 脚本、文档、模板 |

**实际意义**：你可以安装几十个 Skill，只要不同时触发，上下文成本极低。可以在 Skill 中打包大量 API 文档、数据集、示例代码，只在需要时才加载。

---

## Skill 从哪里加载

Cursor / Codex 会在以下目录自动发现 Skill（每个 Skill 是一个**文件夹**，且内含 `SKILL.md`）：

| 路径 | 作用域 | 说明 |
|------|--------|------|
| `.cursor/skills/` | 当前项目 | Cursor 项目级 Skills |
| `.codex/skills/` | 当前项目 | Codex 项目级 Skills |
| `.claude/skills/` | 当前项目 | Claude Code 项目级 Skills |
| `.agents/skills/` | 当前项目 | 开放标准推荐路径（部分产品支持）|
| `~/.cursor/skills/` | 用户全局 | Cursor 全局 Skills |
| `~/.codex/skills/` | 用户全局 | Codex 全局 Skills |
| `~/.claude/skills/` | 用户全局 | Claude Code 全局 Skills |

**注意**：虽然开放标准推荐使用 `.agents/` 目录，但目前各产品仍使用各自的目录约定（`.cursor/`、`.claude/`、`.roo/`、`.opencode/` 等）。如果需要跨平台使用，可以使用 [skills.sh CLI](https://skills.sh/) 工具一键安装到多个平台，或手动复制 Skill 文件夹。

Agent 启动时会扫描这些目录，根据当前对话上下文自动判断是否启用某个 Skill；你也可以在对话里**手动调用**（见下文）。

---

## 如何「使用」已有 Skill

### 自动被调用

- 启动 Cursor（或 Codex）后，已安装的 Skill 会自动被发现。
- Agent 会根据你的问题与描述，自动选择它认为相关的 Skill 并遵循其中的说明执行。

### 手动调用

- 在 **Agent 聊天框**里输入 **`/`**，会弹出可用的 Skill 列表，搜索并选择即可。
- 也可以用 **`/skill-name`** 或 **`$skill-name`** 直接指定要用的技能（视具体产品而定）。

### 在 Cursor 里查看已发现的 Skill

1. 打开 **Rules**（规则）相关界面  
2. 进入 **Cursor Settings**（Mac：`Cmd+Shift+J`，Windows/Linux：`Ctrl+Shift+J`）  
3. 在「Agent Decides」或 Rules 区域可看到当前项目/用户下被发现的 Skill

---

## 如何安装 Skill

### 方式一：从 GitHub 安装（Cursor）

1. 打开 **Cursor Settings → Rules**
2. 在 **Project Rules** 里点击 **Add Rule**
3. 选择 **Remote Rule (Github)**，填入 Skill 的 GitHub 仓库 URL，按提示完成添加

### 方式二：用 Skills CLI 发现并安装（推荐）

[skills.sh](https://skills.sh/) 是 Agent Skills 生态的官方 CLI 工具，提供跨平台的 Skill 管理能力：

```bash
# 按关键词搜索 Skill
npx skills find [关键词]

# 安装整个技能库或指定技能（二选一）
npx skills add vercel-labs/agent-skills -g -y
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -g -y

# 检查/更新已安装 Skill
npx skills check
npx skills update

# 列出已安装技能
npx skills list
```

**常用选项说明**：
| 选项 | 说明 |
|------|------|
| `-g` | 安装到用户目录（全局），否则安装到当前项目 |
| `-y` | 跳过确认提示 |
| `-a <agent>` | 指定安装到特定 Agent（如 `-a cursor,codex`） |
| `--skill <name>` | 只安装仓库中的指定技能 |

**支持的 Agent**：Cursor、Codex、Claude Code、OpenCode、Roo Code 等 35+ 种。

**隐私设置**：若不想上报匿名使用统计，可设置环境变量 `DISABLE_TELEMETRY=1`。

**注意**：安装后一般需要**重启 IDE/Agent** 才能识别新 Skill。

### 方式三：手动放到技能目录

- 把含有 `SKILL.md` 的 Skill 文件夹复制到上面任一「Skill 目录」即可，例如：
  - 项目级：`<项目根>/.cursor/skills/my-skill/`
  - 用户级：`~/.cursor/skills/my-skill/` 或 `~/.codex/skills/my-skill/`

---

## SKILL.md 长什么样

每个 Skill 必须有一个 **`SKILL.md`**，且带有 **YAML 前置元数据**。

### 最简示例

```markdown
---
name: my-skill
description: 简短说明：这个技能做什么、什么时候用。
---

# My Skill

给 Agent 看的详细说明。

## When to Use

- 当用户需要……时使用
- 适合用来……

## Instructions

- 步骤一
- 步骤二
- 若需和用户确认，可使用提问类工具
```

### 常用 frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 技能标识，1-64 字符，**必须**仅含小写字母、数字与连字符（kebab-case），且**必须与所在文件夹名一致** |
| `description` | 是 | 1-1,024 字符，必须同时说明「做什么」和「何时用」，包括具体的触发短语。这是最关键的字段，决定 Agent 何时加载此 Skill |
| `license` | 否 | 许可证名称或引用 |
| `compatibility` | 否 | 环境要求（如系统依赖、网络等） |
| `metadata` | 否 | 任意键值对，可用于作者、版本等自定义属性 |
| `allowed-tools` | 否 | 预批准的工具列表（实验性功能） |
| `disable-model-invocation` | 否 | 设为 `true` 时，只有用户显式输入 `/skill-name` 时才会加入上下文，不会自动被 Agent 选用 |

### 编写好的 description 的技巧

`description` 是整个 Skill 最关键的部分，它决定 Agent 何时加载这个 Skill。好的 description 应该：

1. **明确说明做什么**：清楚描述 Skill 的功能
2. **列出触发场景**：包含用户可能说的关键词和短语
3. **保持简洁**：1-1,024 字符内

**示例**：

```yaml
# ❌ 不好的 description
description: API documentation generator

# ✅ 好的 description  
description: >
  Generates API reference documentation from code annotations.
  Use when user says "document this API", "generate API docs",
  or "create endpoint documentation". Supports REST and GraphQL.
```

### 只允许「手动调用」的 Skill

若希望某个 Skill 像传统「斜杠命令」一样，仅在被明确输入时才生效，在 frontmatter 里加上：

```yaml
disable-model-invocation: true
```

---

## 在 Skill 里放脚本和资料

除了 `SKILL.md`，还可以在同一个 Skill 目录下增加可选子目录：

| 目录 | 用途 |
|------|------|
| `scripts/` | 可执行脚本（如 deploy.sh、validate.py），在 SKILL.md 里用相对路径引用 |
| `references/` | 补充文档，按需被 Agent 加载 |
| `assets/` | 静态资源（模板、配置、图片等） |

示例结构：

```
.cursor/skills/deploy-app/
├── SKILL.md
├── scripts/
│   ├── deploy.sh
│   └── validate.py
├── references/
│   └── REFERENCE.md
└── assets/
    └── config-template.json
```

在 `SKILL.md` 里用相对路径说明如何调用脚本，例如：

```markdown
## Usage

运行部署脚本：`scripts/deploy.sh <环境>`，其中 `<环境>` 为 staging 或 production。
部署前请先执行校验：`python scripts/validate.py`
```

Agent 会按你的说明在合适时机执行这些脚本。

---

## 从规则/命令迁移到 Skill（Cursor 2.4+）

自 Cursor 2.4 起引入 Agent Skills；若你之前用 Cursor 的「动态规则」（`.cursor/rules/*.mdc`）或「斜杠命令」（`.cursor/commands/*.md`），可用内置迁移能力转成 Skill：

1. 在 Agent 聊天里输入 **`/migrate-to-skills`**
2. Agent 会识别可迁移的规则与命令，并在 `.cursor/skills/` 下生成对应 Skill
3. 斜杠命令会变成带 `disable-model-invocation: true` 的 Skill，保持「仅手动调用」的行为

迁移完成后检查 `.cursor/skills/` 里的内容，按需微调 `SKILL.md`。

---

## 注意事项与常见问题

### 安装相关

- **安装或更新 Skill 后不生效**：重启 Cursor 或 Codex 后再试；确认 Skill 目录无误（项目级 vs 用户级）。
- **符号链接不生效**：部分版本的 Cursor 不支持符号链接发现 Skills，需要直接复制文件夹。

### 触发相关

- **Agent 从不选用某个 Skill**：
  - 检查 `description` 是否包含足够的触发关键词
  - 测试方法：问 Agent "什么时候会用 [skill-name] Skill？"，它会引用 description
  - 如果 description 不够明确，补充更多触发短语
- **Agent 过度触发某个 Skill**：缩小 description 的范围，添加更具体的限定条件
- **想要手动控制触发**：设置 `disable-model-invocation: true`，然后用 `/skill-name` 手动调用

### 执行相关

- **脚本执行失败**：
  - 确认 `scripts/` 下文件有执行权限（`chmod +x scripts/*.sh`）
  - 确认 SKILL.md 中引用的路径为相对路径
  - 检查脚本依赖的工具是否已安装
- **跨平台兼容性问题**：不同 Agent 产品的运行环境可能不同，有些在沙箱中运行（无网络访问、包限制），在 `compatibility` 字段中说明环境要求

### 安全相关

- **只使用可信来源的 Skills**：Skills 可以包含可执行代码，恶意 Skill 可能执行危险操作
- **审查所有文件**：安装前检查 `scripts/` 目录中的所有脚本
- **使用版本锁定**：生产环境中锁定 Skill 版本，避免自动更新带来的风险

---

## 实际应用场景

### 场景 1：文档和资产创建

Skills 可以嵌入样式指南、品牌标准、模板结构，让 Agent 产出一致、高质量的内容。

**示例**：Anthropic 提供的预置 Skills 包括 PowerPoint、Excel、Word、PDF 生成等。

### 场景 2：工作流自动化

多步骤流程受益于明确的步骤排序、每个阶段的验证门槛、失败时的回滚说明。

**示例**：`sprint-planning` Skill 可以自动从项目管理工具获取待办事项、分析团队速度、建议任务优先级、创建带估算的任务。

### 场景 3：MCP 增强

Skills 在工具连接之上添加知识层。没有 Skills 时，用户连接 MCP 服务器后需要自己摸索最佳工作流程；有了 Skills，这些工作流程自动激活。

**示例**：Sentry 的 `sentry-code-review` Skill 协调多个 MCP 调用，使用 Sentry 的错误监控数据分析 GitHub PR 中的 bug。

---

## 构建你的第一个 Skill

### 步骤 1：定义用例

问自己：
- 用户想完成什么？
- 需要哪些多步骤工作流程？
- 应该嵌入什么领域知识？

### 步骤 2：编写 frontmatter

`description` 是最关键的部分，决定 Agent 何时加载 Skill。好的 description 包括：
- Skill 做什么
- 何时使用
- 用户可能说的具体关键词或短语

```yaml
---
name: api-documentation
description: >
  Generates API reference documentation from code annotations.
  Use when user says "document this API", "generate API docs",
  or "create endpoint documentation". Supports REST and GraphQL.
---
```

### 步骤 3：使用渐进式披露编写说明

- 保持 `SKILL.md` 在 5,000 tokens 以内（约 500 行）
- 将详细参考资料移到 `references/`
- 只在 Agent 需要时链接到特定文件

### 步骤 4：测试触发

运行 10-20 个应该和不应该触发 Skill 的测试查询。问 Agent："什么时候会用 [skill-name] Skill？" Agent 会引用 description。根据缺失或过于宽泛的内容进行调整。

### 步骤 5：基于信号迭代

- **触发不足**（应该加载但没加载）：在 description 中添加更多细节和触发短语
- **过度触发**（不相关查询也加载）：添加负面触发条件或缩小范围
- **执行问题**（结果不一致）：改进说明、添加错误处理、打包验证脚本

---

## 注意事项与常见问题

- **安装或更新 Skill 后不生效**：重启 IDE/Agent 后再试；确认 Skill 目录无误（项目级 vs 用户级）。各平台路径可能不同，参考上文「Skill 从哪里加载」章节。
- **Agent 从不选用某个 Skill**：检查 `description` 是否清晰描述了适用场景，便于模型做相关性判断；或改用 `disable-model-invocation: true` 后通过 `/skill-name` 手动调用。
- **脚本执行失败**：确认 `scripts/` 下文件有执行权限（`chmod +x scripts/*.sh`），且 SKILL.md 中引用的路径为相对路径、与目录结构一致。注意不同平台对脚本语言的支持可能不同（如 Windows 可能需要 PowerShell 脚本）。

---

## 推荐去哪找 Skill

### 官方资源
- **Agent Skills 规范**：[agentskills.io](https://agentskills.io/)（官方规范文档）
- **GitHub 仓库**：[github.com/agentskills/agentskills](https://github.com/agentskills/agentskills)（标准规范与参考实现）
- **CLI 工具**：[skills.sh](https://skills.sh/)（浏览、安装、管理 Skill）

### 社区资源
- **Cursor 更新日志**：[Cursor 2.4 - Subagents, Skills, and Image Generation](https://cursor.com/changelog/2-4)
- **Anthropic Skills 库**：[github.com/anthropics/agent-skills](https://github.com/anthropics/agent-skills)
- **社区技能市场**：[playbooks.com/skills](https://playbooks.com/skills)
- **Vercel Labs Skills**：[github.com/vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- **skill0 平台**（国内）：聚合 400+ Skills，支持多款工具直接装配

### 推荐的公开 Skills

一些值得尝试的优质 Skills：

- **vercel-react-best-practices**：React 最佳实践
- **sentry-code-review**：使用 Sentry 数据进行代码审查
- **skill-creator**：帮助创建新 Skill 的 Skill
- **deploy-app**：应用部署工作流
- **sprint-planning**：敏捷开发冲刺规划

---

## Skill vs Command vs Hook

Cursor 提供了多种自定义方式，容易混淆。这里是快速决策指南：

| 特性 | Rule | Command | Skill | Hook |
|------|------|---------|-------|------|
| **谁触发** | Cursor（自动） | 你（手动 `/`） | Agent 或你 | 事件 |
| **何时用** | 始终生效的约束 | 明确的工作流程 | 按需的专业知识 | 自动化和守护 |
| **Token 成本** | 始终占用 | 使用时占用 | 触发时占用 | 不占用模型上下文 |
| **示例** | TypeScript 规范 | `/review` 代码审查 | 部署流程 | 保存后自动格式化 |

**决策树**：

```
这个指令需要每次对话都生效吗？
├── 是 → Rule（始终应用）
└── 否
    ├── 是否基于文件类型？
    │   └── 是 → Rule（使用 globs）
    └── 否
        ├── 是否需要手动触发？
        │   └── 是 → Command
        └── 否
            ├── Agent 应该自己判断何时用？
            │   └── 是 → Skill
            └── 否
                ├── 需要在事件发生时自动执行？
                │   └── 是 → Hook
                └── 否 → Rule（手动 @-mention）
```

**具体例子**：

| 需求 | 选择 | 原因 |
|------|------|------|
| "永远不要提交 .env 文件" | Rule | 始终适用，无例外 |
| "部署时遵循这个检查清单" | Skill | 只在部署时相关 |
| "使用这些设计 tokens" | Rule | 适用于所有 UI 工作 |
| "写发布说明时用这个格式" | Skill | 只在发布时相关 |
| "代码审查" | Command | 你明确想要审查时触发 |
| "保存后自动格式化" | Hook | 事件驱动，无需提示 |

---

## 推荐去哪找 Skill

- **Cursor 文档**：[Agent Skills | Cursor Docs](https://cursor.com/docs/context/skills)
- **开放生态与 CLI**：[skills.sh](https://skills.sh/)（浏览与安装）、[Skills CLI 文档](https://skills.sh/docs/cli)（`npx skills find/add/list` 等）
- **Codex 精选列表**：如 [OpenAI Codex skills](https://github.com/openai/skills) 下的 `.curated` 等，可用 skill-installer 类 Skill 或文档说明的方式安装

---

## 小结

- **Skill** = 教 Agent「在什么场景下、按什么步骤、用什么脚本/资料」完成某类任务的可移植包。
- **开放标准**：由 Anthropic 在 2025 年 12 月 18 日发布，已被 35+ 个 Agent 产品采用。
- **渐进式加载**：元数据始终加载（~100 tokens），完整说明按需加载（<5,000 tokens），资源文件按需访问。
- **使用**：安装到 `.cursor/skills/`、`.claude/skills/`、`.codex/skills/` 等目录后，可被自动选用，或在对话里用 `/` + 技能名手动调用。
- **安装**：使用 `npx skills add`（推荐）、GitHub 添加、或直接复制 Skill 文件夹到上述目录。
- **自建**：在对应目录下建文件夹并写 `SKILL.md`（必含 `name`、`description`），需要时可加 `scripts/`、`references/`、`assets/`。

### 最佳实践组合

把 Skill、MCP、RAG、Rules、Hooks 一起用，各司其职：

- **MCP** 负责「连工具」（连接外部数据源和服务）
- **RAG** 负责「查知识」（检索相关文档和信息）
- **Skill** 负责「教流程」（定义如何完成特定任务）
- **Rules** 负责「定规范」（始终遵守的编码标准）
- **Hooks** 负责「自动化」（事件驱动的操作和守护）

这种组合能让 AI 代理更稳定、可复现、可维护地完成复杂任务。

---

## 延伸阅读

- [What is MCP](mcp.md) - 模型上下文协议与工具连接
- [RAG 技术](rag.md) - 检索增强生成
- [AI Agent 入门](agent.md) - Agent 组成与实战
- [nanobot：超轻量级 AI 助手](nanobot.md) - 支持 Skills 的轻量级 Agent 实现

---

*本文基于 Agent Skills 开放标准和 Cursor 2.4+ 官方文档整理，内容遵循知识共享署名协议。*
