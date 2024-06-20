---
title: 利用Mkdocs部署静态网页至GitHubpages
tags:
  - Mkdocs
---

!!! info
    Material for MkDocs官方网站：[MkDocs](https://www.mkdocs.org/)

---
推荐看下这个视频：  
:fontawesome-brands-youtube:{ style="color: #EE0F0F" }
__[How to set up Material for MkDocs]__ by @james-willett – :octicons-clock-24:
15m – Learn how to create and host a documentation site using Material for
MkDocs on GitHub Pages in a step-by-step guide.

  [How to set up Material for MkDocs]: https://www.youtube.com/watch?v=Q-YA_dA8C20

---

## 一、准备工作

1.下载[Github Desktop](https://github.com/desktop/desktop){target=“_blank”}

 2.有一个GitHub账号​​​​​​​(有手就行)
***
## 二、Creating your site

参考教程： 

[利用mkdocs部署静态网页至GitHubpages（更新版）](https://blog.csdn.net/m0_63203517/article/details/129755527?spm=1001.2014.3001.5501){target=“_blank”}

与其他教程不同，我首先建议先在Github创建一个名为你的名字+github.io的仓库
![img](https://s1.imagehub.cc/images/2024/02/02/5074a3e2b7284355e0f777fd9e621ee3.png)

![img](https://s1.imagehub.cc/images/2024/02/02/5c39f0c9754f067759497361524d2b95.png)  

然后打开github Desktop 克隆到本地
![img](https://s1.imagehub.cc/images/2024/02/02/5c06d33549ea0c4a1357697acc6f8f5d.png)

![img](https://s1.imagehub.cc/images/2024/02/02/f862b16316fa4ad0f727a0f656cc5cf1.png)

![img](https://s1.imagehub.cc/images/2024/02/02/6483c0b9ee144e0c1e035dccf3339991.png) 


打开Wcowin.github.io目录进入终端依次运行:
```
pip install mkdocs-material
mkdocs new mkdocs-site
```
出现下图的几个文件 
![img](https://s1.imagehub.cc/images/2024/02/02/140869d445e8c6dfd026e71e3ff0fc09.png)

docs文件下是以后网站的内容，mkdocs.yml是配置文件（配置主题，目录，插件等）

 你在这个目录下写的任何东西都可以通过github Desktop 上传到github上

执行下面的代码添加一个GitHub Workflow
***  
???note "过时的PublishMySite.yml"
    (执行下面的代码添加一个GitHub Workflow(**已经过时但是仍然能用，最新方法见下方ci.yml**)

    ``` 
    mkdir .github
    cd .github
    mkdir workflows
    cd workflows
    vim PublishMySite.yml
    ```

    在PublishMySite.yml里面输入以下内容

    ```yaml
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
    )
***  

``` 
mkdir .github
cd .github
mkdir workflows
cd workflows
vim ci.yml
```  

.github/workflows/ci.yml，然后复制并粘贴以下内容：  
```yaml
name: ci 
on:
  push:
    branches:
      - master 
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV 
      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install mkdocs-material 
      - run: mkdocs gh-deploy --force
```

目录树状图:
```
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── ci.yml
├── docs
│   └── index.md
└── mkdocs.yml
```


!!!重点来了
仓库setings/Actions/General  勾选这两项
![](https://s1.imagehub.cc/images/2024/02/02/02fd4e77eb52d4ce18c227f0e29b2c6d.png)

## 三、配置完善
打开终端运行  

`pip install mkdocs-material`

打开**mkdocs.yml** 

 把以下的内容输入进去（最简单最基础的配置）  

```yaml
site_name: 网站名字
site_url: 网站链接
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
![img](https://s1.imagehub.cc/images/2024/02/02/b4a5ac989f1f390573a85bad8c80f49b.png)
![img](https://s1.imagehub.cc/images/2024/02/02/38bbc1fad9016ebfa0d894f093b82e3d.png)

这个网站就算是初步建好了

最后去github Desktop上传到github
![img](https://s1.imagehub.cc/images/2024/02/02/3a15b16d3947825f3f469b4eafedd5ef.png)

**！！！重点**  
**去仓库的setings/pages选择下图示意的路径**
![](https://s1.imagehub.cc/images/2024/02/02/64a25964ef4e99e4b580084daec10662.png)  

等待一会网址就出来了[^注]  

你的网站网址就是：​

```
https://你github的名字.github.io/
因为我绑定了域名所以网址是：https://wcowin.work/
```
![img](https://s1.imagehub.cc/images/2024/02/02/7f149d6da7ecc6364d86c9517b2c4624.png)

下次谈谈网站的[mkdocs.yml具体配置](mkdocs2.md)

[^注]:于2023.3.24重写此文