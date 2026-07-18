---
title: MkDocs AI Summary中文教程
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
status: new
---

# MkDocs AI Summary中文教程

<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2327435979273742"
     crossorigin="anonymous"></script>
</head>

<!-- <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
<amp-auto-ads type="adsense"
        data-ad-client="ca-pub-2327435979273742">
</amp-auto-ads> -->


<!-- # MkDocs AI Summary -->

<p align="center">
    <img src="https://img.shields.io/badge/MkDocs-Hooks-526CFE?style=for-the-badge&logo=MaterialForMkDocs&logoColor=white" alt="MkDocs Plugins">
    <img src="https://img.shields.io/badge/AI_Powered-智谱清言-FF6B35?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered">
    <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.8+">
</p>

<p align="center">
    <a href="https://github.com/Wkwcowin/mkdocs-ai-hooks/blob/main/README.md">中文</a> | <a href="https://github.com/Wkwcowin/mkdocs-ai-hooks/blob/main/README-en.md">English</a>
</p>

> 仓库地址： https://github.com/Wkwcowin/Mkdocs-AI-Summary-Plus

🚀 **您的MkDocs文档首选智能摘要！**
这个项目利用MkDocs hooks，为您的技术文档和博客添加AI驱动的摘要生成和智能阅读统计功能。

