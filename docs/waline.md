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
# 刷新即可加载评论

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
    });
  </script>
</body>
