// document.addEventListener('DOMContentLoaded', () => {
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       const id = entry.target.getAttribute('id');
//       const link = document.querySelector(`.md-nav__link[href="#${id}"]`);
//       if (entry.isIntersecting) {
//         link.classList.add('md-nav__link--active');
//       } else {
//         link.classList.remove('md-nav__link--active');
//       }
//     });
//   }, { threshold: 0.5 });

//   document.querySelectorAll('.md-content [id]').forEach(section => {
//     observer.observe(section);
//   });
// });
// // 仅在非触摸设备和较大屏幕上应用悬停效果
// if (window.matchMedia('(min-width: 960px)').matches && !('ontouchstart' in window)) {
//   document.addEventListener('DOMContentLoaded', function() {
//     const toc = document.querySelector('.md-nav--secondary');
//     if (toc) {
//       // 悬停缩放效果
//       toc.addEventListener('mouseenter', function() {
//         // 确保不在滚动中
//         if (!document.body.classList.contains('scrolling')) {
//           toc.classList.add('hover-scale');
//         }
//       });
//       toc.addEventListener('mouseleave', function() {
//         toc.classList.remove('hover-scale');
//       });
      
//       // 防止滚动时的效果干扰
//       let scrollTimer;
//       window.addEventListener('scroll', function() {
//         document.body.classList.add('scrolling');
//         toc.classList.remove('hover-scale');
        
//         clearTimeout(scrollTimer);
//         scrollTimer = setTimeout(function() {
//           document.body.classList.remove('scrolling');
//         }, 150);
//       });
//     }
//   });
// }

/**
 * TOC 动态指示器脚本
 * 作用：创建并控制一个随激活链接移动的背景指示器。
 */
document.addEventListener("DOMContentLoaded", function() {
  const navList = document.querySelector(".md-nav--secondary .md-nav__list");
  if (!navList) return;

  // 1. 创建指示器元素并添加到列表中
  const indicator = document.createElement("div");
  indicator.className = "toc-indicator";
  navList.prepend(indicator); // 使用 prepend 确保它在 DOM 结构中位于最前

  // 2. 定义更新指示器位置的函数
  function updateIndicator() {
    const activeLink = navList.querySelector(".md-nav__link--active");
    
    if (activeLink) {
      // 如果有激活的链接
      indicator.style.opacity = "1";
      indicator.style.height = `${activeLink.offsetHeight}px`;
      indicator.style.top = `${activeLink.offsetTop}px`;
    } else {
      // 如果没有（例如在页面顶部或底部）
      indicator.style.opacity = "0";
    }
  }

  // 3. 使用 MutationObserver 监听 'active' 类的变化
  const observer = new MutationObserver(mutations => {
    // 当 class 变化时，稍作延迟后更新指示器，确保 DOM 已完全渲染
    setTimeout(updateIndicator, 50); 
  });

  observer.observe(navList.parentNode, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['class'],
  });
  
  // 4. 在窗口大小变化时也更新指示器
  window.addEventListener("resize", updateIndicator);

  // 5. 初始加载时立即执行一次，以定位到初始激活的链接
  setTimeout(updateIndicator, 100);
});
