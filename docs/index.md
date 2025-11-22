---
# title: 欢迎来到我的博客
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
# comments: true
---



<!-- OneClip 公告栏 -->
<div class="oneclip-announcement">
  <div class="oneclip-announcement-content">
    🎉 <strong>新产品限免！</strong>
    <a href="https://oneclip.cloud/" target="_blank">OneClip</a>
    - 专为 macOS 打造的剪贴板管理工具，让你的工作效率翻倍！
    <a href="https://oneclip.cloud/" target="_blank" class="oneclip-cta">立即体验 →</a>
  </div>
</div>



<!-- 在头部添加预加载关键资源 -->
<link rel="preload" href="https://pic4.zhimg.com/v2-a0456a5f527c1923f096759f2926012f_1440w.jpg" as="image" fetchpriority="high">
<link rel="preload" href="https://s1.imagehub.cc/images/2025/07/25/27c0e105ea7efbed5d046d3a8c303e9d.jpeg" as="image">
<!-- https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg -->
<!-- wcowin-header.html -->
<div class="wcowin-header-row">
  <!-- 左侧：文字内容 -->
  <div class="wcowin-header-text">
    <div class="wcowin-header-title">Wcowin</div>
    <div class="wcowin-header-subtitle">
      <span class="wcowin-header-subtitle-inner">
        A college student
        <svg width="280" height="18" class="wcowin-header-underline" xmlns="http://www.w3.org/2000/svg">
          <path d="M8,12 Q38,18 68,12 Q98,6 128,12 Q158,18 188,12 Q218,6 248,12 Q278,18 308,12"
            stroke="#6ecbff" stroke-width="5" fill="none"
            stroke-linecap="round" stroke-linejoin="round"
            style="filter: blur(0.2px); opacity: 0.85;" />
        </svg>
      </span>
    </div>
    <!-- <div class="wcowin-header-motto">Free and diffuse</div> -->
    <div class="wcowin-header-btns">
      <a href="https://github.com/Wcowin" target="_blank" class="wcowin-header-btn">Github</a>
      <a href="mailto:wcowin@qq.com" class="wcowin-header-btn">Contact me</a>
    </div>
  </div>
  <!-- 右侧：头像及光辉 -->
  <div class="wcowin-header-avatar">
    <div class="flip-glow-ultimate">
      <div class="flip-glow-ultimate-glow"></div>
      <div class="flip-glow-ultimate-imgs">
        <img src="https://pic4.zhimg.com/v2-a0456a5f527c1923f096759f2926012f_1440w.jpg" alt="Back Image" class="flip-glow-ultimate-back" loading="eager" fetchpriority="high" width="280" height="280">
        <img src="https://s1.imagehub.cc/images/2025/07/25/27c0e105ea7efbed5d046d3a8c303e9d.jpeg" alt="Front Image" class="flip-glow-ultimate-front" loading="lazy" width="280" height="280">
      </div>
    </div>
  </div>
</div>

<!-- 移动端显示的标语 -->
<div class="mobile-motto">
  <h1>循此苦旅 以达星辰</h1>
</div>

<style>
/* ====== 布局主容器 ====== */
.wcowin-header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
  margin: 48px 0 32px 0;
  flex-wrap: wrap;
  min-height: 320px;
}

/* ====== 左侧文字区 ====== */
.wcowin-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 260px;
  max-width: 420px;
  flex: 1 1 320px;
  padding: 0 8px;
}

.wcowin-header-title {
  font-size: 3.2rem;
  /* font-family: 'LXGW WenKai', 'Segoe UI', 'PingFang SC', 'Hiragino Sans', Arial, sans-serif; */
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 18px;
  background: linear-gradient(to right, #3a8dde, #6ecbff, #a2d8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  display: flex;
  align-items: center;
  text-shadow: 0 2px 10px rgba(106, 203, 255, 0.13);
}

.wcowin-header-subtitle {
  font-size: 1.7rem;
  font-weight: bold;
  color: #222;
  position: relative;
  margin-bottom: 22px;
  /* font-family: 'LXGW WenKai', 'Segoe UI', 'PingFang SC', Arial, sans-serif; */
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap; /* 防止文本换行 */
}

.wcowin-header-subtitle-inner {
  color: #757575;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  letter-spacing: 0.5px;
  white-space: nowrap; /* 确保文本不会换行 */
  width: auto; /* 确保宽度自适应内容 */
}

/* Safari特定修复 */
@media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    .wcowin-header-subtitle-inner {
      display: inline-block;
      width: auto !important;
      min-width: 280px; /* 确保足够宽度容纳文本 */
    }
  }
}

