---
title: 深度推理与测试时计算：从 CoT 到 o1、DeepSeek-R1
tags:
  - AI
  - 推理
  - 测试时计算
---

# 深度推理与测试时计算：从 CoT 到 o1、DeepSeek-R1

> 本文介绍**测试时计算（Test-Time Compute）** 概念、代表模型 o1 与 DeepSeek-R1、API 使用方法，以及何时适合采用深度推理。**2025–2026 年，大模型的「思考过程」正从隐藏走向可选可见，开发者可在推理成本与推理质量之间做更灵活权衡。**

**适用读者**：已了解 [Prompt 工程入门](prompt.md)，希望理解「推理阶段加算力」的机制与实际用法。

## 什么是测试时计算

**测试时计算（Test-Time Compute，TTC）** 指在**推理阶段**增加算力投入，让模型在给出最终答案前进行更长时间的「思考」。

传统 LLM 对每个 token 做一次前向传播，推理成本主要由「生成长度」决定。而 TTC 允许模型在内部进行多步推理、链式思考，再输出答案。可以类比为：**考试时允许草稿纸**，学生可以在草稿纸上演算，最后只交最终答案。

| 对比 | 传统 LLM | 深度推理 / TTC |
|------|----------|----------------|
| 推理成本 | 主要由生成长度决定 | 推理步数 × 模型规模 |
| 输出内容 | 直接答案 | 答案 + 可选推理过程 |
| 典型能力 | 知识、简单推理 | 数学、代码、复杂逻辑 |

---

## 从 Chain-of-Thought 到 o1 / R1

### Chain-of-Thought（CoT）

CoT 是最早被广泛使用的推理增强方式：在提示词中要求模型「一步步想」，输出中会包含推理步骤。但 CoT 的「思考」仍是可见的、与最终答案混在一起，受限于提示词设计和单次前向传播。

### o1 系列（OpenAI）

OpenAI 的 **o1** 将推理过程完全隐藏：模型在内部做大量计算，对外只返回最终答案。用户看不到「草稿」，只能看到结论。o1-mini 等型号在数学、代码等基准上表现优秀，但推理过程不可审计，成本也相对较高。

### DeepSeek-R1

**DeepSeek-R1** 是 DeepSeek 推出的深度推理模型，特点包括：

- **推理过程可见**：API 返回 `reasoning_content` 与 `content`，可查看模型的思考步骤
- **开放与可审计**：便于调试、合规与教学
- **成本更低**：相比 o1 约便宜 10–30 倍
- **架构**：671B MoE，约 37B 激活参数；蒸馏版覆盖 1.5B–70B，MIT 开源
- **能力**：32B/70B 蒸馏版在部分基准上已超越 o1-mini

R1-Zero 为纯强化学习训练版本，无监督预训练成分，体现「推理能力可由 RL 直接塑造」的思路。

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

### 不推荐的场景

- **简单知识问答**：CoT/深度推理可能适得其反，增加延迟和成本
- **创意/自由生成**：推理步骤对用户价值有限
- **实时对话**：多步推理延时长，可能影响体验

### 成本与延迟

- TTC 会显著增加推理时间与 token 消耗
- R1 相对 o1 成本更低，适合在「需要推理」与「预算」之间做折中

---

## 与本站其他文章的关系

- **[Prompt 工程入门](prompt.md)**：CoT 等提示技巧是深度推理的早期形态
- **[RAG](rag.md)**：深度推理可与 RAG 结合，先检索再推理
- **[Agent](agent.md)**：R1/o1 可作为 Agent 的「思考引擎」，用于规划与决策

---

## 小结

- **测试时计算（TTC）**：推理阶段增加算力，让模型在输出前进行多步思考
- **o1**：推理隐藏，只输出结论；**DeepSeek-R1**：推理可见，API 返回 `reasoning_content` 与 `content`
- **R1 优势**：成本更低、可审计、蒸馏版能力强；**使用注意**：简单任务未必受益，需权衡成本与延迟
- **使用建议**：数学、代码、逻辑、Agent 推理等优先考虑；知识问答、创意写作可继续用普通模型

**延伸阅读**：[DeepSeek-R1 技术报告](https://github.com/deepseek-ai/DeepSeek-R1)、[OpenAI o1 官方介绍](https://openai.com/zh-Hans-CN/index/introducing-openai-o1-preview/)、[The Art of Scaling Test-Time Compute for Large Language Models](https://arxiv.org/abs/2512.02008)。
