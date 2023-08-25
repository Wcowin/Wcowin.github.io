---
title: Mkdocs部署静态网页至GitHub pages配置说明(mkdocs.yml)
comments: false
tags:
  - Mkdocs
---

官方文件：[Changing the colors - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)

**建议详细学习一下上面的官方网站↑↑↑**

我把我目前的部分配置文件mkdocs.yml代码写在下面👇🏻
```
#[Info]
site_name: #网站名字
site_url: #网站地址
site_author: #作者名
#[UI]
theme:
  name: material
  palette:
    #primary: blue grey
  
    - scheme: default # 日间模式
      primary: grey # 上方的
      accent: cyan # 链接等可交互元件的高亮色
      toggle:
        icon: material/weather-night # 图标
        name: 切换至夜间模式 # 鼠标悬浮提示
    - scheme: slate # 夜间模式
      primary: black 
      accent: cyan
      toggle:
        icon: material/weather-sunny
        name: 切换至日间模式
  features: 
    - navigation.instant #- header.autohide  #自动隐藏
    #- announce.dismiss #呈现可标记为由用户读取的临时公告，可以包含一个用于取消当前公告的按钮
    - navigation.tracking #地址栏中的 URL 将自动更新为在目录中突出显示的活动锚点
    - navigation.tabs #顶级部分将呈现在上面视口标题下方的菜单层中，但在移动设备上保持原样
    #- navigation.tabs.sticky  #启用粘性选项卡后，导航选项卡将锁定在标题下方，并在向下滚动时始终保持可见
    #- navigation.sections #启用部分后，顶级部分在边栏中呈现为1220px以上视口的组，但在移动设备上保持原样
    - navigation.top # 返回顶部的按钮 在上滑时出现
    - search.suggest # 搜索输入一些字母时推荐补全整个单词
    - search.highlight # 搜索出的文章关键词加入高亮
    - navigation.expand # 打开Tab时左侧目录全部展开
    #- navigation.indexes #启用节索引页后，可以将文档直接附加到节
    - search.share #搜索分享按钮
  language: zh # 一些提示性的文字会变成中文
  
 
  icon: 
    repo: fontawesome/brands/github #右上角图标
edit_uri: edit/main/docs # 编辑按钮跳转的链接 
repo_url: https://github.com/Wcowin/mymkdocs # 右上角点击跳转的链接
repo_name: Wcowin.github.io # 右上角的名字
 
# [Navigtion]
nav: 
  - 博客:
    - 好用/好玩网站分享: blog/Webplay.md
    - What is Github: blog/Github.md
    - 解决谷歌翻译用不了的问题: blog/googletranslate.md
    - Mac/windows软件网站汇总: blog/macsoft.md
    - win11资源分享: blog/win.md
    - Telegram 群组、频道、机器人 - 汇总分享: blog/TG.md
    - Python:
        - 将Python文件.py打包成.exe可执行程序: blog/py/python.md
        - pip: blog/py/pip.md
    - C语言: blog/c.md
    - kexueshangwang: blog/kexue.md
  - 开发: 
    - Markdown: develop/markdown.md
    - MWeb Pro: develop/MWeb.md
    - 大厂们的良心软件～: develop/fenxiang.md
    - 写给所有 Mac 用户的摸鱼指北: develop/Mac.md
  - 闲话:
    - 原神: relax/game.md
    - 诗文:
      - 滕王阁序: relax/shiwen/twgx.md
      - 望江南·超然台作: relax/shiwen/sjcnh.md
      - 击鼓: relax/shiwen/jg.md
      - 雨霖铃·秋别: relax/shiwen/yll.md
  - 旅行: 
    - 家乡: trip/LH.md
    - 重庆: trip/travel.md
  - 关于:
    - 个人履历: about/geren.md
    - 网站制作: about/web.md
 
 
  
  
copyright: Copyright &copy; 2022王科文 # 左下角的版权声明
  
 
extra:
  generator: false  #删除页脚显示“使用 MkDocs 材料制造”
  social:
    - icon: fontawesome/brands/twitter 
      link: https://twitter.com/wcowin_
    - icon: fontawesome/brands/github
      link: https://github.com/Wcowin
    - icon: fontawesome/brands/bilibili
      link: https://space.bilibili.com/1407028951?spm_id_from=333.1007.0.0
    - icon: fontawesome/solid/paper-plane
      link: mailto:<1135801806@qq.com> #联系方式
  
  analytics: 
    provider: google
    property: G-XXXXXXXXXX # Google Analytics ID
    feedback:
      title: 此页面有帮助吗？
      ratings:
        - icon: material/thumb-up-outline
          name: This page was helpful
          data: 1
          note: >-
            谢谢你的反馈！
        - icon: material/thumb-down-outline
          name: This page could be improved
          data: 0
          note: >- 
            Thanks for your feedback! Help us improve this page by
            using our <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener">feedback form</a>.
  
  consent:
    title: Cookie consent
    description: >- 
      我们也使用cookies来识别您的重复访问和偏好来衡量我们文档的有效性以及用户是否找到他们要找的东西。
      如果你同意,你可以帮助我们让我们的网站更好

      
plugins:
  - search
  - tags:
      tags_file: tag.md #标签


markdown_extensions:
  - abbr
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
  - md_in_html
  - pymdownx.arithmatex:  # latex支持
      generic: true
  - toc:
      permalink: true # 固定标题位置为当前位置
  - pymdownx.highlight: # 代码块高亮
      anchor_linenums: true
      # linenums: true # 显示行号
      # auto_title: true # 显示编程语言名称
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
  - pymdownx.superfences # 代码块高亮插件
  - meta # 支持Markdown文件上方自定义标题标签等
     
extra_javascript:
  - javascripts/extra.js
  - javascripts/mathjax.js
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
extra_css:
  - stylesheets/extra.css
 
 
```
***
从头开始分析 

