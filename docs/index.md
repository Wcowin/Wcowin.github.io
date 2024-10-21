---
title: Home
hide:
  # - navigation # 显示右
  # - toc #显示左
  - footer
  - feedback
comments: false
---

# 主页

<center><font  color= #518FC1 size=6 class="ml3">“循此苦旅 以达星辰”</font></center>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>


<!-- <center>
<font  color= #608DBD size=3>
<span id="jinrishici-sentence">正在加载今日诗词....</span>
<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
</font>
</center> -->



<div id="rcorners2" >

<div id="rcorners1" class="date-display">
    <p class="p1"></p>
</div>

<style>
    .date-display {
        color: #4351AF;
    }
</style>
<script defer>
    function format(newDate) {
        const day = newDate.getDay();
        const y = newDate.getFullYear();
        const m = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const d = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const h = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
        const min = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
        const s = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
        const dict = {1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六", 0: "天"};
        
        return `${y}年${m}月${d}日 ${h}:${min}:${s} 星期${dict[day]}`;
    }

    const timerId = setInterval(() => {
        const newDate = new Date();
        const p1 = document.querySelector(".p1");
        if (p1) {
            p1.textContent = format(newDate);
        }
    }, 1000);
</script>

  <ul>
    <li>通过主题和目录以打开文章</li>
    <ul>
      <li>Mac/PC端 请在上方标签栏选择主题 在左侧目录选择文章</li>
      <li>移动端 请点击左上角图标选择主题和文章</li>
    </ul>
    <li>请搜索关键词以打开文章</li>
    <li>
      如遇到网页卡顿/打开文章后无法显示图片的情况，请使用科学上网
    </li>
  </ul>
</div> 

快速谈话(1) 联系我(2)
{ .annotate }

1. 点击右下角与我在线交谈.
2. 18939533255
***  

<!-- <strong>推荐文章:material-book:</strong>

  - [如何注册ChatGPT](develop/ChatGPT.md)
  - [将Python文件.py打包成.exe可执行程序](blog/py/python.md)
  - [Blogger](blog/index.md) 
  - [利用Mkdocs部署静态网页至GitHub pages](blog/Mkdocs/mkdocs1.md)
  - [如何给MKdocs添加友链](blog/Mkdocs/linktech.md)
  - [Homebrew国内如何自动安装(国内地址)(Mac & Linux)](blog/Mac/homebrew.md)
  - [好用/好玩网站分享](blog/Webplay.md)
  - [Mac/windows软件网站汇总](blog/macsoft.md)
  - [重庆旅游推荐路线](trip/InCQ/CQ.md)
  - [留言板](waline.md) -->

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

    - [如何注册ChatGPT](develop/ChatGPT.md)
    - [将Python文件打包成.exe可执行程序](blog/py/python.md)
    - [Homebrew国内如何自动安装(国内地址)(Mac & Linux)](blog/Mac/homebrew.md) 
    
-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程__

    ---

    - [利用Mkdocs部署静态网页至GitHub pages](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)   
    - [如何给MKdocs添加友链](blog/Mkdocs/linktech.md)


-   :material-format-font:{ .lg .middle } __好玩__

    ---

    
    - [好用/好玩网站分享](blog/Webplay.md)
    - [Mac/windows软件网站汇总](blog/macsoft.md)
    - [重庆旅游推荐路线](trip/InCQ/CQ.md)
    
-   :simple-aboutdotme:{ .lg .middle } __关于__

    ---

    - [留言板](waline.md)[^Knowing-that-loving-you-has-no-ending] 
    - [Blogger](blog/index.md)  
    - [:octicons-arrow-right-24: 了解我](about/geren.md)[^see-how-much-I-love-you]

</div>



[^Knowing-that-loving-you-has-no-ending]:太阳总是能温暖向日葵  
[^see-how-much-I-love-you]:All-problems-in-computer-science-can-be-solved-by-another-level-of-indirection


<head>
<!-- Start of Howxm client code snippet -->
<script>
function _howxm(){_howxmQueue.push(arguments)}
window._howxmQueue=window._howxmQueue||[];
_howxm('setAppID','14429fca-cac1-4551-a472-b046a96ebb75');
(function(){var scriptId='howxm_script';
if(!document.getElementById(scriptId)){
var e=document.createElement('script'),
t=document.getElementsByTagName('script')[0];
e.setAttribute('id',scriptId);
e.type='text/javascript';e.async=!0;
e.src='https://static.howxm.com/sdk.js';
t.parentNode.insertBefore(e,t)}})();
</script>
<!-- End of Howxm client code snippet -->

<script src="//code.tidio.co/6jmawe9m5wy4ahvlhub2riyrnujz7xxi.js" async></script>
</head>



<style>
#rcorners3 {
  border-radius: 25px;
  border: 2px solid #518FC1;
  padding: 20px;
  width: 100%;
  height: 30%;
  font-size: 18px;
  text-align: center;
}
</style>
<body>
<font color="#B9B9B9">
  <p style="text-align: center; ">
      <span>本站已经运行</span>
      <span id='box1'></span>
</p>
  <div id="box1"></div>
  <script>
    function timingTime(){
      let start = '2022-10-20 00:00:00'
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



<!--  
____    __    ____  ______   ______   ____    __    ____  __  .__   __. 
\   \  /  \  /   / /      | /  __  \  \   \  /  \  /   / |  | |  \ |  | 
 \   \/    \/   / |  ,----'|  |  |  |  \   \/    \/   /  |  | |   \|  | 
  \            /  |  |     |  |  |  |   \            /   |  | |  . `  | 
   \    /\    /   |  `----.|  `--'  |    \    /\    /    |  | |  |\   | 
    \__/  \__/     \______| \______/      \__/  \__/     |__| |__| \__| 

-->

