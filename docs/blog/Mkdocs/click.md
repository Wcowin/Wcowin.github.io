---
title: mkdocs serve 后127.0.0.1:8000无法自动刷新
status: new
---

<https://github.com/mkdocs/mkdocs/issues/4014#issuecomment-3632469997>

问题是 click 8.3.x 版本有 bug，导致 mkdocs 的 livereload 文件监控失效。

解决方法：降级 click 到 8.2.1

```bash
pip install click==8.2.1
```
