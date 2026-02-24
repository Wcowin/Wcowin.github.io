/**
 * TWT Chat 全站接入脚本（MkDocs/Zensical）
 * - 通过 extra_javascript 注入
 * - 兼容 Material/Zensical 即时导航（document$）
 * - 防止重复加载 core.js
 */
(function () {
  'use strict';

  var TWT_CONFIG = {
    appid: 'a4e3634dc3c8ec65c40ebedcb8c9c72f',
    lang: 'zh-cn',
    theme: 'light',
    sbs: '',
    sbs_mm: '',
    ranstr: '',
    icon: '1',
    position: { right: '0px', bottom: '0px' },
  };

  var CORE_SRC = 'https://visitorchat.twt.com/install/core.js?version=v1.2';
  var CORE_ID = 'twt-visitorchat-core';

  function install() {
    // 配置允许重复赋值（例如未来按主题动态切换）
    window.__twt__config = TWT_CONFIG;

    // core.js 只加载一次
    if (document.getElementById(CORE_ID)) return;
    if (!document.head) return;

    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.id = CORE_ID;
    script.src = CORE_SRC;
    document.head.appendChild(script);
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  // 首次进入页面
  onReady(install);

  // 兼容 Material/Zensical 即时导航（页面切换不会触发重新加载脚本）
  function bindInstantNavigation() {
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(function () {
        onReady(install);
      });
      return true;
    }
    return false;
  }

  if (!bindInstantNavigation()) {
    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      if (bindInstantNavigation() || tries > 20) {
        window.clearInterval(timer);
      }
    }, 500);
  }
})();

