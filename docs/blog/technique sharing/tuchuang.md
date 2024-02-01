---
title: 搭建个人图床
tags:
  - 技术分享
hide:
---

!!!tip
    图片加载不出来挂梯子即可

## 一、Github+cloudflare图床
比如我的图床：`https://myimgs.pages.dev/IMG/+我的图片名称`  
举个例子：https://myimgs.pages.dev/IMG/%E5%BE%AE%E4%BF%A1%202.png  

### 步骤1
新建一个名为MyIMGS的Github仓库（名称可随意）

### 步骤2   
打开[cloudflare](https://dash.cloudflare.com/)注册登陆  

打开左侧Pages,然后创建项目、连接到Git（刚刚创建的MyIMGS仓库）

### 步骤3 
上传图片到Git仓库，我是在Git仓库建立了一个名为IMG的文件夹，在这个文件夹里放图片，比如我在IMG文件夹放了一张名为xigua,jpeg格式的图片，则这个照片的路径为:https://myimgs.pages.dev/IMG/xigua.jpeg  


## 二、免费图床(推荐)
- [SMMS](https://sm.ms/)(推荐)
- [Hello图床](https://www.helloimg.com/)
- [载涂图床](https://mcecy.com/)(已经跑路)
- [imgurl](https://www.imgurl.ink/vip/manage/upload)  
 
无脑上传图片，粘贴链接即可
