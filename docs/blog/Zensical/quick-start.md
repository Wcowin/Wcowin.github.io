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

> 从零到一，快速搭建你的 Zensical 文档站点

!!! info "官方文档"
    Zensical 官方网站: [https://zensical.org/](https://zensical.org/)  
    Zensical 官方文档: [https://zensical.org/docs/](https://zensical.org/docs/)

## 第一步：环境准备

### 检查 Python 版本

Zensical 需要 **Python 3.10** 或更高版本（以 [PyPI 当前要求](https://pypi.org/project/zensical/) 为准）。首先检查你的 Python 版本：

```bash
python3 --version
# 或
python --version
```

如果版本低于 3.10，请先升级 Python。

!!! tip "推荐版本"
    推荐使用 Python 3.11 或更高版本，以获得最佳性能和兼容性。

### 创建项目目录

选择一个合适的位置创建你的项目目录：

```bash
# 创建项目目录
mkdir my-zensical-site
cd my-zensical-site
```

## 第二步：安装 Zensical

Zensical 是用 Rust 和 Python 编写的，以 [Python 包](https://pypi.org/project/zensical) 形式发布。安装方式有三种：**pip**（推荐）、**uv**、**Docker**，与 [官方 Get started](https://zensical.org/docs/get-started/) 一致。使用 pip 或 uv 时**强烈推荐先创建 Python 虚拟环境**，避免依赖冲突。

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
    python -m venv .venv
    
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

!!! warning "权限问题 / Permission denied"
    如果遇到权限错误，通常是因为**没有在虚拟环境中安装**。请先确认已激活 `.venv`，再执行 `pip install zensical`。
    
    如果你确实要安装到用户目录（不推荐用于项目开发），可使用：
    
    - macOS/Linux: `pip install --user zensical`
    
    更多说明见 [FAQ - 权限问题](../faq.md#权限问题)。

### 使用 uv 安装（开发者推荐）

如果你是 Python 开发者，可能已经在使用 [uv](https://docs.astral.sh/uv/) 作为包管理器：

```bash
# 初始化项目（若目录中尚未有 Python 项目配置）
uv init

# 添加 Zensical（推荐作为开发依赖）
uv add --dev zensical

# 验证安装
uv run zensical --version
```

!!! tip "已有 uv 项目？"
    如果你已经有 `pyproject.toml` / `uv.lock`，通常可以跳过 `uv init`，直接执行 `uv add --dev zensical`。

### 使用 Docker 安装

若已熟悉 Docker，可直接使用官方镜像，无需在宿主机安装 Python 或虚拟环境：

- **镜像**：[zensical/zensical](https://hub.docker.com/r/zensical/zensical)（Docker Hub）
- **用法**：在项目根目录（含 `zensical.toml` 或 `mkdocs.yml`）下运行构建或预览（与 Docker Hub 示例一致）：

```bash
# 拉取镜像（可选）
docker pull zensical/zensical

# 预览（默认等价于 zensical serve）
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs zensical/zensical

# 构建（等价于 zensical build）
docker run --rm -it -v ${PWD}:/docs zensical/zensical build
```

!!! info "何时用 Docker"
    适合 CI/CD、无本地 Python 环境或希望环境隔离的场景。日常开发仍推荐 pip/uv + 虚拟环境，便于调试与扩展。

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

!!! warning "建议在空目录执行"
    `zensical new .` 可能会写入/覆盖当前目录中的文件。为避免误覆盖，建议在一个**空目录**里执行，或用 `zensical new my-site` 新建到子目录。

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
├── docs/
│   ├── index.md            # 网站首页
│   └── markdown.md         # Markdown 示例
└── zensical.toml           # 配置文件
```

!!! tip "使用模板项目（可选）"
    如果你想使用更完整的模板，可以克隆本教程的项目：
    
    ```bash
    # 克隆模板项目
    git clone https://github.com/Wcowin/Zensical-Chinese-Tutorial.git my-site
    cd my-site
    
    # （推荐）创建并激活虚拟环境
    python3 -m venv .venv
    source .venv/bin/activate
    
    # 安装依赖（本仓库有额外依赖，如 Markdown 扩展等）
    pip install -r requirements.txt
    
    # 启动开发服务器测试
    zensical serve
    ```
    
    模板项目包含了更完整的配置示例（含部分插件/博客相关示例）。

## 第四步：配置项目

打开 `zensical.toml` 文件，这是 Zensical 的核心配置文件。

### 基础配置

Zensical 提供了许多配置选项，都有合理的默认值。`site_name` 是**唯一必需的设置**：

```toml title="zensical.toml"
[project]
site_name = "我的网站"
```

### 推荐配置

虽然 `site_name` 就足够了，但强烈建议同时设置以下配置：

```toml title="zensical.toml"
[project]
# 基本信息（必需）
site_name = "我的网站"

# 网站 URL（强烈推荐！）
# 这是即时导航、即时预览、自定义错误页面的前提
site_url = "https://example.com"

# 网站描述（可选，但推荐）
site_description = "我的 Zensical 站点"

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
site_name = "我的网站"
site_url = "https://example.com"
site_description = "我的 Zensical 站点"
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
Serving on http://localhost:8000
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

## 第六步：添加第一篇文档页面（可选）

Zensical 的内容源文件默认都放在 `docs/` 目录下。要“添加一篇文章/页面”，本质上就是**新增一个 Markdown 文件**（必要时再把它加入导航）。

### 创建页面文件

例如，新建 `docs/notes/hello-world.md`：

```bash
mkdir -p docs/notes
touch docs/notes/hello-world.md
```

在 `docs/notes/hello-world.md` 中写入内容：

```markdown title="docs/notes/hello-world.md"
# Hello World

这是我的第一篇文档页面！

- 支持 Markdown
- 保存后会自动重建并刷新
```

保存后，开发服务器会自动刷新。默认情况下（`use_directory_urls = true`），你可以访问：

- `http://localhost:8000/notes/hello-world/`

!!! tip "文件命名建议"
    文件名建议使用小写 + 连字符（如 `hello-world.md`），这样生成的 URL 更清晰。

### （可选）把页面加入导航

如果你希望它出现在左侧目录/顶部导航中，需要在 `zensical.toml` 的 `[project]` 里，把文件路径加入 `nav`。

示例（添加一个新的“笔记”分组）：

```toml title="zensical.toml"
nav = [
  # ... 原有导航 ...
  { "笔记" = [
    { "Hello World" = "notes/hello-world.md" },
  ] },
]
```

!!! tip "不加导航也能访问"
    即使不写进 `nav`，页面仍会被构建。你也可以在其他页面里用链接引用它，例如在 `docs/index.md` 添加：
    
    `- [Hello World](notes/hello-world.md)`

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
├── notes/
│   └── hello-world/
│       └── index.html
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

恭喜！你已经成功创建了一个 Zensical 站点！

### 验证项目结构

最后，让我们确认一下完整的项目结构：

```bash
# 查看完整目录结构
tree -a
# 如果没有 tree 命令：
# - macOS/Linux: ls -la
# - Windows: dir
```

应该看到类似这样的结构：

```
.
├── .venv/              # 虚拟环境（如果使用）
├── docs/
│   ├── index.md
│   ├── markdown.md
│   └── notes/
│       └── hello-world.md
├── site/               # 构建输出目录（运行 build 后生成）
├── zensical.toml       # 配置文件
└── .github/            # （可选）如需 GitHub Actions 部署
    └── workflows/
        └── docs.yml
```

### 接下来可以做什么？

1. **编写更多页面** - 在 `docs/` 中添加更多 Markdown 文件
2. **组织内容结构** - 用子目录管理内容（如 `docs/notes/`、`docs/tutorials/`）
3. **配置导航** - 在 `zensical.toml` 中配置 `nav` 导航菜单
4. **自定义样式** - 创建 `docs/stylesheets/extra.css` 自定义样式
5. **部署到线上** - 参考 [GitHub Pages 部署指南](../blog/deployment/github-pages.md)

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

- 📖 [Zensical 博客系统完全指南](../tutorials/blog-tutorial.md) - （可选）了解博客相关能力
- ⚙️ [项目配置详解](../tutorials/configuration.md) - 完整的配置选项说明
- 🎨 [主题定制指南](../tutorials/theme-customization.md) - 自定义网站外观
- 🚀 [GitHub Pages 部署](../blog/deployment/github-pages.md) - 将网站部署到线上

### 遇到问题？

- 📋 查看 [常见问题解答](../faq.md)
- 📚 访问 [Zensical 官方文档](https://zensical.org/docs/)
- 💬 在 [GitHub Issues](https://github.com/Wcowin/Zensical-Chinese-Tutorial/issues) 提问

---

**祝你使用愉快！** 🎉
