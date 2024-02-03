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
brew help  # 简洁命令帮助
man brew  # 完整命令帮助

brew -v  # 查看brew安装版本
brew update  # 更新brew版本

brew outdated  # 查看已安装的哪些软件包需要更新以及更新情况
brew upgrade git  # 更新单个软件包

brew list  # 显示已安装的所有软件包
brew list git  # 查看软件包的安装位置

brew install git  # 安装软件包
brew uninstall git  # 卸载软件包

brew cleanup -n  # 查看可清理的旧版本包，不执行实际操作
brew cleanup  # 清理所有已安装软件包的历史版本
brew cleanup git  # 清理单个已安装软件包的历史版本

brew search git  # 搜索软件包, 查看可安装的版本
brew install maven@3.5
brew install python@3.6  # 安装指定版本的软件包

brew info git  # 查看软件包信息
brew home git  # 访问软件包的官方网站

open ~/.zshrc -e  # 整理重复语句
open ~/.bash_profile -e  # 整理重复语句
```