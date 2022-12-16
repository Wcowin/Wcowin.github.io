---
tags:
  - Mac
---

![img](https://picd.zhimg.com/v2-c40d2ef7e08afbb2750f2c5b4b45c923_1440w.jpg?source=172ae18b)   
**自动脚本(全部国内地址)（复制下面一句脚本到终端中粘贴回车)**   

**苹果电脑 常规安装脚本（推荐 完全体 几分钟安装完成）：**
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

**苹果电脑 极速安装脚本（精简版 几秒钟安装完成）：**
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)" speed
```
-> Mac电脑如何打开终端：command+空格 在聚焦搜索中输入terminal回车。  


**苹果电脑 卸载脚本：**
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```
**常见错误去下方[地址](https://gitee.com/cunkai/HomebrewCN/blob/master/error.md)查看:**

<https://gitee.com/cunkai/HomebrewCN/blob/master/error.md>  

***
!!! bug
    如果遇到 SSL certificate problem: certificate has expired 错误  
    具体内容如下：  
    Cloning into '/usr/local/Homebrew'...  
    fatal: unable to access 'mirrors.ustc.edu.cn/bre': SSL certificate problem: certificate has expired  
    m此步骤失败 '尝试再次运行自动脚本选择其他下载源或者切换网络'  
[问题分析]：  
该部分原因可能因为在此之前 安装过Git客户端 默认Git客户端安装是开启SSL证书验证功能 需要在终端中关闭该验证  
[解决办法] :  
前面都不是重点，重点是问题描述里面的最后一句 certificate problem: certificate has expired，意思是证书过期了。其实就是SSL卡住了你，因此最快的解决方法就是关掉SSL验证。


终端输入下方代码 关闭SSL证书验证：
```
git config --global http.sslVerify false  
```
摘自知乎：[Homebrew国内如何自动安装（国内地址）（Mac & Linux）](https://zhuanlan.zhihu.com/p/111014448)  

Gitee地址:<https://gitee.com/cunkai/HomebrewCN>  

本人被这个brew安装折磨了一周，我只能说多试几次就好，纯玄学的玩意～
***
附常用brew指令
```
# 要获取最新的包的列表，首先得更新 Homebrew 自己
brew update
# 查找需要的包
brew search xxx
# 安装包
brew install xxx
# 卸载包
brew uninstall xxx
# 查看哪些软件需要更新
brew outdated
# 更新所有的包
brew upgrade
# 更新指定的包
brew upgrade xxx
# 清理所有包的旧版本
brew cleanup
# 显示某个包的信息
brew info xxx

```