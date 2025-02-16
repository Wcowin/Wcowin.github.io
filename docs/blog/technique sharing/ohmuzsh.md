---
title: oh-my-zsh 更新
tags:
  - 技术分享
hide:
---

```bash
upgrade_oh_my_zsh
```

***
当无论是自动更新还是手动upgrade_oh_my_zsh更新oh-my-zsh时，出现下面提示：  

```bash
Updating Oh My Zsh
error: cannot pull with rebase: You have unstaged changes.
error: please commit or stash them.
There was an error updating. Try again later?
```

这是因为修改了oh-my-zsh的git文件，可以使用如下方式更新：  

```bash
cd ~/.oh-my-zsh
git status
git stash
upgrade_oh_my_zsh
git stash pop
```  


**转载自：lvhy踩坑之路的[oh-my-zsh 更新](https://blog.csdn.net/weixin_44722978/article/details/108256498)**:material-cursor-default-click-outline: