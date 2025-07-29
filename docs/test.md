---
title: 翻译测试一
# 隐藏的模块
hide:
  #  - navigation # 隐藏左边导航
  #  - toc #隐藏右边导航
  #  - footer #隐藏翻页
  #  - feedback  #隐藏反馈
tags:
comments: false  #评论，默认不开启
---

```yaml
plugins:
  - document-dates:
      position: top            # 显示位置：top（标题后） bottom（文档末尾），默认：bottom
      type: date               # 时间类型：date datetime timeago，默认：date
      locale: zh               # 本地化语言：en zh zh_TW es fr de ar ja ko ru，默认：en
      date_format: '%Y-%m-%d'  # 日期格式化字符串，例如：%Y年%m月%d日、%b %d, %Y
      time_format: '%H:%M:%S'  # 时间格式化字符串（仅在 type=datetime 时有效）
      exclude:                 # 排除文件列表，默认为空
        - temp.md              # 排除指定文件
        - private/*            # 排除 private 目录下所有文件，包括子目录
      show_author: true        # 是否显示作者信息，默认：true
```

## 手动指定时间

插件会自动获取文档的准确时间信息，会自动缓存创建时间，当然，你也可以在 `Front Matter` 中手动指定

优先级顺序：`Front Matter` > `文件系统时间戳(缓存)` > `Git时间戳`

## 常用环境与命令

### 启动虚拟环境（推荐使用 Anaconda 管理 Python 环境）
```bash
conda activate Mkdocs
```

## 常用资源

- [jsDelivr CDN 加速 GitHub 文件](https://www.jsdelivr.com/github)
- [MkDocs Material 官方文档](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs 插件列表](https://github.com/mkdocs/catalog)

---

如需更多 MkDocs 配置、插件、主题美化等技巧，可参考 [Wcowin's web](https://wcowin.work/){target="_blank"} 或查阅官方文档。

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---
    你好，王鸿是最美丽的人。
</div>