---
title: 2024网站更新记录
authors: [Wcowin]
date: 2024-01-01
categories:
  - 网站更新记录
readtime: 2
---
## </p><h1 id="01" name="01"><strong>2024-10-21</strong></h1><p>
* 优化网站流畅度（玄学）
* 倒计时 60 天

## </p><h1 id="01" name="01"><strong>2024-09-24</strong></h1><p>
* 优化网站流畅度（玄学）
* 秋天到了～

## </p><h1 id="01" name="01"><strong>2024-09-08</strong></h1><p>
* 优化网站流畅度（玄学）
* 久违的更新，优化了网页UI的各个小细节

## </p><h1 id="01" name="01"><strong>2024-08-20</strong></h1><p>
* 优化网站流畅度（玄学）
* 内心丰盈者，独行也独众，心有山海，静而不争

## </p><h1 id="01" name="01"><strong>2024-07-28</strong></h1><p>
* 优化网站流畅度（玄学）
* 引入新的字体 CDN，取消 Google analysis
* 连雨不知春去，一晴方觉夏深

## </p><h1 id="01" name="01"><strong>2024-07-21</strong></h1><p>
* 优化网站流畅度（玄学）
* 学业繁重

## </p><h1 id="01" name="01"><strong>2024-06-27</strong></h1><p>
* 优化网站流畅度（玄学）
* 美化了Blog页面, 使更加简洁美观,如你所见
* 内心丰盈者，独行也独众，心有山海，静而不争


