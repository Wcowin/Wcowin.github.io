---
tags:
  - Mkdocs
---
# Publish a Website with Material for MkDocs and GitHub Pages  
!!! Note
    For example:[Mkdocs静态网站制作](https://squidfunk.github.io/mkdocs-material/)   
    详细文档：[MkDocs](https://www.mkdocs.org/getting-started/)   

    CSDN教程：  
    1.[利用mkdocs部署静态网页至GitHub pages](https://blog.csdn.net/m0_63203517/article/details/127019819?spm=1001.2014.3001.5501)  
    2.[Mkdocs部署静态网页至GitHub pages配置说明](https://blog.csdn.net/m0_63203517/article/details/127444446?spm=1001.2014.3001.5501)
***
MkDocs 的材料是 MkDocs 的主题，MkDocs 是一个面向（技术）项目文档的静态站点生成器。如果你熟悉 Python，你可以使用pip（Python 包管理器）安装 Material for MkDocs。如果没有，我们建议使用docker。  
创建一个文件  
```
$ mkdocs new mkdocs-site
INFO     -  Creating project directory: mkdocs-site
INFO     -  Writing config file: mkdocs-site/mkdocs.yml
INFO     -  Writing initial docs: mkdocs-site/docs/index.md
$ cd mkdocs-site
```
目录结构
```
$ tree -a
.
├── docs
│   └── index.md
└── mkdocs.yml
```

## Add GitHub Workflow

```
$ mkdir .github
$ cd .github
$ mkdir workflows
$ cd workflows
$ vim PublishMySite.yml
```


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

## Git and GitHub

### git init

```
$ git init
$ git add .
$ git commit -m "init"
```

### GitHub - New Repository

GitHub > New Repository

GitHub > Repository > Settings > Actions > General > 

- Actions permissions: Allow all actions and reusable workflows
- Workflow permissions: Read and write permissions
- Click Save

```
$ git remote add origin git@github.com:Yang-Xijie/mkdocs-site.git # change to your github repo
$ git branch -M main
$ git push -u origin main
```

GitHub > Repository > Settings > Pages > Source > gh-pages > Click Save



建议下载Github Desktop然后克隆到本地仓库，这样以后pull和push的同步也会方便（个人见解：可能需要科学上网不然速度很慢） 操作详见：[这个视频](https://www.bilibili.com/video/BV194411s7Bq/?spm_id_from=333.880.my_history.page.click&vd_source=4c6908c51297ba49ec55863b71e0d24f)

也可以学习一下git：<https://www.runoob.com/git/git-tutorial.html>

## 实现自定义域名访问

[实现自定义域名访问](https://blog.csdn.net/Passerby_Wang/article/details/121202486?spm=1001.2014.3001.5501)


***
点击[这里](#top)跳转到开头  

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> </p>

<p align="center">
  <a href="https://github.com/squidfunk/mkdocs-material/actions"><img
    src="https://github.com/squidfunk/mkdocs-material/workflows/build/badge.svg?branch=master"
    alt="Build"
  /></a>
  <a href="https://pypistats.org/packages/mkdocs-material"><img
    src="https://img.shields.io/pypi/dm/mkdocs-material.svg" 
    alt="Downloads"
  /></a>
  <a href="https://gitter.im/squidfunk/mkdocs-material"><img 
    src="https://badges.gitter.im/squidfunk/mkdocs-material.svg" 
    alt="Chat on Gitter"
  /></a>
  <a href="https://pypi.org/project/mkdocs-material"><img 
    src="https://img.shields.io/pypi/v/mkdocs-material.svg" 
    alt="Python Package Index"
  /></a>
  <a href="https://hub.docker.com/r/squidfunk/mkdocs-material/"><img 
    src="https://img.shields.io/docker/pulls/squidfunk/mkdocs-material" 
    alt="Docker Pulls"
  /></a>
</p>


