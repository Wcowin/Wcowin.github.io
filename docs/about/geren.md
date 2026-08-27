---
title: 关于我
hide:
#   - navigation
#   - toc
  - feedback
status: new
---

<link rel="stylesheet" href="/about/sty/portfolio.css">
<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>

# <span id="jinrishici-sentence">今日诗词</span>

## 关于我

<div class="intro-container">
  <div class="intro-content">
    <div class="intro-avatar t-tilt">
      <div class="t-tilt-card avatar-tilt-card">
        <img src="https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg" alt="Wáng Kēwén" class="avatar-img">
        <div class="t-tilt-glare"></div>
      </div>
    </div>
    <div class="intro-text">
      <span class="greeting">你好，很高兴认识你 <span class="wave">👋</span></span>
      <span class="name">我叫 <span class="contributor-link">Wáng Kēwén</span></span>
    </div>
  </div>
</div>

<style>
.intro-container {
  background: linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(200,200,200,0.2);
  transition: all 0.3s ease;
}

.intro-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.intro-avatar {
  flex-shrink: 0;
}

/* 3D 头像倾斜效果 */
.avatar-tilt-card {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  overflow: hidden;
  transform:
    perspective(1000px)
    rotateX(var(--tilt-rx, 0deg))
    rotateY(var(--tilt-ry, 0deg));
  transform-style: preserve-3d;
  transition: transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  box-shadow: 0 8px 24px rgba(14, 30, 37, 0.15);
}

.avatar-tilt-card.is-tilting {
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.avatar-tilt-card .avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 24px rgba(14, 30, 37, 0.15);
  transition: transform 0.5s ease;
}

.avatar-tilt-card .t-tilt-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: screen;
  border-radius: 50%;
  background:
    radial-gradient(circle 60px at var(--tilt-gx, 50%) var(--tilt-gy, 50%),
      rgba(255,255,255,0.4), rgba(255,255,255,0.05) 52%, rgba(255,255,255,0) 84%),
    radial-gradient(circle 120px at var(--tilt-gx, 50%) var(--tilt-gy, 50%),
      rgba(255,255,255,0.2), rgba(255,255,255,0.03) 58%, rgba(255,255,255,0) 78%);
  transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.t-tilt.is-hover .t-tilt-glare {
  opacity: 0.32;
}

.intro-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.greeting, .name {
  display: block;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #555;
}

