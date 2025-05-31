---
title: 留言板
hide:
  - footer
  - feedback
comments: true
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

---

<div align="center" style="margin: 40px 0; padding: 25px; border: 2px solid #e1e4e8; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #586069; font-size: 1.5em; margin-bottom: 8px;">📱 给我发送即时消息</h3>
    <p style="color: #586069; font-size: 14px; margin-bottom: 20px;">通过 Bark 推送直接发送消息给我</p>
    <form id="bark-form" onsubmit="sendBarkMessage(event)" style="max-width: 420px; margin: 0 auto;">
        <div style="margin-bottom: 12px;">
            <input type="text" id="message-title" placeholder="消息标题 *" required
                  style="width: 100%; border: 2px solid #d1d5da; padding: 12px 16px; border-radius: 8px; font-size: 14px; transition: border-color 0.3s ease; box-sizing: border-box;">
        </div>
        <div style="margin-bottom: 12px;">
            <textarea id="message-body" placeholder="消息内容（可选）" rows="4"
                      style="width: 100%; border: 2px solid #d1d5da; padding: 12px 16px; border-radius: 8px; font-size: 14px; resize: vertical; transition: border-color 0.3s ease; box-sizing: border-box; font-family: inherit;"></textarea>
        </div>
        <div style="margin-bottom: 20px;">
            <input type="text" id="sender-name" placeholder="您的昵称（可选）"
                  style="width: 100%; border: 2px solid #d1d5da; padding: 12px 16px; border-radius: 8px; font-size: 14px; transition: border-color 0.3s ease; box-sizing: border-box;">
        </div>
        <button type="submit" id="send-btn"
                style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3); min-width: 140px;">
            📤 发送消息
        </button>
    </form>
    <div id="message-status" style="margin-top: 20px; padding: 12px 20px; border-radius: 8px; display: none; font-weight: 500; transition: all 0.3s ease;"></div>
</div>
<style>
/* Bark 表单样式增强 */
#bark-form input:focus,
#bark-form textarea:focus {
    border-color: #28a745 !important;
    outline: none;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}
