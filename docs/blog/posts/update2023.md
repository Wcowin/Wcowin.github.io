---
title: 2023网站更新记录
authors: [Wcowin]
date: 2023-12-21
categories:
  - 网站更新记录
readtime: 2
---

## </p><h1 id="01" name="01"><strong>2023-12-21</strong></h1><p>
* 优化网站流畅度（玄学）
* 脱单了;手执烟火以谋生，心怀诗意以谋爱  

<div>
<div id="rcorners2" >
  <div id="rcorners1">
    <!-- <i class="fa fa-calendar" style="font-size:100"></i> -->
    <body>
    <font color="#4351AF">
    <p style="text-align: center; ">
            <span>我们已经在一起</span>
            <span id='box1'></span>
</p>
  <div id="box1"></div>
  <script>
    function timingTime(){
      let start = '2023-12-21 00:00:00'
      let startTime = new Date(start).getTime()
      let currentTime = new Date().getTime()
      let difference = currentTime - startTime
      let m =  Math.floor(difference / (1000))
      let mm = m % 60  // 秒
      let f = Math.floor(m / 60)
      let ff = f % 60 // 分钟
      let s = Math.floor(f/ 60) // 小时
      let ss = s % 24
      let day = Math.floor(s  / 24 ) // 天数
      return day + "天" + ss + "时" + ff + "分" + mm +'秒'
    }
    setInterval(()=>{
      document.getElementById('box1').innerHTML = timingTime()
    },1000)
  </script>
  </font>
</body>
    <!-- <b><span id="time"></span></b> -->
  </div>
</div>
</div>

## </p><h1 id="01" name="01"><strong>2023-12-14</strong></h1><p>
* 优化个别网页标签的显示问题
* 优化网站图片加载流畅度（玄学）
* 看了更多的猫咪 

## </p><h1 id="01" name="01"><strong>2023-12-09</strong></h1><p>
* 首次引入人工智能问答机器人:<https://wcowin.work/about/geren/>，缺点是每月25条消息限制，优点是可以智能回复本站所有信息，包括但不限于：个人信息，技术分享，博客，留言板，友链等等
* 优化网站流畅度
* 撸了更多的猫咪

## </p><h1 id="01" name="01"><strong>2023-11-22</strong></h1><p>
* 更新了**王冰冰**的简历和美照；我的心是冰冰的
* 修复翻译问题
* 优化移动端效果
* 提升网站流畅度（玄学）

## </p><h1 id="01" name="01"><strong>2023-11-11</strong></h1><p>
* 新增多语言支持，特别新增中国台湾语言支持
* 顺祝双11快乐
* 新增国内镜像网址:[https://wcowin.gitee.io/](https://wcowin.gitee.io/wcowin.github.io/){target="_blank"}

## </p><h1 id="01" name="01"><strong>2023-11-08</strong></h1><p>
* 紧急修复图片不显示的重大Bug

## </p><h1 id="01" name="01"><strong>2023-10-14</strong></h1><p>

* 正式建立[Mkdocs-Wcowin主题](https://github.com/Wcowin/Mkdocs-Wcowin){target="_blank"}
* 优化网页渲染速度
## </p><h1 id="01" name="01"><strong>2023-10-12</strong></h1><p>

* 增加[友链版块](https://wcowin.work/about/link/)
## </p><h1 id="01" name="01"><strong>2023-10-08</strong></h1><p>

* 修复Latex渲染不了的bug
## </p><h1 id="01" name="01"><strong>2023-10-05</strong></h1><p>

* 新增Blog版块
* **新增了Latex渲染不了的bug**
* 新增留言板，集成了giscus评论系统
* 新增首次访问网站的顶部通知栏功能

## </p><h1 id="01" name="01"><strong>2023-08-11</strong></h1><p>
* 优化主页设计，圆比方好，宽比竖好
* 引入图片懒加载
* 新增页面底部 "下一页/上一页"

## </p><h1 id="01" name="01"><strong>2023-07-19</strong></h1><p>

* 修改网页字体为[霞鹜文楷](https://github.com/lxgw/LxgwWenKai){target=_blank} 
* 修复鼠标上滑"回到页面顶部"不适配问题

## <h1 id="01" name="01"><strong>2023-01-12</strong></h1>

* 重写[mkdocs.yml](https://wcowin.work/blog/Mkdocs/mkdocs2/)，增加中文注释
* 支持Latex
* 引入个性化标签，[Markdown扩展](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/#inlinehilite)
* 新增网站搜索功能