.contributor-link {
  color: #333333;
  text-decoration: none;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.contributor-link:hover {
  background-color: rgba(51, 51, 51, 0.1);
  color: #555555;
  text-decoration: none;
}

.wave {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

/* 深色模式适配 */
[data-md-color-scheme="slate"] .intro-container {
  background: linear-gradient(145deg, rgba(31,33,40,0.9) 0%, rgba(31,33,40,0.8) 100%);
  border: 1px solid rgba(80,80,80,0.2);
}

[data-md-color-scheme="slate"] .greeting,
[data-md-color-scheme="slate"] .name {
  color: #e0e0e0;
}

[data-md-color-scheme="slate"] .contributor-link {
  color: #DFDFDF;
}

[data-md-color-scheme="slate"] .avatar-tilt-card .avatar-img {
  border-color: rgba(255,255,255,0.2);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .intro-container {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .intro-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .avatar-tilt-card {
    width: 100px;
    height: 100px;
  }

  .greeting, .name {
    font-size: 1.3rem;
  }
}
</style>

<!-- <div class="flip-container">
<div class="image-container">
    <img src="https://pic4.zhimg.com/v2-a0456a5f527c1923f096759f2926012f_1440w.jpg" alt="Back Image">
    <img src="https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg" alt="Front Image">
</div>
</div>
<style>
    .flip-container {
    position: relative;
    width: 280px;
    height: 280px;
    margin: 10px auto;
    display: flex;
    align-items: flex-start;
    /* 对齐顶部 */
    justify-content: flex-end;
    /* 将文字放置右上角 */
    }
    .image-container {
        position: relative;
        width: 280px;
        height: 280px;
    }
    .image-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;    /* 图片填满容器 */
        border-radius: 50%;
        border: 4px solid #ffffff; /* 白色边框 */
        box-shadow: 0 8px 24px rgba(14, 30, 37, 0.15); /* 阴影 */
        backface-visibility: hidden; /* 隐藏背面 */
        transition: transform 0.6s ease-in-out; /* 仅对transform过渡 */
    }
    .image-container img:first-child {
        z-index: 1;
        backface-visibility: hidden;
    }
    .image-container img:last-child {
        z-index: 0;
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
    .image-container:hover img:first-child {
        transform: rotateY(180deg);
        z-index: 2;
    }
    .image-container:hover img:last-child {
        transform: rotateY(0deg);
        z-index: 3;
    }
</style> -->


<center><font size=6 color= #757575>
观史知今，当思进退，读书明志可识春秋</font></center>

<!-- <center>
  <img src="https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg"
       style="width: 270px; border-radius: 50%; display: block; margin: 0 auto;">
</center> -->



<!-- <center>
  <img src="https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg"
       style="width: 270px; border-radius: 50%; display: block; margin: 0 auto;">
</center> -->


<!-- <center>

![](https://picx.zhimg.com/v2-fb22186d2490043435a72876950492f5_1440w.jpg#only-light){style="width: 270px; border-radius: 50%;"}

![](https://pic4.zhimg.com/v2-a0456a5f527c1923f096759f2926012f_1440w.jpg#only-dark){style="width: 270px; border-radius: 50%;"}

</center> -->

  <!-- <p style="text-align: center; font-size: 35px; "><strong>A college student in Chongqing</strong></p>  -->

<!-- <center><font size=6rem color= #757575>
观史知今，当思进退，读书明志，可识春秋

  ——Wcowin </font></center>   -->


<div class="about__info">
    <div>
        <span class="about__info-title">2年++</span>
        <span class="about__info-name">实习经验</span>
    </div>
    <div>
        <a href="https://github.com/Wcowin" target="_blank">
            <span class="about__info-title">5项+</span>
            <span class="about__info-name">完成的项目</span>
        </a>
    </div>
    <div>
        <span class="about__info-title">6个+</span>
        <span class="about__info-name">贡献的开源</span>
    </div>
    <div>
        <a href="https://github.com/One-Clip/OneClip" target="_blank">
            <span class="about__info-title">2+</span>
            <span class="about__info-name">独立开发软件</span>
        </a>
    </div>
</div>


<!-- <div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="One-Clip/OneClip"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    href="https://github.com/One-Clip/OneClip"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div> -->

<div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="One-Clip/OneClip"
    data-owner="One-Clip"
    data-name="OneClip"
    data-description="OneClip 是一款专为 macOS 设计的剪贴板管理工具，支持截图、OCR、翻译、拖拽容器、划词、同步。由Wcowin开发并维护。"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    data-stars="456"
    data-forks="27"
    data-license="MIT"
    href="https://github.com/One-Clip/OneClip"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div>

<div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="Wcowin/Mac-Finder-Clipboard"
    data-description="FinderClip 是一款免费开源且轻量级的 macOS 应用，让你可以在 Finder 中使用熟悉的 ⌘X 和 ⌘V 快捷键来剪切和移动文件。"
    data-stars="90"
    data-forks="0"
    data-license="MIT"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    href="https://github.com/Wcowin/Mac-Finder-Clipboard"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div>

<!--<div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="Wcowin/Wcowin.github.io"
    data-description="简单易用的许可证管理系统，支持激活码生成、验证和设备管理、订单发送等等"
    data-stars="24"
    data-forks="1"
    data-license="MIT"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    href="https://github.com/One-Clip/OneClip-License-Manager"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div>-->

<div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="Wcowin/Mkdocs-Wcowin"
    data-description="MKDocs 中文教程"
    data-stars="66"
    data-forks="6"
    data-license="MIT"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    href="https://github.com/Wcowin/Mkdocs-Wcowin"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div>

<div class="github-repo-card-wrapper">
  <a
    class="github-repo-card"
    data-repo="Wcowin/Wcowin.github.io"
    data-description="个人博客"
    data-stars="75"
    data-forks="10"
    data-license="MIT"
    data-avatar="https://pic4.zhimg.com/100/v2-2c2935c381364513e278726841d93afb_r.jpg"
    href="https://github.com/Wcowin/Wcowin.github.io"
    target="_blank"
    rel="noopener noreferrer"
  ></a>
</div>

<!-- 在后续标题被解析和锚点定位前生成卡片，避免首屏布局跳动。 -->
<script src="/javascripts/github-repo-card.js"></script>

<!-- [:material-download: 查看简历](../assets/个人简历.pdf){ .md-button}
{: style="text-align: center;" } -->


<!-- <a href="/assets/个人简历.pdf" target="_blank" class="md-button">下载简历</a> -->
<!-- [下载简历 :fontawesome-solid-download:](个人简历2.pdf){.md-button target="_blank"} -->



<!-- <div class="card2 file-block" markdown="1">
<div class="file-icon"><img src="https://pic4.zhimg.com/80/v2-98f918276ecbc6d549fa6a5d1238e713_1440w.webp" style="height: 3em;"></div>
<div class="file-body">
<div class="file-title">个人简历</div>
<div class="file-meta">2025-02-14</div>
</div>
<a class="down-button" target="_blank" href="../个人简历.pdf" markdown="1">:fontawesome-solid-download: 下载</a>
</div> -->

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Wcowin/Wcowin.github.io@main/docs/about/sty/portfolio.css">

<style>
/* ============================================
   Transitions.dev — Tabs sliding
   滑动标签页效果
   ============================================ */

:root {
  --tabs-dur: 250ms;
  --tabs-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --tabs-text-muted: rgba(15, 15, 15, 0.8);
  --tabs-text-active: #0f0f0f;
  --tabs-bar-bg: #f1f1f1;
  --tabs-pill-bg: #ffffff;
}

/* The bar is just a flex container with padding for the pill
   to sit inside. Tabs sit on z-index: 1, the pill on z-index: 0,
   so labels read above the pill background. */
.t-tabs {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 48px;
  background: var(--tabs-bar-bg);
}
.t-tab {
  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  height: 38px;
  padding: 8px 28px;
  font-size: 15px;
  font-weight: 500;
  color: var(--tabs-text-muted);
  cursor: pointer;
  border-radius: 48px;
  z-index: 1;
  transition: color var(--tabs-dur) var(--tabs-ease);
  white-space: nowrap;
}
.t-tab:not([aria-selected="true"]):hover,
.t-tab[aria-selected="true"] {
  color: var(--tabs-text-active);
}

/* The pill: width + transform are written inline by JS so
   the transition tweens between the previous and next
   measured positions. */
.t-tabs-pill {
  position: absolute;
  top: 4px;
  left: 0;
  height: 38px;
  width: 0;
  background: var(--tabs-pill-bg);
  border-radius: 48px;
  transform: translateX(0);
  transition:
    transform var(--tabs-dur) var(--tabs-ease),
    width     var(--tabs-dur) var(--tabs-ease);
  will-change: transform, width;
  z-index: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .t-tabs-pill, .t-tab { transition: none !important; }
}
</style>

## 我的履历

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<div class="qualification">
    <div class="qualification__tabs">
        <div class="t-tabs" role="tablist">
            <span class="t-tabs-pill" aria-hidden="true"></span>
            <button class="t-tab" role="tab" aria-selected="true" data-tab="education">来时路</button>
            <button class="t-tab" role="tab" aria-selected="false" data-tab="work">工作经历</button>
        </div>
    </div>
    <div class="qualification__sections">
        <div class="qualification__content qualification__active" data-content id="education">
            <!-- 漯河高中 - 左侧 -->
            <div class="qualification__data">
                <div>
                    <h3 class="qualification__title">漯河高中</h3>
                    <span class="qualification__subtitle">平凡的三年</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>2018 - 2021</span>
                    </div>
                </div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
            </div>
            <!-- CTBU - 右侧 -->
            <div class="qualification__data">
                <div></div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
                <div>
                    <h3 class="qualification__title">CTBU</h3>
                    <span class="qualification__subtitle">电子信息工程学士</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>2021 - 2025</span>
                    </div>
                </div>
            </div>
            <!-- HTU - 左侧 -->
            <div class="qualification__data">
                <div>
                    <h3 class="qualification__title">HBUT</h3>
                    <span class="qualification__subtitle">低空技术与工程硕士</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>2026 - 2029</span>
                    </div>
                </div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
            </div>
            <!-- 未完待续 - 右侧 -->
            <div class="qualification__data">
                <div></div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
                <div>
                    <h3 class="qualification__title">未完待续</h3>
                    <span class="qualification__subtitle">于道各努力，千里自同风</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>Before - After</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="qualification__content" data-content id="work">
            <!-- 上海科锐福克斯 - 右侧 -->
            <div class="qualification__data">
                <div></div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
                <div>
                    <h3 class="qualification__title">上海科锐福克斯人才顾问有限公司</h3>
                    <span class="qualification__subtitle">CSDN 见习校园主理人</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>2024.6 - 2025.6</span>
                    </div>
                </div>
            </div>
            <!-- 独立开发者 - 左侧 -->
            <div class="qualification__data">
                <div>
                    <h3 class="qualification__title">独立开发者</h3>
                    <span class="qualification__subtitle">Swift开发/<a href="https://github.com/One-Clip/OneClip" target="_blank" style="color: inherit; text-decoration: underline;">OneClip</a> 作者</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>2025-至今</span>
                    </div>
                </div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
            </div>
            <!-- 未完待续 - 右侧 -->
            <div class="qualification__data">
                <div></div>
                <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                </div>
                <div>
                    <h3 class="qualification__title">未完待续</h3>
                    <span class="qualification__subtitle">于道各努力，千里自同风</span>
                    <div class="qualification__calendar">
                        <i class="fa-regular fa-calendar"></i>
                        <span>Before - After</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
(function() {
  // 3D 头像倾斜效果
  function initAvatarTilt() {
    var tilts = document.querySelectorAll('.intro-avatar.t-tilt');
    
    tilts.forEach(function(tilt) {
      var card = tilt.querySelector('.avatar-tilt-card');
      if (!card) return;
      
      // 鼠标进入
      tilt.addEventListener('mouseenter', function() {
        tilt.classList.add('is-hover');
      });
      
      // 鼠标移动 - 计算倾斜角度
      tilt.addEventListener('mousemove', function(e) {
        var rect = tilt.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        // 计算中心点偏移 (-1 到 1)
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var percentX = (x - centerX) / centerX;
        var percentY = (y - centerY) / centerY;
        
        // 计算旋转角度 (最大 ±15度)
        var maxRotate = 15;
        var rx = -percentY * maxRotate;
        var ry = percentX * maxRotate;
        
        // 计算光泽位置 (0% 到 100%)
        var gx = (x / rect.width) * 100;
        var gy = (y / rect.height) * 100;
        
        // 应用样式
        card.style.setProperty('--tilt-rx', rx + 'deg');
        card.style.setProperty('--tilt-ry', ry + 'deg');
        card.style.setProperty('--tilt-gx', gx + '%');
        card.style.setProperty('--tilt-gy', gy + '%');
        
        // 添加快速跟随类
        card.classList.add('is-tilting');
      });
      
      // 鼠标离开 - 重置
      tilt.addEventListener('mouseleave', function() {
        tilt.classList.remove('is-hover');
        card.classList.remove('is-tilting');
        card.style.setProperty('--tilt-rx', '0deg');
        card.style.setProperty('--tilt-ry', '0deg');
      });
    });
  }
  
  // 初始化头像倾斜
  initAvatarTilt();
  
  function initTabs() {
    var tabsContainers = document.querySelectorAll('.t-tabs');
    
    tabsContainers.forEach(function(container) {
      var pill = container.querySelector('.t-tabs-pill');
      var tabs = container.querySelectorAll('.t-tab');
      var contents = document.querySelectorAll('.qualification__content');
      
      if (!pill || tabs.length === 0) return;
      
      // 更新药丸位置和大小
      function updatePill(activeTab, immediate) {
        if (immediate) {
          pill.style.transition = 'none';
        }
        pill.style.width = activeTab.offsetWidth + 'px';
        pill.style.transform = 'translateX(' + activeTab.offsetLeft + 'px)';
        
        if (immediate) {
          // 强制重绘
          pill.offsetHeight;
          pill.style.transition = '';
        }
      }
      
      // 初始化第一个标签
      var activeTab = container.querySelector('.t-tab[aria-selected="true"]');
      if (activeTab) {
        updatePill(activeTab, true);
      }
      
      // 标签点击事件
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          var tabId = tab.getAttribute('data-tab');
          
          // 更新标签状态
          tabs.forEach(function(t) {
            t.setAttribute('aria-selected', 'false');
          });
          tab.setAttribute('aria-selected', 'true');
          
          // 更新药丸位置
          updatePill(tab, false);
          
          // 更新内容面板
          contents.forEach(function(content) {
            content.classList.remove('qualification__active');
          });
          var targetContent = document.getElementById(tabId);
          if (targetContent) {
            targetContent.classList.add('qualification__active');
          }
        });
      });
      
      // 窗口大小改变时重新定位
      var resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          var currentActive = container.querySelector('.t-tab[aria-selected="true"]');
          if (currentActive) {
            updatePill(currentActive, true);
          }
        }, 100);
      });
    });
  }
  
  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
})();
</script>

