/**
 * 统一的即时导航处理工具
 * 为所有自定义脚本提供一致的页面切换处理机制
 */

(function() {
  'use strict';
  
  // 存储所有注册的回调函数
  const callbacks = [];
  
  /**
   * 注册一个在页面内容更新时执行的回调函数
   * @param {Function} callback 回调函数
   * @param {string} name 回调函数的名称（用于调试）
   * @return {Function} 返回一个函数，调用它可以取消注册
   */
  function registerCallback(callback, name = 'unnamed') {
    if (typeof callback !== 'function') {
      console.error('注册的回调必须是函数');
      return () => {};
    }
    
    const callbackInfo = { callback, name };
    callbacks.push(callbackInfo);
    
    console.log(`已注册页面更新回调: ${name}`);
    
    // 返回取消注册的函数
    return function unregister() {
      const index = callbacks.indexOf(callbackInfo);
      if (index !== -1) {
        callbacks.splice(index, 1);
        console.log(`已取消注册页面更新回调: ${name}`);
      }
    };
  }
  
  /**
   * 执行所有注册的回调函数
   */
  function executeCallbacks() {
    console.log(`执行 ${callbacks.length} 个页面更新回调`);
    
    callbacks.forEach(({ callback, name }) => {
      try {
        callback();
      } catch (error) {
        console.error(`执行回调 "${name}" 时出错:`, error);
      }
    });
  }
  
  /**
   * 初始化即时导航处理
   */
  function init() {
    // 检查是否支持Material for MkDocs的document$可观察对象
    // 关键条件: !window.document$.isStopped 确保在build模式下也能正常工作
    if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
      console.log('检测到Material for MkDocs的即时导航功能');
      
      // 监听页面内容变化
      window.document$.subscribe(function() {
        console.log('页面内容已更新');
        
        // 触发自定义事件
        const event = new CustomEvent('navigation.instant.complete');
        document.dispatchEvent(event);
        
        // 延迟执行回调，确保DOM已完全更新
        setTimeout(executeCallbacks, 100);
      });
    } else {
      console.log('未检测到Material for MkDocs的即时导航功能或已停止');
      
      // 对于不支持即时导航的情况，仅在初始加载时执行一次
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeCallbacks);
      } else {
        executeCallbacks();
      }
    }
    
    // 监听自定义事件，用于手动触发回调执行
    document.addEventListener('custom.reinit', executeCallbacks);
  }
  
  // 初始化
  init();
  
  // 导出API
  window.InstantNavigation = {
    register: registerCallback,
    executeCallbacks: executeCallbacks
  };
})();