/* 添加深色模式的文字颜色适配 - 更强烈的对比度 */
@media (prefers-color-scheme: dark) {
  .wcowin-header-subtitle {
    color: #757575;
  }

  .wcowin-header-subtitle-inner {
    color: #757575;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important; /* 增强阴影 */
  }

  .wcowin-header-motto {
    color: #d0d0d0 !important; /* 更亮的灰色 */
  }

  /* 确保SVG波浪线在深色模式下可见 */
  .wcowin-header-underline path {
    stroke: #6ecbff !important; /* 确保波浪线颜色鲜明 */
    opacity: 1 !important;
  }
}

.wcowin-header-underline {
  position: absolute;
  left: 0;
  bottom: 0;
  pointer-events: none;
}

.wcowin-header-motto {
  /* font-family: 'LXGW WenKai', sans-serif; */
  font-size: 1.2rem;
  color: #757575;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 22px;
  opacity: 0.92;
}

.wcowin-header-btns {
  display: flex;
  gap: 18px;
  margin-top: 8px;
}

.wcowin-header-btn {
  display: inline-block;
  padding: 7px 22px;
  font-size: 1.08rem;
  font-weight: 500;
  color: #3a8dde;
  background: #f5faff;
  border: 1.5px solid #b6eaff;
  border-radius: 24px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: 0 2px 8px rgba(106, 203, 255, 0.07);
}
.wcowin-header-btn:hover {
  background: #e6f4ff;
  color: #222;
  border-color: #3a8dde;
}

/* 夜间模式按钮样式 */
@media (prefers-color-scheme: dark) {
  .wcowin-header-btn {
    color: #6ecbff;
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(110, 203, 255, 0.4);
    box-shadow: 0 2px 8px rgba(106, 203, 255, 0.1);
  }

  .wcowin-header-btn:hover {
    background: rgba(110, 203, 255, 0.15);
    color: #ffffff;
    border-color: #6ecbff;
  }
}

/* 为使用 data-md-color-scheme 的主题添加支持 */
[data-md-color-scheme="slate"] .wcowin-header-btn {
  color: #6ecbff;
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(110, 203, 255, 0.4);
  box-shadow: 0 2px 8px rgba(106, 203, 255, 0.1);
}

[data-md-color-scheme="slate"] .wcowin-header-btn:hover {
  background: rgba(110, 203, 255, 0.15);
  color: #ffffff;
  border-color: #6ecbff;
}

/* ====== 右侧头像区 ====== */
.wcowin-header-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 240px;
  flex: 0 0 280px;
}

.flip-glow-ultimate {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flip-glow-ultimate-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 320px; height: 320px; /* 从360px减小到320px */
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(circle at 60% 40%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 60%, transparent 100%),
    conic-gradient(from 0deg,
      #ff9edb 0%, #a2d8ff 20%, #a8ffb0 40%, #fff5a8 60%, #ffb0b0 80%, #ff9edb 100%
    );
  filter: blur(50px) brightness(1.1) saturate(1.2); /* 减小模糊半径和亮度 */
  opacity: 0.85; /* 降低不透明度 */
  animation:
    glow-ultimate-rotate 15s linear infinite,
    glow-ultimate-breath 5s ease-in-out infinite alternate,
    glow-ultimate-hue 25s linear infinite;
}

