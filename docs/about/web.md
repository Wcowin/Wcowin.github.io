---
tags:
  - Mkdocs
---  


# 发布一个包含MkDocs和GitHub页面材料的网站

<div style="text-align: center;">
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <title>Material for MkDocs</title>
    <path d="m17.029 18.772.777 1.166-5.417 2.709L0 16.451V4.063l5.417-2.709 5.298 7.948 7.867-5.24L24 1.354V16.84l-5.417 2.709zm2.023-13.827v13.253l3.949-1.975V2.97zM5.076 2.642 1.458 4.45 12.73 21.358l3.618-1.809z"/>
  </svg>
</div>

???+Note "Tip"
    Mkdocs material主题 :[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/){target=“_blank”}  
    Mkdocs-Wcowin主题: [Mkdocs-Wcowin主题](https://wcowin.work/Mkdocs-Wcowin/)     
    详细文档：[MkDocs](https://www.mkdocs.org/getting-started/){target=“_blank”}   

## 我在CSDN上写的Mkdocs教程 

1.[利用mkdocs部署静态网页至GitHub pages](https://blog.csdn.net/m0_63203517/article/details/127019819?spm=1001.2014.3001.5501){target=“_blank”}  
2.[Mkdocs部署静态网页至GitHub pages配置说明](https://blog.csdn.net/m0_63203517/article/details/127444446?spm=1001.2014.3001.5501){target=“_blank”}  
3.[如何在Mkdocs里自定义字体（霞鹜文楷）](https://blog.csdn.net/m0_63203517/article/details/131946304?spm=1001.2014.3001.5502){target=“_blank”}


***

建议下载Github Desktop然后克隆到本地仓库，这样以后pull和push的同步也会方便（个人见解：可能需要科学上网不然速度很慢） 操作详见：[这个视频](https://www.bilibili.com/video/BV194411s7Bq/?spm_id_from=333.880.my_history.page.click&vd_source=4c6908c51297ba49ec55863b71e0d24f)

也可以学习一下git：<https://www.runoob.com/git/git-tutorial.html>{target=“_blank”}
***
这是一个记录[十年之约](https://www.foreverblog.cn/){target=“_blank”}的网站，所以，这个网站会存在十年或者更久:  
<a href="https://www.foreverblog.cn/" target="_blank" > <img src="https://img.foreverblog.cn/logo_en_default.png" alt="" style="width:auto;height:16px;"> </a>
## 实现自定义域名访问

[实现自定义域名访问](https://blog.csdn.net/Passerby_Wang/article/details/121202486?spm=1001.2014.3001.5501){target=“_blank”}


***

[萌国ICP备案查询](https://icp.gov.moe/)  
我的备案号：  
<a href="https://icp.gov.moe/?keyword=20230640" target="_blank">萌ICP备20230640号</a>   
哈哈可爱而已，并不是国家备案

<p align="center">
  <a href="https://github.com/squidfunk/mkdocs-material/actions"><img
    src="https://github.com/squidfunk/mkdocs-material/workflows/build/badge.svg?branch=master"
    alt="Build"
  /></a>
  <a href="https://pypistats.org/packages/mkdocs-material"><img
    src="https://img.shields.io/pypi/dm/mkdocs-material.svg" 
    alt="Downloads"
  /></a>
  <a href="https://gitter.im/squidfunk/mkdocs-material"><img 
    src="https://badges.gitter.im/squidfunk/mkdocs-material.svg" 
    alt="Chat on Gitter"
  /></a>
  <a href="https://pypi.org/project/mkdocs-material"><img 
    src="https://img.shields.io/pypi/v/mkdocs-material.svg" 
    alt="Python Package Index"
  /></a>
  <a href="https://hub.docker.com/r/squidfunk/mkdocs-material/"><img 
    src="https://img.shields.io/docker/pulls/squidfunk/mkdocs-material" 
    alt="Docker Pulls"
  /></a>
</p>
## Web 创建设计

<h2>用户是浏览者</h2>
一个典型的访问者将无法读取您的网页的全部内容！  
无论您在网页中发布了多么有用的信息，一个访问者在决定是否继续阅读之前仅仅会花几秒钟的时间进行浏览。  
请确保使你的观点，在页面的第一句！另外，您还需要在整个页面中使用简短的段落以及有趣的标题。  
<hr>
<h2>少即是多</h2>
<p>保持章节尽可能短。</p>
<p>冗长文字的页面不利于用户体验。</p>
<p>如果你的网页内容很多，您将页面信息分解成小的模块，并放置在不同的页面！</p>

<hr>
<h2>导航</h2>
<p>在您网站的所有页面使用一致的导航结构。</p>
<p>不要在文本段落内使用超链，超链接会把访问者带到别的页面，这样做会破坏导航结构一致性。</p>
<p>如果您必须使用超链接，你可以将链接添加到一个段落的底部或菜单中。</p>
<hr>
<h2>加载速度</h2>
<p>有时开发人员不知道一些网页需要很长的时间来加载。</p>
<p>据统计，大多数用户会留在加载时间不超过7秒的网页。</p>
<p>测试您的网页在一个低速的调制解调器中打开。如果您的网页需要很长时间加载，可以考虑删除图片或多媒体等内容。</p>
<hr>
<h2>用户反馈</h2>
<p>反馈是一件非常好的事情！ </p>
<p>你的访问者是你的"客户"。通常他们会给你的网站提供很好的改善建议。</p>
<p>如果您提供良好的反馈途径，您将得到来自很多来自不同领域人的反馈意见。</p>
<hr>
<h2>访问者的显示器</h2>
<p>在互联网上不是每个人的显示器尺寸都是一样的。</p>
<p>如果你设计一个网站，是用高分辨率的显示器上显示，当分辨率低的显示器（如800 × 600）访问你的网页时就可能会出现问题。</p>

<p>请在不同的显示器上测试您的网站。</p>

<p> 查看我们的显示器了解显示器的发展趋势。</p>

<hr>
<h2>他们使用什么浏览器？</h2>

<p>请在不同的浏览器测试你的网站。</p>

<p>目前最流行的浏览器有：Internet Explorer，Firefox和Google Chrome。</p>

<p>设计网页时，一个明智的做法是使用正确的HTML。正确的编码将帮助浏览器正确显示您的网页。</p>

<p>访问我们的浏览器统计信息了解浏览器的发展趋势。</p>

<hr>
<h2>客户端使用的插件</h2>
<p>声音，视频剪辑，或其他多媒体内容可能需要使用单独的程序（插件）来播放。</p>
<p>请确保您的访问者能在你的网页上正常使用他们所需要的软件。</p>
<hr>