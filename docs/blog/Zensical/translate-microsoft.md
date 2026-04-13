---
title: 为 Zensical 添加 Microsoft 翻译服务
date: 2026-04-13
tags:
  - Zensical
  - 翻译
status: new
---

# 为 Zensical 网站添加 Microsoft 翻译服务

> 本文介绍如何在 Zensical 网站中集成 **Microsoft 翻译服务**（基于 translate.js 实现），提供更快、更可靠的多语言翻译体验。
> Microsoft 翻译服务在客户端直接执行翻译，无需 API 调用，速度更快且支持离线使用。

## 功能概述

- **客户端翻译**：在浏览器端直接执行翻译，不依赖外部 API
- **多语言支持**：支持中文、英语、日语、韩语等多种语言
- **离线支持**：即使在无网络环境下也能正常工作
- **速度快**：本地执行翻译，响应迅速
- **隐私保护**：翻译内容不发送到外部服务器
- **动态监控**：支持页面内容变化和 AJAX 请求的自动翻译

!!! info "SEO 提醒"
    这种方案属于 **运行时客户端翻译**：  

    - 对访问者来说是多语言网站  
    - 对搜索引擎来说仍然是**单语言内容**（索引的是构建时的中文），如果你追求多语言 SEO，需要用「多语言内容预生成」的方式，本文不展开。

---

## 1. 准备工作

### 1.1 一个已经跑起来的 Zensical 站点

假设你已经有了一个基本可运行的 Zensical 项目（`zensical.toml + docs/` 目录结构）。
如果需要完整参考实现的代码，可以直接查看我的开源仓库，你找到直接下载就行：

