---
title: 如何给MKdocs添加友链
tags:
  - Mkdocs
hide:
  - feedback
---

# 如何给MKdocs添加友链

复制后在需要添加友链的.md 文件页面粘贴即可

高亮部分是友链的主体，可以根据自己的需求进行修改

```html hl_lines="82-117"
<div class="post-body">
<div id="links">
<style>
/* 友链容器样式 */
.link-navigation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1rem;
    max-width: 100%;
}
/* 通用卡片样式 */
.card {
    width: 100%;
    max-width: 320px;
    height: 90px;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 25px;
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    color: #333;
    justify-self: center;
}
.card:hover {
    transform: translateY(0px) scale(1.05);
    background-color: rgba(68, 138, 255, 0.1);
    color: #040000;
}
.card a {
    border: none;
}
.card .ava {
    width: 3rem !important;
    height: 3rem !important;
    margin: 0 !important;
    margin-right: 1em !important;
    border-radius: 50%;
}
.card .card-header {
    font-style: italic;
    overflow: hidden;
    width: auto;
}
.card .card-header a {
    font-style: normal;
    color: #608DBD;
    font-weight: bold;
    text-decoration: none;
}
.card .card-header a:hover {
    color: #d480aa;
    text-decoration: none;
}
.card .card-header .info {
    font-style: normal;
    color: #706f6f;
    font-size: 14px;
    min-width: 0;
    overflow: visible;
    white-space: normal;
}
/* 小屏优化 */
@media (max-width: 768px) {
    .link-navigation {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
    .card {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 80px;
    }
    .card:hover {
        background-color: rgba(68, 138, 255, 0.1);
    }
}
</style>
<div class="links-content">
<div class="link-navigation">
    <div class="card">
        <img class="ava" src="https://avatars.githubusercontent.com/jaywhj" />
        <div class="card-header">
            <div>
                <a href="https://jaywhj.netlify.app/" target="_blank">极简主义</a>
            </div>
            <div class="info">文档即产品</div>
        </div>
    </div>
    <div class="card">
        <img class="ava" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" />
        <div class="card-header">
        <div>
            <a href="https://wcowin.work/" target="_blank">Wcowin’s blog</a>
        </div>
        <div class="info">循此苦旅，以达星辰</div>
        </div>
    </div>
    <div class="card">
        <img class="ava" src="https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png" />
        <div class="card-header">
        <div>
            <a href="https://twitter.com/" target="_blank">Twitter</a>
        </div>
        <div class="info">社交分享平台</div>
        </div>
    </div>
    <div class="card">
        <img class="ava" src="https://i.stardots.io/wcowin/1750221795613.jpeg" />
        <div class="card-header">
        <div>
            <a href="{link}" target="_blank">{name}</a>
        </div>
        <div class="info">{description}</div>
        </div>
    </div>

</div>
</div>
</div>
</div>
```


## 如何加入友链

```html
<div class="card">
  <img class="ava" src="{avatarurl}" />
  <div class="card-header">
    <div>
      <a href="{link}" target="_blank">{name}</a>
    </div>
    <div class="info">{description}</div>
  </div>
</div>
```


## 效果

<!-- <div>
  <div class="links-content">
   <div class="link-navigation">
    <div class="card">
     <img class="ava" src="https://pic4.zhimg.com/80/v2-a0456a5f527c1923f096759f2926012f_1440w.webp" />
     <div class="card-header">
      <div>
       <a href="https://wcowin.work/ " target=“_blank”>Wcowin’s blog</a>
      </div>
      <div class="info">
       这是一个分享技术的小站。
      </div>
     </div>
    </div>
</div> -->