<HR class="section-divider" />

<style>
.section-divider {
  border: none;
  height: 1px;
  background: linear-gradient(to right, #EEF3FE, #333333, #EEF3FE);
  box-shadow: 0 2px 4px rgba(35, 40, 46, 0.2);
}

[data-md-color-scheme="slate"] .section-divider {
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}
</style>



## 个人简介

!!! quote "Who am I?"
    <div style="font-size: 1.3em;">
    
    - Hi, I'm [Wcowin](https://github.com/Wcowin){target="_blank"}~
    - 咖啡和Codex重度爱好者
    - 热爱(xiā)研究/Math业余，致力于Mkdocs/[Zensical](https://zensical.org/)以及[Mac应用](../develop/Mac-development/index.md)的开发
    - 目前的研究领域是[低空技术](../research/aerotech/)、[AI/网络安全/具身智能](../develop/AI)、[密码学/区块链](../blog/Cryptography/index.md)
    - 读书明志|诗词爱好者|历史研究|喜欢村上春树|擅长羽毛球
    - 清醒知趣，明得失，知进退

    </div>

## 人生态度

<p style="text-align: center; font-size: 25px; margin: 0px;"><strong>𝘿𝙤𝙣'𝙩 𝙘𝙖𝙧𝙚 𝙖𝙗𝙤𝙪𝙩 𝙬𝙤𝙧𝙡𝙙𝙡𝙮 𝙚𝙮𝙚𝙨 𝙩𝙤 𝙥𝙪𝙧𝙨𝙪𝙚 𝙮𝙤𝙪𝙧 𝙤𝙬𝙣 𝙡𝙞𝙜𝙝𝙩</strong></p>


=== "For"
    <img class="img1" src="https://pic1.zhimg.com/80/v2-8030915c744322fb1e3a6ec0b8fed24c_1440w.webp">

=== "you"
    <img class="img1" src="https://pic2.zhimg.com/80/v2-6cf497fc08da090bd53e4a5dc962d9d9_1440w.webp">

## 联系我

<style>
  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }
  }
