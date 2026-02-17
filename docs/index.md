---
title: Wcowin's Blog
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
    🎉 <a href="https://oneclip.cloud/" target="_blank">OneClip</a> —— macOS剪贴板管理工具   <a href="https://oneclip.cloud/" target="_blank" class="oneclip-cta">了解更多 →</a><br>
    ☺️ <a href="https://wcowin.github.io/Zensical-Chinese-Tutorial/" target="_blank">Zensical中文教程</a> —— 最新的Zensical中文教程   
  </div>
</div>

<!-- 加载 Inter 字体 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet">

<!-- 在头部添加预加载关键资源 -->
<link rel="preload" href="https://pic4.zhimg.com/v2-a0456a5f527c1923f096759f2926012f_1440w.jpg" as="image" fetchpriority="high">
<link rel="preload" href="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" as="image">
<!-- https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg -->
<!-- wcowin-header.html -->
<div class="wcowin-header-row">
  <!-- 左侧：文字内容 -->
  <div class="wcowin-header-text">
    <div class="wcowin-header-title">Hi, I'm <span class="wcowin-name-box"><span class="name-text">Wcowin</span><span class="corner-bl"></span><span class="corner-br"></span></span></div>
    <div class="wcowin-header-subtitle">
      <span class="wcowin-header-subtitle-inner">
        <span id="typewriter-text"></span><span class="typewriter-cursor">|</span>
      </span>
    </div>
    <!-- <div class="wcowin-header-motto">Free and diffuse</div> -->
    <div class="wcowin-header-btns">
      <a href="https://github.com/Wcowin" target="_blank" class="md-button">
        <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
        Github
      </a>
      <a href="mailto:wcowin@qq.com" class="md-button">
        <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></span>
        Email me
      </a>
    </div>
  </div>
  <!-- 右侧：头像及光辉 -->
  <div class="wcowin-header-avatar">
    <div class="flip-glow-ultimate">
      <div class="flip-glow-ultimate-glow"></div>
      <div class="flip-glow-ultimate-imgs">
        <img src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" alt="Back Image" class="flip-glow-ultimate-front" loading="eager" fetchpriority="high" width="280" height="280">
        <img src="https://pica.zhimg.com/80/v2-74ecd899c7c4cc0258930eaff239a21b_1440w.webp" alt="Front Image" class="flip-glow-ultimate-back" loading="lazy" width="280" height="280">
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
  margin: -30px 0 16px 0;
  flex-wrap: wrap;
  min-height: 320px;
  /* Safari flexbox 兼容性 */
  -webkit-box-align: center;
  -webkit-box-pack: center;
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
  font-size: 2.1rem;
  font-family: 'Inter', 'Montserrat', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 18px;
  color: #4a4a4a;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}

/* Wcowin 名字带边框效果 */
.wcowin-name-box {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 4px 14px;
  margin-left: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px dashed #6b8e6b;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(107, 142, 107, 0.15);
  vertical-align: middle;
}

/* 四角小方块装饰 */
.wcowin-name-box::before,
.wcowin-name-box::after,
.wcowin-name-box .corner-bl,
.wcowin-name-box .corner-br {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background: #6b8e6b;
  border-radius: 1.5px;
}

.wcowin-name-box::before {
  top: -3px;
  left: -3px;
}

.wcowin-name-box::after {
  top: -3px;
  right: -3px;
}

.wcowin-name-box .corner-bl {
  position: absolute;
  bottom: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background: #6b8e6b;
  border-radius: 1.5px;
}

.wcowin-name-box .corner-br {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 6px;
  height: 6px;
  background: #6b8e6b;
  border-radius: 1.5px;
}

.wcowin-name-box .name-text {
  font-weight: 800;
  color: #2d3436;
  font-size: 1em;
  line-height: 1.2;
}

/* 深色模式适配 */
[data-md-color-scheme="slate"] .wcowin-name-box {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  border-color: #68d391;
  box-shadow: 0 2px 8px rgba(104, 211, 145, 0.2);
}

[data-md-color-scheme="slate"] .wcowin-name-box::before,
[data-md-color-scheme="slate"] .wcowin-name-box::after,
[data-md-color-scheme="slate"] .wcowin-name-box .corner-bl,
[data-md-color-scheme="slate"] .wcowin-name-box .corner-br {
  background: #68d391;
}

[data-md-color-scheme="slate"] .wcowin-name-box .name-text {
  color: #f7fafc;
}

