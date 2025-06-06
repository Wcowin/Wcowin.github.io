---
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
comments: false
---


<center><font  color= #757575 size=6.5 >循此苦旅 以达星辰</font></center>

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } __导航栏__

    ---
    ![image](https://pic1.zhimg.com/80/v2-b9ae6898d33359da6be815bf60626af2_1440w.webp?source=2c26e567){ class="responsive-image" loading="lazy" align=right width="340" height="226" style="border-radius: 25px;" }

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
}
</style>






<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2327435979273742"
     crossorigin="anonymous"></script>

<script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
<amp-auto-ads type="adsense"
        data-ad-client="ca-pub-2327435979273742">
</amp-auto-ads>


??? note "Bark 即时消息推送(下方尝试/实验性功能)"
    <!-- Bark 消息推送表单 -->
    <div style="display: flex; justify-content: center; margin: 20px 0;">
    <img src="https://s1.imagehub.cc/images/2025/05/28/a66589b017a16ce2dc4ade5d50192f6a.jpeg" 
         alt="IMG 6738" 
         width="300" 
         height="200" 
         style="border-radius: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    </div>

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
            showStatus('✅ 消息发送成功！我已经收到推送通知', 'success');
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

<meta name="360-site-verification" content="e446c2fbb2bc162d99fd745850b990a2" />

