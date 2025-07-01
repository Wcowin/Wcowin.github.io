from dotenv import load_dotenv
load_dotenv()  # 自动加载 .env 文件

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
        """
        AI摘要生成器初始化
        
        主要功能：
        1. 配置缓存系统
        2. 检测运行环境（CI/本地）
        3. 初始化AI服务配置
        4. 设置文件夹和语言配置
        """
        # 🗂️ 统一缓存路径 - 项目根目录
        # 优势：CI和本地环境使用同一路径，便于缓存共享和管理
        self.cache_dir = Path(".ai_cache")
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        
        # 🔧 缓存配置 - 简化配置逻辑
        # 将所有缓存相关配置集中管理，便于理解和修改
        self.cache_config = {
            # 是否启用缓存功能（默认启用）
            'enabled': os.getenv('AI_SUMMARY_CACHE_ENABLED', 'true').lower() == 'true',
            
            # 缓存过期天数（默认7天）
            'expire_days': int(os.getenv('AI_SUMMARY_CACHE_EXPIRE_DAYS', '7')),
            
            # 是否自动清理过期缓存（默认启用）
            'auto_clean': os.getenv('AI_SUMMARY_CACHE_AUTO_CLEAN', 'true').lower() == 'true'
        }
        
        # 🚀 环境配置 - 清晰的环境控制
        # 分离环境检测和配置，让逻辑更清晰
        self.env_config = {
            # 当前是否为CI环境
            'is_ci': self._detect_ci_environment(),
            
            # CI环境是否启用AI摘要（不用管，只在ci.yml中设置有效。默认启用）
            'ci_enabled': os.getenv('AI_SUMMARY_CI_ENABLED', 'true').lower() == 'true',
            
            # 本地环境是否启用AI摘要（默认启用）
            'local_enabled': os.getenv('AI_SUMMARY_LOCAL_ENABLED', 'false').lower() == 'true',
            
            # CI环境是否仅使用缓存（不用管，只在ci.yml中设置有效。默认关闭，即允许生成新摘要）
            'ci_cache_only': os.getenv('AI_SUMMARY_CI_ONLY_CACHE', 'false').lower() == 'true',
            
            # CI环境是否启用备用摘要（不用管，只在ci.yml中设置有效。默认启用）
            'ci_fallback': os.getenv('AI_SUMMARY_CI_FALLBACK', 'true').lower() == 'true'
        }
        
        # 服务配置文件 - 用于跟踪AI服务和语言设置变化
        self.service_config_file = self.cache_dir / "service_config.json"
        
        # 🤖 多AI服务配置
        self.ai_services = {
            'deepseek': {
                'url': 'https://api.deepseek.com/v1/chat/completions',
                'model': 'deepseek-chat',
                'api_key': os.getenv('DEEPSEEK_API_KEY', ),
                'max_tokens': 150,
                'temperature': 0.3
            },
            'openai': {
                'url': 'https://api.chatanywhere.tech/v1/chat/completions',
                'model': 'gpt-3.5-turbo',  # 或 'gpt-4', 'gpt-4-turbo'
                'api_key': os.getenv('OPENAI_API_KEY', ),
                'max_tokens': 200,
                'temperature': 0.3
            },
            'gemini': {
                'url': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                'model': 'gemini-pro',
                'api_key': os.getenv('GOOGLE_API_KEY', ''),
                'max_tokens': 150,
                'temperature': 0.3
            }
        }
        
        # 默认使用的AI服务
        self.default_service = 'openai'
        
        # 服务优先级（按顺序尝试）
        self.service_fallback_order = ['openai', 'deepseek', 'claude', 'gemini']
        
        # 📂 可自定义的文件夹配置
        self.enabled_folders = [
            'blog/',      # blog文件夹
            'develop/',   # develop文件夹
            # 'posts/',     # posts文件夹
            'trip/',     # trip文件夹
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
        self.summary_language = 'zh'  # 默认英文，可选 'zh'、'en'、'both'
        
        # 初始化检查
        self._initialize()
    
    def _initialize(self):
        """
        系统初始化流程
        
        步骤：
        1. 检查并记录当前运行环境
        2. 如果缓存启用，检查服务配置变更
        3. 如果设置了自动清理，清理过期缓存
        """
        # 环境检查 - 确定当前环境并设置运行状态
        self._check_and_log_environment()
        
        # 缓存相关检查 - 只在缓存启用时执行
        if self.cache_config['enabled']:
            # 检查AI服务或语言配置是否变更，如有变更则清理缓存
            self._check_service_change()
            
            # 如果启用了自动清理，清理过期的缓存文件
            if self.cache_config['auto_clean']:
                self._clean_expired_cache()
        else:
            print("🚫 缓存功能已禁用")
    
    def _detect_ci_environment(self):
        """
        检测当前是否在CI环境中运行
        
        通过检查常见的CI环境变量来判断：
        - CI/CONTINUOUS_INTEGRATION: 通用CI标识
        - GITHUB_ACTIONS: GitHub Actions
        - GITLAB_CI: GitLab CI
        - 其他主流CI/CD平台的标识变量
        
        Returns:
            bool: True表示在CI环境中，False表示在本地环境中
        """
        ci_indicators = [
            'CI', 'CONTINUOUS_INTEGRATION', 'GITHUB_ACTIONS', 'GITLAB_CI',
            'JENKINS_URL', 'TRAVIS', 'CIRCLECI', 'AZURE_HTTP_USER_AGENT',
            'TEAMCITY_VERSION', 'BUILDKITE', 'CODEBUILD_BUILD_ID',
            'NETLIFY', 'VERCEL', 'CF_PAGES'
        ]
        return any(os.getenv(indicator) for indicator in ci_indicators)
    
    def _check_and_log_environment(self):
        """
        检查当前环境配置并记录日志
        
        根据环境类型（CI/本地）和相应的配置项，决定：
        1. 是否启用AI摘要功能
        2. 如果是CI环境，是否使用仅缓存模式
        3. 设置内部状态变量 self._should_run
        """
        if self.env_config['is_ci']:
            # CI环境处理逻辑
            ci_name = self._get_ci_name()
            
            if self.env_config['ci_enabled']:
                # CI环境启用了AI摘要
                if self.env_config['ci_cache_only']:
                    # 仅使用缓存模式 - 不生成新摘要，只使用已有缓存
                    print(f"🚀 CI环境 ({ci_name}) - 仅使用缓存模式")
                else:
                    # 完整模式 - 可以生成新摘要
                    print(f"🚀 CI环境 ({ci_name}) - AI摘要已启用")
                self._should_run = True
            else:
                # CI环境禁用了AI摘要
                print(f"🚫 CI环境 ({ci_name}) - AI摘要已禁用")
                self._should_run = False
        else:
            # 本地环境处理逻辑
            if self.env_config['local_enabled']:
                print("💻 本地环境 - AI摘要已启用")
                self._should_run = True
            else:
                print("🚫 本地环境 - AI摘要已禁用")
                self._should_run = False
    
    def _check_service_change(self):
        """
        检查AI服务配置变更
        
        比较当前配置与上次保存的配置：
        1. AI服务是否变更（如从OpenAI切换到DeepSeek）
        2. 语言设置是否变更（如从中文切换到英文）
        3. 版本是否更新
        
        如果有任何变更，自动清理相关缓存以避免混用
        """
        # 当前配置快照
        current_config = {
            'default_service': self.default_service,
            'summary_language': self.summary_language,
            'version': '1.3.0'  # 版本号用于版本升级时的缓存清理
        }
        
        config_changed = False
        
        # 读取之前保存的配置
        if self.service_config_file.exists():
            try:
                with open(self.service_config_file, 'r', encoding='utf-8') as f:
                    previous_config = json.load(f)
                
                # 逐项检查关键配置是否变更
                if (previous_config.get('default_service') != current_config['default_service'] or
                    previous_config.get('summary_language') != current_config['summary_language'] or
                    previous_config.get('version') != current_config['version']):
                    
                    # 记录变更详情
                    old_service = previous_config.get('default_service', 'unknown')
                    old_lang = previous_config.get('summary_language', 'zh')
                    
                    print(f"🔄 检测到配置变更:")
                    if old_service != current_config['default_service']:
                        print(f"   AI服务: {old_service} → {current_config['default_service']}")
                    if old_lang != current_config['summary_language']:
                        print(f"   语言设置: {old_lang} → {current_config['summary_language']}")
                    
                    config_changed = True
                
            except Exception as e:
                # 配置文件损坏或读取失败，视为配置变更
                print(f"⚠️ 读取服务配置失败: {e}")
                config_changed = True
        else:
            # 配置文件不存在，首次运行
            config_changed = True
        
        # 如果配置变更，清理所有缓存
        if config_changed:
            self._clear_all_cache()
        
        # 保存当前配置供下次比较
        self._save_service_config(current_config)
    
    def _clear_all_cache(self):
        """
        清理所有摘要缓存文件
        
        保留配置文件，只清理摘要缓存文件：
        - 保留：service_config.json（服务配置）
        - 清理：其他所有 .json 缓存文件
        """
        try:
            cache_files = list(self.cache_dir.glob("*.json"))
            config_files = ['service_config.json']  # 需要保留的配置文件
            
            cleared_count = 0
            for cache_file in cache_files:
                if cache_file.name not in config_files:
                    cache_file.unlink()
                    cleared_count += 1
            
            if cleared_count > 0:
                print(f"🧹 已清理 {cleared_count} 个缓存文件")
            
        except Exception as e:
            print(f"❌ 清理缓存失败: {e}")
    
    def _clean_expired_cache(self):
        """
        清理过期的缓存文件
        
        检查每个缓存文件的时间戳：
        1. 如果超过设定的过期天数，删除文件
        2. 如果文件损坏无法读取，也删除
        3. 保留配置文件不做清理
        """
        if not self.cache_config['enabled']:
            return
        
        try:
            current_time = datetime.now()
            expired_count = 0
            
            # 遍历所有缓存文件
            for cache_file in self.cache_dir.glob("*.json"):
                # 跳过配置文件
                if cache_file.name == "service_config.json":
                    continue
                
                try:
                    # 读取缓存文件的时间戳
                    with open(cache_file, 'r', encoding='utf-8') as f:
                        cache_data = json.load(f)
                    
                    # 检查是否过期
                    cache_time = datetime.fromisoformat(cache_data.get('timestamp', '1970-01-01'))
                    if (current_time - cache_time).days >= self.cache_config['expire_days']:
                        cache_file.unlink()
                        expired_count += 1
                        
                except Exception:
                    # 如果文件损坏无法读取，直接删除
                    cache_file.unlink()
                    expired_count += 1
            
            if expired_count > 0:
                print(f"🧹 清理了 {expired_count} 个过期缓存文件")
                
        except Exception as e:
            print(f"⚠️ 清理过期缓存失败: {e}")
    
    def _save_service_config(self, config):
        """
        保存服务配置到文件
        
        Args:
            config (dict): 包含服务和语言配置的字典
        """
        try:
            with open(self.service_config_file, 'w', encoding='utf-8') as f:
                json.dump(config, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ 保存服务配置失败: {e}")
    
    def should_use_cache(self):
        """
        判断是否应该使用缓存
        
        简单的缓存开关检查，便于在代码中统一控制缓存行为
        
        Returns:
            bool: True表示应该使用缓存，False表示不使用缓存
        """
        return self.cache_config['enabled']
    
    def should_generate_new_summary(self):
        """
        判断是否应该生成新的AI摘要
        
        决策逻辑：
        1. 如果缓存被禁用 → 总是生成新摘要
        2. 如果是CI环境且设置为仅缓存模式 → 不生成新摘要
        3. 其他情况 → 可以生成新摘要
        
        Returns:
            bool: True表示可以生成新摘要，False表示不应生成
        """
        # 缓存被禁用时，总是生成新摘要
        if not self.cache_config['enabled']:
            return True
        
        # CI环境且设置为仅缓存模式时，不生成新摘要
        if self.env_config['is_ci'] and self.env_config['ci_cache_only']:
            return False
        
        # 默认情况下可以生成新摘要
        return True
    
    def get_cached_summary(self, content_hash):
        """
        获取缓存的摘要
        
        Args:
            content_hash (str): 内容的MD5哈希值
            
        Returns:
            dict|None: 缓存的摘要数据，如果没有有效缓存则返回None
            
        缓存文件结构：
        {
            "summary": "摘要内容",
            "service": "使用的AI服务",
            "page_title": "页面标题",
            "timestamp": "生成时间",
            "language": "摘要语言",
            "cache_version": "缓存版本"
        }
        """
        # 如果缓存被禁用，直接返回None
        if not self.should_use_cache():
            return None
        
        cache_file = self.cache_dir / f"{content_hash}.json"
        if not cache_file.exists():
            return None
        
        try:
            # 读取缓存文件
            with open(cache_file, 'r', encoding='utf-8') as f:
                cache_data = json.load(f)
            
            # 检查缓存是否过期
            cache_time = datetime.fromisoformat(cache_data.get('timestamp', '1970-01-01'))
            if (datetime.now() - cache_time).days < self.cache_config['expire_days']:
                # 缓存有效，返回数据
                return cache_data
            else:
                # 缓存过期，删除文件
                cache_file.unlink()
                return None
                
        except Exception as e:
            print(f"⚠️ 读取缓存失败: {e}")
            # 删除损坏的缓存文件
            try:
                cache_file.unlink()
            except:
                pass
            return None
    
    def save_summary_cache(self, content_hash, summary_data):
        """
        保存摘要到缓存
        
        Args:
            content_hash (str): 内容的MD5哈希值
            summary_data (dict): 要保存的摘要数据
            
        保存的数据会自动添加：
        - timestamp: 当前时间戳
        - language: 当前语言设置
        - cache_version: 缓存版本号
        """
        # 如果缓存被禁用，不保存
        if not self.should_use_cache():
            return
        
        cache_file = self.cache_dir / f"{content_hash}.json"
        try:
            # 添加缓存元数据
            summary_data.update({
                'timestamp': datetime.now().isoformat(),
                'language': self.summary_language,
                'cache_version': '1.3.0'
            })
            
            # 保存到文件
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(summary_data, f, ensure_ascii=False, indent=2)
                
        except Exception as e:
            print(f"⚠️ 保存缓存失败: {e}")
    
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
        """
        生成AI摘要（带缓存逻辑）
        
        Args:
            content (str): 清理后的文章内容
            page_title (str): 文章标题
            
        Returns:
            tuple: (摘要内容, 使用的服务名称)
            
        生成逻辑：
        1. 检查是否应该生成新摘要
        2. 按优先级顺序尝试不同的AI服务
        3. 返回第一个成功的结果
        """
        # 如果配置为不生成新摘要（如CI仅缓存模式），直接返回
        if not self.should_generate_new_summary():
            print(f"📦 CI仅缓存模式，跳过摘要生成")
            return None, 'ci_cache_only'
        
        # 按优先级尝试不同的AI服务
        # 首先尝试默认服务，然后按fallback顺序尝试其他服务
        services_to_try = [self.default_service] + [
            s for s in self.service_fallback_order if s != self.default_service
        ]
        
        for service_name in services_to_try:
            if service_name in self.ai_services:
                print(f"🔄 尝试使用 {service_name} 生成摘要...")
                summary = self.generate_ai_summary_with_service(content, page_title, service_name)
                if summary:
                    return summary, service_name
        
        print("⚠️ 所有AI服务均不可用")
        return None, None
    
    def generate_fallback_summary(self, content, page_title=""):
        """
        生成备用摘要（当AI服务不可用时）
        
        Args:
            content (str): 清理后的文章内容
            page_title (str): 文章标题
            
        Returns:
            str|None: 备用摘要内容，如果无法生成则返回None
            
        备用摘要策略：
        1. 检查CI环境是否允许备用摘要
        2. 使用关键词提取和句子分析
        3. 根据语言设置生成相应的摘要
        """
        # CI环境检查 - 如果CI环境禁用了备用摘要，直接返回
        if self.env_config['is_ci'] and not self.env_config['ci_fallback']:
            print(f"🚫 CI环境禁用备用摘要")
            return None
        
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
    
    def _generate_chinese_fallback(self, page_title=""):
        """生成中文备用摘要"""
        if page_title:
            # 根据标题生成通用摘要
            if any(keyword in page_title for keyword in ['教程', '指南', '配置', '安装']):
                return f"本文介绍了{page_title}的相关内容，包括具体的操作步骤和注意事项，为读者提供实用的技术指导。"
            elif any(keyword in page_title for keyword in ['分析', '研究', '探讨', '原理']):
                return f"本文深入分析了{page_title}的核心概念和技术原理，为读者提供详细的理论解析和实践见解。"
            elif any(keyword in page_title for keyword in ['开发', '构建', '实现', '设计']):
                return f"本文详细讲解了{page_title}的开发过程和实现方法，分享了实际的开发经验和技术方案。"
            else:
                return f"本文围绕{page_title}展开讨论，介绍了相关的技术概念、应用场景和实践方法。"
        else:
            return "本文介绍了相关的技术概念和实践方法，为读者提供有价值的参考信息。"

    def _generate_english_fallback(self, page_title=""):
        """生成英文备用摘要"""
        if page_title:
            # 根据标题生成通用摘要
            if any(keyword in page_title.lower() for keyword in ['tutorial', 'guide', 'setup', 'install', 'config']):
                return f"This article provides a comprehensive guide on {page_title}, including step-by-step instructions and important considerations for practical implementation."
            elif any(keyword in page_title.lower() for keyword in ['analysis', 'research', 'study', 'principle']):
                return f"This article presents an in-depth analysis of {page_title}, exploring core concepts and technical principles with detailed theoretical insights."
            elif any(keyword in page_title.lower() for keyword in ['develop', 'build', 'implement', 'design']):
                return f"This article explains the development process and implementation methods for {page_title}, sharing practical development experience and technical solutions."
            else:
                return f"This article discusses {page_title}, covering relevant technical concepts, application scenarios, and practical methods."
        else:
            return "This article introduces relevant technical concepts and practical methods, providing valuable reference information for readers."

    def is_ci_environment(self):
        """检测是否在 CI 环境中运行"""
        # 常见的 CI 环境变量
        ci_indicators = [
            'CI', 'CONTINUOUS_INTEGRATION',           # 通用 CI 标识
            'GITHUB_ACTIONS',                         # GitHub Actions
            'GITLAB_CI',                              # GitLab CI
            'JENKINS_URL',                            # Jenkins
            'TRAVIS',                                 # Travis CI
            'CIRCLECI',                               # CircleCI
            'AZURE_HTTP_USER_AGENT',                  # Azure DevOps
            'TEAMCITY_VERSION',                       # TeamCity
            'BUILDKITE',                              # Buildkite
            'CODEBUILD_BUILD_ID',                     # AWS CodeBuild
            'NETLIFY',                                # Netlify
            'VERCEL',                                 # Vercel
            'CF_PAGES',                               # Cloudflare Pages
        ]
        
        for indicator in ci_indicators:
            if os.getenv(indicator):
                return True
        
        return False
    
    def should_run_in_current_environment(self):
        """判断是否应该在当前环境中运行 AI 摘要"""
        return self._should_run
    
    def _get_ci_name(self):
        """获取 CI 环境名称"""
        if os.getenv('GITHUB_ACTIONS'):
            return 'GitHub Actions'
        elif os.getenv('GITLAB_CI'):
            return 'GitLab CI'
        elif os.getenv('JENKINS_URL'):
            return 'Jenkins'
        elif os.getenv('TRAVIS'):
            return 'Travis CI'
        elif os.getenv('CIRCLECI'):
            return 'CircleCI'
        elif os.getenv('AZURE_HTTP_USER_AGENT'):
            return 'Azure DevOps'
        elif os.getenv('NETLIFY'):
            return 'Netlify'
        elif os.getenv('VERCEL'):
            return 'Vercel'
        elif os.getenv('CF_PAGES'):
            return 'Cloudflare Pages'
        elif os.getenv('CODEBUILD_BUILD_ID'):
            return 'AWS CodeBuild'
        else:
            return 'Unknown CI'
    
    def _auto_migrate_cache(self):
        """自动迁移缓存文件（仅在需要时执行一次）"""
        # 如果禁用了缓存功能，跳过缓存迁移
        if not self.ci_config.get('cache_enabled', True):
            return
            
        old_cache_dir = Path("site/.ai_cache")
        new_cache_dir = Path(".ai_cache")
        
        # 检查是否需要迁移
        if old_cache_dir.exists() and not new_cache_dir.exists():
            print("🔄 检测到旧缓存目录，开始自动迁移...")
            
            try:
                # 创建新目录
                new_cache_dir.mkdir(exist_ok=True)
                
                # 复制文件
                cache_files = list(old_cache_dir.glob("*.json"))
                copied_count = 0
                
                for cache_file in cache_files:
                    target_file = new_cache_dir / cache_file.name
                    try:
                        shutil.copy2(cache_file, target_file)
                        copied_count += 1
                    except Exception as e:
                        print(f"⚠️ 复制缓存文件失败 {cache_file.name}: {e}")
                
                if copied_count > 0:
                    print(f"✅ 自动迁移完成！共迁移 {copied_count} 个缓存文件")
                    print("💡 提示：请将 .ai_cache 目录提交到 Git 仓库")
                else:
                    print("ℹ️ 没有缓存文件需要迁移")
                    
            except Exception as e:
                print(f"❌ 自动迁移失败: {e}")
        
        elif new_cache_dir.exists():
            # 新缓存目录已存在，检查是否有文件
            cache_files = list(new_cache_dir.glob("*.json"))
            if cache_files:
                is_ci = self.is_ci_environment()
                env_desc = '(CI)' if is_ci else '(本地)'
                print(f"📦 发现根目录缓存 {env_desc}，共 {len(cache_files)} 个缓存文件")
    
    def process_page(self, markdown, page, config):
        """
        处理页面的主要入口函数
        
        Args:
            markdown (str): 页面的markdown内容
            page: MkDocs页面对象
            config: MkDocs配置对象
            
        Returns:
            str: 处理后的markdown内容（可能包含AI摘要）
            
        处理流程：
        1. 检查是否应该在当前环境运行
        2. 检查页面是否需要生成摘要
        3. 清理内容并生成摘要
        4. 使用缓存机制优化性能
        5. 格式化并插入摘要
        """
        # 步骤1：环境检查 - 如果当前环境不应该运行，直接返回原内容
        if not self._should_run:
            return markdown
        
        # 步骤2：页面检查 - 检查该页面是否需要生成摘要
        if not self.should_generate_summary(page, markdown):
            return markdown
        
        # 步骤3：内容预处理
        clean_content = self.clean_content_for_ai(markdown)
        if len(clean_content) < 100:
            print(f"📄 内容太短，跳过: {page.file.src_path}")
            return markdown
        
        # 步骤4：缓存处理
        content_hash = self.get_content_hash(clean_content)
        page_title = getattr(page, 'title', '')
        
        # 4.1 尝试获取缓存
        cached_summary = self.get_cached_summary(content_hash)
        if cached_summary:
            # 缓存命中 - 直接使用缓存的摘要
            summary = cached_summary.get('summary', '')
            ai_service = cached_summary.get('service', 'cached')
            env_desc = 'CI' if self.env_config['is_ci'] else '本地'
            print(f"✅ 使用缓存摘要 ({env_desc}): {page.file.src_path}")
        else:
            # 4.2 缓存未命中 - 生成新摘要
            env_desc = 'CI' if self.env_config['is_ci'] else '本地'
            print(f"🤖 生成AI摘要 ({env_desc}): {page.file.src_path}")
            
            # 尝试AI摘要
            summary, ai_service = self.generate_ai_summary(clean_content, page_title)
            
            # 4.3 如果AI摘要失败，尝试备用摘要
            if not summary:
                summary = self.generate_fallback_summary(clean_content, page_title)
                if summary:
                    ai_service = 'fallback'
                    print(f"📝 使用备用摘要 ({env_desc}): {page.file.src_path}")
                else:
                    print(f"❌ 无法生成摘要 ({env_desc}): {page.file.src_path}")
                    return markdown
            else:
                print(f"✅ AI摘要生成成功 ({ai_service}) ({env_desc}): {page.file.src_path}")
            
            # 4.4 保存新生成的摘要到缓存
            if summary:
                self.save_summary_cache(content_hash, {
                    'summary': summary,
                    'service': ai_service,
                    'page_title': page_title
                })
        
        # 步骤5：格式化并返回最终内容
        if summary:
            summary_html = self.format_summary(summary, ai_service)
            return summary_html + '\n\n' + markdown
        
        return markdown
    
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
        """格式化摘要显示（包含CI环境标识）"""
        # 根据语言设置显示不同的标题
        service_names = {
            'zh': {
                'deepseek': 'AI智能摘要 (DeepSeek)',
                'openai': 'AI智能摘要 (ChatGPT)',
                'azure_openai': 'AI智能摘要 (Azure OpenAI)',
                'claude': 'AI智能摘要 (Claude)',
                'gemini': 'AI智能摘要 (Gemini)',
                'fallback': '自动摘要',
                'cached': 'AI智能摘要',
                'ci_cache_only': 'AI智能摘要 (缓存)'
            },
            'en': {
                'deepseek': 'AI Summary (DeepSeek)',
                'openai': 'AI Summary (ChatGPT)',
                'azure_openai': 'AI Summary (Azure OpenAI)',
                'claude': 'AI Summary (Claude)',
                'gemini': 'AI Summary (Gemini)',
                'fallback': 'Auto Summary',
                'cached': 'AI Summary',
                'ci_cache_only': 'AI Summary (Cached)'
            },
            'both': {
                'deepseek': 'AI智能摘要 / AI Summary (DeepSeek)',
                'openai': 'AI智能摘要 / AI Summary (ChatGPT)',
                'azure_openai': 'AI智能摘要 / AI Summary (Azure OpenAI)',
                'claude': 'AI智能摘要 / AI Summary (Claude)',
                'gemini': 'AI智能摘要 / AI Summary (Gemini)',
                'fallback': '自动摘要 / Auto Summary',
                'cached': 'AI智能摘要 / AI Summary',
                'ci_cache_only': 'AI智能摘要 / AI Summary (缓存)'
            }
        }
        
        name_config = service_names.get(self.summary_language, service_names['zh'])
        service_name = name_config.get(ai_service, name_config['fallback'])
        
        # 图标和颜色配置
        icon = '💾' if ai_service not in ['fallback', 'ci_cache_only'] else '📝'
        color = 'info' if ai_service not in ['fallback', 'ci_cache_only'] else 'tip'
        
        return f'''!!! {color} "{icon} {service_name}"
    {summary}

'''

# 创建全局实例
ai_summary_generator = AISummaryGenerator()

# 🔧 配置函数
def configure_ai_summary(enabled_folders=None, exclude_patterns=None, exclude_files=None, 
                        ai_service=None, language='zh',
                        cache_enabled=None, cache_expire_days=None,
                        ci_enabled=None, local_enabled=None, ci_cache_only=None, ci_fallback=None):
    """
    简化的AI摘要配置函数
    
    这是用户配置AI摘要功能的主要接口，提供了所有主要配置选项。
    
    Args:
        enabled_folders (list): 启用AI摘要的文件夹列表
            例：['blog/', 'docs/', 'tutorials/']
            
        exclude_patterns (list): 排除的文件模式列表
            例：['404.md', 'tag.md', 'tags.md']
            
        exclude_files (list): 排除的特定文件列表
            例：['blog/index.md', 'docs/index.md']
            
        ai_service (str): 使用的AI服务
            选项：'deepseek', 'openai', 'claude', 'gemini'
            
        language (str): 摘要语言
            选项：'zh'(中文), 'en'(英文), 'both'(双语)
            
        cache_enabled (bool): 是否启用缓存系统
            True: 启用缓存，提高性能，减少API调用
            False: 禁用缓存，总是生成新摘要
            
        cache_expire_days (int): 缓存过期天数
            默认：7天，超过此时间的缓存会被自动清理
            
        ci_enabled (bool): CI环境是否启用AI摘要
            True: 在CI/CD环境中启用摘要生成
            False: 在CI/CD环境中禁用摘要生成
            
        local_enabled (bool): 本地环境是否启用AI摘要
            True: 在本地开发环境中启用摘要生成
            False: 在本地开发环境中禁用摘要生成
            
        ci_cache_only (bool): CI环境是否仅使用缓存
            True: CI环境只使用已有缓存，不生成新摘要（节省成本）
            False: CI环境可以生成新摘要
            
        ci_fallback (bool): CI环境是否启用备用摘要
            True: 当AI服务不可用时，生成简单的备用摘要
            False: AI服务不可用时跳过摘要生成
    
    Example:
        # 基础配置 - 为博客和文档启用中文摘要
        configure_ai_summary(
            enabled_folders=['blog/', 'docs/'],
            language='zh'
        )
        
        # 开发模式 - 禁用缓存，总是生成新摘要
        configure_ai_summary(
            enabled_folders=['blog/'],
            cache_enabled=False
        )
        
        # 生产模式 - CI环境仅使用缓存，节省API成本
        configure_ai_summary(
            enabled_folders=['blog/'],
            ci_cache_only=True
        )
        
        # 完全自定义配置
        configure_ai_summary(
            enabled_folders=['posts/', 'articles/'],
            exclude_patterns=['draft.md', 'private.md'],
            ai_service='deepseek',
            language='both',
            cache_expire_days=14,
            ci_enabled=True,
            local_enabled=False,
            ci_cache_only=True,
            ci_fallback=True
        )
    """
    # 文件夹和排除规则配置
    ai_summary_generator.configure_folders(enabled_folders, exclude_patterns, exclude_files)
    
    # 语言配置 - 如果有变更会触发缓存清理
    if language != ai_summary_generator.summary_language:
        ai_summary_generator.summary_language = language
        print(f"🌍 语言设置: {language}")
    
    # AI服务配置 - 如果有变更会触发缓存清理
    if ai_service and ai_service != ai_summary_generator.default_service:
        ai_summary_generator.default_service = ai_service
        print(f"🤖 AI服务: {ai_service}")
    
    # 缓存系统配置
    if cache_enabled is not None:
        ai_summary_generator.cache_config['enabled'] = cache_enabled
        print(f"💾 缓存功能: {'启用' if cache_enabled else '禁用'}")
    
    if cache_expire_days is not None:
        ai_summary_generator.cache_config['expire_days'] = cache_expire_days
        print(f"⏰ 缓存过期: {cache_expire_days}天")
    
    # 环境行为配置
    if ci_enabled is not None:
        ai_summary_generator.env_config['ci_enabled'] = ci_enabled
        print(f"🚀 CI环境: {'启用' if ci_enabled else '禁用'}")
    
    if local_enabled is not None:
        ai_summary_generator.env_config['local_enabled'] = local_enabled
        print(f"💻 本地环境: {'启用' if local_enabled else '禁用'}")
    
    if ci_cache_only is not None:
        ai_summary_generator.env_config['ci_cache_only'] = ci_cache_only
        print(f"📦 CI仅缓存: {'启用' if ci_cache_only else '禁用'}")
    
    if ci_fallback is not None:
        ai_summary_generator.env_config['ci_fallback'] = ci_fallback
        print(f"📝 CI备用摘要: {'启用' if ci_fallback else '禁用'}")

def on_page_markdown(markdown, page, config, files):
    """
    MkDocs hook入口点
    
    这是MkDocs框架调用的主要入口函数，每当处理一个页面时都会调用。
    
    Args:
        markdown (str): 页面的原始markdown内容
        page: MkDocs页面对象，包含页面元数据
        config: MkDocs全局配置对象
        files: 所有文件的列表
        
    Returns:
        str: 处理后的markdown内容（可能包含AI摘要）
    """
    return ai_summary_generator.process_page(markdown, page, config)