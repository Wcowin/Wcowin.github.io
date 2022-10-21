[点我～原创-最优教程](https://blog.csdn.net/m0_63203517/article/details/124383678?spm=1001.2014.3001.5501)

下面略提一下  
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
- 找到并打开Scripts这个文件夹，  
- 找到pip，拖到cmd中
- 首先，注意先打一个空格，随后输入下方代码后回车
```
install pyinstaller
```
***
二、使用pyinstaller

刚才Scripts目录下多了几个应用程序，我们找到<u>pyinstaller</u>即可，先不要打开它，保持这个窗口不要关。  

找到你.py文件所在位置，按住shift，空白处右键-在终端中打开,把我们之前得到的pyinstallert拖入到终端里
  
在.exe后键入一个空格，输入 "你的文件名+.py  回车"(不加" ")  
此时桌面会出现dist,build,.spec三个文件，我们只需要dist就行，打开，找到类型里的应用程序即可  

结束
***
以下步骤是在上面“ 这里我们先键入一个空格，输入文件名+.py  ”后操作的

最常用的几个我已经写下来了，下方自取
```
文件名.py -F   //打包exe
文件名.py -F -w   //不带控制台的打包
文件名.py -F -w -i 图片名.ico //.exe有图标的打包
```