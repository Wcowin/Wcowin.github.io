/**
 * Ask AI 聊天组件 - 使用智谱清言 GLM API
 * 版本: 1.0.0
 */

(function() {
  'use strict';

  // 配置
  const CONFIG = {
    apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash',
    maxMessageLength: 500,
    maxContextLength: 2000,
    systemPrompt: `你是一个友好的AI助手，专门帮助用户了解这个网站的内容。
规则：
1. 用简洁、友好的语言回答问题
2. 如果问题与网站内容相关，基于提供的页面内容回答
3. 如果不确定，诚实地说不知道
4. 回答要简短精炼，不要太长`,
    // 按钮位置: 'left', 'center', 'right'
    defaultPosition: 'right'
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
    
    // 移除所有位置类
    trigger.classList.remove('ai-chat-left', 'ai-chat-center', 'ai-chat-right');
    // 添加新位置类
    trigger.classList.add(`ai-chat-${position}`);
  }
  
  function cyclePosition() {
    const current = getButtonPosition();
    const currentIndex = POSITIONS.indexOf(current);
    const nextIndex = (currentIndex + 1) % POSITIONS.length;
    setButtonPosition(POSITIONS[nextIndex]);
  }

  // 获取 API Key（从 window 或环境变量）
  function getApiKey() {
    // 优先从 GLM_API_KEY 获取
    if (window.GLM_API_KEY) {
      return window.GLM_API_KEY;
    }
    // 备用：从 GLM_CONFIG 获取（如果有的话）
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

    <div class="ai-chat-input-area">
      <input type="text" id="ai-chat-input" placeholder="输入你的问题..." autocomplete="off">
      <button class="ai-chat-send-btn" id="ai-chat-send" aria-label="发送">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>

    <div id="ai-chat-messages" class="ai-chat-messages">
      <div class="ai-message ai-message-bot">
        <div class="ai-message-content">
          你好！我是 AI 助手，可以帮你了解这个网站的内容。有什么想问的吗？
        </div>
      </div>
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
    
    // 初始化按钮位置
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
            你好！我是 AI 助手，可以帮你了解这个网站的内容。有什么想问的吗？
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

  // 添加加载指示器
  function addLoadingMessage() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    if (!messagesDiv) return null;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai-message-loading';
    messageDiv.innerHTML = `
      <div class="ai-message-content ai-loading-content">
        <span class="ai-loading-text">思考中</span>
        <span class="ai-loading-dots">
          <span class="ai-dot"></span>
          <span class="ai-dot"></span>
          <span class="ai-dot"></span>
        </span>
      </div>
    `;

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    return messageDiv;
  }

  // 简单的 Markdown 解析
  function parseMarkdown(text) {
    if (!text) return '';
    
    // 转义 HTML
    let result = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // 粗体
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // 斜体
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // 链接
    result = result.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    
    // 换行
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

  // 发送消息
  async function sendMessage() {
    const input = document.getElementById('ai-chat-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // 检查消息长度
    if (message.length > CONFIG.maxMessageLength) {
      addMessage(`请将问题控制在 ${CONFIG.maxMessageLength} 字以内。`, 'bot');
      return;
    }

    // 清空输入框
    input.value = '';

    // 添加用户消息
    addMessage(message, 'user');

    // 添加加载指示器
    const loadingDiv = addLoadingMessage();

    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      // 构建消息历史
      const messages = [
        { role: 'system', content: CONFIG.systemPrompt },
        { role: 'user', content: `当前页面信息:\n${getPageContext()}` }
      ];

      // 添加对话历史（最近5轮）
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);

      // 添加当前问题
      messages.push({ role: 'user', content: message });

      // 调用 API
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
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API_ERROR_${response.status}`);
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题。';

      // 更新对话历史
      conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: answer }
      );

      // 移除加载指示器，显示回答
      loadingDiv?.remove();
      addMessage(answer, 'bot');

    } catch (error) {
      console.error('Chat error:', error);
      loadingDiv?.remove();

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
