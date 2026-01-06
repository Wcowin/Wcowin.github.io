---
title: 为 Zensical 网站添加 Ask AI 功能
date: 2026-01-06
tags:
  - Zensical
  - AI
status: draft
---

# 为 Zensical 网站添加 Ask AI 功能

> 使用智谱清言 GLM API 为你的 Zensical 网站添加智能 AI 助手功能
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

### 1. 获取智谱清言 API Key

1. 访问 [智谱清言开放平台](https://open.bigmodel.cn/)
2. 注册并登录账号
3. 在控制台创建应用并获取 API Key

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
 * GLM API Key 配置
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

```javascript title="docs/javascripts/chat-widget.js"
/**
 * Ask AI 聊天组件 - 使用智谱清言 GLM API
 * 版本: 1.0.0
 * author: Wcowin
 */

(function() {
  'use strict';

  // 配置
  const CONFIG = {
    apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash',
    maxMessageLength: 500,
    maxContextLength: 50000,
    systemPrompt: `你是网站的 AI 助手，帮助访客了解网站内容。

回答规则：
1. 基于当前页面内容回答，简洁友好
2. 如果页面内容能回答问题，直接引用相关信息
3. 如果问题超出页面范围，可以简要介绍网站其他相关内容
4. 不确定时诚实说明
5. 用中文回答，技术术语保持原样`,
    defaultPosition: 'right'  // 按钮位置: 'left', 'center', 'right'
  };

  // 位置管理
  const POSITIONS = ['left', 'center', 'right'];
  
  function getButtonPosition() {
    return localStorage.getItem('ai-chat-position') || CONFIG.defaultPosition;
  }
  
  function setButtonPosition(position) {
    localStorage.setItem('ai-chat-position', position);
    updateButtonPosition(position);
  }
  
  function updateButtonPosition(position) {
    const trigger = document.getElementById('ai-chat-trigger');
    if (!trigger) return;
    
    trigger.classList.remove('ai-chat-left', 'ai-chat-center', 'ai-chat-right');
    trigger.classList.add(`ai-chat-${position}`);
  }
  
  function cyclePosition() {
    const current = getButtonPosition();
    const currentIndex = POSITIONS.indexOf(current);
    const nextIndex = (currentIndex + 1) % POSITIONS.length;
    setButtonPosition(POSITIONS[nextIndex]);
  }

  // 获取 API Key
  function getApiKey() {
    if (window.GLM_API_KEY) {
      return window.GLM_API_KEY;
    }
    if (window.GLM_CONFIG && window.GLM_CONFIG.apiKey) {
      return window.GLM_CONFIG.apiKey;
    }
    return null;
  }

  // 会话历史
  let conversationHistory = [];
  let sessionId = Date.now().toString(36);

  // UI 模板
  const template = `
<div id="ai-chat-trigger" class="ai-chat-trigger" aria-label="Ask AI">
  <button class="ai-chat-position-btn" aria-label="切换位置" title="切换按钮位置">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
  <button class="ai-chat-main-btn" aria-label="Ask AI">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <span class="ai-chat-trigger-text">Ask AI</span>
  </button>
</div>

<div id="ai-chat-modal" class="ai-chat-modal">
  <div class="ai-chat-container">
    <div class="ai-chat-header">
      <div class="ai-chat-header-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Ask AI 助手</span>
      </div>
      <div class="ai-chat-header-actions">
        <button class="ai-chat-action-btn" id="ai-chat-clear" title="清空对话">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <button class="ai-chat-close" aria-label="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div id="ai-chat-messages" class="ai-chat-messages">
      <div class="ai-message ai-message-bot">
        <div class="ai-message-content">
          你好！我是 AI 助手，可以帮你了解网站内容。有什么想问的吗？
        </div>
      </div>
    </div>

    <div class="ai-chat-input-area">
      <input type="text" id="ai-chat-input" placeholder="输入你的问题..." autocomplete="off">
      <button class="ai-chat-send-btn" id="ai-chat-send" aria-label="发送">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</div>
`;

  // 注入 UI
  function injectUI() {
    document.body.insertAdjacentHTML('beforeend', template);
    bindEvents();
  }

  // 绑定事件
  function bindEvents() {
    const trigger = document.getElementById('ai-chat-trigger');
    const mainBtn = document.querySelector('.ai-chat-main-btn');
    const positionBtn = document.querySelector('.ai-chat-position-btn');
    const modal = document.getElementById('ai-chat-modal');
    const closeBtn = document.querySelector('.ai-chat-close');
    const clearBtn = document.getElementById('ai-chat-clear');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');

    mainBtn?.addEventListener('click', openModal);
    positionBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      cyclePosition();
    });
    closeBtn?.addEventListener('click', closeModal);
    clearBtn?.addEventListener('click', clearChat);
    
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn?.addEventListener('click', sendMessage);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    
    updateButtonPosition(getButtonPosition());
  }

  // 打开模态框
  function openModal() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) {
      modal.classList.add('active');
      document.getElementById('ai-chat-input')?.focus();
    }
  }

  // 关闭模态框
  function closeModal() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // 清空对话
  function clearChat() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    if (messagesDiv) {
      messagesDiv.innerHTML = `
        <div class="ai-message ai-message-bot">
          <div class="ai-message-content">
            你好！我是 AI 助手，可以帮你了解网站内容。有什么想问的吗？
          </div>
        </div>
      `;
    }
    conversationHistory = [];
    sessionId = Date.now().toString(36);
  }

  // 添加消息到界面
  function addMessage(text, sender) {
    const messagesDiv = document.getElementById('ai-chat-messages');
    if (!messagesDiv) return null;

    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-message-content';
    
    if (sender === 'bot') {
      contentDiv.innerHTML = parseMarkdown(text);
    } else {
      contentDiv.textContent = text;
    }

    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    return messageDiv;
  }

  // 简单的 Markdown 解析
  function parseMarkdown(text) {
    if (!text) return '';
    
    let result = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    result = result.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    result = result.replace(/\n/g, '<br>');
    
    return result;
  }

  // 获取页面上下文
  function getPageContext() {
    const title = document.title || '';
    const mainContent = document.querySelector('.md-content')?.innerText || '';
    const context = `页面标题: ${title}\n\n页面内容摘要:\n${mainContent.substring(0, CONFIG.maxContextLength)}`;
    return context;
  }

  // 发送消息（流式输出）
  async function sendMessage() {
    const input = document.getElementById('ai-chat-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    if (message.length > CONFIG.maxMessageLength) {
      addMessage(`请将问题控制在 ${CONFIG.maxMessageLength} 字以内。`, 'bot');
      return;
    }

    input.value = '';
    addMessage(message, 'user');

    const messagesDiv = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai-message-bot';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-message-content';
    contentDiv.innerHTML = '<span class="ai-typing-cursor">▊</span>';
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    let fullAnswer = '';

    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      const messages = [
        { role: 'system', content: CONFIG.systemPrompt },
        { role: 'user', content: `当前页面信息:\n${getPageContext()}` }
      ];

      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
      messages.push({ role: 'user', content: message });

      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: CONFIG.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 4096,
          stream: true
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API_ERROR_${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content || '';
              if (delta) {
                fullAnswer += delta;
                contentDiv.innerHTML = parseMarkdown(fullAnswer) + '<span class="ai-typing-cursor">▊</span>';
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

      contentDiv.innerHTML = parseMarkdown(fullAnswer);

      conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: fullAnswer }
      );

    } catch (error) {
      console.error('Chat error:', error);

      let errorMessage = '抱歉，发生了错误，请稍后再试。';
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = 'API Key 未配置，请联系网站管理员。';
      } else if (error.message.includes('API_ERROR_401')) {
        errorMessage = 'API 认证失败，请检查配置。';
      } else if (error.message.includes('API_ERROR_429')) {
        errorMessage = '请求太频繁，请稍后再试。';
      }

      addMessage(errorMessage, 'bot');
    }
  }

  // 初始化
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectUI);
    } else {
      injectUI();
    }
  }

  // 暴露公共 API
  window.AskAI = {
    open: openModal,
    close: closeModal,
    clear: clearChat
  };

  init();
})();
```

### 第三步：创建样式文件

创建 `docs/stylesheets/chat-widget.css` 文件：

```css title="docs/stylesheets/chat-widget.css"
/* ==========================================================================
   Ask AI 聊天组件样式 - 适配博客主题
   ========================================================================== */

/* 浮动触发按钮容器 */
.ai-chat-trigger {
  position: fixed;
  bottom: 160px;
  display: flex;
  align-items: center;
  gap: 0;
  z-index: 999;
  transition: all 0.3s ease;
}

/* 位置变体 */
.ai-chat-trigger.ai-chat-left {
  left: 24px;
  right: auto;
  transform: none;
}

.ai-chat-trigger.ai-chat-center {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

.ai-chat-trigger.ai-chat-right {
  left: auto;
  right: 24px;
  transform: none;
}

/* 主按钮 - 液态玻璃风格 */
.ai-chat-main-btn {
  height: 44px;
  border-radius: 1.6rem;
  background-color: var(--md-default-bg-color--light, rgba(255, 255, 255, 0.9));
  color: var(--md-default-fg-color--light, #666);
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.8rem;
  font-weight: 400;
  font-family: inherit;
  backdrop-filter: blur(0.4rem);
  -webkit-backdrop-filter: blur(0.4rem);
}

.ai-chat-main-btn:hover {
  background-color: var(--md-default-bg-color, #fff);
  color: var(--md-default-fg-color, #333);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.ai-chat-main-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ai-chat-main-btn svg {
  flex-shrink: 0;
}

/* 位置切换按钮 */
.ai-chat-position-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--md-default-bg-color--light, rgba(255, 255, 255, 0.9));
  border: none;
  color: var(--md-default-fg-color--light, #666);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: all 0.2s ease;
  opacity: 0;
  transform: scale(0.8);
  backdrop-filter: blur(0.4rem);
  -webkit-backdrop-filter: blur(0.4rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.ai-chat-trigger:hover .ai-chat-position-btn {
  opacity: 1;
  transform: scale(1);
}

.ai-chat-position-btn:hover {
  background-color: var(--md-default-bg-color, #fff);
  color: var(--md-default-fg-color, #333);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 模态框遮罩 */
.ai-chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: none;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 60px 16px 16px;
  overflow-y: auto;
}

.ai-chat-modal.active {
  display: flex;
}

/* 聊天容器 */
.ai-chat-container {
  background: var(--md-default-bg-color, #fff);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 460px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(81, 143, 193, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 头部 */
.ai-chat-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--md-default-fg-color--lightest, #eee);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--md-default-bg-color, #fff);
}

.ai-chat-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 15px;
  color: var(--md-default-fg-color, #333);
}

.ai-chat-header-info svg {
  color: var(--md-primary-fg-color, #518FC1);
}

.ai-chat-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ai-chat-action-btn,
.ai-chat-close {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--md-default-fg-color--light, #666);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.ai-chat-action-btn:hover,
.ai-chat-close:hover {
  background: var(--md-default-fg-color--lightest, #f5f5f5);
  color: var(--md-default-fg-color, #333);
}

/* 输入区域 */
.ai-chat-input-area {
  padding: 14px 18px;
  border-top: 1px solid var(--md-default-fg-color--lightest, #eee);
  display: flex;
  gap: 10px;
  background: var(--md-default-bg-color, #fff);
}

#ai-chat-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--md-default-fg-color--lighter, #ddd);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: var(--md-default-bg-color, #fff);
  color: var(--md-default-fg-color, #333);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#ai-chat-input:focus {
  outline: none;
  border-color: var(--md-primary-fg-color, #518FC1);
  box-shadow: 0 0 0 3px rgba(81, 143, 193, 0.1);
}

#ai-chat-input::placeholder {
  color: var(--md-default-fg-color--light, #999);
}

.ai-chat-send-btn {
  background: var(--md-primary-fg-color, #518FC1);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.ai-chat-send-btn:hover {
  opacity: 0.85;
}

.ai-chat-send-btn:active {
  transform: scale(0.98);
}

/* 消息区域 */
.ai-chat-messages {
  flex: 1;
  padding: 18px;
  overflow-y: auto;
  background: var(--md-default-bg-color, #fff);
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 200px;
  max-height: 380px;
}

.ai-message {
  display: flex;
  max-width: 85%;
}

.ai-message-content {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

.ai-message-bot {
  align-self: flex-start;
}

.ai-message-bot .ai-message-content {
  background: rgba(81, 143, 193, 0.08);
  color: var(--md-default-fg-color, #333);
  border-bottom-left-radius: 4px;
}

.ai-message-user {
  align-self: flex-end;
}

.ai-message-user .ai-message-content {
  background: var(--md-primary-fg-color, #518FC1);
  color: #fff;
  border-bottom-right-radius: 4px;
}

/* 消息内链接 */
.ai-message-content a {
  color: inherit;
  text-decoration: underline;
  opacity: 0.9;
}

.ai-message-content a:hover {
  opacity: 1;
}

/* 滚动条 */
.ai-chat-messages::-webkit-scrollbar {
  width: 5px;
}

.ai-chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.ai-chat-messages::-webkit-scrollbar-thumb {
  background: var(--md-default-fg-color--lighter, #ddd);
  border-radius: 3px;
}

/* 打字光标动画 */
.ai-typing-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  color: var(--md-primary-fg-color, #518FC1);
  font-weight: normal;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 响应式 */
@media (max-width: 768px) {
  .ai-chat-trigger {
    bottom: 32px;
  }
  
  .ai-chat-trigger.ai-chat-left {
    left: 16px;
  }
  
  .ai-chat-trigger.ai-chat-center {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .ai-chat-trigger.ai-chat-right {
    right: 16px;
  }

  .ai-chat-main-btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 0;
  }

  .ai-chat-trigger-text {
    display: none;
  }
  
  .ai-chat-position-btn {
    display: none;
  }

  .ai-chat-modal {
    padding: 0;
    align-items: stretch;
  }

  .ai-chat-container {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
    border: none;
  }

  .ai-chat-messages {
    max-height: none;
    flex: 1;
  }
}

/* 暗色模式 */
[data-md-color-scheme="slate"] .ai-chat-main-btn {
  background-color: rgba(40, 40, 40, 0.85);
  color: var(--md-default-fg-color--light, #aaa);
}

[data-md-color-scheme="slate"] .ai-chat-main-btn:hover {
  background-color: rgba(50, 50, 50, 0.95);
  color: var(--md-default-fg-color, #fff);
}

[data-md-color-scheme="slate"] .ai-chat-trigger {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-md-color-scheme="slate"] .ai-message-bot .ai-message-content {
  background: rgba(255, 255, 255, 0.06);
}

[data-md-color-scheme="slate"] .ai-chat-container {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}
```

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
   - **Value**: 你的智谱清言 API Key
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
    - 但前端打包后，API Key 仍会暴露在浏览器的 JavaScript 文件中
    - 如果担心被滥用，建议：
      1. 在智谱清言控制台设置 API 调用限额
      2. 或者搭建后端代理服务，避免在前端直接调用 API

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
  model: 'glm-4',  // 或其他可用模型
};
```

!!! tip "可用模型"
    访问 [智谱清言 API 文档](https://open.bigmodel.cn/dev/api) 查看所有可用模型。

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

1. 在智谱清言控制台设置 API 调用限额
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

- [智谱清言开放平台](https://open.bigmodel.cn/)
- [GLM API 文档](https://open.bigmodel.cn/dev/api)
- [Zensical 官方文档](https://zensical.org/docs/)