<div class="post-body">
<div id="links">
<style>
/* 友链容器样式 */
.link-navigation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1rem;
    max-width: 100%;
}
/* 通用卡片样式 */
.card {
    width: 100%;
    max-width: 320px;
    height: 90px;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 25px;
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    color: #333;
    justify-self: center;
}
.card:hover {
    transform: translateY(0px) scale(1.05);
    background-color: rgba(68, 138, 255, 0.1);
    color: #040000;
}
.card a {
    border: none;
}
.card .ava {
    width: 3rem !important;
    height: 3rem !important;
    margin: 0 !important;
    margin-right: 1em !important;
    border-radius: 50%;
}
.card .card-header {
    font-style: italic;
    overflow: hidden;
    width: auto;
}
.card .card-header a {
    font-style: normal;
    color: #608DBD;
    font-weight: bold;
    text-decoration: none;
}
.card .card-header a:hover {
    color: #d480aa;
    text-decoration: none;
}
.card .card-header .info {
    font-style: normal;
    color: #706f6f;
    font-size: 14px;
    min-width: 0;
    overflow: visible;
    white-space: normal;
}
/* 小屏优化 */
@media (max-width: 768px) {
    .link-navigation {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
    .card {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 80px;
    }
    .card:hover {
        background-color: rgba(68, 138, 255, 0.1);
    }
}
</style>
<div class="links-content">
<div class="link-navigation">
    <div class="card">
        <img class="ava" src="https://avatars.githubusercontent.com/jaywhj" />
        <div class="card-header">
            <div>
                <a href="https://jaywhj.netlify.app/" target="_blank">极简主义</a>
            </div>
            <div class="info">文档即产品</div>
        </div>
    </div>
    <div class="card">
        <img class="ava" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" />
        <div class="card-header">
        <div>
            <a href="https://wcowin.work/" target="_blank">Wcowin’s blog</a>
        </div>
        <div class="info">循此苦旅，以达星辰 </div>
        </div>
    </div>
    <div class="card">
        <img class="ava" src="https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png" />
        <div class="card-header">
        <div>
            <a href="https://twitter.com/" target="_blank">Twitter</a>
        </div>
        <div class="info">社交分享平台</div>
        </div>
    </div>
    <!-- <div class="card">
        <img class="ava" src="https://i.stardots.io/wcowin/1750220860750.jpg" />
        <div class="card-header">
        <div>
            <a href="https://macapp.org.cn" target="_blank">Macapp</a>
        </div>
        <div class="info">一个专注于分享Mac资源的频道</div>
        </div>
    </div> -->
    <div class="card">
        <img class="ava" src="https://i.stardots.io/wcowin/1750221795613.jpeg" />
        <div class="card-header">
        <div>
            <a href="{link}" target="_blank">{name}</a>
        </div>
        <div class="info">{description}</div>
        </div>
    </div>

</div>
</div>
</div>
</div>


## 友链预览小工具

<!-- 友链预览小工具，按钮居中，适配响应式和夜间模式，宽度适配电脑端和手机端 -->
<style>
#friendlink-preview-tool {
  margin: 2em auto;
  padding: 1.5em;
  border-radius: 12px;
  box-shadow: 0 2px 8px #EEF3FE;
  max-width: 700px;
  min-width: 320px;
  width: 100%;
  transition: background 0.3s;
}
#friendlink-preview-tool h3 {
  margin-top: 0;
  font-size: 24px;
  transition: color 0.3s;
}
#friendlink-preview-tool input,
#friendlink-preview-tool textarea {
  padding: 7px 10px;
  border-radius: 6px;
  border: 1px solid #d0d7de;
  font-size: 16px;
  background: #fff;
  color: #222;
  transition: background 0.3s, color 0.3s;
}
#friendlink-preview-tool textarea {
  min-height: 270px;
  max-height: 350px;
  resize: vertical;
  width: 100%;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre;
  overflow: auto;
  word-break: break-all;
  scrollbar-width: none;
}
#friendlink-preview-tool textarea::-webkit-scrollbar {
  display: none;
}
#friendlink-preview-tool .btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 0.5em;
}
#friendlink-preview-tool button {
  padding: 7px 18px;
  border-radius: 6px;
  background: #2196F3;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}
#friendlink-preview-tool button:hover {
  background: #1976d2;
}
#fl_preview_area {
  margin-top: 1.2em;
  min-height: 110px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
#fl_preview_area .card {
  float: none !important;
  margin: 0 auto !important;
  max-width: 450px;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: static !important;
}
#fl_preview_area .card .ava {
  width: 3rem !important;
  height: 3rem !important;
}

/* 响应式适配 */
@media (max-width: 900px) {
  #friendlink-preview-tool {
    max-width: 98vw;
    min-width: 0;
    padding: 1em 0.5em;
    border-radius: 0;
    box-shadow: none;
  }
  #friendlink-preview-tool input,
  #friendlink-preview-tool textarea,
  #friendlink-preview-tool button {
    font-size: 1em;
  }
}