@keyframes glow-ultimate-rotate {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes glow-ultimate-breath {
  0% { opacity: 0.7; filter: blur(50px) brightness(1.05) saturate(1.1); transform: translate(-50%, -50%) scale(0.92);}
  50% { opacity: 0.85; filter: blur(55px) brightness(1.15) saturate(1.25); transform: translate(-50%, -50%) scale(1.0);}
  100% { opacity: 0.7; filter: blur(50px) brightness(1.05) saturate(1.1); transform: translate(-50%, -50%) scale(0.92);}
}

/* 为深色模式添加特定的光辉调整 */
@media (prefers-color-scheme: dark) {
  .flip-glow-ultimate-glow {
    width: 300px; height: 300px; /* 在深色模式下进一步减小 */
    filter: blur(45px) brightness(0.95) saturate(1.1); /* 降低亮度 */
    opacity: 0.75; /* 降低不透明度 */
  }

  @keyframes glow-ultimate-breath {
    0% { opacity: 0.65; filter: blur(45px) brightness(0.9) saturate(1.0); transform: translate(-50%, -50%) scale(0.9); }
    50% { opacity: 0.75; filter: blur(50px) brightness(1.0) saturate(1.15); transform: translate(-50%, -50%) scale(0.98); }
    100% { opacity: 0.65; filter: blur(45px) brightness(0.9) saturate(1.0); transform: translate(-50%, -50%) scale(0.9); }
  }
}

@keyframes glow-ultimate-hue {
  0% { filter: blur(60px) brightness(1.2) saturate(1.3) hue-rotate(0deg); }
  50% { filter: blur(60px) brightness(1.2) saturate(1.3) hue-rotate(20deg); }
  100% { filter: blur(60px) brightness(1.2) saturate(1.3) hue-rotate(0deg); }
}

.flip-glow-ultimate-imgs {
  position: relative;
  width: 280px;
  height: 280px;
  perspective: 1200px;
  z-index: 2;
}
.flip-glow-ultimate-imgs img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 8px 24px rgba(14, 30, 37, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);
  backface-visibility: hidden;
  transition: transform 1.2s cubic-bezier(.4,2,.6,1), box-shadow 0.3s ease;
  background: #fff;
}
.flip-glow-ultimate-imgs img.flip-glow-ultimate-back {
  z-index: 1;
  transform: rotateY(0deg);
}
.flip-glow-ultimate-imgs img.flip-glow-ultimate-front {
  z-index: 0;
  transform: rotateY(180deg);
}
.flip-glow-ultimate-imgs:hover img.flip-glow-ultimate-back {
  transform: rotateY(180deg);
  z-index: 2;
  box-shadow: 0 12px 32px rgba(14, 30, 37, 0.25);
}
.flip-glow-ultimate-imgs:hover img.flip-glow-ultimate-front {
  transform: rotateY(0deg);
  z-index: 3;
  box-shadow: 0 12px 32px rgba(14, 30, 37, 0.25);
}

