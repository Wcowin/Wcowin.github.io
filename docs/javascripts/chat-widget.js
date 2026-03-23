/**
 * Ask AI 聊天组件 - 使用硅基流动 Qwen3-8B API
 * 版本: 1.0.0
 * author: Wcowin (https://wcowin.work/)
 */

(function() {
  'use strict';

  // 配置
  const CONFIG = {
    // 硅基流动 OpenAI 兼容 Chat Completions 接口
    apiEndpoint: 'https://api.siliconflow.cn/v1/chat/completions',
    // 使用硅基流动的 Qwen3-8B 模型
    model: 'Qwen/Qwen3-8B',
    maxMessageLength: 500,
    maxContextLength: 50000,
    systemPrompt: `你是 Wcowin 博客的 AI 助手，负责解答访客关于博客内容的问题。

## 关于 Wcowin
- 开发者，喜欢分享技术文章和生活随笔
- 技术方向：MkDocs/Zensical 主题、Mac 效率工具、Python、前端、密码学入门
- 代表项目：OneClip（macOS 剪贴板工具）、FinderClip、MkDocs 插件
- 非技术内容：旅行、读书、生活记录

## 回答原则
1. **准确优先**：有页面内容时严格依据内容回答，不编造
2. **简洁清晰**：直接回答问题，避免冗余铺垫
3. **适度友好**：语气自然，可以偶尔幽默，但不要过于活泼
4. **诚实坦率**：不知道就说不知道，不要硬编
5. **语言习惯**：中文为主，技术术语保留英文`,
  };

  // 贴边状态：默认贴边，按下可取消
  function isPinned() {
    const stored = localStorage.getItem('ai-chat-pinned');
    return stored !== '0';
  }
  
  function setPinned(pinned) {
    localStorage.setItem('ai-chat-pinned', pinned ? '1' : '0');
    updatePinnedState();
  }
  
  function togglePinned() {
    setPinned(!isPinned());
  }
  
  function updatePinnedState() {
    const trigger = document.getElementById('ai-chat-trigger');
    const positionBtn = document.querySelector('.ai-chat-position-btn');
    if (!trigger || !positionBtn) return;
    const pinned = isPinned();
    trigger.classList.toggle('ai-chat-pinned', pinned);
    positionBtn.setAttribute('title', pinned ? '取消贴边' : '贴边');
    positionBtn.setAttribute('aria-label', pinned ? '取消贴边' : '贴边');
  }

  // 获取 API Key（从 window 或环境变量）
  function getApiKey() {
    // 优先从 AI_API_KEY 获取
    if (window.AI_API_KEY) {
      return window.AI_API_KEY;
    }
    // 兼容旧命名
    if (window.GLM_API_KEY) {
      return window.GLM_API_KEY;
    }
    // 备用：从 AI_CONFIG 获取
    if (window.AI_CONFIG && window.AI_CONFIG.apiKey) {
      return window.AI_CONFIG.apiKey;
    }
    return null;
  }

  // 会话历史
  let conversationHistory = [];
  let sessionId = Date.now().toString(36);
  const STORAGE_KEY = 'ai-chat-history';
  const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24小时过期

  // 加载历史记录
  function loadHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      
      const data = JSON.parse(stored);
      // 检查是否过期
      if (data.timestamp && (Date.now() - data.timestamp > STORAGE_EXPIRY)) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      
      if (data.messages && Array.isArray(data.messages)) {
        conversationHistory = data.messages;
        sessionId = data.sessionId || Date.now().toString(36);
        // 恢复界面显示
        restoreMessagesToUI();
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    }
  }

  // 保存历史记录
  function saveHistory() {
    try {
      const data = {
        messages: conversationHistory,
        sessionId: sessionId,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save chat history:', e);
    }
  }

  // 恢复消息到界面
  function restoreMessagesToUI() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    if (!messagesDiv || conversationHistory.length === 0) return;

    // 清空默认欢迎消息
    messagesDiv.innerHTML = '';

    // 按顺序恢复消息
    for (let i = 0; i < conversationHistory.length; i += 2) {
      const userMsg = conversationHistory[i];
      const botMsg = conversationHistory[i + 1];
      
      if (userMsg && userMsg.role === 'user') {
        addMessage(userMsg.content, 'user', userMsg.timestamp);
      }
      if (botMsg && botMsg.role === 'assistant') {
        addMessage(botMsg.content, 'bot', botMsg.timestamp);
      }
    }
  }

  // 建议提示配置
  const PROMPTS = {
    default: [
      "介绍一下这个网站",
      "Wcowin有哪些项目？"
    ],
    projects: [
      "用了哪些技术栈？",
      "如何快速上手？"
    ],
    blog: [
      "核心内容是什么？",
      "文章有哪些技术亮点？"
    ]
  };

  function getPagePrompts() {
    const path = window.location.pathname;
    // 项目页：我的开发项目、OneClip、macOS 开发等
    if (path.includes('/develop/Mywork/') ||
        path.includes('/develop/Mac-development/') ||
        path.includes('/OneClip/')) {
      return PROMPTS.projects;
    }
    // 博客/技术文章：blog 下所有内容（Zensical、MkDocs、技术分享等）
    if (path.includes('/blog/')) {
      return PROMPTS.blog;
    }
    return PROMPTS.default;
  }

  // UI 模板
  const template = `
<div id="ai-chat-trigger" class="ai-chat-trigger" aria-label="Ask AI">
  <button class="ai-chat-position-btn" aria-label="贴边" title="贴边">
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
        <svg class="ai-chat-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="ai-chat-header-title">Ask AI 助手</span>
      </div>
      <div class="ai-chat-header-actions">
        <button class="ai-chat-close" aria-label="关闭" title="关闭">
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
          你好！我是 Wcowin's Blog 的 AI 助手 ✨<br><br>
          我可以帮你：
          <ul style="margin: 8px 0 4px 0; padding-left: 20px;">
            <li>了解网站内容和文章要点</li>
            <li>解答技术项目相关问题</li>
            <li>介绍博客的技术栈和特色</li>
          </ul>
          有什么想了解的吗？可以点击下方提示快速开始
        </div>
      </div>
    </div>

    <div id="ai-chat-prompts" class="ai-chat-prompts visible">
      <button class="ai-chat-prompt-btn" data-prompt-index="0"></button>
      <button class="ai-chat-prompt-btn" data-prompt-index="1"></button>
    </div>

    <div class="ai-chat-input-area">
      <input type="text" id="ai-chat-input" placeholder="输入你的问题..." autocomplete="off">
      <button class="ai-chat-send-btn" id="ai-chat-send" aria-label="发送" title="发送">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
      <div class="ai-chat-menu-wrapper">
        <button class="ai-chat-menu-btn" id="ai-chat-menu-toggle" aria-label="更多选项" aria-expanded="false" title="更多选项">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="5" r="1.5"></circle>
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="12" cy="19" r="1.5"></circle>
          </svg>
        </button>
        <div class="ai-chat-menu" id="ai-chat-menu">
          <button class="ai-chat-menu-item" id="ai-chat-clear" title="清空对话">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>清空</span>
          </button>
          <button class="ai-chat-menu-item" id="ai-chat-copy" title="复制对话">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>复制</span>
          </button>
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

  // 更新建议提示
  function updatePrompts() {
    const promptsContainer = document.getElementById('ai-chat-prompts');
    const promptBtns = promptsContainer?.querySelectorAll('.ai-chat-prompt-btn');
    if (!promptsContainer || !promptBtns) return;

    const prompts = getPagePrompts();
    promptBtns.forEach((btn, index) => {
      if (prompts[index]) {
        btn.textContent = prompts[index];
        btn.style.display = '';
      } else {
        btn.style.display = 'none';
      }
    });
  }

  // 显示/隐藏建议提示
  function togglePrompts(show) {
    const promptsContainer = document.getElementById('ai-chat-prompts');
    if (!promptsContainer) return;
    
    if (show) {
      promptsContainer.classList.add('visible');
    } else {
      promptsContainer.classList.remove('visible');
    }
  }

  // 关闭菜单
  function closeMenu() {
    const menu = document.getElementById('ai-chat-menu');
    const menuToggle = document.getElementById('ai-chat-menu-toggle');
    if (menu) menu.classList.remove('active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  // 复制对话内容
  function copyConversation() {
    const messages = document.querySelectorAll('.ai-message-content');
    let text = '';
    messages.forEach(msg => {
      const sender = msg.closest('.ai-message')?.classList.contains('ai-message-user') ? '你' : 'AI';
      text += `${sender}: ${msg.textContent}\n\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
      showToast('对话已复制到剪贴板');
    }).catch(() => {
      showToast('复制失败，请手动复制');
    });
  }

  // 显示提示信息
  function showToast(message) {
    let toast = document.getElementById('ai-chat-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ai-chat-toast';
      toast.className = 'ai-chat-toast';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('ai-chat-toast-visible');
    
    setTimeout(() => {
      toast.classList.remove('ai-chat-toast-visible');
    }, 2000);
  }

  // 绑定事件
  function bindEvents() {
    const trigger = document.getElementById('ai-chat-trigger');
    const mainBtn = document.querySelector('.ai-chat-main-btn');
    const positionBtn = document.querySelector('.ai-chat-position-btn');
    const modal = document.getElementById('ai-chat-modal');
    const closeBtn = document.querySelector('.ai-chat-close');
    const clearBtn = document.getElementById('ai-chat-clear');
    const copyBtn = document.getElementById('ai-chat-copy');
    const menuToggle = document.getElementById('ai-chat-menu-toggle');
    const menu = document.getElementById('ai-chat-menu');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const promptBtns = document.querySelectorAll('.ai-chat-prompt-btn');

    mainBtn?.addEventListener('click', openModal);
    positionBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePinned();
    });
    closeBtn?.addEventListener('click', closeModal);
    clearBtn?.addEventListener('click', () => {
      closeMenu();
      clearChat();
    });
    
    copyBtn?.addEventListener('click', () => {
      closeMenu();
      copyConversation();
    });

    menuToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = menu?.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!menu?.contains(e.target) && !menuToggle?.contains(e.target)) {
        closeMenu();
      }
    });
    
    // 提示按钮点击事件
    promptBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const prompts = getPagePrompts();
        if (prompts[index]) {
          input.value = prompts[index];
          sendMessage();
        }
      });
    });
    
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
      if (e.key === 'Escape') {
        closeMenu();
        closeModal();
      }
    });
    
    // 初始化：默认右侧，贴边状态，提示
    if (trigger) trigger.classList.add('ai-chat-right');
    updatePinnedState();
    updatePrompts();
    loadHistory(); // 加载历史记录
  }

  // 打开模态框（侧边抽屉，从右侧滑入）
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
            你好！我是 Wcowin's Blog 的 AI 助手 ✨<br><br>
            我可以帮你：
            <ul style="margin: 8px 0 4px 0; padding-left: 20px;">
              <li>了解网站内容和文章要点</li>
              <li>解答技术项目相关问题</li>
              <li>介绍博客的技术栈和特色</li>
            </ul>
            有什么想了解的吗？可以点击下方提示快速开始 🚀
          </div>
        </div>
      `;
    }
    conversationHistory = [];
    sessionId = Date.now().toString(36);
    localStorage.removeItem(STORAGE_KEY);
    togglePrompts(true); // 显示提示
  }

  // 格式化时间戳
  function formatTime(date) {
    const now = new Date();
    const msgDate = new Date(date);
    const isToday = now.toDateString() === msgDate.toDateString();
    
    const hours = msgDate.getHours().toString().padStart(2, '0');
    const minutes = msgDate.getMinutes().toString().padStart(2, '0');
    
    if (isToday) {
      return `${hours}:${minutes}`;
    } else {
      const month = (msgDate.getMonth() + 1).toString().padStart(2, '0');
      const day = msgDate.getDate().toString().padStart(2, '0');
      return `${month}-${day} ${hours}:${minutes}`;
    }
  }

  // 添加消息到界面
  function addMessage(text, sender, timestamp) {
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

    // 添加时间戳
    const timeDiv = document.createElement('div');
    timeDiv.className = 'ai-message-time';
    timeDiv.textContent = timestamp ? formatTime(timestamp) : formatTime(new Date());
    
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'ai-message-wrapper';
    wrapperDiv.appendChild(contentDiv);
    wrapperDiv.appendChild(timeDiv);

    messageDiv.appendChild(wrapperDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    return messageDiv;
  }

  // Markdown 文本处理（转义 HTML + 标题 + 加粗 + 斜体 + 链接 + 换行）
  function parseMarkdown(text) {
    if (!text) return '';
    
    return text
      // 1. 转义 HTML 特殊字符
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // 2. 处理标题（# ## ###）
      .replace(/^###\s+(.+)$/gm, '<strong style="font-size:1.1em">$1</strong>')
      .replace(/^##\s+(.+)$/gm, '<strong style="font-size:1.15em">$1</strong>')
      .replace(/^#\s+(.+)$/gm, '<strong style="font-size:1.2em">$1</strong>')
      // 3. 处理链接 [文本](URL) - 需要在处理加粗/斜体之前，避免干扰
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--ai-chat-link-color, #3b82f6);text-decoration:underline;">$1</a>')
      // 4. 处理加粗 **文本** 或 __文本__
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      // 5. 处理斜体 *文本* 或 _文本_（注意要排除已匹配的加粗）
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      // 6. 处理行内代码 `代码`
      .replace(/`([^`]+)`/g, '<code style="background:var(--ai-chat-code-bg, rgba(0,0,0,0.1));padding:2px 6px;border-radius:4px;font-size:0.9em;">$1</code>')
      // 7. 处理换行
      .replace(/\n/g, '<br>');
  }

  // 获取页面上下文（优化版本）
  function getPageContext() {
    const title = document.title || '';
    
    // 尝试多种选择器获取主要内容
    let mainContent = '';
    const selectors = ['.md-content', 'main', 'article', '.content', '[role="main"]'];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        mainContent = element.innerText || element.textContent || '';
        if (mainContent.trim().length > 100) break; // 找到有足够内容的元素
      }
    }
    
    // 如果还是找不到，尝试获取 body 内容（排除导航、页脚等）
    if (!mainContent || mainContent.trim().length < 100) {
      const body = document.body;
      const nav = body.querySelector('nav');
      const footer = body.querySelector('footer');
      const header = body.querySelector('header');
      
      mainContent = body.innerText || body.textContent || '';
      
      // 移除导航、页脚等干扰内容（简单处理）
      if (nav) mainContent = mainContent.replace(nav.innerText || '', '');
      if (footer) mainContent = mainContent.replace(footer.innerText || '', '');
      if (header) mainContent = mainContent.replace(header.innerText || '', '');
    }
    
    // 清理和截取
    mainContent = mainContent
      .replace(/\s+/g, ' ')  // 合并多个空白字符
      .trim()
      .substring(0, CONFIG.maxContextLength);
    
    return `页面标题: ${title}\n\n页面内容:\n${mainContent}`;
  }

  // 发送消息（流式输出）
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
    
    // 隐藏提示
    togglePrompts(false);

    // 添加用户消息
    addMessage(message, 'user');

    // 创建 AI 回复的消息容器
    const messagesDiv = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai-message-bot';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-message-content';
    contentDiv.innerHTML = '<span class="ai-typing-cursor">|</span>';
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    let fullAnswer = '';

    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      // 构建消息历史
      // 智能判断是否需要包含当前页面上下文
      const isGlobalQuestion = /网站|博客|整体|所有|全部|项目列表|文章列表|有哪些|介绍一下/.test(message);
      
      const messages = [
        { role: 'system', content: CONFIG.systemPrompt }
      ];

      // 添加对话历史（最近5轮）- 放在当前问题之前
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
      
      // 检查上下文长度，如果过长则截断
      const totalLength = messages.reduce((sum, msg) => sum + (msg.content?.length || 0), 0);
      if (totalLength > CONFIG.maxContextLength) {
        // 保留系统提示和最近的消息
        const systemMsg = messages[0];
        const recentMsgs = messages.slice(-4);
        messages.length = 0;
        messages.push(systemMsg, ...recentMsgs);
      }
      
      // 根据问题类型决定是否包含当前页面上下文
      if (!isGlobalQuestion) {
        // 针对具体内容的问题，添加当前页面上下文
        const pageContext = getPageContext();
        messages.push({ 
          role: 'user', 
          content: `【当前页面信息】\n${pageContext}\n\n【用户问题】\n${message}\n\n请基于上述页面内容回答用户问题，回答要准确、有用、具体。` 
        });
      } else {
        // 全局性问题，可以包含页面上下文作为参考，但不强制
        messages.push({ 
          role: 'user', 
          content: `${message}\n\n（当前页面：${document.title || '未知'}，可作为参考，但主要回答网站整体情况）`
        });
      }

      // 调用 API（流式）
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

      // 读取流式响应
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
                contentDiv.innerHTML = parseMarkdown(fullAnswer) + '<span class="ai-typing-cursor">|</span>';
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

      // 移除光标，显示最终结果
      contentDiv.innerHTML = parseMarkdown(fullAnswer);

      // 更新对话历史
      const now = Date.now();
      conversationHistory.push(
        { role: 'user', content: message, timestamp: now },
        { role: 'assistant', content: fullAnswer, timestamp: now }
      );
      
      // 保存到本地存储
      saveHistory();

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
