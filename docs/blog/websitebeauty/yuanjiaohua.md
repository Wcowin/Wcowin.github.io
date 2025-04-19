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

## 示例  
![iShot_2024-04-26_12.17.20.png](https://s2.loli.net/2024/04/26/gvu7ASWfU8eKVOd.png)  
![image.png](https://s2.loli.net/2024/04/26/Czi9uAQhmbBlkfG.png)

## 如何设计
新建css文件，在mkdocs.yml引入css  

```css
:root {
  --admonition-border-left-width: 0.2rem;
  --base-border-radius: 0.5rem;
}

/* Change font family of filename present on top of code block. */
/* .highlight span.filename {
  border-bottom: none;
  border-radius: var(--base-border-radius);
  display: inline;
  font-family: var(--md-code-font-family);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 5px;
  text-align: center;
}
.highlight span.filename + pre > code {
  border-radius: var(--base-border-radius);
  border-top-left-radius: 0;
}
.md-typeset pre > code {
  border-radius: var(--base-border-radius);
} */

/* Customize admonition layout */
/* .md-typeset .admonition {
  border-width: 0px;
  border-left-width: var(--admonition-border-left-width);
}

[dir="ltr"] .md-typeset blockquote {
  border-radius: 0.2rem;
  border-left-width: var(--admonition-border-left-width);
} */

/* Grid Cards */
.md-typeset .grid.cards > ul > li {
  border-radius: var(--base-border-radius);
}
.md-typeset .grid.cards > ul > li:hover {
  box-shadow: 0 0 0.2rem #ffffff40;
}

/* Markdown Button */
.md-typeset .md-button {
  border-radius: var(--base-border-radius);
}

/* Footer: Social Links */
.md-social__link svg {
  max-height: 1rem;
}


/* Forms */
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

/* Blog - index.md */
/* div.md-content header {
  display: none;
}

.md-post--excerpt {
  background-color: var(--md-accent-fg-color--transparent);
  box-shadow: 0 0 0 1rem var(--md-accent-fg-color--transparent);
  border-radius: var(--base-border-radius);
}

.md-post--excerpt .md-post__header {
  justify-content: center;
}

.md-post--excerpt .md-post__content > h2,
.md-post__action {
  text-align: center;
} */

/* Table */
.md-typeset table:not([class]) {
  border-radius: var(--base-border-radius);
}





.carousel {
  width: 60%;
  height: 100%;

  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;

  /* 居中 */
  margin-left: auto;
  margin-right: auto;

  border: 0.075rem solid #7b7b7b7a;
  box-shadow: var(--md-shadow-z1);
}

.carousel-container {
  width: 100%;
  height: 100%;

  position: relative;
  left: 0;

  display: flex;

  /* 过渡动画 1s */
  transition: all 1s;
}

.carousel-hover {
  height: 100%;
  width: 10%;
  position: absolute;
  top: 0;

  /* 子元素垂直居中 */
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.carousel-hover.left {
  left: 0;
}
.carousel-hover.right {
  right: 0;
}

.carousel-hover button {
  background-color: var(--md-accent-fg-color);
  border-radius: 50%;

  cursor: pointer;

  opacity: 0;
  transition: opacity 0.3s;
}
.carousel-hover button::after {
  display: block;
  height: 1.5rem;
  width: 1.5rem;

  background-color: white;
  content: "";
  mask-position: center;
  -webkit-mask-position: center;
}
.carousel-hover.left button::after {
  mask-image: var(--md-tabbed-icon--prev);
  -webkit-mask-image: var(--md-tabbed-icon--prev);
}
.carousel-hover.right button::after {
  mask-image: var(--md-tabbed-icon--next);
  -webkit-mask-image: var(--md-tabbed-icon--next);
}

/* hover 外层 */
.carousel-hover:hover button {
  opacity: 0.5;
  transition: opacity 0.3s;
}
/* hover 内层 */
.carousel-hover button:hover {
  opacity: 0.8;
  transition: opacity 0.3s;
}

.carousel-container a {
  width: 100%;
  height: 100%;

  flex-shrink: 0;
}

.carousel-container img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  display: block;
}

.carousel-bottom {
  position: absolute;
  /* 宽度等同于内容宽度 */
  width: 100%;
  padding: 20px;

  bottom: 0;

  display: flex;
  justify-content: center;
  /* 指示器间距 */
  gap: 10px;

  opacity: 0;
  transition: opacity 0.3s;
}
.carousel-bottom:hover {
  opacity: 0.8;
  transition: opacity 0.3s;
}

.carousel-bottom .indicator {
  height: 5px;
  width: 20px;

  background-color: var(--md-accent-fg-color);

  opacity: 0.5;
  cursor: pointer;
}

.carousel:hover .bottom .indicator {
  opacity: 1;
}
.carousel:hover .shift .btn {
  opacity: 1;
}

@media screen and (max-width: 600px) {
  .carousel {
      width: 100%;
  }

  .carousel-hover button {
      opacity: 1;
  }
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