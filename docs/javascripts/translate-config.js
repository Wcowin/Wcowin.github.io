// 自动生成的高性能智能翻译配置 - 请勿手动编辑
// 生成时间: 2025-07-28 15:30:00
// 环境: production (优化版本)
// 优化特性: 高速批处理、智能重试、长时间缓存、压缩请求
window.GLM_TRANSLATE_CONFIG = {
  endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  model: 'glm-4-flash',
  maxRetries: 3,
  timeout: 8000,
  batchSize: 15,
  batchDelay: 50,
  maxConcurrent: 8,
  
  // 高级配置
  adaptiveBatching: true,
  minBatchSize: 3,
  maxBatchSize: 25,
  dynamicBatchAdjustment: true,
  preloadCache: true,
  intelligentRetry: true,
  adaptiveTimeout: true,
  cacheEnabled: true,
  compressionEnabled: true,
  streamingEnabled: true,
  
  // 翻译优化配置
  alwaysFromOriginal: true,  // 始终从原文翻译，提升质量和速度
  originalLanguage: 'chinese_simplified',  // 原文语言
  
  // 质量控制
  qualityThreshold: 0.85,
  fallbackModel: 'glm-4',
  validateTranslation: true,
  
  // 监控配置
  enableMetrics: true,
  enableDebugLog: true,
  performanceTracking: true,
  
  configHash: 'ea2a081e4e7d61dc',
  environment: 'development',
  // 编码后的密钥（仅在HTTPS环境下使用）
  _k: 'cGxhY2Vob2xkZXI=',
  
  // 性能指标
  metrics: {
    requestCount: 0,
    successCount: 0,
    errorCount: 0,
    averageResponseTime: 0,
    cacheHitRate: 0
  },
  
  // 智能词汇检测配置
  skipPatterns: [
    /^[a-zA-Z\s\-_.,!?()\[\]{}:;"']+$/,  // 纯英文
    /\b(GitHub|API|JSON|HTML|CSS|JavaScript|Python|React|Vue|Angular|Node\.js)\b/,  // 技术术语
    /^https?:\/\//,  // URL
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  // 邮箱
  ],
  
  // 专有名词列表（不翻译）
  properNouns: [
    'GitHub', 'Material', 'MkDocs', 'JavaScript', 'Python', 'API', 'JSON', 'HTML', 'CSS',
    'Wcowin', 'GLM', 'OpenAI', 'Google', 'Microsoft', 'Apple', 'Linux', 'Windows', 'macOS',
    'React', 'Vue', 'Angular', 'Node.js', 'npm', 'yarn', 'webpack', 'TypeScript',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Firebase', 'MongoDB', 'MySQL',
    'Redis', 'Nginx', 'Apache', 'Ubuntu', 'CentOS', 'Debian', 'iOS', 'Android'
  ]
};

// 解码函数
window.GLM_TRANSLATE_CONFIG.getApiKey = function() {
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('翻译功能仅在HTTPS环境下可用');
    return null;
  }
  try {
    return atob(this._k);
  } catch (e) {
    console.error('配置解析失败');
    return null;
  }
};

// 智能词汇检测函数
window.GLM_TRANSLATE_CONFIG.shouldTranslate = function(text) {
  if (!text || text.length < 3) return false;
  
  // 检查跳过模式
  for (const pattern of this.skipPatterns) {
    if (pattern.test(text)) return false;
  }
  
  // 检查专有名词
  for (const noun of this.properNouns) {
    if (text.includes(noun)) return false;
  }
  
  return true;
};

// 动态API参数优化 - 针对速度优化
window.GLM_TRANSLATE_CONFIG.getOptimalParams = function(textLength) {
  return {
    temperature: textLength < 10 ? 0.05 : (textLength < 50 ? 0.1 : 0.15),
    max_tokens: Math.min(Math.max(Math.floor(textLength * 1.5), 30), 600),
    top_p: 0.9,
    frequency_penalty: 0.05,
    presence_penalty: 0.05
  };
};

// 智能提示词生成 - 高速优化版本
window.GLM_TRANSLATE_CONFIG.generatePrompt = function(text, targetLang) {
  const isEnglish = targetLang === 'english';
  const isShort = text.length < 30;
  
  if (isEnglish) {
    if (isShort) return `Translate: ${text}`;
    return `Translate to English:\n${text}`;
  } else {
    const targetLanguage = this.getLanguageName(targetLang);
    if (isShort) return `译为${targetLanguage}：${text}`;
    return `译为${targetLanguage}：\n${text}`;
  }
};

