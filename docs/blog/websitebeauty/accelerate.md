---
title: 加速网站访问的一些心得
tags:
  - Mkdocs
---

# 加速网站访问的一些心得  

在使用 MkDocs 构建网站时，为了提高访问速度，我们可以采取以下一些措施：
## 1. 优化图片
使用合适的图片格式，如 WebP、JPEG2000 等，减少图片文件大小，从而加快加载速度。

可以使用在线工具进行图片压缩，如：

- [freeconvert](https://www.freeconvert.com/zh/webp-converter)

## 2. JS/CSS使用 CDN
使用内容分发网络（CDN）来加速网站的访问，将静态资源（如图片、CSS、JS）缓存到全球各地的服务器上，用户就近访问，减少延迟。

这里推荐  

- [jsDelivr CDN 加速 GitHub 文件](https://www.jsdelivr.com/github)  

## 3.加速本地渲染

优化 git 插件的 enabled 配置  
比如我配置里有 git-revision-date-localized 和 git-committers 插件，这些插件会在每次渲染时读取所有文件的 git 历史，导致本地预览变慢。  
推荐做法是在本地开发时禁用它们，仅在 CI/CD 或线上构建时启用。  
具体写法如下：  

```yaml hl_lines="3 5"
plugins:
  - git-revision-date-localized:
      enabled: !ENV [CI, false]  # 只有在CI环境变量为true时才启用
  - git-committers:
      enabled: !ENV [CI, false]

```  

---

检验加速效果是否生效可以使用lighthouse进行测试，具体可以参考：  

[使用lighthouse进行网站性能测试](../../develop/lighthouse.md)