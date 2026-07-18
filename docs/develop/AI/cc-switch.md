---
title: CC Switch 完全指南
comments: true
tags:
    - AI
---

# CC Switch 完全指南

## 什么是 CC Switch？

**CC Switch** 是 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 和 Hermes Agent 的全方位管理工具，由 [farion1231](https://github.com/farion1231) 开发，基于 Tauri 2 构建的跨平台原生桌面应用，在 GitHub 上已获得 14.5K+ Star（截至 2026 年 5 月）。

!!! info "核心价值"
    现代 AI 编程依赖多个 CLI 工具，但每个工具都有自己的配置格式。切换 API 供应商意味着手动编辑 JSON、TOML 或 `.env` 文件。CC Switch 让你用一个桌面应用管理所有 CLI 工具，可视化操作，一键切换供应商，无需手动编辑配置文件。

## 核心特性

- ✅ **一个应用，六个 CLI 工具** — 管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 和 Hermes Agent
- ✅ **告别手动编辑** — 50+ 供应商预设（包括 AWS Bedrock、NVIDIA NIM、社区中转服务），复制 Key 即可一键导入
- ✅ **统一 MCP、Skills 管理** — 一个面板管理四个应用的 MCP 服务器和 Skills，支持双向同步
- ✅ **系统托盘快速切换** — 从托盘菜单即时切换供应商，无需打开完整应用
- ✅ **云同步** — 通过 Dropbox、OneDrive、iCloud 或 WebDAV 服务器同步供应商数据
- ✅ **跨平台** — 基于 Tauri 2 构建的原生桌面应用，支持 Windows、macOS 和 Linux
- ✅ **内置小工具** — 首次安装登录确认、签名绕过、插件扩展同步等

## 安装 CC Switch

### 系统要求

| 平台 | 最低版本 |
|------|---------|
| Windows | Windows 10 及以上 |
| macOS | macOS 12 (Monterey) 及以上 |
| Linux | Ubuntu 22.04+ / Debian 11+ / Fedora 34+ |

### macOS 安装

**方式一：Homebrew 安装（推荐）**

```bash
brew install --cask cc-switch
```

更新：

```bash
brew upgrade --cask cc-switch
```

**方式二：手动下载**

从 [Releases](https://github.com/farion1231/cc-switch/releases) 页面下载 `CC-Switch-v{version}-macOS.dmg`（推荐）或 `.zip`。

!!! tip "macOS 用户注意"
    CC Switch 已通过 Apple 代码签名和公证，可以直接安装打开，无需额外步骤。

### Windows 安装

从 [Releases](https://github.com/farion1231/cc-switch/releases) 页面下载：

- `CC-Switch-v{version}-Windows.msi` — 安装版
- `CC-Switch-v{version}-Windows-Portable.zip` — 便携版

### Linux 安装

从 [Releases](https://github.com/farion1231/cc-switch/releases) 页面下载对应格式：

```bash
# Debian/Ubuntu
sudo dpkg -i CC-Switch-v{version}-Linux.deb

# Fedora/RHEL/openSUSE
sudo rpm -i CC-Switch-v{version}-Linux.rpm

# 通用（AppImage）
chmod +x CC-Switch-v{version}-Linux.AppImage
./CC-Switch-v{version}-Linux.AppImage
```

**Arch Linux** 用户可通过 AUR 安装：

```bash
paru -S cc-switch-bin
```

## 快速开始

### 基本使用流程

1. **添加供应商**：点击「添加供应商」→ 选择预设或创建自定义配置
2. **切换供应商**：
    - 主界面：选择供应商 → 点击「启用」
    - 系统托盘：直接点击供应商名称（即时生效）
3. **生效方式**：重启终端或对应的 CLI 工具使更改生效（**Claude Code 不需要重启**，支持热切换）
4. **切回官方登录**：添加一个「官方登录」预设，重启 CLI 工具后按其登录/OAuth 流程操作

!!! warning "注意"
    首次启动时，可以手动导入现有 CLI 工具的配置作为默认供应商。

## 支持的 CLI 工具

CC Switch 支持管理以下六个 CLI 工具：

| 工具 | 开发商 | 说明 |
|------|--------|------|
| Claude Code | Anthropic | AI 编程 Agent，支持热切换 |
| Codex | OpenAI | AI 编程 Agent |
| Gemini CLI | Google | AI 编程 Agent |
| OpenCode | 开源 | AI 编程 Agent |
| OpenClaw | 开源 | AI Agent 平台 |
| Hermes Agent | Nous Research | 自进化 AI Agent |

## 供应商管理

### 添加供应商

1. 在顶部应用切换器中选择目标工具（如 Claude Code）
2. 点击「添加供应商」
3. 从预设列表中选择供应商（内置 50+ 预设），名称、端点地址等字段会自动填充
4. 填入你的 API Key
5. 点击「添加」完成配置

### 常用预设

CC Switch 内置了 50+ 供应商预设，包括：

| 类别 | 供应商示例 |
|------|-----------|
| 官方 API | Anthropic 官方、OpenAI 官方、Google 官方 |
| 国产模型 | DeepSeek、智谱 GLM、通义千问、月之暗面 Kimi |
| 云平台 | AWS Bedrock、NVIDIA NIM、硅基流动 SiliconFlow |
| 社区中转 | PackyCode、AIGoCode、DMXAPI 等 |

### 通用供应商

一份配置可以同步到多个应用（OpenCode、OpenClaw），无需重复配置。

### 其他操作

- **一键切换**：在主界面选择供应商点击「启用」
- **系统托盘切换**：右键托盘图标直接选择供应商
- **拖拽排序**：拖动供应商调整顺序
- **导入/导出**：支持供应商配置的导入导出

## 代理与故障转移

CC Switch 提供本地代理功能，支持热切换：

| 功能 | 说明 |
|------|------|
| 格式转换 | 自动转换不同 API 格式 |
| 自动故障转移 | 主供应商不可用时自动切换到备用 |
| 熔断器 | 防止持续请求失败的供应商 |
| 供应商健康监控 | 实时监控供应商可用性 |
| 请求整流器 | 规范化请求格式 |
| 应用级代理接管 | 独立为 Claude、Codex 或 Gemini 配置代理，具体到单个供应商 |

## MCP、Prompts 与 Skills

### 统一 MCP 面板

管理四个应用的 MCP 服务器，支持双向同步和 Deep Link 导入。

**操作步骤**：

1. 点击「MCP」按钮
2. 通过模板或自定义配置添加 MCP 服务器
3. 按应用切换同步开关

### Prompts 管理

- Markdown 编辑器编写提示词
- 跨应用同步（CLAUDE.md / AGENTS.md / GEMINI.md）
- 回填保护，防止覆盖已有内容

### Skills 管理

- 从 GitHub 仓库或 ZIP 文件一键安装
- 自定义仓库管理
- 支持软连接和文件复制两种模式

**操作步骤**：点击「Skills」→ 浏览 GitHub 仓库 → 一键安装到所有应用

## 用量与成本追踪

CC Switch 内置用量仪表盘：

- 跨供应商追踪支出、请求数和 Token 用量
- 趋势图表可视化
- 详细请求日志
- 自定义模型定价

## 会话管理器与工作区

- **会话管理器**：浏览、搜索和恢复所有应用的对话历史
- **工作区编辑器**（OpenClaw）：编辑 Agent 文件（AGENTS.md、SOUL.md 等），支持 Markdown 预览

## 数据存储位置

CC Switch 使用 SQLite 数据库存储所有数据，采用原子写入机制保护配置不被损坏：

| 数据 | 路径 |
|------|------|
| 数据库 | `~/.cc-switch/cc-switch.db`（SQLite — 供应商、MCP、Prompts、Skills） |
| 本地设置 | `~/.cc-switch/settings.json`（设备级 UI 偏好） |
| 备份 | `~/.cc-switch/backups/`（自动轮换，保留最近 10 个） |
| Skills | `~/.cc-switch/skills/`（默认软连接到对应应用） |
| Skill 备份 | `~/.cc-switch/skill-backups/`（卸载前自动创建，保留最近 20 个） |

## 常见问题

### Q: 切换供应商后需要重启终端吗？

大多数工具需要重启终端或 CLI 工具才能生效。**Claude Code 是例外**，它支持热切换，无需重启。

### Q: 切换后插件配置消失了怎么办？

CC Switch 提供「共享配置片段」功能，用于在供应商之间传递通用数据（除 API Key 和端点之外的数据）：

1. 进入「编辑供应商」→「共享配置面板」→ 点击「从当前供应商提取」
2. 创建新供应商时，勾选「写入共享配置」（默认启用）
3. 所有配置项都会保留在首次启动时导入的默认供应商中

### Q: 为什么不能删除当前活跃的供应商？

CC Switch 遵循「最小侵入」设计原则——即使卸载应用，CLI 工具也能正常工作。系统始终保留一个活跃配置，因为删除所有配置会导致 CLI 工具不可用。如果很少使用某个工具，可以在设置中隐藏它。

### Q: 如何切回官方登录？

从预设列表中添加一个官方供应商，切换到它后运行登出/登录流程，即可在官方和第三方供应商之间自由切换。Codex 支持在不同官方供应商之间切换，方便在多个 Plus 或 Team 账户间切换。

### Q: CC Switch 会收集我的 API Key 吗？

不会。所有数据存储在本地 SQLite 数据库中，采用原子写入机制，不会上传到任何服务器。

### Q: 如何获取各供应商的 API Key？

- **DeepSeek**：https://platform.deepseek.com/
- **硅基流动 SiliconFlow**：https://cloud.siliconflow.cn/
- **智谱 GLM**：https://open.bigmodel.cn/
- **通义千问**：https://dashscope.aliyun.com/
- **月之暗面 Kimi**：https://platform.moonshot.ai/

## 实际使用示例

### 示例 1：为 Claude Code 接入 DeepSeek

1. 启动 CC Switch
2. 顶部选择「Claude Code」
3. 点击「添加供应商」→ 预设选择「DeepSeek」
4. 填入 DeepSeek API Key → 点击「添加」
5. 在主界面点击刚添加的 DeepSeek 供应商 → 点击「启用」
6. 直接使用 Claude Code（无需重启终端）

### 示例 2：为 Codex 配置 SiliconFlow

1. 启动 CC Switch
2. 顶部选择「Codex」
3. 点击「添加供应商」→ 预设选择「SiliconFlow」
4. 填入 SiliconFlow API Key → 点击「添加」
5. 切换到 SiliconFlow 供应商
6. 重启终端后使用 Codex

### 示例 3：统一管理 MCP 服务器

1. 启动 CC Switch
2. 点击「MCP」按钮
3. 添加 MCP 服务器配置
4. 按需切换各应用的同步开关
5. 配置自动同步到对应应用的配置文件

## 与 Claude Code / Codex 的配合使用

### 推荐工作流

```
1. 启动 CC Switch
2. 为 Claude Code 配置国产模型（如 DeepSeek V4），日常开发使用
3. 为 Codex 配置其他模型，做代码审查和 bug 检测
4. 需要时通过系统托盘快速切换供应商
5. 用量仪表盘监控成本
```

### 最佳实践

- ✅ 使用 Git 版本控制，方便回滚
- ✅ 利用「共享配置片段」保留插件配置
- ✅ 开启云同步，跨设备共享配置
- ✅ 定期查看用量仪表盘，监控 API 成本
- ✅ 使用系统托盘快速切换，提高效率

## 官方资源

- **官方网站**：<https://ccswitch.io/>

- **GitHub 仓库**：<https://github.com/farion1231/cc-switch>

- **用户手册**：<https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/README.md>

- **更新日志**：<https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md>

## 注意事项

1. **API Key 安全**：妥善保管你的 API Key，不要泄露
2. **网络连接**：确保能访问你配置的 API 端点
3. **成本控制**：利用内置用量仪表盘监控 API 使用量
4. **版本更新**：CC Switch 支持自动更新，建议保持最新版本
5. **备份配置**：CC Switch 自动保留最近 10 个备份，重要配置建议额外备份

---

*最后更新：2026年5月*


**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wkwcowin)
