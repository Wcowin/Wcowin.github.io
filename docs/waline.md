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
    - 评论区需要刷新才能使用，正在修复中
# 刷新即可加载评论区


<head>
  <!-- ... -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v2/dist/waline.css"
  />
  
  <!-- ... -->
</head>
<body>
  <!-- ... -->
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
  </script>
</body>

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

