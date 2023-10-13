---
title: 网站添加Mkdocs博客
tags:
  - Mkdocs
---

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

结束
![](https://cn.mcecy.com/image/20231013/40be72b51647571e312a9420f704d539.png)