---
title: 利用mkdocs部署静态网页至GitHubpages
tags:
  - Mkdocs
---

!!! info
    官方网站：[MkDocs](https://www.mkdocs.org/){target=“_blank”}

    我的个人网站成果：<http://wcowin.work/>{target=“_blank”}

## 一、准备工作

1.下载[Github Desktop](https://github.com/desktop/desktop){target=“_blank”}

 2.有一个GitHub账号​​​​​​​
***
## 二、Creating your site

参考教程： 

[网站制作 - Wcowin的个人网站](https://wcowin.work/mymkdocs/about/web/){target=“_blank”}

与其他教程不同，我首先建议先在Github创建一个名为你的名字+github.io的仓库
![img](https://cn.mcecy.com/image/20230324/51a12510e3b332b6ceea6827f40c1f2f.png)
![img](https://cn.mcecy.com/image/20230324/7f19bb393e39fb9add953ee19f9e2d91.png)  

然后打开github Desktop 克隆到本地
![img](https://cn.mcecy.com/image/20230324/ff3682428cc987cad79625951ef6d7bc.png)
![img](https://cn.mcecy.com/image/20230324/e896de95bd6fa737e7c6c3fa21c079fb.png)
![img](https://cn.mcecy.com/image/20230324/791834a5ac01c95ef174ab77d47c0f3a.png) 
![img](https://cn.mcecy.com/image/20230324/80430d0f8be7ea09368c3e63fe5a91ff.png)
打开Wcowin.github.io目录进入终端运行:
```
mkdocs new mkdocs-site
```
出现下图的几个文件 
![img](https://cn.mcecy.com/image/20230324/2f3f28cb5ee726ac154102de2ffb43da.png)

docs文件下是以后网站的内容，mkdocs.yml是配置文件（配置主题，目录，插件等）

 你在这个目录下写的任何东西都可以通过github Desktop 上传到github上

以VScode为例我们打开具体看看里面的东西

(建议先执行下面的代码添加一个GitHub Workflow)
``` 
$ mkdir .github
$ cd .github
$ mkdir workflows
$ cd workflows
$ vim PublishMySite.yml
```

在PublishMySite.yml里面输入以下内容
```
name: publish site
on: # 在什么时候触发工作流
  push: # 在从本地main分支被push到GitHub仓库时
    branches:
      - main
  pull_request: # 在main分支合并别人提的pr时
    branches:
      - main
jobs: # 工作流的具体内容
  deploy:
    runs-on: ubuntu-latest # 创建一个新的云端虚拟机 使用最新Ubuntu系统
    steps:
      - uses: actions/checkout@v2 # 先checkout到main分支
      - uses: actions/setup-python@v2 # 再安装Python3和相关环境
        with:
          python-version: 3.x
      - run: pip install mkdocs-material # 使用pip包管理工具安装mkdocs-material
      - run: mkdocs gh-deploy --force # 使用mkdocs-material部署gh-pages分支

```


目录树状图:
```
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── PublishMySite.yml
├── docs
│   └── index.md
└── mkdocs.yml
```
## 三、配置完善

打开**mkdocs.yml** 

 把以下的内容输入进去（最简单配置）
 ```
site_name: 网站名字
site_url: 
site_author: 你的名字
theme:
  name: material #主题
 ```
详细mkdocs.yml配置见[Changing the colors - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)

[下次](https://blog.csdn.net/m0_63203517/article/details/127444446?spm=1001.2014.3001.5502)我会具体谈谈这个问题
***
在下方终端运行可以在浏览器看到实时网站
```
mkdocs serve
```
![img](https://cn.mcecy.com/image/20230324/f11af9fb64a8418181bc3655a88d8635.png)
![img](https://cn.mcecy.com/image/20230324/c745b71840c17d639e1ea144bc8c5732.png)

这个网站就算是初步建好了

最后去github Desktop上传到github
![img](https://cn.mcecy.com/image/20230324/53ad3fdbe7d05668b99a46780930845a.png)

你的网站网址就是：​

```
https://你github的名字.github.io/
```
![img](https://cn.mcecy.com/image/20230324/51a12510e3b332b6ceea6827f40c1f2f.png)

下次谈谈网站的[mkdocs.yml具体配置](mkdocs2.md)

[^注]:于2023.3.24重写此文