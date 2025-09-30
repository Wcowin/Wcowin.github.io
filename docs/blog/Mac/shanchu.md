---
tags:
  - Mac
---

# Macbook启动台顽固应用图标删除方法
![19fedf7349ca4a73a8374b977832cb78_l2.jpg](https://s2.loli.net/2024/02/01/4gP5ezwyqI3nkbu.jpg)
类似上图这种情况的……

三步解决

1.打开终端

输入：
```
find / -name com.apple.dock.launchpad 2>/dev/null
```

回车后需要**等待一段时间**才出结果
![image.png](https://s2.loli.net/2025/01/02/z5jqTu7Dko6YFvG.png)
复制上图框中的路径

2.在终端输入cd+空格+刚才的路径+/db

比如：
```
cd /private/var/folders/qm/rr1078k96k3gn1xnr85ml8vm0000gn/0/com.apple.dock.launchpad/db
```
成功后如下图
![image.png](https://s2.loli.net/2025/01/02/z9B43kqcJD52yLH.png)
3.在上图db%后复制粘贴下方命令
```
sudo sqlite3 db "delete from apps where title='程序名称';"&&killall Dock
```
（程序名称是你想要删除的顽固图标）

搞定！

