/**
 * 智谱清言翻译系统配置文件 - 高性能简化版
 * 专注于核心功能，删除冗余配置
 * 版本: 2.1.0
 */

window.GLM_CONFIG = {
  // 基本信息
  version: '2.1.0',
  
  // API配置
  api: {
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash',
    timeout: 5000,
    maxRetries: 2,
    retryDelay: 500
  },

  // 性能配置
  performance: {
    batchSize: 20,
    maxConcurrent: 8,
    cacheEnabled: true,
    cacheMaxAge: 24 * 60 * 60 * 1000, // 1天
    maxCacheSize: 2000,
    fastMode: true
  },

  // 翻译质量配置
  quality: {
    temperature: 0.1,
    topP: 0.9,
    maxTokensMultiplier: 2.0
  },

  // 文本检测配置
  detection: {
    minTextLength: 2,
    skipTags: ['script', 'style', 'noscript', 'pre', 'kbd', 'samp', 'var'],
    // 跳过的元素选择器
    skipSelectors: [
      'script', 'style', 'noscript', 'iframe', 'object', 'embed',
      'svg', 'canvas', 'audio', 'video', 'source', 'track',
      '.no-translate', '[data-no-translate]', '[translate="no"]',
      '.highlight', '.codehilite', '.code-block', 'pre code', 'pre',
      '.language-*', '[class*="language-"]', '[class*="lang-"]',
      'kbd', 'samp', 'var', 'tt',
      '.math', '.katex', '.MathJax', '.tex',
      '.mermaid', '.diagram', '.flowchart',
      'input', 'textarea', 'select', 'button',
      '[contenteditable="false"]', '.readonly',
      '.highlight-source', '.highlight-code', '.code-snippet',
      '.markdown-code', '.md-code', '.source-code',
      // 代码块表格结构相关
      '.highlighttable', '.highlighttable *', '.linenos', '.linenos *',
      '.linenodiv', '.linenodiv *', 'table.highlighttable',
      'table.highlighttable td', 'table.highlighttable tr',
      // 代码行号链接
      'a[href*="__codelineno"]', 'a[id*="__codelineno"]', 'a[name*="__codelineno"]',
      // 更多代码相关选择器
      '.highlight pre', '.highlight code', '.codehilite pre', '.codehilite code',
      // 代码高亮span元素（排除导航栏）
      '.highlight span:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      '.codehilite span:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'code span:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      'span.nt:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.p:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.w:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.l:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.c1:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.s:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      'span.l-Scalar:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'span.p-Indicator:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      // 更全面的代码块选择器（排除导航栏）
      '.highlight *:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      '.codehilite *:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      'pre *:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      // 特定的代码高亮类（排除导航栏）
      '[class*="highlight"]:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      '[class*="codehilite"]:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      '[class*="language-"] *:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)', 
      '[class*="lang-"] *:not(.md-ellipsis):not(.md-tabs *):not(.md-nav *)',
      // 特殊跳过：语言选择器和某些UI元素
      '.md-select', '.md-footer-copyright', '.footer-highlight',
      // 页脚相关元素
      '.footer-wrapper', '.footer-wrapper *', '.footer-content', '.footer-content *',
      '.footer-visit-count', '.footer-visit-count *', '.footer-visit-count-mobile', '.footer-visit-count-mobile *',
      '.footer-item', '.footer-item *', '.footer-bottom-section', '.footer-bottom-section *',
      '.footer-social', '.footer-social *', '.md-social', '.md-social *',
      '.runtime-info', '.runtime-info *', '.icp-link', '.icp-link *'
    ]
  },

  // 检查元素是否应该翻译
  shouldTranslateText: function(element, text) {
    if (!text || text.trim().length === 0) {
      return false;
    }
    
    const trimmedText = text.trim();
    const hasChinese = /[\u4e00-\u9fff]/.test(trimmedText);
    
    // 检查是否为版权信息或其他不应翻译的内容
    if (/^Copyright\s*©|^©\s*\d{4}|^Made\s+with|^Powered\s+by|^\d{4}-\d{4}\s+\w+/i.test(trimmedText)) {
      console.log(`⏭️ 跳过版权信息: ${trimmedText}`);
      return false;
    }
    
    // 检查是否在页脚区域内
    if (element.closest && (
      element.closest('.footer-wrapper') ||
      element.closest('.footer-content') ||
      element.closest('.footer-bottom-section') ||
      element.closest('.md-footer-copyright') ||
      element.closest('.footer-social') ||
      element.closest('.md-social')
    )) {
      console.log(`⏭️ 跳过页脚区域内容: ${trimmedText}`);
      return false;
    }
    
    // 对于包含中文的导航栏和UI元素，优先允许翻译
    if (hasChinese) {
      // 检查元素本身或父元素是否为导航栏相关
      const isNavElement = element.classList && (
        element.classList.contains('md-ellipsis') ||
        element.classList.contains('md-tabs__link') ||
        element.classList.contains('md-nav__link') ||
        element.classList.contains('md-nav__item')
      );
      
      const isInNavContainer = element.closest && (
        element.closest('.md-tabs') ||
        element.closest('.md-nav') ||
        element.closest('.md-sidebar') ||
        element.closest('.md-header') ||
        element.closest('nav')
      );
      
      // 检查是否为列表项或标题元素
      const tagName = element.tagName ? element.tagName.toLowerCase() : '';
      const isListOrHeading = ['ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName);
      
      // 检查是否为span或a标签在导航区域内
      const isNavText = ['span', 'a', 'div'].includes(tagName) && isInNavContainer;
      
      if (isNavElement || isInNavContainer || isListOrHeading || isNavText) {
        console.log(`✅ 导航/UI元素包含中文，允许翻译: ${trimmedText.slice(0, 30)}... (${tagName})`);
        return true;
      }
    }
    
    // 检查元素标签（特殊处理code标签）
    const tagName = element.tagName ? element.tagName.toLowerCase() : '';
    if (this.detection.skipTags.includes(tagName)) {
      console.log(`⏭️ 跳过标签: ${tagName}`);
      return false;
    }
    
    // 特殊处理code标签：如果包含中文则允许翻译
    if (tagName === 'code' && hasChinese) {
      // 检查是否为纯代码内容（包含特殊字符、英文关键词等）
      const codePattern = /^[\w\s\-_\.\(\)\[\]\{\}\<\>\=\+\*\/\\\|\&\%\$\#\@\!\?\:;,"'`~]+$/;
      if (!codePattern.test(trimmedText)) {
        console.log(`✅ Code标签包含中文，允许翻译: ${trimmedText.slice(0, 30)}...`);
        return true;
      }
    }
    
    // 检查元素属性
    if (element.hasAttribute && (
      element.hasAttribute('data-no-translate') ||
      element.hasAttribute('translate') && element.getAttribute('translate') === 'no' ||
      element.classList && element.classList.contains('no-translate')
    )) {
      console.log(`⏭️ 跳过属性标记的元素: ${tagName}`);
      return false;
    }
    
    // 检查代码行号链接
    if (element.tagName && element.tagName.toLowerCase() === 'a') {
      const href = element.getAttribute('href');
      const id = element.getAttribute('id');
      const name = element.getAttribute('name');
      if ((href && href.includes('__codelineno')) || 
          (id && id.includes('__codelineno')) ||
          (name && name.includes('__codelineno'))) {
        console.log(`⏭️ 跳过代码行号链接: ${href || id || name}`);
        return false;
      }
    }
    
    // 检查是否匹配跳过选择器
    if (this.detection.skipSelectors) {
      for (const selector of this.detection.skipSelectors) {
        try {
          // 处理通配符选择器
          if (selector.includes('*')) {
            const pattern = selector.replace(/\*/g, '.*');
            const regex = new RegExp(pattern);
            if (element.className && regex.test(element.className)) {
              console.log(`⏭️ 跳过通配符选择器匹配: ${selector}`);
              return false;
            }
          } else if (element.matches && element.matches(selector)) {
            console.log(`⏭️ 跳过选择器匹配: ${selector}`);
            return false;
          }
        } catch (e) {
          // 忽略无效的选择器
          continue;
        }
      }
    }
    
    // 检查父元素是否为代码块或其他跳过元素
    let parent = element.parentElement;
    while (parent) {
      const parentTag = parent.tagName ? parent.tagName.toLowerCase() : '';
      if (['pre', 'script', 'style'].includes(parentTag)) {
        console.log(`⏭️ 跳过代码相关父元素: ${parentTag}`);
        return false;
      }
      
      // 特殊处理code父元素：如果当前元素包含中文则允许翻译
      if (parentTag === 'code' && !hasChinese) {
        console.log(`⏭️ 跳过code父元素（无中文）: ${parentTag}`);
        return false;
      }
      
      // 检查父元素的类名和属性（但排除导航栏父元素）
      const isNavParent = parent.closest && (
        parent.closest('.md-tabs') ||
        parent.closest('.md-nav') ||
        parent.closest('.md-header') ||
        parent.classList.contains('md-ellipsis') ||
        parent.classList.contains('md-tabs__link') ||
        parent.classList.contains('md-nav__link')
      );
      
      if (!isNavParent && parent.classList && (
        parent.classList.contains('highlight') ||
        parent.classList.contains('codehilite') ||
        parent.classList.contains('code-block') ||
        parent.classList.contains('no-translate') ||
        parent.classList.contains('highlight-source') ||
        parent.classList.contains('highlight-code') ||
        parent.classList.contains('code-snippet') ||
        parent.classList.contains('markdown-code') ||
        parent.classList.contains('md-code') ||
        parent.classList.contains('source-code') ||
        parent.classList.contains('highlighttable') ||
        parent.classList.contains('linenos') ||
        parent.classList.contains('linenodiv')
      )) {
        console.log(`⏭️ 跳过代码相关父元素类: ${parent.className}`);
        return false;
      }
      
      // 检查是否为代码块表格结构
      if (parent.tagName && parent.tagName.toLowerCase() === 'table' && 
          parent.classList && parent.classList.contains('highlighttable')) {
        console.log(`⏭️ 跳过代码块表格结构`);
        return false;
      }
      
      // 检查是否为代码行号相关的td元素
      if (parent.tagName && parent.tagName.toLowerCase() === 'td' && 
          (parent.classList.contains('linenos') || parent.classList.contains('code'))) {
        console.log(`⏭️ 跳过代码行号td元素`);
        return false;
      }
      
      // 检查父元素是否有语言相关的类名（但排除导航栏）
      if (parent.className && !isNavParent) {
        const className = parent.className;
        if (/language-|lang-/.test(className)) {
          console.log(`⏭️ 跳过语言相关类名: ${className}`);
          return false;
        }
      }
      
      // 检查是否为span元素且在代码块内（但排除导航栏span）
      if (parent.tagName && parent.tagName.toLowerCase() === 'span') {
        const spanClasses = parent.className || '';
        const isNavSpan = parent.closest && (
          parent.closest('.md-tabs') ||
          parent.closest('.md-nav') ||
          parent.closest('.md-header') ||
          parent.classList.contains('md-ellipsis')
        );
        
        if (!isNavSpan && /\b(nt|p|w|l|c1|s)\b/.test(spanClasses)) {
          console.log(`⏭️ 跳过代码高亮span: ${spanClasses}`);
          return false;
        }
      }
      
      parent = parent.parentElement;
    }
    
    return true;
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
    system: '你是专业翻译助手。只返回翻译结果，不要返回提示词、解释或其他内容。',
    
    // 上下文感知提示词 - 增强版本
    contextual: {
      technical: '这是技术文档内容，请注意保持技术术语的准确性和一致性。对于英文，使用标准的技术英语表达，避免口语化；对于日文，使用适当的敬语和专业技术用语，保持正式文体。',
      navigation: '这是网站导航或UI元素，请使用简洁、标准的翻译。英文应简洁明了，符合国际化界面标准；日文应使用常见的界面用语，保持简洁性。',
      content: '这是正文内容，请注重表达的自然流畅。英文应符合母语者的表达习惯，使用自然的语序和词汇选择；日文应注意敬语的使用和语序的自然性，避免直译。',
      title: '这是标题文本，请使用简洁有力的表达。英文标题应遵循标题大小写规则，使用动词原形或名词短语；日文标题应简洁明了，突出重点。',
      blog: '这是博客文章内容，请保持轻松自然的语调。英文应使用conversational tone，适当使用缩写和口语表达；日文应使用丁宁语，保持亲切感。',
      academic: '这是学术内容，请使用正式、严谨的表达。英文应使用academic writing style，避免缩写和口语；日文应使用敬语和正式表达，保持学术性。'
    },
    
    templates: {
        short: {
          english: 'Translate to natural English: {text}',
          japanese: '日本語に翻訳: {text}',
        korean: '한국어로 번역: {text}',
          arabic: 'ترجم إلى العربية: {text}',
        deutsch: 'Ins Deutsche übersetzen: {text}',
          french: 'Traduire en français: {text}',
        spanish: 'Traducir al español: {text}',
        portuguese: 'Traduzir para português: {text}',
        other: '请将以下中文文本翻译成地道、自然的{language}，保持原文的含义和语气。对于导航/界面元素，请使用简洁标准的翻译。重要：如果看到PROTECTED_TECH_1、PROTECTED_CUSTOM_2等占位符，请保持原样，不要翻译或修改这些占位符：{text}'
      },
      long: {
        english: 'Please provide a high-quality English translation of the following Chinese text. Focus on:\n- Natural English expression and proper grammar, avoiding Chinese-style syntax\n- Accurate terminology and consistent usage throughout the text\n- Appropriate tone and style for the context and target audience\n- Clear and readable structure with proper flow\n- Cultural adaptation where necessary\n- Professional language for technical content\n\nIMPORTANT: If you see placeholders like PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3, etc., keep them exactly as they are - do not translate or modify these placeholders. They represent protected technical terms that will be restored later.\n\n{context}\n\nText to translate: {text}',
        japanese: '以下の中国語テキストを高品質な日本語に翻訳してください。以下の点に注意してください：\n- 自然な日本語表現と正しい文法、中国語的な表現の回避\n- 正確な専門用語と一貫した使用\n- 文脈に適した敬語と文体の選択\n- 明確で読みやすい構造と自然な文章の流れ\n- 日本の文化的背景に適した表現\n- 技術的内容には専門的な言語使用\n\n重要：PROTECTED_TECH_1、PROTECTED_CUSTOM_2、PROTECTED_FORMAT_3などのプレースホルダーが表示された場合は、そのまま保持してください。翻訳や変更はしないでください。これらは後で復元される保護された技術用語を表しています。\n\n{context}\n\n翻訳するテキスト：{text}',
        korean: '다음 중국어 텍스트를 고품질 한국어로 번역해주세요. 다음 사항에 주의해주세요:\n- 자연스러운 한국어 표현과 올바른 문법, 중국어식 표현 회피\n- 정확한 전문용어와 일관된 사용\n- 문맥에 적합한 존댓말과 문체 선택\n- 명확하고 읽기 쉬운 구조와 자연스러운 문장 흐름\n- 한국 문화적 배경에 적합한 표현\n- 기술적 내용에는 전문적인 언어 사용\n\n중요: PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3 등의 플레이스홀더가 보이면 그대로 유지하세요. 번역하거나 수정하지 마세요. 이들은 나중에 복원될 보호된 기술 용어를 나타냅니다.\n\n{context}\n\n번역할 텍스트: {text}',
        arabic: 'يرجى تقديم ترجمة عالية الجودة للنص الصيني التالي. ركز على:\n- التعبير العربي الطبيعي والقواعد النحوية الصحيحة\n- المصطلحات الدقيقة والاستخدام المتسق\n- النبرة والأسلوب المناسبين للسياق\n- البنية الواضحة والقابلة للقراءة\n\nمهم: إذا رأيت عناصر نائبة مثل PROTECTED_TECH_1، PROTECTED_CUSTOM_2، PROTECTED_FORMAT_3، احتفظ بها كما هي ولا تترجمها أو تعدلها. إنها تمثل مصطلحات تقنية محمية سيتم استعادتها لاحقاً.\n\n{context}\n\nالنص المراد ترجمته: {text}',
        deutsch: 'Bitte liefern Sie eine hochwertige deutsche Übersetzung des folgenden chinesischen Textes. Konzentrieren Sie sich auf:\n- Natürlichen deutschen Ausdruck und korrekte Grammatik\n- Genaue Terminologie und konsistente Verwendung\n- Angemessenen Ton und Stil für den Kontext\n- Klare und lesbare Struktur\n\nWICHTIG: Wenn Sie Platzhalter wie PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3 sehen, behalten Sie diese genau bei - übersetzen oder ändern Sie diese Platzhalter nicht. Sie repräsentieren geschützte technische Begriffe, die später wiederhergestellt werden.\n\n{context}\n\nZu übersetzender Text: {text}',
        french: 'Veuillez fournir une traduction française de haute qualité du texte chinois suivant. Concentrez-vous sur:\n- Expression française naturelle et grammaire appropriée\n- Terminologie précise et usage cohérent\n- Ton et style appropriés au contexte\n- Structure claire et lisible\n\nIMPORTANT: Si vous voyez des espaces réservés comme PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3, gardez-les exactement tels qu\'ils sont - ne traduisez pas ou ne modifiez pas ces espaces réservés. Ils représentent des termes techniques protégés qui seront restaurés plus tard.\n\n{context}\n\nTexte à traduire: {text}',
        spanish: 'Por favor, proporcione una traducción al español de alta calidad del siguiente texto chino. Enfóquese en:\n- Expresión española natural y gramática apropiada\n- Terminología precisa y uso consistente\n- Tono y estilo apropiados para el contexto\n- Estructura clara y legible\n\nIMPORTANTE: Si ve marcadores como PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3, manténgalos exactamente como están - no traduzca o modifique estos marcadores. Representan términos técnicos protegidos que serán restaurados más tarde.\n\n{context}\n\nTexto a traducir: {text}',
        portuguese: 'Por favor, forneça uma tradução em português de alta qualidade do seguinte texto chinês. Foque em:\n- Expressão portuguesa natural e gramática apropriada\n- Terminologia precisa e uso consistente\n- Tom e estilo apropriados para o contexto\n- Estrutura clara e legível\n\nIMPORTANTE: Se você ver marcadores como PROTECTED_TECH_1, PROTECTED_CUSTOM_2, PROTECTED_FORMAT_3, mantenha-os exatamente como estão - não traduza ou modifique esses marcadores. Eles representam termos técnicos protegidos que serão restaurados mais tarde.\n\n{context}\n\nTexto a traduzir: {text}',
        other: '请将以下中文文本翻译为准确、地道的{language}。在保证翻译质量的同时，确保表达自然流畅。请特别注意上下文和术语一致性。\n\n重要：如果看到PROTECTED_TECH_1、PROTECTED_CUSTOM_2、PROTECTED_FORMAT_3等占位符，请保持原样，不要翻译或修改这些占位符。它们代表受保护的技术术语，稍后会被恢复。\n\n{context}\n\n待翻译文本：{text}'
      },
      
      // 专门的导航/标题翻译模板 - 增强版本
      navigation: {
        english: 'Translate this Chinese navigation/UI text to concise, standard English using proper interface terminology. Follow international web standards and maintain consistency with standard interface terminology. Avoid verbose expressions. IMPORTANT: Keep any placeholders like PROTECTED_TECH_1, PROTECTED_CUSTOM_2 exactly as they are: {text}',
        japanese: 'この中国語のナビゲーション/UIテキストを、標準的なインターフェース用語を使用して簡潔な日本語に翻訳してください。国際的なWeb標準に従い、標準的なインターフェース用語との一貫性を保ってください。冗長な表現は避けてください。重要：PROTECTED_TECH_1、PROTECTED_CUSTOM_2などのプレースホルダーはそのまま保持してください：{text}',
        korean: '이 중국어 내비게이션/UI 텍스트를 표준 인터페이스 용어를 사용하여 간결한 한국어로 번역해주세요. 국제적인 웹 표준을 따르며, 표준 인터페이스 용어와의 일관성을 유지해주세요. 장황한 표현은 피해주세요. 중요: PROTECTED_TECH_1, PROTECTED_CUSTOM_2 등의 플레이스홀더는 그대로 유지하세요: {text}',
        arabic: 'ترجم نص التنقل/واجهة المستخدم الصيني هذا إلى العربية المختصرة والمعيارية باستخدام مصطلحات الواجهة المناسبة. مهم: احتفظ بأي عناصر نائبة مثل PROTECTED_TECH_1، PROTECTED_CUSTOM_2 كما هي: {text}',
        deutsch: 'Übersetzen Sie diesen chinesischen Navigations-/UI-Text ins prägnante, standardmäßige Deutsche unter Verwendung angemessener Interface-Terminologie. WICHTIG: Behalten Sie alle Platzhalter wie PROTECTED_TECH_1, PROTECTED_CUSTOM_2 genau bei: {text}',
        french: 'Traduisez ce texte de navigation/interface chinois en français concis et standard en utilisant la terminologie d\'interface appropriée. IMPORTANT: Gardez tous les espaces réservés comme PROTECTED_TECH_1, PROTECTED_CUSTOM_2 exactement tels qu\'ils sont: {text}',
        spanish: 'Traduce este texto de navegación/interfaz chino al español conciso y estándar usando terminología de interfaz apropiada. IMPORTANTE: Mantén todos los marcadores como PROTECTED_TECH_1, PROTECTED_CUSTOM_2 exactamente como están: {text}',
        portuguese: 'Traduza este texto de navegação/interface chinês para o português conciso e padrão usando terminologia de interface apropriada. IMPORTANTE: Mantenha todos os marcadores como PROTECTED_TECH_1, PROTECTED_CUSTOM_2 exatamente como estão: {text}',
        other: '请将此中文导航/界面文本翻译为简洁、标准的{language}。重要：保持所有PROTECTED_TECH_1、PROTECTED_CUSTOM_2等占位符原样：{text}'
      }
    },
    
    // 术语字典 - 增强版本
    terminology: {
      '旅行': {
        english: 'Travel',
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
      },
      // 技术术语扩展
      '人工智能': {
        english: 'Artificial Intelligence',
        japanese: '人工知能',
        korean: '인공지능',
        arabic: 'الذكاء الاصطناعي',
        deutsch: 'Künstliche Intelligenz',
        french: 'Intelligence Artificielle',
        spanish: 'Inteligencia Artificial',
        portuguese: 'Inteligência Artificial'
      },
      '机器学习': {
        english: 'Machine Learning',
        japanese: '機械学習',
        korean: '머신러닝',
        arabic: 'تعلم الآلة',
        deutsch: 'Maschinelles Lernen',
        french: 'Apprentissage Automatique',
        spanish: 'Aprendizaje Automático',
        portuguese: 'Aprendizado de Máquina'
      },
      '深度学习': {
        english: 'Deep Learning',
        japanese: 'ディープラーニング',
        korean: '딥러닝',
        arabic: 'التعلم العميق',
        deutsch: 'Deep Learning',
        french: 'Apprentissage Profond',
        spanish: 'Aprendizaje Profundo',
        portuguese: 'Aprendizado Profundo'
      },
      '神经网络': {
        english: 'Neural Network',
        japanese: 'ニューラルネットワーク',
        korean: '신경망',
        arabic: 'الشبكة العصبية',
        deutsch: 'Neuronales Netzwerk',
        french: 'Réseau de Neurones',
        spanish: 'Red Neuronal',
        portuguese: 'Rede Neural'
      },
      '数据库': {
        english: 'Database',
        japanese: 'データベース',
        korean: '데이터베이스',
        arabic: 'قاعدة البيانات',
        deutsch: 'Datenbank',
        french: 'Base de Données',
        spanish: 'Base de Datos',
        portuguese: 'Banco de Dados'
      },
      '云计算': {
        english: 'Cloud Computing',
        japanese: 'クラウドコンピューティング',
        korean: '클라우드 컴퓨팅',
        arabic: 'الحوسبة السحابية',
        deutsch: 'Cloud Computing',
        french: 'Informatique en Nuage',
        spanish: 'Computación en la Nube',
        portuguese: 'Computação em Nuvem'
      },
      '区块链': {
        english: 'Blockchain',
        japanese: 'ブロックチェーン',
        korean: '블록체인',
        arabic: 'البلوك تشين',
        deutsch: 'Blockchain',
        french: 'Blockchain',
        spanish: 'Blockchain',
        portuguese: 'Blockchain'
      },
      '物联网': {
        english: 'Internet of Things',
        japanese: 'モノのインターネット',
        korean: '사물인터넷',
        arabic: 'إنترنت الأشياء',
        deutsch: 'Internet der Dinge',
        french: 'Internet des Objets',
        spanish: 'Internet de las Cosas',
        portuguese: 'Internet das Coisas'
      },
      '大数据': {
        english: 'Big Data',
        japanese: 'ビッグデータ',
        korean: '빅데이터',
        arabic: 'البيانات الضخمة',
        deutsch: 'Big Data',
        french: 'Mégadonnées',
        spanish: 'Big Data',
        portuguese: 'Big Data'
      },
      '网络安全': {
        english: 'Cybersecurity',
        japanese: 'サイバーセキュリティ',
        korean: '사이버보안',
        arabic: 'الأمن السيبراني',
        deutsch: 'Cybersicherheit',
        french: 'Cybersécurité',
        spanish: 'Ciberseguridad',
        portuguese: 'Cibersegurança'
      },
      '虚拟现实': {
        english: 'Virtual Reality',
        japanese: 'バーチャルリアリティ',
        korean: '가상현실',
        arabic: 'الواقع الافتراضي',
        deutsch: 'Virtuelle Realität',
        french: 'Réalité Virtuelle',
        spanish: 'Realidad Virtual',
        portuguese: 'Realidade Virtual'
      },
      '增强现实': {
        english: 'Augmented Reality',
        japanese: '拡張現実',
        korean: '증강현실',
        arabic: 'الواقع المعزز',
        deutsch: 'Erweiterte Realität',
        french: 'Réalité Augmentée',
        spanish: 'Realidad Aumentada',
        portuguese: 'Realidade Aumentada'
      },
      '前端开发': {
        english: 'Frontend Development',
        japanese: 'フロントエンド開発',
        korean: '프론트엔드 개발',
        arabic: 'تطوير الواجهة الأمامية',
        deutsch: 'Frontend-Entwicklung',
        french: 'Développement Frontend',
        spanish: 'Desarrollo Frontend',
        portuguese: 'Desenvolvimento Frontend'
      },
      '后端开发': {
        english: 'Backend Development',
        japanese: 'バックエンド開発',
        korean: '백엔드 개발',
        arabic: 'تطوير الواجهة الخلفية',
        deutsch: 'Backend-Entwicklung',
        french: 'Développement Backend',
        spanish: 'Desarrollo Backend',
        portuguese: 'Desenvolvimento Backend'
      },
      '全栈开发': {
        english: 'Full Stack Development',
        japanese: 'フルスタック開発',
        korean: '풀스택 개발',
        arabic: 'تطوير المكدس الكامل',
        deutsch: 'Full-Stack-Entwicklung',
        french: 'Développement Full Stack',
        spanish: 'Desarrollo Full Stack',
        portuguese: 'Desenvolvimento Full Stack'
      },
      '移动开发': {
        english: 'Mobile Development',
        japanese: 'モバイル開発',
        korean: '모바일 개발',
        arabic: 'تطوير الهاتف المحمول',
        deutsch: 'Mobile Entwicklung',
        french: 'Développement Mobile',
        spanish: 'Desarrollo Móvil',
        portuguese: 'Desenvolvimento Mobile'
      },
      '游戏开发': {
        english: 'Game Development',
        japanese: 'ゲーム開発',
        korean: '게임 개발',
        arabic: 'تطوير الألعاب',
        deutsch: 'Spieleentwicklung',
        french: 'Développement de Jeux',
        spanish: 'Desarrollo de Juegos',
        portuguese: 'Desenvolvimento de Jogos'
      },
      '软件工程': {
        english: 'Software Engineering',
        japanese: 'ソフトウェア工学',
        korean: '소프트웨어 공학',
        arabic: 'هندسة البرمجيات',
        deutsch: 'Software-Engineering',
        french: 'Génie Logiciel',
        spanish: 'Ingeniería de Software',
        portuguese: 'Engenharia de Software'
      },
      '数据科学': {
        english: 'Data Science',
        japanese: 'データサイエンス',
        korean: '데이터 사이언스',
        arabic: 'علم البيانات',
        deutsch: 'Datenwissenschaft',
        french: 'Science des Données',
        spanish: 'Ciencia de Datos',
        portuguese: 'Ciência de Dados'
      },
      '用户体验': {
        english: 'User Experience',
        japanese: 'ユーザーエクスペリエンス',
        korean: '사용자 경험',
        arabic: 'تجربة المستخدم',
        deutsch: 'Benutzererfahrung',
        french: 'Expérience Utilisateur',
        spanish: 'Experiencia de Usuario',
        portuguese: 'Experiência do Usuário'
      },
      '用户界面': {
        english: 'User Interface',
        japanese: 'ユーザーインターフェース',
        korean: '사용자 인터페이스',
        arabic: 'واجهة المستخدم',
        deutsch: 'Benutzeroberfläche',
        french: 'Interface Utilisateur',
        spanish: 'Interfaz de Usuario',
        portuguese: 'Interface do Usuário'
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

// 检查是否应该跳过翻译 - 增强版本：支持代码注释翻译
window.GLM_CONFIG.shouldSkipTranslation = function(text, targetLang = null) {
  if (!text || text.length < this.detection.minTextLength) {
    return true;
  }
  
  const trimmedText = text.trim();
  
  // 优先检查代码注释 - 如果是包含中文的注释，应该翻译
  if (this.isCodeComment && this.isCodeComment(trimmedText)) {
    console.log('✅ 发现代码注释，允许翻译:', trimmedText.slice(0, 50) + '...');
    return false; // 不跳过，应该翻译
  }
  
  // 检查普通的Markdown代码区域
  if (this.isMarkdownCode(trimmedText)) {
    console.log(`⚠️ 跳过Markdown代码区域: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查是否包含中文字符
  const hasChinese = /[\u4e00-\u9fff]/.test(trimmedText);
  
  // 扩展的技术术语列表
  const technicalTerms = [
    'GitHub', 'MkDocs', 'Front Matter', 'API', 'URL', 'HTML', 'CSS', 'JavaScript',
    'Git', 'Node.js', 'npm', 'yarn', 'pnpm', 'React', 'Vue', 'Angular',
    'TypeScript', 'JSON', 'XML', 'YAML', 'Markdown', 'SQL', 'NoSQL',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'DevOps',
    'REST', 'GraphQL', 'OAuth', 'JWT', 'HTTPS', 'SSH', 'FTP', 'HTTP',
    'Priority Order', 'Cache', 'Redis', 'MongoDB', 'MySQL', 'PostgreSQL',
    'Plugins', 'Document Dates', 'Position', 'Top', 'Date', 'Display',
    'Author', 'Please', 'Localization', 'Chinese', 'Exclude', 'File'
  ];
  
  // 如果包含中文，应用智能跳过规则
  if (hasChinese) {
    // 检查是否为纯技术术语列表（没有中文描述性内容）
    const words = trimmedText.split(/[\s\>\<\|\(\)\[\]\{\}\,\.\/\\\-\+\=\:]+/).filter(word => word.length > 0);
    const chineseWords = words.filter(word => /[\u4e00-\u9fff]/.test(word));
    const technicalWordCount = words.filter(word => 
      technicalTerms.some(term => term.toLowerCase() === word.toLowerCase())
    ).length;
    
    // 只有当中文词汇很少（<20%）且技术术语很多（>80%）时才跳过
    // 这样可以确保像"优先级顺序：Front Matter > 文件系统时间戳"这样的描述性文本被翻译
    if (words.length > 0 && 
        (chineseWords.length / words.length) < 0.2 && 
        (technicalWordCount / words.length) > 0.8) {
      console.log(`⚠️ 跳过技术术语密集文本: ${trimmedText.slice(0, 50)}...`);
      return true;
    }
    
    // 跳过纯英文技术术语组合（如 "Priority Order"）
    if (/^[a-zA-Z\s\>\<\|\(\)\[\]\{\}\,\.\/\\\-\+\=\:]+$/.test(trimmedText)) {
      const englishWords = trimmedText.split(/[\s\>\<\|\(\)\[\]\{\}\,\.\/\\\-\+\=\:]+/).filter(word => word.length > 0);
      const technicalEnglishCount = englishWords.filter(word => 
        technicalTerms.some(term => term.toLowerCase() === word.toLowerCase())
      ).length;
      
      if (englishWords.length > 0 && (technicalEnglishCount / englishWords.length) > 0.5) {
        console.log(`⚠️ 跳过英文技术术语组合: ${trimmedText}`);
        return true;
      }
    }
    
    // 其他包含中文的内容都不跳过
    return false;
  }
  
  // 对于不包含中文的文本，应用基本跳过规则
  
  // 跳过纯英文技术术语
  if (technicalTerms.some(term => trimmedText === term)) {
    return true;
  }
  
  // 跳过技术术语组合
  const words = trimmedText.split(/[\s\>\<\|\(\)\[\]\{\}\,\.\/\\\-\+\=\:]+/).filter(word => word.length > 0);
  const technicalWordCount = words.filter(word => 
    technicalTerms.some(term => term.toLowerCase() === word.toLowerCase())
  ).length;
  
  if (words.length > 0 && (technicalWordCount / words.length) > 0.6) {
    return true;
  }
  
  // 跳过纯代码和模板语法
  if (/^[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)$/.test(trimmedText) || // 函数调用
      /^\w+@\w+\.\w+$/.test(trimmedText) || // 邮箱
      /^https?:\/\/[^\s]+$/.test(trimmedText) || // URL
      /^[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}$/.test(trimmedText) || // 域名
      /^\$[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedText) || // 变量
      /^#[a-fA-F0-9]{3,8}$/.test(trimmedText) || // 颜色代码
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/.test(trimmedText) || // CSS单位
      // 模板语法检测
      /\{%[\s\S]*?%\}/.test(trimmedText) || // Jinja2/Django 模板语法
      /\{\{[\s\S]*?\}\}/.test(trimmedText) || // 变量输出语法
      /\{#[\s\S]*?#\}/.test(trimmedText) || // 模板注释
      /^\{%\s*(set|if|for|endif|endfor|else|elif)[\s\S]*?%\}$/.test(trimmedText) || // 模板控制语句
      /page\.(meta|title|content)\.[a-zA-Z_][a-zA-Z0-9_]*/.test(trimmedText) || // 页面变量访问
      /^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^\s]/.test(trimmedText)) { // 变量赋值
    console.log(`⚠️ 跳过代码/模板语法: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  return false;
};

// 检查是否为Markdown代码区域
window.GLM_CONFIG.isMarkdownCode = function(text) {
  const trimmedText = text.trim();
  
  // 检查多行代码块 ```code```
  if (/^```[\s\S]*```$/.test(trimmedText)) {
    return true;
  }
  
  // 检查行内代码 `code`
  if (/^`[^`]+`$/.test(trimmedText)) {
    return true;
  }
  
  // 检查缩进代码块（4个空格或1个tab开头的行）
  if (/^(    |\t)[^\s]/.test(trimmedText)) {
    return true;
  }
  
  // 检查模板语法（Jinja2, Django, Liquid等）
  if (/\{%[\s\S]*?%\}/.test(trimmedText) || // {% %} 语法
      /\{\{[\s\S]*?\}\}/.test(trimmedText) || // {{ }} 语法
      /\{#[\s\S]*?#\}/.test(trimmedText) || // {# #} 注释语法
      /\{\{-[\s\S]*?-\}\}/.test(trimmedText) || // {{- -}} 语法
      /\{%-[\s\S]*?-%\}/.test(trimmedText)) { // {%- -%} 语法
    console.log(`⚠️ 检测到模板语法: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查特定的模板变量和表达式
  if (/page\.(meta|title|content)\.[a-zA-Z_][a-zA-Z0-9_]*/.test(trimmedText) || // 页面变量
      /^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^\s]/.test(trimmedText) || // 变量赋值
      /^\{%\s*(set|if|for|endif|endfor|else|elif)/.test(trimmedText)) { // 模板控制语句
    console.log(`⚠️ 检测到模板变量/控制语句: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查代码块中的内容（常见编程语言关键字和语法）
  const codePatterns = [
    // JavaScript/TypeScript
    /^(function|const|let|var|if|else|for|while|class|import|export|return|async|await|typeof|instanceof)\s/,
    // Python
    /^(def|class|import|from|if|else|elif|for|while|return|try|except|finally|with|as|lambda|yield)\s/,
    // Java/C#/C++
    /^(public|private|protected|static|void|int|string|boolean|char|float|double|long|short|byte)\s/,
    // 通用编程语法
    /^\s*[\{\}\[\]\(\);]\s*$/,
    /^\s*\/\/.*$/, // 单行注释
    /^\s*\/\*[\s\S]*\*\/\s*$/, // 多行注释
    /^\s*#.*$/, // Python/Shell注释
    /^\s*<!--[\s\S]*-->\s*$/, // HTML注释
    /^[a-zA-Z_][a-zA-Z0-9_]*\s*[=:]\s*[^\s]/, // 变量赋值
    /^\s*[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)\s*[{;]?\s*$/, // 函数调用或定义
    /^\s*<[^>]+>.*<\/[^>]+>\s*$/, // HTML标签
    /^\s*\.[a-zA-Z_][a-zA-Z0-9_-]*\s*\{/, // CSS选择器
    /^\s*[a-zA-Z-]+\s*:\s*[^;]+;?\s*$/, // CSS属性
    // 更多编程语言模式
    /^(struct|enum|interface|namespace|using|include|require|module)\s/,
    /^\s*@[a-zA-Z_][a-zA-Z0-9_]*/, // 装饰器/注解
    /^\s*\$[a-zA-Z_][a-zA-Z0-9_]*/, // 变量（PHP/Shell）
    /^\s*[a-zA-Z_][a-zA-Z0-9_]*::\s*[a-zA-Z_]/, // 静态方法调用
    /^\s*[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*/, // 对象方法调用
    // 配置文件格式
    /^\s*[a-zA-Z_][a-zA-Z0-9_-]*\s*:\s*/, // YAML格式
    /^\s*"[^"]+"\s*:\s*/, // JSON格式
    /^\s*[a-zA-Z_][a-zA-Z0-9_-]*\s*=\s*/, // 配置格式
    // 模板语法
    /\{%[\s\S]*?%\}/, // Jinja2/Django
    /\{\{[\s\S]*?\}\}/, // 变量输出
    /\{#[\s\S]*?#\}/ // 模板注释
  ];
  
  // 检查是否匹配代码模式
  if (codePatterns.some(pattern => pattern.test(trimmedText))) {
    console.log(`⚠️ 检测到代码模式: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查是否包含大量编程符号
  const programmingSymbols = /[{}\[\]();=<>!&|+\-*\/\\"'`~^%$#@]/g;
  const symbolMatches = trimmedText.match(programmingSymbols);
  const symbolRatio = symbolMatches ? symbolMatches.length / trimmedText.length : 0;
  
  // 如果编程符号占比超过25%，认为是代码（降低阈值提高检测敏感度）
  if (symbolRatio > 0.25) {
    console.log(`⚠️ 检测到高密度编程符号 (${(symbolRatio * 100).toFixed(1)}%): ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查是否为配置文件格式（YAML, JSON等）
  if (/^\s*[a-zA-Z_][a-zA-Z0-9_-]*\s*:\s*/.test(trimmedText) || // YAML格式
      /^\s*"[^"]+"\s*:\s*/.test(trimmedText) || // JSON格式
      /^\s*[a-zA-Z_][a-zA-Z0-9_-]*\s*=\s*/.test(trimmedText)) { // 配置格式
    console.log(`⚠️ 检测到配置文件格式: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  // 检查特定的代码标识符模式
  if (/^[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*/.test(trimmedText) || // 对象属性访问
      /^[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)/.test(trimmedText) || // 函数调用
      /^\$\{[^}]+\}/.test(trimmedText) || // 模板字符串变量
      /^[a-zA-Z_][a-zA-Z0-9_]*::[a-zA-Z_]/.test(trimmedText) || // 命名空间访问
      /^@[a-zA-Z_][a-zA-Z0-9_]*/.test(trimmedText)) { // 装饰器
    console.log(`⚠️ 检测到代码标识符: ${trimmedText.slice(0, 50)}...`);
    return true;
  }
  
  return false;
};

// 检查是否为代码块中的注释（可以翻译的部分）
window.GLM_CONFIG.isCodeComment = function(text) {
  const trimmedText = text.trim();
  
  // 检查各种注释格式
  const commentPatterns = [
    /^\s*\/\/\s*(.+)$/, // JavaScript/C++/Java 单行注释
    /^\s*\/\*\s*([\s\S]*?)\s*\*\/\s*$/, // JavaScript/C++/Java 多行注释
    /^\s*#\s*(.+)$/, // Python/Shell/YAML 注释
    /^\s*<!--\s*([\s\S]*?)\s*-->\s*$/, // HTML 注释
    /^\s*;;\s*(.+)$/, // Lisp 注释
    /^\s*--\s*(.+)$/, // SQL/Haskell 注释
    /^\s*%\s*(.+)$/, // LaTeX/MATLAB 注释
    /^\s*"\s*(.+)$/, // VimScript 注释
    /^\s*\*\s*(.+)$/, // 某些文档格式的注释
  ];
  
  // 检查是否匹配注释模式，且注释内容包含中文
  for (const pattern of commentPatterns) {
    const match = trimmedText.match(pattern);
    if (match) {
      const commentContent = match[1] || match[0];
      // 只有包含中文的注释才需要翻译
      if (/[\u4e00-\u9fff]/.test(commentContent)) {
        console.log('✅ 发现可翻译的代码注释:', commentContent.slice(0, 30) + '...');
        return true;
      }
    }
  }
  
  return false;
};

// 提取代码注释中的文本内容（用于翻译）
window.GLM_CONFIG.extractCommentText = function(text) {
  const trimmedText = text.trim();
  
  // 定义注释提取模式
  const extractPatterns = [
    { pattern: /^\s*\/\/\s*(.+)$/, replacement: '// $1' }, // JavaScript 单行注释
    { pattern: /^\s*\/\*\s*([\s\S]*?)\s*\*\/\s*$/, replacement: '/* $1 */' }, // JavaScript 多行注释
    { pattern: /^\s*#\s*(.+)$/, replacement: '# $1' }, // Python/YAML 注释
    { pattern: /^\s*<!--\s*([\s\S]*?)\s*-->\s*$/, replacement: '<!-- $1 -->' }, // HTML 注释
    { pattern: /^\s*;;\s*(.+)$/, replacement: ';; $1' }, // Lisp 注释
    { pattern: /^\s*--\s*(.+)$/, replacement: '-- $1' }, // SQL 注释
    { pattern: /^\s*%\s*(.+)$/, replacement: '% $1' }, // LaTeX 注释
    { pattern: /^\s*"\s*(.+)$/, replacement: '" $1' }, // VimScript 注释
    { pattern: /^\s*\*\s*(.+)$/, replacement: '* $1' }, // 文档注释
  ];
  
  for (const { pattern, replacement } of extractPatterns) {
    const match = trimmedText.match(pattern);
    if (match) {
      const commentContent = match[1];
      if (/[\u4e00-\u9fff]/.test(commentContent)) {
        return {
          originalText: trimmedText,
          commentContent: commentContent,
          replacement: replacement
        };
      }
    }
  }
  
  return null;
};

// 生成提示词 - 增强版本：支持代码注释
window.GLM_CONFIG.generatePrompt = function(text, targetLang, context = 'content') {
  const isEnglish = targetLang === 'english';
  const isJapanese = targetLang === 'japanese';
  const isShort = text.length < 30;
  
  // 检查是否为代码注释
  const isCodeComment = this.isCodeComment && this.isCodeComment(text);
  
  // 检查是否为导航/UI元素
  const isNavigation = this.isNavigationText(text) || context === 'navigation';
  
  // 为代码注释使用专门的提示词
  if (isCodeComment) {
    if (isEnglish) {
      return `You are a professional code comment translator. Translate the following Chinese code comment to natural, clear English while preserving the technical accuracy and code format. Only translate the comment content, keep any code syntax symbols unchanged:

${text}

Requirements:
- Maintain technical precision
- Use natural English expression
- Keep the original code comment format (// # /* etc.)
- Only return the translated comment, no explanation`;
    } else if (isJapanese) {
      return `あなたは専門的なコード注釈翻訳者です。以下の中国語コード注釈を自然で明確な日本語に翻訳し、技術的な正確性とコード形式を保持してください。注釈の内容のみを翻訳し、コード構文記号は変更しないでください：

${text}

要件：
- 技術的な精度を維持
- 自然な日本語表現を使用
- 元のコード注釈形式を保持（// # /* など）
- 翻訳された注釈のみを返し、説明は不要`;
    } else {
      const languageName = this.getLanguage(targetLang)?.name || targetLang;
      return `You are a professional code comment translator. Translate the following Chinese code comment to natural, clear ${languageName} while preserving the technical accuracy and code format. Only translate the comment content, keep any code syntax symbols unchanged:

${text}

Requirements:
- Maintain technical precision
- Use natural ${languageName} expression
- Keep the original code comment format (// # /* etc.)
- Only return the translated comment, no explanation`;
    }
  }
  
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
    '设置', '帮助', '支持', '反馈', '登录', '注册', '退出', '个人中心',
    // 添加常见按钮文本
    'Github', 'GitHub', 'Contact', 'Contact Me', '联系我', 'Home', 'About'
  ];
  
  // 检查是否为div元素中的按钮文本（强制跳过）
  const divButtonTexts = ['Github', 'GitHub', '联系我', 'Contact Me', 'Contact'];
  if (divButtonTexts.some(buttonText => text.trim() === buttonText)) {
    return true;
  }
  
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