.wcowin-header-subtitle {
  font-size: 1.7rem;
  font-weight: bold;
  color: #6D6D6D;
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
  color: #6D6D6D;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  letter-spacing: 0.5px;
  white-space: nowrap; /* 确保文本不会换行 */
  width: auto; /* 确保宽度自适应内容 */
  min-width: 280px; /* 防止打字时宽度跳动 */
}

/* 打字机光标样式 */
.typewriter-cursor {
  display: inline-block;
  color: #518FC1;
  font-weight: 300;
  animation: blink 1s steps(1, end) infinite;
  margin-left: 2px;
  /* 跨浏览器优化 */
  -webkit-animation: blink 1s steps(1, end) infinite;
  will-change: opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@-webkit-keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Safari特定修复 */
/* @media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    .wcowin-header-subtitle-inner {
      display: inline-block;
      width: auto !important;
      min-width: 280px; 
    }
  }
} */



/* 添加深色模式的文字颜色适配 - 更强烈的对比度 */
@media (prefers-color-scheme: dark) {
  .wcowin-header-subtitle {
    color: #757575;
  }

  .wcowin-header-subtitle-inner {
    color: #b0b0b0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important; /* 增强阴影 */
  }

  .wcowin-header-motto {
    color: #d0d0d0 !important; /* 更亮的灰色 */
  }

  /* 确保SVG波浪线在深色模式下可见 */
  .wcowin-header-underline path {
    stroke: #b0b0b0 !important; /* 深色模式下使用较亮的灰色 */
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

/* Safari 按钮兼容性修复 */
.wcowin-header-btns .md-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-appearance: none;
  -webkit-user-select: none;
}

.wcowin-header-btns .md-button .twemoji {
  display: inline-flex;
  align-items: center;
  width: 1.2em;
  height: 1.2em;
  flex-shrink: 0;
}

.wcowin-header-btns .md-button .twemoji svg {
  width: 100%;
  height: 100%;
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

/* 彩虹渐变动画 - 完全复刻VitePress效果 */
@keyframes rainbow {
  0% { --rainbow-prev: #009ff7; --rainbow-next: #c76dd1; }
  1.25% { --rainbow-prev: #009dfa; --rainbow-next: #cf69c9; }
  2.5% { --rainbow-prev: #009bfc; --rainbow-next: #d566c2; }
  3.75% { --rainbow-prev: #0098fd; --rainbow-next: #dc63ba; }
  5% { --rainbow-prev: #0096fd; --rainbow-next: #e160b3; }
  6.25% { --rainbow-prev: #0093fd; --rainbow-next: #e65eab; }
  7.5% { --rainbow-prev: #2e90fc; --rainbow-next: #e95ca2; }
  8.75% { --rainbow-prev: #4d8dfa; --rainbow-next: #ed5a9a; }
  10% { --rainbow-prev: #638af8; --rainbow-next: #ef5992; }
  11.25% { --rainbow-prev: #7587f5; --rainbow-next: #f15989; }
  12.5% { --rainbow-prev: #8583f1; --rainbow-next: #f25981; }
  13.75% { --rainbow-prev: #9280ed; --rainbow-next: #f25a79; }
  15% { --rainbow-prev: #9f7ce9; --rainbow-next: #f25c71; }
  16.25% { --rainbow-prev: #aa78e3; --rainbow-next: #f15e69; }
  17.5% { --rainbow-prev: #b574dd; --rainbow-next: #ef6061; }
  18.75% { --rainbow-prev: #be71d7; --rainbow-next: #ed635a; }
  20% { --rainbow-prev: #c76dd1; --rainbow-next: #eb6552; }
  21.25% { --rainbow-prev: #cf69c9; --rainbow-next: #e8694b; }
  22.5% { --rainbow-prev: #d566c2; --rainbow-next: #e46c44; }
  23.75% { --rainbow-prev: #dc63ba; --rainbow-next: #e06f3d; }
  25% { --rainbow-prev: #e160b3; --rainbow-next: #db7336; }
  26.25% { --rainbow-prev: #e65eab; --rainbow-next: #d77630; }
  27.5% { --rainbow-prev: #e95ca2; --rainbow-next: #d17a2a; }
  28.75% { --rainbow-prev: #ed5a9a; --rainbow-next: #cc7d24; }
  30% { --rainbow-prev: #ef5992; --rainbow-next: #c6811e; }
  31.25% { --rainbow-prev: #f15989; --rainbow-next: #bf8418; }
  32.5% { --rainbow-prev: #f25981; --rainbow-next: #b98713; }
  33.75% { --rainbow-prev: #f25a79; --rainbow-next: #b28a0f; }
  35% { --rainbow-prev: #f25c71; --rainbow-next: #ab8d0c; }
  36.25% { --rainbow-prev: #f15e69; --rainbow-next: #a3900b; }
  37.5% { --rainbow-prev: #ef6061; --rainbow-next: #9c920d; }
  38.75% { --rainbow-prev: #ed635a; --rainbow-next: #949510; }
  40% { --rainbow-prev: #eb6552; --rainbow-next: #8b9715; }
  41.25% { --rainbow-prev: #e8694b; --rainbow-next: #83991b; }
  42.5% { --rainbow-prev: #e46c44; --rainbow-next: #7a9b21; }
  43.75% { --rainbow-prev: #e06f3d; --rainbow-next: #719d27; }
  45% { --rainbow-prev: #db7336; --rainbow-next: #679e2e; }
  46.25% { --rainbow-prev: #d77630; --rainbow-next: #5da035; }
  47.5% { --rainbow-prev: #d17a2a; --rainbow-next: #51a13c; }
  48.75% { --rainbow-prev: #cc7d24; --rainbow-next: #44a244; }
  50% { --rainbow-prev: #c6811e; --rainbow-next: #34a44b; }
  51.25% { --rainbow-prev: #bf8418; --rainbow-next: #1ba553; }
  52.5% { --rainbow-prev: #b98713; --rainbow-next: #00a65b; }
  53.75% { --rainbow-prev: #b28a0f; --rainbow-next: #00a663; }
  55% { --rainbow-prev: #ab8d0c; --rainbow-next: #00a76c; }
  56.25% { --rainbow-prev: #a3900b; --rainbow-next: #00a874; }
  57.5% { --rainbow-prev: #9c920d; --rainbow-next: #00a87d; }
  58.75% { --rainbow-prev: #949510; --rainbow-next: #00a985; }
  60% { --rainbow-prev: #8b9715; --rainbow-next: #00a98e; }
  61.25% { --rainbow-prev: #83991b; --rainbow-next: #00a996; }
  62.5% { --rainbow-prev: #7a9b21; --rainbow-next: #00a99f; }
  63.75% { --rainbow-prev: #719d27; --rainbow-next: #00a9a7; }
  65% { --rainbow-prev: #679e2e; --rainbow-next: #00a9b0; }
  66.25% { --rainbow-prev: #5da035; --rainbow-next: #00a9b8; }
  67.5% { --rainbow-prev: #51a13c; --rainbow-next: #00a9c0; }
  68.75% { --rainbow-prev: #44a244; --rainbow-next: #00a8c7; }
  70% { --rainbow-prev: #34a44b; --rainbow-next: #00a8cf; }
  71.25% { --rainbow-prev: #1ba553; --rainbow-next: #00a7d5; }
  72.5% { --rainbow-prev: #00a65b; --rainbow-next: #00a6dc; }
  73.75% { --rainbow-prev: #00a663; --rainbow-next: #00a6e2; }
  75% { --rainbow-prev: #00a76c; --rainbow-next: #00a4e7; }
  76.25% { --rainbow-prev: #00a874; --rainbow-next: #00a3ec; }
  77.5% { --rainbow-prev: #00a87d; --rainbow-next: #00a2f1; }
  78.75% { --rainbow-prev: #00a985; --rainbow-next: #00a0f4; }
  80% { --rainbow-prev: #00a98e; --rainbow-next: #009ff7; }
  81.25% { --rainbow-prev: #00a996; --rainbow-next: #009dfa; }
  82.5% { --rainbow-prev: #00a99f; --rainbow-next: #009bfc; }
  83.75% { --rainbow-prev: #00a9a7; --rainbow-next: #0098fd; }
  85% { --rainbow-prev: #00a9b0; --rainbow-next: #0096fd; }
  86.25% { --rainbow-prev: #00a9b8; --rainbow-next: #0093fd; }
  87.5% { --rainbow-prev: #00a9c0; --rainbow-next: #2e90fc; }
  88.75% { --rainbow-prev: #00a8c7; --rainbow-next: #4d8dfa; }
  90% { --rainbow-prev: #00a8cf; --rainbow-next: #638af8; }
  91.25% { --rainbow-prev: #00a7d5; --rainbow-next: #7587f5; }
  92.5% { --rainbow-prev: #00a6dc; --rainbow-next: #8583f1; }
  93.75% { --rainbow-prev: #00a6e2; --rainbow-next: #9280ed; }
  95% { --rainbow-prev: #00a4e7; --rainbow-next: #9f7ce9; }
  96.25% { --rainbow-prev: #00a3ec; --rainbow-next: #aa78e3; }
  97.5% { --rainbow-prev: #00a2f1; --rainbow-next: #b574dd; }
  98.75% { --rainbow-prev: #00a0f4; --rainbow-next: #be71d7; }
  100% { --rainbow-prev: #009ff7; --rainbow-next: #c76dd1; }
}

.flip-glow-ultimate-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 260px; height: 260px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  --rainbow-prev: #009ff7;
  --rainbow-next: #c76dd1;
  background: linear-gradient(-45deg, var(--rainbow-prev) 30%, var(--rainbow-next));
  filter: blur(60px);
  opacity: 0.85;
  animation: rainbow 8s linear infinite;
  /* Safari 兼容性修复 */
  -webkit-filter: blur(60px);
  will-change: filter, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* 深色模式调整 */
@media (prefers-color-scheme: dark) {
  .flip-glow-ultimate-glow {
    filter: blur(60px);
    -webkit-filter: blur(60px);
    opacity: 0.7;
  }
}

/* Safari 特定修复 - 减少模糊值以改善性能 */
@supports (-webkit-appearance: none) {
  .flip-glow-ultimate-glow {
    filter: blur(45px);
    -webkit-filter: blur(45px);
    opacity: 0.9;
  }
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
  margin: 5px 0;
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

<!-- 打字机效果脚本 - 支持多语言 -->
<script>
(function() {
  // 多语言文字列表
  const phrasesData = {
    chinese_simplified: [
      "A college student",
      "A developer",
      "A dreamer",
      "循此苦旅 以达星辰"
    ],
    english: [
      "A college student",
      "A developer",
      "A dreamer",
      "Through hardship to the stars"
    ],
    japanese: [
      "A college student",
      "A developer",
      "A dreamer",
      "苦難を経て星へ"
    ]
  };
  
  // 获取当前语言
  function getCurrentLanguage() {
    try {
      const saved = localStorage.getItem('glm_global_translation_preference');
      return saved && saved !== 'null' ? saved : 'chinese_simplified';
    } catch (e) {
      return 'chinese_simplified';
    }
  }
  
  // 获取当前语言的短语列表
  function getPhrases() {
    const lang = getCurrentLanguage();
    return phrasesData[lang] || phrasesData.chinese_simplified;
  }
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterElement = null;
  
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;
  const startDelay = 500;
  
  function typeWriter() {
    if (!typewriterElement) {
      typewriterElement = document.getElementById('typewriter-text');
      if (!typewriterElement) {
        setTimeout(typeWriter, 100);
        return;
      }
    }
    
    const phrases = getPhrases();
    const currentPhrase = phrases[phraseIndex % phrases.length];
    
    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, startDelay);
      } else {
        setTimeout(typeWriter, deleteSpeed);
      }
    } else {
      charIndex++;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
      } else {
        setTimeout(typeWriter, typeSpeed);
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(typeWriter, startDelay);
    });
  } else {
    setTimeout(typeWriter, startDelay);
  }
})();
</script>

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
  <span id="greeting-text" class="greeting-text">🐈</span>
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
  // 问候函数
  (function() {
    function updateGreeting() {
      const el = document.getElementById('greeting-text');
      if (!el) return;

      const hour = new Date().getHours();
      const greetings = [
        [0, 5, "夜深了，注意休息 🌙"],
        [5, 7, "早安，新的一天开始啦 🌅"],
        [7, 9, "早上好，开始美好的一天 ☀️"],
        [9, 11, "上午好，保持专注 ✨"],
        [11, 13, "中午好，该休息一下了 🍲"],
        [13, 15, "午后时光，继续加油 ☕"],
        [15, 18, "下午好，别忘了喝水 🌤️"],
        [18, 20, "傍晚好，放松一下吧 🌆"],
        [20, 22, "晚上好，享受宁静时光 🌃"],
        [22, 24, "夜深了，早点休息哦 🌠"]
      ];

      el.textContent = greetings.find(([s, e]) => hour >= s && hour < e)?.[2] || "夜深了，注意休息 🌙";
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateGreeting);
    } else {
      updateGreeting();
    }
  })();
</script>

---

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } __𝚆𝚎 𝚖𝚎𝚎𝚝 𝚒𝚗 𝚝𝚑𝚎 𝚏𝚊𝚕𝚕.__

    ---
    ![image](https://pic1.zhimg.com/80/v2-b9ae6898d33359da6be815bf60626af2_1440w.webp?source=2c26e567){ class="responsive-image" loading="lazy" align=right width="340" height="226" }

    - 通过<mark>目录</mark>以打开文章
    - 搜索<ins>关键词</ins>查询文章
    - 如遇页面卡顿，请使用<del>[科学上网](blog/technique%20sharing/kexue.md)</del>
    - 𝕙𝕒𝕧𝕖 𝕒 𝕘𝕠𝕠𝕕 𝕥𝕚𝕞𝕖 !

    === "Mac/PC端"

        请在上方标签选择分类/左侧目录选择文章

    === "移动端"

        请点击左上角图标选择分类和文章

</div>
<style>
    .responsive-image {
        border-radius: 24px;
    }
    @media only screen and (max-width: 768px) {
        .responsive-image {
            display: none;
        }
    }
    /* 高亮 / 插入 / 删除：背景+装饰，文字用默认色 */
    .grid.cards mark {
        background: #fef08a;
        color: inherit;
        padding: 0.1em 0.25em;
        border-radius: 2px;
    }
    .grid.cards ins {
        background: #dcfce7;
        color: inherit;
        text-decoration: underline;
        text-decoration-color: #22c55e;
        text-underline-offset: 0.2em;
        padding: 0.1em 0.2em;
        border-radius: 2px;
    }
    .grid.cards del,
    .grid.cards del a {
        background: #fee2e2;
        color: inherit;
        text-decoration: line-through;
        padding: 0.1em 0.2em;
        border-radius: 2px;
    }
    .grid.cards del a:hover {
        color: inherit;
    }
    /* 暗色模式：深色背景 + 默认浅色字，保证对比度 */
    [data-md-color-scheme="slate"] .grid.cards mark {
        background: rgba(202, 138, 4, 0.35);
    }
    [data-md-color-scheme="slate"] .grid.cards ins {
        background: rgba(34, 197, 94, 0.25);
        text-decoration-color: rgba(74, 222, 128, 0.8);
    }
    [data-md-color-scheme="slate"] .grid.cards del,
    [data-md-color-scheme="slate"] .grid.cards del a {
        background: rgba(239, 68, 68, 0.25);
    }
</style>


***


<!-- GitHub Contribution Heatmap Card -->
<div class="github-heatmap-glass-container">
  <div class="github-heatmap-glass-card">
    <div class="github-heatmap-header">
      <span class="github-heatmap-title">GitHub</span>
      <span id="contribution-stats" class="github-heatmap-stats">过去一年 <strong id="stats-count">--</strong> 次贡献</span>
      <div class="github-heatmap-legend">
        <span class="legend-label">少</span>
        <div class="legend-cell" style="--opacity: 0.05;"></div>
        <div class="legend-cell" style="--opacity: 0.25;"></div>
        <div class="legend-cell" style="--opacity: 0.5;"></div>
        <div class="legend-cell" style="--opacity: 0.75;"></div>
        <div class="legend-cell" style="--opacity: 1;"></div>
        <span class="legend-label">多</span>
      </div>
    </div>
    <div class="github-heatmap-content">
      <svg id="heatmapSvg" class="github-heatmap-svg" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  </div>
  <div id="heatmapTooltip" class="github-heatmap-tooltip">
    <div class="github-heatmap-tooltip__arrow"></div>
    <div class="github-heatmap-tooltip__content"></div>
  </div>
</div>

<style>
  .github-heatmap-glass-container {
    position: relative;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .github-heatmap-glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }

  /* MkDocs 深色主题（slate）下的 GitHub 卡片专用样式 */
  [data-md-color-scheme="slate"] .github-heatmap-glass-card {
    /* 比周围背景稍亮一点的深色卡片，保证对比度 */
    background: rgba(17, 24, 39, 0.96); /* #111827 */
    border-color: rgba(148, 163, 184, 0.55);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.65);
  }

  [data-md-color-scheme="slate"] .github-heatmap-title,
  [data-md-color-scheme="slate"] .github-heatmap-stats,
  [data-md-color-scheme="slate"] .github-heatmap-legend {
    color: #e5e7eb;
  }

  [data-md-color-scheme="slate"] .github-heatmap-stats {
    opacity: 0.85;
  }

  [data-md-color-scheme="slate"] .github-heatmap-legend {
    opacity: 0.8;
  }

  .github-heatmap-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    gap: 12px;
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  .github-heatmap-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--md-typeset-color);
    letter-spacing: 0.5px;
  }

  .github-heatmap-stats {
    font-size: 0.8rem;
    color: var(--md-typeset-color);
    opacity: 0.6;
    white-space: nowrap;
  }

  .github-heatmap-stats strong {
    color: #239a3b;
    font-weight: 700;
    opacity: 1;
  }

  .github-heatmap-content {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 -12px;
    padding: 0 12px;
  }

  .github-heatmap-svg {
    width: 100%;
    height: auto;
    display: block;
    min-height: 110px;
    cursor: default;
  }


  .github-heatmap-legend {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: var(--md-typeset-color);
    opacity: 0.6;
    margin-left: auto;
  }

  .legend-label {
    font-weight: 500;
  }

  .legend-cell {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    background-color: #239a3b;
    opacity: var(--opacity, 0.5);
    flex-shrink: 0;
  }

  .github-heatmap-tooltip {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    display: none;
  }

  .github-heatmap-tooltip.visible {
    display: block;
    animation: tooltipFadeIn 150ms ease-out;
  }

  .github-heatmap-tooltip__content {
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #fff;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  /* 深色模式适配 */
  [data-md-color-scheme="slate"] .github-heatmap-tooltip__content {
    background: rgba(17, 24, 39, 0.95);
  }

  .github-heatmap-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  /* 箭头向上（Tooltip 在格子下方时） */
  .github-heatmap-tooltip.arrow-top .github-heatmap-tooltip__arrow {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent rgba(30, 30, 30, 0.95) transparent;
    filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
    margin-bottom: -1px; /* 让箭头和 content 无缝连接 */
  }

  [data-md-color-scheme="slate"] .github-heatmap-tooltip.arrow-top .github-heatmap-tooltip__arrow {
    border-color: transparent transparent rgba(17, 24, 39, 0.95) transparent;
  }

  /* 箭头向下（Tooltip 在格子上方时） */
  .github-heatmap-tooltip.arrow-bottom .github-heatmap-tooltip__arrow {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: rgba(30, 30, 30, 0.95) transparent transparent transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    margin-top: -1px; /* 让箭头和 content 无缝连接 */
  }

  [data-md-color-scheme="slate"] .github-heatmap-tooltip.arrow-bottom .github-heatmap-tooltip__arrow {
    border-color: rgba(17, 24, 39, 0.95) transparent transparent transparent;
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .github-heatmap-glass-container {
      display: none;
    }

    .github-heatmap-glass-card {
      padding: 12px;
    }

    .github-heatmap-header {
      flex-wrap: wrap;
      gap: 12px;
    }

    .github-heatmap-legend {
      margin-left: 0;
      width: 100%;
      justify-content: flex-end;
    }

    .github-heatmap-title {
      font-size: 1.1rem;
    }

    .github-heatmap-stats {
      font-size: 0.8rem;
    }

    .github-heatmap-legend {
      font-size: 0.7rem;
      gap: 4px;
    }

    .legend-cell {
      width: 9px;
      height: 9px;
    }
  }
</style>

<script>
(function() {
  const username = 'Wcowin';
  const CELL = 11;
  const GAP = 2;
  const ROWS = 7;
  const LEVEL_OPACITY = [0.05, 0.25, 0.5, 0.75, 1.0];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  async function loadHeatmap() {
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      const data = await response.json();
      renderHeatmap(data);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      document.getElementById('stats-count').textContent = '--';
    }
  }

  function renderHeatmap(data) {
    const svg = document.getElementById('heatmapSvg');
    const statsEl = document.getElementById('stats-count');
    const tooltipEl = document.getElementById('heatmapTooltip');
    
    if (!svg) return;

    statsEl.textContent = data.total.lastYear;

    const weeks = Math.ceil(data.contributions.length / ROWS);
    const labelOffset = 28;
    const headerOffset = 16;
    const svgWidth = labelOffset + weeks * (CELL + GAP);
    const svgHeight = headerOffset + ROWS * (CELL + GAP);

    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svg.innerHTML = '';

    const monthLabels = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const idx = w * ROWS;
      if (idx < data.contributions.length) {
        const month = new Date(data.contributions[idx].date).getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTHS[month], x: labelOffset + w * (CELL + GAP) });
          lastMonth = month;
        }
      }
    }

    const ns = "http://www.w3.org/2000/svg";

    monthLabels.forEach((m) => {
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', m.x);
      text.setAttribute('y', 11);
      text.setAttribute('class', 'heatmap-label');
      text.setAttribute('font-size', 10);
      text.textContent = m.label;
      svg.appendChild(text);
    });

    DAYS.forEach((d, i) => {
      if (d) {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', headerOffset + i * (CELL + GAP) + CELL - 1);
        text.setAttribute('class', 'heatmap-label');
        text.setAttribute('font-size', 9);
        text.textContent = d;
        svg.appendChild(text);
      }
    });

    data.contributions.forEach((day, idx) => {
      const col = Math.floor(idx / ROWS);
      const row = idx % ROWS;
      const rect = document.createElementNS(ns, 'rect');
      
      rect.setAttribute('x', labelOffset + col * (CELL + GAP));
      rect.setAttribute('y', headerOffset + row * (CELL + GAP));
      rect.setAttribute('width', CELL);
      rect.setAttribute('height', CELL);
      rect.setAttribute('rx', 2);
      rect.setAttribute('ry', 2);
      rect.setAttribute('class', 'heatmap-cell');
      rect.setAttribute('data-date', day.date);
      rect.setAttribute('data-count', day.count);
      
      const opacity = LEVEL_OPACITY[Math.min(day.level, 4)];
      rect.setAttribute('fill', `rgba(35, 154, 59, ${opacity})`);
      
      rect.addEventListener('mouseenter', (e) => {
        const rect = e.currentTarget;
        const date = rect.getAttribute('data-date');
        const count = parseInt(rect.getAttribute('data-count'));
        tooltip(date, count, e);
      });
      
      rect.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget;
        const date = rect.getAttribute('data-date');
        const count = parseInt(rect.getAttribute('data-count'));
        tooltip(date, count, e);
      });
      
      rect.addEventListener('mouseleave', () => {
        tooltipEl.classList.remove('visible');
      });

      // 点击某一天，跳转到该日期在 GitHub 的概览页（from=to=当天）
      rect.addEventListener('click', () => {
        const date = day.date;
        const url = `https://github.com/${username}?tab=overview&from=${date}&to=${date}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });

      svg.appendChild(rect);
    });

    if (!document.querySelector('style[data-heatmap-style]')) {
      const style = document.createElement('style');
      style.setAttribute('data-heatmap-style', '');
      style.textContent = `
        .heatmap-label {
          fill: rgba(0, 0, 0, 0.4);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          font-size: 10px;
        }
        [data-md-color-scheme="slate"] .heatmap-label {
          /* 暗色下标签文字更亮一些，提升可读性 */
          fill: rgba(255, 255, 255, 0.7);
        }
        .heatmap-cell {
          transition: opacity 150ms, filter 150ms;
          cursor: default;
          filter: drop-shadow(0 0 0 rgba(35, 154, 59, 0));
        }
        .heatmap-cell:hover {
          opacity: 1 !important;
          filter: drop-shadow(0 2px 6px rgba(35, 154, 59, 0.4));
        }
      `;
      document.head.appendChild(style);
    }

    function tooltip(date, count, event) {
      const text = count > 0 ? `${formatDate(date)}: ${count} 次贡献` : `${formatDate(date)}: 无贡献`;
      const contentEl = tooltipEl.querySelector('.github-heatmap-tooltip__content');
      if (contentEl) {
        contentEl.textContent = text;
      }
      tooltipEl.classList.add('visible');
      
      // 按格子定位：显示在对应格子正上方居中，箭头指向格子
      const target = event.currentTarget;
      const margin = 8;
      const gap = 8; // 箭头高度 + 间距

      if (target && target.getBoundingClientRect) {
        const cellRect = target.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        // 默认显示在格子上方
        let x = cellRect.left + cellRect.width / 2 - tooltipRect.width / 2;
        let y = cellRect.top - tooltipRect.height - gap;
        let arrowPosition = cellRect.left + cellRect.width / 2; // 箭头指向格子的中心
        let isAbove = true;

        // 防止左右溢出视口
        const maxX = window.innerWidth - tooltipRect.width - margin;
        x = Math.max(margin, Math.min(x, maxX));

        // 如果顶部空间不足，放到格子下方
        if (y < margin) {
          y = cellRect.bottom + gap;
          isAbove = false;
        }

        tooltipEl.style.left = x + 'px';
        tooltipEl.style.top = y + 'px';

        // 设置箭头方向并计算箭头位置
        tooltipEl.classList.remove('arrow-top', 'arrow-bottom');
        tooltipEl.classList.add(isAbove ? 'arrow-bottom' : 'arrow-top');

        // 计算箭头相对于 Tooltip 的偏移（让箭头指向格子中心）
        const arrowEl = tooltipEl.querySelector('.github-heatmap-tooltip__arrow');
        if (arrowEl) {
          const arrowOffset = arrowPosition - x; // 格子中心相对于 Tooltip 左边的距离
          arrowEl.style.left = arrowOffset + 'px';
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeatmap);
  } else {
    loadHeatmap();
  }
})();
</script>


<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---
    - [macOS 开发经验分享](develop/Mac-development/index.md){ data-preview }(最新更新)
    - [密码学｜加密货币｜区块链](blog/Cryptography/#_1){ data-preview }  (最新更新)
    - [模型上下文协议(MCP)简述](develop/AI/mcp.md)
    - [DeepSeek:从入门到精通](develop/deepseek.md)
    - [将Python文件打包成.exe可执行程序](blog/py/python.md)
    - [Homebrew如何安装(Mac & Linux)](blog/Mac/homebrew.md)

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs/Zensical教程__

    ---

    - [Mkdocs前言](blog/Mkdocs/mkfirst.md)
    - [利用Mkdocs部署静态网页](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)
    - [如何给MKdocs添加友链](blog/Mkdocs/linktech.md)
    ---
    - [Zensical教程](blog/Zensical/indexfirst.md)(🌟2026最新更新)

-   :material-gamepad-variant-outline:{ .lg .middle } __好用/好玩__

    ---

    - [AI网站分享](develop/AI.md)
    - [好用/好玩网站分享](blog/Webplay.md)
    - [Mac/windows软件网站汇总](blog/macsoft.md)
    - [重庆旅游推荐路线](trip/InCQ/CQ.md)

-   :material-account-box-outline:{ .lg .middle } __关于__

    ---

    - [留言板](waline.md)
    - [博客](blog/index.md)
    - [:octicons-arrow-right-24: 了解我](about/geren/#_4){ data-preview }
    - [支持作者](about/zcw/#alipay){ data-preview }
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

/* 原CSS网格已替换为Canvas交互网格 */

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

<!-- 网格起伏效果 Canvas -->
<canvas id="gridCanvas"></canvas>

<script>
(function() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let mouseX = -1000, mouseY = -1000;
  const gridSize = 50;
  const influenceRadius = 150;
  const maxDisplacement = 8;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 600; // 只覆盖首页头部区域
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  document.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  document.addEventListener('mouseleave', function() {
    mouseX = -1000;
    mouseY = -1000;
  });
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 获取当前主题颜色
    const isDark = document.documentElement.getAttribute('data-md-color-scheme') === 'slate';
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    
    // 绘制垂直线
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      for (let y = 0; y <= canvas.height; y += 5) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let offsetX = 0;
        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * maxDisplacement;
          offsetX = (dx / dist) * force || 0;
        }
        
        if (y === 0) {
          ctx.moveTo(x + offsetX, y);
        } else {
          ctx.lineTo(x + offsetX, y);
        }
      }
      ctx.stroke();
    }
    
    // 绘制水平线
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 5) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let offsetY = 0;
        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * maxDisplacement;
          offsetY = (dy / dist) * force || 0;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y + offsetY);
        } else {
          ctx.lineTo(x, y + offsetY);
        }
      }
      ctx.stroke();
    }
    
    requestAnimationFrame(draw);
  }
  
  draw();
})();
</script>

<style>
#gridCanvas {
  position: absolute;
  top: 95px; /* 从公告栏下方开始 */
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: -1;
  -webkit-mask: linear-gradient(-20deg, transparent 50%, white);
  mask: linear-gradient(-20deg, transparent 50%, white);
  /* Safari 渲染优化 */
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* Safari mask 兼容性增强 */
  -webkit-mask-image: linear-gradient(-20deg, transparent 50%, white);
  -webkit-mask-size: 100% 100%;
  -webkit-mask-position: 0 0;
  -webkit-mask-repeat: no-repeat;
}

@media (max-width: 768px) {
  #gridCanvas {
    display: none;
  }
}
</style>

<!--
  将所有页面级脚本和元数据统一放置在这里
-->
<!-- 访问统计区域 -->
<!-- <div style="text-align: center; margin: 2rem 0; font-size: 0.9rem;">
  本站访问量：<script async src="//finicounter.eu.org/finicounter.js"></script><span id="finicount_views" style="font-weight: bold; color: #518FC1;"></span>
</div> -->

 
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


<!-- <meta name="algolia-site-verification"  content="3CAAB2C27102AD08" /> -->