/* ====== 响应式布局 ====== */
@media (max-width: 1100px) {
  .wcowin-header-row {
    gap: 32px;
  }
  .wcowin-header-title {
    font-size: 2.2rem;
  }
  .flip-glow-ultimate,
  .flip-glow-ultimate-imgs {
    width: 200px;
    height: 200px;
  }
  .flip-glow-ultimate-glow {
    width: 260px;
    height: 260px;
  }
}
@media (max-width: 700px) {
  .wcowin-header-row {
    flex-direction: column-reverse;
    gap: 0px; /* 减少到最小间距 */
    min-height: unset;
    margin: 12px 0 12px 0; /* 减小上下边距 */
  }
  .wcowin-header-text {
    align-items: center;
    text-align: center;
    max-width: 98vw;
    margin-top: -10px; /* 添加负边距拉近与头像的距离 */
  }
  .wcowin-header-avatar {
    margin-bottom: 0px; /* 移除底部间距 */
  }
  .wcowin-header-title {
    margin-bottom: 12px; /* 减小标题下方间距 */
  }
  .wcowin-header-subtitle {
    margin-bottom: 16px; /* 减小副标题下方间距 */
  }
  .wcowin-header-motto {
    margin-bottom: 16px; /* 减小座右铭下方间距 */
  }

  /* 调整头像大小，使其在移动端更小 */
  .flip-glow-ultimate,
  .flip-glow-ultimate-imgs {
    width: 220px;
    height: 220px;
  }
  .flip-glow-ultimate-glow {
    width: 220px;
    height: 220px;
  }
}
/* 添加一个额外的样式类，可以直接应用到元素上 */
.dark-visible-text {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* 移动端样式 */
.mobile-motto {
  display: none;
  text-align: center;
  padding: 15px 0;
  margin: 10px 0;
}

.mobile-motto h1 {
  font-size: 1.8rem;
  color: #757575;
  /* font-family: 'LXGW WenKai', 'Segoe UI', 'PingFang SC', Arial, sans-serif; */
  font-weight: 500;
  margin: 0;
}

@media (max-width: 700px) {
  /* 隐藏原有头部 */
  .wcowin-header-row {
    display: none !important;
  }

  /* 显示移动端标语 */
  .mobile-motto {
    display: block;
  }
}
</style>


<!-- 移除这个换行符，它会产生额外的空间 -->
<!-- <br class="desktop-only"/> -->

<!-- 修改分隔线上下的间距 -->
<style>
/* 移除了冗余的 .desktop-only 样式 */

/* 减少分隔线的边距 */
hr {
  margin: 0.5rem 0 !important;
}

/* 减少卡片网格的间距 */
.grid.cards {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

/* 减少卡片内部的间距 */
.grid.cards > ul > li {
  padding: 0.8rem !important;
}

/* 减少卡片之间的间距 */
.grid.cards > ul {
  gap: 0.5rem !important;
}

/* 减少问候框的边距 */
#greeting {
  margin-bottom: 10px !important;
  padding: 8px !important;
}
</style>

---

<div id="greeting" class="greeting-container">
  <span id="greeting-text" class="greeting-text">加载中...</span>
</div>

<style>
  .greeting-container {
    text-align: center;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0.5);
    border: 1px solid rgba(200, 200, 200, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .greeting-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #555;
    /* font-family: 'LXGW WenKai', sans-serif; */
    /* 添加最小高度避免布局抖动 */
    min-height: 1.5rem;
  }

  /* 夜间模式适配 */
  [data-md-color-scheme="slate"] .greeting-container {
    background-color: rgba(30, 41, 59, 0.6);
    border-color: rgba(80, 100, 140, 0.2);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  [data-md-color-scheme="slate"] .greeting-text {
    color: #e0e0e0;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .greeting-container {
      padding: 10px;
      margin-bottom: 15px;
    }

    .greeting-text {
      font-size: 1.3rem;
    }
  }
</style>

<script>
  // 优化的问候函数
  function updateGreeting() {
    const greetingElement = document.getElementById('greeting-text');
    if (!greetingElement) {
      // 如果元素不存在，延迟重试
      setTimeout(updateGreeting, 100);
      return;
    }

    const hour = new Date().getHours();
    let greeting;

    if (hour >= 0 && hour < 5) {
      greeting = "夜深了，注意休息 🌙";
    } else if (hour >= 5 && hour < 7) {
      greeting = "早安，新的一天开始啦 🌅";
    } else if (hour >= 7 && hour < 9) {
      greeting = "早上好，开始美好的一天 ☀️";
    } else if (hour >= 9 && hour < 11) {
      greeting = "上午好，保持专注 ✨";
    } else if (hour >= 11 && hour < 13) {
      greeting = "中午好，该休息一下了 🍲";
    } else if (hour >= 13 && hour < 15) {
      greeting = "午后时光，继续加油 ☕";
    } else if (hour >= 15 && hour < 18) {
      greeting = "下午好，别忘了喝水 🌤️";
    } else if (hour >= 18 && hour < 20) {
      greeting = "傍晚好，放松一下吧 🌆";
    } else if (hour >= 20 && hour < 22) {
      greeting = "晚上好，享受宁静时光 🌃";
    } else {
      greeting = "夜深了，早点休息哦 🌠";
    }

    greetingElement.textContent = greeting;
  }

  // 多重保险的初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateGreeting);
  } else {
    // DOM 已经加载完成
    updateGreeting();
  }

  // 额外的后备方案
  if (document.getElementById('greeting-text')) {
    updateGreeting();
  } else {
    // 如果元素还没有加载，等待一下
    setTimeout(updateGreeting, 200);
  }
</script>