- **仓库地址**：[`Wcowin/Wcowin.github.io`](https://github.com/Wcowin/Wcowin.github.io)
- 与 Microsoft 翻译相关的核心文件：
  - `docs/javascripts/translate.js`
  - `docs/javascripts/translate-edge-init.js`
  - `docs/javascripts/translation-switcher.js`

可以直接复制这些文件到你的项目里，再按本文做少量配置即可。

---

## 2. 引入翻译脚本与配置

### 2.1 复制核心脚本文件

在你的项目中创建（或直接复制仓库里的版本）：

- `docs/javascripts/translate.js`
  - Microsoft 翻译服务的核心库，提供翻译功能

- `docs/javascripts/translate-edge-init.js`
  - 初始化 Microsoft 翻译服务，配置语言和监控选项
  - 关键配置：

```javascript
// 设置本地语种为简体中文
translate.language.setLocal('chinese_simplified');
// 使用 Microsoft 翻译服务（客户端直接翻译，不依赖服务端，支持所有现代浏览器）
translate.service.use('client.edge');
// 根据用户浏览器语言或 IP 所在国家自动切换语种
translate.setAutoDiscriminateLocalLanguage();
// 开启动态监控，JS 改变的内容也会被翻译
translate.listener.start();
// 监控 ajax 请求进行翻译
translate.request.listener.start();
```

> 推荐做法：直接从仓库复制这两个文件，后续如果我优化了实现，你也可以轻松 `diff` 更新。

### 2.2 在 zensical.toml 中引入脚本

确保在 `zensical.toml` 里已经包含以下配置：

```toml
[project]

# ===== 额外的 JavaScript 文件 =====
extra_javascript = [
    "javascripts/translate.js",                               # Microsoft 翻译服务
    "javascripts/translate-edge-init.js",                     # Microsoft 翻译初始化
    # 其他脚本...
]
```

这里最关键的有两点：

- `translate.js` 和 `translate-edge-init.js` 要在页面上加载
- 加载顺序：先加载核心库，再加载初始化脚本

---

## 3. 配置多语言切换菜单

在 `zensical.toml` 中配置多语言切换菜单：

```toml
# ===== 多语言切换配置 =====
# 基于 Microsoft 翻译服务（支持所有现代浏览器）
[[project.extra.alternate]]
name = "中文"
link = "#edge-translate-chinese_simplified"
lang = "zh"

[[project.extra.alternate]]
name = "English"
link = "#edge-translate-english"
lang = "en"
```

含义说明：

- `name`：菜单上显示的文字
- `lang`：供浏览器 / SEO 使用的语言代码
- `link`：特殊格式的锚点：`#edge-translate-{language_key}`

`translate-edge-init.js` 在初始化时会监听哈希变化：

```js
// 处理 URL 哈希变化，支持 #edge-translate-* 格式的链接
function handleEdgeTranslateHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#edge-translate-')) {
    const lang = hash.replace('#edge-translate-', '');
    translateToEdge(lang);
  }
}

// 监听哈希变化
window.addEventListener('hashchange', handleEdgeTranslateHash);
// 初始加载时检查哈希
window.addEventListener('load', handleEdgeTranslateHash);
```

可用的 `language_key` 包括：

- `chinese_simplified`（中文简体）
- `english`（英语）
- `japanese`（日语）
- `korean`（韩语）
- `french`（法语）
- `spanish`（西班牙语）
- `german`（德语）
- `arabic`（阿拉伯语）
- 等等


OK了，教程结束，已经实现了一个0成本超速的翻译方案，快去试试吧！    
如果你需要对这套翻译系统做更深入的定制，可以继续阅读：
---

## 4. Microsoft 翻译服务的工作原理

### 4.1 核心原理

- **核心原理**：使用 Microsoft 的翻译引擎在客户端直接执行翻译
- **执行位置**：完全在用户浏览器中执行，不依赖外部 API
- **技术优势**：
  - 速度快：本地执行，无需网络请求
  - 离线支持：无网络环境下也能工作
  - 隐私保护：翻译内容不发送到外部服务器
  - 跨浏览器兼容：支持所有现代浏览器

### 4.2 初始化流程

1. 页面加载时，`translate-edge-init.js` 初始化翻译服务
2. 设置本地语言为简体中文
3. 启用动态监控和 AJAX 请求监控
4. 执行初始翻译

### 4.3 翻译流程

1. 用户点击语言切换菜单，触发哈希变化
2. `handleEdgeTranslateHash` 函数检测到哈希变化
3. 调用 `translateToEdge` 函数执行翻译
4. `translate.changeLanguage` 函数处理翻译逻辑
5. 翻译结果替换到页面相应位置

---

## 5. 常见问题

### 5.1 点击语言切换没有反应

检查以下几点：

- `zensical.toml` 里是否配置了 `extra_javascript`（尤其是 `translate.js` 和 `translate-edge-init.js`）
- 浏览器控制台是否有报错（例如 `translate is not defined`）
- `project.extra.alternate` 中 `link` 是否是 `#edge-translate-xxx` 这种格式

### 5.2 翻译完某些代码/公式被破坏了

- 在页面模板或 Markdown 中给这类元素加上：

```html
<span class="ignore">...</span>
```

- 或在 `translate-edge-init.js` 中增加忽略规则：

```javascript
// 忽略不需要翻译的元素
translate.ignore.class.push('download-btn', 'nav-cta', 'pricing-cta', 'lang-option', 'ignore');
```

---

## 6. 小结

按照本文步骤，你就可以在 Zensical 网站中获得：

- 顶栏语言切换
- 基于 Microsoft 翻译服务的快速翻译体验
- 离线翻译支持
- 动态监控和 AJAX 请求翻译

Microsoft 翻译服务适合追求速度和响应性的场景，它在客户端直接执行翻译，无需 API 调用，速度快且支持离线使用。

如果你需要对这套翻译系统做更深入的定制，可以直接阅读并修改：

- `docs/javascripts/translate.js`
- `docs/javascripts/translate-edge-init.js`

源码始终以仓库为准：[`Wcowin/Wcowin.github.io`](https://github.com/Wcowin/Wcowin.github.io)。
欢迎在 Issues 或评论里交流你的使用体验和改进想法。