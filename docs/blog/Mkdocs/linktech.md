---
title: 如何给MKdocs添加友链
tags:
  - Mkdocs
hide:
  - feedback
---

复制后在需要添加友链的.md 文件页面粘贴即可

```html hl_lines="82-126"
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
        <img class="ava" src="https://i.stardots.io/wcowin/1750089315509.png" />
        <div class="card-header">
        <div>
            <a href="https://wcowin.work/" target="_blank">Wcowin’s blog</a>
        </div>
        <div class="info">这是一个分享技术的小站。</div>
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
        <img class="ava" src="https://i.stardots.io/wcowin/1750220860750.jpg" />
        <div class="card-header">
        <div>
            <a href="https://macapp.org.cn" target="_blank">Macapp</a>
        </div>
        <div class="info">一个专注于分享Mac资源的频道</div>
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
        <img class="ava" src="https://i.stardots.io/wcowin/1750089315509.png" />
        <div class="card-header">
        <div>
            <a href="https://wcowin.work/" target="_blank">Wcowin’s blog</a>
        </div>
        <div class="info">这是一个分享技术的小站。</div>
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
        <img class="ava" src="https://i.stardots.io/wcowin/1750220860750.jpg" />
        <div class="card-header">
        <div>
            <a href="https://macapp.org.cn" target="_blank">Macapp</a>
        </div>
        <div class="info">一个专注于分享Mac资源的频道</div>
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