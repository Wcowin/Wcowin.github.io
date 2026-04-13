/**
 * OneClip 风格的 Microsoft 翻译初始化脚本
 * 基于 translate.js 实现多语言支持
 * 注：虽然名为 Edge 翻译，但实际上支持所有现代浏览器
 */

// 检查是否已加载 translate.js
if (typeof translate === 'undefined') {
  console.error('translate.js 未加载');
}

// 设置本地语种为简体中文
translate.language.setLocal('chinese_simplified');
// 使用 Microsoft 翻译服务（客户端直接翻译，不依赖服务端，支持所有现代浏览器）
translate.service.use('client.edge');
// 根据用户浏览器语言或 IP 所在国家自动切换语种
translate.setAutoDiscriminateLocalLanguage();
// 隐藏默认的语言选择框（使用自定义的）
translate.selectLanguageTag.show = false;
// 忽略不需要翻译的元素
translate.ignore.class.push('download-btn', 'nav-cta', 'pricing-cta', 'lang-option', 'ignore');
// 开启动态监控，JS 改变的内容也会被翻译
translate.listener.start();
// 监控 ajax 请求进行翻译
translate.request.listener.start();

// 语言名称映射
var translateLangNames = {
    'chinese_simplified': '中文',
    'chinese_traditional': '繁體',
    'english': 'EN',
    'japanese': '日本語',
    'korean': '한국어'
};

// 翻译到指定语言
function translateToEdge(lang) {
    var langDropdown = document.getElementById('langDropdown');
    var currentLangSpan = document.getElementById('currentLang');
    
    if (langDropdown) langDropdown.style.display = 'none';
    if (currentLangSpan) currentLangSpan.textContent = translateLangNames[lang] || lang;
    
    // 调用 translate.js 的切换方法
    translate.changeLanguage(lang);
}

// 初始化 Edge 翻译
function initEdgeTranslation() {
  try {
    // 执行翻译初始化
    translate.execute();
    console.log('Edge 翻译服务初始化完成');
  } catch (error) {
    console.error('Edge 翻译服务初始化失败:', error);
  }
}

// 延迟初始化，确保 DOM 已加载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEdgeTranslation);
} else {
  initEdgeTranslation();
}

// 处理 URL 哈希变化，支持 #edge-translate-* 格式的链接
function handleEdgeTranslateHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#edge-translate-')) {
    const lang = hash.replace('#edge-translate-', '');
    translateToEdge(lang);
  }
}

// 监听哈希变化
window.addEventListener('hashchange', handleEdgeTranslateHash);
// 初始加载时检查哈希
window.addEventListener('load', handleEdgeTranslateHash);

// 导出函数供外部调用
window.translateToEdge = translateToEdge;
window.initEdgeTranslation = initEdgeTranslation;
window.handleEdgeTranslateHash = handleEdgeTranslateHash;