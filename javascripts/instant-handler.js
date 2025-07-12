/**
 * 即时导航兼容性处理脚本
 * 确保在使用navigation.instant时自定义脚本能正常工作
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('即时导航兼容性处理已加载');
  
  // 检查是否支持Material for MkDocs的document$可观察对象
  if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
    console.log('检测到Material for MkDocs的即时导航功能');
    
    // 监听页面内容变化
    window.document$.subscribe(function() {
      console.log('页面内容已更新，触发自定义事件');
      
      // 触发自定义事件，让其他脚本知道页面已更新
      const event = new CustomEvent('navigation.instant.complete');
      document.dispatchEvent(event);
      
      // 延迟执行，确保DOM已完全更新
      setTimeout(function() {
        // 重新初始化自定义脚本
        initAllCustomScripts();
      }, 100);
    });
  } else {
    console.log('未检测到Material for MkDocs的即时导航功能');
  }
});

// 统一的自定义脚本初始化函数
function initAllCustomScripts() {
  console.log('重新初始化所有自定义脚本');
  
  // 重新初始化问候语
  if (typeof updateGreeting === 'function') {
    updateGreeting();
  }
  
  // 重新初始化其他可能需要的脚本
  if (typeof window.initCustomScripts === 'function') {
    window.initCustomScripts();
  }
  
  // 触发自定义事件通知其他脚本
  const event = new CustomEvent('scripts.reinit');
  document.dispatchEvent(event);
}

// 导出到全局，供其他脚本使用
window.initAllCustomScripts = initAllCustomScripts;
