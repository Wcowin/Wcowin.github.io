// document$.subscribe(function() {
//   console.log("Initialize third-party libraries here")
// })

// // Wrap every letter in a span
// var textWrapper = document.querySelector('.ml3');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: true})
//   .add({
//     targets: '.ml3 .letter',
//     opacity: [0,1],
//     easing: "easeInOutQuad",
//     duration: 2250,
//     delay: (el, i) => 150 * (i+1)
//   }).add({
//     targets: '.ml3',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });


// //全屏视频
// var video = document.getElementById("video1");
// var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (isMobile) {
//   video.style.display = "none";
//   video.muted = true;
// } else {
//   video.volume = 0.5; // 或者根据需要设置适当的音量值，例如 0.5 表示 50% 的音量
// }

// // 优化
// const container = document.querySelector('.container');
// const boxes = document.querySelectorAll('p');

// // Read a layout property
// const newWidth = container.offsetWidth;

// for (var i = 0; i < boxes.length; i++) {    
//     // Then invalidate layouts with writes.
//     boxes[i].style.width = newWidth + 'px';
// }
// const width = box.offsetWidth;
// box.classList.add('big');

// // When the user clicks on a link/button:
// async function navigateToSettingsPage() {
//   // Capture and visually freeze the current state.
//   await document.documentTransition.prepare({
//     rootTransition: 'cover-up',
//     sharedElements: [element1, element2, element3],
//   });
//   // This is a function within the web app:
//   updateDOMForSettingsPage();
//   // Start the transition.
//   await document.documentTransition.start({
//     sharedElements: [element1, element4, element5],
//   });
//   // Transition complete!
// }
// // 优化end






/**
 * 网站自定义功能模块
 * 包含动画效果、视频处理和响应式布局
 */

class CustomFeatures {
  constructor() {
    this.resizeTimer = null;
    this.observers = new Map(); // 统一管理所有观察器
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeFeatures());
    } else {
      this.initializeFeatures();
    }
  }

  initializeFeatures() {
    console.log('🚀 Initialize custom features');

    try {
      this.initAnimeTextAnimation();
      this.initVideoCompatibility();
      this.initResponsiveLayout();
      this.initIntersectionObservers(); // 统一初始化观察器
    } catch (error) {
      console.error('❌ 功能初始化失败:', error);
    }
  }

  /**
   * 初始化 Anime.js 文字动画效果
   */
  initAnimeTextAnimation() {
    const textWrapper = document.querySelector('.ml3');
    if (!textWrapper || typeof anime === 'undefined') {
      console.warn('⚠️ Anime.js 或 .ml3 元素未找到，跳过动画初始化');
      return;
    }

    try {
      // 将每个字符包装在 span 中
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g, 
        "<span class='letter'>$&</span>"
      );

      // 创建动画时间线
      anime.timeline({ loop: true })
        .add({
          targets: '.ml3 .letter',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 2250,
          delay: (_, i) => 150 * (i + 1) // 修复未使用的参数
        })
        .add({
          targets: '.ml3',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });

      console.log('✅ Anime.js 动画初始化成功');
    } catch (error) {
      console.error('❌ Anime.js 动画初始化失败:', error);
    }
  }

  /**
   * 初始化视频兼容性处理
   */
  initVideoCompatibility() {
    const video = document.getElementById("video1");
    if (!video) {
      console.log('ℹ️ 未找到 video1 元素，跳过视频配置');
      return;
    }

    const isMobile = this.isMobileDevice();
    
    try {
      if (isMobile) {
        // 移动端隐藏视频并静音
        video.style.display = "none";
        video.muted = true;
        console.log('📱 移动端视频配置完成');
      } else {
        // 桌面端设置音量
        video.volume = 0.5;
        console.log('🖥️ 桌面端视频配置完成');
      }
    } catch (error) {
      console.error('❌ 视频配置失败:', error);
    }
  }

  /**
   * 初始化响应式布局
   */
  initResponsiveLayout() {
    const container = document.querySelector('.container');
    const boxes = document.querySelectorAll('p');

    if (!container) {
      console.log('ℹ️ 未找到 .container 元素，跳过响应式布局');
      return;
    }

    if (boxes.length === 0) {
      console.log('ℹ️ 未找到 p 元素，跳过响应式布局');
      return;
    }

    try {
      // 批量读取布局属性
      const newWidth = container.offsetWidth;
      
      // 批量写入样式（避免布局抖动）
      requestAnimationFrame(() => {
        boxes.forEach(box => {
          if (box && box.style) {
            box.style.width = `${newWidth}px`;
          }
        });
      });

      console.log(`✅ 响应式布局初始化完成，宽度: ${newWidth}px，影响元素: ${boxes.length}个`);
    } catch (error) {
      console.error('❌ 响应式布局初始化失败:', error);
    }
  }

  /**
   * 检测是否为移动设备
   * @returns {boolean}
   */
  isMobileDevice() {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  /**
   * 统一初始化 Intersection Observers
   */
  initIntersectionObservers() {
    // 懒加载元素观察器
    this.initLazyLoadObserver();

    // 可见性观察器
    this.initVisibilityObserver();
  }

  /**
   * 初始化懒加载观察器
   */
  initLazyLoadObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('⚠️ 浏览器不支持 IntersectionObserver');
      return;
    }

    try {
      const lazyImages = document.querySelectorAll('img[data-src]');
      if (lazyImages.length === 0) {
        console.log('ℹ️ 没有找到需要懒加载的图片');
        return;
      }

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      lazyImages.forEach(img => imageObserver.observe(img));
      this.observers.set('lazyImages', imageObserver);

      console.log(`✅ 懒加载观察器初始化完成，监听 ${lazyImages.length} 张图片`);
    } catch (error) {
      console.error('❌ 懒加载观察器初始化失败:', error);
    }
  }

  /**
   * 初始化可见性观察器
   */
  initVisibilityObserver() {
    try {
      const lazyElements = document.querySelectorAll('.lazy-load');
      if (lazyElements.length === 0) {
        console.log('ℹ️ 没有找到需要监听可见性的元素');
        return;
      }

      const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      lazyElements.forEach(el => visibilityObserver.observe(el));
      this.observers.set('visibility', visibilityObserver);

      console.log(`✅ 可见性观察器初始化完成，监听 ${lazyElements.length} 个元素`);
    } catch (error) {
      console.error('❌ 可见性观察器初始化失败:', error);
    }
  }

  /**
   * 窗口大小改变时重新计算布局
   */
  handleResize() {
    // 防抖处理
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.initResponsiveLayout();
    }, 250);
  }

  /**
   * 清理资源
   */
  destroy() {
    // 清理定时器
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    // 清理观察器
    this.observers.forEach((observer, name) => {
      try {
        observer.disconnect();
        console.log(`✅ 已清理观察器: ${name}`);
      } catch (error) {
        console.error(`❌ 清理观察器失败 ${name}:`, error);
      }
    });
    this.observers.clear();
  }
}

