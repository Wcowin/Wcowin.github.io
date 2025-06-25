---
# title: 欢迎来到我的博客
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
}
</style>


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2327435979273742"
     crossorigin="anonymous"></script>

<!-- <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script> -->
<!-- <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-2327435979273742">
</amp-auto-ads> -->

<body>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2327435979273742"
     crossorigin="anonymous"></script>
<!-- AD1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2327435979273742"
     data-ad-slot="3702206121"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</body>
<!-- [timeline(./docs/timeline/timeindex.json)] -->