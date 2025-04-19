---
title: 相对地址的一些问题
tags:
  - Mkdocs
status: new
---

# 针对MKdocs中相对地址引用的一些问题

在使用 MkDocs 构建文档网站时，常常会遇到相对地址引用的问题，尤其是在图片、PDF、其他静态资源等的引用上。合理使用相对地址可以让你的文档在本地预览和线上部署时都能正常显示。下面总结一些常见场景和注意事项：

## 1. 图片引用

**推荐写法：**
```
![图片描述](./img/example.png)
```
`./img/example.png` 表示当前 Markdown 文件同级目录下的 `img` 文件夹中的图片。  
 如果图片在上级目录：`../assets/example.png`

**注意事项：**

- 路径区分大小写，确保文件名和路径一致。
- MkDocs 会将 `docs` 目录下的所有文件原样复制到站点根目录，引用路径应以 `docs` 为根目录进行相对定位。

## 2. PDF 文件引用

**内嵌或下载 PDF：**
```
[查看PDF](./files/example.pdf)
```  

或使用 HTML 方式内嵌：  

```html
<embed src="./files/example.pdf" width="100%" height="600px" type="application/pdf">
```  

`./files/example.pdf` 表示当前文档同级的 `files` 文件夹下的 PDF 文件。
`../files/example.pdf` 表示上级目录的 `files` 文件夹下的 PDF 文件。
`../../files/example.pdf` 表示上上级目录的 `files` 文件夹下的 PDF 文件。


## 3. 跨页面引用

**引用同一项目下的其他 Markdown 页面：**
```
[跳转到其他页面](../otherpage.md)
```  

- MkDocs 会自动将 `.md` 转换为 `.html`，所以可以直接用 Markdown 文件名。
- （）内的路径是相对于当前 Markdown 文件的路径，可以参考[PDF文件引用](#2-pdf)的方法。

## 4. 静态资源引用

**如 CSS、JS 文件：**
```html
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/script.js"></script>
```  

- 推荐将静态资源放在 `docs/assets` 目录下，引用时用相对路径。

## 5. 常见问题

- **路径错误导致资源无法加载**：请检查路径是否正确、文件是否存在、大小写是否一致。
- **本地预览正常，线上不显示**：有可能是路径写死或大小写问题，建议始终用相对路径。
- **图片/文件过大加载慢**：可适当压缩图片或 PDF 文件。

---

## **总结**  
在 MkDocs 项目中，所有资源的相对路径都应以当前 Markdown 文件为基准，确保本地和线上都能正确访问。建议统一资源管理目录结构，便于维护和引用。