/**
 * Twikoo 评论区自动注入
 * - 默认所有页面自动启用评论区
 * - 通过 EXCLUDE_PATHS 路径前缀列表排除特定页面（如首页、留言板、友链等）
 * - 评论区挂载到正文容器 .md-content__inner 末尾
 *
 * 调整排除规则：修改下面的 EXCLUDE_PATHS 数组即可
 * （路径为站点根路径，如 '/' 表示首页，'/waline' 表示留言板）
 */

(function () {
  'use strict';

  // ===== 排除规则 =====
  // 普通字符串 = 前缀匹配（匹配该目录及子页），如 '/waline' 排除留言板整目录
  // 以 '=/' 开头 = 精确匹配单个页面，如 '=/research' 只排除科研主页，不影响 /research/xxx 子页
  var EXCLUDE_PATHS = [
    // '/trip',                      // 旅行（整目录）
    '/relax',                     // 随笔/情书/影视（整目录）
    '/waline',                    // 留言板
    '/link',                      // 友链
    '/about',                     // 关于/简历/声明/年度总结（整目录）
    '/blog/indexblog',            // 博客索引页
    '/tag',                       // 标签页
    // 以下为各分类的 index 主页（均用 '=/' 精确匹配，不屏蔽其目录下子页）
    '=/blog',                     // 博客主页
    '=/develop',                  // 开发主页
    '=/develop/AI',               // AI 主页
    '=/develop/Mac-development',  // Mac 开发主页
    '=/develop/Mywork',           // 作品主页
    '=/research',                 // 科研主页
    '=/research/aerotech',        // 空天主页
    '=/trip',                     // 旅行主页
    '=/OneClip',                  // OneClip 主页
    '=/blog/Cryptography'         // 密码学主页
  ];
  // 永远是首页的路径（显式列出，避免被空串跳过）
  var HOME_PATHS = ['', '/', '/index.html', '/index'];
  // =============================================

  function shouldExclude() {
    var path = window.location.pathname.replace(/\/+$/, ''); // 去掉尾部斜杠
    if (HOME_PATHS.indexOf(path) !== -1) return true;          // 首页始终排除
    for (var i = 0; i < EXCLUDE_PATHS.length; i++) {
      var rule = EXCLUDE_PATHS[i].replace(/\/+$/, '');
      if (rule.charAt(0) === '=') {
        // 精确匹配：仅排除该页面本身
        if (path === rule.slice(1)) return true;
      } else {
        // 前缀匹配：排除目录及子页
        if (rule === '') continue;
        if (path === rule || path.indexOf(rule + '/') === 0) {
          return true;
        }
      }
    }
    return false;
  }

  function initTwikoo() {
    if (shouldExclude()) return;

    var container = document.querySelector('.md-content__inner') ||
                   document.querySelector('.md-content article') ||
                   document.querySelector('.md-content');
    if (!container) {
      requestAnimationFrame(initTwikoo);
      return;
    }

    if (document.getElementById('tcomment')) return;

    var box = document.createElement('div');
    box.id = 'tcomment';
    box.style.marginTop = '2rem';
    container.appendChild(box);

    if (window.twikoo && typeof window.twikoo.init === 'function') {
      window.twikoo.init({
        envId: 'https://superb-salamander-e730b6.netlify.app/.netlify/functions/twikoo',
        el: '#tcomment',
        lang: 'zh-CN'
      });
    }
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(initTwikoo);
})();
