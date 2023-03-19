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


<div id="article-info">
  <!-- ... -->
  阅读量: <span class="waline-pageview-count" data-path="docs/waline.md" />
  <!-- ... -->
</div>
<!-- 文章内容 -->
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs';

  init({
    el: '#waline',
    // ...
    pageview: true, // 浏览量统计
  });
</script>
