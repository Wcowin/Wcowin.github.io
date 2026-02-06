---
title: 为 Zensical 网站添加 Ask AI 功能
date: 2026-02-06
tags:
  - Zensical
  - AI
status: draft
---

# 为 Zensical 网站添加 Ask AI 功能

> 使用硅基流动（SiliconFlow）OpenAI 兼容接口 + `Qwen3-8B` 为你的 Zensical 网站添加智能 AI 助手功能
>
> 作者：[Wcowin](https://github.com/Wcowin)

!!! info "功能预览"
    Ask AI 功能会在网站右下角（可自定义位置）显示一个浮动按钮，点击后弹出聊天窗口，访客可以与 AI 助手对话，AI 会基于当前页面内容回答问题。

## 功能特性

- [x] **浮动触发按钮** - 固定在页面底部，支持左/中/右位置切换
- [x] **流式输出** - AI 回复实时显示，体验流畅
- [x] **上下文感知** - 自动获取当前页面内容作为上下文
- [x] **对话历史** - 保存最近 5 轮对话，支持连续对话
- [x] **Markdown 渲染** - AI 回复支持 Markdown 格式
- [x] **响应式设计** - 完美适配移动端和桌面端
- [x] **暗色模式支持** - 自动适配网站主题
- [x] **液态玻璃风格** - 现代化的毛玻璃效果

## 准备工作

### 1. 获取硅基流动 API Key

1. 访问 [硅基流动控制台](https://cloud.siliconflow.cn/)
2. 注册并登录账号
3. 创建 API Key（用于调用 OpenAI 兼容接口）

!!! warning "API Key 安全"
    API Key 是敏感信息，请妥善保管，不要提交到公开仓库。

### 2. 创建必要的文件

在项目中创建以下文件结构：

```
docs/
├── javascripts/
│   ├── glm-api-config.js    # API Key 配置（需要创建）
│   └── chat-widget.js        # 聊天组件主文件（需要创建）
└── stylesheets/
    └── chat-widget.css       # 聊天组件样式（需要创建）
```

## 实现步骤

### 第一步：创建 API Key 配置文件（本地开发）

!!! note "本地开发 vs 生产部署"
    这一步是用于**本地开发测试**的。如果你使用 GitHub Actions 部署，可以跳过这一步，直接看后面的"使用 GitHub Actions + Secrets"部分。

创建 `docs/javascripts/glm-api-config.js` 文件：

```javascript title="docs/javascripts/glm-api-config.js"
/**
 * API Key 配置（推荐仅本地开发使用）
 * 注意：此文件包含敏感信息，应在 .gitignore 中排除
 * 部署时建议通过 CI/CD 环境变量注入
 */
window.GLM_API_KEY = 'your-api-key-here';
```

!!! warning "重要：添加到 .gitignore"
    为了防止 API Key 被提交到仓库，必须将 `glm-api-config.js` 添加到 `.gitignore` 文件中：
    
    ```gitignore title=".gitignore"
    # 自动生成的API配置文件（包含敏感信息）
    docs/javascripts/glm-api-config.js
    ```
    
    如果文件已经被 Git 跟踪，需要先移除跟踪：
    ```bash
    git rm --cached docs/javascripts/glm-api-config.js
    ```

### 第二步：创建聊天组件 JavaScript 文件

创建 `docs/javascripts/chat-widget.js` 文件：

> 为了保证教程里的代码**长期准确**，这里不再把整份组件代码粘贴在文档中（否则很容易和仓库真实实现产生漂移）。
>
> 你只需要直接使用仓库中的这两个文件（以它们为准）：
>
> - `docs/javascripts/chat-widget.js`
> - `docs/stylesheets/chat-widget.css`
>
> 这两个文件可以在我的开源仓库中直接查看或复制：[Wcowin/Wcowin.github.io](https://github.com/Wcowin/Wcowin.github.io)。

你可以重点核对/自定义的配置只有这一段（`docs/javascripts/chat-widget.js` 顶部的 `CONFIG`）：

```javascript
const CONFIG = {
  apiEndpoint: 'https://api.siliconflow.cn/v1/chat/completions',
  model: 'Qwen/Qwen3-8B',
  // ... 其余按需调整（systemPrompt、maxMessageLength、默认位置等）
};
```

### 第三步：创建样式文件

创建 `docs/stylesheets/chat-widget.css` 文件：

同理，样式文件也建议直接使用仓库中的 `docs/stylesheets/chat-widget.css`（它已经做了主题适配、暗色模式与响应式处理）。

### 第四步：配置 zensical.toml

在 `zensical.toml` 文件中添加 JavaScript 和 CSS 文件的引用：

```toml title="zensical.toml"
[project]
# ... 其他配置 ...

# ===== 额外的 JavaScript 文件 =====
extra_javascript = [
    "javascripts/glm-api-config.js",    # Ask AI API Key 配置
    "javascripts/chat-widget.js",         # Ask AI 聊天组件
    # ... 其他 JavaScript 文件 ...
]

# ===== 额外的 CSS 文件 =====
extra_css = [
    "stylesheets/chat-widget.css",       # Ask AI 聊天组件样式
    # ... 其他 CSS 文件 ...
]
```

!!! warning "加载顺序"
    确保 `glm-api-config.js` 在 `chat-widget.js` 之前加载，这样聊天组件才能正确获取 API Key。

### 第五步：使用 GitHub Actions + Secrets 安全注入 API Key（生产部署推荐）

!!! tip "推荐方式"
    这是**生产环境部署的推荐方式**，可以避免将 API Key 提交到代码仓库。
    ![image](https://i.111666.best/image/CZakYbIkcykKcgQTgZUCoU.png)

#### 1. 添加 GitHub Secrets

1. 进入你的 GitHub 仓库
2. 点击 `Settings` → `Secrets and variables` → `Actions`
3. 点击 `New repository secret`
4. 添加以下 Secret：
   - **Name**: `GLM_API_KEY`
   - **Value**: 你的硅基流动 API Key（名称仍沿用 `GLM_API_KEY`，只是变量名，不影响实际服务商）
5. 点击 `Add secret` 保存

!!! tip "其他 Secrets"
    如果你还使用了其他服务（如 IndexNow），可以同样方式添加对应的 Secret。

#### 2. 确认 .gitignore 配置

确保 `docs/javascripts/glm-api-config.js` 在 `.gitignore` 中：

```gitignore title=".gitignore"
# 自动生成的API配置文件（包含敏感信息）
docs/javascripts/glm-api-config.js
```

#### 3. 配置 GitHub Actions 工作流

在你的 GitHub Actions 工作流文件中（通常是 `.github/workflows/docs.yml`），在构建步骤之前添加生成配置文件的步骤：

```yaml title=".github/workflows/docs.yml" hl_lines="21-24"
name: Documentation
on:
  push:
    branches:
      - master
      - main
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: pip install zensical
      
      # 生成 Ask AI 的 API Key 配置文件
      - name: Generate GLM API Config
        run: |
          echo "window.GLM_API_KEY = '${{ secrets.GLM_API_KEY }}';" > docs/javascripts/glm-api-config.js
      
      - run: zensical build --clean
      - uses: actions/upload-pages-artifact@v4
        with:
          path: site
      - uses: actions/deploy-pages@v4
```

!!! warning "注意事项"
    - Secrets 在 GitHub Actions 日志中会被自动脱敏（显示为 `***`）
    - 但**只要在浏览器里直连 LLM 接口**，`Authorization: Bearer ...` 就一定能在开发者工具 Network 里看到（这是前端直连的天然限制）
    - 如果担心被滥用，建议：
      1. 在硅基流动控制台设置调用限额/账单告警
      2. 使用后端/边缘函数做代理，把密钥只放在服务端（推荐）

## 自定义配置

### 修改系统提示词

在 `chat-widget.js` 中修改 `CONFIG.systemPrompt` 来自定义 AI 助手的角色和行为：

```javascript
const CONFIG = {
  // ... 其他配置 ...
  systemPrompt: `你是网站的 AI 助手，帮助访客了解网站内容。

关于网站：
- 网站名称：你的网站名称
- 主要内容：技术博客、教程等
- 特色功能：XXX

回答规则：
1. 基于当前页面内容回答
2. 简洁友好
3. 用中文回答`,
};
```

### 修改按钮位置

默认位置是 `right`（右侧），可以在 `CONFIG.defaultPosition` 中修改为 `left` 或 `center`：

```javascript
const CONFIG = {
  // ... 其他配置 ...
  defaultPosition: 'left'  // 可选: 'left', 'center', 'right'
};
```

用户也可以通过点击位置切换按钮来改变位置，位置偏好会保存在 localStorage 中。

### 修改模型

如果需要使用其他模型，可以修改 `CONFIG.model`：

```javascript
const CONFIG = {
  // ... 其他配置 ...
  model: 'Qwen/Qwen3-8B',  // 例如：Qwen/Qwen3-14B、Qwen/Qwen3-32B 等（以硅基流动模型列表为准）
};
```

!!! tip "可用模型"
    访问硅基流动的模型列表/文档查看可用模型与模型 ID（OpenAI 兼容接口）。

### 修改样式

可以通过修改 `chat-widget.css` 来自定义样式，例如：

- 修改按钮颜色
- 调整模态框大小
- 修改消息气泡样式
- 调整响应式断点

## 使用公共 API

聊天组件暴露了公共 API，可以在其他 JavaScript 代码中使用：

```javascript
// 打开聊天窗口
window.AskAI.open();

// 关闭聊天窗口
window.AskAI.close();

// 清空对话历史
window.AskAI.clear();
```

## 安全建议

(1) **API Key 保护**

   - 将 `glm-api-config.js` 添加到 `.gitignore`
   - 使用环境变量或后端代理

(2) **速率限制**

   - 在 API 配置中设置合理的速率限制
   - 考虑在前端添加请求频率限制

(3) **输入验证**

   - 已内置消息长度限制（默认 500 字）
   - 可以根据需要调整 `maxMessageLength`

## 测试功能

完成所有配置后，测试 Ask AI 功能：

**本地测试**  
```bash
# 启动开发服务器
zensical serve
```
访问 `http://localhost:8000`，检查右下角是否出现 "Ask AI" 按钮

**点击按钮**，应该弹出聊天窗口

**发送测试消息**，例如："这个网站是做什么的？"

**检查功能**

   - [x] 按钮位置是否正确
   - [x] 聊天窗口是否正常打开
   - [x] AI 回复是否正常显示（流式输出）
   - [x] 对话历史是否保存
   - [x] 清空对话功能是否正常

!!! tip "调试技巧"
    如果功能不正常，打开浏览器开发者工具（F12）查看控制台错误信息：

    - 如果提示 "API Key 未配置"，检查 `glm-api-config.js` 是否正确加载
    - 如果提示 "API 认证失败"，检查 API Key 是否正确
    - 如果提示 "请求太频繁"，可能是 API 调用限额问题

## 常见问题

### Q: API Key 在哪里配置？

A: 有两种配置方式：

1. **本地开发**：在 `docs/javascripts/glm-api-config.js` 文件中直接配置（记得添加到 `.gitignore`）
2. **生产部署**：使用 GitHub Secrets + GitHub Actions 自动生成配置文件（推荐）

### Q: 如何修改按钮位置？

A: 修改 `chat-widget.js` 中的 `CONFIG.defaultPosition`，或让用户通过位置切换按钮自行调整。

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器（Chrome、Firefox、Safari、Edge），需要支持 ES6+ 和 Fetch API。

### Q: 如何自定义样式？

A: 修改 `chat-widget.css` 文件，所有样式都使用 CSS 变量，可以轻松适配主题。

### Q: 可以更换其他 AI 服务吗？

A: 可以，需要修改 `chat-widget.js` 中的以下部分：

- `CONFIG.apiEndpoint` - API 端点地址
- `CONFIG.model` - 模型名称
- `fetch` 请求的格式（根据目标 API 的规范调整）

### Q: 本地开发正常，但部署后不工作？

A: 检查以下几点：

1. 是否配置了 GitHub Secrets（`GLM_API_KEY`）
2. GitHub Actions 工作流是否包含生成配置文件的步骤
3. 检查 GitHub Actions 构建日志，确认配置文件是否成功生成
4. 确认 `glm-api-config.js` 在 `.gitignore` 中（避免提交空文件）

### Q: 如何限制 API 调用频率？

A: 可以通过以下方式：

1. 在硅基流动控制台设置 API 调用限额/账单告警
2. 在前端代码中添加请求频率限制（需要修改 `chat-widget.js`）
3. 搭建后端代理服务，在后端进行频率控制

## 总结

通过以上步骤，你已经成功为 Zensical 网站添加了 Ask AI 功能。这个功能可以：

- ✅ 提升用户体验
- ✅ 帮助访客快速了解网站内容
- ✅ 提供智能问答服务
- ✅ 增强网站互动性

!!! tip "下一步"
    - 根据你的网站内容自定义系统提示词
    - 调整样式以匹配网站主题
    - 测试功能是否正常工作
    - 考虑添加更多自定义功能

---

**参考资源**：

- [硅基流动文档](https://docs.siliconflow.cn/)
- [Chat Completions（OpenAI 兼容）](https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions)
- [Zensical 官方文档](https://zensical.org/docs/)

