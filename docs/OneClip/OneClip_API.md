# OneClip API 用户指南

> 让 OneClip 与你的工作流无缝集成

OneClip 提供了强大的 URL Scheme API，让你可以通过其他应用、脚本或快捷指令来控制 OneClip。无需编程基础，只需要简单的 URL 调用即可实现自动化。

---

## 快速开始

### 什么是 URL Scheme？

URL Scheme 就像是应用之间的"暗号"。通过特定格式的链接，你可以让一个应用去调用另一个应用的功能。

OneClip 的 URL Scheme 格式：
```
oneclip://操作名称?参数1=值1&参数2=值2
```

### 如何使用？

**方法 1：在终端中测试**

```bash
open "oneclip://latest"
```

**方法 2：在 Raycast 中使用**

- 创建 Script Command
- 添加 `open "oneclip://search?query=test"`

**方法 3：在 Alfred 中使用**

- 创建 Workflow
- 添加 Open URL 动作

**方法 4：在快捷指令中使用**

- 添加"打开 URL"动作
- 输入 OneClip URL

---

## 26 个实用功能

### 基础操作

#### 1. 搜索并粘贴
快速搜索历史记录并自动复制第一个匹配项。

```bash
open "oneclip://search?query=密码"
```

**使用场景**：

- 快速找回刚才复制的 API Token
- 搜索常用的代码片段
- 查找之前复制的地址

---

#### 2. 获取最新项目
复制最近的一条记录。

```bash
# 获取最新的任何类型
open "oneclip://latest"

# 只获取最新的文本
open "oneclip://latest?type=text"

# 只获取最新的图片
open "oneclip://latest?type=image"
```

**使用场景**：

- 快速重新复制刚才的内容
- 在不同应用间快速传递内容

---

#### 3. 粘贴指定项目
按位置或 ID 复制特定项目。

```bash
# 复制最新的（第 0 个）
open "oneclip://paste?index=0"

# 复制第 3 个
open "oneclip://paste?index=2"
```

**使用场景**：

- 快速访问最近的几条记录
- 在脚本中自动化粘贴操作

---

#### 4. 粘贴纯文本
复制内容但去除所有格式。

```bash
open "oneclip://paste-plain?index=0"
```

**使用场景**：

- 从网页复制文字但不要格式
- 清理富文本格式
- 在代码编辑器中粘贴干净的文本

---

#### 5. 添加新项目
从外部添加内容到 OneClip。

```bash
open "oneclip://add?content=这是一段文本"
```

**使用场景**：

- 从脚本输出保存到剪贴板历史
- 批量添加常用文本
- 自动化工作流

---

### 窗口控制

#### 6. 显示主窗口
打开 OneClip 主窗口。

```bash
# 直接打开
open "oneclip://show"

# 打开并搜索
open "oneclip://show?search=关键词"
```

**使用场景**：

- 快捷键打开 OneClip
- 打开并直接搜索特定内容

---

#### 7. 隐藏主窗口
隐藏 OneClip 主窗口。

```bash
open "oneclip://hide"
```

**使用场景**：

- 快捷键隐藏窗口
- 自动化脚本控制窗口
- 配合 show 实现完整窗口控制

---

#### 8. 切换窗口显示
智能切换主窗口显示/隐藏状态。

```bash
open "oneclip://toggle"
```

**使用场景**：

- 单一快捷键控制窗口
- 替代 show/hide 的简化版本
- Raycast/Alfred 快速切换

---

### 编辑功能

#### 9. 编辑项目内容
编辑指定文本项目的内容。

```bash
open "oneclip://edit?id=项目ID&content=新内容"
```

**使用场景**：

- 修正复制的文本错误
- 更新常用文本模板
- 批量编辑历史记录

**限制**：只能编辑文本类型的项目

---

#### 10. 设置项目标题
为项目设置或清除自定义标题。

```bash
# 设置标题
open "oneclip://set-title?id=项目ID&title=我的标题"

# 清除标题
open "oneclip://set-title?id=项目ID"
```

**使用场景**：

