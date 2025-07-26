---
title: 正则表达式
tags: 
    - 技术分享
    - Mkdocs
---

# 正则表达式基础与实用技巧

正则表达式（Regular Expression，简称 regex 或 RE）是一种用于匹配字符串中字符组合的强大工具。它常用于文本搜索、数据验证、批量替换等场景。本文将通过配置代码片段的风格，带你快速了解正则表达式的基本用法和常见技巧。

---

## 什么是正则表达式

正则表达式是一种描述字符串模式的语法规则。通过特定的语法，可以灵活地查找、匹配、替换文本。例如，判断邮箱格式、提取手机号、批量替换文本内容等。

---

## 常用正则表达式语法

```python
# 匹配数字
pattern = r"\d+"

# 匹配邮箱
pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"

# 匹配手机号（中国大陆）
pattern = r"1[3-9]\d{9}"

# 匹配日期（yyyy-mm-dd）
pattern = r"\d{4}-\d{2}-\d{2}"
```

---

## 典型应用场景举例

### 1. 批量查找与替换

```python
import re

text = "邮箱1：test1@example.com，邮箱2：test2@example.com"
emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
print(emails)  # ['test1@example.com', 'test2@example.com']
```

### 2. 数据验证

```python
def is_valid_phone(phone):
    return re.fullmatch(r"1[3-9]\d{9}", phone) is not None

print(is_valid_phone("13812345678"))  # True
print(is_valid_phone("123456"))       # False
```

### 3. 配置文件过滤示例

正则表达式常用于配置文件的路径过滤。例如：

```python
# 配置：排除评论的页面模式
EXCLUDED_PATTERNS = [
    r'.*\/index\.md$',        # 排除所有 index.md 文件
    r'.*\/archive\.md$',      # 排除所有 archive.md 文件
    r'^blog/posts/.*\.md$',   # 排除所有 blog/posts 目录下的文件
    r'^blog/archive/.*\.md$', # 排除所有 blog/archive 目录下的文件
]
```
这些模式可以帮助你灵活地筛选、排除或定位特定文件。

---

## 常用元字符速查

| 元字符 | 说明           | 示例         |
| ------ | -------------- | ------------ |
| .      | 任意单个字符   | a.b 可匹配 aab/acb/abb |
| \d     | 数字           | \d+ 匹配123  |
| \w     | 字母/数字/下划线 | \w+ 匹配abc_123 |
| \s     | 空白字符       | \s+ 匹配空格、Tab |
| ^      | 行首           | ^abc 匹配以abc开头 |
| $      | 行尾           | abc$ 匹配以abc结尾 |
| []     | 字符集         | [abc] 匹配a或b或c |
| ()     | 分组           | (abc)+ 匹配abcabc |
| ?      | 0或1次         | ab?c 匹配ac或abc |
| *      | 0次或多次      | ab*c 匹配ac/abc/abbc |
| +      | 1次或多次      | ab+c 匹配abc/abbc |

---

## 小结

正则表达式虽然语法精炼，但功能极其强大。掌握常用规则和技巧，可以大幅提升文本处理和自动化能力。建议结合实际项目多加练习，遇到复杂需求时可借助 [regex101.com](https://regex101.com/) 等在线工具进行调试。

---

> **推荐阅读**  
> [正则表达式 30 分钟入门教程](https://deerchao.cn/tutorials/regex/regex.htm)  