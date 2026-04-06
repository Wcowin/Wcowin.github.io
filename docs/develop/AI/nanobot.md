---
title: nanobot：超轻量级 AI 助手
comments: true
date: 2026-03-10
---

# nanobot：超轻量级 AI 助手

## 什么是 nanobot？

[nanobot](https://github.com/HKUDS/nanobot) 是由香港大学数据智能实验室（HKUDS）开发的超轻量级个人 AI 助手。它在 2026 年 2 月 2 日发布，用仅约 4,000 行 Python 代码实现了核心 Agent 功能，比 OpenClaw 的 43 万行代码减少了 99%。

## 核心特点

### 🪶 超轻量级

- **代码量**：仅 ~4,000 行核心代码
- **内存占用**：约 100MB（相比 OpenClaw 的 ~1GB）
- **启动速度**：极快，几乎无延迟
- **资源消耗**：最小化，适合长期运行

### 🔬 研究友好

代码简洁易读，非常适合：
- AI Agent 架构研究
- 学习 AI 助手实现原理
- 快速原型开发
- 教学和演示

### ⚡️ 功能完整

尽管代码量极少，但功能一应俱全：
- 多平台聊天支持
- 多家 LLM 提供商集成
- 工具系统（文件操作、Shell 命令、网络访问）
- 记忆管理（长期 + 短期）
- 定时任务（Cron）
- MCP 协议支持

## 架构设计

```
nanobot/
├── agent/          # 核心 Agent 逻辑
│   ├── loop.py     # Agent 循环（LLM ↔ 工具执行）
│   ├── context.py  # 提示词构建
│   ├── memory.py   # 持久化记忆
│   ├── skills.py   # 技能加载器
│   └── tools/      # 内置工具
├── channels/       # 聊天平台集成
├── providers/      # LLM 提供商
├── cron/           # 定时任务
└── cli/            # 命令行接口
```

## 快速开始

### 1. 安装

三种安装方式任选其一：

**从 PyPI 安装（稳定版，推荐）：**
```bash
pip install nanobot-ai
```

**使用 uv 安装（更快）：**
```bash
uv tool install nanobot-ai
```

**从源码安装（最新功能）：**
```bash
git clone https://github.com/HKUDS/nanobot.git
cd nanobot
pip install -e .
```

### 2. 初始化配置

```bash
nanobot onboard
```

这会创建配置文件 `~/.nanobot/config.json`。

### 3. 配置 API Key

编辑 `~/.nanobot/config.json`，添加你的 LLM 提供商 API Key：

```json
{
  "providers": {
    "openrouter": {
      "apiKey": "sk-or-v1-xxx"
    }
  },
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5",
      "provider": "openrouter"
    }
  }
}
```

推荐使用 [OpenRouter](https://openrouter.ai)，可以访问所有主流模型。

### 4. 开始聊天

```bash
nanobot agent -m "你好！"
```

或者进入交互模式：

```bash
nanobot agent
```

## 支持的平台

nanobot 支持多种聊天平台：

| 平台 | 需要什么 |
|------|---------|
| **Telegram** | Bot token（从 @BotFather 获取）|
| **Discord** | Bot token + Message Content intent |
| **WhatsApp** | 扫描二维码 |
| **飞书** | App ID + App Secret |
| **Mochat** | Claw token（可自动设置）|
| **钉钉** | App Key + App Secret |
| **Slack** | Bot token + App-Level token |
| **Email** | IMAP/SMTP 凭据 |
| **QQ** | App ID + App Secret |

### Telegram 配置示例

1. 在 Telegram 搜索 `@BotFather`，创建一个 bot
2. 复制 token
3. 配置 `~/.nanobot/config.json`：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN",
      "allowFrom": ["YOUR_USER_ID"]
    }
  }
}
```

4. 启动网关：

```bash
nanobot gateway
```

## 支持的 LLM 提供商

nanobot 支持多家 LLM 提供商：

- **OpenRouter**（推荐，可访问所有模型）
- **Anthropic**（Claude 直连）
- **OpenAI**（GPT 直连）
- **DeepSeek**（国内可用）
- **Google Gemini**
- **智谱 GLM**
- **通义千问（DashScope）**
- **Moonshot/Kimi**
- **Groq**（含语音转文字）
- **MiniMax**
- **vLLM**（本地模型）

## 核心功能

### 1. 工具系统

nanobot 内置多种工具：
- 文件操作（读写、编辑、搜索）
- Shell 命令执行
- 网络访问（搜索、抓取）
- 代码诊断
- 子 Agent 生成

### 2. 记忆管理

- **长期记忆**：存储在 `MEMORY.md`
- **短期记忆**：每日笔记 `memory/YYYY-MM-DD.md`
- 自动管理，无需手动维护

### 3. 定时任务

支持自然语言设置定时任务：

```bash
nanobot agent -m "每天早上 8 点提醒我喝水"
```

### 4. 心跳任务

编辑 `~/.nanobot/workspace/HEARTBEAT.md`，添加周期性任务：

```markdown
## Periodic Tasks