---

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } __导航栏__

    ---
    ![image](https://pic1.zhimg.com/80/v2-b9ae6898d33359da6be815bf60626af2_1440w.webp?source=2c26e567){ class="responsive-image" loading="lazy" align=right width="340" height="226" style="border-radius: 2.5em 1.5em 3em 2em / 2em 2.5em 1.5em 3em;" }

    - [x] 通过{==目录==}以打开文章
    - [x] 搜索{~~~>关键词~~}查询文章
    - [x] 如遇页面卡顿，请使用[{--科学上网--}](blog/technique%20sharing/kexue.md)
    - [x] 𝕙𝕒𝕧𝕖 𝕒 𝕘𝕠𝕠𝕕 𝕥𝕚𝕞𝕖 !

    === "Mac/PC端"

        请在上方标签选择分类/左侧目录选择文章

    === "移动端"

        请点击左上角图标选择分类和文章

</div>
<style>
    @media only screen and (max-width: 768px) {
        .responsive-image {
            display: none;
        }
    }
</style>


***


<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

    - [模型上下文协议(MCP)简述](develop/AI/mcp.md)
    - [DeepSeek:从入门到精通](develop/deepseek.md)
    - [将Python文件打包成.exe可执行程序](blog/py/python.md)
    - [Homebrew如何安装(Mac & Linux)](blog/Mac/homebrew.md)

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程(三步搞定)__

    ---

    - [Mkdocs前言](blog/Mkdocs/mkfirst.md)
    - [利用Mkdocs部署静态网页](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)
    - [如何给MKdocs添加友链](blog/Mkdocs/linktech.md)


-   :material-format-font:{ .lg .middle } __好用/好玩__

    ---

    - [AI网站分享](develop/AI.md)
    - [好用/好玩网站分享](blog/Webplay.md)
    - [Mac/windows软件网站汇总](blog/macsoft.md)
    - [重庆旅游推荐路线](trip/InCQ/CQ.md)

-   :simple-aboutdotme:{ .lg .middle } __关于__

    ---

    - [留言板](waline.md)[^Knowing-that-loving-you-has-no-ending]
    - [博客](blog/index.md)
    - [:octicons-arrow-right-24: 了解我](about/geren.md)[^see-how-much-I-love-you]
    - [支持作者](about/zcw.md)
</div>



[^Knowing-that-loving-you-has-no-ending]:太阳总是能温暖向日葵
[^see-how-much-I-love-you]:All-problems-in-computer-science-can-be-solved-by-another-level-of-indirection



<!--
____    __    ____  ______   ______   ____    __    ____  __  .__   __.
\   \  /  \  /   / /      | /  __  \  \   \  /  \  /   / |  | |  \ |  |
 \   \/    \/   / |  ,----'|  |  |  |  \   \/    \/   /  |  | |   \|  |
  \            /  |  |     |  |  |  |   \            /   |  | |  . `  |
   \    /\    /   |  `----.|  `--'  |    \    /\    /    |  | |  |\   |
    \__/  \__/     \______| \______/      \__/  \__/     |__| |__| \__|
-->



<!-- 发邮件(1) 微信(2) MKdocs视频教程(3)
{ .annotate }

1. 点击右下角[:material-email:](mailto:<wangkewen821@gmail.com>)即可发送邮件.
2. TEL:18939533255(微信号)
3. 点击右下角[:simple-bilibili:](https://space.bilibili.com/1407028951/lists/4566631?type=series)图标查看视频教程. -->


<style>
.md-grid {
  max-width: 1220px;
}
</style>


<style>
body {
  position: relative; /* 确保 body 元素的 position 属性为非静态值 */
}

body::before {
  --size: 35px; /* 调整网格单元大小 */
  --line: color-mix(in hsl, canvasText, transparent 80%); /* 调整线条透明度 */
  content: '';
  height: 100vh;
  /* width: 100%; */
  width: 100vw;
  position: absolute; /* 修改为 absolute 以使其随页面滚动 */
  background: linear-gradient(
        90deg,
        var(--line) 1px,
        transparent 1px var(--size)
      )
      50% 50% / var(--size) var(--size),
    linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
      var(--size) var(--size);
  -webkit-mask: linear-gradient(-20deg, transparent 50%, white);
          mask: linear-gradient(-20deg, transparent 50%, white);
  top: 0;
  transform-style: flat;
  pointer-events: none;
  z-index: -1;
}

@media (max-width: 768px) {
  body::before {
    display: none; /* 在手机端隐藏网格效果 */
  }

  /* 在移动端禁用复杂动画以提升性能 */
  .flip-glow-ultimate-glow {
    animation: none;
    opacity: 0.3;
  }
}
</style>

<!--
  将所有页面级脚本和元数据统一放置在这里
-->
<!-- Umami Analytics -->
<script defer src="https://cloud.umami.is/script.js" data-website-id="061b4dea-9b7b-4ffa-9071-74cde70f3dfb"></script>
<!-- Google Adsense -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2327435979273742"
     crossorigin="anonymous"></script> -->

<!--
  Google Adsense 广告单元
  (如果需要，可以取消注释)
-->
<!--
<ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2327435979273742"
    data-ad-slot="3702206121"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
-->

<!-- [timeline(./docs/timeline/timeindex.json)] -->

<!-- <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "sks5yth4qj");
</script> -->


<meta name="algolia-site-verification"  content="3CAAB2C27102AD08" />