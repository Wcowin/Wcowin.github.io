/**
 * Zensical 网站增强脚本
 * 提供错误处理、兼容性修复和性能优化
 * 兼容 Material for MkDocs
 */

// 全局错误处理
window.addEventListener('error', (event) => {
  // 忽略已知的第三方库错误和内容拦截器错误
  if (event.message && (
      event.message.includes('Cannot set property Package') ||
      event.message.includes('ga.getAll is not a function') ||
      event.message.includes('Cannot read properties of undefined') ||
      event.message.includes('The message port closed') ||
      event.message.includes('Access to fetch') ||
      event.message.includes('Failed to load resource') ||
      event.message.includes('net::ERR_BLOCKED_BY_CONTENT_BLOCKER') ||
      event.message.includes('Script error')
  )) {
    console.log('ℹ️ 已忽略已知错误');
    event.preventDefault();
    return;
  }
  
  // 只记录有意义的错误信息
  if (event.error || (event.message && !event.message.includes('undefined'))) {
    console.error('🚨 JavaScript 错误:', event.error || event.message);
  }
}, true);

// 处理未捕获的 Promise 错误
window.addEventListener('unhandledrejection', (event) => {
  const errorMsg = event.reason ? (event.reason.message || event.reason) : 'Unknown Promise error';
  
  // 忽略特定错误和内容拦截器错误
  if (typeof errorMsg === 'string' && (
      errorMsg.includes('ga.getAll is not a function') ||
      errorMsg.includes('Cannot read properties of undefined') ||
      errorMsg.includes('views') ||
      errorMsg.includes('ERR_BLOCKED_BY_CONTENT_BLOCKER') ||
      errorMsg.includes('Script error')
  )) {
    event.preventDefault();
    return;
  }
  
  console.error('🚨 未处理的 Promise 错误:', errorMsg);
});

// 主要功能类
class SiteEnhancer {
  constructor() {
    this.isLocalhost = window.location.hostname === '127.0.0.1' || 
                       window.location.hostname === 'localhost';
    this.isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    this.init();
  }
  
  init() {
    // 修复常见错误
    this.fixMathJax();
    this.fixAnalytics();
    this.fixCounterCORS();
    
    // 初始化功能
    this.setupLazyLoading();
    this.setupResponsiveElements();
    
    // 监听窗口大小变化
    this.setupResizeHandler();
    
    console.log('✅ 网站增强功能已初始化');
  }
  
  // 安全执行函数
  safeExecute(fn, name) {
    try {
      fn();
    } catch (e) {
      console.warn(`⚠️ ${name}功能初始化失败:`, e);
    }
  }
  
  // 修复 MathJax 错误
  fixMathJax() {
    this.safeExecute(() => {
      if (window.MathJax && !window.MathJax._patched) {
        window.MathJax._patched = true;
        console.log('ℹ️ MathJax 兼容性处理已应用');
      }
    }, 'MathJax');
  }
  
  // 修复 Google Analytics
  fixAnalytics() {
    this.safeExecute(() => {
      if (typeof window.ga === 'undefined') {
        window.ga = function() {};
      }
      
      if (typeof window.ga.getAll !== 'function') {
        window.ga.getAll = function() {
          return [{get: param => param === 'clientId' ? 'local-client-id' : null}];
        };
      }
      
      // 提供视图计数函数
      window.getViews = () => Promise.resolve('--');
      window.renderViews = () => Promise.resolve();
      
      console.log('ℹ️ Analytics 兼容性处理已应用');
    }, 'Analytics');
  }
  
  // 修复计数器 CORS 问题
  fixCounterCORS() {
    this.safeExecute(() => {
      if (!this.isLocalhost) return;
      
      // 拦截计数器请求
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url && typeof url === 'string' && url.includes('finicounter.eu.org')) {
          return Promise.resolve(new Response(JSON.stringify({views: 0}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
          }));
        }
        return originalFetch.apply(this, arguments);
      };
      
      console.log('ℹ️ 本地环境计数器兼容性处理已应用');
    }, '计数器');
  }
  
  // 设置懒加载
  setupLazyLoading() {
    this.safeExecute(() => {
      if (!('IntersectionObserver' in window)) return;
      
      const lazyImages = document.querySelectorAll('img[data-src]');
      if (lazyImages.length === 0) return;
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
      console.log(`ℹ️ 已设置${lazyImages.length}张图片懒加载`);
    }, '懒加载');
  }
  
  // 设置响应式元素
  setupResponsiveElements() {
    this.safeExecute(() => {
      // 处理视频元素
      const video = document.getElementById('video1');
      if (video) {
        if (this.isMobile) {
          video.style.display = 'none';
          video.muted = true;
        } else {
          video.volume = 0.5;
        }
      }
      
      // 处理动画文本
      const textWrapper = document.querySelector('.ml3');
      if (textWrapper && typeof anime !== 'undefined') {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g, "<span class='letter'>$&</span>"
        );
        
        anime.timeline({loop: true})
          .add({
            targets: '.ml3 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 2250,
            delay: (el, i) => 150 * (i + 1)
          })
          .add({
            targets: '.ml3',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
          });
      }
    }, '响应式元素');
  }
  
  // 设置窗口大小变化处理
  setupResizeHandler() {
    this.safeExecute(() => {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // 重新计算响应式布局
          const container = document.querySelector('.container');
          const boxes = document.querySelectorAll('p');
          
          if (container && boxes.length > 0) {
            const newWidth = container.offsetWidth;
            requestAnimationFrame(() => {
              boxes.forEach(box => {
                if (box && box.style) box.style.width = `${newWidth}px`;
              });
            });
          }
        }, 250);
      });
    }, '窗口大小变化');
  }
}

// 初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SiteEnhancer());
} else {
  new SiteEnhancer();
}

// 添加提示框控制逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取提示框元素
  const tipBox = document.querySelector('.mobile-tips-box'); // 替换为实际的选择器
  
  if (tipBox) {
    // 检查是否为移动设备
    const isMobile = window.innerWidth <= 768;
    
    // 只在移动设备上显示提示框
    if (!isMobile) {
      tipBox.style.display = 'none';
    } else {
      // 显示5秒后自动隐藏
      setTimeout(() => {
        tipBox.style.opacity = '0';
        setTimeout(() => {
          tipBox.style.display = 'none';
        }, 500);
      }, 5000);
      
      // 添加关闭按钮功能
      const closeBtn = tipBox.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          tipBox.style.display = 'none';
          
          // 可选：存储用户已关闭提示的状态
          localStorage.setItem('tipsClosed', 'true');
        });
      }
    }
    
    // 检查用户是否已经关闭过提示
    if (localStorage.getItem('tipsClosed') === 'true') {
      tipBox.style.display = 'none';
    }
  }
});