- [ ] 检查天气预报并发送摘要
- [ ] 扫描收件箱查找紧急邮件
```

网关每 30 分钟自动执行一次。

### 5. MCP 协议支持

nanobot 支持 Model Context Protocol，可以连接外部工具服务器：

```json
{
  "tools": {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
      }
    }
  }
}
```

## 多实例运行

可以同时运行多个 nanobot 实例，每个使用独立配置：

```bash
# 实例 A - Telegram bot
nanobot gateway --config ~/.nanobot-telegram/config.json

# 实例 B - Discord bot
nanobot gateway --config ~/.nanobot-discord/config.json

# 实例 C - 飞书 bot（自定义端口）
nanobot gateway --config ~/.nanobot-feishu/config.json --port 18792
```

## Docker 部署

### 使用 Docker Compose

```bash
# 初始化配置
docker compose run --rm nanobot-cli onboard

# 编辑配置添加 API keys
vim ~/.nanobot/config.json

# 启动网关
docker compose up -d nanobot-gateway

# 查看日志
docker compose logs -f nanobot-gateway
```

### 使用 Docker

```bash
# 构建镜像
docker build -t nanobot .

# 初始化配置
docker run -v ~/.nanobot:/root/.nanobot --rm nanobot onboard

# 启动网关
docker run -v ~/.nanobot:/root/.nanobot -p 18790:18790 nanobot gateway
```

## Linux 系统服务

将 nanobot 设置为 systemd 服务，开机自启：

1. 创建服务文件 `~/.config/systemd/user/nanobot-gateway.service`：

```ini
[Unit]
Description=Nanobot Gateway
After=network.target

[Service]
Type=simple
ExecStart=%h/.local/bin/nanobot gateway
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

2. 启用并启动：

```bash
systemctl --user daemon-reload
systemctl --user enable --now nanobot-gateway
```

3. 查看状态：

```bash
systemctl --user status nanobot-gateway
journalctl --user -u nanobot-gateway -f
```

## nanobot vs OpenClaw

| 特性 | nanobot | OpenClaw |
|------|---------|----------|
| **代码量** | ~4,000 行 | ~430,000 行 |
| **内存占用** | ~100MB | ~1GB |
| **启动速度** | 极快 | 较慢 |
| **学习曲线** | 平缓 | 陡峭 |
| **适用场景** | 研究、学习、轻量部署 | 生产环境、复杂场景 |
| **可扩展性** | 简单直接 | 功能丰富 |

## 使用场景

### 1. 个人助手

- 日程管理
- 邮件处理
- 信息检索
- 知识问答

### 2. 开发助手

- 代码审查
- 文档生成
- 问题诊断
- 自动化任务

### 3. 研究工具

- AI Agent 架构研究
- 多模态交互实验
- 工具使用研究
- 提示工程测试

### 4. 多平台机器人

- Telegram 群组管理
- Discord 社区助手
- 企业飞书/钉钉机器人
- WhatsApp 自动回复

## 常用命令

```bash
# 初始化
nanobot onboard

# 聊天
nanobot agent -m "你好"
nanobot agent  # 交互模式

# 启动网关
nanobot gateway

# 查看状态
nanobot status

# 连接 WhatsApp
nanobot channels login

# 查看频道状态
nanobot channels status

# 更新
pip install -U nanobot-ai
```

## 项目信息

- **开发团队**：HKUDS @ 香港大学
- **发布日期**：2026 年 2 月 2 日
- **当前版本**：v0.1.4.post5（2026 年 3 月 16 日）
- **编程语言**：Python 3.10+
- **GitHub Stars**：社区增长很快，建议以 GitHub 页面实时数据为准
- **开源协议**：开源
- **官方网站**：[nanobot.club](https://nanobot.club)

## 相关链接

- [GitHub 仓库](https://github.com/HKUDS/nanobot)
- [官方网站](https://nanobot.club)
- [MoChat 社交网络](https://github.com/HKUDS/MoChat)
- [OpenRouter API](https://openrouter.ai)

## 总结

nanobot 是一个极简主义的 AI 助手框架，用最少的代码实现了核心功能。它特别适合：

- 想要学习 AI Agent 架构的开发者
- 需要轻量级部署的场景
- 研究人员进行实验和原型开发
- 追求简洁和可维护性的项目

如果你厌倦了臃肿的框架，想要一个清晰、可读、易于理解的 AI 助手，nanobot 是一个很好的选择。

---

*内容基于 nanobot 官方文档整理，遵循知识共享署名协议。*

---

**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wcowin)
