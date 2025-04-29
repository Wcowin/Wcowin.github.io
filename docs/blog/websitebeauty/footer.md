---
title: 页脚设置
hide:
  #  - navigation # 显示右
  #  - toc #显示左
  #  - footer
  #  - feedback  
tags:
  - Mkdocs
comments: false
---

## 页脚设置  

MkDocs 支持自定义页脚。

![](https://s1.imagehub.cc/images/2024/02/02/73179baf6402e27c92afc51eb59645a6.png)

在docs/overrides/partials/footer.html中（没有该文件时，创建footer.html文件）添加以下代码：

```html hl_lines="71-86"
<!-- Footer -->
<footer class="md-footer">

  <!-- Link to previous and/or next page -->
  {% if "navigation.footer" in features %}
    {% if page.previous_page or page.next_page %}
      {% if page.meta and page.meta.hide %}
        {% set hidden = "hidden" if "footer" in page.meta.hide %}
      {% endif %}
      <nav
        class="md-footer__inner md-grid"
        aria-label="{{ lang.t('footer') }}"
        {{ hidden }}
      >

        <!-- Link to previous page -->
        {% if page.previous_page %}
          {% set direction = lang.t("footer.previous") %}
          <a
            href="{{ page.previous_page.url | url }}"
            class="md-footer__link md-footer__link--prev"
            aria-label="{{ direction }}: {{ page.previous_page.title | e }}"
          >
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

        <!-- Link to next page -->
        {% if page.next_page %}
          {% set direction = lang.t("footer.next") %}
          <a
            href="{{ page.next_page.url | url }}"
            class="md-footer__link md-footer__link--next"
            aria-label="{{ direction }}: {{ page.next_page.title | e }}"
          >
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

  <!-- Further information -->
  <div class="md-footer-meta md-typeset">
    <div class="md-footer-meta__inner md-grid">
      {% include "partials/copyright.html" %}
   
    <font color="#B9B9B9">
      <div class="footer-visit-count" style="display: flex; justify-content: center; align-items: center;">
    本站访问量：<script async src="//finicounter.eu.org/finicounter.js"></script>
    <span id="finicount_views"></span>    &nbsp;|&nbsp;
    <footer>
      <a href="https://icp.gov.moe/?keyword=20230640" target="_blank">萌ICP备20230640号</a>
    </footer>
  </div>
      </font>

      <style>
        .footer-visit-count {
            height: fit-content;
            min-height: 55px; /* 根据实际情况调整此高度 */
        }
        </style>
      {% if config.extra.social %}
        {% include "partials/social.html" %}
      {% endif %}
    </div>
  </div>
</footer>


```

高亮部分自行修改即可

## 页脚版权设置

mkdocs.yml中添加：
```yaml

copyright: Copyright &copy; 2022~2025 Wcowin # 左下角的版权声明

```

如果想删除页脚显示“Made with Material for MkDocs”(不建议)

```yaml
extra:
  generator: false  #删除页脚显示“使用 MkDocs 材料制造”
```