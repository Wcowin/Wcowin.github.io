---
title: mac 无法访问 github 的解决办法
tags:
  - Mac
---
方案一：

第一步：打开 folder文件夹

第二步： command + shift + g 搜索，输入 /private/etc/hosts 找到 hosts 文件

第三步：编辑修改，输入
```
http://github.com 204.232.175.94 http://gist.github.com 107.21.116.220 
http://help.github.com 207.97.227.252 http://nodeload.github.com 199.27.76.130 
http://raw.github.com 107.22.3.110 http://status.github.com 204.232.175.78 
http://training.github.com 207.97.227.243 http://www.github.com
```
注意：hosts 文件是不能直接修改的，需要使用备份替换。一般情况下，修改原有的 hosts 文件时，系统会自动提醒你保存备份，修改完成，使用备份替换原有文件即可。

第四部：测试

<https://github.com/>

方案二：

如果上述方法还是不行....，可以尝试以下方案：
[查询_github.com 的 DNS.选择 工TL值最小的，响应最快的，使用 ip 地址访问](https://tool.chinaz.com/dns/?type=1&host=github.com&ip=)