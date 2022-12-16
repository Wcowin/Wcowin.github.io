---
title: 利用mkdocs部署静态网页至GitHubpages
tags:
  - Mkdocs
---

!!! info
    官方网站：[MkDocs](https://www.mkdocs.org/)

    我的个人网站成果：<http://wcowin.work/>

## 一、准备工作

1.下载[Github Desktop](https://github.com/desktop/desktop)

 2.有一个GitHub账号​​​​​​​
***
## 二、Creating your site

参考教程： 

[网站制作 - Wcowin的个人网站](https://wcowin.work/mymkdocs/about/web/)

与以往教程不同，我首先建议先在Github创建一个名为你的名字+github.io的仓库
![img](https://img-blog.csdnimg.cn/540f2e9973e14bb1b77dc2be29f641a6.png)
![img](https://img-blog.csdnimg.cn/84c92a4d64544f30818543c85dc92605.png)  

然后打开github Desktop 克隆到本地
![img](https://img-blog.csdnimg.cn/172f6975b2184f159897af00ecd75dee.png)
![img](https://img-blog.csdnimg.cn/ff29a0a668984af2ab9d990be75b43e2.png)
![img](https://img-blog.csdnimg.cn/0bc90dc7f25646d6a718c282c04bc231.png)  

打开Wcowin.github.io目录进入终端运行:
```
mkdocs new mkdocs-site
```
出现下图的几个文件 
![img](https://img-blog.csdnimg.cn/3fe2d89ea2ee48209eac36f9d6c10476.png)  

docs文件下是以后网站的内容，mkdocs.yml是配置文件（配置主题，目录，插件等）

 你在这个目录下写的任何东西都可以通过github Desktop 上传到github上

以VScode为例我们打开具体看看里面的东西

(建议先执行下面的代码添加一个GitHub Workflow)
``` 
1.$ mkdir .github
2.$ cd .github
3.$ mkdir workflows
4.$ cd workflows
5.$ vim PublishMySite.yml
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
![img](https://img-blog.csdnimg.cn/6fdac044cf294a228245c77d6953ca4e.png)
![img](https://img-blog.csdnimg.cn/72f7218e24fa4d45925453a3fb0a9153.png)

这个网站就算是初步建好了

最后去github Desktop上传到github
![img](https://img-blog.csdnimg.cn/51375318e774423ba53e4b42122e6e93.png)
你的网站网址就是：​
```
https://你github的名字.github.io/
```
![img](https://img-blog.csdnimg.cn/4da2acf327514bd487a4627c7bad2930.png)

下次谈谈网站的具体配置