/* 夜间模式适配 */
@media (prefers-color-scheme: dark) {
  #friendlink-preview-tool {
    background: #23272f;
    box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  }
  #friendlink-preview-tool h3 {
    color: #e3e6eb;
  }
  #friendlink-preview-tool input,
  #friendlink-preview-tool textarea {
    background: #181a20;
    color: #e3e6eb;
    border: 1px solid #333a45;
  }
  #friendlink-preview-tool button {
    background: #1976d2;
    color: #fff;
  }
}
</style>

<div id="friendlink-preview-tool">
  <h3>友链效果预览</h3>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <input id="fl_name" placeholder="网站名称" oninput="renderFriendLinkPreview()">
    <input id="fl_link" placeholder="网站链接(含http/https)" oninput="renderFriendLinkPreview()">
    <input id="fl_avatar" placeholder="头像链接(图片URL)" oninput="renderFriendLinkPreview()">
    <input id="fl_desc" placeholder="简介" oninput="renderFriendLinkPreview()">
  </div><br>
  <div class="btn-row">
    <button type="button" onclick="renderFriendLinkPreview()">预览效果</button>
    <button type="button" onclick="copyFriendLinkHtml()">复制HTML</button>
  </div>
  <div id="fl_preview_area"></div>
  <div style="margin-top:1em;">
    <label for="fl_preview_code"><strong>生成的HTML代码</strong></label>
    <textarea id="fl_preview_code" readonly></textarea>
  </div>
</div>

<script>
function escapeHtml(str) {
  return str.replace(/[<>&"]/g, function(c) {
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
  });
}
function renderFriendLinkPreview() {
  var name = document.getElementById('fl_name').value.trim() || '你的网站名称';
  var link = document.getElementById('fl_link').value.trim() || 'https://your.site/';
  var avatar = document.getElementById('fl_avatar').value.trim() || 'https://pic4.zhimg.com/80/v2-a0456a5f527c1923f096759f2926012f_1440w.webp';
  var desc = document.getElementById('fl_desc').value.trim() || '你的网站简介';

  // 使用 DOM 操作构建预览，避免 MkDocs 改写模板字符串中的 URL
  var card = document.createElement('div');
  card.className = 'card';
  var img = document.createElement('img');
  img.className = 'ava';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = avatar;
  var cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  var nameDiv = document.createElement('div');
  var a = document.createElement('a');
  a.href = link;
  a.target = '_blank';
  a.textContent = name;
  nameDiv.appendChild(a);
  var infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.textContent = desc;
  cardHeader.appendChild(nameDiv);
  cardHeader.appendChild(infoDiv);
  card.appendChild(img);
  card.appendChild(cardHeader);

  var previewArea = document.getElementById('fl_preview_area');
  previewArea.innerHTML = '';
  previewArea.appendChild(card);

  // 生成 HTML 代码用于复制（拆分标签防止 MkDocs 构建时改写 URL）
  var htmlStr = '  <div class="card">\n' +
    '    <img class="ava" loading="lazy" decoding="async" src="' + escapeHtml(avatar) + '" />\n' +
    '    <div class="card-header">\n' +
    '      <div>\n' +
    '        <' + 'a h' + 'ref="' + escapeHtml(link) + '" target="_blank">' + escapeHtml(name) + '</' + 'a>\n' +
    '      </div>\n' +
    '      <div class="info">\n' +
    '        ' + escapeHtml(desc) + '\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>';
  var fenced = '```html\n' + htmlStr + '\n```';
  document.getElementById('fl_preview_code').value = fenced;
  try {
    localStorage.setItem('friendlink_form_linktech', JSON.stringify({
      name: document.getElementById('fl_name').value,
      link: document.getElementById('fl_link').value,
      avatar: document.getElementById('fl_avatar').value,
      desc: document.getElementById('fl_desc').value
    }));
  } catch (e) {}
}
function copyFriendLinkHtml() {
  var codeArea = document.getElementById('fl_preview_code');
  codeArea.select();
  codeArea.setSelectionRange(0, codeArea.value.length);
  try { document.execCommand('copy'); } catch (e) {}
}
document.addEventListener('DOMContentLoaded', function () {
  try {
    var saved = localStorage.getItem('friendlink_form_linktech');
    if (saved) {
      var data = JSON.parse(saved);
      if (data.name) document.getElementById('fl_name').value = data.name;
      if (data.link) document.getElementById('fl_link').value = data.link;
      if (data.avatar) document.getElementById('fl_avatar').value = data.avatar;
      if (data.desc) document.getElementById('fl_desc').value = data.desc;
    }
  } catch (e) {}
  renderFriendLinkPreview();
});
</script>


