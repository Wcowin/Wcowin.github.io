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
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease-in-out;
            height: 0;
            overflow: hidden;
            margin-top: 20px;
        }
        .comment-system.active {
            opacity: 1;
            visibility: visible;
            height: auto;
        }
        .button-container {
            text-align: center;
            margin: 30px auto;
            max-width: 600px;
        }
        .buttonxuan {
            background-color: #ffffff;
            width: 180px;
            color: #999;
            border-radius: 25px;
            border: 2px solid #608DBD;
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 15px;
            font-weight: 500;
            margin: 0 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .buttonxuan:hover {
            background-color: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .buttonxuan.active {
            background-color: #608DBD;
            color: white;
            border-color: #3498db;
        }
        @media (max-width: 768px) {
            .button-container {
                padding: 0 15px;
            }
            .buttonxuan {
                width: 45%;
                padding: 10px 15px;
                font-size: 14px;
                margin: 5px;
            }
        }
        @media (max-width: 480px) {
            .buttonxuan {
                width: calc(50% - 20px);
                font-size: 13px;
                padding: 8px 12px;
            }
        }
    </style>
</head>
<body>
    <div class="button-container">
        <button id="giscus-btn" class="buttonxuan active">Giscus</button>
        <button id="cusdis-btn" class="buttonxuan">Cusdis</button>
    </div>
    <div id="giscus" class="comment-system active">
        <script src="https://giscus.app/client.js"
            data-repo="Wcowin/hexo-site-comments"
            data-repo-id="R_kgDOIl9OJA"
            data-mapping="number"
            data-term="8"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="noborder_light"
            data-lang="zh-CN"
            data-loading="lazy"  
            crossorigin="anonymous"
            async>
        </script>
    </div>
    <div id="cusdis" class="comment-system">
        <center><p>评论审核后才会显示(需要再刷新一次)</p></center>
        <div id="cusdis_thread"
            data-host="https://cusdis.com"
            data-app-id="655cf3bc-734a-4d88-8317-be350621334c"
            data-page-id="{{ PAGE_ID }}"
            data-page-url="{{ PAGE_URL }}"
            data-page-title="{{ PAGE_TITLE }}">
        </div>
        <script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
    </div>
    <script>
        document.querySelectorAll('.buttonxuan').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.buttonxuan').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.comment-system').forEach(system => system.classList.remove('active'));
                document.getElementById(this.id.replace('-btn', '')).classList.add('active');
            });
        });
    </script>


  <script>
    var giscus = document.querySelector("script[src*=giscus]")

    // Set palette on initial load
    var palette = __md_get("__palette")
    if (palette && typeof palette.color === "object") {
      var theme = palette.color.scheme === "slate"
        ? "transparent_dark"
        : "light"

      // Instruct Giscus to set theme
      giscus.setAttribute("data-theme", theme) 
    }

    // Register event handlers after documented loaded
    document.addEventListener("DOMContentLoaded", function() {
      var ref = document.querySelector("[data-md-component=palette]")
      ref.addEventListener("change", function() {
        var palette = __md_get("__palette")
        if (palette && typeof palette.color === "object") {
          var theme = palette.color.scheme === "slate"
            ? "transparent_dark"
            : "light"

          // Instruct Giscus to change theme
          var frame = document.querySelector(".giscus-frame")
          frame.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
          )
        }
      })
    })
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


<style>

.md-grid {
  max-width: 1300px;
}
</style>


<head>
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
          background-color: #608DBD;
          color: #fff;
      }
      .qr-container {
          display: none;
          text-align: center;
          margin-top: 25px;
      }
      .qr-container img {
          width: 200px; /* 统一图片宽度 */
          margin: 10px;
          border-radius: 25px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
              <img src="https://s2.loli.net/2025/02/07/stOifQrgoIYZzam.jpg" alt="Wcowin 微信支付">
              <p>微信支付</p>
          </div>
          <div class="qr-option">
              <img src="https://s2.loli.net/2025/02/07/YbLBRWztDM1lgUC.jpg" alt="Wcowin 支付宝">
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