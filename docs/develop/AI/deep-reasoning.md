---
title: 深度推理与测试时计算：从 CoT 到 o1、DeepSeek-R1
comments: true
tags:
  - AI
  - 推理
  - 测试时计算
---

# 深度推理与测试时计算：从 CoT 到 o1、DeepSeek-R1

> 本文介绍**测试时计算（Test-Time Compute）** 概念、代表性的推理模型家族（如 OpenAI GPT-5 系列、DeepSeek-R1/V4）、API 使用方法，以及何时适合采用深度推理。**截至 2026 年 5 月，推理模型已进入「多模态 + 原生工具调用」的新阶段，各大厂商在推理能力、上下文长度和成本效率上持续竞争。**

**适用读者**：已了解 [Prompt 工程入门](prompt.md)，希望理解「推理阶段加算力」的机制与实际用法。

## 什么是测试时计算

**测试时计算（Test-Time Compute，TTC）** 指在**推理阶段**增加算力投入，让模型在给出最终答案前进行更长时间的「思考」。

传统 LLM 对每个 token 做一次前向传播，推理成本主要由「生成长度」决定。而 TTC 允许模型在内部进行多步推理、链式思考，再输出答案。可以类比为：**考试时允许草稿纸**，学生可以在草稿纸上演算，最后只交最终答案。

| 对比 | 传统 LLM | 深度推理 / TTC |
|------|----------|----------------|
| 推理成本 | 主要由生成长度决定 | 推理步数 × 模型规模 |
| 输出内容 | 直接答案 | 通常为更高质量答案；中间推理是否可见取决于模型与平台 |
| 典型能力 | 知识、简单推理 | 数学、代码、复杂逻辑 |

---

## 从 Chain-of-Thought 到 o1 / R1

### Chain-of-Thought（CoT）

CoT 是最早被广泛使用的推理增强方式：在提示词中要求模型「一步步想」，输出中会包含推理步骤。但 CoT 的「思考」仍是可见的、与最终答案混在一起，受限于提示词设计和单次前向传播。

### OpenAI GPT-5 系列推理模型

OpenAI 在 2026 年持续迭代其推理模型家族：

| 模型 | 发布时间 | 核心特点 |
|------|----------|----------|
| **GPT-5.4** | 2026年3月 | 迄今能力最强、效率最高的专业级模型，提供"Thinking"模式，原生支持电脑操控 |
| **GPT-5.5** | 2026年4月 | 与 DeepSeek-V4 同日发布，性能对标，支持复杂推理与代码生成 |
| **GPT-Realtime-2** | 2026年5月 | 业界首个搭载 GPT-5 级推理能力的**音频大模型**，支持实时语音交互与推理 |

这些模型会在**内部**做更多计算，再输出结果。对开发者来说，重点通常不是"看见完整草稿"，而是通过更直接的提示拿到更稳的复杂任务结果。官方最新文档也强调：对这类模型，先用简洁提示，不要默认要求它"step by step"展示思维链。

**GPT-Realtime-2 的特别之处**：
- 首个将 GPT-5 级推理能力应用于语音交互的模型
- 支持实时音频流处理，延迟显著降低
- 可用于语音助手、实时翻译、音频分析等场景

### Claude 4 系列推理模型

Anthropic 在 2026 年持续迭代其推理模型家族：

| 模型 | 发布时间 | 核心特点 |
|------|----------|----------|
| **Claude Opus 4** | 2025年5月 | 旗舰级模型，重点强化编程能力、高级推理与 AI 代理任务 |
| **Claude Sonnet 4** | 2025年5月 | 性价比更高的中档模型，性能持平竞品但价格低 80% |
| **Claude Opus 4.7** | 2026年4月 | 在高级软件工程和复杂、长时间运行任务处理能力上显著提升 |
| **Claude Mythos 1** | 2026年5月曝光 | 专注于漏洞识别和软件系统安全分析 |

### DeepSeek-R1 / V4 / R2

**DeepSeek-R1** 是 DeepSeek 推出的深度推理模型，特点包括：

