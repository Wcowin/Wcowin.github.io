---
title: 关于我
hide:
  - feedback
status: new
---

<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>

# <span id="jinrishici-sentence">今日诗词</span>

## 关于我

<div class="flip-container">
<div class="image-container">
    <img src="https://free.wmhua.cn/2025/05/09/681d7015ed864.jpeg" alt="Front Image">
    <img src="https://free.wmhua.cn/2025/05/09/681d7016db8dc.png" alt="Back Image">
</div>
</div>
<style>
    /* 头像样式 */
    .flip-container {
    position: relative;
    width: 290px;
    height: 290px;
    margin: 10px auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}
.image-container {
    position: relative;
    width: 290px;
    height: 290px;
}
.image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    transition: all 1s;
    box-shadow: 0 8px 24px rgba(14, 30, 37, 0.15);
    border: 4px solid #ffffff;
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
/* 项目卡片样式 */
.timeline {
    border-left: 4px solid #f0f9ff;
    padding-left: 2rem;
    margin-left: 1rem;
    margin-bottom: 3rem;
}
.timeline-item {
    margin-bottom: 2.5rem;
    position: relative;
}
.timeline-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2.25rem;
    width: 12px;
    height: 12px;
    background: #518FC1;
    border-radius: 50%;
    border: 3px solid #fff;
}
.project-card {
    background: #fff;
    border-radius: 1.2rem;
    padding: 1.8rem;
    box-shadow: 0 4px 16px rgba(14, 30, 37, 0.08);
    margin-bottom: 0;
}
.project-card h3 {
    margin-top: 0;
    font-size: 1.3rem !important;
    font-weight: 600;
    color: #518FC1 !important;
    margin-bottom: 0.5rem !important;
}
.project-card p {
    color: #6b7280;
    margin-bottom: 0.75rem;
}
.project-card .tech-stack {
    font-size: 0.875rem;
    color: #6b7280;
}
/* 教育时间线样式 */
.education-timeline {
    position: relative;
    border-left: 4px solid #f0f9ff;
    padding-left: 2rem;
    margin: 2.5rem 0 2.5rem 1rem;
}
.education-item {
    margin-bottom: 2.5rem;
    position: relative;
}
.education-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2.25rem;
    width: 12px;
    height: 12px;
    background: #518FC1;
    border-radius: 50%;
    border: 3px solid #fff;
}
.education-card {
    background: #fff;
    border-radius: 1.2rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 4px 16px rgba(14, 30, 37, 0.08);
}
.education-card h3 {
    margin-top: 0 !important;
    font-size: 1.2rem !important;
    font-weight: 600;
    color: #518FC1 !important;
    margin-bottom: 0.5rem !important;
}
.education-card .subtitle {
    color: #6b7280;
    margin-bottom: 0.5rem;
    display: block;
}
.education-card .date {
    font-size: 0.875rem;
    color: #6b7280;
    display: flex;
    align-items: center;
}
.education-card .date i {
    margin-right: 0.5rem;
    color: #518FC1;
}
/* 移动端显示设置 */
@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
}
</style>

<center><font size=6 color="#757575">
观史知今，当思进退，读书明志可识春秋  
<br>

——Wcowin </font></center>  

---

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
        <link rel="stylesheet" href="../sty/portfolio.css">
    </head>
    <body>
        <main class="main">
            <section class="about section" id="about">
                <div class="about__container container">
                    <div class="about__data">
                        <div class="about__info">
                            <div>
                                <span class="about__info-title">1年+</span>
                                <span class="about__info-name">工作经验</span>
                            </div>
                            <div>
                                <a href="https://github.com/Wcowin" target="_blank">
                                    <span class="about__info-title">3项+</span>
                                    <span class="about__info-name">完成的项目</span>
                                </a>
                            </div>
                            <div>
                                <span class="about__info-title">2个+</span>
                                <span class="about__info-name">贡献的开源</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
</html>

<center>
<a href="../个人简历.pdf" target="_blank" class="md-button">下载简历</a>
</center>

---
## 我的履历

