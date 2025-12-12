---
title:  标题
# 隐藏的模块
hide:
  #  - navigation # 隐藏左边导航
  #  - toc #隐藏右边导航
  #  - footer #隐藏翻页
  #  - feedback  #隐藏反馈
tags:
comments: false  #评论，默认不开启
---
pip install --upgrade --force-reinstall zensical

## 常用环境与命令

### 启动虚拟环境（推荐使用 Anaconda 管理 Python 环境）
```bash
conda activate Mkdocs
```

### Git 基本操作流程
```bash
git init  # 初始化本地仓库
git config --global user.name "myname"  # 配置用户名
git config --global user.email "myname@mymail.com"  # 配置邮箱
git remote add origin code@github.git  # 绑定本地和远程仓库 
git pull   # 拉取远程仓库的变化同步本地状态
git add .  # 添加所有更改到暂存区
git commit -m "描述信息"  # 提交更改
git push   # 推送到远程仓库
git status   # 查看当前仓库状态
```

### MkDocs 安装与升级
```bash
pip install mkdocs-material  # 安装 mkdocs-material
pip install --upgrade --force-reinstall mkdocs-material  # 强制升级 mkdocs-material
```

### MkDocs 构建与本地预览
```bash
mkdocs build --clean  # 构建静态站点
mkdocs serve          # 本地预览，支持热更新
```

### 常见问题解决
- 如果遇到依赖问题（如 cairo），可用 Homebrew 安装依赖：
  ```bash
  brew install cairo
  ```
- 若 mkdocs serve 报错，建议检查 Python 环境与依赖架构一致性。

## Markdown 使用技巧

- 新标签页打开链接：  
  `[Wcowin's web](https://wcowin.work/){target="_blank"}`

- 隐藏页面模块（如导航、目录、页脚等），可在页面头部 Front Matter 中配置 `hide` 字段。

## 常用资源

<!-- 
https://cdn.jsdelivr.net/gh/Wcowin/picx-images-hosting@master/IMG/Cravatar.jpg.1zihar9day.png -->

- [jsDelivr CDN 加速 GitHub 文件](https://www.jsdelivr.com/github)
- [MkDocs Material 官方文档](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs 插件列表](https://github.com/mkdocs/catalog)

---

如需更多 MkDocs 配置、插件、主题美化等技巧，可参考 [Wcowin's web](https://wcowin.work/){target="_blank"} 或查阅官方文档。

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

</div>


## 🎉 1.4.0版本更新日志


### 功能修复

- 修复富文本丢失问题
- 修复切换分类标签卡顿问题
- 修复存在的占用内存过大问题
- 修复了提问题的用户

### 功能新增

- 新增搜索筛选功能
- 新增收藏标签功能
- 新增云同步设备识别
- 新增⌘+↑/↓跳到历史记录第一个/最后一个

### 功能改进

- 改进上下按键交互，现在搜索完成按下键即可选中第一个历史记录。从第一个历史记录按下上键即可继续聚焦搜索框进行搜索
- 改进设置切换视图性能

---

## 下载

[1.4.0版本点我自行下载](https://github.com/Wcowin/OneClip/releases/download/1.4.0/OneClip-1.4.0.dmg)

如果您有好的建议请直接发邮件到[vip@oneclip.cloud](mailto:<vip@oneclip.cloud>)

### TODO
- [ ] 性能优化


