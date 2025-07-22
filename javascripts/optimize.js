/**
 * 网站性能优化脚本
 * 用于延迟加载非关键资源和优化页面加载性能
 */

// 使用立即执行函数避免全局变量污染
(function() {
  'use strict';
  
  // 配置选项
  const config = {
    lazyLoadImages: true,        // 启用图片懒加载
    deferNonCriticalJS: true,    // 延迟加载非关键JS
    preconnectDomains: [         // 预连接关键域名
      'https://cdn.jsdelivr.net',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://finicounter.eu.org',
      'https://www.googletagmanager.com' // 新增 Google Analytics 等
    ],
    prefetchPages: true          // 预取可能的下一页
  };
  
  /**
   * 初始化性能优化
   */
  function init() {
    // 添加资源提示
    if (config.preconnectDomains.length > 0) {
      addResourceHints();
    }
    
    // 设置图片懒加载
    if (config.lazyLoadImages) {
      setupLazyLoading();
    }
    
    // 延迟加载非关键JS
    if (config.deferNonCriticalJS) {
      deferNonCriticalJS();
    }
    
    // 预取可能的下一页
    if (config.prefetchPages) {
      prefetchNextPages();
    }
    
    // 优化字体加载
    optimizeFontLoading();
  }
  
  /**
   * 添加资源提示以加快关键资源加载
   */
  function addResourceHints() {
    const head = document.head;
    
    config.preconnectDomains.forEach(domain => {
      // DNS预解析
      const dns = document.createElement('link');
      dns.rel = 'dns-prefetch';
      dns.href = domain;
      head.appendChild(dns);
      
      // 预连接
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      preconnect.crossOrigin = 'anonymous';
      head.appendChild(preconnect);
    });
  }
  
  /**
   * 设置图片懒加载
   */
  function setupLazyLoading() {
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
      
      if (lazyImages.length === 0) return;
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // 处理data-src属性
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // 处理data-srcset属性
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '300px 0px' // 调整为提前300px加载，提高响应
      });
      
      lazyImages.forEach(img => {
        // 为没有loading属性的图片添加loading="lazy"
        if (!img.hasAttribute('loading') && !img.dataset.src) {
          img.setAttribute('loading', 'lazy');
        }
        
        imageObserver.observe(img);
      });
      
      console.log(`✅ 已设置${lazyImages.length}张图片懒加载`);
    } else {
      // 对于不支持IntersectionObserver的浏览器，使用原生懒加载
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
  }
  
  /**
   * 延迟加载非关键JS
   */
  function deferNonCriticalJS() {
    // 获取所有具有data-defer属性的脚本
    const scripts = document.querySelectorAll('script[data-defer]');
    
    if (scripts.length === 0) return;
    
    // 在页面加载完成后加载这些脚本
    window.addEventListener('load', () => {
      setTimeout(() => {
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          
          // 复制原始脚本的所有属性
          Array.from(script.attributes).forEach(attr => {
            if (attr.name !== 'data-defer') {
              newScript.setAttribute(attr.name, attr.value);
            }
          });
          
          // 如果是内联脚本，复制其内容
          if (script.innerHTML) {
            newScript.innerHTML = script.innerHTML;
          }
          
          // 替换原始脚本
          script.parentNode.replaceChild(newScript, script);
        });
        
        console.log(`✅ 已延迟加载${scripts.length}个非关键脚本`);
      }, 100); // 延迟100ms以确保不阻塞页面渲染
    });
  }
  
  /**
   * 预取可能的下一页
   */
  function prefetchNextPages() {
    // 等待页面完全加载后
    window.addEventListener('load', () => {
      // 延迟执行以避免与关键资源竞争
      setTimeout(() => {
        // 查找页面中的下一页链接
        const nextLinks = document.querySelectorAll('.md-footer__link--next');
        
        if (nextLinks.length > 0) {
          const nextLink = nextLinks[0];
          const nextUrl = nextLink.getAttribute('href');
          
          if (nextUrl) {
            // 创建预取链接
            const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = nextUrl;
            document.head.appendChild(prefetch);
            
            console.log(`✅ 已预取下一页: ${nextUrl}`);
          }
        }
      }, 2000); // 延迟2秒执行
    });
  }
  
  /**
   * 优化字体加载
   */
  function optimizeFontLoading() {
    // 添加字体显示交换策略
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap !important;
      }
    `;
    document.head.appendChild(style);
    
    const fontUrls = [
      'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0b.woff2', // 示例字体URL，替换为您的实际字体
      // 添加更多字体
    ];
    
    fontUrls.forEach(url => {
      const preload = document.createElement('link');
      preload.rel = 'preload';
      preload.href = url;
      preload.as = 'font';
      preload.type = 'font/woff2';
      preload.crossOrigin = 'anonymous';
      document.head.appendChild(preload);
    });
  }
  
  // 在DOM内容加载后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 兼容Material for MkDocs的即时导航
  if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
    window.document$.subscribe(() => {
      // 页面内容更新后重新初始化优化
      setTimeout(init, 100);
    });
  }
})();