<!-- <div class="education-timeline">
    <div class="education-item">
        <div class="education-card">
            <h3>漯河高中</h3>
            <span class="subtitle">平凡的三年</span>
            <div class="date">
                <i class="fas fa-calendar-alt"></i>
                <span>2018 - 2021</span>
            </div>
        </div>
    </div>
    <div class="education-item">
        <div class="education-card">
            <h3>重庆工商大学（CTBU）</h3>
            <span class="subtitle">电子信息工程专业学士</span>
            <div class="date">
                <i class="fas fa-calendar-alt"></i>
                <span>2021 - 2025</span>
            </div>
        </div>
    </div>
    <div class="education-item">
        <div class="education-card">
            <h3>家里蹲大学</h3>
            <span class="subtitle">密码学硕士研究生</span>
            <div class="date">
                <i class="fas fa-calendar-alt"></i>
                <span>2026 - 2029</span>
            </div>
        </div>
    </div>
    <div class="education-item">
        <div class="education-card">
            <h3>未完待续</h3>
            <span class="subtitle">于道各努力，千里自同风</span>
            <div class="date">
                <i class="fas fa-calendar-alt"></i>
                <span>Before - After</span>
            </div>
        </div>
    </div>
</div>

<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#608DBD,direction:145,strength:15)" width="100%" color=#608DBD SIZE=1> -->

<section class="qualification section">
    <div class="qualification__container container">
        <div class="qualification__tabs">
            <div class="qualification__button button--flex qualification__active" data-target='#education'>
                <iconify-icon icon="fluent:hat-graduation-12-regular" class="qualification__icon"></iconify-icon>
                来时路
            </div>
        </div>       
        <div class="qualification__sections">
            <!-- 教育经历时间线 -->
            <div class="qualification__content qualification__active" data-content id="education">
                <!-- 时间线项目 -->
                <div class="qualification__data">
                    <div>
                        <h3 class="qualification__title">漯河高中</h3>
                        <span class="qualification__subtitle">平凡的三年</span>
                        <div class="qualification__calendar">
                            <iconify-icon icon="tabler:calendar" aria-hidden="true"></iconify-icon>
                            <span class="qualification__date">2018 - 2021</span>
                        </div>
                    </div>
                    <div>
                        <span class="qualification__rounder"></span>
                        <span class="qualification__line"></span>
                    </div>
                </div>
                <div class="qualification__data">
                    <div></div>
                    <div>
                        <span class="qualification__rounder"></span>
                        <span class="qualification__line"></span>
                    </div>
                    <div>
                        <h3 class="qualification__title">CTBU</h3>
                        <span class="qualification__subtitle">电子信息工程专业学士</span>
                        <div class="qualification__calendar">
                            <iconify-icon icon="tabler:calendar" aria-hidden="true"></iconify-icon>
                            <span class="qualification__date">2021 - 2025</span>
                        </div>
                    </div>
                </div>
                <div class="qualification__data">
                    <div>
                        <h3 class="qualification__title">家里蹲大学</h3>
                        <span class="qualification__subtitle">密码学硕士研究生</span>
                        <div class="qualification__calendar">
                            <iconify-icon icon="tabler:calendar" aria-hidden="true"></iconify-icon>
                            <span class="qualification__date">2026 - 2029</span>
                        </div>
                    </div>
                    <div>
                        <span class="qualification__rounder"></span>
                        <span class="qualification__line"></span>
                    </div>
                </div>
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
                            <iconify-icon icon="tabler:calendar" aria-hidden="true"></iconify-icon>
                            <span class="qualification__date">Before - After</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#608DBD,direction:145,strength:15)" width="100%" color=#608DBD SIZE=1>

## 个人简介

<p style="text-align: center; font-size: 25px; margin: 0px;"><strong>𝘿𝙤𝙣'𝙩 𝙘𝙖𝙧𝙚 𝙖𝙗𝙤𝙪𝙩 𝙬𝙤𝙧𝙡𝙙𝙡𝙮 𝙚𝙮𝙚𝙨 𝙩𝙤 𝙥𝙪𝙧𝙨𝙪𝙚 𝙮𝙤𝙪𝙧 𝙤𝙬𝙣 𝙡𝙞𝙜𝙝𝙩</strong></p>

!!! pied-piper1 "About me"
    - [x] Hey, I'm [Wcowin](https://wcowin.work/VitePress/){target="_blank"}~
    - [x] 咖啡重度爱好者 
    - [x] 热爱(xiā)折腾技术/Math，目前的研究领域是[密码学](../blog/Cryptography/index.md)
    - [x] 读书明志可识春秋;诗词爱好者;喜欢村上春树;擅长羽毛球
    - [x] 清醒，知趣，明得失，知进退 

