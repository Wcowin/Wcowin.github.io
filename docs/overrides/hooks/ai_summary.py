import re
import json
import hashlib
import requests
from pathlib import Path
from datetime import datetime
import os
import shutil

class AISummaryGenerator:
    def __init__(self):
        self.cache_dir = Path("site/.ai_cache")
        self.cache_dir.mkdir(exist_ok=True)
        
        # 添加服务配置文件，用于跟踪当前使用的服务
        self.service_config_file = self.cache_dir / "service_config.json"
        
        # 🤖 多AI服务配置
        self.ai_services = {
            'deepseek': {
                'url': 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
                'model': 'deepseek-v3-250324',
                'api_key': os.getenv('DEEPSEEK_API_KEY', '42b2e3d9-454a-4970-a4a3-c6c1fcd6220b'),
                'max_tokens': 150,
                'temperature': 0.3
            },
            'openai': {
                'url': 'https://api.chatanywhere.tech/v1/chat/completions',
                'model': 'gpt-3.5-turbo',  # 或 'gpt-4', 'gpt-4-turbo'
                'api_key': os.getenv('OPENAI_API_KEY', 'sk-vTIWRtY595O8K7NxhNMPohGGrEimNFspS6iLDH1yjORy7Lcj'),
                'max_tokens': 150,
                'temperature': 0.3
            },
            # 'claude': {
            #     'url': 'https://api.anthropic.com/v1/messages',
            #     'model': 'claude-3-haiku-20240307',
            #     'api_key': os.getenv('ANTHROPIC_API_KEY', 'your-claude-api-key'),
            #     'max_tokens': 150,
            #     'temperature': 0.3
            # },
            'gemini': {
                'url': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                'model': 'gemini-pro',
                'api_key': os.getenv('GOOGLE_API_KEY', 'AIzaSyDwWgffCCyVFZVsRasX3B3arWFaCT1PzNI'),
                'max_tokens': 150,
                'temperature': 0.3
            }
        }
        
        # 默认使用的AI服务
        self.default_service = 'deepseek'
        
        # 服务优先级（按顺序尝试）
        self.service_fallback_order = ['openai', 'deepseek', 'claude', 'gemini']
        
        # 📂 可自定义的文件夹配置
        self.enabled_folders = [
            'blog/',      # blog文件夹
            'develop/',   # develop文件夹
            # 'posts/',     # posts文件夹
            # 'trip/',     # trip文件夹
            # 'about/',     # about文件夹
        ]
        
        # 📋 排除的文件和文件夹
        self.exclude_patterns = [
            'waline.md', 'link.md', '404.md', 'tag.md', 'tags.md',
            '/about/', '/search/', '/sitemap', '/admin/',
            'index.md',  # 根目录index.md
        ]
        
        # 📋 排除的特定文件
        self.exclude_files = [
            'blog/index.md',
            'blog/indexblog.md',
            'docs/index.md',
            'develop/index.md',
        ]
        
        # 🌍 语言配置/Language Configuration
        self.summary_language = 'zh'  # 默认中文，可选 'zh'、'en'、'both'
        
        # 检查服务变更并处理缓存
        self._check_service_change()
    
    def _check_service_change(self):
        """检查AI服务是否发生变更，如有变更则自动清理缓存"""
        current_config = {
            'default_service': self.default_service,
            'available_services': list(self.ai_services.keys()),
            'summary_language': self.summary_language,
            'check_time': datetime.now().isoformat()
        }
        
        if self.service_config_file.exists():
            try:
                with open(self.service_config_file, 'r', encoding='utf-8') as f:
                    previous_config = json.load(f)
                
                # 检查默认服务或语言是否变更
                if (previous_config.get('default_service') != current_config['default_service'] or
                    previous_config.get('summary_language') != current_config['summary_language']):
                    old_service = previous_config.get('default_service', 'unknown')
                    new_service = current_config['default_service']
                    old_lang = previous_config.get('summary_language', 'zh')
                    new_lang = current_config['summary_language']
                    
                    if old_service != new_service:
                        print(f"🔄 检测到AI服务变更: {old_service} → {new_service}")
                    if old_lang != new_lang:
                        print(f"🌍 检测到语言变更: {old_lang} → {new_lang}")
                    
                    print("🧹 自动清理AI摘要缓存...")
                    
                    try:
                        # 删除整个缓存目录
                        if self.cache_dir.exists():
                            shutil.rmtree(self.cache_dir)
                            print(f"✅ 已删除缓存文件夹: {self.cache_dir}")
                        
                        # 重新创建缓存目录
                        self.cache_dir.mkdir(exist_ok=True)
                        print("📁 已重新创建缓存目录")
                        
                    except Exception as e:
                        print(f"❌ 清理缓存失败: {e}")
                        # 如果删除失败，尝试清理单个文件
                        try:
                            self._clear_cache_files()
                        except:
                            print("⚠️ 缓存清理失败，新摘要可能会混用旧配置的缓存")
                
            except Exception as e:
                print(f"读取服务配置失败: {e}")
        
        # 保存当前配置
        try:
            with open(self.service_config_file, 'w', encoding='utf-8') as f:
                json.dump(current_config, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"保存服务配置失败: {e}")
    
    def _clear_cache_files(self):
        """清理缓存文件（备用方法）"""
        cleared_count = 0
        try:
            for cache_file in self.cache_dir.glob("*.json"):
                if cache_file.name != "service_config.json":
                    cache_file.unlink()
                    cleared_count += 1
            print(f"✅ 已清理 {cleared_count} 个缓存文件")
        except Exception as e:
            print(f"❌ 单文件清理失败: {e}")
    
    def configure_ai_service(self, service_name, config=None):
        """
        配置AI服务
        
        Args:
            service_name: 服务名称 ('deepseek', 'openai', 'azure_openai', 'claude', 'gemini')
            config: 服务配置字典
        """
        old_service = self.default_service
        
        if config:
            self.ai_services[service_name] = config
        self.default_service = service_name
        
        # 如果服务发生变更，自动清理缓存
        if old_service != service_name:
            print(f"🔄 AI服务已切换: {old_service} → {service_name}")
            print("🧹 自动清理所有AI摘要缓存...")
            
            try:
                if self.cache_dir.exists():
                    shutil.rmtree(self.cache_dir)
                    print(f"✅ 已删除缓存文件夹: {self.cache_dir}")
                
                # 重新创建缓存目录
                self.cache_dir.mkdir(exist_ok=True)
                print("📁 已重新创建缓存目录")
                
            except Exception as e:
                print(f"❌ 清理缓存失败: {e}")
                # 如果删除失败，尝试清理单个文件
                try:
                    self._clear_cache_files()
                except:
                    print("⚠️ 缓存清理失败，新摘要可能会混用旧服务的缓存")
        
        # 更新服务配置记录
        self._check_service_change()
    
    def configure_language(self, language='zh'):
        """
        配置摘要语言
        
        Args:
            language: 语言设置 ('zh': 中文, 'en': 英文, 'both': 双语)
        """
        old_language = self.summary_language
        self.summary_language = language
        
        if old_language != language:
            print(f"🌍 摘要语言已切换: {old_language} → {language}")
            print("🧹 自动清理摘要缓存以应用新语言设置...")
            
            try:
                if self.cache_dir.exists():
                    shutil.rmtree(self.cache_dir)
                    print(f"✅ 已删除缓存文件夹: {self.cache_dir}")
                
                # 重新创建缓存目录
                self.cache_dir.mkdir(exist_ok=True)
                print("📁 已重新创建缓存目录")
                
            except Exception as e:
                print(f"❌ 清理缓存失败: {e}")
        
        # 更新服务配置记录
        self._check_service_change()
    
    def configure_folders(self, folders=None, exclude_patterns=None, exclude_files=None):
        """配置启用AI摘要的文件夹"""
        if folders is not None:
            self.enabled_folders = folders
        if exclude_patterns is not None:
            self.exclude_patterns = exclude_patterns
        if exclude_files is not None:
            self.exclude_files = exclude_files
    
    def get_content_hash(self, content):
        """生成内容hash用于缓存（包含语言设置）"""
        content_with_lang = f"{content}_{self.summary_language}"
        return hashlib.md5(content_with_lang.encode('utf-8')).hexdigest()
    
    def get_cached_summary(self, content_hash):
        """获取缓存的摘要"""
        cache_file = self.cache_dir / f"{content_hash}.json"
        if cache_file.exists():
            try:
                with open(cache_file, 'r', encoding='utf-8') as f:
                    cache_data = json.load(f)
                    # 检查缓存是否过期（7天）
                    cache_time = datetime.fromisoformat(cache_data.get('timestamp', '1970-01-01'))
                    if (datetime.now() - cache_time).days < 7:
                        return cache_data
            except:
                pass
        return None
    
    def save_summary_cache(self, content_hash, summary_data):
        """保存摘要到缓存"""
        cache_file = self.cache_dir / f"{content_hash}.json"
        try:
            summary_data['timestamp'] = datetime.now().isoformat()
            summary_data['language'] = self.summary_language
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(summary_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"保存摘要缓存失败: {e}")
    
    def clean_content_for_ai(self, markdown):
        """清理内容，提取主要文本用于AI处理"""
        content = markdown
        
        # 移除YAML front matter
        content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
        
        # 移除已存在的阅读信息块和AI摘要块
        content = re.sub(r'!!! info "📖 阅读信息".*?(?=\n\n|\n#|\Z)', '', content, flags=re.DOTALL)
        content = re.sub(r'!!! info "🤖 AI智能摘要".*?(?=\n\n|\n#|\Z)', '', content, flags=re.DOTALL)
        content = re.sub(r'!!! tip "📝 自动摘要".*?(?=\n\n|\n#|\Z)', '', content, flags=re.DOTALL)
        
        # 移除HTML标签
        content = re.sub(r'<[^>]+>', '', content)
        
        # 移除图片，保留alt文本作为内容提示
        content = re.sub(r'!\[([^\]]*)\]\([^)]+\)', r'[图片：\1]', content)
        
        # 移除链接，保留文本
        content = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content)
        
        # 移除代码块，但保留关键信息
        content = re.sub(r'```(\w+)?\n(.*?)\n```', r'[代码示例]', content, flags=re.DOTALL)
        
        # 移除行内代码
        content = re.sub(r'`[^`]+`', '[代码]', content)
        
        # 移除表格格式但保留内容
        content = re.sub(r'\|[^\n]+\|', '', content)
        content = re.sub(r'^[-|:\s]+$', '', content, flags=re.MULTILINE)
        
        # 清理格式符号
        content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)  # 粗体
        content = re.sub(r'\*([^*]+)\*', r'\1', content)      # 斜体
        content = re.sub(r'^#+\s*', '', content, flags=re.MULTILINE)  # 标题符号
        
        # 移除多余的空行和空格
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = re.sub(r'^[ \t]+', '', content, flags=re.MULTILINE)
        content = content.strip()
        
        return content
    
    def build_headers(self, service_config):
        """构建请求头"""
        headers = {
            'Content-Type': 'application/json'
        }
        
        # 根据服务类型添加认证头
        if 'azure_openai' in service_config.get('url', ''):
            headers['api-key'] = service_config['api_key']
        elif 'anthropic.com' in service_config.get('url', ''):
            headers['x-api-key'] = service_config['api_key']
            headers['anthropic-version'] = '2023-06-01'
        elif 'googleapis.com' in service_config.get('url', ''):
            # Google API使用URL参数
            pass
        else:
            # OpenAI和DeepSeek使用Bearer token
            headers['Authorization'] = f"Bearer {service_config['api_key']}"
        
        # 添加额外的头部
        if 'headers_extra' in service_config:
            headers.update(service_config['headers_extra'])
        
        return headers
    
    def build_payload(self, service_name, service_config, content, page_title):
        """构建请求载荷"""
        # 根据语言设置生成不同的prompt
        if self.summary_language == 'en':
            prompt = f"""Please generate a high-quality summary for the following technical article with these requirements:

1. **Length Control**: Strictly limit to 80-120 words
2. **Content Requirements**:
   - Accurately summarize the core themes and key points of the article
   - Highlight technical features, application scenarios, or problems solved
   - Use professional but understandable language
   - Avoid repeating the article title content
3. **Format Requirements**:
   - Return summary content directly without any prefix or suffix
   - Use concise declarative sentences
   - Technical terms are appropriate

Article Title: {page_title}

Article Content:
{content[:2500]}

Please generate summary:"""

        elif self.summary_language == 'both':
            prompt = f"""Please generate a bilingual summary (Chinese and English) for the following technical article with these requirements:

1. **Length Control**: 
   - Chinese: 80-120 characters
   - English: 80-120 words
2. **Content Requirements**:
   - Accurately summarize the core themes and key points
   - Highlight technical features, application scenarios, or problems solved
   - Use professional but understandable language
   - Avoid repeating the article title content
3. **Format Requirements**:
   - First provide Chinese summary
   - Then provide English summary
   - Separate with a blank line
   - No prefixes or additional formatting

Article Title: {page_title}

Article Content:
{content[:2500]}

Please generate bilingual summary:"""

        else:  # 默认中文
            prompt = f"""请为以下技术文章生成一个高质量的摘要，要求：

1. **长度控制**：严格控制在80-120字以内
2. **内容要求**：
   - 准确概括文章的核心主题和关键要点
   - 突出技术特点、应用场景或解决的问题
   - 使用专业但易懂的语言
   - 避免重复文章标题的内容
3. **格式要求**：
   - 直接返回摘要内容，无需任何前缀或后缀
   - 使用简洁的陈述句
   - 可以适当使用技术术语

文章标题：{page_title}

文章内容：
{content[:2500]}

请生成摘要："""

        if service_name == 'claude':
            # Claude API格式
            return {
                "model": service_config['model'],
                "max_tokens": service_config['max_tokens'],
                "temperature": service_config['temperature'],
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }
        elif service_name == 'gemini':
            # Gemini API格式
            return {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": prompt
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": service_config['temperature'],
                    "maxOutputTokens": service_config['max_tokens']
                }
            }
        else:
            # OpenAI格式 (OpenAI, DeepSeek, Azure OpenAI)
            system_content = {
                'zh': "你是一个专业的技术文档摘要专家，擅长提取文章核心要点并生成简洁准确的中文摘要。",
                'en': "You are a professional technical documentation summary expert, skilled at extracting core points from articles and generating concise and accurate English summaries.",
                'both': "You are a professional technical documentation summary expert, skilled at extracting core points from articles and generating concise and accurate bilingual summaries in both Chinese and English."
            }
            
            return {
                "model": service_config['model'],
                "messages": [
                    {
                        "role": "system",
                        "content": system_content.get(self.summary_language, system_content['zh'])
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "max_tokens": service_config['max_tokens'] * (2 if self.summary_language == 'both' else 1),
                "temperature": service_config['temperature'],
                "top_p": 0.9
            }
    
    def extract_response_content(self, service_name, response_data):
        """从响应中提取内容"""
        try:
            if service_name == 'claude':
                return response_data['content'][0]['text']
            elif service_name == 'gemini':
                return response_data['candidates'][0]['content']['parts'][0]['text']
            else:
                # OpenAI格式
                return response_data['choices'][0]['message']['content']
        except (KeyError, IndexError) as e:
            print(f"解析{service_name}响应失败: {e}")
            return None
    
    def generate_ai_summary_with_service(self, content, page_title, service_name):
        """使用指定服务生成摘要"""
        if service_name not in self.ai_services:
            print(f"不支持的AI服务: {service_name}")
            return None
        
        service_config = self.ai_services[service_name]
        
        # 检查API密钥
        if not service_config['api_key'] or service_config['api_key'].startswith('your-'):
            print(f"{service_name} API密钥未配置")
            return None
        
        try:
            headers = self.build_headers(service_config)
            payload = self.build_payload(service_name, service_config, content, page_title)
            
            # 对于Google API，添加API密钥到URL
            url = service_config['url']
            if service_name == 'gemini':
                url = f"{url}?key={service_config['api_key']}"
            
            response = requests.post(
                url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                summary = self.extract_response_content(service_name, result)
                
                if summary:
                    # 清理可能的格式问题
                    summary = re.sub(r'^["""''`]+|["""''`]+$', '', summary.strip())
                    summary = re.sub(r'^\s*摘要[：:]\s*', '', summary)
                    summary = re.sub(r'^\s*总结[：:]\s*', '', summary)
                    summary = re.sub(r'^\s*Summary[：:]\s*', '', summary)
                    summary = re.sub(r'^\s*Abstract[：:]\s*', '', summary)
                    return summary
                
            else:
                print(f"{service_name} API请求失败: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"{service_name} API请求异常: {e}")
            return None
        except Exception as e:
            print(f"{service_name} 摘要生成异常: {e}")
            return None
    
    def generate_ai_summary(self, content, page_title=""):
        """生成AI摘要（支持多服务降级）"""
        # 按优先级尝试不同服务
        services_to_try = [self.default_service] + [s for s in self.service_fallback_order if s != self.default_service]
        
        for service_name in services_to_try:
            if service_name in self.ai_services:
                lang_desc = {'zh': '中文', 'en': '英文', 'both': '双语'}
                print(f"🔄 尝试使用 {service_name} 生成{lang_desc.get(self.summary_language, '中文')}摘要...")
                summary = self.generate_ai_summary_with_service(content, page_title, service_name)
                if summary:
                    return summary, service_name
        
        print("⚠️ 所有AI服务均不可用，使用备用摘要")
        return None, None
    
    def generate_fallback_summary(self, content, page_title=""):
        """生成备用摘要（基于规则的智能摘要）"""
        # 移除格式符号
        clean_text = re.sub(r'^#+\s*', '', content, flags=re.MULTILINE)
        clean_text = re.sub(r'\*\*([^*]+)\*\*', r'\1', clean_text)
        clean_text = re.sub(r'\*([^*]+)\*', r'\1', clean_text)
        
        # 分割成句子
        sentences = re.split(r'[\u3002\uff01\uff1f.!?]', clean_text)
        sentences = [s.strip() for s in sentences if len(s.strip()) > 15]
        
        # 优先选择包含关键词的句子
        key_indicators = [
            '介绍', '讲解', '说明', '分析', '探讨', '研究', '实现', '应用',
            '方法', '技术', '算法', '原理', '概念', '特点', '优势', '解决',
            '教程', '指南', '配置', '安装', '部署', '开发', '设计', '构建'
        ]
        
        priority_sentences = []
        normal_sentences = []
        
        for sentence in sentences[:10]:  # 处理前10句
            if any(keyword in sentence for keyword in key_indicators):
                priority_sentences.append(sentence)
            else:
                normal_sentences.append(sentence)
        
        # 组合摘要
        selected_sentences = []
        total_length = 0
        
        # 优先使用关键句子
        for sentence in priority_sentences:
            if total_length + len(sentence) > 100:
                break
            selected_sentences.append(sentence)
            total_length += len(sentence)
        
        # 如果还有空间，添加普通句子
        if total_length < 80:
            for sentence in normal_sentences:
                if total_length + len(sentence) > 100:
                    break
                selected_sentences.append(sentence)
                total_length += len(sentence)
        
        if selected_sentences:
            summary = '.'.join(selected_sentences) + '.'
            # 简化冗长的摘要
            if len(summary) > 120:
                summary = selected_sentences[0] + '.'
                
            # 根据语言设置生成不同的备用摘要
            if self.summary_language == 'en':
                return self._generate_english_fallback(page_title)
            elif self.summary_language == 'both':
                zh_summary = summary
                en_summary = self._generate_english_fallback(page_title)
                return f"{zh_summary}\n\n{en_summary}"
            else:
                return summary
        else:
            # 根据标题和语言生成通用摘要
            if self.summary_language == 'en':
                return self._generate_english_fallback(page_title)
            elif self.summary_language == 'both':
                zh_summary = self._generate_chinese_fallback(page_title)
                en_summary = self._generate_english_fallback(page_title)
                return f"{zh_summary}\n\n{en_summary}"
            else:
                return self._generate_chinese_fallback(page_title)
    
    def _generate_chinese_fallback(self, page_title):
        """生成中文备用摘要"""
        if any(keyword in page_title for keyword in ['教程', '指南', 'Tutorial']):
            return '本文提供了详细的教程指南，通过实例演示帮助读者掌握相关技术要点。'
        elif any(keyword in page_title for keyword in ['配置', '设置', '安装', 'Config']):
            return '本文介绍了系统配置的方法和步骤，提供实用的设置建议和最佳实践。'
        elif any(keyword in page_title for keyword in ['开发', '编程', 'Development']):
            return '本文分享了开发经验和技术实践，提供了实用的代码示例和解决方案。'
        else:
            return '本文深入探讨了相关技术内容，提供了实用的方法和解决方案。'
    
    def _generate_english_fallback(self, page_title):
        """生成英文备用摘要"""
        if any(keyword in page_title.lower() for keyword in ['tutorial', 'guide', '教程', '指南']):
            return 'This article provides a detailed tutorial guide with practical examples to help readers master relevant technical concepts.'
        elif any(keyword in page_title.lower() for keyword in ['config', 'setup', 'install', '配置', '设置', '安装']):
            return 'This article introduces system configuration methods and procedures, providing practical setup recommendations and best practices.'
        elif any(keyword in page_title.lower() for keyword in ['development', 'programming', 'coding', '开发', '编程']):
            return 'This article shares development experience and technical practices, providing practical code examples and solutions.'
        else:
            return 'This article explores relevant technical content in depth, providing practical methods and solutions.'
    
    def process_page(self, markdown, page, config):
        """处理页面，生成AI摘要"""
        if not self.should_generate_summary(page, markdown):
            return markdown
        
        clean_content = self.clean_content_for_ai(markdown)
        
        # 内容长度检查
        if len(clean_content) < 100:
            print(f"📄 内容太短，跳过摘要生成: {page.file.src_path}")
            return markdown
        
        content_hash = self.get_content_hash(clean_content)
        page_title = getattr(page, 'title', '')
        
        # 检查缓存
        cached_summary = self.get_cached_summary(content_hash)
        if cached_summary:
            summary = cached_summary.get('summary', '')
            ai_service = cached_summary.get('service', 'cached')
            print(f"✅ 使用缓存摘要: {page.file.src_path}")
        else:
            # 生成新摘要
            lang_desc = {'zh': '中文', 'en': '英文', 'both': '双语'}
            print(f"🤖 正在生成{lang_desc.get(self.summary_language, '中文')}AI摘要: {page.file.src_path}")
            summary, ai_service = self.generate_ai_summary(clean_content, page_title)
            
            if not summary:
                summary = self.generate_fallback_summary(clean_content, page_title)
                ai_service = 'fallback'
                print(f"📝 使用备用摘要: {page.file.src_path}")
            else:
                print(f"✅ AI摘要生成成功 ({ai_service}): {page.file.src_path}")
            
            # 保存到缓存
            self.save_summary_cache(content_hash, {
                'summary': summary,
                'service': ai_service,
                'page_title': page_title
            })
        
        # 添加摘要到页面最上面
        summary_html = self.format_summary(summary, ai_service)
        return summary_html + '\n\n' + markdown
    
    def should_generate_summary(self, page, markdown):
        """判断是否应该生成摘要"""
        # 检查页面元数据
        if hasattr(page, 'meta'):
            # 明确禁用
            if page.meta.get('ai_summary') == False:
                return False
            
            # 强制启用
            if page.meta.get('ai_summary') == True:
                return True
        
        # 获取文件路径
        src_path = page.file.src_path.replace('\\', '/')  # 统一路径分隔符
        
        # 检查排除模式
        if any(pattern in src_path for pattern in self.exclude_patterns):
            return False
        
        # 检查排除的特定文件
        if src_path in self.exclude_files:
            return False
        
        # 检查是否在启用的文件夹中
        for folder in self.enabled_folders:
            if src_path.startswith(folder) or f'/{folder}' in src_path:
                folder_name = folder.rstrip('/')
                lang_desc = {'zh': '中文', 'en': '英文', 'both': '双语'}
                print(f"🎯 {folder_name}文件夹文章检测到，启用{lang_desc.get(self.summary_language, '中文')}AI摘要: {src_path}")
                return True
        
        # 默认不生成摘要
        return False
    
    def format_summary(self, summary, ai_service):
        """格式化摘要显示"""
        # 根据语言设置显示不同的标题
        service_names = {
            'zh': {
                'deepseek': 'AI智能摘要 (DeepSeek)',
                'openai': 'AI智能摘要 (ChatGPT)',
                'azure_openai': 'AI智能摘要 (Azure OpenAI)',
                'claude': 'AI智能摘要 (Claude)',
                'gemini': 'AI智能摘要 (Gemini)',
                'fallback': '自动摘要',
                'cached': 'AI智能摘要'
            },
            'en': {
                'deepseek': 'AI Summary (DeepSeek)',
                'openai': 'AI Summary (ChatGPT)',
                'azure_openai': 'AI Summary (Azure OpenAI)',
                'claude': 'AI Summary (Claude)',
                'gemini': 'AI Summary (Gemini)',
                'fallback': 'Auto Summary',
                'cached': 'AI Summary'
            },
            'both': {
                'deepseek': 'AI智能摘要 / AI Summary (DeepSeek)',
                'openai': 'AI智能摘要 / AI Summary (ChatGPT)',
                'azure_openai': 'AI智能摘要 / AI Summary (Azure OpenAI)',
                'claude': 'AI智能摘要 / AI Summary (Claude)',
                'gemini': 'AI智能摘要 / AI Summary (Gemini)',
                'fallback': '自动摘要 / Auto Summary',
                'cached': 'AI智能摘要 / AI Summary'
            }
        }
        
        name_config = service_names.get(self.summary_language, service_names['zh'])
        service_name = name_config.get(ai_service, name_config['fallback'])
        
        # 图标和颜色配置
        icon = '💾' if ai_service != 'fallback' else '📝'
        color = 'info' if ai_service != 'fallback' else 'tip'
        
        return f'''!!! {color} "{icon} {service_name}"
    {summary}

'''

# 创建全局实例
ai_summary_generator = AISummaryGenerator()

# 🔧 配置函数
def configure_ai_summary(enabled_folders=None, exclude_patterns=None, exclude_files=None, 
                        ai_service=None, service_config=None, language='zh'):
    """
    配置AI摘要功能（支持多语言版本）
    
    Args:
        enabled_folders: 启用AI摘要的文件夹列表
        exclude_patterns: 排除的模式列表
        exclude_files: 排除的特定文件列表
        ai_service: 使用的AI服务 ('deepseek', 'openai', 'claude', 'gemini')
        service_config: AI服务配置
        language: 摘要语言 ('zh': 中文, 'en': 英文, 'both': 双语)
    
    Example:
        # 配置英文摘要
        configure_ai_summary(
            enabled_folders=['blog/', 'docs/'],
            ai_service='openai',
            language='en'
        )
        
        # 配置双语摘要
        configure_ai_summary(
            language='both'
        )
    """
    ai_summary_generator.configure_folders(enabled_folders, exclude_patterns, exclude_files)
    ai_summary_generator.configure_language(language)
    
    if ai_service:
        if service_config:
            # 合并配置
            current_config = ai_summary_generator.ai_services.get(ai_service, {})
            current_config.update(service_config)
            ai_summary_generator.configure_ai_service(ai_service, current_config)
        else:
            ai_summary_generator.configure_ai_service(ai_service)

# 新增语言配置函数
def configure_summary_language(language='zh'):
    """
    配置摘要语言
    
    Args:
        language: 语言设置
            'zh': 中文摘要
            'en': 英文摘要  
            'both': 双语摘要（中英文）
    
    Example:
        # 切换到英文摘要
        configure_summary_language('en')
        
        # 切换到双语摘要
        configure_summary_language('both')
    """
    ai_summary_generator.configure_language(language)
    lang_names = {'zh': '中文', 'en': '英文', 'both': '双语'}
    print(f"✅ 摘要语言配置完成: {lang_names.get(language, language)}")

# 新增手动清理缓存函数
def clear_ai_cache():
    """手动清理AI摘要缓存"""
    try:
        cache_dir = Path("site/.ai_cache")
        if cache_dir.exists():
            shutil.rmtree(cache_dir)
            cache_dir.mkdir(exist_ok=True)
            print("✅ 手动清理AI摘要缓存完成")
        else:
            print("📁 缓存目录不存在")
    except Exception as e:
        print(f"❌ 手动清理缓存失败: {e}")

def on_page_markdown(markdown, page, config, files):
    """MkDocs hook入口点"""
    return ai_summary_generator.process_page(markdown, page, config)