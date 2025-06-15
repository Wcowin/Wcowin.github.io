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

- [jsDelivr CDN 加速 GitHub 文件](https://www.jsdelivr.com/github)
- [MkDocs Material 官方文档](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs 插件列表](https://github.com/mkdocs/catalog)

---

如需更多 MkDocs 配置、插件、主题美化等技巧，可参考 [Wcowin's web](https://wcowin.work/){target="_blank"} 或查阅官方文档。

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

</div>