## 开头
```
site_name: 网站名字
site_url: 网站网址
site_author: 作者名字
```
**无须多言**

## theme部分  

### 颜色
![img](https://cn.mcecy.com/image/20230324/0d60c4d1cc6399c654c78769a402ad56.png)
```
theme:
  palette:
    primary: yellow #顶部颜色
```
primary后面是网站顶部栏目的颜色（也用于标题、边栏、文本链接和其他几个组件），目前支持下面几个颜色：
![img](https://cn.mcecy.com/image/20230324/84d4a4194cc575c2a76e6e54b25fbf99.png)

### 明暗主题按钮
![img](https://cn.mcecy.com/image/20230324/8654dc52f8c278bbf29eb94a8ffcb2da.png)
```
theme:
  palette: 
 
    # Palette toggle for light mode
    - scheme: default
      toggle:
        icon: material/brightness-7 
        name: Switch to dark mode
 
    # Palette toggle for dark mode
    - scheme: slate
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
```
此配置将在搜索栏旁边呈现调色板切换。请注意，您还可以为每个调色板的primary和accent定义单独的设置。

按钮图标可以改变（修改icon后面的代码）：
![img](https://cn.mcecy.com/image/20230324/9356854051a25e1801c2dcd58002e5fe.png)

***
### features
```
features:
    - navigation.instant   #- header.autohide  #自动隐藏
    #- announce.dismiss   #呈现可标记为由用户读取的临时公告，可以包含一个用于取消当前公告的按钮
    - navigation.tracking   #地址栏中的 URL 将自动更新为在目录中突出显示的活动锚点
    - navigation.tabs   #顶级部分将呈现在上面视口标题下方的菜单层中，但在移动设备上保持原样
    #- navigation.tabs.sticky    #启用粘性选项卡后，导航选项卡将锁定在标题下方，并在向下滚动时始终保持可见
    #- navigation.sections   #启用部分后，顶级部分在边栏中呈现为1220px以上视口的组，但在移动设备上保持原样
    - navigation.top   # 返回顶部的按钮 在上滑时出现
    - search.suggest   # 搜索输入一些字母时推荐补全整个单词
    - search.highlight   # 搜索出的文章关键词加入高亮
    - navigation.expand   # 打开Tab时左侧目录全部展开
    #- navigation.indexes   #启用节索引页后，可以将文档直接附加到节
    - search.share   #搜索分享按钮
```
看我所做的注释就很好理解，feature部分让网站拥有了目录，增加了搜索项目的功能，返回顶部等功能，注释里很简明介绍了
![img](https://cn.mcecy.com/image/20230324/a6912df2c1b809f4c636025bfb753244.png)
![img](https://cn.mcecy.com/image/20230324/70275057aeaaa055581cdb760ab0932a.png)
![img](https://cn.mcecy.com/image/20230324/718b3202db2a1259600a0b821e5ec58c.png)
![img](https://cn.mcecy.com/image/20230324/10f79326e800d429a00fc544ef8f02d7.png)
***
## nav部分 
这一部分就是目录
![img](https://cn.mcecy.com/image/20230324/00e36febde9aa1ffac1f5c49fbf2e76b.png)
```
nav: 
  - 博客:
    - 好用/好玩网站分享: blog/Webplay.md  #.md文件的相对路径
  - 开发: 
    - Markdown: develop/markdown.md
```
依照上面的模版为例，你可以建立博客和开发两个大标签，里面的内容：
```
- 内容标题: 文件路径
```
内容标题效果：
![img](https://cn.mcecy.com/image/20230324/f58c55d9b7c4a7eba69b55395f4476d3.png)

.md文件路径(相对路径)：
![img](https://cn.mcecy.com/image/20230324/2bcb22df954bda4dbe773ad096a039c6.png)
***
这里也注意：**所有文件都在docs文件下，文件类型除CSS，Javascript等都是.md结尾的文件**

所以强烈推荐去学习Maekdown、Html5、CSS3、Javascript等知识，这样你就可以自定义你的网站了。

到这里先检查一下文件树状图(xx.md代表你的md文件)：

```
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── PublishMySite.yml
├── docs
│   └── index.md
|   |___ xx.md
|
└── mkdocs.yml
```
***
## extra部分
```
extra:
  generator: false  #删除页脚显示“使用 MkDocs 材料制造”
  social:
    - icon: fontawesome/brands/twitter 
      link: https://twitter.com/wcowin_
    - icon: fontawesome/brands/github
      link: https://github.com/Wcowin
    - icon: fontawesome/brands/bilibili
      link: https://space.bilibili.com/1407028951?spm_id_from=333.1007.0.0
    - icon: fontawesome/solid/paper-plane
      link: mailto:<1135801806@qq.com> #联系方式
```
social部分可设置网站右下角的社交链接（icon是小图标，link后填自己链接即可）：
![img](https://cn.mcecy.com/image/20230324/551cc1e17058617a8b5787bf6b1ba19a.png)

cookie
```
analytics: 
    provider: google
    property: G-XXXXXXXXXX  #你的Google Analytics ID
    feedback:
      title: 此页面有帮助吗？
      ratings:
        - icon: material/thumb-up-outline
          name: This page was helpful
          data: 1
          note: >-
            谢谢你的反馈！
        - icon: material/thumb-down-outline
          name: This page could be improved
          data: 0
          note: >- 
            Thanks for your feedback! Help us improve this page by
            using our <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener">feedback form</a>.
  
  consent:
    title: Cookie consent
    description: >- 
      我们也使用cookies来识别您的重复访问和偏好来衡量我们文档的有效性以及用户是否找到他们要找的东西。
      如果你同意,你可以帮助我们让我们的网站更好

```
![img](https://cn.mcecy.com/image/20230324/06ffc854ffcae2a4c760a4e32d59d8b9.png)  
![img](https://cn.mcecy.com/image/20230324/0148782cbe4fe9421afceff0cb57d62e.png)
![img](https://cn.mcecy.com/image/20230324/7c5415720953dbd9018e5d1f011c7678.png)
注意property: G-XXXXXXXXXX  #你的Google Analytics ID，这里的G-XXXXXXXXXX是你的Google Analytics ID，你可以在Google Analytics中找到，如果你不想使用Google Analytics，可以删除这一部分。

## Plugins部分
```
plugins:
  - search
  - tags  #标签
```

`- search`开启搜索功能
![img](https://cn.mcecy.com/image/20230324/a6912df2c1b809f4c636025bfb753244.png)

`- tags`就是标签
```
plugins:
  - tags:
      tags_file: tags.md
```
![img](https://cn.mcecy.com/image/20230324/92fd3f17055fca8fc76f21b5fab5f76a.png)
docs文件夹下新建tags.md文件，会自动在tags.md文件中生成标签列表
但是每个.md文件最开始的地方都需要添加标签，否则不会显示在tags.md文件中
![img](https://cn.mcecy.com/image/20230324/7f0a3213cad72aa11f2185c7cae9a032.png)
格式：

```
---
title: 
tags:
  - 你的标签名字
hide:
  #- navigation # 显示右侧导航
  #- toc #显示左侧导航
---

```

***
## markdown_extensions部分
```
markdown_extensions:
  - abbr
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
  - md_in_html
  - pymdownx.arithmatex:  # latex支持
      generic: true
  - toc:
      permalink: true # 固定标题位置为当前位置
  - pymdownx.highlight: # 代码块高亮
      anchor_linenums: true
      # linenums: true # 显示行号
      # auto_title: true # 显示编程语言名称
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
  - pymdownx.superfences # 代码块高亮插件
  - meta # 支持Markdown文件上方自定义标题标签等
```
这部分是对markdown语法的扩展，注释里也有简述 ，建议直接复制粘贴
***
## extra_javascript 和extra_css
```
extra_javascript:
  - javascripts/extra.js
  - javascripts/mathjax.js
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
extra_css:
  - stylesheets/extra.css
```
javascripts/mathjax.js里有对数学公式的扩展，extra_css里是CSS的知识了，及自定义网站格式颜色等  

如果你想自定义网站的样式，可以看这几篇文章：  

[JS实现鼠标样式](../websitebeauty/shubiao.md)   

[背景特效](../websitebeauty/backgroud.md)  

[自定义网站字体](../websitebeauty/mkdocsfont.md)