- 为重要项目添加备注
- 组织和分类历史记录
- 快速识别常用内容

---

### 快捷回复

#### 11. 获取快捷回复列表
查看所有快捷回复。

```bash
# 获取所有快捷回复
open "oneclip://quick-replies"

# 限制返回数量
open "oneclip://quick-replies?limit=10"
```

**使用场景**：

- 在其他应用中展示快捷回复
- 导出快捷回复数据
- 自动化选择常用回复

---

#### 12. 使用快捷回复
复制指定快捷回复到剪贴板。

```bash
open "oneclip://use-quick-reply?id=快捷回复ID"
```

**使用场景**：

- 快速插入常用回复
- 客服/邮件模板快速使用
- 代码片段快速粘贴

**限制**：只支持文本类型的快捷回复

---

#### 13. 添加快捷回复
添加新的快捷回复。

```bash
open "oneclip://add-quick-reply?content=内容&title=标题&category=分类"
```

**参数**：

- `content` (必需): 回复内容
- `title` (可选): 自定义标题
- `category` (可选): 分类名称

**使用场景**：

- 从脚本批量导入回复
- 自动保存常用文本
- 快速创建模板

---

### 查询功能

#### 14. 获取历史列表
查看剪贴板历史。

```bash
# 获取最近 10 条
open "oneclip://list?limit=10"

# 只看文本类型
open "oneclip://list?type=text&limit=5"
```

**使用场景**：

- 在其他应用中显示历史列表
- 导出最近的剪贴板记录

---

#### 15. 获取收藏列表
查看所有收藏的项目。

```bash
open "oneclip://favorites?limit=10"
```

**使用场景**：

- 快速访问常用内容
- 在其他工具中展示收藏

---

#### 16. 获取统计信息
查看使用统计。

```bash
open "oneclip://stats"
```

**返回信息**：

- 总记录数
- 收藏数量
- 置顶数量
- 各类型数量

**使用场景**：

- 了解剪贴板使用情况
- 监控历史记录增长

---

### 收藏管理

#### 17. 收藏项目
标记重要内容。

```bash
open "oneclip://favorite?id=项目ID"
```

**使用场景**：

- 保存重要的代码片段
- 标记常用的文本模板
- 收藏重要的链接

---

#### 18. 取消收藏
移除收藏标记。

```bash
open "oneclip://unfavorite?id=项目ID"
```

---

### 置顶管理

#### 19. 置顶项目
将项目固定在列表顶部。

```bash
open "oneclip://pin?id=项目ID"
```

**使用场景**：

- 固定当前项目的常用配置
- 置顶临时需要频繁使用的内容

---

#### 20. 取消置顶
取消固定。

```bash
open "oneclip://unpin?id=项目ID"
```

---

### 清理功能

#### 21. 清空历史
清理剪贴板历史。

```bash
# 清空全部
open "oneclip://clear"

# 保留收藏
open "oneclip://clear?keep_favorites=true"
```

**使用场景**：

- 定期清理历史记录
- 保护隐私
- 释放存储空间

---

#### 22. 删除项目
删除特定项目。

```bash
open "oneclip://delete?id=项目ID"
```

**使用场景**：

- 删除敏感信息
- 清理不需要的记录

---

## 实用场景示例

### 场景 1：快速搜索密码

在 Raycast 中创建 Script Command：

```bash
#!/bin/bash
open "oneclip://search?query=password"
```

设置快捷键 `⌘⇧P`，一键搜索包含 "password" 的历史记录。

---

### 场景 2：粘贴纯文本

在 Alfred 中创建 Hotkey Workflow：

- 触发器：`⌘⇧V`
- 动作：Open URL → `oneclip://paste-plain?index=0`

从网页复制内容后，按 `⌘⇧V` 粘贴纯文本。

---

### 场景 3：定时清理历史

在快捷指令中创建自动化：

- 触发：每天晚上 11 点
- 动作：打开 URL → `oneclip://clear?keep_favorites=true`

每天自动清理历史，但保留收藏。

---

### 场景 4：保存脚本输出

