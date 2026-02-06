---
title: 为 Zensical 添加多语言翻译
date: 2026-02-06
tags:
  - Zensical
  - 多语言
status: draft
---

# 为 Zensical 网站添加多语言翻译

> 本文基于当前本站正在使用的 **硅基流动 Qwen3-8B + 客户端翻译系统**（`glm-config.js` + `glm-translate.js`）整理而成。  
> 只要按步骤接入，你就能获得和 `wcowin.work` 一样的多语言体验。

## 功能概述

- **客户端翻译**：不改动原文，只在浏览器端把页面上的中文动态翻译成目标语言  
- **多语言切换**：通过顶部的「语言切换」菜单在 **中文 / 英文 / 日文 / 其他语言** 之间切换  
- **两种模式**：
  - 仅当前页面翻译
  - 全站翻译（记住你的语言偏好，后续页面自动翻译）
- **缓存与记忆**：
  - 页面级翻译缓存（同一页面再次访问时可快速恢复）
  - 本地缓存常见文本，减少二次请求
- **与 Ask AI 共用后端**：
  - 翻译与 Ask AI 聊天都走 **硅基流动 OpenAI 兼容接口 + `Qwen/Qwen3-8B`**
  - 共用同一个 `GLM_API_KEY`（通过 GitHub Actions + Secrets 注入）

!!! warning "SEO 提醒"
    这种方案属于 **运行时客户端翻译**：  
    - 对访问者来说是多语言网站  
    - 对搜索引擎来说仍然是**单语言内容**（索引的是构建时的中文），如果你追求多语言 SEO，需要用「多语言内容预生成」的方式，本文不展开。

---

## 1. 准备工作

### 1.1 一个已经跑起来的 Zensical 站点

假设你已经有了一个基本可运行的 Zensical 项目（`zensical.toml + docs/` 目录结构）。  
如果需要完整参考实现，可以直接查看我的开源仓库：

