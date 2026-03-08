---
title: Vercel 部署指南
date: 2026-03-08
---

# 将 Zensical 博客部署到 Vercel

本文介绍如何将基于 Zensical 主题的博客部署到 Vercel 平台。

## 为什么选择 Vercel？

- **全球 CDN**：自动分发到全球边缘节点，访问速度快
- **自动部署**：推送到 GitHub 后自动构建和部署
- **免费额度**：个人项目完全够用
- **自定义域名**：支持绑定自己的域名
- **HTTPS**：自动配置 SSL 证书

## 前置准备

1. 一个 GitHub 仓库（包含你的 Zensical 博客代码）
2. 一个 Vercel 账号（可以用 GitHub 账号登录）

## 部署步骤

### 1. 创建配置文件

在项目根目录创建两个文件：

**requirements.txt**（Python 依赖）：
```txt
zensical
```

**vercel.json**（Vercel 配置）：
```json
{
  "buildCommand": "pip install zensical && zensical build --clean",
  "outputDirectory": "site",
  "installCommand": "echo 'Skip pip upgrade'"
}
```

### 2. 提交到 GitHub

```bash
git add requirements.txt vercel.json
git commit -m "Add Vercel deployment config"
git push
```

### 3. 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **"Import Project"**
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测配置

### 4. 配置构建设置

在 Vercel 项目设置页面：

- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: `pip install zensical && zensical build --clean`
- **Output Directory**: `site`
- **Install Command**: `echo 'Skip'`或者不填，建议啥也不填

![iShot Pro 2026-03-08 15.22.09](https://s3.imagency.cn/e/cf718ba06df88d18907cd4ce66c3d42f.png)

### 5. 部署

点击 **"Deploy"** 按钮，等待构建完成。

## 环境变量配置（可选）

如果你的博客使用了 API keys（如智谱清言翻译），需要在 Vercel 项目设置中添加环境变量：

1. 进入项目设置 → Environment Variables
2. 添加变量，例如：
   - Key: `GLM_API_KEY`
   - Value: 你的 API key

然后修改 `vercel.json` 的构建命令：

```json
{
  "buildCommand": "pip install zensical && echo \"window.GLM_API_KEY = '$GLM_API_KEY';\" > docs/javascripts/glm-api-config.js && zensical build --clean",
  "outputDirectory": "site",
  "installCommand": "echo 'Skip pip upgrade'"
}
```

## 自定义域名

部署成功后，Vercel 会分配一个 `.vercel.app` 域名。如果想使用自己的域名：

1. 进入项目设置 → Domains
2. 添加你的域名（如 `wcowin.work`）
3. 按照提示配置 DNS 记录

## 常见问题

### 构建失败：pip 升级错误

**错误信息**：
```
error: externally-managed-environment
```

**解决方案**：
不要在 Install Command 中使用 `pip install --upgrade pip`，Vercel 使用 `uv` 管理环境。

### 构建超时

如果项目较大，可能需要优化构建：

1. 使用 `--clean` 参数清理缓存
2. 减少不必要的插件
3. 优化图片大小

### 部署后样式丢失

检查 `zensical.toml` 中的 `site_url` 配置是否正确：

```toml
[project]
site_url = "https://your-domain.vercel.app/"  # 或你的自定义域名
```

## GitHub Pages vs Vercel

| 特性 | GitHub Pages | Vercel |
|------|-------------|--------|
| 构建速度 | 较慢 | 快 |
| 全球 CDN | 有限 | 优秀 |
| 自定义域名 | 支持 | 支持 |
| 环境变量 | 通过 Secrets | 原生支持 |
| 免费额度 | 无限 | 100GB/月 |

## 总结

Vercel 部署 Zensical 博客非常简单，只需要两个配置文件即可。相比 GitHub Pages，Vercel 提供了更快的构建速度和更好的全球访问体验。

如果你已经在使用 GitHub Actions 部署到 GitHub Pages，也可以保持现状，两者各有优势。

---

**相关链接**：
- [Vercel 官方文档](https://vercel.com/docs)
- [Zensical 官方文档](https://zensical.org)
- [GitHub Pages 部署指南](github-pages.md)
