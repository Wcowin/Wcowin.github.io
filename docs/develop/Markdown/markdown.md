---
title: Markdown语法学习指南
description: 从基础到进阶的完整Markdown语法教程
tags:
  - Markdown
---

# Markdown指南

<div class="markdown-guide-header">
  <h1>📝 Markdown 语法完全指南</h1>
  <p class="subtitle">轻量级标记语言，让写作更简单高效</p>
  <div class="guide-stats">
    <span class="stat-item">📚 覆盖全部语法</span>
    <span class="stat-item">🚀 实例演示</span>
    <span class="stat-item">💡 实用技巧</span>
  </div>
</div>

> <span id="top">**快速导航**</span> | [基础语法](#_2) | [高级语法](#_18) | [实用技巧](#_24) | [在线工具](#_29)

## 📖 什么是 Markdown？

**Markdown** 是一种轻量级标记语言，由 **John Gruber** 于 2004 年创建。它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 文档。

!!! tip "为什么选择 Markdown？"
    - ✅ **简单易学** - 语法简洁明了
    - ✅ **跨平台** - 纯文本格式，任何编辑器都能打开
    - ✅ **格式丰富** - 支持导出 HTML、PDF、Word 等格式
    - ✅ **版本控制友好** - Git 等工具完美支持
    - ✅ **广泛支持** - GitHub、博客平台、文档工具都支持

## 🛠️ 推荐工具

=== "桌面编辑器"
    | 平台 | 工具 | 特点 |
    |------|------|------|
    | **macOS** | [MacDown](https://macdown.uranusjr.com/) | 免费、实时预览 |
    | **macOS** | [Typora](https://typora.io/) | 所见即所得 |
    | **Windows** | [Typora](https://typora.io/) | 跨平台、优雅界面 |
    | **Linux** | [ReText](https://github.com/retext-project/retext) | 开源、轻量级 |

=== "在线编辑器"
    - [Dillinger](https://dillinger.io/) - 功能强大的在线编辑器
    - [StackEdit](https://stackedit.io/) - 支持同步到云端
    - [HackMD](https://hackmd.io/) - 团队协作编辑

=== "移动端"
    - **iOS/Android**: [iA Writer](https://ia.net/writer)
    - **多平台**: [Notion](https://notion.so/)

## 基础语法

### 🎯 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

!!! note "标题技巧"
    - `#` 后面需要加空格
    - 最多支持 6 级标题
    - 建议使用 ATX 风格（#）而非 Setext 风格

### ✨ 文本样式

| 样式 | 语法 | 效果 |
|------|------|------|
| **粗体** | `**文本**` 或 `__文本__` | **粗体文本** |
| *斜体* | `*文本*` 或 `_文本_` | *斜体文本* |
| ***粗斜体*** | `***文本***` | ***粗斜体文本*** |
| ~~删除线~~ | `~~文本~~` | ~~删除文本~~ |
| ==高亮== | `==文本==` | ==高亮文本== |
| <u>下划线</u> | `<u>文本</u>` | <u>下划线文本</u> |

### 📋 列表

#### 无序列表

```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
    - 子子项目 2.2.1
- 项目 3
```

**效果：**

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
    - 子子项目 2.2.1
- 项目 3


#### 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
- [x] ~~已取消任务~~
```

**效果：**  

- [x] 已完成任务
- [ ] 未完成任务
- [x] ~~已取消任务~~

### 🔗 链接和图片

#### 链接语法

```markdown
[链接文本](URL "可选标题")
[GitHub](https://github.com "全球最大代码托管平台")
```

**效果：** [GitHub](https://github.com "全球最大代码托管平台")

#### 图片语法

```markdown
![图片描述](图片URL "可选标题")
![Markdown Logo](https://markdown-here.com/img/icon256.png "Markdown")
```

### 📊 表格

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  |   内容2   |  内容3 |
| 内容4  |   内容5   |  内容6 |
```

**效果：**

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  |   内容2   |  内容3 |
| 内容4  |   内容5   |  内容6 |

### 💻 代码

#### 行内代码

```markdown
使用 `printf()` 函数输出文本
```

**效果：** 使用 `printf()` 函数输出文本

#### 代码块

````markdown
```python
def hello_world():
    print("Hello, Markdown!")
    return "Success"

# 调用函数
hello_world()
```
````

**效果：**
```python
def hello_world():
    print("Hello, Markdown!")
    return "Success"

# 调用函数
hello_world()
```

### 📌 引用

```markdown
> 这是一级引用
>
> > 这是二级引用
> >
> > > 这是三级引用
```

**效果：**
> 这是一级引用
>
> > 这是二级引用
> >
> > > 这是三级引用

### 📏 分割线

```markdown
---
***
___
```

**效果：**

---

## 高级语法

### 🎨 HTML 标签

Markdown 支持内嵌 HTML 标签：

```html
<div style="color: red; text-align: center;">
  <h3>红色居中标题</h3>
  <p>这是一段红色的文字</p>
</div>
```

**效果：**
<div style="color: red; text-align: center;">
  <h3>红色居中标题</h3>
  <p>这是一段红色的文字</p>
</div>

### 🔖 锚点链接

```markdown
[跳转到顶部](#top)
[跳转到底部](#bottom)

<span id="bottom">这里是底部</span>
```

**效果：** [跳转到顶部](#top) | [跳转到底部](#bottom)

### 📝 脚注

```markdown
这里有一个脚注[^1]，还有另一个脚注[^note]。

[^1]: 这是第一个脚注
[^note]: 这是一个带名称的脚注
```

**效果：**
这里有一个脚注[^1]，还有另一个脚注[^note]。

### 🧮 数学公式

#### 行内公式

```markdown
爱因斯坦的质能方程：$E = mc^2$
```

**效果：** 爱因斯坦的质能方程：$E = mc^2$

#### 块级公式

```markdown
$$
\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &= \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} &= 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} &= \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} &= 0
\end{align}
$$
```

**效果：**

$$
\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &= \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} &= 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} &= \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} &= 0
\end{align}
$$

## 实用技巧

### 🔤 特殊字符

| 字符 | HTML 实体 | 显示 |
|------|-----------|------|
| 空格 | `&nbsp;` | &nbsp; |
| 小于号 | `&lt;` | &lt; |
| 大于号 | `&gt;` | &gt; |
| 与符号 | `&amp;` | &amp; |
| 引号 | `&quot;` | &quot; |

### 💬 注释

```markdown
<!-- 这是注释，不会显示在页面上 -->

[//]: # (这也是注释)
[comment]: <> (另一种注释方式)
```

### 🎯 转义字符

使用反斜杠 `\` 转义特殊字符：

```markdown
\*这里不会变成斜体\*
\#这里不会变成标题
```

**效果：** \*这里不会变成斜体\* \#这里不会变成标题

### 📱 响应式设计

```html
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <div style="flex: 1; min-width: 200px;">列1内容</div>
  <div style="flex: 1; min-width: 200px;">列2内容</div>
  <div style="flex: 1; min-width: 200px;">列3内容</div>
</div>
```

## 在线工具

### 📚 学习资源

- [Markdown 官方文档](https://daringfireball.net/projects/markdown/)
- [CommonMark 规范](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Markdown 中文指南](https://www.markdown.xyz/)

### 🛠️ 实用工具

- [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) - 表格生成器
- [Markdown to HTML](https://markdowntohtml.com/) - 在线转换工具
- [Mermaid Live Editor](https://mermaid.live/) - 流程图编辑器


## 🎉 总结

Markdown 是一个强大而简洁的文档格式化工具。掌握这些语法后，你可以：

1. ✍️ **高效写作** - 专注内容而非格式
2. 📝 **文档管理** - 版本控制友好
3. 🌐 **多平台发布** - 一次编写，多处使用
4. 🤝 **团队协作** - 标准化的文档格式

!!! tip "最佳实践"
    - 保持语法简洁，避免过度使用 HTML
    - 使用一致的格式风格
    - 适当使用空行增强可读性
    - 为图片添加描述性的 alt 文本
    - 使用有意义的链接文本

---

**参考资源：**

- [Markdown 官方文档](https://daringfireball.net/projects/markdown/)
- [菜鸟教程 - Markdown](https://www.runoob.com/markdown/md-tutorial.html)
- 感谢 [Yang-Xijie](https://github.com/Yang-Xijie/yang-xijie.github.io) 的原始教程

<span id="bottom">**文章结尾** | [返回顶部](#top) |  [基础语法](#_2) | [高级语法](#_18)</span>

[^1]: Markdown是一种纯文本标记语言，由John Gruber创建
[^note]: HyperText Markup Language 超文本标记语言

<style>
.markdown-guide-header {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  margin-bottom: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

[data-md-color-scheme="slate"] .markdown-guide-header {
  background: #1e293b;
  border-color: #334155;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.markdown-guide-header h1 {
  margin: 0 0 0.75rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  letter-spacing: -0.02em;
}

[data-md-color-scheme="slate"] .markdown-guide-header h1 {
  color: #f1f5f9;
}

.subtitle {
  font-size: 1.15rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

[data-md-color-scheme="slate"] .subtitle {
  color: #cbd5e1;
}

.guide-stats {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.stat-item {
  background: #ffffff;
  color: #475569;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

[data-md-color-scheme="slate"] .stat-item {
  background: #0f172a;
  color: #e2e8f0;
  border-color: #334155;
}

[data-md-color-scheme="slate"] .stat-item:hover {
  background: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .markdown-guide-header {
    padding: 2rem 1rem;
  }

  .markdown-guide-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .guide-stats {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .stat-item {
    width: 100%;
    max-width: 280px;
  }
}
</style>

**版权声明：**

Wcowin原创 未经允许不得擅自转载 否则一律追究责任