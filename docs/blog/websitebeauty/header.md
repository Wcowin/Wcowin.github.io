---
title: 添加顶部公告栏
# 隐藏的模块
hide:
  #  - navigation # 隐藏左边导航
  #  - toc #隐藏右边导航
  #  - footer #隐藏翻页
  #  - feedback  #隐藏反馈
tags:
  - Mkdocs
comments: false  #评论，默认不开启
---
![image.png](https://s2.loli.net/2024/02/02/mvCEgeP4lANuXI8.png)

docs/overrides下新建main.html ，针对main.html文件    
树状结构如下:  
```
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── PublishMySite.yml
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

```html
{#-
    This file was automatically generated - do not edit
  -#}
  {% extends "base.html" %}
  {% block extrahead %}
    <link rel="stylesheet" href="{{ 'assets/stylesheets/custom.00c04c01.min.css' | url }}">
  {% endblock %}
  {% block announce %}
     Follow <strong>@Wcowin</strong> on
    <a rel="me" href="https://space.bilibili.com/1407028951?spm_id_from=333.1007.0.0">
      <span class="twemoji bilibili">
        {% include ".icons/fontawesome/brands/bilibili.svg" %}
      </span>
      <strong>Bilibili</strong>
    </a>
    and
    <a href="https://twitter.com/Wcowin_">
      <span class="twemoji twitter">
        {% include ".icons/fontawesome/brands/twitter.svg" %}
      </span>
      <strong>Twitter</strong>
    </a>
  {% endblock %}
  {% block scripts %}
    {{ super() }}
    <script src="{{ 'assets/javascripts/custom.9458f965.min.js' | url }}"></script>
  {% endblock %}
```


自行修改即可
