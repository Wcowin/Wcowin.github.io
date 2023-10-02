---
title: 留言板
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
comments: true
---

!!!bug
    - 评论区需要刷新才能使用，正在修复中(大概率已修复)
# （可以不）刷新即可加载评论区



<div id="tcomment"></div>
<script src="https://cdn.staticfile.org/twikoo/1.6.21/twikoo.all.min.js"></script>
<script>
twikoo.init({
  envId: 'https://superb-salamander-e730b6.netlify.app/.netlify/functions/twikoo', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  el: '#tcomment', // 容器元素
  // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
  // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
  // lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
})
</script>


***

<!-- <head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v2/dist/waline.css"
  />
  

</head>


  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs';
    
    init({
      el: '#waline',
      serverURL: 'https://mk-docs-comments.vercel.app/',
      emoji: [
      'https://unpkg.com/@waline/emojis@1.1.0/qq',
      'https://unpkg.com/@waline/emojis@1.1.0/tw-emoji',
      '//unpkg.com/@waline/emojis@1.1.0/bilibili',
      '//unpkg.com/@waline/emojis@1.1.0/weibo',
      
    ],
      comment: true,
      pageview: true, 
      lang: 'zh',
      pageview: true,
    });
  </script> -->


<script src="https://giscus.app/client.js"
        data-repo="Wcowin/hexo-site-comments"
        data-repo-id="R_kgDOIl9OJA"
        data-category="Announcements"
        data-category-id="DIC_kwDOIl9OJM4CTHDe"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>

<ul>
  <li>
    当前页面浏览量:
    <span class="waline-pageview-count" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client/dist/pageview.mjs';

  pageviewCount({
    serverURL: 'https://mk-docs-comments.vercel.app/',
    path: window.location.pathname,

    // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // 可选的，是否在获取时增加访问量，默认为 `true`
    // update: true,
  });
</script>

