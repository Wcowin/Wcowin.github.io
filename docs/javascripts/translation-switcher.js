/**
 * 翻译服务切换器
 * 允许用户在 GLM 翻译和 Microsoft 翻译之间切换
 * 注：Microsoft 翻译服务虽名为 Edge 翻译，但实际上支持所有现代浏览器
 */

class TranslationSwitcher {
  constructor() {
    this.currentService = 'edge'; // 默认使用 Microsoft 翻译
    this.init();
  }

  init() {
    // 从 localStorage 加载保存的设置
    this.loadSavedSetting();
    
    // 检查 URL 参数，允许通过 URL 切换翻译服务
    this.checkUrlParams();
    
    // 创建切换按钮（已隐藏）
    this.createSwitcherUI();
    
    // 绑定事件（已禁用）
    this.bindEvents();
    
    // 初始化当前服务
    this.switchToService(this.currentService);
  }

  checkUrlParams() {
    // 检查 URL 参数，允许通过 ?translation=glm 或 ?translation=edge 切换翻译服务
    // 注：edge 代表 Microsoft 翻译服务
    const urlParams = new URLSearchParams(window.location.search);
    const translationParam = urlParams.get('translation');
    if (translationParam && (translationParam === 'glm' || translationParam === 'edge')) {
      this.currentService = translationParam;
      this.saveSetting(translationParam);
    }
  }

  loadSavedSetting() {
    try {
      const saved = localStorage.getItem('translation_service');
      if (saved && (saved === 'glm' || saved === 'edge')) {
        this.currentService = saved;
      }
    } catch (error) {
      console.warn('加载翻译服务设置失败:', error);
    }
  }

  saveSetting(service) {
    try {
      localStorage.setItem('translation_service', service);
    } catch (error) {
      console.warn('保存翻译服务设置失败:', error);
    }
  }

  createSwitcherUI() {
    // 不创建切换器 UI，根据用户要求隐藏
    console.log('Translation switcher UI is hidden as requested');
  }

  addStyles() {
    // 不添加样式，因为切换器 UI 被隐藏
  }

  bindEvents() {
    // 不绑定事件，因为切换器 UI 被隐藏
  }

  switchToService(service) {
    this.currentService = service;
    this.saveSetting(service);
    
    // 切换翻译服务
    if (service === 'glm') {
      this.activateGLMTranslation();
    } else {
      this.activateEdgeTranslation();
    }
  }

  activateGLMTranslation() {
    console.log('切换到 GLM 翻译服务');
    
    // 确保 GLM 翻译已初始化
    if (window.translateTo) {
      console.log('GLM 翻译服务已就绪');
    } else {
      console.log('GLM 翻译服务未初始化');
    }
  }

  activateEdgeTranslation() {
    console.log('切换到 Microsoft 翻译服务');
    
    // 确保 Microsoft 翻译已初始化
    if (window.translateToEdge) {
      console.log('Microsoft 翻译服务已就绪');
    } else {
      // 尝试初始化 Microsoft 翻译
      if (typeof translate !== 'undefined') {
        if (typeof initEdgeTranslation === 'function') {
          initEdgeTranslation();
        }
      } else {
        console.error('Microsoft 翻译服务依赖的 translate.js 未加载');
      }
    }
  }
}

// 初始化翻译服务切换器
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.translationSwitcher = new TranslationSwitcher();
  });
} else {
  window.translationSwitcher = new TranslationSwitcher();
}