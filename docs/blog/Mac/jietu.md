---
title: Mac小技巧：去除系统截图名的日期后缀
tags:
  - Mac
---


默认情况下，在 OS X 中用 Command-Shift-3 等快捷键来截图时，你会发现生成的图片名称分为两个部分：「屏幕快照」字样后跟着「截图的日期和时间」部分（如 2019-12-27 15.19.45）。可能对于大多数人来说，这是一个非常有用的功能，因为它可以让你知晓截图的具体时间，或是根据它来排序截图。但是对笔者或其他一些人来说，这可能是烦人的，我需要对截图文件再次进行重命名操作。

* 第一步：启动「终端」应用程序。

<!-- ![](https://static.skyandroid.cn/images/data/1577432836240930.png?x-oss-process=style/w_1240) -->

* 第二步：复制如下命令后粘贴到终端窗口中，然后按下 return 键（enter）。
```
defaults write com.apple.screencapture "include-date" 0
```
* 第三步：接着输入如下命令，然后再次按 return 键。
```
killall SystemUIServer
```

就是这样简单。现在你会发现，当你截图的时候，文件名称中就已经不再包含截图的日期和时间啦。

![](https://static.skyandroid.cn/images/data/1577432991750269.png?x-oss-process=style/w_1240)

!!! note
    注 1：如果你想恢复默认式样，将第二步中的「1」替换成「0」即可。

    注 2：以后你每次截屏，名称还会自动依次按照「截屏快照」，「截屏快照 1」，「截屏快照 2」……来排序，非常方便。