---
tags:
  - win
---

# 三步卸载 Microsoft Edge

第一步：管理员模式打开 powershell

第二步：
```
cd 'C:\Program Files (x86)\Microsoft\Edge\Application\*\Installer
```
第三步：
```
./setup --uninstall --force-uninstall --system-level
```