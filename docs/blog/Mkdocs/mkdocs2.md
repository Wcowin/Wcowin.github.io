---
title: Mkdocs部署静态网页至GitHub pages配置说明(mkdocs.yml)
comments: false
tags:
  - Mkdocs
---

官方文件：[Changing the colors - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)

**建议详细学习一下上面的官方网站↑↑↑**

我把我目前的配置文件mkdocs.yml代码写在下面👇🏻

??? note "点击展开"
    ```yaml
    #[Info]
    site_name: Wcowin's Web
    site_url: http://wcowin.work/
    site_author: 王科文(Wcowin)
    #[UI]
    theme:
      name: material
      custom_dir: docs/overrides
      # custom_dir: material/.overrides
      # font:
      #   text: Bitter
      #   code: Roboto Mono
      logo: https://cn.mcecy.com/image/20231006/a05f708fb7b0426e7a5786669d5b1386.png
        # material/library
        # admonition:
        #   <type>: material/file-alert-outline

      favicon: img/wkw2.png
      # img/11.ico
      palette:
        #primary: blue grey
        
        - media: "(prefers-color-scheme: light)"
          scheme: default # 日间模式
          primary: blue grey # 上方的
          accent: indigo # 链接等可交互元件的高亮色
          # teal 
          toggle:
            icon: material/toggle-switch # 图标
            name: 切换至夜间模式 # 鼠标悬浮提示
        - media: "(prefers-color-scheme: dark)"
          scheme: slate # 夜间模式
          primary: black 
          accent: indigo
          # teal
          toggle:
            icon: material/toggle-switch-off-outline
            name: 切换至日间模式
      features: 
        - announce.dismiss #呈现可标记为由用户读取的临时公告，可以包含一个用于取消当前公告的按钮
        # - navigation.instant 
        #- header.autohide  #自动隐藏
        - navigation.tracking #地址栏中的 URL 将自动更新为在目录中突出显示的活动锚点
        - navigation.tabs #顶级部分将呈现在上面视口标题下方的菜单层中，但在移动设备上保持原样
        # - navigation.tabs.sticky  #启用粘性选项卡后，导航选项卡将锁定在标题下方，并在向下滚动时始终保持可见
        - navigation.sections #启用部分后，顶级部分在边栏中呈现为1220px以上视口的组，但在移动设备上保持原样
        - navigation.top # 返回顶部的按钮 在上滑时出现
        - navigation.footer #页脚将呈现在边栏中，但在移动设备上保持原样
        - search.suggest # 搜索输入一些字母时推荐补全整个单词
        - search.highlight # 搜索出的文章关键词加入高亮
        - search.share #搜索分享按钮
        - navigation.expand # 打开Tab时左侧目录全部展开
        - navigation.indexes #启用节索引页后，可以将文档直接附加到节
        - content.tabs.link
        - content.tooltips
        - content.code.copy
        - content.action.edit
        - content.action.view
        - content.code.annotate 
      language: zh # 一些提示性的文字会变成中文
      

      icon:
        repo: fontawesome/brands/github #右上角图标
    edit_uri: edit/main/docs # 编辑按钮跳转的链接 
    repo_url: https://github.com/Wcowin/Wcowin.github.io # 右上角点击跳转的链接
    repo_name: Wcowin.github.io # 右上角的名字

    # [Navigtion]
    nav: #目录
      
    copyright: Copyright &copy; 2022~2023 Wcowin/All Rights Reserved. # 左下角的版权声明
      

    extra:
      # tags:
      #   HTML5: html
      #   JavaScript: js
      #   CSS: css
      alternate:
        - name: English
          link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=en&_x_tr_hl=zh-CN&_x_tr_pto=wapp 
          lang: en
        - name: 中国(台湾)
          link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=zh-TW&_x_tr_hl=zh-CN&_x_tr_pto=wapp
          lang: zh-TW
      generator: true  #删除页脚显示“使用 MkDocs 材料制造”
      social:
        - icon: fontawesome/brands/x-twitter 
          link: https://twitter.com/wcowin_
        - icon: fontawesome/brands/github
          link: https://github.com/Wcowin
        
        - icon: fontawesome/regular/envelope
          link: mailto:<wangkewen821@gmail.com> #联系方式
        - icon: fontawesome/brands/bilibili
          link: https://space.bilibili.com/1407028951?spm_id_from=333.1007.0.0
      analytics: 
        provider: google
        property: G-29HZMNR0KG
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
      
      # consent:
      #   title: Cookie consent
      #   description: >- 
      #     我们也使用cookies来识别您的重复访问和偏好来衡量我们文档的有效性以及用户是否找到他们要找的东西。
      #     如果你同意,你可以帮助我们让我们的网站更好

        

    plugins:
      # - glightbox
      - search
      - git-revision-date-localized:
          type: iso_date
          enable_creation_date: false
          exclude:
            - index.md 
            - waline.md
      # - git-authors:
      #     exclude:
      #       - index.md
      - blog:
          post_date_format: full #时间
          draft: true
          draft_if_future_date: true #自动将具有未来日期的帖子标记为草稿
          post_readtime: true
          post_readtime_words_per_minute: 265  #计算帖子的阅读时间时读者每分钟预计阅读的字数
          post_url_format: "{date}/{slug}"
          categories_slugify: !!python/object/apply:pymdownx.slugs.slugify
            kwds:
              case: lower
          # categories_toc: true
          # pagination_per_page: 5
          pagination_url_format: "page/{page}"
          authors_file: "{blog}/.authors.yml"  #作者信息
      - tags:
          tags_file: tag.md  #分类标签

    markdown_extensions:
      - abbr
      - attr_list
      - admonition
      - def_list
      - footnotes
      - md_in_html
      - meta # 支持Markdown文件上方自定义标题标签等
      - pymdownx.caret
      - pymdownx.betterem
      - pymdownx.critic
      - pymdownx.details
      - pymdownx.inlinehilite
      - pymdownx.keys
      - pymdownx.mark
      - pymdownx.snippets
      - pymdownx.smartsymbols
      - pymdownx.tilde
      - pymdownx.superfences:
          custom_fences:
            - name: mermaid
              class: mermaid
              format: !!python/name:pymdownx.superfences.fence_code_format # 代码块高亮插件
      - pymdownx.arithmatex:  # latex支持
          generic: true
      - toc:
          permalink: true # 固定标题位置为当前位置
      - pymdownx.highlight: # 代码块高亮
          anchor_linenums: true
          linenums: true # 显示行号
          # auto_title: true # 显示编程语言名称
      - pymdownx.emoji:
          emoji_index: !!python/name:material.extensions.emoji.twemoji
          emoji_generator: !!python/name:material.extensions.emoji.to_svg
      - pymdownx.tabbed:
          alternate_style: true
      - pymdownx.tasklist:
          custom_checkbox: true
      - markdown.extensions.toc:
          slugify: !!python/object/apply:pymdownx.slugs.slugify {kwds: {case: lower}}
          permalink: "\ue157"
      
    extra_javascript:
      - javascripts/extra.js 
      # - https://cdn.jsdelivr.net/gh/Wcowin/Wcowin.github.io@main/docs/javascripts/extra.js  # extra的cdn
      - javascripts/mathjax.js
      - https://polyfill.io/v3/polyfill.min.js?features=es6
      - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
      # - javascripts/mathjax-config.js
      # - https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML

      - https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.min.js
      - ckplayer/js/ckplayer.js
      # - https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js
      # - javascripts/backbound1.js
      # - javascripts/rellax.min.js
      - https://cdn.jsdelivr.net/npm/mermaid@10.0.2/dist/add-html-label-6e56ed67.min.js
      # - https://res.zvo.cn/translate/translate.js  # Translate

    extra_css:
      - stylesheets/extra.css
      - stylesheets/link.css
      # - https://cdn.jsdelivr.net/gh/Wcowin/Wcowin.github.io@main/docs/stylesheets/extra.css # extra.css的CDN
      # - stylesheets/extra1.css
      # - stylesheets/video.css
      # - https://unpkg.com/@waline/client@v2/dist/waline.css
      - https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.css #评论
      - ckplayer/css/ckplayer.css
      - https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css
      # - https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css
      - https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css  #字体
    ```
