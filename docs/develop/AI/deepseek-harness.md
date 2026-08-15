---
title: DeepSeek Harness (dsh)：用"一切皆插件"重构 Agent 运行时
status: new
tags:
    - 技术分享
    - AI
---

# DeepSeek Harness (dsh)：用"一切皆插件"重构 Agent 运行时

!!! Tip "摘要"
    > **发布时间**：2026年8月15日  
    > **项目地址**：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
    > **核心定位**：DeepSeek 开源的 Agent 运行框架，底层基于独立插件框架 Cordis（[cordiverse/cordis](https://github.com/cordiverse/cordis)），主张"一切皆插件"（Everything is a Plugin）  
    > **当前状态**：开发者预览（Developer Preview），正在快速迭代，未来可能出现破坏兼容性的变更

---

## 引言：Agent 框架的"硬编码之痛"

过去两年，我们见证了 AI Agent 从 demo 走向生产。但在工程实践中，一个反复出现的尴尬是：**大多数 Agent 框架把"能力"写死在了代码里**——你想换一个模型供应商、想让工具在远程沙箱里执行、想给所有文件操作加一层审批，往往要改框架核心、甚至 fork 整个项目。

我们在本系列里讨论过 [MCP](mcp.md)（标准化的工具协议）、[多智能体协作](multi-agent.md)（Agent 间的分工）、[AI 安全与对抗](ai-security.md)（如何约束 Agent 行为）。这些文章解决的是"连接什么""怎么协作""如何约束"，却很少有人从"运行时本身该如何组织"这个更底层的角度给出答案。

DeepSeek 于 2026 年 8 月开源的 **deepseek-harness**（命令行叫 `dsh`）正是冲着这个问题来的。它的核心理念只有一句话：

**一切皆插件（Everything is a Plugin）。**

> **诚实提示**：截至本文撰写时 `dsh` 处于**开发者预览**阶段，官方明确表示"未来将出现破坏兼容性的变更"。本文内容基于其官方架构文档，但请勿把下文任何 API 当作稳定契约；落地前请以仓库最新源码为准。

本文基于 dsh 的官方文档（architecture / cordis-primer / capability-seams / tool-execution-pipeline / defensive-patterns），带你看懂它的设计思想、内核机制，以及它与你现有 Agent 技术栈的关系。

---

## 一、dsh 是什么：不是一个聊天客户端

首先要澄清一个常见误解：`dsh` 不是又一个套壳聊天界面，而是一个**可组合、可替换的 Agent 运行时（runtime）**。

最快的体验方式是：

```sh
npx @deepseek-ai/dsh web
```

它会启动一个 Web UI（默认地址 `http://127.0.0.1:3080`）。但这只是"分发形态"之一——`dsh` 真正的内核是一个插件树。

**核心洞察：**

- 模型适配器（用哪家 LLM）是一个插件
- 工具注册表（能用哪些工具）是一个插件
- 会话日志（记了什么）是一个插件
- 文件系统、进程、沙箱、子 Agent 调度，全都是插件

运行时本身（Cordis 框架）不持有任何"特权内核"。新增能力的唯一方式，就是"把插件挂载到其他插件旁边"。这种结构让 dsh 既能打包成带浏览器的 `web` 分发版，也能打包成无服务器的 `headless` 一次性运行版——两者只是叠加的组合包（bundle）不同。

---

## 二、Cordis：dsh 的插件内核

`dsh` 的底层并非 DeepSeek 临时造的轮子，而是基于一个**独立的插件应用框架 [Cordis](https://github.com/cordiverse/cordis)**（由 `cordiverse` 组织维护），其设计思想还对应一篇论文《A Programming Paradigm for Spatiotemporal Composability》。理解 Cordis 的五个核心概念，就理解了 dsh 的全部。

### 1. 插件是实现 Service 的对象

一个插件可以是带可选 `inject` 和 `apply(ctx)` 的函数，也可以是 `Service` 的子类。它一旦被 Cordis 挂载到上下文，就"活"了——能注册服务、能监听事件、能安装副作用。

### 2. 上下文是服务的容器

所有能力都通过稳定的 `ctx.<key>` 暴露，例如 `ctx.tools`、`ctx.llm`、`ctx.agents`。其他插件只通过这个 key 去"查"，而**不 import 具体实现**。这是依赖倒置的关键：消费方永远面向接口，不面向实现。

### 3. 用 `inject` 声明依赖，而非手动编排加载顺序

插件可以声明"我需要 `ctx.llm` 就绪后才能启动"。Cordis 会根据依赖图自动决定加载先后，**开发者不需要手写启动序列**。这避免了传统框架里"初始化顺序地狱"。

### 4. 类型化事件用于通信

服务通过 TypeScript 声明合并注册事件名，并用四种模式分发：

| 模式 | 是否 await | 分发顺序 | 是否有返回值 | 典型用途 |
|------|-----------|---------|-------------|---------|
| `emit` | 否 | 注册顺序观察 | 否 | 广播通知（如 `session/event`） |
| `waterfall` | 否 | 注册顺序观察 | 是 | 环绕中间件（可改写结果） |
| `parallel` | 是 | 所有监听器并行观察 | 否 | 扇出到多个独立监听者 |
| `serial` | 是 | 注册顺序观察 | 是 | 按序执行、可短路决策 |

其中 `waterfall` 最值得玩味：监听器签名是 `(...args, next)`，调用 `next()` 执行下游并拿到返回值，再包一层返回；如果**不调 `next()` 直接返回，就短路了整个链路**。这正是"加策略/加拦截"的标准钩子。

### 5. 注册是可逆的副作用

一个插件安装提示词片段、工具 schema、LLM 适配器，都是通过 `ctx.effect()` 或 `ctx.on()` 完成。**当插件被卸载或 reload 时，这些注册会被自动撤销（dispose）**。这意味着"换插件 = 干净地换行为"，不会留下脏状态。

**一句话总结 Cordis：**

插件向共享上下文贡献服务、类型化事件和可逆副作用；整个产品没有特权内核，扩展方式只有"在插件旁边再挂一个插件"。

---

## 三、能力 Seam：解耦的扩展点

如果说 Cordis 是"胶水"，那 **Seam（接缝）** 就是 dsh 留给生态的"标准插座"。

一个 Seam 是一个标记为 `seam` 角色的 `ctx` 服务，它由某个包**定义接口**，由若干实现包**提供适配器**，被消费方**零改动消费**。dsh 的文档把服务明确分为三类：`core`（核心，无外部替换实现）、`seam`（可替换的能力接缝）、`bundle`（组合点）。这里挑几个最具代表性的 seam：

| ctx 键 | 角色 | 实现包举例 | 消费方 |
|--------|------|-----------|--------|
| `ctx.llm` | seam | llm-deepseek、llm-pi-ai、llm-replay | agent-loop、compaction-basic |
| `ctx.fs` | seam | fs-local、fs-sandbox、fs-e2b | tool-fs |
| `ctx.subprocess` | seam | subprocess-local、subprocess-e2b | bash-*、terminal-bash、lsp-stdio |
| `ctx.subagents` | seam | subagent-spawn-in-process、subagent-acp、subagent-claude-code | tool-subagent、tool-ralph |
| `ctx.web` | seam | web-search-exa、web-fetch-http | tool-web |
| `ctx.skills` | seam | skill-badge、skill-filesystem | tool-skill |
| `ctx.approval` | seam | acp | tools、tool-bash |

**关键价值在于"消费方零改动"：**

- 把 `ctx.fs` 从 `fs-local` 换成 `fs-sandbox`，`tool-fs` 的读写代码一行都不用动
- 把 `ctx.subprocess` 从本地换成 `subprocess-e2b` 远程沙箱，所有依赖子进程的命令工具自动获得隔离执行能力
- 把 `ctx.llm` 从 DeepSeek 换成 `llm-replay`（位于 `packages/test-support/llm-replay`），就能在**不调用真实模型**的情况下做可复现的评测

这正是我们在 [AI 安全与对抗](ai-security.md) 里强调的"最小权限/隔离执行"的工程落地方式：**不是靠开发者自律，而是靠架构把危险能力换成受限实现**。

---

## 四、Turn Flow：一次交互的精确事件链

理解 Agent "一轮（turn）"内部发生了什么，是读懂 dsh 扩展机制的钥匙。dsh 把一次轮次定义为：

- **步骤（step）** = 一次模型请求 + 可能的工具调用
- **轮次（turn）** = 零个或多个步骤

一个 turn 会按固定顺序触发以下事件（括号内为关键节点）：

```text
turn/start
  → 领取输入
  → 组装提示词
  → agent/pre-step
  → step/start
  → agent/request
  → llm/stream        （模型流式输出）
  → 工具调用
  → step/end
  → （可能续步，回到 step/start）
  → agent/turn-stopping   （serial，单决策事件，可短路）
  → turn/end
```

**这对扩展意味着什么？** 几乎所有"观察/拦截/增强"行为，都能挂在这些事件上。工具执行本身由一条更细的流水线承载（`tools/pre-execute` → 单调守卫 → `tools/execute` → `tools/post-execute`），这条流水线正是策略/钩子/沙箱的挂点。

文档还区分了两类事件：**持久会话事件**（追加日志、reload 后仍在）与**实时扩展点**（运行中观察/拦截）。一句话铁律是——

**"模型可见即已记录"（what the model sees is what's logged）。**

新增任何"模型可见的输入"，都必须新增对应的会话事件。这条约束直接保证了 Agent 行为的**可审计、可回放**，与 [AI 安全与对抗](ai-security.md) 中"记录一切、可事后溯源"的原则完全契合。

---

## 五、组合与分层：Profile + Bundle

dsh 不是把所有插件平铺，而是用一套**层叠（layering）模型**组装：

**分层结构：**

- 基础层 `dsh-base`：每个 profile 的第一层，含模型适配器、工具、持久化、沙箱、审批、设置、凭据、遥测
- 上层组合包：`dsh-web-app`（增加浏览器应用）、`dsh-headless`（增加一次性运行器，无服务器）

**运行中的 dsh = 一棵插件树**，由启动期按序叠加的层组成：

1. Profile 列出的各组合包（按顺序）
2. Profile 的 `cordis.patch.yml`
3. Home 级的 `cordis.patch.yml`
4. 任意 `--patch` overlay

patch 按 id 定位条目，替换整块 config 或插入新条目。你可以用 `dsh --profile web --dump-config` **打印出完整的启动树**，任意条目都能被用户 patch 掉。

**作用域隔离：**

Agent preset 里的服务行可以标 `isolate` realm，把单个 Agent 的注册限定在它自己的 `agent.ctx` 里。这让多 Agent 之间既能共享基础设施，又能各自拥有私有工具集——这正是 [多智能体协作](multi-agent.md) 架构在运行时层面的支撑。

---

## 六、一个真实可感的扩展示例：给 bash 工具加审批

为了把机制落到能感知的例子，下面演示"如何给所有 bash 工具调用加一层审批/白名单"。这里用的是 dsh **真实的扩展点**，而非虚构 API：

**机制说明：**

- 工具执行走 `tools/pre-execute` 这条 **waterfall** 事件——监听器可改写或阻断一次调用
- 审批本身由 `ctx.approval` 这个 **seam** 提供（`acp` 实现），它在单调守卫**之前**处理"一次性询问"
- 单调守卫（Registered monotonic guards）在 `pre-execute` 允许后运行，可"拒绝"或"弃权"

用 Cordis 语义表达为（伪代码，仅说明结构，真实 API 以仓库源码为准）：

```typescript
// 插件：在 tools/pre-execute 流水线上加一个"白名单 + 审批"守卫
export function bashApprovalPlugin(ctx) {
  ctx.inject({ tools: ctx.tools, approval: ctx.approval });

  // 挂到 tools/pre-execute 的 waterfall 上
  const off = ctx.tools.on('pre-execute', async (call, next) => {
    // 假设是 bash 类调用
    if (call.tool !== 'bash') return next(call);
    if (isWhitelisted(call.command)) return next(call);   // 白名单内放行

    // 非白名单：通过 ctx.approval 询问用户（一次性提示）
    const decision = await ctx.approval.ask({
      title: '执行确认',
      body: `是否允许执行：${call.command}`,
    });
    if (decision.allowed) return next(call);
    return { denied: true };   // 拒绝则工具主体被跳过
  });

  // 返回 disposer，插件卸载时撤销注册
  return () => off();
}
```

**这个例子的关键点：**

- 我们没有改 `tool-bash`、没有改 `agent-loop`
- 我们只是在 `tools/pre-execute` 的流水线上"挂了一个守卫"，并复用 `ctx.approval` seam
- 卸载插件时，注册被自动撤销，系统回到无审批状态

这就是"一切皆插件"的威力：**行为改变 = 挂载/卸载插件，而非修改核心**。值得强调的是，dsh 的作者们在 `defensive-patterns` 文档里专门总结了安全相关的工程纪律，例如：

**真实的安全防御机制：**

- **凭证不泄漏**：启动命令使用清理后的环境变量，自动移除名称匹配 `*KEY*`、`*SECRET*`、`*TOKEN*`、`*PASSWORD*` 的项，防止 harness 凭证通过输出或 spill 文件泄漏；临时/spill 文件存于 `0700` 权限的私有目录、随机文件名、以 `0o600` 独占方式打开
- **符号链接安全删除**：删除路径前先 `lstatSync().isSymbolicLink()` 判断，对符号链接用 `unlinkSync` 仅删链接本身（不跟随目标），规避递归删除误入链接目标导致的越权或数据破坏

这些正是 [AI 安全与对抗](ai-security.md) 所倡导原则在运行时层面的具体落地。

---

## 七、它和你现有技术栈的关系

很多人会问：`dsh` 和 [MCP](mcp.md) 是什么关系？是竞争还是互补？

**核心区别：**

- MCP 解决的是"Agent 如何**标准化地连接**外部工具/资源"——它是一个**协议**
- dsh 解决的是"Agent 运行时本身如何**组织与替换**能力"——它是一个**运行时框架**

它们不冲突，反而层次不同：MCP 定义的工具，可以在 dsh 里作为一个 `ctx.tools` 的实现被挂进来；dsh 的 Seam 机制，则负责在"用哪家 MCP server、跑在本地还是沙箱、是否加审批"之间做组合。

**与其它文章的衔接：**

- 与 [多智能体协作](multi-agent.md)：`ctx.subagents` 的 seam 与 `isolate` realm，提供了多 Agent 隔离运行的原生支撑
- 与 [AI 安全与对抗](ai-security.md)：`fs-sandbox` / `subprocess-e2b` 等 seam 实现，以及 defensive-patterns 的凭证/路径保护，是"最小权限、隔离执行"的架构级落地
- 与 [上下文工程](context-engineering.md)：`ctx.systemPrompt` 把提示词拆成可组合的片段，多个插件各自贡献一块
- 与 [本地 Agent 工具](openclaw.md) / [nanobot](nanobot.md)：dsh 的 `headless` bundle 同样面向"轻量、本地优先"的场景

---

## 八、小结与选型建议

**dsh 的核心贡献，不是某个惊艳的算法，而是一种工程纪律：**

- 用 Cordis 的 `ctx` + `inject` + 可逆副作用，把"依赖管理"和"状态清理"交给框架
- 用 Seam 把"能力接口"和"能力实现"彻底解耦，换后端零改动消费方
- 用类型化事件 + Turn Flow，把"扩展点"变成一串明确定义的观察/拦截钩子
- 用"模型可见即已记录"的铁律，保证 Agent 行为天然可审计、可回放

**什么时候值得用 dsh？**

- 你需要在**同一套 Agent 逻辑**下，频繁切换模型、执行环境（本地/沙箱）、或加各种策略（审批、日志、压缩）
- 你在做**可复现评测**（`llm-replay` seam 能离线回放，不调真实模型）
- 你希望 Agent 的**每一条行为都可审计、可溯源**

**什么时候它可能不是最优选？**

- 你只想要一个"调通 API 就能跑"的轻量助手，Cordis 的插件树对你来说是过度设计
- 你的工具生态已经深度绑定某个特定框架（如 LangChain），迁移成本高于收益
- 你需要**生产稳定 API**：dsh 目前是开发者预览，官方已预警未来会有破坏性变更
- 对于普罗大众来说，这种皆可插件方式或许是用力过猛。对于专业人员来说，又可能懒于配置。

无论如何，dsh 把"Agent 运行时该如何组织"这个问题，给出了一个**清晰、克制、可组合**的参考答案。对正在构建生产级 Agent 的工程师来说，它的架构文档本身，就是一份值得反复咀嚼的设计教材。

---

**延伸阅读（本系列）：**

- [What is MCP：模型上下文协议](mcp.md)
- [多智能体协作入门](multi-agent.md)
- [AI 安全与对抗](ai-security.md)
- [上下文工程（Context Engineering）](context-engineering.md)
- [Agentic AI：从 Chatbot 到可行动的智能体](agentic-ai.md)
- [本地开源 AI 助手 OpenClaw](openclaw.md)

---

**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wcowin)
