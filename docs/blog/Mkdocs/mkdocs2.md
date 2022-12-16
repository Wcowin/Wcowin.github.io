---
title: Mkdocs部署静态网页至GitHub pages配置说明(mkdocs.yml)
comments: false
tags:
  - Mkdocs
---

官方文件：[Changing the colors - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)

**建议详细学习一下上面的官方网站↑↑↑**

我把我目前的配置文件mkdocs.yml代码写在下面👇🏻
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
    - 科学上网: blog/kexue.md
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
  
#cookie 
  # analytics: 
  #   provider: google
  #   property: !ENV GOOGLE_ANALYTICS_KEY
  #   feedback:
  #     title: Was this page helpful?
  #     ratings:
  #       - icon: material/heart
  #         name: This page was helpful
  #         data: 1
  #         note: >-
  #           Thanks for your feedback!
  #       - icon: material/heart-broken
  #         name: This page could be improved
  #         data: 0
  #         note: >- 
  #           Thanks for your feedback! Help us improve this page by
  #           using our <a href="..." target="_blank" rel="noopener">feedback form</a>.
  # consent:
  #   title: Cookie consent
  #   description: >- 
  #     我们也使用cookies来识别您的重复访问和偏好来衡量我们文档的有效性以及用户是否找到他们要找的东西。
  #     如果你同意,你可以帮助我们让我们的网站更好~
    #描述
      
plugins:
  - search
  - tags  #标签
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
无须多言

## theme部分  

### 颜色：
![img](https://img-blog.csdnimg.cn/d38c49581de5454885b59fe05c9c109a.png)
```
theme:
  palette:
    primary: yellow #顶部颜色
```
primary后面是网站顶部栏目的颜色（也用于标题、边栏、文本链接和其他几个组件），目前支持下面几个颜色：
![img](https://img-blog.csdnimg.cn/44dca59b059f4706be9ab58dc0fdbdc2.png)

### 明暗主题按钮：
![img](https://img-blog.csdnimg.cn/ded49a961da840a1bf59e64880aff976.png)
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
![img](https://img-blog.csdnimg.cn/6ab32b739d674c4e997b0288261d0f6c.png)
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
![img](https://img-blog.csdnimg.cn/065f25b084df41178d51384c41be46b8.png)
![img](https://img-blog.csdnimg.cn/9c567bb22e1541c5abc0aebff8356780.png)
![img](https://img-blog.csdnimg.cn/db3ecf2275034cda8d56e9886c2bcd5c.png)
***
## nav部分 
这一部分就是目录
![img](https://img-blog.csdnimg.cn/b5b0770277204c80b060cda4c8f24a67.png)
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
![img](https://img-blog.csdnimg.cn/219a6717013a4fb59049dac5f6094c64.png)

文件路径：
![img](https://img-blog.csdnimg.cn/bb272f24af6c463a94a75b377bb8c87f.png)
***
这里也注意：所有文件都在docs文件下，文件类型除Css，javascript等都是.md结尾的文件

所以强烈推荐去学习Maekdown和Html5

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
![img](https://img-blog.csdnimg.cn/7ee80a82d0724706a011669c9eca6597.png)
cookie部分先不考虑
***
## Plugins部分
```
plugins:
  - search
  - tags  #标签
```
`- search开启搜索功能：`
![img](https://img-blog.csdnimg.cn/065f25b084df41178d51384c41be46b8.png)

`- tags就是标签`
```
plugins:
  - tags:
      tags_file: tags.md
```
```
plugins:
  - tags:
      tags_extra_files:
        compatibility.md:
          - compat 
        web.md:
          - html
          - js
          - css
```
![img](https://img-blog.csdnimg.cn/img_convert/0b1b5515d36c83821a9106dfc5e618b5.png)
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
extra_javascript里有对数学公式的扩展，extra_css里是Css的知识了，及自定义网站格式颜色等

