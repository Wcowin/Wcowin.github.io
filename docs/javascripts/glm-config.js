/**
 * 智谱清言翻译系统配置文件
 * 提供高级配置选项和优化设置
 * 版本: 2.0.0
 */

window.GLM_CONFIG = {
  // 版本信息
  version: '2.1.0',
  lastUpdated: '2024-12-19',
  // API配置 - 最大速度优化
  api: {
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash', // 使用快速模型以提高速度
    timeout: 5000,        // 减少超时时间以提高响应速度
    maxRetries: 2,        // 减少重试次数以加快失败处理
    retryDelay: 500,      // 减少重试延迟
    keepAlive: true,      // 启用连接保持
    maxConnections: 10,   // 最大连接数
    requestTimeout: 3000, // 请求超时
    connectionTimeout: 2000 // 连接超时
  },

  // 性能优化配置 - 最大速度优化
  performance: {
    batchSize: 25,        // 进一步增大批处理大小
    maxConcurrent: 10,    // 最大化并发数
    cacheEnabled: true,   // 启用缓存
    cacheMaxAge: 7 * 24 * 60 * 60 * 1000, // 缓存7天
    maxCacheSize: 5000,   // 大幅增大缓存容量
    enableCompression: true, // 启用请求压缩
    fastMode: true,       // 启用快速模式
    aggressiveCaching: true, // 激进缓存策略
    preloadNext: true,    // 预加载下一批
    parallelProcessing: true, // 并行处理
    streamProcessing: false, // 流式处理（可选）
    requestPooling: true, // 请求池化
    connectionReuse: true, // 连接复用
    smartCaching: true,   // 智能缓存
    cachePreload: true,   // 缓存预加载
    persistentCache: true, // 持久化缓存
    cacheCompression: true, // 缓存压缩
    qualityOptimization: false, // 质量优化
    adaptiveTimeout: true, // 自适应超时
    memoryOptimization: true // 内存优化
  },

  // 翻译质量配置 - 针对英文和日文优化
  quality: {
    temperature: 0.15,    // 稍微提高以增加表达多样性
    topP: 0.9,           // 提高以改善翻译质量
    frequencyPenalty: 0.1, // 增加以避免重复表达
    presencePenalty: 0.1,  // 增加以提高表达丰富性
    maxTokensMultiplier: 2.5, // 增加token数以提高质量
    streamResponse: false,    // 禁用流式响应以简化处理
    optimizeForSpeed: true,   // 启用速度优化
    languageSpecificOptimization: { // 语言特定优化
      english: {
        temperature: 0.2,
        topP: 0.95,
        focusAreas: ['grammar', 'naturalness', 'terminology']
      },
      japanese: {
        temperature: 0.1,
        topP: 0.9,
        focusAreas: ['politeness', 'word_order', 'kanji_usage']
      },
      korean: {
        temperature: 0.15,
        topP: 0.9,
        focusAreas: ['honorifics', 'word_order', 'formality_levels']
      },
      arabic: {
        temperature: 0.2,
        topP: 0.85,
        focusAreas: ['right_to_left', 'formal_language', 'cultural_context']
      },
      deutsch: {
        temperature: 0.15,
        topP: 0.9,
        focusAreas: ['compound_words', 'case_system', 'formal_informal']
      },
      french: {
        temperature: 0.2,
        topP: 0.9,
        focusAreas: ['gender_agreement', 'formal_register', 'liaison']
      },
      spanish: {
        temperature: 0.2,
        topP: 0.9,
        focusAreas: ['gender_agreement', 'verb_conjugation', 'regional_variants']
      },
      portuguese: {
        temperature: 0.2,
        topP: 0.9,
        focusAreas: ['gender_agreement', 'verb_conjugation', 'brazilian_portuguese']
      }
    }
  },

  // 智能检测配置
  detection: {
    minTextLength: 2,
    skipPatterns: [
      /^[\d\s\-_.,!?()\[\]{}:;"']+$/, // 纯数字和符号
      /^https?:\/\//, // URL
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 邮箱
      /^[a-zA-Z\s\-_.,!?()\[\]{}:;"']+$/, // 纯英文
      /^\s*$/, // 纯空白
      /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/, // 纯日文（可选择性跳过）
      /^[\uAC00-\uD7AF\s]+$/, // 纯韩文（可选择性跳过）
      /^\d{4}-\d{2}-\d{2}/, // 日期格式
      /^\d{2}:\d{2}/, // 时间格式
      /^v\d+\.\d+/, // 版本号
      /^#[a-fA-F0-9]{6}$/, // 颜色代码
      /^rgb\(/, // RGB颜色
      /^[A-Z_]+$/ // 全大写常量
    ],
    properNouns: [
      'GitHub', 'Material', 'MkDocs', 'JavaScript', 'Python', 'API', 'JSON', 'HTML', 'CSS',
      'Wcowin', 'GLM', 'OpenAI', 'Google', 'Microsoft', 'Apple', 'Linux', 'Windows', 'macOS',
      'React', 'Vue', 'Angular', 'Node.js', 'npm', 'yarn', 'webpack', 'TypeScript',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Firebase', 'MongoDB', 'MySQL',
      'Redis', 'Nginx', 'Apache', 'Ubuntu', 'CentOS', 'Debian', 'iOS', 'Android',
      'jQuery', 'Bootstrap', 'Sass', 'Less', 'Webpack', 'Babel', 'ESLint', 'Prettier',
      'VS Code', 'IntelliJ', 'Eclipse', 'Sublime', 'Atom', 'Vim', 'Emacs',
      'Git', 'SVN', 'Mercurial', 'Jenkins', 'Travis', 'CircleCI', 'GitLab',
      'Slack', 'Discord', 'Telegram', 'WhatsApp', 'WeChat', 'QQ', 'Skype'
    ],
    skipTags: ['script', 'style', 'noscript', 'code', 'pre', 'svg']
  },

  // 语言配置
  languages: {
    'chinese_simplified': {
      name: '简体中文',
      code: 'zh-CN',
      isDefault: true
    },
    'chinese_traditional': {
      name: '繁体中文',
      code: 'zh-TW'
    },
    'english': {
      name: 'English',
      code: 'en-US'
    },
    'korean': {
      name: '한국어',
      code: 'ko-KR'
    },
    'japanese': {
      name: '日本語',
      code: 'ja-JP'
    },
    'arabic': {
      name: 'العربية',
      code: 'ar-SA'
    },
    'deutsch': {
      name: 'Deutsch',
      code: 'de-DE'
    },
    'french': {
      name: 'Français',
      code: 'fr-FR'
    },
    'spanish': {
      name: 'Español',
      code: 'es-ES'
    },
    'portuguese': {
      name: 'Português',
      code: 'pt-BR'
    }
  },

  // UI配置
  ui: {
    showProgress: true,
    progressPosition: 'bottom-right',
    statusDuration: 2000,
    animationDuration: 300,
    theme: 'auto', // auto, light, dark
    
    // 进度显示优化配置
    progressDisplay: {
      mode: 'popup', // 'popup' | 'persistent' | 'minimal'
      updateFrequency: 25, // 每N个文本更新一次（popup模式）
      persistentPosition: 'bottom-right', // 常驻进度条位置
      showCacheRate: false, // 是否显示缓存命中率
      showSpeed: false, // 是否显示翻译速度
      autoHide: true, // 完成后是否自动隐藏
      autoHideDelay: 2000, // 自动隐藏延迟（毫秒）
      minimalThreshold: 50, // 少于此数量文本时使用简化显示
      throttleMs: 800, // 进度更新节流时间（毫秒）
      simpleStyle: true // 使用简洁样式
    }
  },

  // 调试配置
  debug: {
    enabled: false,
    logLevel: 'info', // error, warn, info, debug
    showMetrics: false,
    trackPerformance: true
  },

  // 高级功能 - 简化版本
  advanced: {
    autoDetectLanguage: true,     // 启用自动语言检测
    preserveFormatting: true,     // 保持格式
    smartBatching: false,         // 智能批处理
    adaptiveRetry: false,         // 自适应重试
    preloadCache: false,          // 启用缓存预加载
    backgroundTranslation: false, // 启用后台翻译
    intelligentCaching: false,    // 智能缓存
    contextualTranslation: false, // 上下文翻译
    qualityMonitoring: false,     // 质量监控
    performanceTracking: false,   // 性能跟踪
    errorPrediction: false,       // 错误预测
    resourceOptimization: false,  // 资源优化
    userBehaviorAnalysis: false,  // 用户行为分析
    translationMemory: false,     // 翻译记忆
    terminologyConsistency: false, // 术语一致性
    domainAdaptation: false       // 领域适应
  },

  // 系统提示词模板 - 增强版本
  prompts: {
    system: '你是一个专业的翻译引擎，专门提供高质量的中文到多语言翻译服务。请严格遵循以下要求：\n1. 准确传达原文含义，不遗漏、不添加任何内容\n2. 保持地道自然的目标语言表达，符合当地语言习惯\n3. 准确处理专业术语、技术词汇和习语表达\n4. 保持文本的语气、语体风格和情感色彩\n5. 对于标题、导航等UI元素，使用简洁准确的翻译\n6. 只返回翻译结果，不要包含任何解释或额外内容\n7. 确保翻译的一致性和连贯性\n8. 特别注意英文和日文的语法结构和表达习惯',
    
    // 上下文感知提示词 - 增强版本
    contextual: {
      technical: '这是技术文档内容，请注意保持技术术语的准确性和一致性。对于英文，使用标准的技术英语表达；对于日文，使用适当的敬语和技术用语。',
      navigation: '这是网站导航或UI元素，请使用简洁、标准的翻译。英文应简洁明了，日文应使用常见的界面用语。',
      content: '这是正文内容，请注重表达的自然流畅。英文应符合母语者的表达习惯，日文应注意敬语的使用和语序的自然性。',
      title: '这是标题文本，请使用简洁有力的表达。英文标题应遵循标题大小写规则，日文标题应简洁明了。'
    },
    
    templates: {
      short: {
        english: 'Translate the following Chinese text to natural, idiomatic English. Use proper grammar, natural word order, and appropriate terminology. For UI elements, use standard interface language: {text}',
        japanese: '以下の中国語テキストを自然で正確な日本語に翻訳してください。適切な敬語、語順、専門用語を使用し、UIエレメントには標準的なインターフェース用語を使用してください：{text}',
        korean: '다음 중국어 텍스트를 자연스럽고 정확한 한국어로 번역해주세요. 적절한 존댓말, 어순, 전문용어를 사용하고, UI 요소에는 표준 인터페이스 용어를 사용해주세요: {text}',
        arabic: 'ترجم النص الصيني التالي إلى العربية الطبيعية والدقيقة. استخدم القواعد النحوية المناسبة والترتيب الطبيعي للكلمات والمصطلحات المناسبة. لعناصر واجهة المستخدم، استخدم لغة الواجهة المعيارية: {text}',
        deutsch: 'Übersetzen Sie den folgenden chinesischen Text ins natürliche, idiomatische Deutsche. Verwenden Sie korrekte Grammatik, natürliche Wortstellung und angemessene Terminologie. Für UI-Elemente verwenden Sie Standard-Interface-Sprache: {text}',
        french: 'Traduisez le texte chinois suivant en français naturel et idiomatique. Utilisez une grammaire appropriée, un ordre des mots naturel et une terminologie appropriée. Pour les éléments d\'interface, utilisez le langage d\'interface standard: {text}',
        spanish: 'Traduce el siguiente texto chino al español natural e idiomático. Usa gramática apropiada, orden natural de palabras y terminología adecuada. Para elementos de interfaz, usa lenguaje de interfaz estándar: {text}',
        portuguese: 'Traduza o seguinte texto chinês para o português natural e idiomático. Use gramática apropriada, ordem natural das palavras e terminologia adequada. Para elementos de interface, use linguagem de interface padrão: {text}',
        other: '请将以下中文文本翻译成地道、自然的{language}，保持原文的含义和语气。对于导航/界面元素，请使用简洁标准的翻译：{text}'
      },
      long: {
        english: 'Please provide a high-quality English translation of the following Chinese text. Focus on:\n- Natural English expression and proper grammar\n- Accurate terminology and consistent usage\n- Appropriate tone and style for the context\n- Clear and readable structure\n\n{context}\n\nText to translate: {text}',
        japanese: '以下の中国語テキストを高品質な日本語に翻訳してください。以下の点に注意してください：\n- 自然な日本語表現と正しい文法\n- 正確な専門用語と一貫した使用\n- 文脈に適した敬語と文体\n- 明確で読みやすい構造\n\n{context}\n\n翻訳するテキスト：{text}',
        korean: '다음 중국어 텍스트를 고품질 한국어로 번역해주세요. 다음 사항에 주의해주세요:\n- 자연스러운 한국어 표현과 올바른 문법\n- 정확한 전문용어와 일관된 사용\n- 문맥에 적합한 존댓말과 문체\n- 명확하고 읽기 쉬운 구조\n\n{context}\n\n번역할 텍스트: {text}',
        arabic: 'يرجى تقديم ترجمة عالية الجودة للنص الصيني التالي. ركز على:\n- التعبير العربي الطبيعي والقواعد النحوية الصحيحة\n- المصطلحات الدقيقة والاستخدام المتسق\n- النبرة والأسلوب المناسبين للسياق\n- البنية الواضحة والقابلة للقراءة\n\n{context}\n\nالنص المراد ترجمته: {text}',
        deutsch: 'Bitte liefern Sie eine hochwertige deutsche Übersetzung des folgenden chinesischen Textes. Konzentrieren Sie sich auf:\n- Natürlichen deutschen Ausdruck und korrekte Grammatik\n- Genaue Terminologie und konsistente Verwendung\n- Angemessenen Ton und Stil für den Kontext\n- Klare und lesbare Struktur\n\n{context}\n\nZu übersetzender Text: {text}',
        french: 'Veuillez fournir une traduction française de haute qualité du texte chinois suivant. Concentrez-vous sur:\n- Expression française naturelle et grammaire appropriée\n- Terminologie précise et usage cohérent\n- Ton et style appropriés au contexte\n- Structure claire et lisible\n\n{context}\n\nTexte à traduire: {text}',
        spanish: 'Por favor, proporcione una traducción al español de alta calidad del siguiente texto chino. Enfóquese en:\n- Expresión española natural y gramática apropiada\n- Terminología precisa y uso consistente\n- Tono y estilo apropiados para el contexto\n- Estructura clara y legible\n\n{context}\n\nTexto a traducir: {text}',
        portuguese: 'Por favor, forneça uma tradução em português de alta qualidade do seguinte texto chinês. Foque em:\n- Expressão portuguesa natural e gramática apropriada\n- Terminologia precisa e uso consistente\n- Tom e estilo apropriados para o contexto\n- Estrutura clara e legível\n\n{context}\n\nTexto a traduzir: {text}',
        other: '请将以下中文文本翻译为准确、地道的{language}。在保证翻译质量的同时，确保表达自然流畅。请特别注意上下文和术语一致性：\n\n{context}\n\n待翻译文本：{text}'
      },
      
      // 专门的导航/标题翻译模板 - 增强版本
      navigation: {
        english: 'Translate this Chinese navigation/UI text to concise, standard English using proper interface terminology: {text}',
        japanese: 'この中国語のナビゲーション/UIテキストを、標準的なインターフェース用語を使用して簡潔な日本語に翻訳してください：{text}',
        korean: '이 중국어 내비게이션/UI 텍스트를 표준 인터페이스 용어를 사용하여 간결한 한국어로 번역해주세요: {text}',
        arabic: 'ترجم نص التنقل/واجهة المستخدم الصيني هذا إلى العربية المختصرة والمعيارية باستخدام مصطلحات الواجهة المناسبة: {text}',
        deutsch: 'Übersetzen Sie diesen chinesischen Navigations-/UI-Text ins prägnante, standardmäßige Deutsche unter Verwendung angemessener Interface-Terminologie: {text}',
        french: 'Traduisez ce texte de navigation/interface chinois en français concis et standard en utilisant la terminologie d\'interface appropriée: {text}',
        spanish: 'Traduce este texto de navegación/interfaz chino al español conciso y estándar usando terminología de interfaz apropiada: {text}',
        portuguese: 'Traduza este texto de navegação/interface chinês para o português conciso e padrão usando terminologia de interface apropriada: {text}',
        other: '请将此中文导航/界面文本翻译为简洁、标准的{language}：{text}'
      }
    },
    
    // 术语字典 - 增强版本
    terminology: {
      '旅行': {
        english: 'Travel',
        japanese: '旅行',
        korean: '여행',
        arabic: 'السفر',
        deutsch: 'Reisen',
        french: 'Voyage',
        spanish: 'Viaje',
        portuguese: 'Viagem'
      },
      '技术': {
        english: 'Technology',
        japanese: 'テクノロジー',
        korean: '기술',
        arabic: 'التكنولوجيا',
        deutsch: 'Technologie',
        french: 'Technologie',
        spanish: 'Tecnología',
        portuguese: 'Tecnologia'
      },
      '开发': {
        english: 'Development',
        japanese: '開発',
        korean: '개발',
        arabic: 'التطوير',
        deutsch: 'Entwicklung',
        french: 'Développement',
        spanish: 'Desarrollo',
        portuguese: 'Desenvolvimento'
      },
      '博客': {
        english: 'Blog',
        japanese: 'ブログ',
        korean: '블로그',
        arabic: 'المدونة',
        deutsch: 'Blog',
        french: 'Blog',
        spanish: 'Blog',
        portuguese: 'Blog'
      },
      '首页': {
        english: 'Home',
        japanese: 'ホーム',
        korean: '홈',
        arabic: 'الرئيسية',
        deutsch: 'Startseite',
        french: 'Accueil',
        spanish: 'Inicio',
        portuguese: 'Início'
      },
      '关于': {
        english: 'About',
        japanese: 'について',
        korean: '소개',
        arabic: 'حول',
        deutsch: 'Über',
        french: 'À propos',
        spanish: 'Acerca de',
        portuguese: 'Sobre'
      },
      '联系': {
        english: 'Contact',
        japanese: 'お問い合わせ',
        korean: '연락처',
        arabic: 'اتصل',
        deutsch: 'Kontakt',
        french: 'Contact',
        spanish: 'Contacto',
        portuguese: 'Contato'
      },
      '标签': {
        english: 'Tags',
        japanese: 'タグ',
        korean: '태그',
        arabic: 'العلامات',
        deutsch: 'Tags',
        french: 'Étiquettes',
        spanish: 'Etiquetas',
        portuguese: 'Tags'
      },
      '分类': {
        english: 'Categories',
        japanese: 'カテゴリー',
        korean: '카테고리',
        arabic: 'الفئات',
        deutsch: 'Kategorien',
        french: 'Catégories',
        spanish: 'Categorías',
        portuguese: 'Categorias'
      },
      '搜索': {
        english: 'Search',
        japanese: '検索',
        korean: '검색',
        arabic: 'البحث',
        deutsch: 'Suche',
        french: 'Recherche',
        spanish: 'Buscar',
        portuguese: 'Pesquisar'
      },
      '文档': {
        english: 'Documentation',
        japanese: 'ドキュメント',
        korean: '문서',
        arabic: 'الوثائق',
        deutsch: 'Dokumentation',
        french: 'Documentation',
        spanish: 'Documentación',
        portuguese: 'Documentação'
      },
      '教程': {
        english: 'Tutorial',
        japanese: 'チュートリアル',
        korean: '튜토리얼',
        arabic: 'البرنامج التعليمي',
        deutsch: 'Tutorial',
        french: 'Tutoriel',
        spanish: 'Tutorial',
        portuguese: 'Tutorial'
      },
      '工具': {
        english: 'Tools',
        japanese: 'ツール',
        korean: '도구',
        arabic: 'الأدوات',
        deutsch: 'Werkzeuge',
        french: 'Outils',
        spanish: 'Herramientas',
        portuguese: 'Ferramentas'
      },
      '项目': {
        english: 'Projects',
        japanese: 'プロジェクト',
        korean: '프로젝트',
        arabic: 'المشاريع',
        deutsch: 'Projekte',
        french: 'Projets',
        spanish: 'Proyectos',
        portuguese: 'Projetos'
      },
      '学术': {
        english: 'Academic',
        japanese: '学術',
        korean: '학술',
        arabic: 'الأكاديمي',
        deutsch: 'Akademisch',
        french: 'Académique',
        spanish: 'Académico',
        portuguese: 'Acadêmico'
      },
      '笔记': {
        english: 'Notes',
        japanese: 'ノート',
        korean: '노트',
        arabic: 'الملاحظات',
        deutsch: 'Notizen',
        french: 'Notes',
        spanish: 'Notas',
        portuguese: 'Notas'
      }
    }
  },



  // 错误处理配置 - 增强版本
  errorHandling: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
    fallbackToCache: true,
    gracefulDegradation: true,
    userNotification: true,
    errorRecovery: {
      autoRestore: true,        // 自动恢复
      partialTranslation: true, // 部分翻译保留
      fallbackLanguage: 'english', // 备用语言
      maxFailureRate: 0.3       // 最大失败率
    },

  },

  // 安全配置 - 增强版本
  security: {
    requireHttps: true,
    validateApiKey: true,
    sanitizeInput: true,
    rateLimiting: {
      enabled: true,
      maxRequestsPerMinute: 60,
      maxRequestsPerHour: 1000,
      adaptiveThrottling: true
    },
    inputValidation: {
      maxTextLength: 10000,
      allowedCharacters: /^[\s\S]*$/,
      blockMaliciousPatterns: true
    },
    outputValidation: {
      sanitizeHtml: true,
      validateEncoding: true,
      checkContentIntegrity: true
    }
  },

  // 生成缓存键
  generateCacheKey: function(text, targetLang) {
    const textHash = this.simpleHash(text.slice(0, 100));
    return `${textHash}_${targetLang}`;
  },

  // 简单哈希函数
  simpleHash: function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return Math.abs(hash).toString(36);
  },


};

// 配置验证函数 - 增强版本
window.GLM_CONFIG.validate = function() {
  const errors = [];
  const warnings = [];
  
  // 验证API配置
  if (!this.api.endpoint) {
    errors.push('API endpoint is required');
  }
  
  if (!this.api.model) {
    errors.push('API model is required');
  }
  
  // 验证性能配置
  if (this.performance.batchSize < 1 || this.performance.batchSize > 50) {
    errors.push('Batch size must be between 1 and 50');
  }
  
  if (this.performance.maxConcurrent < 1 || this.performance.maxConcurrent > 15) {
    errors.push('Max concurrent requests must be between 1 and 15');
  }
  
  // 验证质量配置
  if (this.quality.temperature < 0 || this.quality.temperature > 2) {
    warnings.push('Temperature should be between 0 and 2 for optimal results');
  }
  
  if (this.quality.topP < 0 || this.quality.topP > 1) {
    errors.push('Top P must be between 0 and 1');
  }
  
  // 验证术语字典
  if (!this.prompts.terminology || Object.keys(this.prompts.terminology).length === 0) {
    warnings.push('No terminology dictionary configured');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings
  };
};

// 获取语言配置 - 增强版本
window.GLM_CONFIG.getLanguage = function(langCode) {
  return this.languages[langCode] || null;
};

// 获取所有支持的语言
window.GLM_CONFIG.getSupportedLanguages = function() {
  return Object.keys(this.languages);
};

// 获取语言特定的优化配置
window.GLM_CONFIG.getLanguageOptimization = function(langCode) {
  return this.quality.languageSpecificOptimization[langCode] || {};
};

// 检查语言是否需要特殊处理
window.GLM_CONFIG.requiresSpecialHandling = function(langCode) {
  const specialLanguages = ['japanese', 'korean', 'arabic'];
  return specialLanguages.includes(langCode);
};

// 获取语言特定的规则
window.GLM_CONFIG.getLanguageRules = function(langCode) {
  return this.advanced.languageSpecificRules[langCode] || {};
};

// 检查是否应该跳过翻译 - 增强版本
window.GLM_CONFIG.shouldSkipTranslation = function(text, targetLang = null) {
  if (!text || text.length < this.detection.minTextLength) {
    return true;
  }
  
  const trimmedText = text.trim();
  
  // 检查跳过模式
  for (const pattern of this.detection.skipPatterns) {
    if (pattern.test(trimmedText)) {
      return true;
    }
  }
  
  // 检查专有名词
  for (const noun of this.detection.properNouns) {
    if (trimmedText.includes(noun)) {
      return true;
    }
  }
  
  // 语言特定的跳过规则
  if (targetLang) {
    // 如果目标语言是英文，跳过已经是英文的文本
    if (targetLang === 'english' && /^[a-zA-Z\s\-_.,!?()\[\]{}:;"']+$/.test(trimmedText)) {
      return true;
    }
    
    // 如果目标语言是日文，跳过已经是日文的文本
    if (targetLang === 'japanese' && /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s\-_.,!?()\[\]{}:;"']+$/.test(trimmedText)) {
      return true;
    }
  }
  
  return false;
};

// 生成提示词 - 增强版本
window.GLM_CONFIG.generatePrompt = function(text, targetLang, context = 'content') {
  const isEnglish = targetLang === 'english';
  const isJapanese = targetLang === 'japanese';
  const isShort = text.length < 30;
  
  // 检查是否为导航/UI元素
  const isNavigation = this.isNavigationText(text) || context === 'navigation';
  
  // 选择合适的模板
  let template;
  if (isNavigation) {
    template = this.prompts.templates.navigation;
  } else {
    template = isShort ? this.prompts.templates.short : this.prompts.templates.long;
  }
  
  // 检查术语字典
  const terminologyHint = this.getTerminologyHint(text, targetLang);
  
  if (isEnglish) {
    let prompt = template.english.replace('{text}', text);
    if (!isNavigation && !isShort) {
      const contextHint = this.prompts.contextual[context] || '';
      prompt = prompt.replace('{context}', contextHint + terminologyHint);
    }
    return prompt;
  } else if (isJapanese) {
    let prompt = template.japanese.replace('{text}', text);
    if (!isNavigation && !isShort) {
      const contextHint = this.prompts.contextual[context] || '';
      prompt = prompt.replace('{context}', contextHint + terminologyHint);
    }
    return prompt;
  } else {
    const languageName = this.getLanguage(targetLang)?.name || targetLang;
    let prompt = template.other.replace('{language}', languageName).replace('{text}', text);
    if (!isNavigation && !isShort) {
      const contextHint = this.prompts.contextual[context] || '';
      prompt = prompt.replace('{context}', contextHint + terminologyHint);
    }
    return prompt;
  }
};

// 检查是否为导航文本 - 增强版本
window.GLM_CONFIG.isNavigationText = function(text) {
  const navigationKeywords = [
    '技术', '开发', '博客', '旅行', '关于', '首页', '联系', '标签', '分类',
    '搜索', '文档', '教程', '工具', '项目', '学术', '笔记', '导航', '菜单',
    '设置', '帮助', '支持', '反馈', '登录', '注册', '退出', '个人中心'
  ];
  return navigationKeywords.some(keyword => text.includes(keyword)) && text.length < 25;
};

// 获取术语提示 - 增强版本
window.GLM_CONFIG.getTerminologyHint = function(text, targetLang) {
  const foundTerms = [];
  
  Object.keys(this.prompts.terminology).forEach(term => {
    if (text.includes(term)) {
      const translation = this.prompts.terminology[term][targetLang];
      if (translation) {
        foundTerms.push(`"${term}" -> "${translation}"`);
      }
    }
  });
  
  if (foundTerms.length > 0) {
    if (targetLang === 'english') {
      return `\n\nTerminology reference: ${foundTerms.join(', ')}`;
    } else if (targetLang === 'japanese') {
      return `\n\n用語参考：${foundTerms.join('、')}`;
    } else {
      return `\n\n术语参考：${foundTerms.join(', ')}`;
    }
  }
  
  return '';
};

// 获取最优API参数 - 语言特定优化版本
window.GLM_CONFIG.getOptimalParams = function(textLength, targetLang = null) {
  const baseTokens = Math.max(Math.floor(textLength * this.quality.maxTokensMultiplier), 30);
  const maxTokens = Math.min(baseTokens, 1000); // 增加最大token数以提高质量
  
  // 基础参数
  let params = {
    temperature: this.quality.temperature,
    max_tokens: maxTokens,
    top_p: this.quality.topP,
    frequency_penalty: this.quality.frequencyPenalty,
    presence_penalty: this.quality.presencePenalty,
    stream: this.quality.streamResponse || false
  };
  
  // 语言特定优化
  if (targetLang && this.quality.languageSpecificOptimization[targetLang]) {
    const langConfig = this.quality.languageSpecificOptimization[targetLang];
    params.temperature = langConfig.temperature;
    params.top_p = langConfig.topP;
  }
  
  return params;
};

// 获取高速模式参数
window.GLM_CONFIG.getFastModeParams = function(textLength) {
  return {
    temperature: 0.01,  // 极低温度
    max_tokens: Math.min(Math.floor(textLength * 1.2), 500), // 更少的token
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false
  };
};

// 批量优化参数
window.GLM_CONFIG.getBatchOptimization = function() {
  return {
    batchSize: this.performance.fastMode ? 
               Math.min(this.performance.batchSize * 1.5, 35) : 
               this.performance.batchSize,
    maxConcurrent: this.performance.fastMode ? 
                   Math.min(this.performance.maxConcurrent * 1.2, 15) : 
                   this.performance.maxConcurrent,
    timeout: this.performance.fastMode ? 
             this.api.timeout * 0.7 : 
             this.api.timeout
  };
};

// 简化缓存管理
window.GLM_CONFIG.getCacheStrategy = function(textLength, complexity) {
  return {
    ttl: this.performance.cacheMaxAge,
    compress: this.performance.cacheCompression,
    persistent: this.performance.persistentCache
  };
};





// 生成缓存键
window.GLM_CONFIG.generateCacheKey = function(text, targetLang) {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, ' ');
  return btoa(encodeURIComponent(normalized + '|' + targetLang)).replace(/[+/=]/g, '');
};

// 简化超时计算
window.GLM_CONFIG.getAdaptiveTimeout = function(textLength, complexity) {
  return this.api.timeout;
};



// 日志记录函数
window.GLM_CONFIG.log = function(level, message, ...args) {
  if (!this.debug.enabled) return;
  
  const levels = ['error', 'warn', 'info', 'debug'];
  const currentLevelIndex = levels.indexOf(this.debug.logLevel);
  const messageLevelIndex = levels.indexOf(level);
  
  if (messageLevelIndex <= currentLevelIndex) {
    const timestamp = new Date().toISOString();
    console[level](`[GLM-Translate ${timestamp}]`, message, ...args);
  }
};

// 初始化配置
window.GLM_CONFIG.init = function() {
  const validation = this.validate();
  if (!validation.isValid) {
    console.error('GLM配置验证失败:', validation.errors);
    return false;
  }
  
  this.log('info', '智谱清言翻译配置初始化完成');
  return true;
};

// 自动初始化
if (typeof window !== 'undefined') {
  window.GLM_CONFIG.init();
}
