---
title: Giscus 评论系统明暗主题同步修复教程
tags:
  - Zensical
---

# Giscus 评论系统明暗主题同步教程

## 问题描述

在使用 Zensical（或 MkDocs Material）主题时，单独添加 Giscus 评论系统（不使用overrides）后，设置 `data-theme="preferred_color_scheme"` 只能让 Giscus 在页面加载时检测**系统主题**，但**无法跟随网站的明暗切换按钮**自动变色。

**具体表现：**  

- 网站切换到深色模式，但评论区仍然是白色
- 刷新页面后，评论区可能变成浅色（即使网站是深色模式）

## 原因分析

1. `preferred_color_scheme` 只检测系统级主题偏好，不检测网站自身的主题状态
2. Giscus 的 `data-theme` 属性在脚本加载时就已经确定，后续不会自动更新
3. 需要手动监听网站主题变化并通知 Giscus 切换主题

## 解决方案

### 完整代码

将以下代码添加到需要显示评论的页面（如 `waline.md` 或 `link.md`）中：

```html
<!-- 动态加载 Giscus，根据网站主题设置初始主题 -->
<script>
// 根据网站当前主题设置 Giscus 初始主题
(function() {
  var scheme = document.body.getAttribute("data-md-color-scheme");
  var theme = scheme === "slate" ? "dark" : "light";
  var giscusScript = document.createElement("script");
  giscusScript.src = "https://giscus.app/client.js";
  giscusScript.setAttribute("data-repo", "你的用户名/仓库名");
  giscusScript.setAttribute("data-repo-id", "你的仓库ID");
  giscusScript.setAttribute("data-mapping", "number");
  giscusScript.setAttribute("data-term", "8");
  giscusScript.setAttribute("data-reactions-enabled", "1");
  giscusScript.setAttribute("data-emit-metadata", "0");
  giscusScript.setAttribute("data-input-position", "top");
  giscusScript.setAttribute("data-theme", theme);  // 根据网站主题动态设置
  giscusScript.setAttribute("data-lang", "zh-CN");
  giscusScript.setAttribute("data-loading", "lazy");
  giscusScript.setAttribute("crossorigin", "anonymous");
  giscusScript.async = true;
  document.currentScript.parentNode.insertBefore(giscusScript, document.currentScript.nextSibling);
})();
</script>

<!-- 同步 Giscus 主题与网站主题（主题切换时） -->
<script>
// 同步 Giscus 主题与网站主题（主题切换时）
function syncGiscusTheme() {
  var scheme = document.body.getAttribute("data-md-color-scheme");
  var theme = scheme === "slate" ? "dark" : "light";
  var frame = document.querySelector(".giscus-frame");
  if (frame && frame.contentWindow) {
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      "https://giscus.app"
    );
  }
}

// 监听 body 上的 data-md-color-scheme 属性变化（主题切换时）
document.addEventListener("DOMContentLoaded", function() {
  var bodyObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === "data-md-color-scheme") {
        syncGiscusTheme();
      }
    });
  });
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
});
</script>
```

### 关键要点

#### 1. 动态创建 Giscus 脚本

不要直接使用 `<script src="...">` 标签，而是用 JavaScript 动态创建：

```javascript
var scheme = document.body.getAttribute("data-md-color-scheme");
var theme = scheme === "slate" ? "dark" : "light";
// ... 创建脚本并设置 data-theme
```

这样可以确保 Giscus 加载时就使用正确的主题，而不是系统主题。

#### 2. 监听主题变化

使用 `MutationObserver` 监听 `document.body` 上的 `data-md-color-scheme` 属性变化：

```javascript
var bodyObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === "data-md-color-scheme") {
      syncGiscusTheme();
    }
  });
});
bodyObserver.observe(document.body, { 
  attributes: true, 
  attributeFilter: ["data-md-color-scheme"] 
});
```

#### 3. 通过 postMessage 通知 Giscus

当检测到主题变化时，通过 `postMessage` 通知 Giscus iframe 切换主题：

```javascript
frame.contentWindow.postMessage(
  { giscus: { setConfig: { theme: theme } } },
  "https://giscus.app"
);
```

## 如何获取 Giscus 配置参数

访问 [giscus.app](https://giscus.app/zh-CN)，按照以下步骤获取配置：

1. 确保你的 GitHub 仓库已启用 Discussions
2. 在 giscus.app 上选择你的仓库
3. 选择映射方式（推荐 `number`，对应具体页面）
4. 复制生成的配置参数

## 常见问题

### Q: 为什么使用 `document.body` 而不是 `document.documentElement`？

Zensical/MkDocs Material 将主题属性 `data-md-color-scheme` 设置在 `<body>` 标签上，而不是 `<html>` 标签上。

### Q: 为什么不能用 `preferred_color_scheme`？

`preferred_color_scheme` 会让 Giscus 检测**系统主题**，而不是网站主题。如果用户手动将网站切换到深色模式，但系统设置是浅色，Giscus 会显示浅色主题。

### Q: 如何测试是否生效？

1. 将网站切换到深色模式
2. 刷新页面
3. 评论区应该自动显示深色主题
4. 点击主题切换按钮，评论区应跟随切换

## 参考链接

- [Giscus 官方文档](https://giscus.app/zh-CN)
- [Zensical 官方文档 - 添加评论系统](https://zensical.org/docs/setup/adding-a-comment-system/)
- [MkDocs Material 评论系统文档](https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/)

## 总结

通过动态创建 Giscus 脚本并监听网站主题变化，可以实现评论系统与网站主题的完全同步。核心思路是：

1. **初始化时**：根据网站当前主题设置 Giscus 的 `data-theme`
2. **切换时**：监听 `data-md-color-scheme` 属性变化，通过 `postMessage` 通知 Giscus 更新主题
