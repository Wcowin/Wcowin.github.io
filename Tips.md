---
title:  标题
# 隐藏的模块
hide:
  #  - navigation # 隐藏左边导航
  #  - toc #隐藏右边导航
  #  - footer #隐藏翻页
  #  - feedback  #隐藏反馈
tags:
  - 
comments: false  #评论，默认不开启
---
//启动虚拟环境（需要安装Anaconda）
conda activate Mkdocs

```git
git init  // 初始化本地仓库
git config --global user.name "myname"  // 配置用户名
git config --global user.email "myname@mymail.com"  //配置邮箱
git remote add origin code@github.git  //绑定本地和远程仓库 
git pull   // 拉取远程仓库的变化来同步本地的状态
git add  // 确认本地仓库的变化到本地缓存区
git commit  // 确认本地缓存区的内容，可以准备push
git push   // 提交本地仓库到远程仓库
git status   // 确定本地缓存区的状态
```  


//安装mkdocs
pip install mkdocs-material


//更新mkdocs
pip install --upgrade --force-reinstall mkdocs-material

//完成编辑后，您可以使用以下命令从 Markdown 文件构建静态站点：
mkdocs build --clean

//静态预览MKdocs
mkdocs serve

//新标签打开
{target=“_blank”}

示例：[Wcowin's web](https://wcowin.work/){target="_blank"}