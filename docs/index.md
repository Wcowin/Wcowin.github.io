---
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
comments: false
# icon: octicons/home-fill-24
---

# Wcowin's Blog

<center><font  color= #757575 size=6 class="ml3">“循此苦旅 以达星辰”</font></center>
<script src="https://cdn.statically.io/libs/animejs/2.0.2/anime.min.js"></script>



<!-- <div id="rcorners2" >

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
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long',
            hour12: false
        };
        return new Intl.DateTimeFormat('zh-CN', options).format(newDate);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const p1 = document.querySelector(".p1");
        function updateTime() {
            const newDate = new Date();
            if (p1) {
                p1.textContent = format(newDate);
            }
            requestAnimationFrame(updateTime);
        }
        updateTime();
    });
</script>
  
  <ul>
      <li>通过目录以打开文章</li>
      <li>搜索关键词查询文章</li>
      <ul>
          <li>Mac/PC端 请在上方标签栏选择主题 在左侧目录选择文章</li>
          <li>移动端 请点击左上角图标选择主题和文章</li>
      </ul>
      <li>如遇到网页卡顿/打开文章后无法显示图片的情况，请使用科学上网</li>
  </ul>
</div>  -->

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } __导航栏__

    ---

    <!-- ![image](https://s1.imagehub.cc/images/2025/01/11/9c234885eeb4458be1df5e9beff223ce.png){  align=right width="340" height="280" style="border-radius: 25px;"} -->
    ![image](https://img1.lookpic.cn/2025/01/12/imageb447448a4a4ce2b1.png){ class="responsive-image" align=right width="340" height="280" style="border-radius: 25px;" }

    - [x] 通过{==目录==}以打开文章
    - [x] 搜索{~~~>关键词~~}查询文章
    - [x] 𝕙𝕒𝕧𝕖 𝕒 𝕘𝕠𝕠𝕕 𝕥𝕚𝕞𝕖 !
    - [x] 如遇到无法显示图片的情况，请使用{--科学上网--}
    === "Mac/PC端"

        请在上方标签选择分类/左侧目录选择文章

    === "移动端"

        请点击左上角图标选择分类和文章
    

</div>
<style>
    @media only screen and (max-width: 768px) {
        .responsive-image {
            display: none;
        }
    }
</style>

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


***  


<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

    - [如何注册ChatGPT](develop/ChatGPT.md)
    - [将Python文件打包成.exe可执行程序](blog/py/python.md)
    - [Homebrew国内如何自动安装(国内地址)(Mac & Linux)](blog/Mac/homebrew.md) 
    
-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程(三步搞定)__

    ---

    - [利用Mkdocs部署静态网页至GitHub pages](blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置说明(mkdocs.yml)](blog/Mkdocs/mkdocs2.md)   
    - [如何给MKdocs添加友链](blog/Mkdocs/linktech.md)


-   :material-format-font:{ .lg .middle } __好用/好玩__

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

<!-- Start of Howxm client code snippet -->
<!-- <head>
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
</script> -->
<!-- End of Howxm client code snippet -->

<!-- <script src="//code.tidio.co/6jmawe9m5wy4ahvlhub2riyrnujz7xxi.js" async></script>-->  
 <!-- tidio聊天-->
</head>





<!--  
____    __    ____  ______   ______   ____    __    ____  __  .__   __. 
\   \  /  \  /   / /      | /  __  \  \   \  /  \  /   / |  | |  \ |  | 
 \   \/    \/   / |  ,----'|  |  |  |  \   \/    \/   /  |  | |   \|  | 
  \            /  |  |     |  |  |  |   \            /   |  | |  . `  | 
   \    /\    /   |  `----.|  `--'  |    \    /\    /    |  | |  |\   | 
    \__/  \__/     \______| \______/      \__/  \__/     |__| |__| \__| 
-->


<!-- <script defer>
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
</script> -->



快速谈话(1) 联系我(2)
{ .annotate }

1. 点击右上角关于页面，与我在线交谈.
2. TEL:18939533255(微信号)