<img class="img1" src="https://pic2.zhimg.com/80/v2-6cf497fc08da090bd53e4a5dc962d9d9_1440w.webp">


## 联系我

<head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet">
</head>
<body>
  <a href="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" target="_blank" class="mobile-only">
   <center>
    <img class="img1" src="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" style="width: 450px; height: auto;">
      <div style="color: #999; padding: 2px;">我的Wechat</div>
    </center>  
  </a>  

  <a href="https://t.me/wecowin" target="_blank" class="mobile-only">
   <center>
    <img class="img1" src="https://pica.zhimg.com/80/v2-d5876bc0c8c756ecbba8ff410ed29c14_1440w.webp" style="width: 450px; height: auto;">
      <div style="color: #999; padding: 2px;">我的TG</div>
    </center>  
  </a>
</body>

<div class="grid desktop-only" style="display: grid;grid-template-columns: 35% 65%" markdown>
<div class="grid cards" markdown>

-   <center>![WeChat](https://picx.zhimg.com/80/v2-21045fd6f42e98fb136c6d7d0958f2f1_1440w.webp#only-light){ .lg .middle style="width: 50px; height: 50px;"} ![WeChat](https://img.icons8.com/?size=100&id=19977&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---    
      
    <center><font  color= #757575 size=6>WeChat</font>  
    <img src="https://picx.zhimg.com/80/v2-540df18f16032fbe114dd960da21b467_1440w.webp" style="width: auto; height: auto;">
    <font color= #999 >扫一扫上面的二维码图案<br>
    加我为朋友</font></center>

</div>

<div class="grid cards" style="display: grid; grid-template-columns: 1fr;" markdown>

-   <center>![](https://pic4.zhimg.com/v2-e996df5a7696237b6f924ace7044cd97_1440w.jpg#only-light){ .lg .middle style="width: 50px; height: 50px;"}![](https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"} </center>

    ---

    <center><font  color= #757575 size=6>Email</font>

    [发送电子邮件 :fontawesome-solid-paper-plane:](mailto:<wangkewen821@gmail.com>){.md-button}</center>

<div class="grid cards" style="display:grid; grid-template-columns: 49% 49% !important;" markdown>


-   <center>![](https://pica.zhimg.com/v2-61b4731957dba61e9960436dbd06306a_1440w.jpg#only-light){ .lg .middle style="width: 50px; height: 50px;" } ![WeChat](https://img.icons8.com/?size=100&id=63306&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---

    <center><font  color= #757575 size=6>Telegram</font>
    [Let's Chat :fontawesome-brands-telegram:](https://t.me/Wcowin){.md-button} </center>

-   <center>![](https://pic3.zhimg.com/80/v2-aa11d437a377f1a0deac132eb800b306_1440w.webp#only-light){ .lg .middle style="width: 50px; height: 50px;"} ![WeChat](https://img.icons8.com/?size=100&id=13963&format=png&color=000000#only-dark){ .lg .middle style="width: 50px; height: 50px;"}</center>

    ---    
      
    <center><font  color= #757575 size=6>Twitter</font>  
    [@Wcowin :material-twitter:](https://twitter.com/wcowin_){.md-button}</center>

</div>
</div>
</div>

??? tip "公众号"
    <figure markdown >
    ![Image title](https://s1.imagehub.cc/images/2025/01/04/ac7fda1814bb1e18714f9dd9f5d87636.png){.img1 }
    <figcaption>公众号</figcaption>
    </figure>

---  

> 💬我电话号码的`MD5`码：7037F514864088F907CC921687B670EE（破解有奖） 

## 须知
如果你在浏览博客的过程中发现了任何问题，欢迎前往 GitHub 的[代码仓库](https://github.com/Wcowin/Wcowin.github.io)提交 [Issues](https://github.com/Wcowin/Wcowin.github.io/issues) 或直接修改相关文件后提交 Pull Requests。如果你有其他事情想要咨询，可以通过下方按钮使用邮件联系我,请不要滥用博客的评论功能发表与主题无关言论。

!!! note "与我联系"
    如果给我发[邮件](mailto:<wangkewen821@gmail.com>)，或者通过右下角微信添加好友，请写上您的**真名实姓**。对于那些不知来路、上来就问问题的微信和邮件，我通常会**直接忽略**，谢谢。 

    ---  
    <center>[发送电子邮件 :fontawesome-solid-paper-plane:](mailto:<wcowin@qq.com>){.md-button}</center>

