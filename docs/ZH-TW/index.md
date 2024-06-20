---
title: Home
hide:
  # - navigation # 显示右
  # - toc #显示左
  - footer
  - feedback
comments: false
---
# 首頁

<!-- <center><font  color= #518FC1 size=6>“循此苦旅，以达星辰”</font></center> -->
<center><font  color= #518FC1 size=6 class="ml3">“循此苦旅 以達星辰”</font></center>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>


<!-- <center>
<font  color= #608DBD size=3>
<span id="jinrishici-sentence">正在加载今日诗词....</span>
<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
</font>
</center> -->

<!-- <center>
<font  color= #608DBD size=3>
<span id="hitokoto-sentence">正在加载一言....</span>
<script src="https://v1.hitokoto.cn"></script>
</font>
</center> -->

<!-- <center>
<font  color= #608DBD size=3>
<p id="hitokoto">
  <a href="#" id="hitokoto_text" target="_blank"></a>
</p>
<script>
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector('#hitokoto_text')
      hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
</script>
</font>
</center> -->


<div id="rcorners2" >
  <div id="rcorners1">
    <!-- <i class="fa fa-calendar" style="font-size:100"></i> -->
    <body>
      <font color="#4351AF">
        <p class="p1"></p>
<script defer>
    //格式：2020年04月12日 10:20:00 星期二
    function format(newDate) {
        var day = newDate.getDay();
        var y = newDate.getFullYear();
        var m =
            newDate.getMonth() + 1 < 10
                ? "0" + (newDate.getMonth() + 1)
                : newDate.getMonth() + 1;
        var d =
            newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        var h =
            newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
        var min =
            newDate.getMinutes() < 10
                ? "0" + newDate.getMinutes()
                : newDate.getMinutes();
        var s =
            newDate.getSeconds() < 10
                ? "0" + newDate.getSeconds()
                : newDate.getSeconds();
        var dict = {
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六",
            0: "天",
        };
        //var week=["日","一","二","三","四","五","六"]
        return (
            y +
            "年" +
            m +
            "月" +
            d +
            "日" +
            " " +
            h +
            ":" +
            min +
            ":" +
            s +
            " 星期" +
            dict[day]
        );
    }
    var timerId = setInterval(function () {
        var newDate = new Date();
        var p1 = document.querySelector(".p1");
        if (p1) {
            p1.textContent = format(newDate);
        }
    }, 1000);
</script>
      </font>
    </body>
  </div>
<ul>
     <li>透過主題和目錄以開啟文章</li>
     <ul>
       <li>Mac/PC端 請在上方標籤列選擇主題 在左側目錄選擇文章</li>
       <li>行動端 請點選左上角圖示選擇主題和文章</li>
     </ul>
     <li>搜尋關鍵字以開啟文章</li>
     <li>
       如遇到網頁卡頓/開啟文章後無法顯示圖片的情況，請使用<strong>科學上網</strong>以打破資訊壁壘
     </li>
   </ul>
</div> 
快速談話(1) 聯絡我(2)
{ .annotate }

1. 點選右下角與我線上交談.
2. 18939533255
***  

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推薦的文章__

    ---

    - [如何註冊ChatGPT](../develop/ChatGPT.md)
    - [將Python文件打包成.exe可執行程序](../blog/py/python.md)
    - [Homebrew國內如何自動安裝(國內地址)(Mac & Linux)](../blog/Mac/homebrew.md) 
    

-   :simple-materialformkdocs:{ .lg .middle } __Mkdocs教程__

    ---

    - [利用Mkdocs部署靜態網頁至GitHub pages](../blog/Mkdocs/mkdocs1.md)
    - [Mkdocs配置說明(mkdocs.yml)](../blog/Mkdocs/mkdocs2.md)   
    - [如何給MKdocs添加友鏈](../blog/Mkdocs/linktech.md)

    

-   :material-format-font:{ .lg .middle } __好玩__

    ---

    
    - [好用/好玩網站分享](../blog/Webplay.md)
    - [Mac/windows軟件網站匯總](../blog/macsoft.md)
    - [重慶旅遊推薦路線](../trip/InCQ/CQ.md)
    

    

-   :simple-aboutdotme:{ .lg .middle } __關於__

    ---

    - [留言板](../waline.md)[^Knowing-that-loving-you-has-no-ending]
    - [Blogger](../blog/index.md)   
    [:octicons-arrow-right-24: 了解我](../about/geren.md)[^see-how-much-I-love-you]

</div>
  

[^Knowing-that-loving-you-has-no-ending]:太陽總是能溫暖向日葵 
[^see-how-much-I-love-you]:All problems in computer science can be solved by another level of indirection


<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-29HZMNR0KG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-29HZMNR0KG');
</script>


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



<!-- <head>
<script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
<script>LA.init({id:"3HOcxvgwJJmkuGUi",ck:"3HOcxvgwJJmkuGUi"})</script>
</head> -->



   <body>
        <font color="#B9B9B9">
        <p style="text-align: center; ">
                <span>本站已經運作</span>
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
          return day + "天" + ss + "時" + ff + "分" + mm +'秒'
        }
        setInterval(()=>{
          document.getElementById('box1').innerHTML = timingTime()
        },1000)
      </script>
      </font>
    </body>


<!-- <head>
<script defer src="https://analytics.us.umami.is/script.js" data-website-id="dae37494-1db6-408a-afdd-1868e1a7d41a"></script>
</head> -->
