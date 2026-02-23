---
title: Skill 使用介绍（Cursor / Codex Agent Skills）
tags:
  - AI
  - Agent
  - Skill
---

# Skill 使用介绍（Cursor / Codex Agent Skills）

> Agent Skills 是一套开放标准，用于为 AI 代理扩展领域能力。本文介绍在 Cursor、Codex 等环境中如何发现、安装、使用和自建 Skill。参考 [Cursor 官方文档](https://cursor.com/docs/context/skills) 与 [Agent Skills 开放标准](https://agentskills.io/)。**内容与示例基于 Cursor 2.x 及开放生态（2025–2026 主流实践），Cursor 2.0+ 起完整支持 Agent Skills。**

**适用读者**：已在使用 Cursor、Codex 或支持 Agent Skills 的 IDE/平台，希望为 Agent 增加可复用流程与规范的开发者或进阶用户。

## 什么是 Skill

**Skill（技能）** 是一个可移植、可版本控制的「能力包」，用来教 Agent 如何完成某一类具体任务。它可以包含：

- **说明文档**：在 `SKILL.md` 里写清何时用、怎么用、步骤与规范
- **脚本**：可执行的部署、校验、生成等脚本
- **参考资料与模板**：放在 `references/`、`assets/` 中，按需加载

与 **MCP（模型上下文协议）** 的定位不同：MCP 定义的是「模型如何连接外部工具/数据源」的协议与接口；Skill 定义的是「在何种场景下、按何种步骤、使用何种脚本或规范」完成任务。二者互补：MCP 提供「能力通道」，Skill 提供「使用规范与流程」。

| 特点 | 说明 |
|------|------|
| **可移植** | 支持 Agent Skills 标准的任何代理都能用同一套 Skill |
| **可版本控制** | 以文件形式存在，可放进 Git 仓库或通过 GitHub 安装 |
| **可执行** | 可包含脚本、模板，Agent 能按说明调用工具执行 |
| **按需加载** | 资源渐进加载，有利于控制上下文长度 |

---

## Skill 从哪里加载

Cursor / Codex 会在以下目录自动发现 Skill（每个 Skill 是一个**文件夹**，且内含 `SKILL.md`）：

| 路径 | 作用域 |
|------|--------|
| `.cursor/skills/` | 当前项目 |
| `.codex/skills/` | 当前项目（Codex 兼容） |
| `.claude/skills/` | 当前项目（Claude 兼容） |
| `~/.cursor/skills/` | 用户全局 |
| `~/.codex/skills/` | 用户全局 |
| `~/.claude/skills/` | 用户全局 |

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

### 方式二：用 Skills CLI 发现并安装（开放生态）

[Agent Skills 开放生态](https://skills.sh/) 提供用命令行管理 Skill 的方式：

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

`-g` 表示装到用户目录（全局），`-y` 表示跳过确认。也可用 `--skill <名称>` 只安装仓库中的某一个技能。该 CLI 支持 Cursor、Codex、Claude Code 等 30+ 种 Agent；若不想上报匿名使用统计，可设置环境变量 `DISABLE_TELEMETRY=1`。安装后一般需要**重启 Cursor/Codex** 才能识别新 Skill。

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
| `name` | 是 | 技能标识，**必须**仅含小写字母、数字与连字符，且**必须与所在文件夹名一致**（否则可能无法被正确识别） |
| `description` | 是 | 一句话说明用途与适用场景，供 Agent 判断是否采用 |
| `license` | 否 | 许可证名称或引用 |
| `compatibility` | 否 | 环境要求（如系统依赖、网络等） |
| `disable-model-invocation` | 否 | 设为 `true` 时，只有用户显式输入 `/skill-name` 时才会加入上下文，不会自动被 Agent 选用 |

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

- **安装或更新 Skill 后不生效**：重启 Cursor 或 Codex 后再试；确认 Skill 目录无误（项目级 vs 用户级）。
- **Agent 从不选用某个 Skill**：检查 `description` 是否清晰描述了适用场景，便于模型做相关性判断；或改用 `disable-model-invocation: true` 后通过 `/skill-name` 手动调用。
- **脚本执行失败**：确认 `scripts/` 下文件有执行权限，且 SKILL.md 中引用的路径为相对路径、与目录结构一致。

---

## 推荐去哪找 Skill

- **Cursor 文档**：[Agent Skills | Cursor Docs](https://cursor.com/docs/context/skills)
- **开放生态与 CLI**：[skills.sh](https://skills.sh/)（浏览与安装）、[Skills CLI 文档](https://skills.sh/docs/cli)（`npx skills find/add/list` 等）
- **Codex 精选列表**：如 [OpenAI Codex skills](https://github.com/openai/skills) 下的 `.curated` 等，可用 skill-installer 类 Skill 或文档说明的方式安装

---

## 小结

- **Skill** = 教 Agent「在什么场景下、按什么步骤、用什么脚本/资料」完成某类任务的包。
- **使用**：安装到 `.cursor/skills/` 或 `~/.codex/skills/` 等目录后，可被自动选用，或在对话里用 `/` + 技能名手动调用。
- **安装**：GitHub 添加、`npx skills add`、或直接复制 Skill 文件夹到上述目录。
- **自建**：在对应目录下建文件夹并写 `SKILL.md`（必含 `name`、`description`），需要时可加 `scripts/`、`references/`、`assets/`。

把 Skill 和 MCP、RAG 一起用：MCP 负责「连工具」，RAG 负责「查知识」，Skill 负责「定流程与规范」，三者结合能更稳定、可复现地用好 AI 代理。

**延伸阅读**：[What is MCP](mcp.md)（协议与工具连接）、[RAG 技术](rag.md)（知识增强）、[AI Agent 入门](agent.md)（Agent 组成与实战）。