***
从头开始分析 

## 开头
```yaml
site_name: 网站名字
site_url: 网站网址
site_author: 作者名字
```
**无须多言**

## theme部分  

### 顶部颜色
```yaml
theme:
  palette:
    primary: yellow #顶部颜色
```
primary后面是网站顶部栏目的颜色（也用于标题、边栏、文本链接和其他几个组件）  
目前支持下面几个颜色：
![img](https://s1.imagehub.cc/images/2024/02/02/c7eb8b52d0b17c8e5321cbd21d9710a0.png)

### 明暗主题按钮
![img](https://s1.imagehub.cc/images/2024/02/02/9efed1213b8512fad00679bcab80f3e2.png)

```yaml
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
![img](https://s1.imagehub.cc/images/2024/02/02/3fbb40519a69d5c5600c49ee83987802.png)

***
### features
```yaml
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
![png](https://s1.imagehub.cc/images/2024/02/02/2f7149a07d26e17934e626b7915cc74a.png)
![png](https://s1.imagehub.cc/images/2024/02/02/0e5f75464543f1c9785f54a1b7271e47.png)
![img](https://s1.imagehub.cc/images/2024/02/02/95d1df12503d37cb74c967a6cb9a2f96.png)
![img](https://s1.imagehub.cc/images/2024/02/02/0d19f89ece3fca54db038ff7d9644d61.png)
## nav部分 
这一部分就是目录
![img](https://s1.imagehub.cc/images/2024/02/02/02da4022bd8af67b670e4da0dffbe95f.png)

```yaml
nav: 
  - 博客:
    - 好用/好玩网站分享: blog/Webplay.md  #.md文件的相对路径
  - 开发: 
    - Markdown: develop/markdown.md
```
依照上面的模版为例，你可以在顶部栏目建立博客和开发两个大标签
```
- 内容标题: 文件路径
```
内容标题效果：
![img](https://s1.imagehub.cc/images/2024/02/02/ab0212029567b7a6cd3fb4089de888cf.png)

.md文件路径(相对路径)：
![img](https://s1.imagehub.cc/images/2024/02/02/0361e9d863ccb15e83006feac1b12c0a.png)  

可能看起比较复杂，总结一下就是：我想写一篇文章在docs/blog下写一篇名为`Wcowin最帅`的文章，首先在docs/blog下新建一个`xxx.md`文件，里面写写东西，再去mkdocs.yml里找到nav，这样写：
```yaml
nav: 
  - 博客:
    - Wcowin最帅: blog/xxx.md  #.md文件的相对路径
```  
nav才是最终决定这篇文章位置的配置，docs下的md文件只是存放功能  

***
这里也注意：**所有文件都在docs文件下，文件类型除CSS，Javascript,yml等都是.md结尾的文件**

所以强烈推荐您去学习Markdown、Html5、CSS3、Javascript等知识，这样您就可以自定义您的网站了。

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
│   └──blog
│       └──xxx.md
│
└── mkdocs.yml
```
***
## extra部分
```yaml
extra:
  # tags:
  #   HTML5: html
  #   JavaScript: js
  #   CSS: css
  alternate:
    - name: English
      link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=en&_x_tr_hl=zh-CN&_x_tr_pto=wapp 
      lang: en
    - name: 中国(台湾)
      link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=zh-TW&_x_tr_hl=zh-CN&_x_tr_pto=wapp
      lang: zh-TW
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
### alternate  

可以设置网页翻译 
```yaml
  alternate:
    - name: English
      link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=en&_x_tr_hl=zh-CN&_x_tr_pto=wapp 
      lang: en
    - name: 中国(台湾)
      link: https://wcowin-work.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=zh-TW&_x_tr_hl=zh-CN&_x_tr_pto=wapp
      lang: zh-TW
```
### generator 
设置为`generator: false`可以删除页脚显示“使用 MkDocs 材料制造”     
### social  
可设置网站右下角的社交链接（icon是小图标，link后填自己链接即可）： 
![img](https://s1.imagehub.cc/images/2024/02/02/73179baf6402e27c92afc51eb59645a6.png)


### cookie consent
```yaml
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
![img](https://s1.imagehub.cc/images/2024/02/02/a303166e7a67a2bc7bddde77c3d1277a.png)  

![img](https://s1.imagehub.cc/images/2024/02/02/79d1f726b8105e0657cea3e2cef628ce.png)
注意property: G-XXXXXXXXXX  #你的Google Analytics ID，这里的G-XXXXXXXXXX是你的Google Analytics ID，你可以在Google Analytics中找到，如果你不想使用Google Analytics，可以删除这一部分。

## Plugins部分
```yaml
plugins:
  # - glightbox
  - search
  - offline
  - git-revision-date-localized:
      type: iso_date
      enable_creation_date: false
      exclude:
        - index.md 
        - tag.md
        - waline.md
        - blog/posts/update.md
        - blog/posts/wkw.md
        - about/link.md
  # - git-authors:
  #     exclude:
  #       - index.md
  - blog:
      post_date_format: full #时间
      draft: true
      draft_if_future_date: true #自动将具有未来日期的帖子标记为草稿
      post_readtime: true
      post_readtime_words_per_minute: 265  #计算帖子的阅读时间时读者每分钟预计阅读的字数
      post_url_format: "{date}/{slug}"
      # categories_slugify: !!python/object/apply:pymdownx.slugs.slugify
      #   kwds:
      #     case: lower
      # categories_toc: true
      # pagination_per_page: 5
      pagination_url_format: "page/{page}"
      authors_file: "{blog}/.authors.yml"  #作者信息
  - tags:
      tags_file: tag.md  #分类标签
```

`- search`开启搜索功能
![img](https://s1.imagehub.cc/images/2024/02/02/0e5f75464543f1c9785f54a1b7271e47.png)  

`-blog` 即博客，可以在docs/blog/posts里直接写md文件（不需要在nav里写路径）,然后在上述nav里写
```
nav:
  - Blog:
    - blog/index.md
```   
博客效果：   
![](https://s1.imagehub.cc/images/2024/02/02/cee8d935a920668b738593850c7eb7f8.png)  
详细配置可以去看[添加Mkdocs博客](mkdocsblog.md)

`- tags`就是标签
```yaml
plugins:
  - tags:
      tags_file: tag.md  #分类标签
```
![img](https://s1.imagehub.cc/images/2024/02/02/d20f0562838a8396724f18bfd09e19e8.png)

docs文件夹下新建tags.md文件，会自动在tags.md文件中生成标签列表  
![](https://s1.imagehub.cc/images/2024/02/02/d9fa43225a6dd3932c36038c605954a4.png)

但是每个.md文件(你写的markdown文件)最开始的地方(称为meta)都需要添加标签，否则不会显示在tags.md文件中
![img](https://s1.imagehub.cc/images/2024/02/02/2732b6ccefefb44d93b34f5108b3d050.png)

meta格式：

```yaml
---
title: #文章标题
tags:
  - 你的标签名字
hide:
  #- navigation # 显示右侧导航
  #- toc #显示左侧导航
comments: false  #评论，默认不开启
---

```

***
## markdown_extensions部分
```yaml
markdown_extensions:
  - abbr
  - attr_list
  - admonition
  - def_list
  - footnotes
  - md_in_html
  - meta # 支持Markdown文件上方自定义标题标签等
  - pymdownx.caret
  - pymdownx.betterem
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.mark
  - pymdownx.snippets
  - pymdownx.smartsymbols
  - pymdownx.tilde
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format # 代码块高亮插件
  - pymdownx.arithmatex:  # latex支持
      generic: true
  - toc:
      permalink: true # 固定标题位置为当前位置
  - pymdownx.highlight: # 代码块高亮
      anchor_linenums: true
      linenums: true # 显示行号
      # auto_title: true # 显示编程语言名称
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - markdown.extensions.toc:
      slugify: !!python/object/apply:pymdownx.slugs.slugify {kwds: {case: lower}}
      permalink: "\ue157"
```
这部分是对markdown语法的扩展，注释里也有简述 ，**建议直接复制粘贴**

***
## extra_javascript 和extra_css
```yaml
extra_javascript:
  - javascripts/extra.js  #自定义javascript
  - javascripts/mathjax.js  #Latex支持
  - https://polyfill.io/v3/polyfill.min.js?features=es6   #Latex支持
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js   #Latex支持
  - ckplayer/js/ckplayer.js #播放器配置
  - https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.min.js  #gitalk支持
  - https://cdn.jsdelivr.net/npm/mermaid@10.0.2/dist/add-html-label-6e56ed67.min.js #忘了

extra_css:
  - stylesheets/extra.css # 自定义CSS
  - stylesheets/link.css  #友链配置
  # - stylesheets/video.css #播放器可选配置
  - https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.css #gitalk支持
  - ckplayer/css/ckplayer.css   #播放器配置
  - https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css  # font-awesome表情支持
  # - https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css  #分享支持

  - https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css  #字体
  # - https://cdn.jsdelivr.net/npm/lxgw-wenkai-lite-webfont@1.1.0/style.css #字体
  # - https://cdn.jsdelivr.net/npm/lxgw-wenkai-tc-webfont@1.0.0/style.css  #字体
  # - https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.1.0/style.css  #字体
```
javascripts/mathjax.js里有对数学公式的扩展，extra_css里是CSS的知识了，及自定义网站格式颜色等  

如果你想自定义网站的样式，可以看这几篇文章：  

[JS实现鼠标样式](../websitebeauty/shubiao.md)   

[背景特效](../websitebeauty/backgroud.md)  

[自定义网站字体](../websitebeauty/mkdocsfont.md)  

[添加友链](linktech.md)

[添加评论系统](../websitebeauty/mkcomments.md)  

[为MKdocs添加文章修订时间戳](../websitebeauty/time.md)
