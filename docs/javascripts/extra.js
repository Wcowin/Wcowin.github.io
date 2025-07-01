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
    
    this.initAnimeTextAnimation();
    this.initVideoCompatibility();
    this.initResponsiveLayout();
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
          delay: (el, i) => 150 * (i + 1)
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
   * 窗口大小改变时重新计算布局
   */
  handleResize() {
    // 防抖处理
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.initResponsiveLayout();
    }, 250);
  }
}

// 性能优化：使用 Intersection Observer 监听元素可见性
class PerformanceOptimizer {
  static observeElements() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 元素进入视口时的处理
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      // 观察需要懒加载的元素
      document.querySelectorAll('.lazy-load').forEach(el => {
        observer.observe(el);
      });
    }
  }
}

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('🚨 JavaScript 错误:', event.error);
});

// 初始化应用
try {
  const app = new CustomFeatures();
  
  // 监听窗口大小变化
  window.addEventListener('resize', () => app.handleResize());
  
  // 性能优化
  PerformanceOptimizer.observeElements();
  
} catch (error) {
  console.error('❌ 应用初始化失败:', error);
}

// 导出供外部使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CustomFeatures, PerformanceOptimizer };
}

// 优化JavaScript加载
document.addEventListener('DOMContentLoaded', () => {
  // 延迟加载非关键JavaScript
  setTimeout(() => {
    const deferredScripts = document.querySelectorAll('script[data-defer]');
    deferredScripts.forEach(script => {
      const newScript = document.createElement('script');
      [...script.attributes].forEach(attr => {
        if (attr.name !== 'data-defer') {
          newScript.setAttribute(attr.name, attr.value);
        }
      });
      newScript.innerHTML = script.innerHTML;
      script.parentNode.replaceChild(newScript, script);
    });
  }, 1000);
  
  // 使用Intersection Observer实现懒加载
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
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
  }
});