// 性能优化工具类
class PerformanceOptimizer {
  /**
   * 预加载关键资源
   */
  static preloadCriticalResources() {
    const criticalResources = [
      // 可以在这里添加需要预加载的资源
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.type;
      document.head.appendChild(link);
    });
  }

  /**
   * 延迟加载非关键脚本
   */
  static deferNonCriticalScripts() {
    const deferredScripts = document.querySelectorAll('script[data-defer]');
    if (deferredScripts.length === 0) {
      console.log('ℹ️ 没有找到需要延迟加载的脚本');
      return;
    }

    setTimeout(() => {
      deferredScripts.forEach(script => {
        try {
          const newScript = document.createElement('script');
          [...script.attributes].forEach(attr => {
            if (attr.name !== 'data-defer') {
              newScript.setAttribute(attr.name, attr.value);
            }
          });
          newScript.innerHTML = script.innerHTML;
          script.parentNode.replaceChild(newScript, script);
        } catch (error) {
          console.error('❌ 延迟脚本加载失败:', error);
        }
      });
      console.log(`✅ 延迟加载了 ${deferredScripts.length} 个脚本`);
    }, 1000);
  }

  /**
   * 监控性能指标
   */
  static monitorPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            console.log('📊 页面性能指标:', {
              'DNS查询': `${Math.round(navigation.domainLookupEnd - navigation.domainLookupStart)}ms`,
              'TCP连接': `${Math.round(navigation.connectEnd - navigation.connectStart)}ms`,
              '页面加载': `${Math.round(navigation.loadEventEnd - navigation.navigationStart)}ms`,
              'DOM解析': `${Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart)}ms`
            });
          }
        }, 0);
      });
    }
  }
}

// 应用管理器
class AppManager {
  constructor() {
    this.app = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) {
      console.warn('⚠️ 应用已经初始化');
      return;
    }

    try {
      // 初始化主应用
      this.app = new CustomFeatures();

      // 监听窗口大小变化
      window.addEventListener('resize', () => this.app.handleResize());

      // 性能优化
      PerformanceOptimizer.preloadCriticalResources();
      PerformanceOptimizer.monitorPerformance();

      // 页面卸载时清理资源
      window.addEventListener('beforeunload', () => this.cleanup());

      this.isInitialized = true;
      console.log('✅ 应用初始化成功');

    } catch (error) {
      console.error('❌ 应用初始化失败:', error);
    }
  }

  cleanup() {
    if (this.app && typeof this.app.destroy === 'function') {
      this.app.destroy();
    }
  }
}

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('🚨 JavaScript 错误:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// 未处理的 Promise 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 未处理的 Promise 错误:', event.reason);
});

// 初始化应用
const appManager = new AppManager();
appManager.init();

// 导出供外部使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CustomFeatures, PerformanceOptimizer, AppManager };
}

// DOM加载完成后的优化处理
document.addEventListener('DOMContentLoaded', () => {
  // 延迟加载非关键JavaScript
  PerformanceOptimizer.deferNonCriticalScripts();
});
