---
title: 5 分钟快速开始
date: 2025-01-22
authors:
  - name: Wcowin
    email: wcowin@qq.com
categories:
  - 快速开始
---

# 5 分钟快速开始 Zensical

> 从零到一，快速搭建你的 Zensical 博客

!!! info "官方文档"
    Zensical 官方网站: [https://zensical.org/](https://zensical.org/)  
    Zensical 官方文档: [https://zensical.org/docs/](https://zensical.org/docs/)
    我写的Zensical教程：https://wcowin.work/Zensical-Chinese-Tutorial/

## 第一步：环境准备

### 检查 Python 版本

Zensical 需要 Python 3.8 或更高版本。首先检查你的 Python 版本：

```bash
python3 --version
# 或
python --version
```

如果版本低于 3.8，请先升级 Python。

!!! tip "推荐版本"
    推荐使用 Python 3.9 或更高版本，以获得最佳性能和兼容性。

### 创建项目目录

选择一个合适的位置创建你的项目目录：

```bash
# 创建项目目录
mkdir my-zensical-site
cd my-zensical-site
```

## 第二步：安装 Zensical

Zensical 是用 Rust 和 Python 编写的，以 Python 包的形式发布。**强烈推荐使用 Python 虚拟环境**进行安装，避免依赖冲突。

### 使用 pip 安装（推荐）

=== "macOS / Linux"

    ```bash
    # 1. 创建虚拟环境
    python3 -m venv .venv
    
    # 2. 激活虚拟环境
    # 激活后，终端提示符前会显示 (.venv)
    source .venv/bin/activate
    
    # 3. 升级 pip（推荐）
    pip install --upgrade pip
    
    # 4. 安装 Zensical
    pip install zensical
    
    # 5. 验证安装
    zensical --version
    ```

=== "Windows"

    ```bash
    # 1. 创建虚拟环境
    python3 -m venv .venv
    
    # 2. 激活虚拟环境
    # 激活后，终端提示符前会显示 (.venv)
    .venv\Scripts\activate
    
    # 3. 升级 pip（推荐）
    pip install --upgrade pip
    
    # 4. 安装 Zensical
    pip install zensical
    
    # 5. 验证安装
    zensical --version
    ```

!!! warning "权限问题"
    如果遇到权限错误，可以尝试：
    - macOS/Linux: `pip install --user zensical`
    - 或使用 `sudo pip install zensical`（不推荐）
    
    详细解决方案请参考 [常见问题解答](../faq.md#权限问题)

### 使用 uv 安装（开发者推荐）

如果你是 Python 开发者，可能已经在使用 [uv](https://docs.astral.sh/uv/) 作为包管理器：

```bash
# 初始化项目
uv init

# 添加 Zensical
uv add zensical

# 验证安装
uv run zensical --version
```

## 第三步：创建项目

在项目目录中运行以下命令创建新的 Zensical 项目：

```bash
# 确保虚拟环境已激活
# 如果还没激活，先执行: source .venv/bin/activate (macOS/Linux)
# 或 .venv\Scripts\activate (Windows)

# 创建新项目
zensical new .
```

!!! tip "命令说明"
    `zensical new .` 中的 `.` 表示在当前目录创建项目。如果你想在子目录创建，可以指定路径：
    
    ```bash
    zensical new my-site  # 在 my-site 目录创建
    ```

### 检查项目结构

创建完成后，检查一下目录结构是否正确：

```bash
# 查看目录结构
tree -a
# 如果没有 tree 命令，可以使用:
# macOS: ls -la
# Windows: dir
```

应该看到以下结构：

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions 工作流
├── docs/
│   ├── index.md            # 网站首页
│   └── markdown.md         # Markdown 示例
└── zensical.toml           # 配置文件
```

!!! tip "使用模板项目（可选）"
    如果你想使用更完整的模板，可以克隆本教程的项目：
    
    ```bash
    # 克隆模板项目
    git clone https://github.com/Wcowin/Zensical-Chinese-Tutorial.git my-blog
    cd my-blog
    
    # 安装依赖
    pip install zensical
    
    # 启动开发服务器测试
    zensical serve
    ```
    
    模板项目包含了完整的配置示例和博客系统设置。

## 第四步：配置项目

打开 `zensical.toml` 文件，这是 Zensical 的核心配置文件。

### 基础配置

Zensical 提供了许多配置选项，都有合理的默认值。`site_name` 是**唯一必需的设置**：

```toml title="zensical.toml"
[project]
site_name = "我的博客"
```

### 推荐配置

虽然 `site_name` 就足够了，但强烈建议同时设置以下配置：

```toml title="zensical.toml"
[project]
# 基本信息（必需）
site_name = "我的博客"

# 网站 URL（强烈推荐！）
# 这是即时导航、即时预览、自定义错误页面的前提
site_url = "https://example.com"

# 网站描述（可选，但推荐）
site_description = "我的 Zensical 博客"

# 作者信息（可选）
site_author = "你的名字"

# 文档目录（默认：docs）
docs_dir = "docs"

# 输出目录（默认：site）
site_dir = "site"
```

### 主题配置

在父表配置完成后，添加主题配置：

```toml title="zensical.toml"
# ... 上面的 [project] 配置 ...

# 主题配置（在父表配置之后）
[project.theme]
variant = "modern"    # 主题变体：modern（现代）或 classic（经典）
language = "zh"       # 界面语言：中文
```

!!! warning "配置顺序很重要"
    在 TOML 配置文件中，**必须先配置所有 `[project]` 的键值对，然后才能声明子表**（如 `[project.theme]`）。不能在子表之后回到父表添加配置。
    
    详细说明请参考 [配置详解](../tutorials/configuration.md#重要配置顺序规则)。

### 完整配置示例

以下是一个完整的基础配置示例：

```toml title="zensical.toml"
[project]
site_name = "我的博客"
site_url = "https://example.com"
site_description = "我的 Zensical 博客"
site_author = "你的名字"
docs_dir = "docs"
site_dir = "site"

[project.theme]
variant = "modern"
language = "zh"
```

保存配置文件后，就可以继续下一步了。

## 第五步：启动开发服务器

Zensical 内置了 Web 服务器，可以在编写时实时预览。服务器会在你修改源文件时自动重建网站。

### 启动服务器

在项目目录下运行：

```bash
# 确保虚拟环境已激活
# macOS/Linux: source .venv/bin/activate
# Windows: .venv\Scripts\activate

# 启动开发服务器
zensical serve
```

你会看到类似以下的输出：

```
Serving /Users/wangkewen/Zensical-Chinese-Tutorial/site on http://localhost:8000
Build started
```

### 访问网站

在浏览器中打开 [http://localhost:8000](http://localhost:8000) 即可看到你的网站。

!!! tip "实时预览"
    - 修改 `docs/` 目录下的 Markdown 文件后，网站会自动刷新
    - 修改 `zensical.toml` 配置文件后，需要手动刷新浏览器
    - 按 `Ctrl+C` 可以停止服务器

!!! warning "端口占用"
    如果 8000 端口被占用，可以使用 `--port` 参数指定其他端口：
    
    ```bash
    zensical serve --port 8001
    ```

## 第六步：创建第一篇文章（可选）

如果你想使用博客功能，需要先配置博客插件，然后创建文章。

### 配置博客插件

在 `zensical.toml` 中添加博客插件配置：

```toml title="zensical.toml"
# ... 之前的配置 ...

# 博客插件配置（在父表配置之后）
[project.plugins.blog]
post_date_format = "full"
post_readtime = true
post_readtime_words_per_minute = 265  # 中文适配
draft = true
```

### 创建博客目录结构

```bash
# 创建博客目录
mkdir -p docs/blog/posts

# 创建博客首页（必需！）
touch docs/blog/index.md
```

在 `docs/blog/index.md` 中添加：

```markdown title="docs/blog/index.md"
# 博客

欢迎来到我的博客！
```

### 创建第一篇文章

在 `docs/blog/posts/` 目录下创建文件 `2025-01-22-hello-world.md`：

```markdown title="docs/blog/posts/2025-01-22-hello-world.md"
---
title: Hello World
date: 2025-01-22
authors:
  - name: 你的名字
    email: your@email.com
categories:
  - 开始
---

# Hello World

这是我的第一篇 Zensical 博客文章！

## 特点

- ✅ 简单易用
- ✅ 功能强大
- ✅ 性能优异

## 下一步

继续阅读 [博客系统完全指南](../tutorials/blog-tutorial.md) 了解更多功能。
```

!!! warning "重要"
    - `docs/blog/index.md` 文件是**必需的**，没有这个文件博客功能无法正常工作
    - 文章文件名推荐使用 `YYYY-MM-DD-文章标题.md` 格式

保存文件后，网站会自动刷新，你就能看到新文章了！

!!! tip "查看博客"
    访问 `http://localhost:8000/blog/` 即可查看博客列表。

## 第七步：构建网站

当你完成编辑后，可以从 Markdown 文件构建静态网站：

```bash
# 构建网站
zensical build

# 或使用清理构建（推荐，清除旧文件）
zensical build --clean
```

### 检查构建结果

构建完成后，检查 `site/` 目录：

```bash
# 查看构建结果
ls -la site/
# Windows: dir site
```

应该看到生成的 HTML 文件：

```
site/
├── index.html
├── blog/
│   ├── index.html
│   └── posts/
│       └── 2025-01-22-hello-world/
│           └── index.html
└── assets/
    └── ...
```

!!! tip "构建说明"
    - 生成的文件位于 `site/` 目录中
    - 网站是完全独立的静态文件，不需要数据库或服务器
    - 可以直接部署到 GitHub Pages、Netlify、CDN 或你自己的 Web 空间
    - 使用 `--clean` 参数可以清除旧的构建文件，确保构建干净

### 本地预览构建结果（可选）

如果你想预览构建后的网站：

```bash
# 使用 Python 内置服务器预览
cd site
python3 -m http.server 8001
# Windows: python -m http.server 8001
```

然后在浏览器中访问 `http://localhost:8001`

## 完成！🎉

恭喜！你已经成功创建了一个 Zensical 博客！

### 验证项目结构

最后，让我们确认一下完整的项目结构：

```bash
# 查看完整目录结构
tree -a
# 如果没有 tree 命令，使用: find . -type f | head -20
```

应该看到类似这样的结构：

```
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── .venv/              # 虚拟环境（如果使用）
├── docs/
│   ├── index.md
│   ├── markdown.md
│   └── blog/           # 博客目录（如果创建了）
│       ├── index.md
│       └── posts/
│           └── 2025-01-22-hello-world.md
├── site/               # 构建输出目录（运行 build 后生成）
└── zensical.toml       # 配置文件
```

### 接下来可以做什么？

1. **编写更多文章** - 在 `docs/blog/posts/` 中添加更多 Markdown 文件
2. **自定义样式** - 创建 `docs/stylesheets/extra.css` 自定义样式
3. **添加页面** - 在 `docs/` 中创建新的 Markdown 文件
4. **配置导航** - 在 `zensical.toml` 中配置 `nav` 导航菜单
5. **部署到线上** - 参考 [GitHub Pages 部署指南](github-pages.md)

### 常用命令速查

```bash
# 启动开发服务器
zensical serve

# 启动开发服务器（指定端口）
zensical serve --port 8001

# 构建静态网站
zensical build

# 清理构建（清除旧文件）
zensical build --clean

# 查看帮助
zensical --help

# 查看版本
zensical --version
```

### 推荐阅读

- ⚙️ [项目配置详解](configuration.md) - 完整的配置选项说明
- 🚀 [GitHub Pages 部署](github-pages.md) - 将网站部署到线上

### 遇到问题？

- 📋 查看 [常见问题解答](../faq.md)
- 📚 访问 [Zensical 官方文档](https://zensical.org/docs/)
- 💬 在 [GitHub Issues](https://github.com/Wcowin/Zensical-Chinese-Tutorial/issues) 提问

---

**祝你使用愉快！** 🎉