</style>
  <a href="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" target="_blank" class="mobile-only">
   <center>
    <img class="img1" src="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" style="width: 450px; height: auto;">
      <div style="color: #999;
      padding: 2px;">我的Wechat</div>
    </center>
  </a>

  <a href="https://t.me/wecowin" target="_blank" class="mobile-only">
   <center>
    <img class="img1" src="https://pica.zhimg.com/80/v2-d5876bc0c8c756ecbba8ff410ed29c14_1440w.webp" style="width: 450px; height: auto;">
      <div style="color: #999;
      padding: 2px;">我的TG</div>
    </center>
  </a>

<style>
@media (max-width: 768px) { /* 移动端隐藏 */
  .desktop-only {
    display: none !important;
  }
}
</style>

<div class="grid desktop-only" style="display: grid;grid-template-columns: 35% 65%" markdown>
<div class="grid cards" markdown>

-   <center>![WeChat](https://picx.zhimg.com/80/v2-21045fd6f42e98fb136c6d7d0958f2f1_1440w.webp#only-light){ .lg .middle style="width: 50px; height: 50px;"} ![WeChat](https://img.icons8.com/?size=100&id=19977&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---

    <center><font  color= #757575 size=6>WeChat</font>
    <img src="https://picx.zhimg.com/80/v2-540df18f16032fbe114dd960da21b467_1440w.webp" style="width: auto; height: auto; border-radius: 25px;">
    <font color= #999 >扫一扫上面的二维码图案<br>
    加我为朋友</font></center>

</div>

<div class="grid cards" style="display: grid; grid-template-columns: 1fr;" markdown>



-   <center>![](https://pic4.zhimg.com/v2-e996df5a7696237b6f924ace7044cd97_1440w.jpg#only-light){ .lg .middle style="width: 50px; height: 50px;"}![](https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"} </center>

    ---

    <center><font  color= #757575 size=6>Email</font>

    [发送电子邮件 :fontawesome-solid-paper-plane:](mailto:<wcowin@qq.com>){.md-button}</center>

<div class="grid cards" style="display:grid; grid-template-columns: 49% 49% !important;" markdown>


-   <center>![](https://pica.zhimg.com/v2-61b4731957dba61e9960436dbd06306a_1440w.jpg#only-light){ .lg .middle style="width: 50px; height: 50px;" } ![WeChat](https://img.icons8.com/?size=100&id=63306&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---

    <center><font  color= #757575 size=6>Telegram</font>
    [Let's Chat :fontawesome-brands-telegram:](https://t.me/Wcowin){.md-button} </center>

-   <center>![](https://pic3.zhimg.com/80/v2-aa11d437a377f1a0deac132eb800b306_1440w.webp#only-light){ .lg .middle style="width: 50px; height: 50px;"} ![WeChat](https://img.icons8.com/?size=100&id=13963&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---

    <center><font  color= #757575 size=6>Twitter</font>
    [@Wcowin :material-twitter:](https://x.com/intent/follow?screen_name=Wcowin_){.md-button}</center>

</div>
</div>
</div>


<!-- ## 联系我

=== "微信"
    <center>
    <img src="https://picx.zhimg.com/80/v2-540df18f16032fbe114dd960da21b467_1440w.webp" style="width: 300px; height: auto;">
    <br>
    扫一扫上面的二维码图案，加我为朋友
    </center>

=== "邮箱"
    <center>
    <a href="mailto:wangkewen821@gmail.com" class="md-button">
        :fontawesome-solid-paper-plane: 发送电子邮件
    </a>
    </center>

=== "社交"
    <center>
    <a href="https://t.me/Wcowin" class="md-button">
        :fontawesome-brands-telegram: Telegram
    </a>
    &nbsp;&nbsp;
    <a href="https://x.com/intent/follow?screen_name=kewen9694" class="md-button">
        :fontawesome-brands-twitter: Twitter
    </a>
    </center> -->


??? tip "公众号(年更UP)"
    <figure markdown >
    ![Image title](https://s1.imagehub.cc/images/2025/01/04/ac7fda1814bb1e18714f9dd9f5d87636.png){.img1 }
    <figcaption>公众号</figcaption>
    </figure>

---

<style>
.md5-box {
  background: linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.7) 100%);
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 0;
  color: #444;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid rgba(200,200,200,0.25);
}
.md5-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.md5-box .label {
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}
.md5-box .code {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #333;
}
.md5-box .hint {
  font-size: 11px;
  color: #888;
  margin-top: 10px;
}
.md5-box .copy-tip {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  font-size: 11px;
  color: #999;
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(0,0,0,0.05);
  padding: 4px 8px;
  border-radius: 4px;
}
.md5-box:hover .copy-tip {
  opacity: 1;
}
</style>

<div class="md5-box" onclick="navigator.clipboard.writeText('7037F514864088F907CC921687B670EE');this.querySelector('.copy-tip').textContent='已复制!';">
  <div class="label">📞 电话号码的 MD5 哈希</div>
  <div class="code">7037F514864088F907CC921687B670EE</div>
  <div class="hint">破解有奖 ☕️ | 必须附带破解过程 | 从简历/邮箱/WX上看到的不算 | 目前已有 4 人成功破解</div>
  <div class="copy-tip">点击复制</div>
</div>


## 须知

如果给我发[邮件](mailto:<wcowin@qq.com>)，或者通过右下角**微信/TG添加好友**，请写上您的**真名实姓**。对于那些不知来路、上来就问问题的微信和邮件，我通常会**直接忽略**，谢谢。


!!! note "与我联系"
    <div style="font-size: 1.2em;">
    如果你在浏览博客的过程中发现了任何问题，欢迎前往 GitHub 的[代码仓库](https://github.com/Wcowin/Wcowin.github.io)提交 [Issues](https://github.com/Wcowin/Wcowin.github.io/issues) ，最好Wechat/TG或者邮箱联系。如果你有其他事情想要咨询，可以通过下方按钮使用邮件联系我,请不要滥用博客的评论功能发表与主题无关言论。
    </div>

    ---
    <center>[发送电子邮件 :fontawesome-solid-paper-plane:](mailto:<wcowin@qq.com>){.md-button}</center>



<!-- 我的电话号码`SHA256`码：DEF633030D31F7ABE6213EE5B5EFDF0E4ADDFDA121695325660D82F15ED22946 -->


<!-- <chat-bot platform_id="d19a99ed-b684-4d64-8c70-7663d974af17" user_id="325b3ae2-0317-4c5f-9f9b-c4ce0e51e36b" chatbot_id="8eedef48-41ef-4f78-97d9-71e8197a452d"><a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">[chatbot]</a></chat-bot><script src="https://cdn.chatsimple.ai/chat-bot-loader.js" defer></script> -->

<!-- <script src="//code.tidio.co/6jmawe9m5wy4ahvlhub2riyrnujz7xxi.js" async></script> -->
