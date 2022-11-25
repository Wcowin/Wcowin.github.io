[点我～原创-最优教程](https://blog.csdn.net/m0_63203517/article/details/124383678?spm=1001.2014.3001.5501)
![](https://pic1.zhimg.com/v2-9c37b109a2592ace0b100cbb74c61501_1440w.jpeg?source=d16d100b)

.exe是文件扩展名，带有.exe扩展名的文件名按下Enter 键就可运行。这么个意思不就是：不需要装python即可运行python程序了，岂不美哉(^_^)v

这里说一下，本文只说明windows环境下的python打包，如果有macos下打包需求的我们可私下交流切磋一下  

下面**略提**一下  

一、安装Pyinstaller  
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
![img](https://img-blog.csdnimg.cn/4936e48652674c07832a527b4d4291d3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
- 找到并打开Scripts这个文件夹
![img](https://img-blog.csdnimg.cn/78cce1e2124e49ebb7dd3558cafc71ac.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16) 
- 找到pip，拖到cmd中
![img](https://img-blog.csdnimg.cn/1272f4cf5ca74c7aa1bbf58565d39031.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
- 首先，注意先打一个空格，随后输入下方代码后回车
```
install pyinstaller
```
![img](https://img-blog.csdnimg.cn/ebf0ba0459a744c9b3f12075fe182b7f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
(注意看路径)
***
二、使用pyinstaller

刚才Scripts目录下多了几个应用程序，我们找到<u>pyinstaller</u>即可，先不要打开它，保持这个窗口不要关。  
![img](https://img-blog.csdnimg.cn/b8cfde4546614586a3a1445f9c8cb97e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
找到你.py文件所在位置，按住shift，空白处右键-在终端中打开,把我们之前得到的pyinstallert拖入到终端里
![img](https://img-blog.csdnimg.cn/95025ac5984d4c99b4250b9baafcd5c1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
![img](https://img-blog.csdnimg.cn/a626139331824bbe8c4c542b1909e737.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
在.exe后键入一个空格，输入 "你的文件名+.py  回车"(不加" ")  
![img](https://img-blog.csdnimg.cn/57b04c9cc6a84c148a45b49a0c622bf8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
此时桌面会出现dist,build,.spec三个文件，我们只需要dist就行，打开，找到类型里的应用程序即可  

结束
***
进阶操作  
![img](https://img-blog.csdnimg.cn/f2923985c4584335b66c0cfd0127a9c9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV2Nvd2lu,size_20,color_FFFFFF,t_70,g_se,x_16)
以下步骤是在上面“ 这里我们先键入一个空格，输入文件名+.py  ”后操作的

最常用的几个我已经写下来了，下方自取
```
文件名.py -F   //打包exe
文件名.py -F -w   //不带控制台的打包
文件名.py -F -w -i 图片名.ico //.exe有图标的打包
```