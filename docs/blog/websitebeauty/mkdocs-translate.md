---
title: 为MKdocs添加多语言翻译
tags:
  - Mkdocs
  - 多语言
status: new
---

# 为 MkDocs 添加多语言翻译功能

在全球化的今天，为网站添加多语言支持已成为提升用户体验的重要手段。本文将详细介绍如何为 MkDocs 网站添加基于 JavaScript 的客户端翻译功能，支持多种语言的实时切换。

[快速查看效果](#_9)

---

<div class="intro-container">
  <div class="intro-content">
    <div class="intro-text">
      <span class="greeting">特别感谢<a href="https://github.com/jaywhj" class="contributor-link">Aaron</a>对翻译方案的提议与实践<span class="wave">👋</span></span>
    </div>
  </div>
</div>

<style>
.intro-container {
  background: linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(200,200,200,0.2);
  transition: all 0.3s ease;
}

.intro-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.intro-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-text {
  text-align: center;
}

.greeting {
  display: block;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #555;
}

.contributor-link {
  color: #608DBD;
  text-decoration: none;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.contributor-link:hover {
  background-color: rgba(96, 141, 189, 0.1);
  color: #4a7ba7;
  text-decoration: none;
}

.wave {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

/* 深色模式适配 */
[data-md-color-scheme="slate"] .intro-container {
  background: linear-gradient(145deg, rgba(31,33,40,0.9) 0%, rgba(31,33,40,0.8) 100%);
  border: 1px solid rgba(80,80,80,0.2);
}

[data-md-color-scheme="slate"] .greeting {
  color: #e0e0e0;
}

[data-md-color-scheme="slate"] .contributor-link {
  color: #7BA7D7;
}

[data-md-color-scheme="slate"] .contributor-link:hover {
  background-color: rgba(123, 167, 215, 0.1);
  color: #A8C5E5;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .intro-container {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .greeting {
    font-size: 1.3rem;
  }
}
</style>

## 🌍 方案概述

我们采用的翻译方案具有以下特点：

- **🚀 客户端翻译**：使用 `translate.js` 库实现前端翻译
- **🌐 多语言支持**：支持中文、英文、日文、韩文、阿拉伯文等 9 种语言
- **⚡ 实时切换**：无需刷新页面即可切换语言
- **🎨 样式优化**：针对不同语言进行样式适配
- **📱 响应式支持**：移动端和桌面端都有优化

---

## 📋 实现步骤

### 1. 引入翻译库

首先在页脚或头部模板(例如：[docs/overrides/partials/footer.html](https://github.com/squidfunk/mkdocs-material/blob/master/material/templates/partials/footer.html))中引入 `translate.js` 库：

```html
<!-- 引入翻译库 -->
<script src="https://cdn.staticfile.net/translate.js/3.12.0/translate.js"></script>
```

### 2. 配置翻译参数

创建翻译配置脚本，设置基本参数：

```javascript
<script>
(function() {
  // 设置不翻译的元素类名
  translate.ignore.class.push(
    'md-select',           // Material 选择框
    'footer-highlight',    // 页脚高亮文本
    'md-footer-copyright', // 版权信息
    'no-translate'         // 通用不翻译类
  );

  // 设置本地语种（默认中文简体）
  translate.language.setLocal('chinese_simplified');

  // 自动识别用户首选语言
  translate.setAutoDiscriminateLocalLanguage();

  // 隐藏默认语言选择框
  translate.selectLanguageTag.show = false;

  // 设置翻译服务通道
  translate.service.use('client.edge');

  // 执行翻译初始化
  translate.execute();

  console.log('翻译功能已初始化');
})();
</script>
```

目录结构如下：
``` hl_lines="12"
$ tree -a
.
├── .github
│   ├── .DS_Store
│   └── workflows
│       └── ci.yml
├── docs
│   └── index.md
│   └──overrides
│       └──assets
│       └──partials
│          └──footer.html
│
└── mkdocs.yml
```

!!! tip "重点提示"
    请参考下方的footer.html示例代码

    页脚教程: [Mkdocs页脚设计](../../blog/websitebeauty/footer.md)

??? note "footer.html示例代码(无需修改,直接复制粘贴即可使用)"
    ```html
    {#-
      This file was automatically generated - do not edit
    -#}
    <footer class="md-footer">
      {% if "navigation.footer" in features %}
        {% if page.previous_page or page.next_page %}
          {% if page.meta and page.meta.hide %}
            {% set hidden = "hidden" if "footer" in page.meta.hide %}
          {% endif %}
          <nav class="md-footer__inner md-grid" aria-label="{{ lang.t('footer') }}" {{ hidden }}>
            {% if page.previous_page %}
              {% set direction = lang.t("footer.previous") %}
              <a href="{{ page.previous_page.url | url }}" class="md-footer__link md-footer__link--prev" aria-label="{{ direction }}: {{ page.previous_page.title | e }}">
                <div class="md-footer__button md-icon">
                  {% set icon = config.theme.icon.previous or "material/arrow-left" %}
                  {% include ".icons/" ~ icon ~ ".svg" %}
                </div>
                <div class="md-footer__title">
                  <span class="md-footer__direction">
                    {{ direction }}
                  </span>
                  <div class="md-ellipsis">
                    {{ page.previous_page.title }}
                  </div>
                </div>
              </a>
            {% endif %}
            {% if page.next_page %}
              {% set direction = lang.t("footer.next") %}
              <a href="{{ page.next_page.url | url }}" class="md-footer__link md-footer__link--next" aria-label="{{ direction }}: {{ page.next_page.title | e }}">
                <div class="md-footer__title">
                  <span class="md-footer__direction">
                    {{ direction }}
                  </span>
                  <div class="md-ellipsis">
                    {{ page.next_page.title }}
                  </div>
                </div>
                <div class="md-footer__button md-icon">
                  {% set icon = config.theme.icon.next or "material/arrow-right" %}
                  {% include ".icons/" ~ icon ~ ".svg" %}
                </div>
              </a>
            {% endif %}
          </nav>
        {% endif %}
      {% endif %}
      <div class="md-footer-meta md-typeset">
        <div class="md-footer-meta__inner md-grid">
          {% include "partials/copyright.html" %}
                <script src="https://cdn.staticfile.net/translate.js/3.12.0/translate.js"></script>
          <script>
            // 翻译配置 - 包装在立即执行函数中避免全局污染
            (function() {
              // 通过 class 设置不翻译的元素
              translate.ignore.class.push('md-select', 'footer-highlight', 'md-footer-copyright');
              // 自定义术语库，纠正翻译结果
              translate.nomenclature.append('chinese_simplified','english',`
                    快讯=Newsflash
                    访问量=Page Views
                    本站已经运行=Site has been running
                    天=days
                    时=hours
                    分=minutes
                    秒=seconds
                    萌ICP备=Moe ICP
                    版权所有=Copyright
                    制作工具=Made with
            `);
              // 设置本地语种
              translate.language.setLocal('chinese_simplified');
              // 设置首次使用时自动识别语种
              translate.setAutoDiscriminateLocalLanguage();
              // 不显示 select 语言选择框
              translate.selectLanguageTag.show = false;
              // 设置机器翻译服务通道
              translate.service.use('client.edge');
              // 执行翻译
              translate.execute();
              // 监听语言切换事件，确保动态内容也能被翻译
              window.addEventListener('translate.languagechange', function() {
                // 延迟重新翻译动态更新的内容
                setTimeout(() => {
                  translate.execute();
                }, 500);
              });
              console.log('翻译功能已初始化');
            })();
          </script>
          {% if config.extra.social %}
            {% include "partials/social.html" %}
          {% endif %}
        </div>
      </div>
    </footer>
    ```

### 3. 在 mkdocs.yml 中配置语言切换

首先在mkdocs.yml文件中添加custom_dir:
``` hl_lines="3"
theme:
  name: material
  custom_dir: docs/overrides #覆写路径
```

然后在配置文件中添加多语言切换选项：
```yaml hl_lines="9-36"

theme:
  name: material
  language: zh
  features:
    - navigation.tabs
    - navigation.sections

extra:
  alternate:
    - name: 中文
      link: "javascript:translate.changeLanguage('chinese_simplified');"
      lang: zh
    - name: English
      link: "javascript:translate.changeLanguage('english');"
      lang: en
    - name: 한국어
      link: "javascript:translate.changeLanguage('korean');"
      lang: ko
    - name: 日本語
      link: "javascript:translate.changeLanguage('japanese');"
      lang: ja
    - name: بالعربية
      link: "javascript:translate.changeLanguage('arabic');"
      lang: ar
    - name: Deutsch
      link: "javascript:translate.changeLanguage('german');"
      lang: de
    - name: Français
      link: "javascript:translate.changeLanguage('french');"
      lang: fr
    - name: Español
      link: "javascript:translate.changeLanguage('spanish');"
      lang: es
    - name: português
      link: "javascript:translate.changeLanguage('portuguese');"
      lang: pt
```

至此已经配置完成。简单！快速！

---

---

后续步骤皆为可选，根据需求进行配置。可以不看。

### 4. 添加自定义术语库

为了提高翻译准确性，添加专业术语映射：

```javascript
// 自定义术语库配置
const nomenclatures = {
  english: `
访问量=Page Views
本站已经运行=Site has been running for
天=days
时=hours
分=minutes
秒=seconds
版权所有=Copyright
制作工具=Made with
统计中=Loading
`,
  japanese: `
访问量=アクセス数
本站已经运行=サイト運営期間
天=日
时=時間
分=分
秒=秒
版权所有=著作権
制作工具=制作ツール
`,
  korean: `
访问量=방문수
本站已经运行=사이트 운영 기간
天=일
时=시간
分=분
秒=초
版权所有=저작권
制作工具=제작 도구
`
  // ... 其他语言配置
};

// 批量添加术语库
Object.entries(nomenclatures).forEach(([lang, terms]) => {
  translate.nomenclature.append('chinese_simplified', lang, terms);
});
```

### 5. 处理动态内容翻译

对于实时更新的内容（如计时器、访问量等），需要特殊处理：

```javascript
// 监听语言切换事件
window.addEventListener('translate.languagechange', function() {
  // 延迟重新翻译动态内容
  setTimeout(() => {
    translate.execute();
  }, 500);
});

// 在动态内容更新时触发翻译
function updateDynamicContent() {
  // 更新内容...

  // 如果当前不是中文，重新执行翻译
  if (window.translate && translate.currentLanguage !== 'chinese_simplified') {
    setTimeout(() => translate.execute(), 100);
  }
}
```

---

## 🎨 多语言样式优化

### 1. 基础响应式样式

为不同语言文本长度进行适配：

```css
/* 为翻译后的元素添加基础样式 */
[data-translate-lang]:not([data-translate-lang="chinese_simplified"]) .footer-item {
  text-align: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.4;
}

/* 移动端长文本优化 */
@media (max-width: 768px) {
  [data-translate-lang]:not([data-translate-lang="chinese_simplified"]) .footer-visit-count-mobile {
    flex-direction: column;
    gap: 0.4em;
    line-height: 1.6;
  }
}
```

### 2. 特定语言样式优化

针对不同语言的特殊需求：

```css
/* 英文样式优化 */
[data-translate-lang="english"] .footer-item {
  font-size: 0.75rem;
  word-spacing: 0.15em;
}

/* 日文样式优化 */
[data-translate-lang="japanese"] .footer-item {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  line-height: 1.5;
}

/* 阿拉伯文 RTL 支持 */
[data-translate-lang="arabic"] .footer-wrapper {
  direction: rtl;
  text-align: center;
}

[data-translate-lang="arabic"] .footer-item {
  direction: rtl;
  text-align: center;
  word-spacing: 0.2em;
}
```

### 3. 深色模式兼容

确保所有语言在深色模式下的显示效果：

```css
/* 深色模式下的翻译优化 */
[data-md-color-scheme="slate"] .footer-counter-value,
[data-md-color-scheme="slate"] .no-translate {
  color: #e2e8f0 !important;
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  [data-translate-lang]:not([data-translate-lang="chinese_simplified"]) .footer-item {
    border-width: 2px;
    font-weight: 600;
  }
}
```

---

## 🔧 高级功能

### 1. 语言检测与样式应用

```javascript
function applyLanguageStyles(lang) {
  // 设置语言属性
  document.documentElement.setAttribute('data-translate-lang', lang || 'chinese_simplified');

  // RTL 语言处理
  if (lang === 'arabic') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-language');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-language');
  }
}
```

### 2. 数字和特殊内容保护

确保数字、链接等不被误翻译：

```javascript
function protectSpecialContent() {
  // 保护数字不被翻译
  const highlightElements = document.querySelectorAll('.footer-highlight');
  highlightElements.forEach(el => {
    if (!el.classList.contains('no-translate')) {
      el.classList.add('no-translate');
    }
  });

  // 保护 ICP 号码
  const icpLinks = document.querySelectorAll('.icp-link');
  icpLinks.forEach(el => {
    const icpNumber = el.textContent.match(/\d+/);
    if (icpNumber) {
      el.innerHTML = el.innerHTML.replace(
        /(\d+)/g,
        '<span class="no-translate">$1</span>'
      );
    }
  });
}
```

---

## 🚀 最佳实践

### 1. 性能优化

- **延迟执行**：翻译操作延迟执行，避免阻塞页面渲染
- **避免重复翻译**：检查是否已翻译过相同内容
- **清理资源**：页面切换时正确清理翻译相关资源

### 2. 用户体验优化

- **记住用户选择**：使用 localStorage 保存用户的语言偏好
- **平滑过渡**：添加过渡动画使语言切换更自然
- **加载状态**：在翻译过程中显示加载提示

### 3. 可访问性考虑

- **屏幕阅读器支持**：正确设置 `lang` 属性
- **键盘导航**：确保语言切换按钮可通过键盘访问
- **对比度**：保证翻译后文本的可读性

---

## 📱 移动端适配

### 1. 响应式布局

```css
@media (max-width: 768px) {
  /* 长语言文本换行优化 */
  [data-translate-lang="german"] .footer-visit-count-mobile,
  [data-translate-lang="french"] .footer-visit-count-mobile {
    gap: 0.6em;
    line-height: 1.7;
  }

  /* 移动端语言切换优化 */
  .md-header__option {
    min-width: auto;
  }
}
```

### 2. 触摸友好设计

确保语言切换按钮在移动设备上易于点击：

```css
/* 移动端按钮优化 */
@media (max-width: 768px) {
  .md-header__option {
    padding: 0.5rem;
    min-height: 44px; /* iOS 推荐的最小触摸目标 */
  }
}
```

---

## 🔍 故障排除

### 常见问题及解决方案

1. **翻译不生效**
   - 检查 `translate.js` 是否正确加载
   - 确认没有 JavaScript 错误阻止执行

2. **动态内容不翻译**
   - 在内容更新后调用 `translate.execute()`
   - 检查动态元素是否被忽略类名覆盖

3. **样式错乱**
   - 为不同语言添加对应的 CSS 规则
   - 检查文本长度差异导致的布局问题

4. **RTL 语言显示异常**
   - 正确设置 `dir="rtl"` 属性
   - 为 RTL 语言添加特殊样式

---

## 📊 效果展示

实现后的效果：

![2.gif](https://s2.loli.net/2025/07/26/uwokNjU1ipzc4v5.gif)

- ✅ **多语言切换**：支持 9 种语言实时切换
- ✅ **样式适配**：每种语言都有优化的显示效果
- ✅ **响应式设计**：桌面端和移动端都完美适配
- ✅ **性能优良**：客户端翻译，服务器无额外负担
- ✅ **用户友好**：无需刷新页面，切换流畅

---

## 🎯 总结

通过以上步骤，我们成功为 MkDocs 网站添加了完整的多语言翻译功能。这个方案具有以下优势：

1. **实现简单**：仅需几个文件修改即可完成
2. **功能完整**：支持多种语言和样式适配
3. **性能优秀**：客户端翻译，不增加服务器负担
4. **用户体验佳**：切换流畅，样式美观

虽然客户端翻译在 SEO 方面不如服务端多语言方案，但对于技术文档、个人博客等场景，这种方案提供了极佳的性价比和用户体验。

---

## 🔗 相关资源

- [Translate.js 官方文档](https://github.com/jerryc127/translate.js)
- [Material for MkDocs 多语言配置](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/)
- [MDN Web 国际化指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Numbers_and_dates#internationalization)

希望这个教程能帮助你为自己的 MkDocs 网站添加多语言支持！如果遇到问题，欢迎在评论区讨论。



