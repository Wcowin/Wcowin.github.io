/**
 * 即时导航兼容性处理脚本
 * 确保在使用navigation.instant时自定义脚本能正常工作
 * 
 * 关键发现: !window.document$.isStopped 条件检查确保在build和serve模式下都能正常工作
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('即时导航兼容性处理已加载');
  
  // 检查是否支持Material for MkDocs的document$可观察对象
  // 关键条件: !window.document$.isStopped 确保在build模式下也能正常工作
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
        // 重新初始化可能需要在页面切换后重新运行的脚本
        if (typeof window.initCustomScripts === 'function') {
          window.initCustomScripts();
        }
      }, 100);
    });
  } else {
    console.log('未检测到Material for MkDocs的即时导航功能或已停止');
  }
});

// 提供全局初始化函数，可以被其他脚本调用
window.initCustomScripts = function() {
  // 这里可以添加需要在每次页面加载时执行的代码
  console.log('自定义脚本重新初始化');
  
  // 触发页脚重新初始化的事件
  const footerEvent = new CustomEvent('footer.reinit');
  document.dispatchEvent(footerEvent);
};