- **可暴露推理字段**：部分接口会返回 `reasoning_content` 与 `content`，便于调试或审计
- **开放与可审计**：便于调试、合规与教学
- **成本更低**：相比 o1 约便宜 20–30 倍（输入 $0.55/M tokens vs o1 $15/M tokens）
- **架构**：671B MoE，约 37B 激活参数；蒸馏版覆盖 1.5B–70B（基于 Qwen 的蒸馏版为 MIT 开源，基于 Llama 的遵循 Llama3.3 License）
- **能力**：32B/70B 蒸馏版在部分基准上已超越 o1-mini

R1-Zero 为纯强化学习训练版本，无监督预训练成分，体现「推理能力可由 RL 直接塑造」的思路。

**DeepSeek-V4**（2026年4月24日发布）：
- **万亿级参数**规模，性能跻身全球第一梯队
- **百万字超长上下文**支持
- **开源免费商用**，全量开源
- **国产算力全适配**

**DeepSeek-R2**（灰度内测中）：
- 1.2万亿参数
- **多模态识图**功能
- 作为第二代旗舰大模型，从参数规模、技术架构到能力都有显著提升

---

## DeepSeek-R1 API 使用

### 模型标识

使用模型名：`deepseek-reasoner`（或根据官方文档的最新命名）。

### 响应结构

响应中包含两个主要字段：

- **`reasoning_content`**：模型的「草稿」——内部推理过程
- **`content`**：最终答案

可根据业务需求选择只展示 `content`，或将 `reasoning_content` 用于调试、审计或用户可见的「思考过程展示」。

### 示例（伪代码）

```python
from openai import OpenAI  # DeepSeek 兼容 OpenAI SDK

client = OpenAI(api_key="YOUR_API_KEY", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[{"role": "user", "content": "证明：若 n 为偶数，则 n^2 为偶数。"}],
)

# 推理过程
reasoning = response.choices[0].message.reasoning_content  # 或 equivalent 字段
# 最终答案
answer = response.choices[0].message.content
```

实际字段名请以 DeepSeek 官方文档为准。

---

## 适用场景与注意事项

### 适合用深度推理的场景

- **数学与逻辑**：证明、计算、多步推导
- **代码**：算法设计、调试、重构
- **科学推理**：实验设计、因果分析
- **法律/合规**：需要可追溯推理过程的任务
- **Agent 推理后端**：规划、拆解、决策链
- **语音交互**：使用 GPT-Realtime-2 进行实时语音推理

### 不推荐的场景

- **简单知识问答**：CoT/深度推理可能适得其反，增加延迟和成本
- **创意/自由生成**：推理步骤对用户价值有限
- **实时对话**（非语音专用模型）：多步推理延时长，可能影响体验

### 成本与延迟

- TTC 会显著增加推理时间与 token 消耗
- R1 相对 o1 成本更低，适合在「需要推理」与「预算」之间做折中
- DeepSeek-V4 开源特性使其在私有化部署场景更具成本优势

---

## 与本站其他文章的关系

- **[Prompt 工程入门](prompt.md)**：CoT 等提示技巧是深度推理的早期形态
- **[RAG](rag.md)**：深度推理可与 RAG 结合，先检索再推理
- **[Agent](agent.md)**：R1/o1 可作为 Agent 的「思考引擎」，用于规划与决策

---

## 小结

- **测试时计算（TTC）**：推理阶段增加算力，让模型在输出前进行多步思考
- **OpenAI GPT-5 系列**：GPT-5.4/5.5 提供强大推理能力，GPT-Realtime-2 开创音频推理新场景
- **Claude 4 系列**：Opus 4 和 Sonnet 4 在编程和推理上持续领先
- **DeepSeek-R1/V4/R2**：成本更低、可审计、开源免费商用，V4 达到万亿参数规模
- **使用建议**：数学、代码、逻辑、Agent 推理、语音交互等优先考虑；知识问答、创意写作可继续用普通模型

**延伸阅读**：[DeepSeek-R1 技术报告](https://github.com/deepseek-ai/DeepSeek-R1)、[OpenAI Reasoning Best Practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)、[The Art of Scaling Test-Time Compute for Large Language Models](https://arxiv.org/abs/2512.02008)。

---

**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wkwcowin)
