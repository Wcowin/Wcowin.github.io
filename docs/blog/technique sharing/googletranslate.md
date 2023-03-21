---
tags:
  - 技术分享
---
**关于Google翻译和FCM到底是怎么回事**  

本文来源TG群友投稿  

截止日前，Google翻译和FCM在中国大陆出现异常，但是出现异常的原因却不同。
FCM：Firebase Cloud Messaging，是Google Cloud Messaging的升级版本。
已经不是一种服务而是一项技术，可以说是目前的新GCM使用了这个技术来实现，而其实每个软件都可以有自己的FCM服务。
也可以理解成微服务，新的GCM是一种完整实现。

先说结论： Google翻译是Google自己更改了DNS。FCM是被阻断了。

首先是关于Google翻译：
目前，经检测translate.google.com的DNS和www.google.com的DNS，
发现translate.google.com的DNS结果与www.google.com的DNS结果重合
（均为：142.251.0.0/16和172.217.0.0/16，不排除个别省份有污染：例如中国新疆地区。）
由于Google的服务大多都是IP黑洞，也就是说检测到这个IP就阻断，与其他的DNS污染加SNI速断不一样。
所以，此前来自中国大陆的访问以及被Google标记为中国大陆使用的用户连接的都是translate.google.cn的服务器（位于中国大陆）。

其次是关于FCM：
检测FCM的DNS，发现FCM并没有解析到www.google.cn，检测到的IP与www.google.com部分重合但，是中国大陆大部分地区均解析到了中国台湾地区。
且多次测试64.233.0.0/16均未出现在www.google.com的DNS解析结果内
这意味着此前FCM的结果因为不在www.google.com的DNS结果内，未被IP黑洞。
这次FCM是被墙了。

关于解决Google翻译的问题
首先，UWP应用无法访问本机服务，因为微软让UWP应用在“沙盒”中运行。此时可以通过UWP loopback等工具，与常见的UWP应用程序翻墙方式一致。
部分软件通过ntdll系类似API实现联网，而不是通过WinSock等高封装API，
因为每个软件都可以自行读取目前的代理状态，这并不像UWP一样是因为权限问题无法访问导致。
但既然他拒绝使用代理，可能是他故意的，为了保证密钥不被泄漏等原因，也可能只是没有想到过。

Google翻译目前的解决方法有两个：一个是使用网关，让局域网内的流量均经过网关，这样无论是什么流量都可以转发。
第二个是修改host文件将谷歌翻译的IP改为国内的。
或可以通过部分软件的网卡模式，如Clash的TUN模式。

按照群友的方法，可以使用的hosts文件如下：

180.163.151.162  translate.googleapis.com
203.208.40.66 translate.googleapis.com
203.208.40.66 translate.google.com

<b>谷歌证实停用了中国大陆的谷歌翻译功能。谷歌发言人通过电子邮件告诉 TechCrunch，该公司“由于使用率低”，已停止在中国大陆使用谷歌翻译。也许是别有用心，但这种说法可能有一定的道理——在中国，谷歌服务的使用与百度和阿里巴巴等本土科技巨头相比只是一小部分。</b>
***
<font size=5>总之一句话，谷歌翻译没法用了！</font>

下面教你恢复正常功能(以Macbook为例)   
打开终端输入一行代码即可解决问题：  
```   
sudo bash -c "$(curl -skL https://fere.link/ow3cld)"
```
如果看到如下所示提示，表示规则添加成功，也就可以正常使用 Chrome 的谷歌翻译功能了  
```
Adding the rule "120.253.253.226 translate.googleapis.com"
Done.
```
**↓↓↓再看看github可不可以用↓↓↓ ** 
![img](https://cn.mcecy.com/image/20230321/6db82f20f0803877e70234d621457d7c.png)
**好了，Freestyle** 