## </p><h1 id="01" name="01"><strong>2024-06-20</strong></h1><p>
* 优化网站流畅度（玄学）
* 优化多处UI
* 删减了部分拖慢网站速度的JS/CSS代码
* 更新了[MKdocs补充系列教程](https://blog.csdn.net/m0_63203517/article/details/139814216?spm=1001.2014.3001.5501)
* 近期略有时间，所以更文变得高产


## </p><h1 id="01" name="01"><strong>2024-06-19</strong></h1><p>
* 优化网站流畅度（玄学）
* 期末结束
* 删减了冗余代码

## </p><h1 id="01" name="01"><strong>2024-06-2</strong></h1><p>
* 优化网站流畅度（玄学）
* 近期学业繁重

## </p><h1 id="01" name="01"><strong>2024-06-2</strong></h1><p>
* 优化网站流畅度（玄学）
* 过了六一
* [甜甜圈代码🍩](../technique%20sharing/ttq.md)

## </p><h1 id="01" name="01"><strong>2024-05-15</strong></h1><p>
* 优化网站流畅度（玄学）
* 全站引入自动在新标签页打开，仓库地址：[mkdocs-open-in-new-tab](https://newtab.kubaandrysek.cz/)
<details><summary>Show source code</summary>
<p>

Look at this source <a href="https://github.com/JakubAndrysek/mkdocs-open-in-new-tab/blob/main/open_in_new_tab/js/open_in_new_tab.js">open_in_new_tab.js</a>:

```js
// Description: Open external links in a new tab and PDF links in a new tab
// Source: https://jekyllcodex.org/without-plugin/new-window-fix/

//open external links in a new window
function external_new_window() {
    for(let c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) {
        let b = c[a];
        if(b.getAttribute("href") && b.hostname !== location.hostname) {
            b.target = "_blank";
            b.rel = "noopener";
        }
    }
}
//open PDF links in a new window
function pdf_new_window ()
{
    if (!document.getElementsByTagName) {
      return false;
    }
    let links = document.getElementsByTagName("a");
    for (let eleLink=0; eleLink < links.length; eleLink ++) {
    if ((links[eleLink].href.indexOf('.pdf') !== -1)||(links[eleLink].href.indexOf('.doc') !== -1)||(links[eleLink].href.indexOf('.docx') !== -1)) {
        links[eleLink].onclick =
        function() {
            window.open(this.href);
            return false;
        }
    }
    }
}

function apply_rules() {
    external_new_window();
    pdf_new_window();
}

if (typeof document$ !== "undefined") {
    // compatibility with mkdocs-material's instant loading feature
    // based on code from https://github.com/timvink/mkdocs-charts-plugin
    // Copyright (c) 2021 Tim Vink - MIT License
    // fixes [Issue #2](https://github.com/JakubAndrysek/mkdocs-open-in-new-tab/issues/2)
    document$.subscribe(function() {
        apply_rules();
        console.log("Applying rules");
    })
}
```
</p>
</details>


## </p><h1 id="01" name="01"><strong>2024-05-05</strong></h1><p>
* 发布[Mkdocs-Wcowin主题|3.0版本](https://github.com/Wcowin/Mkdocs-Wcowin/releases/tag/3.0){target=“_blank”}！！！
* 优化网站流畅度（玄学）
* 和小王一起吃了好吃的
* 感谢王鹏老哥的打赏

## </p><h1 id="01" name="01"><strong>2024-04-22</strong></h1><p>
* 优化网站流畅度（玄学）
* 看了更多的猫咪
* 优化布局
* 新增[圆角化设计教程](../websitebeauty/yuanjiaohua.md)

## </p><h1 id="01" name="01"><strong>2024-04-22</strong></h1><p>
* 优化网站流畅度（玄学）
* 网站全面贴合圆角设计，非常好看

## </p><h1 id="01" name="01"><strong>2024-04-12</strong></h1><p>
* 优化网站流畅度（玄学）
* 重写主页index.md,更加美观，贴合圆角设计

## </p><h1 id="01" name="01"><strong>2024-04-12</strong></h1><p>
* 优化网站流畅度（玄学）
* 感谢W1ndys提出的[使用软编码配置友链界面](https://github.com/Wcowin/Mkdocs-Wcowin/pull/9)，使得友链添加更加规范化
* 引入网页翻译实验性功能(详见右上角翻译按钮)

## </p><h1 id="01" name="01"><strong>2024-04-06</strong></h1><p>
* 优化网站流畅度（玄学）
* 主页引入天气组件，搜索框/按钮圆角化
* 删除冗余JS/CSS文件
* 感谢[Anshul Raj Verma](https://arv-anshul.github.io/)在[Discussions#7](https://github.com/Wcowin/Wcowin.github.io/discussions/7)上提出的网站优化建议

## </p><h1 id="01" name="01"><strong>2024-04-02</strong></h1><p>
* 优化网站流畅度（玄学）
* 在mkdocs.yml的plugins模块中引入`!ENV [CI, false]`语句，极大缩短`mkdocs serve`静态预览时间（3-5s）
* 本Mkdocs-Wcowin主题案例：
    - [Lenny's Web](https://lennychen.top) 
 

## </p><h1 id="01" name="01"><strong>2024-03-14</strong></h1><p>
* 优化网站流畅度（玄学）
* 3月14日（March 14th）是公历一年中的第73天（闰年第74天），离全年的结束还有292天。是国际圆周率日。其中历史上发生的大事件有阿尔伯特·爱因斯坦的出生。 [10]卡尔·马克思、斯蒂芬·威廉·霍金的逝世。

## </p><h1 id="01" name="01"><strong>2024-02-20</strong></h1><p>
* 优化页脚“本站访问量和萌ICP备20230640号”显示方式
* 优化网站流畅度（玄学）

## </p><h1 id="01" name="01"><strong>2024-02-02</strong></h1><p>
* 网站图片全部迁移至[smms](https://smms.app/)(更加稳定流畅)
* 着手改写MKdocs教程，使得条理更加清晰
* 优化网站流畅度（玄学）
* 删除大量繁琐无用代码

## </p><h1 id="01" name="01"><strong>2024-02-01</strong></h1><p>
* 改进网页代码显示效果
* 优化网站流畅度（玄学）

## </p><h1 id="01" name="01"><strong>2024-01-30</strong></h1><p>
* 友链数量达到16位
* 修复了一些bugs
* 本网站已经被百度/谷歌收录（确信，使用百度/谷歌搜索Wcowin字样即可）
* 优化网站流畅度（玄学）

## </p><h1 id="01" name="01"><strong>2024-01-05</strong></h1><p>
* 优化网站流畅度（玄学）
* 引入[git-revision-date-localized-plugin](https://timvink.github.io/mkdocs-git-revision-date-localized-plugin/)插件，以便记录文档创建和最后一次修改时间
* 和小王一起看了更多的猫咪  

