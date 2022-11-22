# Publish a Website with Material for MkDocs and GitHub Pages  
!!! Note
    For example:[Mkdocs静态网站制作](https://squidfunk.github.io/mkdocs-material/)   
    详细文档：[MkDocs](https://www.mkdocs.org/getting-started/)   

    CSDN教程：  
    1.[利用mkdocs部署静态网页至GitHub pages](https://blog.csdn.net/m0_63203517/article/details/127019819?spm=1001.2014.3001.5501)  
    2.[Mkdocs部署静态网页至GitHub pages配置说明](https://blog.csdn.net/m0_63203517/article/details/127444446?spm=1001.2014.3001.5501)
***

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