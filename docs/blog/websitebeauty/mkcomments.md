---
title: 为网站添加评论系统
comments: true
tags:
  - Mkdocs
---

# 添加评论系统(giscus为例)
官方文档： [Adding a comment system](https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/)

这里我同样推荐[giscus](https://giscus.app/zh-CN)


利用 GitHub Discussions 实现的评论系统，让访客借助 GitHub 在你的网站上留下评论和反应吧！本项目深受 utterances 的启发。

* 开源。🌏
* 无跟踪，无广告，永久免费。📡 🚫
* 无需数据库。所有数据均储存在 GitHub Discussions 中。:octocat:
* 支持自定义主题！🌗
* 支持多种语言。🌐
* 高可配置性。🔧
* 自动从 GitHub 拉取新评论与编辑。🔃
* 可自建服务！🤳

言归正传

## 第一步
mkdocs.yml中添加custom_dir
``` hl_lines="3"
theme:
  name: material
  custom_dir: docs/overrides  #主要是这一行
```
参考下图新建overrides文件，在此文件下参考下图新建覆盖html文件
树状结构如下:
``` hl_lines="9-13"
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── ci.yml
├── docs
│   └── index.md
│   └──overrides
│       └──assets
│       └──main.html
│       └──partials
│          └──comments.html
│
└── mkdocs.yml
```

![img](https://s1.imagehub.cc/images/2024/02/02/214447b92070792905259a843de3e233.png)

在comments.html中先复制粘贴下面的代码，后文会说怎么修改

```html hl_lines="4-18"
{% if page.meta.comments %}
  <h2 id="__comments">{{ lang.t("meta.comments") }}</h2>
  <!-- Insert generated snippet here -->
  <script src="https://giscus.app/client.js"
  data-repo="你的仓库名称（如Wcowin/hexo-site-comments）"
  data-repo-id=" "
  data-category=" "
  data-category-id=" "
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="zh-CN"
  crossorigin="anonymous"
  async>
</script>
  <!-- Synchronize Giscus theme with palette -->
  <script>
    var giscus = document.querySelector("script[src*=giscus]")

    // Set palette on initial load
    var palette = __md_get("__palette")
    if (palette && typeof palette.color === "object") {
      var theme = palette.color.scheme === "slate"
        ? "transparent_dark"
        : "light"

      // Instruct Giscus to set theme
      giscus.setAttribute("data-theme", theme)
    }

    // Register event handlers after documented loaded
    document.addEventListener("DOMContentLoaded", function() {
      var ref = document.querySelector("[data-md-component=palette]")
      ref.addEventListener("change", function() {
        var palette = __md_get("__palette")
        if (palette && typeof palette.color === "object") {
          var theme = palette.color.scheme === "slate"
            ? "transparent_dark"
            : "light"

          // Instruct Giscus to change theme
          var frame = document.querySelector(".giscus-frame")
          frame.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
          )
        }
      })
    })
  </script>
{% endif %}
```
## 第二步
打开<https://giscus.app/zh-CN>  走完这个页面的流程就会得到(这会在你的Github创建新的仓库，建议自己先去新建个 Discussions)
![](https://s1.imagehub.cc/images/2024/02/02/b0fabd6a0c967d5a846c087adea5b680.png)

![](https://s1.imagehub.cc/images/2024/02/02/d0c7b4e08a714b5c2b60421f58159c62.png)

```html
<script src="https://giscus.app/client.js"
        data-repo="[在此输入仓库]"
        data-repo-id="[在此输入仓库 ID]"
        data-category="[在此输入分类名]"
        data-category-id="[在此输入分类 ID]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```

复制此代码，替换最上面👆🏻comments.html中高亮的代码

终端里`mkdocs server`一下

## 最后
在你想插入评论的地方的元数据：`comments: true `

``` hl_lines="8"
---
title: 留言板
hide:
  #  - navigation # 显示右
  #  - toc #显示左
  #  - footer
  #  - feedback
comments: true  #默认不开启评论
---
```
## 效果

完美!快速相应

<figure markdown >
  ![](https://s1.imagehub.cc/images/2024/02/02/0619f922f930e7649fb40405c7e49339.png)
  <figcaption>这是图片↑↑↑</figcaption>
</figure>

## 其他评论系统

把想要内嵌的评论代码放在相应页面即可
比如[twikoo](https://twikoo.js.org/)
去看它的官方配置文档很简单就配置好了

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous" />
  <script defer="" src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
  <script defer="" src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"></script>

 </head>
<body>
  <div id="tcomment"></div>
  <script src="https://cdn.staticfile.org/twikoo/1.6.21/twikoo.all.min.js"></script>
  <script>
twikoo.init({
  envId: 'https://superb-salamander-e730b6.netlify.app/.netlify/functions/twikoo', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  el: '#tcomment', // 容器元素
   //region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
  // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
   //lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
   onCommentLoaded: function () {
    console.log('评论加载完成');
  }
})
</script>
```



我感觉twikoo也好看！
