---
title: 留言板
hide:
  # - navigation # 显示右
  # - toc #显示左
  - footer
  - feedback
comments: false
disqus: true
---
# 畅所欲言  
<div class="poem-wrap">
  <div class="poem-border poem-left"></div>
  <div class="poem-border poem-right"></div>
    <h1>留言板</h1>
    <p id="poem">月落乌啼霜满天 江枫渔火对愁眠</p>
    <p id="info"> 《枫桥夜泊》【唐代】张继</p>
  </div>



<!-- tw开始 -->

<!-- <body>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"></script>
</head>
  <div id="tcomment"></div> 
  <script src="https://cdn.staticfile.org/Waline/1.6.31/Waline.all.min.js"></script> 
  <script>
Waline.init({
  envId: 'https://superb-salamander-e730b6.netlify.app/.netlify/functions/Waline', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  el: '#tcomment', // 容器元素
   //region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
  // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
   //lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/Walinejs/Waline/blob/main/src/client/utils/i18n/index.js
   onCommentLoaded: function () {
    console.log('评论加载完成');
  }
})
</script>  
 </body> -->

<!-- end -->

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

<!-- <div id="rcorners5" > -->

<!-- <div id="cusdis_thread"
  data-host="https://cusdis.com"
  data-app-id="655cf3bc-734a-4d88-8317-be350621334c"
  data-page-id="{{ PAGE_ID }}"
  data-page-url="{{ PAGE_URL }}"
  data-page-title="{{ PAGE_TITLE }}"
></div>
<script async defer src="https://cusdis.com/js/cusdis.es.js"></script> -->


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>评论系统切换</title>
    <style>
        .comment-system {
            display: none;
        }
        .comment-system.active {
            display: block;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .buttonxuan {
            background-color: white;
            color: black;
            border-radius: 18px;
            border: 2px solid rgba(189, 224, 245);
            padding: 16px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
            cursor: pointer;
        }
        .buttonxuan:hover {
            background-color: rgba(189, 224, 245);
            color:rgb(4, 0, 0);
        }
        .buttonxuan.active {
            background-color: rgba(189, 224, 245);
            color:rgb(4, 0, 0);
        }
        @media (max-width: 768px) {
            .buttonxuan {
                padding: 10px 20px;
                font-size: 14px;
                margin: 5px;
                width: 100%;
                box-sizing: border-box;
            }
            .button-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: nowrap;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="button-container">
        <button id="giscus-btn" class="buttonxuan active">Giscus</button>
        <button id="Waline-btn" class="buttonxuan">Waline</button>
        <button id="cusdis-btn" class="buttonxuan">Cusdis</button>
    </div>
    <div id="giscus" class="comment-system active">
        <!-- Giscus 评论系统代码 -->
        <script src="https://giscus.app/client.js"
            data-repo="Wcowin/hexo-site-comments"
            data-repo-id="R_kgDOIl9OJA"
            data-category="Announcements"
            data-category-id="DIC_kwDOIl9OJM4CTHDe"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="preferred_color_scheme"
            data-lang="zh-CN"
            data-loading="lazy"  
            crossorigin="anonymous"
            async>
        </script>
    </div>
    <div id="cusdis" class="comment-system">
        <!-- Cusdis 评论系统代码 -->
        <center><p>评论审核后才会显示</p></center>
        <div id="cusdis_thread"
            data-host="https://cusdis.com"
            data-app-id="655cf3bc-734a-4d88-8317-be350621334c"
            data-page-id="{{ PAGE_ID }}"
            data-page-url="{{ PAGE_URL }}"
            data-page-title="{{ PAGE_TITLE }}">
        </div>
        <script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
    </div>
    <div id="Waline" class="comment-system">
        <!-- Waline 评论系统代码 -->
        <div id="Waline-container"></div>
        <center><p>评论区若不显示，请刷新一次页面</p></center>
<head>
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
  </script>
    </div>
    <script>
        document.getElementById('giscus-btn').addEventListener('click', function() {
            document.getElementById('giscus').classList.add('active');
            document.getElementById('cusdis').classList.remove('active');
            document.getElementById('Waline').classList.remove('active');
            this.classList.add('active');
            document.getElementById('cusdis-btn').classList.remove('active');
            document.getElementById('Waline-btn').classList.remove('active');
        });
        document.getElementById('cusdis-btn').addEventListener('click', function() {
            document.getElementById('giscus').classList.remove('active');
            document.getElementById('cusdis').classList.add('active');
            document.getElementById('Waline').classList.remove('active');
            this.classList.add('active');
            document.getElementById('giscus-btn').classList.remove('active');
            document.getElementById('Waline-btn').classList.remove('active');
        });
        document.getElementById('Waline-btn').addEventListener('click', function() {
            document.getElementById('giscus').classList.remove('active');
            document.getElementById('cusdis').classList.remove('active');
            document.getElementById('Waline').classList.add('active');
            this.classList.add('active');
            document.getElementById('giscus-btn').classList.remove('active');
            document.getElementById('cusdis-btn').classList.remove('active');
        });
        const buttons = document.querySelectorAll('.buttonxuan');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    </script>
</body>



<!-- <div class="reward-container">
  <div></div>
  <button style="border-radius: 0.5rem;" onclick="var qr = document.getElementById('qr'); qr.style.display = (qr.style.display === 'none') ? 'block' : 'none';">
    请作者喝杯咖啡
  </button>
  <div id="qr" style="display: none;">
      <div style="display: inline-block;">
        <img src="https://s2.loli.net/2024/02/01/cxrEKTLp5CiQeBw.jpg" alt="Wcowin 微信支付">
        <p>微信支付</p>
      </div>
      <div style="display: inline-block;">
        <img src="https://s2.loli.net/2024/02/01/ps8UM6xu2OL3Dyr.jpg" alt="Wcowin 支付宝">
        <p>支付宝</p>
      </div>

  </div>
</div> -->


---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>打赏</title>
    <style>
        .reward-container {
            margin: 20px auto;
            padding: 25px 0;
            text-align: center;
            width: 90%;
        }
        .reward-container button {
            background: none;
            border: 1px solid #608DBD;
            border-radius: 0.5rem;
            color: #608DBD;
            cursor: pointer;
            line-height: 2;
            outline: 0;
            padding: 0 15px;
            margin: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        .reward-container button:hover {
            color: #4a6e8c;
        }
        .qr-container {
            display: none;
            text-align: center;
            margin-top: 25px;
        }
        .qr-container img {
            width: 200px;
            margin: 10px;
            border-radius: 25px;
        }
        .qr-container p {
            font-size: 16px;
            color: #555;
        }
        .qr-option {
            display: inline-block;
            margin: 0 10px;
        }
    </style>
</head>
<body>
    <div class="reward-container">
        <button onclick="toggleQR()">
            请作者喝杯咖啡
        </button>
        <div id="qr" class="qr-container">
            <div class="qr-option">
                <img src="https://s2.loli.net/2024/02/01/cxrEKTLp5CiQeBw.jpg" alt="Wcowin 微信支付">
                <p>微信支付</p>
            </div>
            <div class="qr-option">
                <img src="https://s2.loli.net/2024/02/01/ps8UM6xu2OL3Dyr.jpg" alt="Wcowin 支付宝">
                <p>支付宝</p>
            </div>
        </div>
    </div>
    <script>
        function toggleQR() {
            const qrContainer = document.getElementById('qr');
            qrContainer.style.display = (qrContainer.style.display === 'none' || qrContainer.style.display === '') ? 'block' : 'none';
        }
    </script>
</body>
</html>