---
title: oh-my-zsh 更新
tags:
  - 技术分享
hide:
---

```
upgrade_oh_my_zsh
```
![](https://img-blog.csdnimg.cn/20200827113647743.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDcyMjk3OA==,size_16,color_FFFFFF,t_70#pic_center)
***
当无论是自动更新还是手动upgrade_oh_my_zsh更新oh-my-zsh时，出现下面提示：
```
Updating Oh My Zsh
error: cannot pull with rebase: You have unstaged changes.
error: please commit or stash them.
There was an error updating. Try again later?
```

这是因为修改了oh-my-zsh的git文件，可以使用如下方式更新：
```
cd ~/.oh-my-zsh
git status
git stash
upgrade_oh_my_zsh
git stash pop
```
![](https://img-blog.csdnimg.cn/20200827113425536.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDcyMjk3OA==,size_16,color_FFFFFF,t_70#pic_center)

**转载自：lvhy踩坑之路的[oh-my-zsh 更新](https://blog.csdn.net/weixin_44722978/article/details/108256498)**:material-cursor-default-click-outline: