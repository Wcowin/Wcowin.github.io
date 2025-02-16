---
title: 网站添加Mkdocs博客
tags:
  - Mkdocs
---

博客效果展示：[博客](../index.md)  

官方文档：[Built-in blog plugin](https://squidfunk.github.io/mkdocs-material/plugins/blog/)

与所有内置插件一样，博客插件的入门非常简单。只需将以下行添加到mkdocs.yml

```
plugins:
  - blog
```

**然后在/docs/blog/posts下写md文件即可**（无需再mkdocs.yml配置，如没有post文件，新建一个即可）
但是bolg文件夹下要有index.md文件(没有这个文件新建即可)！

在mkdocs.yml中这样写
```
  - Blogger:
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
    avatar: https://s2.loli.net/2024/02/01/gaE47y5fKM6kosV.png         # Author avatar

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

结束