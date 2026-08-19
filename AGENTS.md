# AGENTS.md

本文件是 AI 编码代理在本仓库工作的项目说明。执行任务前先阅读本文件；若用户的明确要求与本文冲突，以用户要求为准。

## 项目概览

- 这是 Wcowin 的个人博客与文档站点，线上地址为 <https://wcowin.work/>。
- 当前静态站点生成器是 **Zensical**，不是 MkDocs。
- 主配置文件是根目录的 `zensical.toml`。
- 文档源文件位于 `docs/`，构建产物输出到 `site/`。
- GitHub Pages 部署流程位于 `.github/workflows/docs.yml`。
- 项目内容以中文为主；新增文章、导航标题和说明默认使用中文。

## 目录与文件

- `zensical.toml`：站点信息、导航、主题、插件、Markdown 扩展、CSS 和 JavaScript 配置；这是唯一有效的站点配置源。
- `docs/`：页面、文章和静态资源。
  - `docs/blog/`：技术文章与博客文章。
  - `docs/develop/`：开发、AI 和项目相关内容。
  - `docs/relax/`：生活、随笔、影音和诗文等内容。
  - `docs/trip/`：旅行内容。
  - `docs/research/`：研究类内容。
  - `docs/about/`：个人介绍及网站说明。
  - `docs/OneClip/`：OneClip 产品页面、接口和更新资料。
  - `docs/javascripts/`、`docs/stylesheets/`：全站前端资源。
  - `docs/overrides/`：主题模板覆盖与局部模板。
- `.github/workflows/docs.yml`：安装 Zensical、构建并部署 `site/` 到 GitHub Pages。
- `requirements.txt`：当前仅声明 `zensical`。
- `temp/`：历史或临时文件，不是当前配置来源。
- `site/`、`.cache/`：自动生成目录，不应手工编辑或提交。

## 本地开发与验证

推荐使用虚拟环境：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
zensical serve
```

提交前至少执行：

```bash
zensical build --clean
```

构建必须无错误完成。仓库目前没有独立的自动化测试或 lint 命令，完整构建就是主要验证方式。除非任务要求，不要为验证而提交生成的 `site/`。

## 内容修改规则

### 新增文章

1. 将 Markdown 文件放入 `docs/` 下语义正确的目录，不要放入 `site/` 或 `temp/`。
2. 使用清晰、稳定的文件名；已有目录的命名风格不完全统一，新增文件优先使用简短的英文 kebab-case 文件名。
3. 根据同分类附近文章补充 YAML front matter。常用字段包括：

```yaml
---
title: 页面标题
date: 2026-01-01
tags:
  - 标签
categories:
  - 分类
---
```

只添加页面实际需要的字段，不要机械复制无关配置。
4. 正文通常保留一个与 `title` 一致的一级标题。
5. **新增文章后必须在 `zensical.toml` 的 `[project]` 下 `nav` 数组中加入链接**，并放到语义正确的分类中。导航路径相对于 `docs/`，例如 `develop/AI/example.md`。
6. 检查站内相对链接和资源路径，并运行完整构建。

### Markdown 风格

- 保持原文语言、语气和排版；不要在无关任务中大范围润色旧文章。
- 标题按层级递进，不要仅为视觉效果跳级。
- 列表项之间通常不加空行，列表块前后保留一个空行。
- 表格前后各保留一个空行，单元格内容尽量简洁。
- 说明性加粗标签（如 `**核心优势：**`、`**适用场景：**`、`**注：**`、`**示例：**`）应单独成行，其后空一行再写正文或列表，不要与正文写在同一行。
- `**本文作者：**` 等已有内联组件可维持原格式。
- 仓库已启用 admonition、属性列表、脚注、SuperFences、KaTeX、emoji、tabbed、task list 等扩展；使用前优先参考仓库内现有写法。
- 不要随意把已有 HTML 片段改写成 Markdown；部分页面依赖自定义 HTML、CSS 或脚本。

## 配置与前端修改

- 修改站点行为时直接编辑 `zensical.toml`，不要修改 `temp/mkdocs.yml`，也不要新建根目录 `mkdocs.yml`。
- 调整 `nav` 时保持现有 TOML 数组和内联表格式，注意逗号、引号及括号配对。
- 全站脚本和样式分别在 `zensical.toml` 的 `extra_javascript`、`extra_css` 中注册；资源路径相对于 `docs/`。
- 主题设置位于 `[project.theme]`，额外元数据位于 `[project.extra]`。
- 自定义模板位于 `docs/overrides/`。修改模板、CSS 或 JavaScript 时，要同时检查浅色/深色主题和移动端表现。
- 不要擅自升级 GitHub Actions、第三方 CDN、Zensical 或前端依赖；升级属于单独任务，需构建并检查兼容性。

## 链接与资源

- 站内链接优先使用相对路径，并确保目标文件存在。
- 文件名含空格或中文时，沿用实际路径并特别检查链接。
- 图片等本地资源应放在 `docs/assets/` 或对应内容目录下；不要写入构建目录。
- 外部链接如需新窗口打开，可沿用现有 `{target=_blank}` 写法。
- 不要无故替换已有图片、统计、评论、翻译或 CDN 服务。

## 安全与版本控制

- 不得读取、展示、提交或硬编码 `.env`、API Key、令牌、私钥等敏感信息。
- 自动生成且可能包含密钥的 `docs/javascripts/*-api-config.js`、`*.local.js` 等文件已被忽略，不应加入版本控制。
- 不要提交 `site/`、`.cache/`、虚拟环境、日志、临时文件或系统文件。
- 修改前检查 `git status`，保留用户已有改动；不要回滚、覆盖或格式化与当前任务无关的文件。
- 只做完成任务所需的最小改动。除非用户明确要求，不要执行提交、推送、部署或破坏性 Git 操作。

## 完成任务前检查

- 修改的是源文件，而不是 `site/` 或 `temp/` 中的副本。
- 新文章已加入 `zensical.toml` 导航。
- TOML、front matter、相对链接和资源路径正确。
- 没有引入密钥、个人隐私或生成文件。
- `zensical build --clean` 成功完成。
- 最终回复简要列出修改文件和验证结果。
