---
title: 嵌入PDF
tags:
  - Mkdocs
---

[嵌入PDF](https://github.com/Wcowin/hexo-site-comments/discussions/8#discussioncomment-12101922)

嵌入PDF代码  ，**注意PDF的相对地址**
```html
<iframe src="../个人简历.pdf (相对地址)" width="100%" height="800px" style="border: 1px solid #ccc; overflow: auto;"></iframe>
```

<img width="1178" alt="image" src="https://s1.imagehub.cc/images/2025/05/11/af422a556586fa0ed42f7adcf5a694ae.png" />  

我的完整代码：  

```html

<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __个人简历__

    ---

    <iframe src="../个人简历.pdf" width="100%" height="800px" style="border: 1px solid #ccc; overflow: auto;">
    </iframe>
    

</div>
```


希望对你有帮助