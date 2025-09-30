---
title: 网页圆角化设计
hide:
  #  - navigation # 显示右
  #  - toc #显示左
  #  - footer
  #  - feedback
tags:
  - Mkdocs
comments: false
---

# 网页圆角化设计

## 示例
![iShot_2024-04-26_12.17.20.png](https://s2.loli.net/2024/04/26/gvu7ASWfU8eKVOd.png)
![image.png](https://s2.loli.net/2024/04/26/Czi9uAQhmbBlkfG.png)

## 如何设计
新建css文件，在mkdocs.yml引入css

```css
:root {
  --admonition-border-left-width: 0.2rem;
  --base-border-radius: 1rem;
  /* --card-hover-shadow: 0 0 0.2rem #ffffff40; */
}

/* 卡片圆角与悬浮阴影 */
.md-typeset .grid.cards > ul > li,
.md-typeset .md-button,
.md-typeset table:not([class]) {
  border-radius: var(--base-border-radius);
}
.md-typeset .grid.cards > ul > li:hover {
  box-shadow: var(--card-hover-shadow);
}

/* 页脚社交图标高度 */
.md-social__link svg {
  max-height: 1rem;
}

/* 搜索框及下拉结果圆角 */
.md-search__form {
  border-radius: var(--base-border-radius);
}

[data-md-toggle="search"]:checked ~ .md-header .md-search__form {
  border-top-right-radius: var(--base-border-radius);
  border-top-left-radius: var(--base-border-radius);
}

[dir="ltr"] .md-search__output {
  border-bottom-right-radius: var(--base-border-radius);
  border-bottom-left-radius: var(--base-border-radius);
}

/* 可选：如需恢复代码块、警告框等样式，取消注释即可 */
/*
.highlight span.filename {
  border-bottom: none;
  border-radius: var(--base-border-radius);
  display: inline;
  font-family: var(--md-code-font-family);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 5px;
  text-align: center;
}
.highlight span.filename + pre > code,
.md-typeset pre > code {
  border-radius: var(--base-border-radius);
  border-top-left-radius: 0;
}
.md-typeset .admonition {
  border-width: 0px;
  border-left-width: var(--admonition-border-left-width);
}
[dir="ltr"] .md-typeset blockquote {
  border-radius: 0.2rem;
  border-left-width: var(--admonition-border-left-width);
}
*/

/* 可选：博客相关样式，按需启用 */

/* .md-post--excerpt {
  background-color: rgba(68,138,255,.1);
  box-shadow: 0 0 0 1rem rgba(68,138,255,.1);
  border-radius: var(--base-border-radius);
}
.md-post--excerpt .md-post__header {
  justify-content: left;
}
.md-post--excerpt .md-post__content > h2,
.md-post__action {
  text-align: left;
} */


/* 让所有admonition（包括!!! tip）圆角化且更自然 */
.md-typeset .admonition,
.md-typeset details {
  border-radius: 1.5em;
  box-shadow: 0 2px 12px 0 rgba(60,60,60,0.07);
  transition: border-radius 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
  overflow: hidden;
}
```

## 图片圆角化

extra.css里引入：

```css
img.img1 {
border-radius: 25px;

}
```

在md文件里使用：

```markdown
![image.png](https://s2.loli.net/2024/04/26/Czi9uAQhmbBlkfG.png){.img1}
```
效果：
![image.png](https://s2.loli.net/2024/04/26/Czi9uAQhmbBlkfG.png){.img1}

## 圆角边框

[圆角边框如何实现](https://github.com/Wcowin/hexo-site-comments/discussions/15#discussioncomment-11927654){target="_blank"}
<div id="rcorners2" >
  <div id="rcorners1">
    <!-- <i class="fa fa-calendar" style="font-size:100"></i> -->
    <body>
      <font color="#4351AF">
        <p class="p1"></p>
<script defer>
    //格式：2020年04月12日 10:20:00 星期二
    function format(newDate) {
        var day = newDate.getDay();
        var y = newDate.getFullYear();
        var m =
            newDate.getMonth() + 1 < 10
                ? "0" + (newDate.getMonth() + 1)
                : newDate.getMonth() + 1;
        var d =
            newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        var h =
            newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
        var min =
            newDate.getMinutes() < 10
                ? "0" + newDate.getMinutes()
                : newDate.getMinutes();
        var s =
            newDate.getSeconds() < 10
                ? "0" + newDate.getSeconds()
                : newDate.getSeconds();
        var dict = {
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六",
            0: "天",
        };
        //var week=["日","一","二","三","四","五","六"]
        return (
            y +
            "年" +
            m +
            "月" +
            d +
            "日" +
            " " +
            h +
            ":" +
            min +
            ":" +
            s +
            " 星期" +
            dict[day]
        );
    }
    var timerId = setInterval(function () {
        var newDate = new Date();
        var p1 = document.querySelector(".p1");
        if (p1) {
            p1.textContent = format(newDate);
        }
    }, 1000);
</script>
      </font>
    </body>
  </div>
</div>

## 利用内置的grid cards

```markdown
<div class="grid cards" markdown>

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程__

    ---

    - [利用Mkdocs部署静态网页至GitHub pages](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs部署配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)
    - [如何给MKdocs添加友链](blog/websitebeauty/linktech.md)
    - [网站添加Mkdocs博客](blog/Mkdocs/mkdocsblog.md)
    - [Blogger](blog/index.md)
</div>

```

效果：
<div class="grid cards" markdown>

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程__

    ---

    示例文字

</div>


## 按钮

```
[Send Email :fontawesome-solid-paper-plane:](mailto:<wangkewen821@gmail.com>){.md-button}
```
效果：
[Send Email :fontawesome-solid-paper-plane:](mailto:<wangkewen821@gmail.com>){.md-button}