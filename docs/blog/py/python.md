---
tags:
  - python
---
[点我～CSDN原创-如何将Python文件.py打包成.exe可执行程序](https://blog.csdn.net/m0_63203517/article/details/124383678?spm=1001.2014.3001.5501){target=“_blank”}

![](https://pic1.zhimg.com/v2-9c37b109a2592ace0b100cbb74c61501_1440w.jpeg?source=d16d100b)

.exe是文件扩展名，带有.exe扩展名的文件名按下Enter 键就可运行。这么个意思不就是：不需要装python即可运行python程序了，岂不美哉(^_^)v

这里说一下，本文只说明windows环境下的python打包，如果有macos下打包需求的我们可私下交流切磋一下  

下面**略提**一下  

## 一、安装Pyinstaller  
法一：
  
- 首先我们要先安装Pyinstaller，直接在cmd使用pip命令

1.windows + R 打开命令窗口  
2.输入 cmd ，打开命令提示行  
3.输入以下指令安装 pyinstaller ：  
```
C:\Users\Administrator>pip install pyinstaller
```
法二：  

- 找到Python的快捷方式（所有应用里就有）右键-打开文件所在的位置  
![img](https://cn.mcecy.com/image/20230321/143518f0ce6f2a1300996d0fdd057906.png)
- 找到并打开Scripts这个文件夹
![img](https://cn.mcecy.com/image/20230321/56f279ded09a073fc9ae96ab5af700c2.png)
- 找到pip，拖到cmd中
![img](https://cn.mcecy.com/image/20230321/9f8ed4b6f35b85ac5bf272b1e3902d9c.png)
- 首先，注意先打一个空格，随后输入下方代码后回车
```
install pyinstaller
```
![img](https://cn.mcecy.com/image/20230321/986de4d9fceda64e071ce59ce2d4ea9e.png)
(注意看路径)
***
## 二、使用pyinstaller

刚才Scripts目录下多了几个应用程序，我们找到<u>pyinstaller</u>即可，先不要打开它，保持这个窗口不要关。  
![img](https://cn.mcecy.com/image/20230321/97492be5eaf61d60f0bc16d725e270bc.png)
找到你.py文件所在位置，按住shift，空白处右键-在终端中打开,把我们之前得到的pyinstallert拖入到终端里
![img](https://cn.mcecy.com/image/20230321/48c7851cbe25b7427581632fd611149f.png)
![img](https://cn.mcecy.com/image/20230321/753b58bfde51125c015af0fd340c9670.png)
在.exe后键入一个空格，输入 "你的文件名+.py  回车"(不加" ")  
![img](https://cn.mcecy.com/image/20230321/294040872a7fdfb18d19653e966358f5.png)
此时桌面会出现dist,build,.spec三个文件，我们只需要dist就行，打开，找到类型里的应用程序即可  

结束
***
## 进阶操作  
![img](https://cn.mcecy.com/image/20230321/4d3b52e19b4241adc246574b0d355d86.png)  

以下步骤是在上面“ 这里我们先键入一个空格，输入文件名+.py  ”后操作的  

![img](https://cn.mcecy.com/image/20230321/689c0f10cb3c719f5a3cd5e3839e72c0.png)
![img](https://cn.mcecy.com/image/20230321/39e96e96cd092d3f89ebc0970f6095d9.png)

最常用的几个我已经写下来了，下方自取
```
文件名.py -F   //打包exe
文件名.py -F -w   //不带控制台的打包
文件名.py -F -w -i 图片名.ico //.exe有图标的打包
```