// 语言名称映射
window.GLM_TRANSLATE_CONFIG.getLanguageName = function(langCode) {
  const langMap = {
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
  return langMap[langCode] || langCode;
};

// 高级性能监控
window.GLM_TRANSLATE_CONFIG.updateMetrics = function(success, responseTime) {
  this.metrics.requestCount++;
  if (success) {
    this.metrics.successCount++;
  } else {
    this.metrics.errorCount++;
  }
  
  // 计算平均响应时间
  const totalTime = this.metrics.averageResponseTime * (this.metrics.requestCount - 1) + responseTime;
  this.metrics.averageResponseTime = totalTime / this.metrics.requestCount;
  
  if (this.enableDebugLog) {
    console.log('翻译性能指标:', this.metrics);
  }
};

// 自适应批处理大小调整
window.GLM_TRANSLATE_CONFIG.adjustBatchSize = function(responseTime, errorRate) {
  if (!this.dynamicBatchAdjustment) return this.batchSize;
  
  if (errorRate > 0.1 || responseTime > this.timeout * 0.8) {
    // 降低批处理大小
    this.batchSize = Math.max(this.minBatchSize, Math.floor(this.batchSize * 0.8));
  } else if (errorRate < 0.05 && responseTime < this.timeout * 0.5) {
    // 增加批处理大小
    this.batchSize = Math.min(this.maxBatchSize, Math.ceil(this.batchSize * 1.2));
  }
  
  return this.batchSize;
};

// 智能重试策略 - 高速优化
window.GLM_TRANSLATE_CONFIG.getRetryDelay = function(attempt, error) {
  if (!this.intelligentRetry) return this.batchDelay * attempt;
  
  const baseDelay = this.batchDelay;
  let multiplier = Math.pow(1.5, attempt - 1); // 减少指数增长
  
  if (error && error.status === 429) {
    multiplier *= 2; // 减少429错误的延迟
  } else if (error && error.status >= 500) {
    multiplier *= 1.5; // 减少服务器错误的延迟
  }
  
  return Math.min(baseDelay * multiplier, 5000); // 最大5秒
};

// 缓存管理
window.GLM_TRANSLATE_CONFIG.cache = new Map();
window.GLM_TRANSLATE_CONFIG.getCacheKey = function(text, targetLang) {
  return `${text.slice(0, 50)}_${targetLang}`;
};

window.GLM_TRANSLATE_CONFIG.getFromCache = function(text, targetLang) {
  if (!this.cacheEnabled) return null;
  const key = this.getCacheKey(text, targetLang);
  const cached = this.cache.get(key);
  if (cached && Date.now() - cached.timestamp < 7200000) { // 增加到2小时过期
    this.metrics.cacheHitRate = (this.metrics.cacheHitRate * this.metrics.requestCount + 1) / (this.metrics.requestCount + 1);
    return cached.result;
  }
  return null;
};

window.GLM_TRANSLATE_CONFIG.setCache = function(text, targetLang, result) {
  if (!this.cacheEnabled) return;
  const key = this.getCacheKey(text, targetLang);
  this.cache.set(key, {
    result: result,
    timestamp: Date.now()
  });
  
  // 限制缓存大小 - 增加缓存容量
  if (this.cache.size > 2000) {
    const firstKey = this.cache.keys().next().value;
    this.cache.delete(firstKey);
  }
};

// 添加预处理和并行处理优化
window.GLM_TRANSLATE_CONFIG.batchProcessor = {
  // 预处理队列
  preprocessQueue: function(texts) {
    return texts.filter(text => window.GLM_TRANSLATE_CONFIG.shouldTranslate(text))
                .map(text => text.trim())
                .filter(text => text.length > 0);
  },
  
  // 智能分组 - 按长度分组以优化批处理
  groupByLength: function(texts) {
    const short = texts.filter(t => t.length < 50);
    const medium = texts.filter(t => t.length >= 50 && t.length < 200);
    const long = texts.filter(t => t.length >= 200);
    return { short, medium, long };
  },
  
  // 并行处理器
  processInParallel: async function(batches, processor) {
    const promises = batches.map(batch => processor(batch));
    return await Promise.allSettled(promises);
  }
};
