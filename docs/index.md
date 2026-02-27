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
    <div class="oneclip-announcement-item">
      🎉 <a href="https://oneclip.cloud/" target="_blank" rel="noopener noreferrer">OneClip</a> —— macOS剪贴板管理工具 <a href="https://oneclip.cloud/" target="_blank" rel="noopener noreferrer" class="oneclip-cta">了解更多 →</a>
    </div>
    <div class="oneclip-announcement-item">
      ☺️ <a href="https://wcowin.github.io/Zensical-Chinese-Tutorial/" target="_blank" rel="noopener noreferrer">Zensical中文教程</a> —— 最新的Zensical中文教程
    </div>
    <div class="oneclip-announcement-item">
      🙌🏻 <a href="https://hongjun.vip/materialx-for-mkdocs" target="_blank" rel="noopener noreferrer">MaterialX</a> —— 下一代 MkDocs主题，让你继续用熟悉的方式构建漂亮文档
    </div>
  </div>
</div>

<!-- 加载 Inter 字体 - 使用 font-display: swap 优化加载性能 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet">

<div class="wcowin-header-row">
  <!-- 左侧：文字内容 -->
  <div class="wcowin-header-text">
    <div class="wcowin-header-title">Hi, I'm <span class="wcowin-name-box"><span class="name-text">Wcowin</span></span></div>
    <div class="wcowin-header-subtitle">
      <span class="wcowin-header-subtitle-inner">
        <span id="typewriter-text"></span><span class="typewriter-cursor">|</span>
      </span>
    </div>
    <!-- <div class="wcowin-header-motto">Free and diffuse</div> -->
    <div class="wcowin-header-btns">
      <a href="https://github.com/Wcowin" target="_blank" rel="noopener noreferrer" class="md-button md-button--primary">
        <span class="twemoji">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </span>
        Github
      </a>
      <a href="mailto:wcowin@qq.com" class="md-button">
        <span class="twemoji">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </span>
        Email me
      </a>
    </div>
  </div>
  <!-- 右侧：头像及光辉 -->
  <div class="wcowin-header-avatar">
    <div class="flip-glow-ultimate">
      <div class="flip-glow-ultimate-glow"></div>
      <div class="flip-glow-ultimate-imgs">
        <img src="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg" alt="Wcowin头像背面" class="flip-glow-ultimate-front" loading="eager" fetchpriority="high" width="280" height="280">
        <img src="https://pic2.zhimg.com/100/v2-d6a47de28a761522a8e07ac3b5bd458d_r.jpg" alt="Wcowin头像正面" class="flip-glow-ultimate-back" loading="lazy" width="280" height="280">
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

/* Wcowin 名字带圆角虚线边框 */
.wcowin-name-box {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 4px 14px;
  margin-left: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px dashed #6b8e6b;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(107, 142, 107, 0.15);
  vertical-align: middle;
}

.wcowin-name-box .name-text {
  font-weight: 800;
  color: #2d3436;
  font-size: 1em;
  line-height: 1.2;
}

/* 深色模式适配：仅调整背景和边框颜色 */
[data-md-color-scheme="slate"] .wcowin-name-box {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  border-color: #68d391;
  box-shadow: 0 2px 8px rgba(104, 211, 145, 0.2);
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




/* 添加深色模式的文字颜色适配 - 更强烈的对比度 */
@media (prefers-color-scheme: dark) {
  .wcowin-header-subtitle {
    color: #757575;
  }

  .wcowin-header-subtitle-inner {
    color: #b0b0b0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important; /* 增强阴影 */
  }

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
  border-radius: 50%;
  overflow: hidden;
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
    width: 200px;
    height: 200px;
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


<!-- 修改分隔线上下的间距 -->
<style>
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
    .grid.cards del {
        display: inline-block;
        background: #fee2e2;       /* 浅红实心背景，高亮效果 */
        color: inherit;
        padding: 0.05em 0.25em;    /* 和 mark/ins 接近的内边距 */
        border-radius: 3px;        /* 小圆角 */
        border: none;              /* 不再使用描边 */
        /* 底部波浪下划线 */
        text-decoration-line: underline;
        text-decoration-style: wavy;
        text-decoration-color: #f97373;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 0.16em;
    }
    .grid.cards del a {
        border: none;              /* 避免双层边框 */
        padding: 0;                /* 让内层链接不再撑开 */
        text-decoration: inherit;  /* 继承外层的波浪线 */
        color: inherit;
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
    [data-md-color-scheme="slate"] .grid.cards del {
        background: rgba(239, 68, 68, 0.25); /* 深色模式下的浅红块背景 */
    }
</style>


***


<!-- GitHub Contribution Heatmap Card -->
<div class="github-heatmap" data-username="Wcowin"></div>




<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---
    - [macOS 开发经验分享](develop/Mac-development/index.md){ data-preview }(最近更新)
    - [密码学｜加密货币｜区块链](blog/Cryptography/#_1){ data-preview }  (最近更新)
    - [模型上下文协议(MCP)简述](develop/AI/mcp.md)
    - [RAG技术(检索增强生成)](develop/AI/rag.md)
    - [uv：新一代 Python 包管理工具入门](blog/py/uv.md)
    - [Homebrew如何安装(Mac & Linux)](blog/Mac/homebrew.md)

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs/Zensical教程__

    ---

    - [Mkdocs前言](blog/Mkdocs/mkfirst.md)
    - [利用Mkdocs部署静态网页](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)
    ---
    - [Zensical教程](blog/Zensical/indexfirst.md)(🌟2026最新)
    - [从MkDocs迁移到Zensical](blog/Zensical/migration.md)
    - [5分钟快速开始Zensical](blog/Zensical/quick-start.md)

-   :material-gamepad-variant-outline:{ .lg .middle } __好用/好玩/AI__

    ---

    - [AI网站分享](develop/AI.md)、[Skill 使用介绍](develop/AI/skill.md)
    - [AI Agent 入门](develop/AI/agent.md)、[深度推理与测试时计算](develop/AI/deep-reasoning.md)
    - [多智能体协作入门](develop/AI/multi-agent.md)、[Prompt 工程入门](develop/AI/prompt.md)
    - [好用/好玩网站分享](blog/Webplay.md)

-   :material-account-box-outline:{ .lg .middle } __关于__

    ---

    - [留言板](waline.md)
    - [我的开发项目/作品/应用](develop/Mywork/index.md)
    <!-- - [博客](blog/index.md) -->
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



<style>
.md-grid {
  max-width: 1220px;
}

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
  
  let animationFrameId = null;
  let isVisible = true;
  
  // 使用 Intersection Observer 优化性能：当 Canvas 不可见时暂停动画
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !animationFrameId) {
      draw();
    }
  }, { threshold: 0 });
  
  if (canvas) {
    observer.observe(canvas);
  }
  
  function draw() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }
    
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
    
    animationFrameId = requestAnimationFrame(draw);
  }
  
  // 初始绘制
  if (canvas) {
    draw();
  }
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


 
<!-- Umami Analytics -->
<script defer src="https://cloud.umami.is/script.js" data-website-id="061b4dea-9b7b-4ffa-9071-74cde70f3dfb"></script>

