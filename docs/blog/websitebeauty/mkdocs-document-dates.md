---
title: MkDocs文档日期插件
tags:
  - Mkdocs
status: new
---  

# mkdocs-document-dates

新一代用于显示文档精确元信息的 MkDocs 插件，如**创建时间、最后更新时间、作者、电子邮件**等。

## 特性

- 始终显示文档的准确元信息，适用于任何环境（无 Git、Git 环境、所有 CI/CD 构建系统等）
- 支持在 `Front Matter` 中手动指定时间和作者
- 支持多种时间格式（date、datetime、timeago）
- 灵活的显示位置（顶部或底部）
- 优雅的样式设计（完全可定制）
- 支持 Tooltip 悬浮提示
  - 智能位置调整，始终以最佳方式浮动在视图中
  - 支持主题跟随 Material 亮/暗配色变化而变化
- 多语言支持，跨平台支持（Windows、macOS、Linux）
- **极致的构建效率**：O(1)，无论文档数量是1000还是10000，通常不到0.2秒

## 效果图

![render](https://s1.imagehub.cc/images/2025/07/25/15500bc26b250e6d4e6fa49da015c3a6.png)
![eba81837509fce7c2d7fd7fce8e0196e](https://s1.imagehub.cc/images/2025/07/25/8a9e9bcf0af67d6bead6551aa0c0acab.png)  

## 安装

```bash
pip install mkdocs-document-dates
```

## 配置

在你的 mkdocs.yml 中添加插件即可：

```yaml
plugins:
  - document-dates
```

或者，你要个性化配置：

```yaml
plugins:
  - document-dates:
      position: top            # 显示位置：top（标题后） bottom（文档末尾），默认：bottom
      type: date               # 时间类型：date datetime timeago，默认：date
      locale: zh               # 本地化语言：en zh zh_TW es fr de ar ja ko ru，默认：en
      date_format: '%Y-%m-%d'  # 日期格式化字符串，例如：%Y年%m月%d日、%b %d, %Y
      time_format: '%H:%M:%S'  # 时间格式化字符串（仅在 type=datetime 时有效）
      exclude:                 # 排除文件列表，默认为空
        - temp.md              # 排除指定文件
        - private/*            # 排除 private 目录下所有文件，包括子目录
      show_author: true        # 是否显示作者信息，默认：true
```

## 手动指定时间

插件会自动获取文档的准确时间信息，会自动缓存创建时间，当然，你也可以在 `Front Matter` 中手动指定

优先级顺序：`Front Matter` > `文件系统时间戳(缓存)` > `Git时间戳`

```yaml
---
created: 2023-01-01
modified: 2025-02-23
---

# 文档标题
```

- `created` 可替换为：`created, date, creation`
- `modified` 可替换为：`modified, updated, last_modified, last_updated`

## 手动指定作者

插件会自动获取文档的作者信息，会解析邮件后做链接，你也可以在 `Front Matter` 中手动指定

优先级顺序：`Front Matter` > `Git作者` > `site_author(mkdocs.yml)` > `PC用户名` 

```yaml
---
author: any-name
email: e-name@gmail.com
---

# 文档标题
```

- `author` 可替换为：`author, name`
- `email` 可替换为：`email, mail`

## 插件定制化

插件支持深度自定义，比如**图标样式、主题颜色、字体、动画、分界线**等等，一切都可以自定义（找到下方对应位置的文件，打开取消注释开关即可）：

|    类别：    | 位置：                                         |
| :---------: | ---------------------------------------------- |
| **样式与主题** | `docs/assets/document_dates/user.config.css` |
| **属性与功能** | `docs/assets/document_dates/user.config.js`  |
| **本地化语言** | `docs/assets/document_dates/languages/` <br />可参考模板文件 `en.json` 任意新增或修改 |

**提示**：当设置 `type: timeago` 时，会启用 timeago.js 来渲染动态时间，timeago.min.js 默认只包含英文和中文，如需加载其他语言，可以按如下方式（2选1）配置：

- 在 `user.config.js` 中，参考最下面 [注释掉的 Demo](https://github.com/jaywhj/mkdocs-document-dates/blob/main/mkdocs_document_dates/static/config/user.config.js)，自行翻译成本地语言
- 在 `mkdocs.yml` 中，配置 full 版本的 timeago.full.min.js，一次性加载所有语言
    ```yaml
    extra_javascript:
      - assets/document_dates/core/timeago.full.min.js
      - assets/document_dates/core/timeago-load.js
    ```


## 模板变量

你可以在模板中使用如下变量访问文档的元信息：

- page.meta.document_dates_created
- page.meta.document_dates_modified
- page.meta.document_dates_authors

比如像这样：

```jinja2
<div><span>{{ page.meta.document_dates_created }}</span></div>
<div><span>{{ page.meta.document_dates_modified }}</span></div>
{% set authors = page.meta.document_dates_authors %}
{% if authors %}
<div>
    {% for author in authors %}
    {% if author.email %}<a href="mailto:{{ author.email }}">{{ author.name }}</a>
    {% else %}<span>{{ author.name }}</span>{% endif %}
    {% endfor %}
</div>
{% endif %}
```

**完整示例**：为 [sitemap.xml](https://github.com/jaywhj/mkdocs-document-dates/blob/main/sitemap.xml) 设置正确的 lastmod，以便搜索引擎能更好的处理 SEO，从而提高你网站的曝光率（覆盖路径：`docs/overrides/sitemap.xml`）

## 其它提示

- 为了始终能获取准确的创建时间，采用了单独的缓存文件来存储文档的创建时间，位于 docs 目录下（默认是隐藏的），请不要删除：
    - `docs/.dates_cache.jsonl`，缓存文件
    - `docs/.gitattributes`，缓存文件的合并机制
- 采用了 Git Hooks 机制来自动触发缓存的存储（在每次执行 git commit 时），缓存文件也会随之自动提交，并且 Git Hooks 的安装在插件被安装时也会自动触发，全程无需任何手动干预

<br />

## 开发小故事（可选）

一个可有可无、微不足道的小插件，没事的朋友可以看看 \^\_\^ 

- **起源**：
    - 是因为 [mkdocs-git-revision-date-localized-plugin](https://github.com/timvink/mkdocs-git-revision-date-localized-plugin) ，一个很棒的项目。在2024年底使用时，发现我这本地用不了，因为我的 mkdocs 文档没有纳入 git 管理，然后我就不理解为什么不读取文件系统的时间，而要用 git 时间，而且文件系统时间更准确，还给作者提了 issue，结果等了一周左右没得到回复（后面作者回复了，人不错，估计他当时在忙没来得及），然后就想，过年期间没啥事，现在 AI 这么火，要不借助 AI 自己试试，就诞生了，诞生于2025年2月
- **迭代**：
    - 开发后，就理解了为什么不采用文件系统时间，因为文件在经过 git checkout 或 clone 时会被重建，从而导致原始时间戳信息丢失，解决办法有很多：
    - 方法 1，采用最近一次 git commit 时间作为文档的最后更新时间，采用首次 git commit 时间作为文档的创建时间，mkdocs-git-revision-date-localized-plugin 就是这么做的（这种方式，存在一定的误差且无法在无Git环境中使用）
    - 方法 2，可以提前缓存原始时间，后续读缓存就可以了（时间准确且不依赖任何环境）。缓存的地方，可以是源文档的 Front Matter 中，也可以是单独的文件，我选择了后者。存储在 Front Matter 中非常合理且更简单，但是这样会修改文档的源内容，虽然对正文无任何影响，但是我还是想保证数据的原始性
- **难点**：
    1. 什么时候去读取和存储原始时间？这只是 mkdocs 的一个插件，入口和权限非常有限，mkdocs 提供的只有 build 和 serve，那万一用户不执行 build 或 serve 而直接 commit 呢（比如使用 CI/CD 构建系统时），那就拿不到文件的时间信息了，更别说缓存了
        - 直接说结论：在 AI 的提示下，找到了 Git Hooks 机制，能在特定的 git 动作发生时触发自定义脚本，比如每次 commit 时
    2. 如何自动安装 Git Hooks？在何时？怎么触发？通过 pip 从 PyPI 安装包并没有标准的 post-install 钩子机制
        - 我的方案：分析了 pip 从 PyPI 安装包的流程，发现通过源码包编译安装时（sdist），会调用 setuptools 来处理，那么可以在 setuptools 的流程中想办法植入安装脚本，即在 setup.py 中添加自定义脚本
    3. 跨平台的 hook 怎么设计？执行 python 脚本，需要明确指定 python 解释器，而用户的 python 环境，因操作系统、python 的安装方式以及配置的不同而各不相同，如何才能保证在所有环境下都能正常运行？
        - 解决办法：考虑过 shell 脚本，但考虑到最终还是要回调 python 脚本，所以还是直接采用 python 脚本更方便。可以在 hook 安装时就检测用户的 python 环境，然后动态设置 hook 的 shebang 行，从而设置正确的 python 解释器
    4. 在多人协作时，如何保证单独的缓存文件不冲突？
        - 我的方案：采用 JSONL（JSON Lines）代替 JSON，配合并集的合并策略 merge=union
- **精进**：
    - 既然是新开发的插件，那就奔着**优秀产品**的方向去设计，追求极致的**易用性、简洁性、个性化**
        - **易用性**：能不让用户手动操作的就不让手动，比如自动安装 Git Hooks、自动缓存、自动 commit，提供自定义模板等
        - **简洁性**：无任何不必要的配置，无 Git 依赖，无 CI/CD 配置依赖，无其他包依赖
        - **个性化**：几乎所有地方都可以自定义，无论是图标、样式、主题，还是功能，都可实现完全定制化
    - 此外还有很好的兼容性和扩展性，在 WIN7、移动设备、旧版 Safari 等环境下均能正常运行
- **最后的秘密**：
    - 编程是业余爱好，我是一名从业八年的市场营销人员（欢迎留言）