- **仓库地址**：[`Wcowin/Wcowin.github.io`](https://github.com/Wcowin/Wcowin.github.io)
- 与翻译相关的核心文件：
  - `docs/javascripts/glm-config.js`
  - `docs/javascripts/glm-translate.js`

可以直接复制这两个文件到你的项目里，再按本文做少量配置即可。

### 1.2 硅基流动 API Key（与 Ask AI 共用）

1. 打开硅基流动控制台：`https://cloud.siliconflow.cn/`  
2. 注册 / 登录后，在「API Key」页面创建一个 Key  
3. 将它配置到 GitHub 仓库 Secrets 中（下一节会用到）  

> 这个 Key 同时会被：
>
> - **Ask AI 聊天组件** (`chat-widget.js`) 使用  
> - **多语言翻译系统** (`glm-config.js + glm-translate.js`) 使用  

---

## 2. 引入翻译脚本与配置

### 2.1 复制核心脚本文件

在你的项目中创建（或直接复制仓库里的版本）：

- `docs/javascripts/glm-config.js`  
  - 翻译系统的「全局配置」，包括：接口地址、模型名、跳过哪些元素、术语表、UI 配置等  
  - 当前已配置为：

```javascript
window.GLM_CONFIG = {
  api: {
    endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
    model: 'Qwen/Qwen3-8B',
    // ...
  },
  // ...
};
```

- `docs/javascripts/glm-translate.js`  
  - 实现整个翻译流程：文本收集、批量调用 API、缓存、进度提示、页面/全局翻译模式等  
  - 内部通过 `window.GLM_API_KEY` 拿到密钥，并使用 `GLM_CONFIG.api.endpoint / api.model` 发起请求

> 推荐做法：直接从仓库复制这两个文件，后续如果我优化了实现，你也可以轻松 `diff` 更新。

### 2.2 在 zensical.toml 中引入脚本和样式

确保在 `zensical.toml` 里已经包含以下配置（你的项目可以按需精简，下面是与翻译 / Ask AI 相关的部分）：

```toml
[project]

# ===== 额外的 JavaScript 文件 =====
extra_javascript = [
    "javascripts/glm-config.js",      # 翻译系统配置（Qwen3-8B + 跳过规则等）
    "javascripts/glm-translate.js",   # 翻译主逻辑
    "javascripts/glm-api-config.js",  # API Key 注入（由本地或 CI 生成）
    "javascripts/chat-widget.js",     # Ask AI 聊天组件（可选）
]

# ===== 额外的 CSS 文件 =====
extra_css = [
    "stylesheets/chat-widget.css",    # Ask AI 样式（与翻译的进度/Toast 视觉统一）
]
```

这里最关键的有三点：

- `glm-config.js` 和 `glm-translate.js` 要在页面上加载  
- `glm-api-config.js` 必须在 **翻译脚本之前** 加载（提供 `window.GLM_API_KEY`）  
- 如果你不需要 Ask AI，可以先去掉 `chat-widget.js` 与对应 CSS

---

## 3. 通过 GitHub Actions + Secrets 注入 API Key

### 3.1 仓库 Secrets：`GLM_API_KEY`

在你的仓库中：

1. 打开 `Settings` → `Secrets and variables` → `Actions`  
2. 新建一个 Secret：
   - **Name**：`GLM_API_KEY`
   - **Value**：硅基流动生成的 API Key

> 注意：变量名仍然叫 `GLM_API_KEY`，只是一个名字，实际已经指向硅基流动。

### 3.2 Actions 里生成 `glm-api-config.js`

在 `.github/workflows/docs.yml` 中，类似下面这样配置（与你当前仓库保持一致）：

```yaml title=".github/workflows/docs.yml"
- name: Generate GLM API Config
  run: |
    echo "window.GLM_API_KEY = '${{ secrets.GLM_API_KEY }}';" > docs/javascripts/glm-api-config.js
```

这样：

- 仓库里 **不会保存** 明文密钥  
- 构建时自动生成 `glm-api-config.js`，浏览器运行时可以通过 `window.GLM_API_KEY` 获取 Key  
- Ask AI 与翻译都会用同一个 Key 与模型

### 3.3 .gitignore 中忽略 `glm-api-config.js`

```gitignore
# 自动生成的 API 配置文件（包含敏感信息）
docs/javascripts/glm-api-config.js
```

---

## 4. 在 Zensical 中配置多语言切换菜单

Zensical（底层仍是 Material for MkDocs）通过 `project.extra.alternate` 来渲染顶栏的语言切换菜单。  
在 `zensical.toml` 中已经有类似配置：

```toml
# ===== 多语言切换配置 =====
[[project.extra.alternate]]
name = "中文"
link = "#glm-translate-chinese_simplified"
lang = "zh"

[[project.extra.alternate]]
name = "English"
link = "#glm-translate-english"
lang = "en"

# [[project.extra.alternate]]
# name = "日本語"
# link = "#glm-translate-japanese"
# lang = "ja"
```

含义说明：

- `name`：菜单上显示的文字  
- `lang`：供浏览器 / SEO 使用的语言代码  
- `link`：特殊格式的锚点：`#glm-translate-{language_key}`

`glm-translate.js` 在初始化时会监听所有链接的点击事件：

```js
// 例：点击 link="#glm-translate-english"
// 会解析出 language_key = "english"
// 然后调用：
window.translateTo(language_key);
```

可用的 `language_key` 与内部语言映射在 `GLM_CONFIG.languages` 中定义，例如：

- `chinese_simplified`
- `english`
- `japanese`
- `korean`
- `french`
- `spanish`
- `german`
- `arabic`
- `deutsch`
- `portuguese`

要新增一种语言，只需要：

1. 确认 `GLM_CONFIG.languages` 里存在对应 key  
2. 在 `project.extra.alternate` 里再添加一项，例如日语：

```toml
[[project.extra.alternate]]
name = "日本語"
link = "#glm-translate-japanese"
lang = "ja"
```

---

## 5. 翻译系统的工作原理（基于你当前的实现）

这一节是“理解型”，不用写代码，但有助于调试和自定义。

### 5.1 入口：`window.translateTo(language)`

- 所有语言切换最终都会调用 `window.translateTo(language)`  
- 它会：
  - 弹出一个「选择翻译范围」弹窗（当前页面 / 全局翻译）  
  - 根据选择调用 `translatePage(language, showProgress)`  
  - 如选择全局，会在 `localStorage` 里写入 `glm_global_translation_preference`

### 5.2 翻译策略

- **文本收集**：  
  - 使用 `TreeWalker` 遍历 `document.body` 文本节点  
  - 只收集「包含中文」的文本  
  - 对代码块、页脚、导航、大量符号等通过 `GLM_CONFIG.detection.skipTags / skipSelectors` 做了专门过滤

- **批量调用 Qwen3-8B**：  
  - 按 `BATCH_SIZE` 分批，每批再拆给两个“虚拟 API 通道”并行调用  
  - 请求使用：

    ```json
    POST https://api.siliconflow.cn/v1/chat/completions
    {
      "model": "Qwen/Qwen3-8B",
      "messages": [
        {"role": "system", "content": "... 翻译规则 ..."},
        {"role": "user", "content": "翻译指令 + 文本"}
      ]
    }
    ```

- **缓存与页面记忆**：  
  - 翻译结果会被写入 `translationCache`（内存）  
  - 每个页面还有独立的 `pageTranslationCache`，用于在即时导航 / 返回时快速恢复  
  - 全局偏好 `glm_global_translation_preference` 则控制“新页面是否自动翻译”

### 5.3 UI 与用户体验

- 右下角会有与 Ask AI 按钮风格统一的 **翻译进度 Toast**：  
  - `Collecting text...` / `Translation completed! 55 texts translated` 等  
  - 通过 `ProgressManager` 和 `showTranslateStatus` 控制  
- 再次点击语言切换时，如果目标语言与当前一致，会给出「当前已是 English」等提示，避免重复请求。

---

## 6. 与 Ask AI 的关系

你现在站点上的两套智能功能共用一套后端与密钥：

- **Ask AI 聊天组件**：`docs/javascripts/chat-widget.js`  
  - 使用 `window.GLM_API_KEY` + `Qwen/Qwen3-8B` 完成问答  
- **多语言翻译系统**：`glm-config.js + glm-translate.js`  
  - 同样使用 `window.GLM_API_KEY` + `Qwen/Qwen3-8B` 批量翻译页面文本  

好处：

- 计费统一好管理  
- 只需要维护一处 Secrets (`GLM_API_KEY`) 与一条 Actions 注入逻辑  

---

## 7. 常见问题

### 7.1 点击语言切换没有反应

检查以下几点：

- `zensical.toml` 里是否配置了 `extra_javascript`（尤其是 `glm-translate.js`）  
- 浏览器控制台是否有报错（例如 `GLM_CONFIG is not defined`）  
- `project.extra.alternate` 中 `link` 是否是 `#glm-translate-xxx` 这种格式

### 7.2 提示「未找到翻译用的 API 密钥」

- 确认：
  - GitHub Secrets 中已经有 `GLM_API_KEY`  
  - Actions 工作流里确实有生成 `glm-api-config.js` 的步骤  
  - 浏览器控制台里，`window.GLM_API_KEY` 不是 `undefined`

### 7.3 翻译完某些代码/公式被破坏了

- 优先在页面模板或 Markdown 中给这类元素加上：

```html
<span class="no-translate">...</span>
```

- 或在 `GLM_CONFIG.detection.skipSelectors` 中增加更精确的 CSS 选择器

---

## 8. 小结

按照本文步骤，你就可以在 Zensical 网站中获得：

- 顶栏语言切换  
- 当前页面 / 全站两种翻译模式  
- Qwen3-8B 驱动的高质量翻译  
- 与 Ask AI 共用一套后端与密钥的统一架构  

如果你需要对这套翻译系统做更深入的定制（例如只翻译正文、接入别的 LLM、改成后端代理），可以直接阅读并修改：

- `docs/javascripts/glm-config.js`
- `docs/javascripts/glm-translate.js`

源码始终以仓库为准：[`Wcowin/Wcowin.github.io`](https://github.com/Wcowin/Wcowin.github.io)。  
欢迎在 Issues 或评论里交流你的使用体验和改进想法。