![预览图1](https://s1.imagehub.cc/images/2025/06/03/d1563500263b22cfd0ffc3679993aa83.jpg)
![预览图2](https://s1.imagehub.cc/images/2025/06/03/526b59b6a2e478f2ffa1629320e3e2ce.png)


## 🌟 为什么选择这个插件？

- 🤖 **多 AI 服务支持** - 支持 DeepSeek、OpenAI、Google Gemini、GLM 等主流 AI 服务
- ⚡ **智能缓存系统** - 避免重复 API 调用，大幅提升构建速度
- 🌍 **多语言支持** - 支持中英文等多种语言，页面级语言控制
- 🔄 **自动降级机制** - 主服务不可用时自动切换备用服务，确保稳定性
- 🚀 **CI/CD 友好** - 专为持续集成环境优化，支持缓存策略
- 🎨 **完美兼容** - 与所有 MkDocs 主题无缝集成

## 安装

### 从 PyPI 安装（推荐）

```bash
pip install mkdocs-ai-summary-wcowin -i https://pypi.org/simple
pip install --upgrade mkdocs-ai-summary-wcowin -i https://pypi.org/simple
```

## 快速开始

### 1. 基本配置

在 `mkdocs.yml` 中添加插件：

```yaml hl_lines="2-9"
plugins:
  - ai-summary:
      ai_service: "glm"          # 推荐使用GLM
      # local_enabled: true             # 本地环境启用
      # debug: false                    # 是否显示调试信息（默认：false）
      enabled_folders:
        - blog/                      # 处理 blog 文件夹
      exclude_patterns:
        - index.md                    # 排除 index.md 文件
markdown_extensions:
  - attr_list
  - md_in_html
  - pymdownx.superfences
  - admonition
```

### 2. 获取 API 密钥

推荐使用 **GLM**（性价比最高）：
1. 访问 [GLM 开放平台](https://open.bigmodel.cn/)
2. 注册并创建 API 密钥
3. 在项目根目录创建 `.env` 文件：

```env
GLM_API_KEY=your_api_key_here
```

### 3. 构建文档

```bash
mkdocs build  # 构建文档
mkdocs serve  # 本地预览
```

现在开始，您的文档页面顶部会自动显示 AI 生成的摘要！

---

## 高级配置

### 完整配置示例

```yaml
plugins:
  - ai-summary:
      ai_service: "glm"          # 主要 AI 服务
      fallback_services:               # 备用服务
        - "openai"
        - "gemini"
      summary_language: "zh"           # 摘要语言 (zh/en/both)
      local_enabled: true              # 本地环境启用
      enabled_folders:
        - docs
        - blog
      exclude_patterns:
        - tags.md                # 排除 tags.md 文件
        - blog/posts/**
        - blog/archive/**
```

### 多 AI 服务配置

在 `.env` 文件中配置多个服务作为备用：

```env
# 主要服务
GLM_API_KEY=your_deepseek_key

# 备用服务
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
DEEPSEEK_API_KEY=your_glm_key
```

## 配置指南

### 页面级语言控制

在页面的 front matter 中指定摘要语言：

```markdown
---
title: 我的文档
ai_summary_lang: en  # 为这个页面生成英文摘要
---

# 页面内容
```

### 核心配置选项

```yaml
plugins:
  - ai-summary:
      # AI 服务设置
      ai_service: "deepseek"          # 主要服务
      fallback_services: ["openai"]   # 备用服务

      # 语言与内容
      summary_language: "zh"          # zh/en/both
      max_content_length: 8000         # 内容长度限制

      # 文件选择
      enabled_folders: ["docs"]       # 处理的文件夹
      exclude_patterns: ["**/api/**"] # 排除模式

      # 性能相关
      cache_enabled: true              # 启用缓存
      local_enabled: true              # 本地环境启用
```

### 本地开发配置

#### 步骤1：获取API密钥

根据您选择的AI服务，获取相应的API密钥：

**DeepSeek (推荐)**
1. 访问 [DeepSeek官网](https://platform.deepseek.com/)
2. 注册账号并登录
3. 进入API管理页面
4. 创建新的API密钥
5. 复制密钥备用

**OpenAI**
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 登录您的账号
3. 进入API Keys页面
4. 点击"Create new secret key"
5. 复制密钥备用

**Google Gemini**
1. 访问 [Google AI Studio](https://makersuite.google.com/)
2. 登录Google账号
3. 创建新的API密钥
4. 复制密钥备用

**GLM (智谱AI)(最推荐)**
1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册并登录账号
3. 进入API管理
4. 创建API密钥
5. 复制密钥备用

#### 步骤2：创建.env文件

在您的项目根目录（与`mkdocs.yml`同级）创建`.env`文件：

```bash
# 在项目根目录执行
touch .env
```

#### 步骤3：配置API密钥

编辑`.env`文件，添加您的API密钥：

```env
# DeepSeek API密钥 (推荐)
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenAI API密钥
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Gemini API密钥
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GLM API密钥
GLM_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxx

# 可选：调试模式
AI_SUMMARY_DEBUG=false

# 可选：API超时设置（秒）
AI_SUMMARY_TIMEOUT=30

# 可选：最大重试次数
AI_SUMMARY_MAX_RETRIES=3
```

**重要提示：**
- 只需要配置您计划使用的AI服务的API密钥
- 确保`.env`文件已添加到`.gitignore`中，避免泄露API密钥
- API密钥格式因服务而异，请确保复制完整的密钥

#### 步骤4：验证配置

运行以下命令验证配置是否正确：

```bash
# 本地构建测试
mkdocs build

# 本地预览
mkdocs serve
```

如果配置正确，您应该能看到插件成功加载并生成AI摘要。

### GitHub部署配置

#### 1. 添加 API 密钥到 GitHub Secrets

在您的 GitHub 仓库中：
1. 进入 Settings → Secrets and variables → Actions
2. 添加新的 secret：`DEEPSEEK_API_KEY`
3. 将您的 API 密钥粘贴进去

#### 2. 配置 GitHub Actions 工作流

推荐在根目录下创建一个requirements.txt

##### 方案 A：创建新的工作流

创建 `.github/workflows/ci.yml` 文件：

```yaml
name: ci
on:
  push:
    branches: [main, master]
  pull_request:
    types: [closed]
    branches: [main, master]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          sparse-checkout: |
            docs
            includes
            requirements.txt
            .ai_cache

      - uses: actions/setup-python@v4
        with:
          python-version: 3.x

      - name: 设置缓存 ID
        run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV

      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ github.run_number }}
          path: .cache
          restore-keys: |
            mkdocs-material-

      # 安装您现有的依赖!!!
      - run: pip install mkdocs-material
      - run: pip install -r requirements.txt # 安装其他依赖
      - run: pip install mkdocs-ai-summary-wcowin # 安装本AI 摘要插件

      # 使用 AI 摘要部署
      - name: 使用 AI 摘要部署
        env:
          AI_SUMMARY_CI_ENABLED: 'true' # 在 CI 中启用
          AI_SUMMARY_CACHE_ENABLED: 'true' # 使用缓存
          AI_SUMMARY_CACHE_EXPIRE_DAYS: '30' # 缓存 30 天
          GLM_API_KEY: ${{ secrets.GLM_API_KEY }}  # 添加 GLM API 密钥
        run: mkdocs gh-deploy --force

      # 自动提交 AI 缓存文件
      - name: 自动提交 AI 缓存
        run: |
          if [ -d ".ai_cache" ] && [ "$(ls -A .ai_cache 2>/dev/null)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .ai_cache/
            if ! git diff --cached --quiet; then
              git commit -m "🤖 自动更新 AI 摘要缓存 [skip ci]"
              git push
            fi
          fi
```

##### 方案 B：在现有工作流中添加

如果您已经有 `ci.yml` 文件，请在现有工作流中添加以下步骤：

```yaml
# 在现有的依赖安装部分添加

- run: pip install mkdocs-ai-summary-wcowin # 安装 AI 摘要插件
- run: pip install -r requirements.txt # 安装其他依赖

# 替换您的 mkdocs 构建/部署步骤为：

- name: 使用 AI 摘要部署
  env:
    AI_SUMMARY_CI_ENABLED: 'true' # 在 CI 中启用
    AI_SUMMARY_CACHE_ENABLED: 'true' # 使用缓存
    AI_SUMMARY_CACHE_EXPIRE_DAYS: '30' # 缓存 30
    GLM_API_KEY: ${{ secrets.GLM_API_KEY }} # 添加 GLM API 密钥
  run: mkdocs gh-deploy --force

# 在部署后添加（可选 - 用于缓存管理）

- name: 自动提交 AI 缓存
  run: |
    if [ -d ".ai_cache" ] && [ "$(ls -A .ai_cache 2>/dev/null)" ]; then
      git config --local user.email "action@github.com"
      git config --local user.name "GitHub Action"
      git add .ai_cache/
      if ! git diff --cached --quiet; then
        git commit -m "🤖 自动更新 AI 摘要缓存 [skip ci]"
        git push
      fi
    fi
```

#### 现有工作流集成详细步骤

如果您已经有一个正常工作的 `ci.yml` 文件，请按照以下步骤添加 AI 摘要功能：

##### 步骤 1：添加插件安装
在您现有的依赖安装部分添加这一行：
```yaml
- run: pip install mkdocs-ai-summary-wcowin
```

##### 步骤 2：添加 API 密钥到环境变量
更新您的 mkdocs 构建/部署步骤，包含 API 密钥：
```yaml
- name: 部署文档
  env:
    GLM_API_KEY: ${{ secrets.GLM_API_KEY }}  # 添加这一行
  run: mkdocs gh-deploy --force
```

##### 步骤 3：配置 AI 摘要设置（可选）
为了更好的 CI 性能，添加这些环境变量：
```yaml
env:
  AI_SUMMARY_CI_ENABLED: 'true'        # 在 CI 中启用
  AI_SUMMARY_CACHE_ENABLED: 'true'     # 使用缓存
  AI_SUMMARY_CACHE_EXPIRE_DAYS: '30'  # 缓存 30 天
  GLM_API_KEY: ${{ secrets.GLM_API_KEY }}
```

##### 步骤 4：添加缓存管理（推荐/可选）
要自动提交生成的缓存文件，在部署后添加此步骤：
```yaml
- name: 自动提交 AI 缓存
  run: |
    if [ -d ".ai_cache" ] && [ "$(ls -A .ai_cache 2>/dev/null)" ]; then
      git config --local user.email "action@github.com"
      git config --local user.name "GitHub Action"
      git add .ai_cache/
      if ! git diff --cached --quiet; then
        git commit -m "🤖 自动更新 AI 摘要缓存 [skip ci]"
        git push
      fi
    fi
```

#### 4. 启用 GitHub Pages

在仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源。

## 提示与故障排除

### 缓存管理

插件会自动缓存生成的摘要，避免重复 API 调用：

```yaml
plugins:
  - ai-summary:
      cache_enabled: true              # 启用缓存
      cache_expire_days: 30            # 缓存30天
      clear_cache: false               # 保留现有缓存
```

### 多 AI 服务配置

配置主服务和备用服务，确保稳定性：

```yaml
plugins:
  - ai-summary:
      ai_service: "glm"          # 主服务
      fallback_services:               # 备用服务
        - "openai"
        - "gemini"
```

### 常见问题

**Q: 插件不生成摘要？**
- 检查 API 密钥配置
- 确保 `local_enabled: true`（本地开发）
- 验证文件在 `enabled_folders` 中

**Q: CI 构建失败？**
- 确认 GitHub Secrets 中已添加 API 密钥
- 检查工作流文件中的环境变量名称
- 确保插件已在工作流中安装

**Q: 如何清除缓存？**
- 配置中设置 `clear_cache: true`
- 或手动删除 `.ai_cache/` 目录

## 支持与贡献


### 支持

- 📖 [文档](https://wcowin.work/mkdocs-ai-hooks/)
- 🐛 [问题跟踪](https://github.com/Wkwcowin/Mkdocs-AI-Summary-Plus/issues)
- 💬 [讨论](https://github.com/Wkwcowin/Mkdocs-AI-Summary-Plus/discussions)
- 📧 [邮件支持](mailto:wcowin@qq.com)

### 贡献代码

我们欢迎各种形式的贡献：
- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码

## 常见问题

**Q: 插件不生成摘要？**
- 检查 API 密钥配置
- 确保 `local_enabled: true`（本地开发）
- 验证文件在 `enabled_folders` 中

**Q: CI 构建失败？**
- 确认 GitHub Secrets 中已添加 API 密钥
- 检查工作流文件中的环境变量名称
- 确保插件已在工作流中安装

**Q: 如何清除缓存？**
- 配置中设置 `clear_cache: true`
- 或手动删除 `.ai_cache/` 目录

## 许可证

本项目采用 MIT 许可证

---

## 致谢

- [MkDocs](https://www.mkdocs.org/) - 本插件扩展的静态站点生成器
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) - 启发我们设计的美观主题
- 所有使这个插件成为可能的 AI 服务提供商


---

## 🔗 联系作者

### Telegram
<a href="https://t.me/wecowin" target="_blank">
<img src="https://pica.zhimg.com/80/v2-d5876bc0c8c756ecbba8ff410ed29c14_1440w.webp" alt="Telegram" style="border-radius: 10px;" width="300px">
</a>

### 微信交流

<img src="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" style="border-radius: 10px;" width="300px">



---

## ⭐ 项目统计


[![Star History Chart](https://api.star-history.com/svg?repos=Wkwcowin/mkdocs-ai-hooks&type=Date)](https://www.star-history.com/#Wkwcowin/mkdocs-ai-hooks&Date)

<!--<a href="https://github.com/Wkwcowin/mkdocs-ai-hooks/stargazers">
<img src="https://img.shields.io/github/stars/Wcowin/mkdocs-ai-hooks?style=social" alt="Stars">
</a>
<a href="https://github.com/Wcowin/mkdocs-ai-hooks/network/members">
<img src="https://img.shields.io/github/forks/Wcowin/mkdocs-ai-hooks?style=social" alt="Forks">
</a>-->


---

## ☕ 支持项目


<a href="https://s1.imagehub.cc/images/2025/05/11/36eb33bf18f9041667267605b6b99bd0.jpeg" target="_blank">
<img src="https://s1.imagehub.cc/images/2025/05/11/36eb33bf18f9041667267605b6b99bd0.jpeg" style="width: 300px; border-radius: 15px;">
</a>

**如果这个项目对您有帮助，请给它一个 ⭐ Star！**

**用 ❤️ 为 MkDocs 社区制作**
