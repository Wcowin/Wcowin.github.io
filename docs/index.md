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
    - [x] 如遇页面卡顿，请使用{--科学上网--}
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
  width: 100%;
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

<!-- <link rel="stylesheet" href=" https://cdn.jsdelivr.net/npm/@docsearch/css@3 "/></pre></li>
<script src=" https://cdn.jsdelivr.net/npm/@docsearch/js@3 "></script>
 <script type="text/javascript">
 docsearch({
 appId: "HPAF2GI0JK",
 apiKey: "98e3ce22d1357833c38b7b581ca07219",
 indexName: "wcowin",
 container: '#docsearch'
 debug: false
 });
 </script>
 <div id="docsearch"></div> -->



