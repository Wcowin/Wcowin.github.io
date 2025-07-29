/**
 * 智谱清言API翻译系统 - 高性能版本
 * 为MkDocs Material提供高质量、高速度的页面翻译功能
 * 作者: Wcowin
 * 版本: 2.0.0
 */

(function() {
  'use strict';

  // 全局变量
  let isTranslating = false;
  let currentLanguage = 'chinese_simplified';
  let originalTexts = new Map();
  let translationCache = new Map();
  let translationAbortController = null;
  let shouldCancelTranslation = false;
  let globalTranslationPreference = null;
  let pageTranslationStates = new Map();
  let pageTranslationCache = new Map(); // 页面级翻译缓存

  // 从localStorage读取全局翻译偏好
  function loadGlobalTranslationPreference() {
    try {
      const saved = localStorage.getItem('glm_global_translation_preference');
      if (saved && saved !== 'null' && saved !== 'chinese_simplified') {
        globalTranslationPreference = saved;
        console.log(`🌐 已加载全局翻译偏好: ${LANGUAGE_MAP[saved] || saved}`);
        return saved;
      }
      return null;
    } catch (error) {
      console.warn('⚠️ 读取全局翻译偏好失败:', error);
      return null;
    }
  }

  // 保存全局翻译偏好到localStorage
  function saveGlobalTranslationPreference(language) {
    try {
      if (language && language !== 'chinese_simplified') {
        globalTranslationPreference = language;
        localStorage.setItem('glm_global_translation_preference', language);
        console.log(`💾 已保存全局翻译偏好: ${LANGUAGE_MAP[language] || language}`);
        
        // 同步更新当前语言状态
        if (currentLanguage !== language) {
          console.log(`🔄 同步当前语言状态: ${currentLanguage} -> ${language}`);
        }
      } else {
        globalTranslationPreference = null;
        localStorage.removeItem('glm_global_translation_preference');
        console.log('🗑️ 已清除全局翻译偏好');
      }
    } catch (error) {
      console.warn('⚠️ 保存全局翻译偏好失败:', error);
    }
  }

  // 检查全局翻译偏好是否与当前状态一致
  function validateGlobalTranslationState() {
    const savedPreference = localStorage.getItem('glm_global_translation_preference');
    if (savedPreference && savedPreference !== 'null' && savedPreference !== currentLanguage) {
      console.log(`⚠️ 检测到全局翻译偏好不一致: 偏好=${savedPreference}, 当前=${currentLanguage}`);
      return false;
    }
    return true;
  }

  // 同步全局翻译状态
  function syncGlobalTranslationState() {
    const savedPreference = localStorage.getItem('glm_global_translation_preference');
    
    if (savedPreference && savedPreference !== 'null') {
      // 有全局偏好，检查是否需要同步
      if (currentLanguage !== savedPreference) {
        console.log(`🔄 同步全局翻译状态: ${currentLanguage} -> ${savedPreference}`);
        globalTranslationPreference = savedPreference;
        return savedPreference;
      }
    } else {
      // 没有全局偏好，确保变量为null
      if (globalTranslationPreference !== null) {
        console.log('🗑️ 清除内存中的全局翻译偏好');
        globalTranslationPreference = null;
      }
    }
    
    return null;
  }

  // 强制重置翻译状态
  function resetTranslationState() {
    console.log('🔄 强制重置翻译状态');
    
    // 重置所有状态变量
    isTranslating = false;
    shouldCancelTranslation = false;
    currentLanguage = 'chinese_simplified';
    
    // 清除翻译标记
    document.querySelectorAll('[data-translated]').forEach(el => {
      el.removeAttribute('data-translated');
      el.removeAttribute('data-original-text');
      el.removeAttribute('data-target-lang');
    });
    
    // 重新收集原文
    originalTexts.clear();
    collectAndSaveOriginalTexts();
    
    // 同步全局状态
    syncGlobalTranslationState();
    
    console.log('✅ 翻译状态重置完成');
  }

  // 页面翻译缓存管理
  function savePageTranslationCache(pageKey, language, translatedTexts) {
    try {
      const cacheData = {
        language: language,
        translatedTexts: Array.from(translatedTexts.entries()),
        timestamp: Date.now(),
        url: window.location.href
      };
      
      pageTranslationCache.set(pageKey, cacheData);
      
      // 限制内存缓存大小
      if (pageTranslationCache.size > 10) {
        const oldestKey = pageTranslationCache.keys().next().value;
        pageTranslationCache.delete(oldestKey);
        console.log(`🗑️ 清除最旧的页面缓存: ${oldestKey}`);
      }
      
      // 同时保存到localStorage（限制大小）
      const cacheForStorage = {
        language: language,
        timestamp: Date.now(),
        url: window.location.href,
        textCount: translatedTexts.size
      };
      
      localStorage.setItem(`glm_page_cache_${pageKey}`, JSON.stringify(cacheForStorage));
      console.log(`💾 已缓存页面翻译: ${pageKey} (${language}, ${translatedTexts.size}个文本)`);
    } catch (error) {
      console.warn('⚠️ 保存页面翻译缓存失败:', error);
    }
  }

  function loadPageTranslationCache(pageKey) {
    try {
      // 先检查内存缓存
      const memoryCache = pageTranslationCache.get(pageKey);
      if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_MAX_AGE) {
        console.log(`🎯 从内存加载页面翻译缓存: ${pageKey}`);
        return {
          language: memoryCache.language,
          translatedTexts: new Map(memoryCache.translatedTexts),
          timestamp: memoryCache.timestamp
        };
      }
      
      // 检查localStorage缓存
      const storageCache = localStorage.getItem(`glm_page_cache_${pageKey}`);
      if (storageCache) {
        const cacheData = JSON.parse(storageCache);
        if (Date.now() - cacheData.timestamp < CACHE_MAX_AGE) {
          console.log(`📁 检测到页面翻译缓存: ${pageKey} (${cacheData.language})`);
          return {
            language: cacheData.language,
            translatedTexts: null, // localStorage中不保存具体翻译文本
            timestamp: cacheData.timestamp,
            fromStorage: true
          };
        }
      }
      
      return null;
    } catch (error) {
      console.warn('⚠️ 加载页面翻译缓存失败:', error);
      return null;
    }
  }

  function clearPageTranslationCache(pageKey) {
    try {
      pageTranslationCache.delete(pageKey);
      localStorage.removeItem(`glm_page_cache_${pageKey}`);
      console.log(`🗑️ 已清除页面翻译缓存: ${pageKey}`);
    } catch (error) {
      console.warn('⚠️ 清除页面翻译缓存失败:', error);
    }
  }

  // 从缓存恢复页面翻译
  async function restorePageFromCache(pageKey, targetLang) {
    try {
      const cache = loadPageTranslationCache(pageKey);
      if (!cache || cache.language !== targetLang) {
        return false;
      }
      
      // 如果是从localStorage加载的缓存，需要重新翻译
      if (cache.fromStorage) {
        console.log('  检测到页面翻译历史，重新翻译以恢复状态...');
        return await translatePage(targetLang, false);
      }
      
      // 从内存缓存恢复
      if (cache.translatedTexts) {
        console.log(`🎯 从缓存恢复页面翻译: ${pageKey}`);
        
        // 收集当前页面的文本节点
        collectAndSaveOriginalTexts();
        
        let restoredCount = 0;
        const textNodes = collectTextNodes();
        
        textNodes.forEach(node => {
          const originalText = originalTexts.get(node);
          if (originalText && cache.translatedTexts.has(originalText)) {
            const translatedText = cache.translatedTexts.get(originalText);
            node.textContent = translatedText;
            node.parentElement.setAttribute('data-translated', 'true');
            restoredCount++;
          }
        });
        
        currentLanguage = targetLang;
        console.log(`✅ 从缓存恢复翻译: ${restoredCount} 个文本节点`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('💥 从缓存恢复翻译失败:', error);
      return false;
    }
  }

  // 获取配置（优先使用GLM_CONFIG，否则使用默认值）
  function getConfig() {
    if (window.GLM_CONFIG) {
      return window.GLM_CONFIG;
    }
    // 默认配置 - 高速模式
    return {
      performance: {
        cacheMaxAge: 24 * 60 * 60 * 1000,
        maxCacheSize: 2000,
        batchSize: 20,
        maxConcurrent: 8,
        fastMode: true
      },
      api: {
        timeout: 5000,
        maxRetries: 2,
        retryDelay: 500
      }
    };
  }
  
  const config = getConfig();
  const batchConfig = {
    batchSize: config.performance?.batchSize || 20,
    maxConcurrent: config.performance?.maxConcurrent || 8,
    timeout: config.api?.timeout || 5000
  };
  
  const CACHE_MAX_AGE = config.performance?.cacheMaxAge || 24 * 60 * 60 * 1000;
  const MAX_CACHE_SIZE = config.performance?.maxCacheSize || 2000;
  const BATCH_SIZE = batchConfig.batchSize;
  const MAX_CONCURRENT = batchConfig.maxConcurrent;
  const REQUEST_TIMEOUT = batchConfig.timeout;
  const RETRY_ATTEMPTS = config.api?.maxRetries || 2;
  const RETRY_DELAY = config.api?.retryDelay || 500;

  // 语言映射（优先使用配置中的映射）
  function getLanguageMap() {
    if (config.languages?.mapping) {
      return config.languages.mapping;
    }
    return {
      'chinese_simplified': '简体中文',
      'chinese_traditional': '繁体中文', 
      'english': 'English',
      'korean': '한국어',
      'japanese': '日本語',
      'arabic': 'العربية',
      'deutsch': 'Deutsch',
      'french': 'Français',
      'spanish': 'Español',
      'portuguese': 'Português'
    };
  }
  
  const LANGUAGE_MAP = getLanguageMap();

  // 双API密钥配置 - 协同翻译系统
  const API_KEYS = {
    primary: 'cec9c14ba1f44daa8b7d578790fb81ec.eVyBp1Zo66NHgl4p',
    secondary: '46ad7781e9fa44cb9b31d11a9696da89.GCUpkep25U5Y6vBg' // 第二个API密钥用于协同翻译
  };

  // API状态监控
  const API_STATUS = {
    primary: { available: true, lastError: null, requestCount: 0 },
    secondary: { available: true, lastError: null, requestCount: 0 }
  };

  // 获取API密钥（支持双API协同翻译）
  function getApiKey(apiIndex = 0) {
    // 优先从GLM_TRANSLATE_CONFIG获取
    if (window.GLM_TRANSLATE_CONFIG && typeof window.GLM_TRANSLATE_CONFIG.getApiKey === 'function') {
      const key = window.GLM_TRANSLATE_CONFIG.getApiKey();
      if (key && key !== 'placeholder') {
        return key;
      }
    }
    
    // 根据索引返回对应的API密钥
    const apiType = apiIndex === 0 ? 'primary' : 'secondary';
    const apiKey = API_KEYS[apiType];
    
    if (!apiKey) {
      console.error(`❌ 未找到智谱清言API密钥 (索引: ${apiIndex}, 类型: ${apiType})`);
      API_STATUS[apiType].available = false;
      return null;
    }
    
    // 记录API使用
    API_STATUS[apiType].requestCount++;
    console.log(`🔑 使用 ${apiType} API密钥 (请求计数: ${API_STATUS[apiType].requestCount})`);
    
    return apiKey;
  }

  // 简化的文本检测 - 优先翻译包含中文的内容
  function shouldTranslateText(text, element = null) {
    if (!text || typeof text !== 'string') return false;
    
    const trimmedText = text.trim();
    
    // 基本长度检查
    if (trimmedText.length === 0 || trimmedText.length < 2) return false;
    
    // 首先使用GLM_CONFIG的shouldTranslateText进行元素检查
    if (element && window.GLM_CONFIG && window.GLM_CONFIG.shouldTranslateText) {
      if (!window.GLM_CONFIG.shouldTranslateText(element, trimmedText)) {
        console.log(`⏭️ GLM_CONFIG元素检查跳过: ${element.tagName}, 文本: ${trimmedText.slice(0, 30)}...`);
        return false;
      }
    }
    
    // 检查是否包含中文字符
    const hasChinese = /[\u4e00-\u9fff]/.test(trimmedText);
    
    // 特别处理导航栏和列表元素，优先确保其能够被翻译
    if (element && element.tagName && hasChinese) {
      const tagName = element.tagName.toLowerCase();
      
      // 对于li元素，只要包含中文就应该翻译
      if (tagName === 'li') {
        console.log('✅ li元素包含中文，应该翻译:', trimmedText.slice(0, 30) + '...');
        return true;
      }
      
      // 对于导航栏相关元素，只要包含中文就应该翻译
      if (element.classList?.contains('md-ellipsis') ||
          element.closest('.md-tabs') ||
          element.closest('.md-nav') ||
          element.closest('.md-tabs__link') ||
          element.closest('.md-nav__link') ||
          element.closest('.md-nav__item') ||
          element.closest('.md-sidebar') ||
          (tagName === 'a' && element.closest('.md-tabs')) ||
          (tagName === 'span' && element.closest('.md-tabs'))) {
        console.log('✅ 导航栏元素包含中文，应该翻译:', trimmedText.slice(0, 30) + '...');
        return true;
      }
      
      // 对于标题和内容区域的元素
      if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || 
          tagName === 'h4' || tagName === 'h5' || tagName === 'h6' ||
          tagName === 'p' || tagName === 'div' || tagName === 'span') {
        console.log('✅ 内容元素包含中文，应该翻译:', trimmedText.slice(0, 30) + '...');
        return true;
      }
    }
    
    // 对于包含中文的文本，优先考虑翻译
    if (hasChinese) {
      // 使用GLM_CONFIG的跳过检查（但对中文内容更宽松）
      if (window.GLM_CONFIG && window.GLM_CONFIG.shouldSkipTranslation) {
        if (window.GLM_CONFIG.shouldSkipTranslation(trimmedText)) {
          console.log('⚠️ GLM_CONFIG建议跳过含中文文本:', trimmedText.slice(0, 30) + '...');
          return false;
        }
      }
      
      // 包含中文的文本，默认应该翻译
      console.log('✅ 包含中文，应该翻译:', trimmedText.slice(0, 30) + '...');
      return true;
    }
    
    // 对于不包含中文的文本，应用严格的跳过规则
    if (window.GLM_CONFIG && window.GLM_CONFIG.shouldSkipTranslation) {
      if (window.GLM_CONFIG.shouldSkipTranslation(trimmedText)) {
        return false;
      }
    }
    
    // 跳过纯占位符格式的文本
    if (/^[{}\[\]$_\s]+$/.test(trimmedText)) return false;
    
    // 跳过明显的占位符文本
    if (/^\{.*\}$/.test(trimmedText) || 
        /^\[\[.*\]\]$/.test(trimmedText) || 
        /^\$\{.*\}$/.test(trimmedText) ||
        /^__[A-Z_]+__$/.test(trimmedText)) {
      return false;
    }
    
    return true;
  }

  // 简化缓存管理

  // 生成缓存键
  function getCacheKey(text, targetLang) {
    if (window.GLM_CONFIG && window.GLM_CONFIG.generateCacheKey) {
      return window.GLM_CONFIG.generateCacheKey(text, targetLang);
    }
    return `${text.slice(0, 50)}_${targetLang}`;
  }

  // 简化缓存管理
  function getFromCache(text, targetLang) {
    const config = getConfig();
    if (!config.performance?.cacheEnabled) return null;
    
    const key = getCacheKey(text, targetLang);
    const cached = translationCache.get(key);
    
    if (cached && Date.now() - cached.timestamp < CACHE_MAX_AGE) {
      // 更新访问时间和使用次数
      cached.lastAccess = Date.now();
      cached.usage = (cached.usage || 0) + 1;
      console.log('⚡ 本地缓存命中');
      return { translation: cached.result, source: 'cache' };
    }
    
    if (cached) {
      translationCache.delete(key);
    }
    
    return null;
  }

  function setCache(text, targetLang, result) {
    const config = getConfig();
    if (!config.performance?.cacheEnabled) return;
    
    const key = getCacheKey(text, targetLang);
    
    // 简化缓存清理
    if (translationCache.size >= MAX_CACHE_SIZE) {
      cleanupCache();
    }
    
    const cacheEntry = {
      result: result,
      timestamp: Date.now(),
      lastAccess: Date.now(),
      usage: 1,
      textLength: text.length
    };
    
    translationCache.set(key, cacheEntry);
  }

  // 简化缓存清理
  function cleanupCache() {
    const entries = Array.from(translationCache.entries());
    
    // 按使用频率和最近访问时间排序
    entries.sort((a, b) => {
      const scoreA = (a[1].usage || 1) * (1 / (Date.now() - a[1].lastAccess));
      const scoreB = (b[1].usage || 1) * (1 / (Date.now() - b[1].lastAccess));
      return scoreB - scoreA;
    });
    
    // 保留前70%的缓存
    const keepCount = Math.floor(entries.length * 0.7);
    translationCache.clear();
    
    for (let i = 0; i < keepCount; i++) {
      translationCache.set(entries[i][0], entries[i][1]);
    }
    
    console.log(`🧹 缓存清理完成，保留 ${keepCount}/${entries.length} 个条目`);
  }



  // 智能提示词生成 - 使用增强配置
  function generatePrompt(text, targetLang, context = 'content') {
    // 使用GLM_CONFIG的增强提示词生成功能
    if (window.GLM_CONFIG && window.GLM_CONFIG.generatePrompt) {
      return window.GLM_CONFIG.generatePrompt(text, targetLang, context);
    }
    
    // 降级到简单版本
    const isEnglish = targetLang === 'english';
    const isShort = text.length < 30;
    
    if (isEnglish) {
      if (isShort) return `Translate to English: ${text}`;
      return `Please translate the following Chinese text to English:\n${text}`;
    } else {
      const targetLanguage = LANGUAGE_MAP[targetLang] || targetLang;
      if (isShort) return `翻译为${targetLanguage}：${text}`;
      return `请将以下文本翻译为${targetLanguage}：\n${text}`;
    }
  }

  // 连接池管理
  const connectionPool = {
    activeConnections: 0,
    maxConnections: config.api?.maxConnections || 10,
    waitingQueue: [],
    
    async acquire() {
      if (this.activeConnections < this.maxConnections) {
        this.activeConnections++;
        return Promise.resolve();
      }
      
      return new Promise(resolve => {
        this.waitingQueue.push(resolve);
      });
    },
    
    release() {
      this.activeConnections--;
      if (this.waitingQueue.length > 0) {
        const next = this.waitingQueue.shift();
        this.activeConnections++;
        next();
      }
    }
  };

  // 文本预处理函数 - 智能保护技术术语
  function preprocessText(text) {
    if (!text || typeof text !== 'string') return { text, protectedTexts: [], complexity: 'low' };
    
    // 获取用户自定义不翻译词汇列表
    const userCustomNoTranslate = (window.GLM_CONFIG && window.GLM_CONFIG.detection && window.GLM_CONFIG.detection.userCustomNoTranslate) || [];
    
    // 扩展的技术术语列表（与shouldSkipTranslation保持一致）
    const technicalTerms = [
      'GitHub', 'MkDocs', 'Front Matter', 'API', 'URL', 'HTML', 'CSS', 'JavaScript',
      'Git', 'Node.js', 'npm', 'yarn', 'pnpm', 'React', 'Vue', 'Angular',
      'TypeScript', 'JSON', 'XML', 'YAML', 'Markdown', 'SQL', 'NoSQL',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'DevOps',
      'REST', 'GraphQL', 'OAuth', 'JWT', 'HTTPS', 'SSH', 'FTP', 'HTTP',
      'Priority Order', 'Cache', 'Redis', 'MongoDB', 'MySQL', 'PostgreSQL'
    ];
    
    let processedText = text;
    const protectedTexts = [];
    let protectedIndex = 0;
    
    // 保护用户自定义不翻译词汇
    userCustomNoTranslate.forEach((word) => {
      if (word && word.trim()) {
        const placeholder = `PROTECTED_CUSTOM_${protectedIndex++}`;
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        processedText = processedText.replace(regex, (match) => {
          protectedTexts.push({ placeholder, original: match });
          return placeholder;
        });
      }
    });
    
    // 保护技术术语（只在混合内容中保护）
    const hasChinese = /[\u4e00-\u9fff]/.test(text);
    if (hasChinese) {
      technicalTerms.forEach((term) => {
        const placeholder = `PROTECTED_TECH_${protectedIndex++}`;
        // 使用更精确的匹配，避免过度保护
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        processedText = processedText.replace(regex, (match) => {
          protectedTexts.push({ placeholder, original: match });
          console.log(`🛡️ 保护技术术语: ${match}`);
          return placeholder;
        });
      });
      
      // 保护常见的技术格式
      const technicalPatterns = [
        { pattern: /\b[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}\b/g, type: 'domain' }, // 域名
        { pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)/g, type: 'function' }, // 函数调用
        { pattern: /\b\w+@\w+\.\w+\b/g, type: 'email' }, // 邮箱
        { pattern: /\bhttps?:\/\/[^\s]+\b/g, type: 'url' }, // URL
        { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' }, // 变量
        { pattern: /#[a-fA-F0-9]{3,8}\b/g, type: 'color' }, // 颜色代码
        { pattern: /\d+(\.\d+)?(px|em|rem|%|vh|vw)\b/g, type: 'css_unit' } // CSS单位
      ];
      
      technicalPatterns.forEach(({ pattern, type }) => {
        processedText = processedText.replace(pattern, (match) => {
          const placeholder = `PROTECTED_${type.toUpperCase()}_${protectedIndex++}`;
          protectedTexts.push({ placeholder, original: match });
          console.log(`🛡️ 保护${type}: ${match}`);
          return placeholder;
        });
      });
    }
    
    // 使用专门的占位符清理函数
    const cleanedText = cleanPlaceholders(processedText);
    
    // 验证清理后的文本是否为空或过短
    if (!cleanedText || cleanedText.length < 2) {
      console.warn('⚠️ 文本预处理后内容过短或为空，跳过翻译:', text);
      return { text: '', protectedTexts: [], complexity: 'low', originalLength: text.length };
    }
    
    // 评估文本复杂度
    let complexity = 'low';
    if (protectedTexts.length > 3) complexity = 'medium';
    if (protectedTexts.length > 6 || text.length > 200) complexity = 'high';
    
    return { 
      text: cleanedText, 
      protectedTexts, 
      complexity, 
      originalLength: text.length 
    };
  }
  
  // 占位符检测和清理函数
  function cleanPlaceholders(text) {
    if (!text || typeof text !== 'string') return text;
    
    let cleanedText = text;
    
    // 移除各种占位符格式
    cleanedText = cleanedText.replace(/\{[^}]*\}/g, ''); // {placeholder}
    cleanedText = cleanedText.replace(/__[A-Z_]+__/g, ''); // __PLACEHOLDER__
    cleanedText = cleanedText.replace(/\[\[.*?\]\]/g, ''); // [[placeholder]]
    cleanedText = cleanedText.replace(/\$\{.*?\}/g, ''); // ${placeholder}
    cleanedText = cleanedText.replace(/<%.*?%>/g, ''); // <%placeholder%>
    cleanedText = cleanedText.replace(/\{\{.*?\}\}/g, ''); // {{placeholder}}
    
    // 清理多余的空白字符
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
    
    return cleanedText;
  }
  
  // 文本后处理函数 - 恢复用户自定义不翻译词汇
  function postprocessText(translatedText, protectedTexts) {
    if (!translatedText) return translatedText;
    
    let result = translatedText;
    
    // 恢复保护的词汇
    protectedTexts.forEach(({ placeholder, original }) => {
      result = result.replace(new RegExp(placeholder, 'g'), original);
    });
    
    // 基本的空格清理
    return result.replace(/\s+/g, ' ').trim();
  }

  // 调用智谱清言API进行翻译 - 增强版本（支持双API和代码注释）
  async function translateWithGLM(text, targetLang, retryCount = 0, apiIndex = 0) {
    const startTime = Date.now();
    const apiKey = getApiKey(apiIndex);
    if (!apiKey) {
      throw new Error(`API密钥未配置 (索引: ${apiIndex})`);
    }

    // 检查是否为代码注释，需要特殊处理
    let isCodeComment = false;
    let commentInfo = null;
    if (window.GLM_CONFIG && window.GLM_CONFIG.isCodeComment && window.GLM_CONFIG.extractCommentText) {
      isCodeComment = window.GLM_CONFIG.isCodeComment(text);
      if (isCodeComment) {
        commentInfo = window.GLM_CONFIG.extractCommentText(text);
        console.log('🔧 检测到代码注释，进行特殊处理:', commentInfo);
      }
    }

    // 对于代码注释，只翻译注释内容，保持代码格式
    let textToTranslate = text;
    if (isCodeComment && commentInfo) {
      textToTranslate = commentInfo.commentContent;
      console.log('📝 提取注释内容进行翻译:', textToTranslate);
    }

    // 增强文本预处理
    const { text: processedText, protectedTexts, complexity, originalLength } = preprocessText(textToTranslate);

    // 检查缓存（包括翻译记忆）
    const cacheKey = isCodeComment ? `comment_${processedText}` : processedText;
    const cached = getFromCache(cacheKey, targetLang);
    if (cached) {
      let result = postprocessText(cached.translation, protectedTexts);
      
      // 如果是代码注释，需要恢复原始格式
      if (isCodeComment && commentInfo) {
        result = commentInfo.replacement.replace('$1', result);
      }
      
      console.log(`${cached.source === 'memory' ? '🧠' : '⚡'} ${cached.source === 'memory' ? '翻译记忆' : '缓存'}命中: ${text.slice(0, 30)}...`);
      
      // 记录性能
      if (window.GLM_CONFIG && window.GLM_CONFIG.trackPerformance) {
        window.GLM_CONFIG.trackPerformance('cache_hit', Date.now() - startTime, true);
      }
      
      return result;
    }

    // 获取连接
    await connectionPool.acquire();
    
    try {
      // 使用配置中的提示词模板
      let prompt;
      
      // 检测文本上下文类型
      let context = 'content';
      if (window.GLM_CONFIG && window.GLM_CONFIG.isNavigationText) {
        context = window.GLM_CONFIG.isNavigationText(processedText) ? 'navigation' : 'content';
      }
      
      if (config.prompts?.translation) {
        prompt = config.prompts.translation
          .replace('{targetLang}', LANGUAGE_MAP[targetLang] || targetLang)
          .replace('{text}', processedText);
      } else if (window.GLM_CONFIG && window.GLM_CONFIG.generatePrompt) {
        prompt = window.GLM_CONFIG.generatePrompt(processedText, targetLang, context);
      } else {
        prompt = generatePrompt(processedText, targetLang, context);
      }
      
      // 使用优化的API参数
      const apiParams = config.performance?.fastMode && config.getFastModeParams ? 
                       config.getFastModeParams(processedText.length) : 
                       config.getOptimalParams ? config.getOptimalParams(processedText.length) : {
                         temperature: config.quality?.temperature || 0.1,
                         max_tokens: Math.min(Math.max(Math.floor(processedText.length * 2.0), 30), 1000),
                         top_p: config.quality?.topP || 0.85,
                         frequency_penalty: config.quality?.frequencyPenalty || 0.05,
                         presence_penalty: config.quality?.presencePenalty || 0.05
                       };
      
      const requestBody = {
        model: config.api?.model || 'glm-4-flash',
        messages: [
          {
            role: 'system',
            content: config.prompts?.system || '你是一个专业的翻译助手，请提供准确、自然、流畅的翻译。保持原文的语气和风格，确保翻译质量。只返回翻译结果，不要添加任何解释或额外内容。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        ...apiParams
      };

      const controller = new AbortController();
      translationAbortController = controller;
      
      // 自适应超时
      const adaptiveTimeout = window.GLM_CONFIG && window.GLM_CONFIG.getAdaptiveTimeout ? 
                             window.GLM_CONFIG.getAdaptiveTimeout(originalLength, complexity) : 
                             REQUEST_TIMEOUT;
      
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, adaptiveTimeout);

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Connection': config.api?.keepAlive ? 'keep-alive' : 'close',
          'Keep-Alive': config.api?.keepAlive ? 'timeout=30, max=100' : undefined
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('API响应格式错误');
      }

      const translatedText = data.choices[0].message.content.trim();
      
      // 检查API返回的内容是否包含占位符错误信息
      if (translatedText.toLowerCase().includes('placeholder') || 
          translatedText.toLowerCase().includes('占位符') ||
          translatedText.includes('need to be replaced') ||
          translatedText.includes('需要替换')) {
        console.warn('⚠️ API返回占位符相关错误，尝试清理文本后重试');
        
        // 如果是第一次遇到这个错误，尝试用原始文本重新翻译
        if (retryCount === 0) {
          return translateWithGLM(text.replace(/[{}\[\]$_]/g, ''), targetLang, retryCount + 1);
        } else {
          // 如果重试仍然失败，返回原文
          console.error('❌ 多次尝试后仍然出现占位符错误，返回原文');
          return text;
        }
      }
      
      // 简化缓存策略
      const cacheKey = isCodeComment ? `comment_${processedText}` : processedText;
      setCache(cacheKey, targetLang, translatedText);
      
      // 文本后处理
      let finalText = postprocessText(translatedText, protectedTexts);
      
      // 如果是代码注释，需要恢复原始格式
      if (isCodeComment && commentInfo) {
        finalText = commentInfo.replacement.replace('$1', finalText);
        console.log('🔧 代码注释格式化完成:', finalText);
      }
      
      // 记录性能
      const duration = Date.now() - startTime;
      
      console.log(`⚡ 翻译完成 (${duration}ms): ${text.slice(0, 20)}... -> ${finalText.slice(0, 20)}...`);
      return finalText;

    } catch (error) {
      const duration = Date.now() - startTime;
      
      // 记录失败
      
      if (error.name === 'AbortError') {
        console.log('🛑 翻译请求被中断');
        throw new Error('翻译被中断');
      }
      
      console.error(`❌ 翻译失败 (尝试 ${retryCount + 1}/${RETRY_ATTEMPTS}, ${duration}ms):`, error);
      
      // 智能重试逻辑
      if (retryCount < RETRY_ATTEMPTS - 1) {
        const retryDelay = RETRY_DELAY * Math.pow(2, retryCount); // 指数退避
        console.log(`🔄 ${retryDelay}ms后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return translateWithGLM(text, targetLang, retryCount + 1, apiIndex);
      }
      
      throw error;
    } finally {
      // 释放连接
      connectionPool.release();
    }
  }

  // 批量翻译处理 - 双API协同版本
  async function translateBatch(textNodes, targetLang) {
    const batchStartTime = Date.now();
    
    // 双API协同：将文本节点分为前半部分和后半部分
    const midPoint = Math.ceil(textNodes.length / 2);
    const firstHalf = textNodes.slice(0, midPoint);
    const secondHalf = textNodes.slice(midPoint);
    
    console.log(`🔄 双API协同翻译启动:`);
    console.log(`   API-1 负责前半部分: ${firstHalf.length} 个文本`);
    console.log(`   API-2 负责后半部分: ${secondHalf.length} 个文本`);
    
    // 为每个API创建独立的批次
    const firstHalfBatches = [];
    const secondHalfBatches = [];
    
    for (let i = 0; i < firstHalf.length; i += BATCH_SIZE) {
      firstHalfBatches.push(firstHalf.slice(i, i + BATCH_SIZE));
    }
    
    for (let i = 0; i < secondHalf.length; i += BATCH_SIZE) {
      secondHalfBatches.push(secondHalf.slice(i, i + BATCH_SIZE));
    }

    let completedCount = 0;
    let successCount = 0;
    let cacheHitCount = 0;
    const totalCount = textNodes.length;
    const translatedTexts = new Map(); // 用于页面缓存
    
    // 显示翻译开始状态
    ProgressManager.showStart(totalCount, targetLang);

    // 创建处理单个文本的函数（支持API索引）
    const processSingleText = async (node, apiIndex = 0) => {
      const textStartTime = Date.now();
      try {
        const originalText = originalTexts.get(node);
        if (!originalText || !shouldTranslateText(originalText, node.parentElement)) {
          completedCount++;
          return;
        }

        console.log(`🚀 智能翻译: ${originalText.slice(0, 30)}...`);
        
        // 预先检查文本是否包含占位符
        const cleanedOriginalText = cleanPlaceholders(originalText);
        if (!cleanedOriginalText || cleanedOriginalText.length < 2) {
          console.warn('⚠️ 文本包含过多占位符或清理后为空，跳过翻译:', originalText);
          completedCount++;
          return;
        }
        
        // 检查是否有缓存（包括翻译记忆）
        const cached = getFromCache(cleanedOriginalText, targetLang);
        let translatedText;
        let fromCache = false;
        
        if (cached) {
          translatedText = cached.translation;
          fromCache = true;
          cacheHitCount++;
          const cacheType = cached.source === 'memory' ? 'memoryHit' : 'cacheHit';
          console.log(`${cached.source === 'memory' ? '🧠' : '⚡'} ${getLocalizedMessage(cacheType, targetLang)}: ${originalText.slice(0, 20)}...`);
        } else {
          // 使用清理后的文本进行翻译（指定API索引）
          translatedText = await translateWithGLM(cleanedOriginalText, targetLang, 0, apiIndex);
          console.log(`🔧 API-${apiIndex + 1} 翻译: ${originalText.slice(0, 20)}...`);
        }
        
        if (!shouldCancelTranslation && node.parentNode) {
          node.textContent = translatedText;
          const parent = node.parentElement;
          if (parent) {
            parent.setAttribute('data-translated', 'true');
            parent.setAttribute('data-original-text', originalText);
            parent.setAttribute('data-target-lang', targetLang);
            parent.setAttribute('data-translation-source', fromCache ? 'cache' : 'api');
          }
          
          // 保存到翻译映射中用于缓存
          translatedTexts.set(originalText, translatedText);
        }
        
        completedCount++;
        successCount++;
        
        // 更新进度（使用新的进度管理器）
        const currentCacheRate = completedCount > 0 ? (cacheHitCount / completedCount) * 100 : 0;
        const currentSpeed = (Date.now() - batchStartTime) > 0 ? completedCount / ((Date.now() - batchStartTime) / 1000) : 0;
        ProgressManager.updateProgress(completedCount, totalCount, currentCacheRate, currentSpeed, targetLang);
        
        // 记录单个文本翻译完成
        
      } catch (error) {
        console.error('❌ 单个文本翻译失败:', error);
        completedCount++;
        
        // 记录失败
      }
    };

    // 创建双API处理器
    const processApiGroup = async (batches, apiIndex) => {
      const apiName = `API-${apiIndex + 1}`;
      console.log(`🚀 ${apiName} 开始处理 ${batches.length} 个批次`);
      
      for (const batch of batches) {
        if (shouldCancelTranslation) break;
        
        // 并行处理当前批次中的文本
        const batchPromises = batch.map(node => {
          if (shouldCancelTranslation) return Promise.resolve();
          return processSingleText(node, apiIndex);
        });
        
        // 等待当前批次完成
        await Promise.allSettled(batchPromises);
      }
      
      console.log(`✅ ${apiName} 处理完成`);
    };

    // 启动双API协同处理
    const apiProcessors = [
      processApiGroup(firstHalfBatches, 0), // API-1 处理前半部分
      processApiGroup(secondHalfBatches, 1)  // API-2 处理后半部分
    ];

    // 等待两个API处理器完成
    await Promise.allSettled(apiProcessors);
    
    console.log(`🎯 双API协同翻译完成`);

    // 计算统计信息
    const batchDuration = Date.now() - batchStartTime;
    const cacheHitRate = totalCount > 0 ? (cacheHitCount / totalCount) * 100 : 0;
    
    console.log(`📊 双API协同翻译统计:`);
    console.log(`   总耗时: ${batchDuration}ms`);
    console.log(`   成功率: ${Math.round((successCount / totalCount) * 100)}%`);
    console.log(`   缓存命中率: ${Math.round(cacheHitRate)}%`);
    console.log(`   翻译速度: ${Math.round(totalCount / (batchDuration / 1000))} 文本/秒`);
    console.log(`   API-1 处理: ${firstHalf.length} 个文本`);
    console.log(`   API-2 处理: ${secondHalf.length} 个文本`);
    console.log(`   协同效率: 理论提升 ${Math.round((2 * Math.min(firstHalf.length, secondHalf.length) / totalCount) * 100)}%`);

    // 保存页面翻译缓存
    if (translatedTexts.size > 0) {
      const pageKey = getCurrentPageKey();
      savePageTranslationCache(pageKey, targetLang, translatedTexts);
      console.log(`💾 已保存页面翻译缓存: ${translatedTexts.size} 个文本`);
    }

    // 批量翻译完成
    
    // 显示翻译完成状态
    ProgressManager.showComplete(completedCount, batchDuration, cacheHitRate, targetLang);

    return completedCount;
  }

  // 收集页面文本节点
  function collectTextNodes() {
    const textNodes = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // 跳过脚本、样式等标签
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          // 使用配置中的跳过标签列表
          const skipTags = window.GLM_CONFIG?.detection?.skipTags || ['script', 'style', 'noscript', 'code', 'pre', 'kbd', 'samp', 'var'];
          if (skipTags.includes(tagName)) {
            console.log(`⏭️ 跳过标签: ${tagName}`);
            return NodeFilter.FILTER_REJECT;
          }
          
          // 使用GLM_CONFIG的shouldTranslateText进行元素检查
          const text = node.textContent.trim();
          if (text.length === 0) return NodeFilter.FILTER_REJECT;
          
          // 检查是否包含中文
          const hasChinese = /[\u4e00-\u9fff]/.test(text);
          
          // 对于包含中文的导航栏和UI元素，优先收集
          if (hasChinese && parent.classList) {
            // 导航栏相关元素
            if (parent.classList.contains('md-ellipsis') ||
                parent.closest('.md-tabs') ||
                parent.closest('.md-nav') ||
                parent.closest('.md-tabs__link') ||
                parent.closest('.md-nav__link') ||
                parent.closest('.md-nav__item') ||
                parent.closest('.md-sidebar') ||
                tagName === 'li') {
              console.log(`✅ 优先收集导航栏/目录元素: ${tagName}, 文本: ${text.slice(0, 30)}...`);
              return NodeFilter.FILTER_ACCEPT;
            }
          }
          
          // 调用GLM_CONFIG的shouldTranslateText进行检查（但不阻止导航栏元素）
          if (window.GLM_CONFIG && window.GLM_CONFIG.shouldTranslateText) {
            if (!window.GLM_CONFIG.shouldTranslateText(parent, text)) {
              // 如果是包含中文的导航栏元素，仍然允许收集
              if (hasChinese && (parent.classList?.contains('md-ellipsis') ||
                                parent.closest('.md-tabs') ||
                                parent.closest('.md-nav') ||
                                tagName === 'li')) {
                console.log(`🔄 GLM_CONFIG建议跳过但强制收集导航栏元素: ${tagName}, 文本: ${text.slice(0, 30)}...`);
                return NodeFilter.FILTER_ACCEPT;
              }
              console.log(`⏭️ GLM_CONFIG跳过元素: ${tagName}, 文本: ${text.slice(0, 30)}...`);
              return NodeFilter.FILTER_REJECT;
            }
          }
          
          // 跳过翻译选择框按钮文字和主页标题
          let element = parent;
          while (element) {
            // 检查是否是语言选择相关的元素
            if (element.classList?.contains('md-header__option') ||
                element.classList?.contains('md-select') ||
                element.closest('.md-header__option') ||
                element.closest('.md-select') ||
                element.closest('.md-source')) {
              console.log(`⏭️ 跳过语言选择相关元素: ${element.className}`);
              return NodeFilter.FILTER_REJECT;
            }
            
            // 检查是否是主页标题相关的元素（防止Wcowin和A college student被翻译）
            if (element.classList?.contains('wcowin-header-title') ||
                element.classList?.contains('wcowin-header-subtitle') ||
                element.classList?.contains('wcowin-header-subtitle-inner') ||
                element.closest('.wcowin-header-title') ||
                element.closest('.wcowin-header-subtitle') ||
                element.closest('.wcowin-header-subtitle-inner')) {
              console.log(`⏭️ 跳过主页标题相关元素: ${element.className}`);
              return NodeFilter.FILTER_REJECT;
            }
            
            element = element.parentElement;
          }
          
          // 特别检查导航栏元素，确保它们能被翻译
          if (parent.classList?.contains('md-ellipsis') || 
              parent.closest('.md-tabs') ||
              parent.closest('.md-nav')) {
            console.log(`🔍 发现导航栏元素: ${parent.className}, 文本: ${text.slice(0, 30)}...`);
            // 导航栏元素应该被翻译，继续处理
          }
          
          // 特别处理li元素，确保其文本能够被翻译
          if (parent.tagName.toLowerCase() === 'li') {
            console.log('🔍 发现li元素文本:', text.slice(0, 50) + '...');
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (shouldTranslateText(text, node.parentElement)) {
        textNodes.push(node);
        // 确保保存当前的文本作为原文（此时应该是中文原文）
        if (!originalTexts.has(node)) {
          originalTexts.set(node, text);
        }
      }
    }

    return textNodes;
  }

  // 获取语言图标
  function getLanguageIcon(language) {
    const icons = {
      'chinese_simplified': '🇨🇳',
      'english': '🇺🇸',
      'japanese': '🇯🇵',
      'korean': '🇰🇷',
      'french': '🇫🇷',
      'spanish': '🇪🇸',
      'german': '🇩🇪'
    };
    return icons[language] || '🌐';
  }

  // 消息通知的多语言文本 - 增强版本
  const NOTIFICATION_TEXTS = {
    chinese_simplified: {
      collecting: '正在收集文本...',
      translating: '开始翻译 {count} 个文本...',
      completed: '翻译完成！已翻译 {count} 个文本',
      restored: '已恢复中文',
      noText: '没有找到需要翻译的文本',
      unsupportedLang: '不支持的语言',
      currentLang: '当前已是{language}',
      failed: '翻译失败，请重试',
      restoreFailed: '恢复失败，请重试',
      qualityCheck: '正在进行质量检测...',
      cacheHit: '使用缓存翻译',
      memoryHit: '使用翻译记忆',
      processing: '正在处理...',
      optimizing: '正在优化翻译质量...'
    },
    english: {
      collecting: 'Collecting text...',
      translating: 'Starting translation of {count} texts...',
      completed: 'Translation completed! {count} texts translated',
      restored: 'Restored to Chinese',
      noText: 'No text found for translation',
      unsupportedLang: 'Unsupported language',
      currentLang: 'Already in {language}',
      failed: 'Translation failed, please try again',
      restoreFailed: 'Restore failed, please try again',
      qualityCheck: 'Performing quality check...',
      cacheHit: 'Using cached translation',
      memoryHit: 'Using translation memory',
      processing: 'Processing...',
      optimizing: 'Optimizing translation quality...'
    },
    japanese: {
      collecting: 'テキストを収集中...',
      translating: '{count}個のテキストの翻訳を開始...',
      completed: '翻訳完了！{count}個のテキストを翻訳しました',
      restored: '中国語に復元しました',
      noText: '翻訳するテキストが見つかりません',
      unsupportedLang: 'サポートされていない言語',
      currentLang: '既に{language}です',
      failed: '翻訳に失敗しました。再試行してください',
      restoreFailed: '復元に失敗しました。再試行してください',
      qualityCheck: '品質チェック中...',
      cacheHit: 'キャッシュ翻訳を使用',
      memoryHit: '翻訳メモリを使用',
      processing: '処理中...',
      optimizing: '翻訳品質を最適化中...'
    },
    korean: {
      collecting: '텍스트 수집 중...',
      translating: '{count}개 텍스트 번역 시작...',
      completed: '번역 완료! {count}개 텍스트 번역됨',
      restored: '중국어로 복원됨',
      noText: '번역할 텍스트를 찾을 수 없음',
      unsupportedLang: '지원되지 않는 언어',
      currentLang: '이미 {language}입니다',
      failed: '번역 실패, 다시 시도해주세요',
      restoreFailed: '복원 실패, 다시 시도해주세요',
      qualityCheck: '품질 검사 중...',
      cacheHit: '캐시 번역 사용',
      memoryHit: '번역 메모리 사용',
      processing: '처리 중...',
      optimizing: '번역 품질 최적화 중...'
    },
    french: {
      collecting: 'Collecte du texte...',
      translating: 'Début de la traduction de {count} textes...',
      completed: 'Traduction terminée ! {count} textes traduits',
      restored: 'Restauré en chinois',
      noText: 'Aucun texte trouvé pour la traduction',
      unsupportedLang: 'Langue non supportée',
      currentLang: 'Déjà en {language}',
      failed: 'Échec de la traduction, veuillez réessayer',
      restoreFailed: 'Échec de la restauration, veuillez réessayer',
      qualityCheck: 'Vérification de la qualité...',
      cacheHit: 'Utilisation de la traduction en cache',
      memoryHit: 'Utilisation de la mémoire de traduction',
      processing: 'Traitement en cours...',
      optimizing: 'Optimisation de la qualité de traduction...'
    },
    spanish: {
      collecting: 'Recopilando texto...',
      translating: 'Iniciando traducción de {count} textos...',
      completed: '¡Traducción completada! {count} textos traducidos',
      restored: 'Restaurado al chino',
      noText: 'No se encontró texto para traducir',
      unsupportedLang: 'Idioma no soportado',
      currentLang: 'Ya está en {language}',
      failed: 'Falló la traducción, por favor reintente',
      restoreFailed: 'Falló la restauración, por favor reintente',
      qualityCheck: 'Verificando calidad...',
      cacheHit: 'Usando traducción en caché',
      memoryHit: 'Usando memoria de traducción',
      processing: 'Procesando...',
      optimizing: 'Optimizando calidad de traducción...'
    },
    german: {
      collecting: 'Text sammeln...',
      translating: 'Übersetzung von {count} Texten beginnen...',
      completed: 'Übersetzung abgeschlossen! {count} Texte übersetzt',
      restored: 'Auf Chinesisch wiederhergestellt',
      noText: 'Kein Text für Übersetzung gefunden',
      unsupportedLang: 'Nicht unterstützte Sprache',
      currentLang: 'Bereits in {language}',
      failed: 'Übersetzung fehlgeschlagen, bitte erneut versuchen',
      restoreFailed: 'Wiederherstellung fehlgeschlagen, bitte erneut versuchen',
      qualityCheck: 'Qualitätsprüfung...',
      cacheHit: 'Verwende zwischengespeicherte Übersetzung',
      memoryHit: 'Verwende Übersetzungsspeicher',
      processing: 'Verarbeitung...',
      optimizing: 'Übersetzungsqualität optimieren...'
    }
  };

  // 获取本地化消息 - 增强版本
  function getLocalizedMessage(key, targetLang = 'chinese_simplified', params = {}) {
    // 智能语言映射：通知语言与目标翻译语言保持一致
    let notificationLang = 'chinese_simplified'; // 默认中文
    
    // 直接映射支持的语言
    if (NOTIFICATION_TEXTS[targetLang]) {
      notificationLang = targetLang;
    } else {
      // 语言族映射
      const langFamily = {
        'chinese_traditional': 'chinese_simplified',
        'english': 'english',
        'japanese': 'japanese',
        'korean': 'korean',
        'french': 'french',
        'spanish': 'spanish',
        'german': 'german'
      };
      
      notificationLang = langFamily[targetLang] || 'chinese_simplified';
    }
    
    const texts = NOTIFICATION_TEXTS[notificationLang] || NOTIFICATION_TEXTS.chinese_simplified;
    let message = texts[key] || key;
    
    // 替换参数
    Object.keys(params).forEach(param => {
      const value = params[param];
      // 如果参数是语言名称，尝试本地化
      if (param === 'language' && LANGUAGE_MAP[value]) {
        const localizedLangName = getLocalizedLanguageName(value, notificationLang);
        message = message.replace(`{${param}}`, localizedLangName);
      } else {
        message = message.replace(`{${param}}`, value);
      }
    });
    
    return message;
  }
  
  // 获取本地化的语言名称
  function getLocalizedLanguageName(langCode, displayLang) {
    const languageNames = {
      chinese_simplified: {
        'english': '英语',
        'japanese': '日语',
        'korean': '韩语',
        'french': '法语',
        'spanish': '西班牙语',
        'german': '德语',
        'chinese_simplified': '简体中文',
        'chinese_traditional': '繁体中文'
      },
      english: {
        'english': 'English',
        'japanese': 'Japanese',
        'korean': 'Korean',
        'french': 'French',
        'spanish': 'Spanish',
        'german': 'German',
        'chinese_simplified': 'Simplified Chinese',
        'chinese_traditional': 'Traditional Chinese'
      },
      japanese: {
        'english': '英語',
        'japanese': '日本語',
        'korean': '韓国語',
        'french': 'フランス語',
        'spanish': 'スペイン語',
        'german': 'ドイツ語',
        'chinese_simplified': '簡体字中国語',
        'chinese_traditional': '繁体字中国語'
      },
      korean: {
        'english': '영어',
        'japanese': '일본어',
        'korean': '한국어',
        'french': '프랑스어',
        'spanish': '스페인어',
        'german': '독일어',
        'chinese_simplified': '간체 중국어',
        'chinese_traditional': '번체 중국어'
      },
      french: {
        'english': 'Anglais',
        'japanese': 'Japonais',
        'korean': 'Coréen',
        'french': 'Français',
        'spanish': 'Espagnol',
        'german': 'Allemand',
        'chinese_simplified': 'Chinois simplifié',
        'chinese_traditional': 'Chinois traditionnel'
      },
      spanish: {
        'english': 'Inglés',
        'japanese': 'Japonés',
        'korean': 'Coreano',
        'french': 'Francés',
        'spanish': 'Español',
        'german': 'Alemán',
        'chinese_simplified': 'Chino simplificado',
        'chinese_traditional': 'Chino tradicional'
      },
      german: {
        'english': 'Englisch',
        'japanese': 'Japanisch',
        'korean': 'Koreanisch',
        'french': 'Französisch',
        'spanish': 'Spanisch',
        'german': 'Deutsch',
        'chinese_simplified': 'Vereinfachtes Chinesisch',
        'chinese_traditional': 'Traditionelles Chinesisch'
      }
    };
    
    return languageNames[displayLang]?.[langCode] || LANGUAGE_MAP[langCode] || langCode;
  }

  // 进度显示管理器
  const ProgressManager = window.ProgressManager = {
    progressBar: null,
    lastUpdateTime: 0,
    
    // 获取配置
    getConfig() {
      return window.GLM_CONFIG?.ui?.progressDisplay || {
        mode: 'popup',  // 改为popup模式，只使用右下角通知
        updateFrequency: 20,
        persistentPosition: 'top-center',
        showCacheRate: true,
        showSpeed: true,
        autoHide: true,
        autoHideDelay: 3000,
        minimalThreshold: 50,
        throttleMs: 500
      };
    },
    
    // 创建常驻进度条
    createPersistentProgress() {
      if (this.progressBar) return this.progressBar;
      
      const config = this.getConfig();
      const progressContainer = document.createElement('div');
      progressContainer.className = 'translate-progress-persistent';
      progressContainer.innerHTML = `
        <div class="progress-content">
          <div class="progress-text">准备翻译...</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill"></div>
          </div>
          <div class="progress-stats"></div>
        </div>
        <button class="progress-close">&times;</button>
      `;
      
      // 设置样式
      const isBottomRight = config.persistentPosition === 'bottom-right';
      progressContainer.style.cssText = `
        position: fixed;
        ${isBottomRight ? 'bottom: 20px; right: 20px;' : `
          top: ${config.persistentPosition.includes('top') ? '10px' : 'auto'};
          bottom: ${config.persistentPosition.includes('bottom') ? '10px' : 'auto'};
          left: 50%;
          transform: translateX(-50%);
        `}
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: ${isBottomRight ? '8px 12px' : '12px 20px'};
        border-radius: ${isBottomRight ? '8px' : '12px'};
        font-size: ${isBottomRight ? '12px' : '13px'};
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        min-width: ${isBottomRight ? '240px' : '320px'};
        max-width: ${isBottomRight ? '320px' : '500px'};
        animation: ${isBottomRight ? 'slideInUp' : 'slideInDown'} 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: ${isBottomRight ? '10px' : '15px'};
      `;
      
      // 添加样式
      if (!document.querySelector('#translate-progress-styles')) {
        const styles = document.createElement('style');
        styles.id = 'translate-progress-styles';
        styles.textContent = `
          @keyframes slideInDown {
            from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
          }
          @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideOutUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
          }
          @keyframes slideOutDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100%); opacity: 0; }
          }
          .translate-progress-persistent .progress-content {
            flex: 1;
          }
          .translate-progress-persistent .progress-text {
            margin-bottom: 6px;
            font-weight: 600;
          }
          .translate-progress-persistent .progress-bar-container {
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            height: 6px;
            overflow: hidden;
            margin-bottom: 4px;
          }
          .translate-progress-persistent .progress-bar-fill {
            background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
            height: 100%;
            border-radius: 10px;
            transition: width 0.3s ease;
            width: 0%;
          }
          .translate-progress-persistent .progress-stats {
            font-size: 11px;
            opacity: 0.9;
            display: flex;
            justify-content: space-between;
          }
          .translate-progress-persistent .progress-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
          }
          .translate-progress-persistent .progress-close:hover {
            background: rgba(255,255,255,0.3);
          }
        `;
        document.head.appendChild(styles);
      }
      
      document.body.appendChild(progressContainer);
      
      // 添加关闭按钮事件监听器
      const closeButton = progressContainer.querySelector('.progress-close');
      closeButton.addEventListener('click', () => {
        this.hide();
      });
      
      this.progressBar = progressContainer;
      return progressContainer;
    },
    
    // 更新进度
    updateProgress(completed, total, cacheRate = 0, speed = 0, targetLang = 'chinese_simplified') {
      const config = this.getConfig();
      const now = Date.now();
      
      // 节流控制
      if (now - this.lastUpdateTime < config.throttleMs) {
        return;
      }
      this.lastUpdateTime = now;
      
      // 强制使用右下角弹窗模式，不显示顶部进度条
      if (config.mode === 'minimal' && total < config.minimalThreshold) {
        this.showMinimalProgress(completed, total, targetLang);
      } else {
        // 传统弹窗模式，但频率降低
        if (completed % config.updateFrequency === 0 || completed === total) {
          this.showPopupProgress(completed, total, cacheRate, targetLang);
        }
      }
    },
    
    // 更新常驻进度条
    updatePersistentProgress(completed, total, cacheRate, speed, targetLang = 'chinese_simplified') {
      const progressBar = this.progressBar || this.createPersistentProgress();
      const config = this.getConfig();
      
      const percentage = Math.round((completed / total) * 100);
      const progressText = progressBar.querySelector('.progress-text');
      const progressFill = progressBar.querySelector('.progress-bar-fill');
      const progressStats = progressBar.querySelector('.progress-stats');
      
      // 使用本地化的进度文本
      const progressMessage = getLocalizedMessage('translating', targetLang, {count: `${completed}/${total}`}).replace('{count}', `${completed}/${total} (${percentage}%)`);
      progressText.textContent = progressMessage;
      progressFill.style.width = `${percentage}%`;
      
      let statsHtml = '';
      if (config.showCacheRate && cacheRate > 0) {
        const cacheText = targetLang === 'chinese_simplified' ? '缓存命中' : 
                         targetLang === 'english' ? 'Cache Hit' :
                         targetLang === 'japanese' ? 'キャッシュヒット' : '缓存命中';
        statsHtml += `<span>${cacheText}: ${Math.round(cacheRate)}%</span>`;
      }
      if (config.showSpeed && speed > 0) {
        const speedText = targetLang === 'chinese_simplified' ? '速度' : 
                         targetLang === 'english' ? 'Speed' :
                         targetLang === 'japanese' ? '速度' : '速度';
        const unitText = targetLang === 'chinese_simplified' ? '文本/秒' : 
                        targetLang === 'english' ? 'texts/sec' :
                        targetLang === 'japanese' ? 'テキスト/秒' : '文本/秒';
        statsHtml += `<span>${speedText}: ${Math.round(speed)} ${unitText}</span>`;
      }
      progressStats.innerHTML = statsHtml;
      
      // 完成时处理
      if (completed === total && config.autoHide) {
        setTimeout(() => {
          this.hide();
        }, config.autoHideDelay);
      }
    },
    
    // 显示简化进度
    showMinimalProgress(completed, total, targetLang = 'chinese_simplified') {
      const percentage = Math.round((completed / total) * 100);
      const progressMsg = getLocalizedMessage('translating', targetLang, {count: `${completed}/${total} (${percentage}%)`});
      console.log(`🔄 ${progressMsg}`);
    },
    
    // 显示弹窗进度（降低频率）
    showPopupProgress(completed, total, cacheRate, targetLang = 'chinese_simplified') {
      const config = this.getConfig();
      const percentage = Math.round((completed / total) * 100);
      
      let message;
      if (config.simpleStyle) {
        message = getLocalizedMessage('translating', targetLang, {count: `${percentage}%`});
      } else if (config.showCacheRate && cacheRate > 0) {
        const cacheText = targetLang === 'chinese_simplified' ? '缓存' : 
                         targetLang === 'english' ? 'cache' :
                         targetLang === 'japanese' ? 'キャッシュ' : '缓存';
        message = getLocalizedMessage('translating', targetLang, {count: `${completed}/${total} (${percentage}%, ${cacheText}: ${Math.round(cacheRate)}%)`});
      } else {
        message = getLocalizedMessage('translating', targetLang, {count: `${completed}/${total} (${percentage}%)`});
      }
      
      showTranslateStatus(message, config.simpleStyle ? 800 : 1000, targetLang);
    },
    
    // 显示开始状态
    showStart(totalCount, targetLang = 'chinese_simplified') {
      const config = this.getConfig();
      // 强制使用右下角通知，不显示顶部进度条
      showTranslateStatus(getLocalizedMessage('translating', targetLang, {count: totalCount}), 2000, targetLang);
    },
    
    // 显示完成状态
    showComplete(completedCount, duration, cacheRate, targetLang = 'chinese_simplified') {
      const config = this.getConfig();
      const speed = Math.round(completedCount / (duration / 1000));
      
      // 强制使用右下角通知，不显示顶部进度条
      showTranslateStatus(getLocalizedMessage('completed', targetLang, {count: completedCount}), 3000, targetLang);
    },
    
    // 隐藏进度条
    hide() {
      if (this.progressBar) {
        const config = this.getConfig();
        const isBottomRight = config.persistentPosition === 'bottom-right';
        const animation = isBottomRight ? 'slideOutDown' : 'slideOutUp';
        const duration = isBottomRight ? 300 : 400;
        
        this.progressBar.style.animation = `${animation} ${duration}ms ease-in`;
        setTimeout(() => {
          if (this.progressBar && this.progressBar.parentNode) {
            this.progressBar.remove();
            this.progressBar = null;
          }
        }, duration);
      }
    }
  };
  
  // 兼容原有的显示翻译状态函数 - 增强版本
  function showTranslateStatus(message, duration = 2500, targetLanguage = 'chinese_simplified') {
    // 获取配置
    const config = window.GLM_CONFIG?.ui?.progressDisplay || {};
    const isSimple = config.simpleStyle;
    
    // 移除现有状态提示
    const existingStatus = document.querySelector('.translate-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    // 创建状态提示
    const statusDiv = document.createElement('div');
    statusDiv.className = 'translate-status';
    
    // 添加语言指示图标
    const languageIcon = getLanguageIcon(targetLanguage);
    const iconSpan = document.createElement('span');
    iconSpan.className = 'status-icon';
    iconSpan.textContent = languageIcon;
    iconSpan.style.marginRight = '6px';
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    statusDiv.appendChild(iconSpan);
    statusDiv.appendChild(messageSpan);
    
    // 根据目标语言调整样式和颜色
    const languageColors = {
      'chinese_simplified': '#2196F3',
      'english': '#4CAF50',
      'japanese': '#FF5722',
      'korean': '#9C27B0',
      'french': '#3F51B5',
      'spanish': '#FF9800',
      'german': '#795548'
    };
    
    const bgColor = languageColors[targetLanguage] || '#2196F3';
    
    // 简化样式
    if (isSimple) {
      statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 400;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        animation: slideInUp 0.2s ease-out;
        max-width: 280px;
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
      `;
    } else {
      statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInUp 0.3s ease-out;
        display: flex;
        align-items: center;
      `;
    }

    // 添加动画样式
    if (!document.querySelector('#translate-status-styles')) {
      const styles = document.createElement('style');
      styles.id = 'translate-status-styles';
      styles.textContent = `
        @keyframes slideInUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(statusDiv);

    // 自动移除
    setTimeout(() => {
      if (statusDiv.parentNode) {
        statusDiv.style.animation = 'slideOutDown 0.2s ease-in';
        setTimeout(() => {
          if (statusDiv.parentNode) {
            statusDiv.remove();
          }
        }, 200);
      }
    }, duration);
  }

  // 恢复原文
  function restoreOriginalText() {
    console.log('🔄 恢复原文...');
    
    let restoredCount = 0;
    
    // 恢复通过originalTexts映射保存的文本
    originalTexts.forEach((originalText, node) => {
      if (node.parentNode) {
        node.textContent = originalText;
        // 移除父元素的翻译标记
        const parent = node.parentElement;
        if (parent) {
          parent.removeAttribute('data-translated');
          parent.removeAttribute('data-original-text');
          parent.removeAttribute('data-target-lang');
        }
        restoredCount++;
      }
    });
    
    // 恢复通过data属性保存的文本（兜底处理）
    const translatedElements = document.querySelectorAll('[data-translated]');
    translatedElements.forEach(element => {
      const originalText = element.getAttribute('data-original-text');
      if (originalText) {
        // 查找文本节点并恢复
        const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = originalText;
        } else {
          element.textContent = originalText;
        }
        restoredCount++;
      }
      element.removeAttribute('data-translated');
      element.removeAttribute('data-original-text');
      element.removeAttribute('data-target-lang');
    });
    
    // 更新当前语言状态
    currentLanguage = 'chinese_simplified';
    
    // 清除当前页面的翻译缓存
    const pageKey = getCurrentPageKey();
    clearPageTranslationCache(pageKey);
    
    console.log(`✅ 原文恢复完成，已恢复 ${restoredCount} 个文本节点，当前语言状态：中文`);
    
    // 如果没有恢复任何文本，检查是否需要重新收集
    if (restoredCount === 0) {
      console.log('⚠️ 未找到可恢复的原文');
      // 检查页面是否确实有中文内容
      const hasChineseContent = Array.from(document.body.querySelectorAll('*')).some(el => {
        const text = el.textContent?.trim();
        return text && shouldTranslateText(text, el) && /[\u4e00-\u9fff]/.test(text);
      });
      
      if (hasChineseContent) {
        console.log('📝 检测到中文内容，重新收集原文...');
        collectAndSaveOriginalTexts();
      } else {
        console.log('⚠️ 页面可能没有中文内容或已被完全翻译');
      }
    }
  }

  // 取消当前翻译
  async function cancelCurrentTranslation(reason = '用户取消') {
    console.log(`🛑 取消翻译: ${reason}`);
    shouldCancelTranslation = true;
    
    if (translationAbortController) {
      translationAbortController.abort();
      translationAbortController = null;
    }
    
    // 等待当前请求完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    isTranslating = false;
    shouldCancelTranslation = false;
  }

  // 获取当前页面键
  function getCurrentPageKey() {
    return window.location.pathname;
  }

  // 保存当前页面状态
  function saveCurrentPageState() {
    const pageKey = getCurrentPageKey();
    pageTranslationStates.set(pageKey, {
      language: currentLanguage,
      timestamp: Date.now(),
      url: window.location.href
    });
  }

  // 主翻译函数 - 增强版本
  async function translatePage(targetLang, showProgress = true) {
    const pageStartTime = Date.now();
    
    if (isTranslating) {
      console.log('⚠️ 翻译正在进行中，跳过重复请求');
      return false;
    }

    isTranslating = true;
    shouldCancelTranslation = false;

    try {
      if (showProgress) {
        showTranslateStatus(getLocalizedMessage('collecting', targetLang), 2000, targetLang);
      }

      // 如果是恢复中文，直接恢复
      if (targetLang === 'chinese_simplified') {
        restoreOriginalText();
        isTranslating = false; // 恢复完成后重置状态
        if (showProgress) {
          showTranslateStatus(getLocalizedMessage('restored', targetLang), 2000, targetLang);
        }
        return true;
      }

      // 检查当前语言状态
      if (currentLanguage === targetLang) {
        console.log(`⚠️ 当前已是${targetLang}，跳过翻译`);
        if (showProgress) {
          showTranslateStatus(getLocalizedMessage('currentLang', targetLang, {language: targetLang}), 2000, targetLang);
        }
        return true;
      }

      // 首先检查页面翻译缓存
      const pageKey = getCurrentPageKey();
      const cachedTranslation = loadPageTranslationCache(pageKey, targetLang);
      
      if (cachedTranslation && cachedTranslation.size > 0) {
        console.log(`🚀 发现页面翻译缓存，快速恢复 ${cachedTranslation.size} 个翻译`);
        
        // 如果当前不是中文状态，先恢复到原文
        if (currentLanguage !== 'chinese_simplified') {
          console.log('🔄 先恢复原文，确保从中文翻译');
          restoreOriginalText();
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        const restored = await restorePageFromCache(pageKey, targetLang);
        if (restored) {
          currentLanguage = targetLang;
          const cacheRestoreTime = Date.now() - pageStartTime;
          console.log(`⚡ 页面缓存恢复完成，耗时: ${cacheRestoreTime}ms`);
          
          if (showProgress) {
            showTranslateStatus(`⚡ 缓存恢复完成 (${cacheRestoreTime}ms)`, 2000, targetLang);
          }
          
          // 记录缓存恢复性能
          if (window.GLM_CONFIG && window.GLM_CONFIG.trackPerformance) {
            window.GLM_CONFIG.trackPerformance('page_cache_restore', cacheRestoreTime, true);
          }
          
          return true;
        }
      }

      // 关键修复：如果当前不是中文状态，先恢复到原文再翻译
      if (currentLanguage !== 'chinese_simplified') {
        console.log('🔄 先恢复原文，确保从中文翻译');
        restoreOriginalText();
        // 等待DOM更新
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // 收集文本节点
      const textNodes = collectTextNodes();
      
      if (textNodes.length === 0) {
        if (showProgress) {
          showTranslateStatus(getLocalizedMessage('noText', targetLang), 2000, targetLang);
        }
        return false;
      }

      // 分析翻译任务
      const totalChars = textNodes.reduce((sum, node) => {
        const text = originalTexts.get(node) || '';
        return sum + text.length;
      }, 0);
      
      const avgTextLength = Math.round(totalChars / textNodes.length);
      const estimatedTime = Math.round((textNodes.length * 0.5) + (totalChars * 0.01));
      
      console.log(`📝 翻译任务分析:`);
      console.log(`   文本节点: ${textNodes.length} 个`);
      console.log(`   总字符数: ${totalChars} 字符`);
      console.log(`   平均长度: ${avgTextLength} 字符/文本`);
      console.log(`   预估耗时: ${estimatedTime} 秒`);
      
      // 翻译开始时的进度显示已在translateBatch中处理

      // 智能缓存预检查
      let cacheHitCount = 0;
      textNodes.forEach(node => {
        const text = originalTexts.get(node);
        if (text && getFromCache(text, targetLang)) {
          cacheHitCount++;
        }
      });
      
      const cacheHitRate = Math.round((cacheHitCount / textNodes.length) * 100);
      console.log(`💾 缓存预检查: ${cacheHitCount}/${textNodes.length} (${cacheHitRate}%) 命中`);

      // 批量翻译
      const completedCount = await translateBatch(textNodes, targetLang);
      
      if (!shouldCancelTranslation) {
        currentLanguage = targetLang;
        
        // 保存页面翻译缓存
        const translatedTexts = new Map();
        
        // 收集已翻译的文本对应关系
        textNodes.forEach(node => {
          const originalText = originalTexts.get(node);
          const translatedText = node.textContent;
          if (originalText && translatedText && originalText !== translatedText) {
            translatedTexts.set(originalText, translatedText);
          }
        });
        
        savePageTranslationCache(pageKey, targetLang, translatedTexts);
        
        // 计算总体性能统计
        const totalTime = Date.now() - pageStartTime;
        const translationSpeed = Math.round(textNodes.length / (totalTime / 1000));
        
        console.log(`🎉 页面翻译完成统计:`);
        console.log(`   总耗时: ${totalTime}ms`);
        console.log(`   成功率: ${Math.round((completedCount / textNodes.length) * 100)}%`);
        console.log(`   翻译速度: ${translationSpeed} 文本/秒`);
        console.log(`   缓存命中率: ${cacheHitRate}%`);
        
        // 翻译完成时的进度显示已在translateBatch中处理
        
        // 记录页面翻译性能
        if (window.GLM_CONFIG && window.GLM_CONFIG.trackPerformance) {
          window.GLM_CONFIG.trackPerformance('page_translation', totalTime, completedCount === textNodes.length);
        }
        
        // 智能缓存清理
        if (window.GLM_CONFIG && window.GLM_CONFIG.advanced?.intelligentCaching) {
          setTimeout(() => {
            cleanupCache();
          }, 5000);
        }
        
        return true;
      } else {
        console.log('🛑 翻译被中断');
        return false;
      }

    } catch (error) {
      console.error('💥 翻译过程出错:', error);
      
      // 记录错误
      const errorTime = Date.now() - pageStartTime;
      console.log(`❌ 翻译错误，耗时: ${errorTime}ms`);
      
      if (showProgress) {
        showTranslateStatus(getLocalizedMessage('failed', targetLang), 4000, targetLang);
      }
      return false;
    } finally {
      isTranslating = false;
      shouldCancelTranslation = false;
      translationAbortController = null;
    }
  }

  // 翻译范围选择模态框的多语言文本
  const MODAL_TEXTS = {
    chinese_simplified: {
      title: '选择翻译范围',
      description: '您希望如何翻译到 <strong>{language}</strong>？',
      currentPageTitle: '仅翻译当前页面',
      currentPageDesc: '只翻译当前页面内容，不影响其他页面',
      globalTitle: '全局翻译',
      globalDesc: '翻译当前页面并在浏览其他页面时自动翻译'
    },
    english: {
      title: 'Select Translation Scope',
      description: 'How would you like to translate to <strong>{language}</strong>?',
      currentPageTitle: 'Current Page Only',
      currentPageDesc: 'Translate only the current page content, without affecting other pages',
      globalTitle: 'Global Translation',
      globalDesc: 'Translate current page and automatically translate when browsing other pages'
    },
    japanese: {
      title: '翻訳範囲を選択',
      description: '<strong>{language}</strong>への翻訳方法を選択してください',
      currentPageTitle: '現在のページのみ',
      currentPageDesc: '現在のページのコンテンツのみを翻訳し、他のページには影響しません',
      globalTitle: 'グローバル翻訳',
      globalDesc: '現在のページを翻訳し、他のページを閲覧する際に自動的に翻訳します'
    }
  };

  // 创建翻译范围选择模态框
  function createTranslationScopeModal(language, onConfirm) {
    // 移除已存在的模态框
    const existingModal = document.querySelector('.translation-scope-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // 获取目标语言的文本
    const texts = MODAL_TEXTS[language] || MODAL_TEXTS.chinese_simplified;
    const languageName = LANGUAGE_MAP[language];

    const modal = document.createElement('div');
    modal.className = 'translation-scope-modal';
    modal.innerHTML = `
      <div class="translation-scope-overlay"></div>
      <div class="translation-scope-content">
        <div class="translation-scope-header">
          <h3>${texts.title}</h3>
          <button class="translation-scope-close">&times;</button>
        </div>
        <div class="translation-scope-body">
          <p>${texts.description.replace('{language}', languageName)}</p>
          <div class="translation-scope-options">
            <button class="translation-scope-option" data-scope="current">
              <div class="option-icon">📄</div>
              <div class="option-text">
                <div class="option-title">${texts.currentPageTitle}</div>
                <div class="option-desc">${texts.currentPageDesc}</div>
              </div>
            </button>
            <button class="translation-scope-option" data-scope="global">
              <div class="option-icon">🌐</div>
              <div class="option-text">
                <div class="option-title">${texts.globalTitle}</div>
                <div class="option-desc">${texts.globalDesc}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      .translation-scope-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .translation-scope-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      .translation-scope-content {
        position: relative;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        max-width: 480px;
        width: 90%;
        max-height: 90vh;
        overflow: hidden;
        animation: modalSlideIn 0.3s ease-out;
      }
      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .translation-scope-header {
        padding: 20px 24px 16px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .translation-scope-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }
      .translation-scope-close {
        background: none;
        border: none;
        font-size: 24px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s;
      }
      .translation-scope-close:hover {
        background: #f3f4f6;
        color: #374151;
      }
      .translation-scope-body {
        padding: 20px 24px 24px;
      }
      .translation-scope-body p {
        margin: 0 0 20px;
        color: #4b5563;
        font-size: 14px;
        line-height: 1.5;
      }
      .translation-scope-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .translation-scope-option {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
        width: 100%;
      }
      .translation-scope-option:hover {
        border-color: #3b82f6;
        background: #f8faff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      }
      .option-icon {
        font-size: 24px;
        margin-right: 16px;
        flex-shrink: 0;
      }
      .option-text {
        flex: 1;
      }
      .option-title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
        font-size: 14px;
      }
      .option-desc {
        color: #6b7280;
        font-size: 12px;
        line-height: 1.4;
      }
      [data-theme="slate"] .translation-scope-content {
        background: #2d3748;
        color: white;
      }
      [data-theme="slate"] .translation-scope-header {
        border-bottom-color: #4a5568;
      }
      [data-theme="slate"] .translation-scope-header h3 {
        color: white;
      }
      [data-theme="slate"] .translation-scope-close {
        color: #a0aec0;
      }
      [data-theme="slate"] .translation-scope-close:hover {
        background: #4a5568;
        color: white;
      }
      [data-theme="slate"] .translation-scope-body p {
        color: #cbd5e0;
      }
      [data-theme="slate"] .translation-scope-option {
        background: #2d3748;
        border-color: #4a5568;
        color: white;
      }
      [data-theme="slate"] .translation-scope-option:hover {
        border-color: #3b82f6;
        background: #1a365d;
      }
      [data-theme="slate"] .option-title {
        color: white;
      }
      [data-theme="slate"] .option-desc {
        color: #a0aec0;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    // 事件处理
    const closeModal = () => {
      modal.remove();
      style.remove();
    };

    // 关闭按钮和遮罩层点击事件
    modal.querySelector('.translation-scope-close').addEventListener('click', closeModal);
    modal.querySelector('.translation-scope-overlay').addEventListener('click', closeModal);

    // 选项点击事件
    modal.querySelectorAll('.translation-scope-option').forEach(option => {
      option.addEventListener('click', () => {
        const scope = option.dataset.scope;
        closeModal();
        onConfirm(scope);
      });
    });

    // ESC键关闭
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }

  // 全局翻译函数 - 供MkDocs Material的alternate功能调用
  window.translateTo = async function(language) {
    if (!LANGUAGE_MAP[language]) {
      console.warn(`❌ 不支持的语言: ${language}`);
      showTranslateStatus(getLocalizedMessage('unsupportedLang', language), 2000, language);
      return false;
    }

    // 如果正在翻译，无论目标语言是什么都先取消当前翻译
    if (isTranslating) {
      await cancelCurrentTranslation('切换翻译语言');
    }

    // 检查目标语言与当前语言的关系
    if (language === currentLanguage) {
      // 特殊处理：如果目标是中文但页面有翻译内容，强制恢复
      if (language === 'chinese_simplified') {
        const hasTranslatedElements = document.querySelectorAll('[data-translated]').length > 0;
        if (hasTranslatedElements) {
          console.log('🔄 检测到翻译内容与状态不一致，强制恢复中文');
          restoreOriginalText();
          // 清除全局翻译偏好
          saveGlobalTranslationPreference(null);
          showTranslateStatus(getLocalizedMessage('restored', language), 2000, language);
          return true;
        }
      }
      
      console.log('🎯 目标语言与当前语言相同，跳过处理');
      showTranslateStatus(getLocalizedMessage('currentLang', language, {language: LANGUAGE_MAP[language]}), 2000, language);
      return true;
    }

    // 如果目标语言不是中文，显示翻译范围选择模态框
    if (language !== 'chinese_simplified') {
      return new Promise((resolve) => {
        createTranslationScopeModal(language, async (scope) => {
          try {
            console.log(`🎯 开始翻译: ${LANGUAGE_MAP[currentLanguage]} -> ${LANGUAGE_MAP[language]} (${scope === 'global' ? '全局' : '当前页面'})`);
            
            const success = await translatePage(language, true);
            
            if (success) {
              if (scope === 'global') {
                // 设置全局翻译偏好
                saveGlobalTranslationPreference(language);
                console.log('🌐 已设置全局翻译偏好');
                
                // 确保当前语言状态同步
                currentLanguage = language;
              } else {
                // 仅当前页面翻译，不影响全局偏好
                console.log('📄 仅翻译当前页面，保持全局偏好不变');
                
                // 但要确保当前页面状态正确
                currentLanguage = language;
              }
              
              // 保存当前页面状态
              saveCurrentPageState();
              
              // 验证状态一致性
              const isValid = validateGlobalTranslationState();
              if (!isValid) {
                console.log('⚠️ 翻译完成后状态验证失败，进行修正');
              }
              
              console.log(`✅ 翻译完成: ${LANGUAGE_MAP[language]}`);
              resolve(true);
            } else {
              throw new Error('翻译失败');
            }
            
          } catch (error) {
            console.error('💥 翻译失败:', error);
            showTranslateStatus(getLocalizedMessage('failed', targetLang), 4000, targetLang);
      
      // 错误恢复
      try {
        restoreOriginalText();
        console.log('🔄 已恢复为中文状态');
      } catch (recoveryError) {
        console.error('💥 错误恢复失败:', recoveryError);
      }
            
            resolve(false);
          }
        });
      });
    }

    // 恢复中文的逻辑
    try {
      console.log('🔄 恢复为中文');
      restoreOriginalText();
      saveGlobalTranslationPreference(null);
      showTranslateStatus(getLocalizedMessage('restored', language), 2000, language);
      return true;
    } catch (error) {
      console.error('💥 恢复中文失败:', error);
      showTranslateStatus(getLocalizedMessage('restoreFailed', language), 4000, language);
      return false;
    } finally {
      isTranslating = false; // 确保状态重置
    }
  };

  // 收集并保存原文（在页面初始化时调用）
  function collectAndSaveOriginalTexts() {
    console.log('📝 收集并保存页面原文...');
    
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript'].includes(tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // 跳过已翻译的节点
          if (parent.hasAttribute('data-translated')) {
            return NodeFilter.FILTER_REJECT;
          }
          
          const text = node.textContent.trim();
          if (text.length < 2) return NodeFilter.FILTER_REJECT;
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    let savedCount = 0;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (shouldTranslateText(text, node.parentElement) && !originalTexts.has(node)) {
        originalTexts.set(node, text);
        savedCount++;
      }
    }
    
    console.log(`✅ 已保存 ${savedCount} 个原文文本节点`);
  }

  // 页面加载完成后的初始化
  function initializeTranslation() {
    console.log('🚀 智谱清言翻译系统初始化中...');
    
    // 验证配置
    if (config.debug?.enabled) {
      console.log('📋 翻译系统配置:', config);
    }
    
    try {
      // 加载全局翻译偏好
      const savedPreference = loadGlobalTranslationPreference();
      
      // 设置全局翻译函数（兼容现有的translateTo调用）
      window.translateTo = window.translateTo || translateTo;
      
      // 初始化时收集原文
      collectAndSaveOriginalTexts();
      
      // 同步全局翻译状态
      const syncedLanguage = syncGlobalTranslationState();
      
      // 检查是否有全局翻译偏好
      const pageKey = getCurrentPageKey();
      const pageState = pageTranslationStates.get(pageKey);
      
      if (pageState && pageState.language !== 'chinese_simplified') {
        console.log(`🔄 检测到页面翻译状态: ${LANGUAGE_MAP[pageState.language]}`);
        // 可以选择自动恢复翻译状态
        // translateTo(pageState.language);
      }
      
      // 验证初始化后的状态一致性
      const isStateValid = validateGlobalTranslationState();
      if (!isStateValid) {
        console.log('⚠️ 初始化后状态验证失败，可能需要手动修正');
      }
      
      console.log('✅ 智谱清言翻译系统已就绪');
      console.log(`📊 当前状态: 语言=${currentLanguage}, 全局偏好=${globalTranslationPreference || '无'}`);
    } catch (error) {
      console.error('❌ 翻译系统初始化失败:', error);
    }
  }

  // 统一的即时导航处理
  function handleInstantNavigation() {
    console.log('🔄 处理即时导航...');
    
    // 重置翻译状态
    isTranslating = false;
    shouldCancelTranslation = false;
    
    // 移除翻译状态提示
    const statusElement = document.querySelector('.translate-status');
    if (statusElement) {
      statusElement.remove();
    }
    
    // 保存当前页面的翻译状态（如果有的话）
    const currentPageKey = getCurrentPageKey();
    if (currentLanguage !== 'chinese_simplified') {
      console.log(`💾 保存当前页面翻译状态: ${currentLanguage}`);
      saveCurrentPageState();
    }
    
    // 检查页面是否有翻译痕迹
    const hasTranslatedElements = document.querySelectorAll('[data-translated]').length > 0;
    
    if (hasTranslatedElements) {
      console.log('⚠️ 检测到页面有翻译内容，清理翻译状态');
      // 清理翻译标记，但不强制恢复原文
      document.querySelectorAll('[data-translated]').forEach(el => {
        el.removeAttribute('data-translated');
      });
    }
    
    // 重置当前语言状态为中文（临时状态）
    currentLanguage = 'chinese_simplified';
    
    // 清空原文映射，重新收集
    originalTexts.clear();
    
    // 重新初始化并收集原文
    setTimeout(() => {
      initializeTranslation();
      // 确保收集当前页面的原文
      collectAndSaveOriginalTexts();
      
      // 检查全局翻译偏好状态一致性
      const isStateValid = validateGlobalTranslationState();
      
      // 检查页面翻译缓存或应用全局翻译偏好
      const pageKey = getCurrentPageKey();
      let shouldTranslate = false;
      let targetLanguage = null;
      let translationSource = null;
      
      // 优先检查页面缓存
      const pageCache = loadPageTranslationCache(pageKey);
      if (pageCache && pageCache.language !== 'chinese_simplified') {
        targetLanguage = pageCache.language;
        shouldTranslate = true;
        translationSource = 'page_cache';
        console.log(`📁 检测到页面翻译缓存: ${LANGUAGE_MAP[targetLanguage]}`);
      } else if (globalTranslationPreference && globalTranslationPreference !== 'chinese_simplified') {
        targetLanguage = globalTranslationPreference;
        shouldTranslate = true;
        translationSource = 'global_preference';
        console.log(`🌐 检测到全局翻译偏好: ${LANGUAGE_MAP[globalTranslationPreference]}`);
      }
      
      if (shouldTranslate && targetLanguage) {
        setTimeout(async () => {
          try {
            console.log(`🎯 开始应用翻译 (来源: ${translationSource}): ${LANGUAGE_MAP[targetLanguage]}`);
            
            // 先尝试从缓存恢复
            const restored = await restorePageFromCache(pageKey, targetLanguage);
            
            if (!restored) {
              // 缓存恢复失败，执行正常翻译
              const success = await translatePage(targetLanguage, false);
              if (success) {
                console.log(`✅ 新页面自动翻译完成: ${LANGUAGE_MAP[targetLanguage]}`);
                
                // 如果是全局偏好翻译，确保状态同步
                if (translationSource === 'global_preference') {
                  currentLanguage = targetLanguage;
                  console.log(`🔄 同步全局翻译状态: ${targetLanguage}`);
                }
              } else {
                console.warn('⚠️ 新页面自动翻译失败');
              }
            } else {
              // 缓存恢复成功，同步状态
              currentLanguage = targetLanguage;
              console.log(`✅ 从缓存恢复翻译状态: ${targetLanguage}`);
            }
          } catch (error) {
            console.error('💥 页面翻译处理失败:', error);
          }
        }, 250); // 增加延迟确保页面完全加载和原文收集完成
      } else {
        console.log('📝 页面保持中文状态');
      }
    }, 200); // 增加延迟确保DOM更新完成
  }

  // 页面加载和导航事件监听
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslation);
  } else {
    initializeTranslation();
  }

  // Material for MkDocs 即时导航支持
  if (typeof window.document$ !== 'undefined') {
    window.document$.subscribe(handleInstantNavigation);
  }

  // 导出调试接口
  window.GLMTranslate = {
    translateTo: window.translateTo,
    getCurrentLanguage: () => currentLanguage,
    getCache: () => translationCache,
    clearCache: () => translationCache.clear(),
    getOriginalTexts: () => originalTexts,
    restoreOriginal: restoreOriginalText,
    isTranslating: () => isTranslating,
    collectOriginalTexts: collectAndSaveOriginalTexts,
    // 页面缓存管理
    getPageCache: () => pageTranslationCache,
    clearPageCache: (pageKey) => {
      if (pageKey) {
        clearPageTranslationCache(pageKey);
      } else {
        // 清除所有页面缓存
        pageTranslationCache.clear();
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('glm_page_cache_')) {
            localStorage.removeItem(key);
          }
        });
        console.log('🗑️ 已清除所有页面翻译缓存');
      }
    },
    restoreFromCache: (pageKey, language) => restorePageFromCache(pageKey, language),
    // 全局状态管理
    getGlobalPreference: () => globalTranslationPreference,
    setGlobalPreference: (language) => saveGlobalTranslationPreference(language),
    clearGlobalPreference: () => saveGlobalTranslationPreference(null),
    validateState: validateGlobalTranslationState,
    syncState: syncGlobalTranslationState,
    resetState: resetTranslationState,
    debug: {
      originalTextsCount: () => originalTexts.size,
      currentLang: () => currentLanguage,
      globalPreference: () => globalTranslationPreference,
      pageCacheSize: () => pageTranslationCache.size,
      getStateInfo: () => {
        return {
          currentLanguage,
          globalTranslationPreference,
          isTranslating,
          originalTextsCount: originalTexts.size,
          pageCacheSize: pageTranslationCache.size,
          hasTranslatedElements: document.querySelectorAll('[data-translated]').length,
          localStorage: {
            globalPreference: localStorage.getItem('glm_global_translation_preference'),
            pageCaches: Object.keys(localStorage).filter(key => key.startsWith('glm_page_cache_')).length
          }
        };
      },
      listPageCaches: () => {
        const caches = [];
        pageTranslationCache.forEach((cache, pageKey) => {
          caches.push({
            pageKey,
            language: cache.language,
            textCount: cache.translatedTexts ? cache.translatedTexts.size : 0,
            timestamp: new Date(cache.timestamp).toLocaleString()
          });
        });
        return caches;
      },
      forceReset: () => {
        resetTranslationState();
      },
      fixState: () => {
        console.log('🔧 修复翻译状态...');
        const syncResult = syncGlobalTranslationState();
        const isValid = validateGlobalTranslationState();
        console.log(`修复结果: 同步=${syncResult || '无'}, 验证=${isValid ? '通过' : '失败'}`);
        return { synced: syncResult, valid: isValid };
      },
      // 测试翻译过滤逻辑 - 增强版本：包含代码注释测试
      testTranslationFilter: () => {
        console.log('🧪 测试翻译过滤逻辑...');
        const testTexts = [
          '优先级顺序：Front Matter > 文件系统时间戳(缓存) > Git时间戳',
          '插件名称：Plugin Name',
          '文件路径：/path/to/file.md',
          'Front Matter',
          'GitHub Actions',
          '这是一段纯中文描述',
          'This is pure English text',
          'API文档说明',
          '使用Docker容器部署',
          'function myFunction() { return true; }',
          'console.log("Hello World");',
          '# 显示位置：top（标题后） bottom（文档末尾），默认：bottom',
          '// 这是一个JavaScript注释',
          '/* 这是一个多行注释 */',
          '<!-- 这是HTML注释 -->',
          '# Python注释：这里是说明文本',
          'position: top            # 显示位置：top（标题后） bottom（文档末尾），默认：bottom',
          'type: date               # 时间类型：date datetime timeago，默认：date',
          '// API key configuration - 配置API密钥',
          '/* 翻译系统初始化 - Translation system initialization */'
        ];
        
        testTexts.forEach(text => {
          const shouldTranslate = shouldTranslateText(text);
          const skipByConfig = window.GLM_CONFIG?.shouldSkipTranslation?.(text);
          const isCodeComment = window.GLM_CONFIG?.isCodeComment?.(text);
          const commentInfo = isCodeComment ? window.GLM_CONFIG?.extractCommentText?.(text) : null;
          
          console.log(`📝 文本: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`);
          console.log(`   ✅ shouldTranslateText: ${shouldTranslate}`);
          console.log(`   ⚠️ GLM_CONFIG.shouldSkipTranslation: ${skipByConfig}`);
          console.log(`   🔧 是否为代码注释: ${isCodeComment}`);
          if (commentInfo) {
            console.log(`   📄 注释内容: "${commentInfo.commentContent}"`);
            console.log(`   🎨 格式模板: "${commentInfo.replacement}"`);
          }
          console.log(`   🎯 最终结果: ${shouldTranslate && !skipByConfig ? '翻译' : '跳过'}`);
          console.log('---');
        });
      }
    }
  };

})();