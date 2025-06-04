---
title: MkDocs文档AI摘要
tags:
  - Mkdocs
status: new
---  

# MkDocs AI Hooks

仓库地址：https://github.com/Wcowin/mkdocs-ai-hooks
在线预览：https://wcowin.work/mkdocs-ai-hooks/

<p align="center">
    <img src="https://img.shields.io/badge/MkDocs-Hooks-526CFE?style=for-the-badge&logo=MaterialForMkDocs&logoColor=white" alt="MkDocs Hooks">
    <img src="https://img.shields.io/badge/AI_Powered-DeepSeek-FF6B35?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered">
    <img src="https://img.shields.io/badge/Python-3.7+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.7+">
</p>

<p align="center">
    <a href="/">中文</a> | <a href="https://github.com/Wcowin/mkdocs-ai-hooks/blob/main/README-en.md">English</a>
</p>

🚀 **您的MkDocs文档首选智能摘要！**   
这个项目利用MkDocs hooks，为您的技术文档和博客添加AI驱动的摘要生成和智能阅读统计功能。
![iShot 2025 06 03 13.39.35](https://s1.imagehub.cc/images/2025/06/03/d1563500263b22cfd0ffc3679993aa83.jpg)
![image](https://s1.imagehub.cc/images/2025/06/03/526b59b6a2e478f2ffa1629320e3e2ce.png)

网站效果预览：https://wcowin.work/Mkdocs-Wcowin/blog/Mkdocs/mkfirst/

## ✨ 功能特性

### AI智能摘要
- **自动生成文章摘要**：使用DeepSeek API生成高质量的80-120字摘要
- **多语言支持**：支持中文、英文等多种语言
- **多API服务支持**：支持OpenAI、Claude等多种AI服务
- **智能内容清理**：自动过滤YAML、HTML、代码块等格式内容
- **备用摘要机制**：API失败时提供基于规则的智能摘要
- **高效缓存系统**：避免重复API调用，7天智能过期
- **灵活配置**：支持文件夹级别和页面级别的精确控制

### 智能阅读统计(可选)
- **精准中文字符统计**：专门优化的中文内容识别
- **智能代码检测**：识别多种编程语言和命令行代码
- **阅读时间估算**：基于中文阅读习惯的400字/分钟计算
- **美观信息展示**：使用MkDocs Material风格的信息框

### 智能化特性
- **自动语言识别**：支持30+编程语言和标记语言
- **内容类型检测**：区分代码、配置、命令行等不同内容
- **缓存优化**：LRU缓存提升性能
- **错误处理**：完善的异常处理和日志记录

## 📦 安装

### 方法1  
直接下载（推荐）  
在releases页面下载，解压后将以下文件放入您的MkDocs项目的docs/overrides/hooks中：
https://github.com/Wcowin/mkdocs-ai-hooks/releases    


或者下载上方hooks目录下的两个Python文件：  

- `ai_summary.py`：AI摘要生成器  

- `reading_time.py`：阅读时间统计器

```bash
# 放置到您的项目目录
mkdir -p docs/overrides/hooks/
mv ai_summary.py docs/overrides/hooks/
mv reading_time.py docs/overrides/hooks/
```
放置的位置如下：
![image](https://s1.imagehub.cc/images/2025/06/03/8b1c7485da460dfd6f61c15cde89b5e5.png)

在 `mkdocs.yml` 中theme下添加custom_dir：
```yaml
# 可选：Material主题配置
theme:
  name: material
  custom_dir: docs/overrides #一定要有！一定要有！
  features:
    - content.code.copy
    - content.code.select
```

### 方法2  

使用Git克隆
```bash
git clone  https://github.com/Wcowin/mkdocs-ai-hooks.git
cd mkdocs-ai-hooks 
pip install -r requirements.txt
```

### 依赖安装
```bash
pip install requirements.txt
```

## 🚀 快速开始

### 1. 配置MkDocs
先执行一次`mkdocs build`，生成缓存文件
```bash
mkdocs build 
```
在 `mkdocs.yml` 中添加hooks，theme下添加custom_dir：
```yaml
hooks:
  - docs/overrides/hooks/ai_summary.py # 添加AI摘要hook
  - docs/overrides/hooks/reading_time.py # 添加统计阅读时间hook

# 可选：Material主题配置
theme:
  name: material
  custom_dir: docs/overrides #一定要有！！
  features:
    - content.code.copy
    - content.code.select
```

### 2. 在ai_summary.py中配置需要AI摘要的目录
```python
# 📂 可自定义的文件夹配置
self.enabled_folders = [
    'blog/',      # blog文件夹
    'develop/',   # develop文件夹
    # 在这里添加您想要启用AI摘要的文件夹
]

# 📋 排除的文件和文件夹
self.exclude_patterns = [
    'waline.md', 'link.md', '404.md', 'tag.md', 'tags.md',
    '/about/', '/search/', '/sitemap', 'index.md',  # 根目录index.md
]

# 📋 排除的特定文件
self.exclude_files = [
    'blog/index.md',
    'blog/indexblog.md',
    'docs/index.md',
    'develop/index.md',
]
```

### 3. 在ai_summary.py中设置DeepSeek API(默认是OpenAI)
```python
# 在ai_summary.py中修改API配置
'deepseek': {
    'url': 'https://api.deepseek.com/v1/chat/completions',
    'model': 'deepseek-chat',
    'api_key': os.getenv('DEEPSEEK_API_KEY', 'your-azure-api-key'),
    'max_tokens': 150,
    'temperature': 0.3
},
```

### 4. 运行MkDocs
第一次运行时，可能需要等待一段时间，因为系统会自动生成摘要。后续运行时，系统会使用缓存数据，加快生成速度。
```bash
#依次运行命令
mkdocs build 
mkdocs serve
```
终端输出如下：
![image](https://s1.imagehub.cc/images/2025/06/03/a287b109428d7e4e61afe7212e045860.png)

## 📖 使用指南

### AI摘要配置

#### 文件夹级别控制
```python
# 启用特定文件夹
configure_ai_summary(['blog/', 'docs/', 'tutorials/'])

# 全局启用（除排除项）
configure_ai_summary([''])
```

#### 页面级别控制(推荐)
在Markdown文件的YAML front matter中：

```yaml
---
title: 文章标题
ai_summary: true   # 启用AI摘要
---
```
![iShot 2025 06 03 13.46.03](https://s1.imagehub.cc/images/2025/06/03/6b40a854fe57ef33b40c580ab4a7c802.jpg)
```yaml
---
title: 文章标题
ai_summary: false  # 禁用AI摘要
description: 手动摘要  # 可选
---
```

### 阅读时间配置

#### 排除特定页面
```python
# 在页面的YAML front matter中
---
title: 页面标题
hide_reading_time: true  # 隐藏阅读时间
---
```

## 🎨 显示效果

### AI摘要显示
```markdown
!!! info "🤖 AI智能摘要"
    本文详细介绍了MkDocs hooks的开发和使用方法，涵盖AI摘要生成、阅读时间统计等功能实现。通过DeepSeek API集成和智能缓存机制，为技术文档提供自动化的内容增强服务。

# 您的文章标题
文章内容...
```

### 阅读信息显示
```markdown
!!! info "📖 阅读信息"
    阅读时间：**3** 分钟 | 中文字符：**1247** | 有效代码行数：**45**

# 您的文章标题
文章内容...
```  

**实际效果：**
![iShot 2025 06 03 13.22.14](https://s1.imagehub.cc/images/2025/06/03/8e4818b5b73c07d9b90a7471b1bfcbae.jpg)

### API花费
一次大约0.03-0.05元（中大型文档）
可以说相当经济实惠了！

#### 免费openai额度获取  

推荐使用：[chatanywhere](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8 )  

申请好后得到sk-开头的密钥，在ai_summary.py的多AI服务配置部分替换为以下内容：

```python
'openai': {
    'url': 'https://api.chatanywhere.tech/v1/chat/completions',
    'model': 'gpt-3.5-turbo',  # 或 'gpt-4', 'gpt-4-turbo'
    'api_key': os.getenv('OPENAI_API_KEY', 'your_openai_api_key'),
    'max_tokens': 150,
    'temperature': 0.3
},
```

```python
# 默认使用的AI服务
self.default_service = 'openai'
```


但是我这里也推荐使用[DeepSeek](https://platform.deepseek.com/usage) API，额度充足且性能优秀。

## ⚙️ 高级配置

### 自定义API服务
```python
# 支持其他AI服务
self.api_config = {
    'url': 'https://your-api-endpoint.com/v1/chat/completions',
    'model': 'your-model',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
}
```

### 自定义提示词
```python
# 修改AI摘要的提示词
def generate_ai_summary(self, content, page_title=""):
    prompt = f"""您的自定义提示词...
    
    文章标题：{page_title}
    文章内容：{content[:2500]}
    """
```

### 缓存配置
```python
# 修改缓存过期时间（天数）
cache_time = datetime.fromisoformat(cache_data.get('timestamp', '1970-01-01'))
if (datetime.now() - cache_time).days < 30:  # 改为30天
    return cache_data
```
注意注意注意！！！  
切换api服务后，要删除site/.ai_cache这个缓存文件，才可以重新生成摘要！！！**(这个问题已经解决了，切换api服务后，会自动删除缓存文件，无需手动删除)**

<!-- ## 🔧 自定义开发

### 扩展AI服务支持
```python
class AISummaryGenerator:
    def add_ai_service(self, service_name, config):
        """添加新的AI服务支持"""
        self.ai_services[service_name] = config
    
    def generate_summary_with_service(self, content, service_name):
        """使用指定服务生成摘要"""
        # 您的实现
        pass
``` -->

### 自定义摘要格式
```python
def format_summary(self, summary, ai_service):
    """自定义摘要显示格式"""
    return f'''!!! note "✨ 自定义摘要"
    {summary}
    
    *由 {ai_service} 生成*
'''
```

## 🌍 多语言支持

### 英文内容优化（Todo）
```python
# 阅读时间计算（英文：200词/分钟）
def calculate_english_reading_time(word_count):
    return max(1, round(word_count / 200))
```

### 其他语言扩展（Todo）
```python
# 支持日文、韩文等
JAPANESE_CHARS_PATTERN = re.compile(r'[\u3040-\u309F\u30A0-\u30FF]')
KOREAN_CHARS_PATTERN = re.compile(r'[\uAC00-\uD7AF]')
```

## 📊 性能优化

- **LRU缓存**：函数级别缓存提升性能
- **正则预编译**：提高文本处理速度
- **智能过滤**：减少不必要的API调用
- **异步支持**：可扩展为异步处理（TODO）

## 🤝 贡献指南

我们欢迎各种形式的贡献！

1. **Fork** 这个仓库
2. 创建您的特性分支 
3. 提交您的更改
4. 推送到分支
5. 打开一个 **Pull Request**

### 开发环境设置
```bash
# 克隆仓库
git clone https://github.com/Wcowin/mkdocs-ai-hooks.git
cd mkdocs-ai-hooks

# 安装依赖
pip install -r requirements.txt

```

## 📝 更新日志

### v1.0.0 (2025-06-03)
- ✨ 初始发布
- 🤖 AI智能摘要功能
- 📖 阅读时间统计功能
- 💾 智能缓存系统
- 🎯 灵活配置选项

### 计划功能
- [x] 多AI服务支持（OpenAI、Claude等）
- [x] 自动选择最佳API
- [ ] API密钥安全处理(重要)
- [ ] 批量处理模式
- [ ] 统计数据导出
- [ ] Web界面配置

## 🐛 问题反馈

如果您遇到任何问题，请在 [Issues](https://github.com/Wcowin/mkdocs-ai-hooks/issues) 中提交。

提交问题时请包含：
- MkDocs版本
- Python版本
- 错误信息
- 复现步骤

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

- [MkDocs](https://www.mkdocs.org/) - 静态站点生成器
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) - 优秀的主题
- [DeepSeek](https://deepseek.com/) - AI API服务
- 所有贡献者和使用者

# Connect with me

<center>

**Telegram**

<p align="center">
  <a href="https://t.me/wecowin" target="_blank">
    <img src="https://pica.zhimg.com/80/v2-d5876bc0c8c756ecbba8ff410ed29c14_1440w.webp" alt="个人名片" style="border-radius: 10px;" width="50%">
  </a>
</p>


**Wechat**  
<!-- ![](https://s1.imagehub.cc/images/2024/02/02/bb9ee71b03ee7a3b87caad5cc4bcebff.jpeg) -->
<p align="center">
<img src="https://pic3.zhimg.com/80/v2-5ef3dde831c9d0a41fe35fabb0cb8784_1440w.webp" style="border-radius: 10px;" width="50%">
</p>

</center>


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Wcowin/mkdocs-ai-hooks&type=Date)](https://www.star-history.com/#Wcowin/mkdocs-ai-hooks&Date)


## 请作者喝杯咖啡  

<p align="center">
  <a href="https://s1.imagehub.cc/images/2025/05/11/36eb33bf18f9041667267605b6b99bd0.jpeg" target="_blank">
   <center>
    <img src="https://s1.imagehub.cc/images/2025/05/11/36eb33bf18f9041667267605b6b99bd0.jpeg" style="width: 450px; height: auto; border-radius: 25px;" >
    </center>  
  </a>
</center>

<p align="center">
    如果这个项目对您有帮助，请给它一个 ⭐ Star！
</p>

<p align="center">
    <a href="https://github.com/Wcowin/mkdocs-ai-hooks/stargazers">
        <img src="https://img.shields.io/github/stars/Wcowin/mkdocs-ai-hooks?style=social" alt="Stars">
    </a>
    <a href="https://github.com/Wcowin/mkdocs-ai-hooks/network/members">
        <img src="https://img.shields.io/github/forks/Wcowin/mkdocs-ai-hooks?style=social" alt="Forks">
    </a>
</p>


📝 本项目致力于让MkDocs文档更加智能化和用户友好。如有建议或想法，欢迎交流！