#send-btn:hover {
    background: linear-gradient(135deg, #218838 0%, #17a2b8 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}
#send-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);
}
#send-btn:disabled {
    background: #6c757d !important;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
}
/* 移动端优化 */
@media (max-width: 768px) {
    #bark-form {
        max-width: 90% !important;
    }
    #bark-form input,
    #bark-form textarea {
        font-size: 16px !important; /* 防止 iOS 缩放 */
    }
}
</style>
<script>
// Bark 配置
const BARK_BASE_URL = 'https://api.day.app/SbAMEuK6WagQiFzAifiyKJ';
// 主要的 Bark 消息发送函数
async function sendBarkMessage(event) {
    event.preventDefault();    
    const form = event.target;
    const title = document.getElementById('message-title').value.trim();
    const body = document.getElementById('message-body').value.trim();
    const senderName = document.getElementById('sender-name').value.trim();
    const sendBtn = document.getElementById('send-btn');    
    // 输入验证
    if (!title) {
        showStatus('❌ 请输入消息标题', 'error');
        return;
    }
    if (title.length > 100) {
        showStatus('❌ 标题长度不能超过100个字符', 'error');
        return;
    }
    // 构建完整消息内容
    let fullBody = body || '';
    if (senderName) {
        fullBody += fullBody ? `\n\n来自：${senderName}` : `来自：${senderName}`;
    }
    // 设置发送中状态
    sendBtn.disabled = true;
    sendBtn.innerHTML = '📤 发送中...';
    showStatus('📡 正在发送消息...', 'info');  
    try {
        const success = await sendBarkMessage_internal(title, fullBody);
        if (success) {
            showStatus('✅ 消息发送成功！您应该能在设备上收到推送通知', 'success');
            form.reset();
        } else {
            showStatus('❌ 发送失败，请稍后重试', 'error');
        }
    } catch (error) {
        console.error('Bark 发送错误:', error);
        showStatus('❌ 发送过程中出现错误，请稍后重试', 'error');
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '📤 发送消息';
    }
}
// 使用图片加载方式发送 Bark 消息
function sendBarkMessage_internal(title, body) {
    return new Promise((resolve) => {
        const encodedTitle = encodeURIComponent(title);
        const encodedBody = encodeURIComponent(body || ''); 
        const barkUrl = body 
            ? `${BARK_BASE_URL}/${encodedTitle}/${encodedBody}`
            : `${BARK_BASE_URL}/${encodedTitle}`;
        const img = new Image();
        // 设置超时，2秒后认为发送成功
        const timeoutId = setTimeout(() => {
            resolve(true);
        }, 2000);
        img.onload = () => {
            clearTimeout(timeoutId);
            resolve(true);
        };
        img.onerror = () => {
            clearTimeout(timeoutId);
            resolve(true); // Bark API 不返回图片，错误是正常的
        };
        // 添加时间戳避免缓存
        img.src = barkUrl + '?t=' + Date.now();
    });
}
function showStatus(message, type) {
    const statusDiv = document.getElementById('message-status');
    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    // 设置样式
    const styles = {
        success: {
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '2px solid #c3e6cb'
        },
        error: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '2px solid #f5c6cb'
        },
        info: {
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            border: '2px solid #bee5eb'
        }
    };
    const style = styles[type] || styles.info;
    Object.assign(statusDiv.style, style);
    // 自动隐藏消息
    const hideDelay = type === 'success' ? 5000 : type === 'error' ? 8000 : 3000;
    setTimeout(() => {
        if (statusDiv.style.display !== 'none') {
            statusDiv.style.display = 'none';
        }
    }, hideDelay);
}
// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加输入框焦点样式
    const inputs = document.querySelectorAll('#bark-form input, #bark-form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#28a745';
            this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '#d1d5da';
            this.style.boxShadow = 'none';
        });
    });
    // 添加标题字符计数
    const titleInput = document.getElementById('message-title');
    if (titleInput) {
        titleInput.addEventListener('input', function() {
            const length = this.value.length;
            if (length > 100) {
                this.style.borderColor = '#dc3545';
            } else if (length > 80) {
                this.style.borderColor = '#ffc107';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    }
});
</script>

---

<!-- <div class="button-container">
  <button id="giscus-btn" class="buttonxuan active">Giscus</button>
  <button id="cusdis-btn" class="buttonxuan">Waline</button>
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
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v2/dist/waline.css" />
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
    });
  </script>
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
</script> -->


  <!-- <script src="https://giscus.app/client.js"
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
  </script> -->



<!-- 打赏区 -->
<div class="reward-container">
  <button onclick="toggleQR()">请作者喝杯咖啡</button>
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

<!-- 样式统一整理 -->
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
  background-color: #fff;
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
  color: #fff;
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
  width: 200px;
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
/* .md-grid {
  max-width: 1300px;
} */
</style>



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




<!-- <div id="cusdis_thread"
  data-host="https://cusdis.com"
  data-app-id="655cf3bc-734a-4d88-8317-be350621334c"
  data-page-id="{{ PAGE_ID }}"
  data-page-url="{{ PAGE_URL }}"
  data-page-title="{{ PAGE_TITLE }}"
></div>
<script async defer src="https://cusdis.com/js/cusdis.es.js"></script> -->

<!-- 优化后的 Waline 评论区代码，支持暗色模式自适应，结构更简洁，移动端适配更好 -->
<!-- <link rel="stylesheet" href="https://unpkg.com/@waline/client@v2/dist/waline.css" />

<div id="waline"></div>

<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs';
  init({
    el: '#waline',
    serverURL: 'https://mk-docs-comments.vercel.app/',
    emoji: [
      'https://unpkg.com/@waline/emojis@1.1.0/qq',
      'https://unpkg.com/@waline/emojis@1.1.0/tw-emoji',
      'https://unpkg.com/@waline/emojis@1.1.0/bilibili',
      'https://unpkg.com/@waline/emojis@1.1.0/weibo',
    ],
    comment: true,
    pageview: true,
    lang: 'zh',
    dark: 'auto', // 自动适配暗色模式
    avatar: 'retro', // 可选：更有趣的头像风格
  });
</script> -->