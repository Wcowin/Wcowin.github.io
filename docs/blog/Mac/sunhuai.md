---
title: 提示 「“XXX”已损坏，无法打开。 您应该将它移到废纸篓。」「打不开 xxx，因为它来自身份不明的开发者」解决方法
tags:
  - Mac
---
## 常见的几种报错

- xxx已损坏，无法打开，你应该将它移到废纸篓解决办法  
- 打不开 xxx，因为它来自身份不明的开发者  
- 打不开xxxx，因为 Apple 无法检查其是否包含恶意软件  
- 在安装的时候提示加载失败！  

## 为什么会出现？

这是 macOS 启用了新的安全机制的问题。  

苹果默认是只允许安装自家【App Store】来源的应用，如果你想安装第三方的应用，那么需要在【系统偏 好设置 -> 安全性与隐私 -> 通用】中勾选【App Store 和被认可的开发者】选项。而被认可的开发者是需要购买苹果的企业证书对应用进行签名，然后再提交给苹果审核才可以，这对破解应用来说很不现实，因为破解应用必定会修改应用的文件从而导致签名失效而运行显示【已损坏】。另外一些开源免费类应用没有收益（用户主动打赏太难了），所以开发者一般也不会购买证书签名。  

解决方法就是去开启【任何来源】选项了，但是 macOS 默认是隐藏了这个设置的，需要用户手动通过终端执行命令行代码来开启。

## 开启任何来源

先打开 系统偏好设置 -> 安全与隐私 -> 通用 选项卡，检查是否已经启用了 任何来源 选项。
![](https://onstom.oss-accelerate.aliyuncs.com/picgo/202112291828413.png)

如果没有这个选项，复制以下面的命令：
```
sudo spctl --master-disable
```
打开终端，右键粘贴上面命令，回车并输入密码： 
![](https://onstom.oss-accelerate.aliyuncs.com/picgo/202112291829815.png)

然而有的应用开启了任何来源还是不行，这是因为苹果进一步收缩了对未签名应用的权限，这时候就需要过终端执行命令行代码来绕过应用签名认证。  

## 绕过公证
打开终端，输入以下命令：
```
sudo xattr -rd com.apple.quarantine /Applications/xxxxxx.app将上面的 xxxxxx.app 换成你的App名称，比如 Sketch.app
```
```
sudo xattr -rd com.apple.quarantine /Applications/Sketch.app
```
或者复制以下命令粘贴到终端后
```
sudo xattr -rd com.apple.quarantine 
```
打开Finder（访达），点击左侧的 应用程序，将应用拖进终端中，然后按键盘的回车键（return），输入密码，再按回车键，完成。

!!! note
    `quarantine `后面必须有个空格


## 应用签名
安装Command Line Tools 工具 打开终端工具输入如下命令：
```
xcode-select --install
```
弹出安装窗口后选择继续安装，安装过程需要几分钟，请耐心等待。如果安装的时候提示“不能安装该软件，因为当前无法从软件更新服务器获得”，  

打开终端工具输入并执行如下命令对应用签名：
```
sudo codesign --force --deep --sign - (应用路径)
```
应用路径：打开访达（Finder），点击左侧导航栏的 应用程序，找到相关应用，将它拖进终端命令- 的后面，然后按下回车即可，**注意最后一个 - 后面有一个空格。**

「正常情况下只有一行提示，即成功：」
```
/文件位置 : replacing existing signature
```
「如遇如下错误：」
```
/文件位置 : replacing existing signature/文件位置 : resource fork,Finder information,or similar detritus not allowed
```

1.先在终端执行：
```
xattr -cr /文件位置（直接将应用拖进去即可）
```

2.然后再次执行如下指令即可：
```
codesign --force --deep --sign - /文件位置（直接将应用拖进去即可）
```

## macOS小助手

[如果嫌麻烦，也可以下载 macwk.com 编写的 macos小助手进行快速操作。](https://pan.quark.cn/s/f2302b6789b0){target=“_blank”}