在 Shell 脚本中：

```bash
#!/bin/bash
result=$(some_command)
open "oneclip://add?content=$result"
```

将命令输出自动保存到 OneClip。

---

### 场景 5：快速访问最近 3 条

在 Keyboard Maestro 中：

- `⌘1` → `oneclip://paste?index=0`
- `⌘2` → `oneclip://paste?index=1`
- `⌘3` → `oneclip://paste?index=2`

数字键快速访问最近的记录。

---

### 场景 6：快速 OCR 识别

在 Raycast 中创建 Script Command：

```bash
#!/bin/bash
# 静默模式 OCR，直接复制结果
open "oneclip://ocr?silent=true"
```

设置快捷键 `⌘⇧O`，复制图片后一键识别文字。

---

### 场景 7：截图翻译工作流

在 Alfred 中创建 Workflow：

1. 触发器：`⌘⇧T`
2. 动作 1：截图 OCR → `oneclip://screenshot-ocr?silent=true`
3. 等待 2 秒
4. 动作 2：翻译 → `oneclip://translate?text={clipboard}&to=zh`

一键截图、识别、翻译。

---

### 场景 8：AI 摘要助手

在快捷指令中创建：

1. 获取剪贴板文本
2. 打开 URL → `oneclip://ai?text={clipboard}&feature=summary`

选中长文本后，一键生成摘要。

---

### 场景 9：编辑历史记录工作流

```bash
#!/bin/bash
# 1. 搜索项目
open "oneclip://search?query=API文档"
sleep 1

# 2. 获取列表找到 ID
open "oneclip://list?limit=5"
sleep 1

# 3. 编辑内容（需要手动替换 UUID）
open "oneclip://edit?id=YOUR-UUID&content=更新后的API文档"

# 4. 设置标题
open "oneclip://set-title?id=YOUR-UUID&title=API文档v2"
```

---

### 场景 10：快捷回复自动化

```bash
#!/bin/bash
# 添加常用回复
open "oneclip://add-quick-reply?content=感谢您的反馈，我们会尽快处理&title=客服回复&category=客服"

# 查看所有回复
open "oneclip://quick-replies"

# 使用回复（需要手动替换 UUID）
open "oneclip://use-quick-reply?id=YOUR-UUID"
```

---

### 场景 11：窗口控制快捷键

在 Raycast 中创建多个 Script Command：

**切换窗口**：
```bash
#!/bin/bash
# @raycast.title Toggle OneClip
# @raycast.mode silent
open "oneclip://toggle"
```

**显示并搜索**：
```bash
#!/bin/bash
# @raycast.title Search in OneClip
# @raycast.mode silent
# @raycast.argument1 { "type": "text", "placeholder": "Search query" }
open "oneclip://show?search=$1"
```

---

## 高级技巧

### 获取项目 ID

要使用需要 ID 的 API（如收藏、置顶、删除），你需要先获取项目 ID：

```bash
# 获取历史列表（包含 ID）
open "oneclip://list?limit=5"
```

查看通知或日志中的返回数据，找到项目的 UUID。

---

### 组合使用

你可以在脚本中组合多个 API：

```bash
#!/bin/bash
# 搜索并收藏
open "oneclip://search?query=重要"
sleep 1
# 获取最新项目的 ID 后收藏
# (需要从返回数据中解析 ID)
```

---

### 在 Raycast 中使用

创建 Script Command（`search-clipboard.sh`）：

```bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Search Clipboard
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 📋
# @raycast.argument1 { "type": "text", "placeholder": "Search query" }

open "oneclip://search?query=$1"
```

---

### 在 Alfred 中使用

创建 Workflow：

1. 添加 Keyword Input：`oc {query}`
2. 连接 Open URL：`oneclip://search?query={query}`
3. 设置快捷键

---

## 常见问题

### Q: 如何知道 API 是否执行成功？

OneClip 会显示系统通知告知操作结果。你也可以查看日志：

```bash
tail -f ~/Library/Application\ Support/OneClip/Logs/*.log
```

---

### Q: 可以在 iOS 上使用吗？

