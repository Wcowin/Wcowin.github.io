---
title: 网站添加Mkdocs博客
tags:
  - Mkdocs
---

# 网站添加Mkdocs博客

博客效果展示：[博客](../index.md)

官方文档：[Built-in blog plugin](https://squidfunk.github.io/mkdocs-material/plugins/blog/)

与所有内置插件一样，博客插件的入门非常简单。只需将以下行添加到mkdocs.yml

``` hl_lines="2"
plugins:
  - blog
```

**然后在/docs/blog/posts下写md文件即可**（无需再mkdocs.yml配置，如没有post文件，新建一个即可）
但是bolg文件夹下要有index.md文件(没有这个文件新建即可)！

在mkdocs.yml的nav部分这样写
```
nav:
  - 博客:
      - index: blog/index.md
```

元标签参考：
```
---
title:
authors: [Wcowin]  #作者
date: 2023-10-04   #时间
draft: true   # 是否为草稿
categories:  #分类
  - Hello
---
```


作者信息在docs/blog/.authors.yml里配置（没有.authors.yml新建即可）

```yml
authors:
  Wcowin:
    name: Wang Kewen    # Author name
    description: Free and casual # Author description
    avatar: https://s1.imagehub.cc/images/2024/02/02/91a767e93d1a344e44c69936464c583e.png          # Author avatar

```
结束
