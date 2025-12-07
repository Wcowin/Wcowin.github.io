# zensical.toml 配置详解

> 全面了解 Zensical 的配置选项

## 配置文件格式

Zensical 项目通过 `zensical.toml` 文件进行配置。如果你使用 `zensical new` 命令创建项目，该文件会自动生成，并包含带注释的示例配置。

### 为什么选择 TOML？

[TOML 文件格式](https://toml.io/) 专门设计为易于扫描和理解。我们选择 TOML 而不是 YAML，因为它避免了 YAML 的一些问题：

- **YAML 使用缩进表示结构**，这使得缩进错误特别容易出现且难以定位。在 TOML 中，空白主要是样式选择。
- **在 YAML 中，值不需要转义**，这可能导致歧义，例如 `no` 可能被解释为字符串或布尔值。TOML 要求所有字符串都要加引号。

## 从 MkDocs 过渡

为了便于从 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 过渡，Zensical 可以原生读取 `mkdocs.yml` 配置文件。但是，我们建议新项目使用 `zensical.toml` 文件。

!!! info "配置文件支持"
    由于 Zensical 是由 Material for MkDocs 的创建者构建的，我们支持通过 `mkdocs.yml` 文件进行配置，作为过渡机制，使现有项目能够平滑迁移到 Zensical。对 `mkdocs.yml` 的支持将始终保持，但最终会移出核心。

## 项目作用域

`zensical.toml` 配置以声明项目作用域的行开始：

```toml
[project]
```

目前，所有设置都包含在此作用域内。随着 Zensical 的发展，我们将引入额外的作用域，并在适当的地方将设置移出项目作用域。当然，我们会提供自动重构，因此无需手动迁移。

## ⚠️ 重要：配置顺序规则

在 TOML 配置文件中，**配置顺序非常重要**。必须遵循以下规则：

### 正确的配置顺序

1. **先声明父表** `[project]`
2. **然后配置所有直接属于 `[project]` 的键值对**
   - `site_name`, `site_url`, `site_description` 等基本信息
   - `repo_url`, `repo_name`, `edit_uri` 等仓库配置
   - `extra_javascript`, `extra_css` 等额外资源
   - `nav` 导航配置
   - 其他所有直接属于 `[project]` 的配置
3. **最后才声明子表**
   - `[project.theme]` - 主题配置
   - `[project.extra]` - 额外配置
   - `[project.plugins.xxx]` - 插件配置
   - `[project.markdown_extensions]` - Markdown 扩展配置

### 为什么顺序很重要？

在 TOML 中，一旦声明了子表（如 `[project.theme]`），当前作用域就从 `[project]` 变成了 `[project.theme]`。之后的所有键值对都属于最后声明的表。

**不能在声明子表后再回到父表添加键！**

### 正确示例

```toml
[project]
# ✅ 所有父表的配置都在这里
site_name = "我的网站"
site_url = "https://example.com"
repo_url = "https://github.com/user/repo"
extra_javascript = ["script.js"]
extra_css = ["style.css"]
nav = [
    { "主页" = "index.md" },
]

# ✅ 父表配置完成后，才声明子表
[project.theme]
variant = "modern"
language = "zh"

[project.extra]
generator = true

[project.plugins.blog]
post_date_format = "full"
```

### ❌ 错误示例

```toml
[project]
site_name = "我的网站"

[project.theme]
variant = "modern"

# ❌ 错误！不能在子表之后回到父表添加键
site_url = "https://example.com"  # 这会导致解析错误！
```

### 常见错误

1. **在子表后添加父表配置** - 会导致 TOML 解析错误
2. **子表声明顺序混乱** - 虽然不会报错，但会让配置文件难以阅读和维护
3. **忘记关闭父表配置** - 在声明子表前，确保所有父表配置都已完成

!!! warning "配置顺序错误会导致解析失败"
    如果配置顺序不正确，Zensical 可能无法正确解析配置文件，导致构建失败。请务必遵循上述顺序规则。

## 主题变体

Zensical 提供两种主题变体：**modern**（现代）和 **classic**（经典），默认为 modern。classic 主题完全匹配 Material for MkDocs 的外观和感觉，而 modern 主题提供全新的设计。

如果你来自 Material for MkDocs 并希望保持其外观，或基于其外观自定义网站，可以切换到 classic 主题变体：

=== "zensical.toml"

    ```toml
    [project.theme]
    variant = "classic"
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      variant: classic
    ```

!!! tip "自定义提示"
    Zensical 的 HTML 结构在两种主题变体中都与 Material for MkDocs 匹配。这意味着你现有的 CSS 和 JavaScript 自定义应该可以在任一主题变体中工作。

## 基础设置

让我们从最基础的配置开始，逐步构建一个完整的配置文件。

### site_name

**必需设置** - 提供网站名称，将显示在浏览器标签页、页面标题和导航栏中。

=== "zensical.toml"

    ```toml
    [project]
    site_name = "我的 Zensical 项目"
    ```

=== "mkdocs.yml"

    ```yaml
    site_name: 我的 Zensical 项目
    ```

**实际效果：**
- 浏览器标签页显示：`我的 Zensical 项目`
- 页面标题显示：`我的 Zensical 项目 - 页面名称`
- 导航栏左上角显示：`我的 Zensical 项目`

!!! note "关于 site_name"
    `site_name` 目前是必需的，因为 Zensical 替换的静态网站生成器 MkDocs 需要它。我们计划在未来版本中使此设置可选。

### site_url

**强烈推荐** - 网站的完整 URL，包括协议（http:// 或 https://）和域名。

=== "zensical.toml"

    ```toml
    [project]
    site_name = "我的 Zensical 项目"
    site_url = "https://example.com"
    ```

=== "mkdocs.yml"

    ```yaml
    site_name: 我的 Zensical 项目
    site_url: https://example.com
    ```

**为什么需要 site_url？**

`site_url` 是以下功能的前提：

1. **即时导航** - 需要知道网站的完整 URL 才能正确工作
2. **即时预览** - 预览功能依赖正确的 URL
3. **自定义错误页面** - 404 页面需要知道网站 URL
4. **RSS 订阅** - RSS 链接需要完整的 URL
5. **社交分享** - 分享功能需要正确的 URL

!!! warning "重要"
    如果使用即时导航功能，`site_url` 是**必需的**，否则即时导航将无法正常工作。

**示例：**

```toml
# 本地开发
site_url = "http://localhost:8000"

# GitHub Pages
site_url = "https://username.github.io"

# 自定义域名
site_url = "https://example.com"
```

### site_description

**可选** - 网站的描述，用于 SEO 和社交媒体分享。

=== "zensical.toml"

    ```toml
    [project]
    site_name = "我的 Zensical 项目"
    site_url = "https://example.com"
    site_description = "一个使用 Zensical 构建的文档网站"
    ```

=== "mkdocs.yml"

    ```yaml
    site_name: 我的 Zensical 项目
    site_url: https://example.com
    site_description: 一个使用 Zensical 构建的文档网站
    ```

**实际效果：**
- 在 HTML `<meta name="description">` 标签中
- 社交媒体分享时显示
- 搜索引擎结果中可能显示

!!! tip "SEO 建议"
    建议设置一个简洁、有吸引力的描述（50-160 个字符），有助于提高搜索引擎排名。

### site_author

**可选** - 网站作者名称。

=== "zensical.toml"

    ```toml
    [project]
    site_name = "我的 Zensical 项目"
    site_author = "张三"
    ```

=== "mkdocs.yml"

    ```yaml
    site_name: 我的 Zensical 项目
    site_author: 张三
    ```

**实际效果：**
- 在 HTML `<meta name="author">` 标签中
- 页脚可能显示作者信息（取决于主题配置）

### copyright

**可选** - 版权声明，显示在页面页脚。

=== "zensical.toml"

    ```toml
    [project]
    copyright = "Copyright &copy; 2025 张三"
    ```

=== "mkdocs.yml"

    ```yaml
    copyright: "Copyright &copy; 2025 张三"
    ```

**实际效果：**
- 显示在页面左下角页脚
- 支持 HTML 标签（如 `&copy;` 显示为 ©）

**示例：**

```toml
# 纯文本
copyright = "Copyright 2025 张三"

# HTML 格式
copyright = "Copyright &copy; 2025 张三"

# 多行（使用多行字符串）
copyright = """
Copyright &copy; 2025 张三
All Rights Reserved
"""
```

### docs_dir 和 site_dir

**可选** - 文档目录和输出目录配置。

=== "zensical.toml"

    ```toml
    [project]
    docs_dir = "docs"      # 文档目录，默认：docs
    site_dir = "site"      # 输出目录，默认：site
    ```

=== "mkdocs.yml"

    ```yaml
    docs_dir: docs
    site_dir: site
    ```

**说明：**
- `docs_dir`：存放 Markdown 源文件的目录
- `site_dir`：构建后生成的静态网站文件目录

!!! tip "目录结构示例"
    ```
    项目根目录/
    ├── docs/          # 源文件目录（docs_dir）
    │   ├── index.md
    │   └── blog/
    ├── site/          # 输出目录（site_dir，运行 build 后生成）
    │   ├── index.html
    │   └── assets/
    └── zensical.toml
    ```

### 完整的基础配置示例

以下是一个完整的基础配置示例，包含了所有推荐的基础设置：

```toml title="zensical.toml - 完整基础配置"
[project]
# ===== 必需配置 =====
site_name = "我的 Zensical 项目"

# ===== 强烈推荐 =====
site_url = "https://example.com"  # 即时导航等功能需要

# ===== 推荐配置 =====
site_description = "一个使用 Zensical 构建的文档网站"
site_author = "张三"
copyright = "Copyright &copy; 2025 张三"

# ===== 目录配置（可选，有默认值）=====
docs_dir = "docs"      # 文档目录，默认：docs
site_dir = "site"      # 输出目录，默认：site
use_directory_urls = true  # 使用目录形式的 URL，默认：true
```

!!! tip "验证配置"
    配置完成后，运行以下命令验证：
    
    ```bash
    # 启动开发服务器
    zensical serve
    
    # 检查配置是否正确
    zensical build
    ```
    
    如果配置有误，会显示具体的错误信息。

### extra

`extra` 配置选项用于存储模板使用的任意键值对。如果你覆盖模板，可以使用这些值来自定义行为。

=== "zensical.toml"

    ```toml
    [project.extra]
    key = "value"
    analytics = "UA-XXXXXXXX-X"
    ```

=== "mkdocs.yml"

    ```yaml
    extra:
      key: value
      analytics: UA-XXXXXXXX-X
    ```

### use_directory_urls

控制文档网站的目录结构，从而控制用于链接到页面的 URL 格式。

=== "zensical.toml"

    ```toml
    [project]
    use_directory_urls = true  # 默认值
    ```

=== "mkdocs.yml"

    ```yaml
    use_directory_urls: true
    ```

!!! info "离线使用"
    在构建离线使用时，此选项会自动设置为 `false`，以便可以从本地文件系统浏览文档，而无需 Web 服务器。

## 主题配置

### language

设置网站的语言。

=== "zensical.toml"

    ```toml
    [project.theme]
    language = "zh"  # 中文
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      language: zh
    ```

### features

启用或禁用主题功能。这是一个数组，可以同时启用多个功能。

**配置示例：**

```toml
[project.theme]
features = [
    # 导航相关
    "navigation.instant",           # 即时导航（推荐）
    "navigation.instant.prefetch",  # 预加载（推荐，提升性能）
    "navigation.tracking",          # 锚点跟踪
    "navigation.tabs",              # 导航标签
    "navigation.sections",          # 导航部分
    "navigation.top",               # 返回顶部按钮
    
    # 搜索相关
    "search.suggest",               # 搜索建议
    "search.highlight",             # 搜索高亮
    
    # 内容相关
    "content.code.copy",            # 代码复制按钮（推荐）
]
```

**常用功能说明：**

| 功能 | 说明 | 推荐 |
|------|------|------|
| `navigation.instant` | 即时导航，无需刷新页面 | ✅ 强烈推荐 |
| `navigation.instant.prefetch` | 预加载链接，提升性能 | ✅ 推荐 |
| `navigation.tracking` | URL 自动更新为当前锚点 | ✅ 推荐 |
| `navigation.tabs` | 一级导航显示为顶部标签 | ✅ 推荐 |
| `navigation.top` | 返回顶部按钮 | ✅ 推荐 |
| `search.suggest` | 搜索时显示建议 | ✅ 推荐 |
| `content.code.copy` | 代码块复制按钮 | ✅ 强烈推荐 |

!!! warning "即时导航需要 site_url"
    如果启用 `navigation.instant`，必须设置 `site_url`，否则即时导航将无法正常工作。

=== "zensical.toml"

    ```toml
    [project.theme]
    features = [
        "navigation.instant",
        "navigation.instant.prefetch",
        "navigation.tracking",
        "navigation.tabs",
        "navigation.top",
        "search.suggest",
        "content.code.copy",
    ]
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      features:
        - navigation.instant
        - navigation.instant.prefetch
        - navigation.tracking
        - navigation.tabs
        - navigation.top
        - search.suggest
        - content.code.copy
    ```

### palette

配置颜色主题，支持明暗模式切换。

**基础配置示例：**

```toml
# 日间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: light)"
scheme = "default"
primary = "indigo"    # 主色调
accent = "indigo"     # 强调色

# 夜间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: dark)"
scheme = "slate"
primary = "indigo"
accent = "indigo"
```

**完整配置示例（包含自动模式）：**

```toml
# 自动模式（跟随系统）
[[project.theme.palette]]
media = "(prefers-color-scheme)"
toggle = { icon = "material/link", name = "关闭自动模式" }

# 日间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: light)"
scheme = "default"
primary = "indigo"
accent = "indigo"
toggle = { icon = "material/toggle-switch", name = "切换至夜间模式" }

# 夜间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: dark)"
scheme = "slate"
primary = "indigo"
accent = "indigo"
toggle = { icon = "material/toggle-switch-off-outline", name = "切换至日间模式" }
```

**支持的主色调：**

- `red`, `pink`, `purple`, `deep-purple`
- `indigo`（推荐）, `blue`, `light-blue`, `cyan`
- `teal`, `green`, `light-green`, `lime`
- `yellow`, `amber`, `orange`, `deep-orange`
- `brown`, `grey`, `blue-grey`, `black`, `white`

!!! tip "选择颜色"
    - `indigo` 和 `blue` 是最常用的主色调
    - `primary` 影响导航栏、链接等主要元素
    - `accent` 影响按钮、高亮等强调元素

=== "zensical.toml"

    ```toml
    [[project.theme.palette]]
    media = "(prefers-color-scheme: light)"
    scheme = "default"
    primary = "indigo"
    accent = "indigo"
    
    [[project.theme.palette]]
    media = "(prefers-color-scheme: dark)"
    scheme = "slate"
    primary = "indigo"
    accent = "indigo"
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      palette:
        - scheme: default
          primary: indigo
          accent: indigo
        - scheme: slate
          primary: indigo
          accent: indigo
    ```

### font

配置字体。

=== "zensical.toml"

    ```toml
    [project.theme.font]
    text = "Roboto"
    code = "Roboto Mono"
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      font:
        text: Roboto
        code: Roboto Mono
    ```

### logo 和 favicon

设置网站 logo 和 favicon。

=== "zensical.toml"

    ```toml
    [project.theme]
    logo = "assets/logo.png"
    favicon = "assets/favicon.png"
    ```

=== "mkdocs.yml"

    ```yaml
    theme:
      logo: assets/logo.png
      favicon: assets/favicon.png
    ```

## 插件配置

### 博客插件

=== "zensical.toml"

    ```toml
    [project.plugins.blog]
    post_date_format = "full"
    post_url_format = "{date}/{slug}"
    post_readtime = true
    post_readtime_words_per_minute = 265
    draft = true
    ```

=== "mkdocs.yml"

    ```yaml
    plugins:
      - blog:
          enabled: true
          blog_dir: blog
          post_date_format: full
          post_url_format: "{date}/{slug}"
          post_readtime: true
          post_readtime_words_per_minute: 265
          draft: true
    ```

### 搜索插件

=== "zensical.toml"

    ```toml
    [project.plugins.search]
    lang = ["zh", "en"]
    separator = '[\s\-\.]+'  # 中文优化：'[\s\u200b\-]'
    ```

=== "mkdocs.yml"

    ```yaml
    plugins:
      - search:
          enabled: true
          lang:
            - zh
            - en
          separator: '[\s\-\.]+'
    ```

### 标签插件

=== "zensical.toml"

    ```toml
    [project.plugins.tags]
    tags_file = "tags.md"
    ```

=== "mkdocs.yml"

    ```yaml
    plugins:
      - tags:
          enabled: true
          tags_file: tags.md
    ```

## 导航配置

### nav

定义网站的导航结构。

#### 基本用法

=== "zensical.toml"

    ```toml
    [project]
    nav = [
        { "主页" = "index.md" },
        { "快速开始" = "quick-start.md" },
        { "配置" = "configuration.md" },
    ]
    ```

=== "mkdocs.yml"

    ```yaml
    nav:
      - 主页: index.md
      - 快速开始: quick-start.md
      - 配置: configuration.md
    ```

**实际效果：**
- 导航栏显示三个顶级菜单项
- 点击后跳转到对应页面

#### 嵌套导航（导航分组）

创建多层级的导航结构，将相关页面组织在一起：

=== "zensical.toml"

    ```toml
    [project]
    nav = [
        { "主页" = "index.md" },
        { "快速开始" = [
            { "5 分钟快速开始" = "getting-started/quick-start.md" },
            { "从 MkDocs 迁移" = "getting-started/migration.md" },
        ] },
        { "核心教程" = [
            { "配置详解" = "tutorials/configuration.md" },
            { "主题定制" = "tutorials/theme-customization.md" },
        ] },
    ]
    ```

=== "mkdocs.yml"

    ```yaml
    nav:
      - 主页: index.md
      - 快速开始:
          - 5 分钟快速开始: getting-started/quick-start.md
          - 从 MkDocs 迁移: getting-started/migration.md
      - 核心教程:
          - 配置详解: tutorials/configuration.md
          - 主题定制: tutorials/theme-customization.md
    ```

**实际效果：**
- "快速开始" 和 "核心教程" 显示为可展开的分组
- 点击分组名称展开子菜单
- 子菜单项点击后跳转到对应页面

#### 外部链接

导航项也可以指向外部 URL，任何无法解析为 Markdown 文件的字符串都会被当作 URL 处理：

=== "zensical.toml"

    ```toml
    [project]
    nav = [
        { "主页" = "index.md" },
        { "GitHub 仓库" = "https://github.com/zensical/zensical" },
        { "个人博客" = "https://wcowin.work/" },
    ]
    ```

=== "mkdocs.yml"

    ```yaml
    nav:
      - 主页: index.md
      - GitHub 仓库: https://github.com/zensical/zensical
      - 个人博客: https://wcowin.work/
    ```

**实际效果：**
- 外部链接在新标签页中打开
- 可以混合使用内部页面和外部链接

#### 完整配置示例

本教程实际使用的完整导航配置：

```toml
[project]
nav = [
    { "主页" = "index.md" },
    { "快速开始" = [
        { "5 分钟快速开始" = "getting-started/quick-start.md" },
        { "从 MkDocs 迁移" = "getting-started/migration.md" },
    ] },
    { "核心教程" = [
        { "zensical.toml 配置详解" = "tutorials/configuration.md" },
        { "主题定制指南" = "tutorials/theme-customization.md" },
        { "Markdown 扩展使用" = "tutorials/markdown-extensions.md" },
        { "Zensical 博客系统完全指南" = "tutorials/blog-tutorial.md" },
    ] },
    { "插件系统" = [
        { "博客插件详解" = "blog/plugins/blog.md" },
        { "搜索插件配置" = "blog/plugins/search.md" },
        { "标签插件使用" = "blog/plugins/tags.md" },
        { "RSS 插件配置" = "blog/plugins/rss.md" },
    ] },
    { "部署指南" = [
        { "GitHub Pages 部署（推荐）" = "blog/deployment/github-pages.md" },
        { "Netlify 部署" = "blog/deployment/netlify.md" },
        { "GitLab Pages 部署" = "blog/deployment/gitlab-pages.md" },
        { "自托管部署" = "blog/deployment/self-hosted.md" },
    ] },
    { "高级主题" = [
        { "性能优化" = "blog/advanced/performance.md" },
        { "SEO 优化" = "blog/advanced/seo.md" },
        { "多语言支持" = "blog/advanced/i18n.md" },
        { "自定义 404 页面" = "blog/advanced/custom-404.md" },
        { "自定义字体" = "blog/advanced/custom-fonts.md" },
        { "添加评论系统" = "blog/advanced/comment-system.md" },
    ] },
    { "常见问题" = "faq.md" },
    { "案例展示" = "showcase.md" },
    { "关于" = "about.md" },
    { "个人博客" = "https://wcowin.work/" },
]
```

!!! tip "导航配置技巧"
    - **路径相对于 `docs_dir`**：所有文件路径都相对于 `docs` 目录
    - **自动提取标题**：如果不指定标题，Zensical 会自动从文件中提取
    - **嵌套层级**：支持多层嵌套，但建议不超过 3 层以保持导航清晰
    - **外部链接**：URL 会在新标签页中打开，内部链接在当前页面打开
    - **数组格式**：使用 `nav = [...]` 格式，结构清晰，易于维护

## Markdown 扩展

Zensical 支持丰富的 Markdown 扩展，这些扩展基于官方推荐配置，提供了强大的文档编写能力。

### 官方推荐配置（完整版）

以下配置是 Zensical 官方推荐的完整 Markdown 扩展配置，包含了所有常用功能：

=== "zensical.toml"

    ```toml
    # ===== 基础扩展 =====
    [project.markdown_extensions.abbr]          # 缩写支持
    [project.markdown_extensions.admonition]    # 警告框（!!! note）
    [project.markdown_extensions.attr_list]     # 属性列表
    [project.markdown_extensions.def_list]      # 定义列表
    [project.markdown_extensions.footnotes]     # 脚注支持
    [project.markdown_extensions.md_in_html]    # HTML 中使用 Markdown
    [project.markdown_extensions.toc]           # 目录生成
    toc_depth = 3                               # 目录深度
    permalink = true                            # 标题锚点链接

    # ===== 数学公式支持 =====
    [project.markdown_extensions."pymdownx.arithmatex"]
    generic = true  # 使用 MathJax 渲染数学公式

    # ===== 文本增强 =====
    [project.markdown_extensions."pymdownx.betterem"]
    smart_enable = "all"  # 智能斜体/粗体

    [project.markdown_extensions."pymdownx.caret"]      # 上标 (^text^)
    [project.markdown_extensions."pymdownx.mark"]      # 标记文本 (==text==)
    [project.markdown_extensions."pymdownx.tilde"]     # 删除线 (~~text~~)

    # ===== 交互元素 =====
    [project.markdown_extensions."pymdownx.details"]   # 可折叠详情框
    [project.markdown_extensions."pymdownx.tabbed"]    # 标签页
    alternate_style = true
    [project.markdown_extensions."pymdownx.tasklist"]  # 任务列表
    custom_checkbox = true

    # ===== 代码相关 =====
    [project.markdown_extensions."pymdownx.highlight"]     # 代码高亮
    [project.markdown_extensions."pymdownx.inlinehilite"] # 行内代码高亮
    [project.markdown_extensions."pymdownx.superfences"]  # 代码块和 Mermaid

    # ===== 其他功能 =====
    [project.markdown_extensions."pymdownx.keys"]         # 键盘按键 (++ctrl+alt+del++)
    [project.markdown_extensions."pymdownx.smartsymbols"]  # 智能符号转换
    [project.markdown_extensions."pymdownx.emoji"]        # Emoji 表情
    emoji_generator = "zensical.extensions.emoji.to_svg"
    emoji_index = "zensical.extensions.emoji.twemoji"
    ```

=== "mkdocs.yml"

    ```yaml
    markdown_extensions:
      # 基础扩展
      - abbr
      - admonition
      - attr_list
      - def_list
      - footnotes
      - md_in_html
      - toc:
          permalink: true
          toc_depth: 3
      
      # PyMdown 扩展
      - pymdownx.arithmatex:
          generic: true
      - pymdownx.betterem:
          smart_enable: all
      - pymdownx.caret
      - pymdownx.details
      - pymdownx.emoji:
          emoji_generator: zensical.extensions.emoji.to_svg
          emoji_index: zensical.extensions.emoji.twemoji
      - pymdownx.highlight
      - pymdownx.inlinehilite
      - pymdownx.keys
      - pymdownx.mark
      - pymdownx.smartsymbols
      - pymdownx.superfences
      - pymdownx.tabbed:
          alternate_style: true
      - pymdownx.tasklist:
          custom_checkbox: true
      - pymdownx.tilde
    ```

### 扩展功能说明

#### 基础扩展

| 扩展 | 功能 | 示例 |
|------|------|------|
| `abbr` | 缩写支持 | `<abbr title="HyperText Markup Language">HTML</abbr>` |
| `admonition` | 警告框 | `!!! note "提示"` |
| `attr_list` | 属性列表 | `{: .class-name }` |
| `def_list` | 定义列表 | `术语 : 定义` |
| `footnotes` | 脚注 | `[^1]` 和 `[^1]: 脚注内容` |
| `md_in_html` | HTML 中使用 Markdown | `<div markdown="1">**粗体**</div>` |
| `toc` | 自动生成目录 | 自动生成页面目录 |

#### PyMdown 扩展

| 扩展 | 功能 | 示例 |
|------|------|------|
| `pymdownx.arithmatex` | 数学公式 | `$E=mc^2$` 或 `$$\int_0^\infty$$` |
| `pymdownx.betterem` | 智能斜体/粗体 | 自动处理 `*text*` 和 `**text**` |
| `pymdownx.caret` | 上标 | `^text^` → <sup>text</sup> |
| `pymdownx.details` | 可折叠详情 | `??? note "点击展开"` |
| `pymdownx.emoji` | Emoji 表情 | `:smile:` → 😄 |
| `pymdownx.highlight` | 代码高亮 | 语法高亮的代码块 |
| `pymdownx.inlinehilite` | 行内代码高亮 | `` `code` `` |
| `pymdownx.keys` | 键盘按键 | `++ctrl+alt+del++` |
| `pymdownx.mark` | 标记文本 | `==text==` → <mark>text</mark> |
| `pymdownx.smartsymbols` | 智能符号 | `(c)` → ©, `(tm)` → ™ |
| `pymdownx.superfences` | 代码块和 Mermaid | 支持代码块和流程图 |
| `pymdownx.tabbed` | 标签页 | `=== "标签1"` |
| `pymdownx.tasklist` | 任务列表 | `- [ ] 未完成` / `- [x] 已完成` |
| `pymdownx.tilde` | 删除线 | `~~text~~` → <del>text</del> |

### 常用配置示例

#### 最小配置（仅基础功能）

```toml
[project.markdown_extensions]
admonition = {}           # 警告框
attr_list = {}            # 属性列表
md_in_html = {}           # HTML 中使用 Markdown
tables = {}               # 表格支持
```

#### 推荐配置（常用功能）

```toml
[project.markdown_extensions]
admonition = {}
attr_list = {}
md_in_html = {}
toc = { permalink = true, toc_depth = 3 }

[project.markdown_extensions."pymdownx.highlight"]
[project.markdown_extensions."pymdownx.superfences"]
[project.markdown_extensions."pymdownx.tabbed"]
alternate_style = true
[project.markdown_extensions."pymdownx.tasklist"]
custom_checkbox = true
[project.markdown_extensions."pymdownx.emoji"]
emoji_generator = "zensical.extensions.emoji.to_svg"
emoji_index = "zensical.extensions.emoji.twemoji"
```

### 实际使用示例

#### 警告框（Admonition）

```markdown
!!! note "提示"
    这是一个提示框

!!! warning "警告"
    这是一个警告框

!!! tip "技巧"
    这是一个技巧提示
```

#### 代码高亮（Highlight）

````markdown
```python
def hello():
    print("Hello, Zensical!")
```
````

#### 标签页（Tabbed）

````markdown
=== "Python"
    ```python
    print("Hello")
    ```

=== "JavaScript"
    ```javascript
    console.log("Hello");
    ```
````

#### 任务列表（Tasklist）

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
```

#### 数学公式（Arithmatex）

```markdown
行内公式：$E=mc^2$

块级公式：
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

#### Emoji 表情

```markdown
:smile: :heart: :rocket: :thumbsup:
```

!!! tip "更多示例"
    详细的使用示例和说明请参考 [Markdown 扩展使用指南](markdown-extensions.md)。

## 完整配置示例

以下是一个完整的、生产环境可用的配置示例，包含了所有常用配置：

```toml title="zensical.toml - 完整配置示例"
[project]
# ===== 基本信息 =====
site_name = "我的 Zensical 项目"
site_url = "https://example.com"
site_description = "一个使用 Zensical 构建的文档网站"
site_author = "张三"
copyright = "Copyright &copy; 2025 张三"

# ===== 目录配置 =====
docs_dir = "docs"
site_dir = "site"
use_directory_urls = true

# ===== 仓库配置 =====
repo_url = "https://github.com/username/repo"
repo_name = "repo"
edit_uri = "edit/main/docs"

# ===== 额外资源 =====
extra_javascript = [
    "javascripts/extra.js",
]
extra_css = [
    "stylesheets/extra.css",
]

# ===== 导航配置 =====
nav = [
    { "主页" = "index.md" },
    { "快速开始" = [
        { "5 分钟快速开始" = "getting-started/quick-start.md" },
        { "从 MkDocs 迁移" = "getting-started/migration.md" },
    ] },
    { "核心教程" = [
        { "配置详解" = "tutorials/configuration.md" },
        { "主题定制" = "tutorials/theme-customization.md" },
        { "Markdown 扩展" = "tutorials/markdown-extensions.md" },
        { "博客系统指南" = "tutorials/blog-tutorial.md" },
    ] },
    { "常见问题" = "faq.md" },
    { "个人博客" = "https://wcowin.work/" },
]

# ===== 主题配置 =====
[project.theme]
variant = "modern"
language = "zh"
logo = "assets/logo.svg"
favicon = "assets/favicon.png"

features = [
    "navigation.instant",
    "navigation.instant.prefetch",
    "navigation.tracking",
    "navigation.tabs",
    "navigation.sections",
    "navigation.top",
    "search.suggest",
    "search.highlight",
    "content.code.copy",
]

# 日间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: light)"
scheme = "default"
primary = "indigo"
accent = "indigo"

# 夜间模式
[[project.theme.palette]]
media = "(prefers-color-scheme: dark)"
scheme = "slate"
primary = "indigo"
accent = "indigo"

[project.theme.font]
text = "Roboto"
code = "Roboto Mono"

# ===== 插件配置 =====
[project.plugins.blog]
post_date_format = "full"
post_readtime = true
post_readtime_words_per_minute = 265
draft = true

[project.plugins.search]
lang = ["zh", "en"]
separator = '[\s\u200b\-]'

[project.plugins.tags]

# ===== Markdown 扩展配置 =====
[project.markdown_extensions.abbr]
[project.markdown_extensions.admonition]
[project.markdown_extensions.attr_list]
[project.markdown_extensions.def_list]
[project.markdown_extensions.footnotes]
[project.markdown_extensions.md_in_html]
[project.markdown_extensions.toc]
toc_depth = 3
permalink = true

[project.markdown_extensions."pymdownx.arithmatex"]
generic = true

[project.markdown_extensions."pymdownx.betterem"]
smart_enable = "all"

[project.markdown_extensions."pymdownx.caret"]
[project.markdown_extensions."pymdownx.details"]
[project.markdown_extensions."pymdownx.emoji"]
emoji_generator = "zensical.extensions.emoji.to_svg"
emoji_index = "zensical.extensions.emoji.twemoji"

[project.markdown_extensions."pymdownx.highlight"]
[project.markdown_extensions."pymdownx.inlinehilite"]
[project.markdown_extensions."pymdownx.keys"]
[project.markdown_extensions."pymdownx.mark"]
[project.markdown_extensions."pymdownx.smartsymbols"]
[project.markdown_extensions."pymdownx.superfences"]
[project.markdown_extensions."pymdownx.tabbed"]
alternate_style = true
[project.markdown_extensions."pymdownx.tasklist"]
custom_checkbox = true
[project.markdown_extensions."pymdownx.tilde"]
```

!!! tip "配置验证"
    配置完成后，建议运行以下命令验证：
    
    ```bash
    # 检查配置语法
    zensical build
    
    # 启动开发服务器查看效果
    zensical serve
    ```

## 下一步

- 查看 [GitHub Pages 部署指南](github-pages.md)

---

**参考资料**：
- [Zensical 官方文档 - Basics](https://zensical.org/docs/setup/basics/)
- [TOML 规范](https://toml.io/)
- [Material for MkDocs 配置](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)