目前 OneClip API 仅支持 macOS。

---

### Q: 如何 URL 编码特殊字符？

在终端中使用 `jq` 或 Python：

```bash
# 使用 Python
python3 -c "import urllib.parse; print(urllib.parse.quote('你好世界'))"

# 在 URL 中使用
open "oneclip://search?query=%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"
```

---

### Q: 可以批量操作吗？

可以在脚本中循环调用 API，但建议添加延迟避免过快：

```bash
for i in {0..4}; do
    open "oneclip://paste?index=$i"
    sleep 0.5
done
```

---

## 完整 API 速查表

| 编号 | API 名称 | 功能 | 必需参数 |
|------|---------|------|---------|
| 1 | `search` | 搜索并复制 | query |
| 2 | `latest` | 获取最新项目 | - |
| 3 | `paste` | 粘贴指定项目 | id 或 index |
| 4 | `add` | 添加新项目 | content |
| 5 | `show` | 显示主窗口 | - |
| 6 | `hide` | 隐藏主窗口 | - |
| 7 | `toggle` | 切换窗口 | - |
| 8 | `list` | 获取历史列表 | - |
| 9 | `favorites` | 获取收藏列表 | - |
| 10 | `stats` | 获取统计信息 | - |
| 11 | `favorite` | 收藏项目 | id |
| 12 | `unfavorite` | 取消收藏 | id |
| 13 | `pin` | 置顶项目 | id |
| 14 | `unpin` | 取消置顶 | id |
| 15 | `edit` | 编辑项目内容 | id, content |
| 16 | `set-title` | 设置项目标题 | id |
| 17 | `quick-replies` | 获取快捷回复列表 | - |
| 18 | `use-quick-reply` | 使用快捷回复 | id |
| 19 | `add-quick-reply` | 添加快捷回复 | content |
| 20 | `paste-plain` | 粘贴纯文本 | id 或 index |
| 21 | `clear` | 清空历史 | - |
| 22 | `delete` | 删除项目 | id |
| 23 | `ocr` | 剪贴板 OCR | - |
| 24 | `screenshot-ocr` | 截图 OCR | - |
| 25 | `ai` | AI 处理文本 | text, feature |
| 26 | `translate` | 翻译文本 | text, to |

---

---

### OCR 功能

#### 23. 剪贴板 OCR
对剪贴板中的图片进行文字识别。

```bash
# 普通模式（显示识别窗口）
open "oneclip://ocr"

# 静默模式（直接复制结果）
open "oneclip://ocr?silent=true"
```

**使用场景**：

- 识别截图中的文字
- 提取图片中的文本内容
- 快速数字化纸质文档

---

#### 24. 截图 OCR
截图并自动识别文字。

```bash
# 普通模式（显示识别窗口）
open "oneclip://screenshot-ocr"

# 静默模式（直接复制结果）
open "oneclip://screenshot-ocr?silent=true"
```

**使用场景**：

- 快速提取屏幕上的文字
- 识别无法复制的文本
- 从视频或图片中提取字幕

---

### AI 功能

#### 25. AI 处理文本
使用 AI 对文本进行智能处理。

```bash
# 生成摘要
open "oneclip://ai?text=长文本内容&feature=summary"

# 智能格式化
open "oneclip://ai?text=需要格式化的文本&feature=format"
```

**支持的功能**：

- `summary` - 生成文本摘要
- `format` - 智能格式化文本

**使用场景**：

- 快速总结长文章
- 整理混乱的文本格式
- 提取关键信息

---

#### 26. 翻译文本
智能翻译文本内容。

```bash
# 翻译为中文
open "oneclip://translate?text=Hello World&to=zh"

# 翻译为英文
open "oneclip://translate?text=你好世界&to=en"
```

**支持的语言**：

- `zh` / `chinese` / `中文` - 翻译为中文
- `en` / `english` / `英文` - 翻译为英文

**使用场景**：

- 快速翻译外文内容
- 双语写作辅助
- 学习外语时查词

---

**让 OneClip 成为你工作流的一部分！** 
