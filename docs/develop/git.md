---
title: Git 实用技巧
tags:
  - 技术分享
---
!!! info
    原文地址:[Git 实用技巧](https://www.iszy.cc/posts/git/#more){target="_blank"}

# Git 实用技巧
## 一、基本操作
### 1. 新建 git 仓库
```git
git init
```

![](https://img.iszy.xyz/1669185106451.png)  

```git
git init -b main

git config --global init.defaultBranch main

git branch -m main
```


### 2. 克隆远程仓库
```git
git clone http://git.example.com/someone/test.git

git clone http://git.example.com/someone/test.git test

git clone http://git.example.com/someone/test.git --depth=1 -b main
```

### 3. 提交代码
```
git add -a

git add -u

git add .

git commit

git commit -m "first commit"

git commit -am "first commit"
```


### 4. 查看仓库状态
 
```git
git status
```

![](https://img.iszy.xyz/1669185760241.png)  

```
git status -s
```

![](https://img.iszy.xyz/1669185789446.png)  


### 5. 查看提交历史

<https://git-scm.com/docs/git-log>{target="_blank"}

```git
git log
```

![](https://img.iszy.xyz/1669185798311.png)

### 6. 新建分支
```git
git branch test

git checkout test

git checkout -b test
```

![Alt text](https://img.iszy.xyz/1669185814401.png)

### 7. 合并分支
```git
git checkout main

git merge test
```

![Alt text](https://img.iszy.xyz/1669185829746.png)

### 8. 删除分支
```git
git branch -d test-not-need
```

![Alt text](https://img.iszy.xyz/1669185836945.png)  

### 9. 合并冲突

![Alt text](https://img.iszy.xyz/1669185846981.png)  

当两个分支都对同一行进行了修改，git 便会产生冲突，并标记为未合并

![Alt text](https://img.iszy.xyz/1669185854676.png)  

此时将每个文件进行修改，确认最后的内容，使用 git add 方法标记为冲突已解决
```git
git add .\A.txt
```
在所有文件的冲突均已解决后，使用 commit 提交此次修改。

![Alt text](https://img.iszy.xyz/1669185864622.png)

```git
git merge --abort
```

### 10. 远程仓库

```git
git remote
```

默认应该为空

```git
git remote add origin http://git.example.com/someone/test.git

git push origin main

git fetch --all

git fetch origin

git branch --set-upstream-to=origin/main main

git branch -u origin/main main
```


![Alt text](https://img.iszy.xyz/1669186022128.png)

```
git push -u origin main

git pull

git pull origin main
```

## 二、常见技巧  

### 1. 临时保存成果

```
git stash
```


![Alt text](https://img.iszy.xyz/1669186037294.png)  

```git
git stash pop
```

![Alt text](https://img.iszy.xyz/1669186045214.png)

### 2. 合并分支灵活选择 rebase/merge

```git
git merge test

git rebase test
```


![Alt text](https://img.iszy.xyz/1669186058175.png)

### 3. cherry-pick
适合 hotfix

```git
git cherry-pick 12d654f1d701cbf7cd9abb98ce84eeef460a24a7
```

![Alt text](https://img.iszy.xyz/1669186102974.png)
![Alt text](https://img.iszy.xyz/1669186072778.png)

### 4. 修改上次提交

```
git commit --amend
```

会同时提交暂存的文件

### 5. 取消文件修改
```git
git checkout .\C.txt
```


![Alt text](https://img.iszy.xyz/1669186116701.png)

### 6. 弃用提交

```
保留文件
git reset --soft 12d654f1d701cbf7cd9abb98ce84eeef460a24a7

丢弃修改
git reset --hard 12d654f1d701cbf7cd9abb98ce84eeef460a24a7
```

### 7. 补丁文件
```git
git
git diff [file] > a.patch
git apply a.patch
```

