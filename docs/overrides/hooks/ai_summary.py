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
        # 延迟创建缓存目录，直到真正需要时才创建
        self._cache_dir = None
        self._service_config_file = None
        
        # 🤖 多AI服务配置
        self.ai_services = {
            'deepseek': {
                'url': 'https://api.deepseek.com/v1/chat/completions',
                'model': 'deepseek-chat',
                'api_key': os.getenv('DEEPSEEK_API_KEY', 'sk-7dbcd6e21fb3417299b50aecff76c7bf'),
                'max_tokens': 150,
                'temperature': 0.3
            },
            'openai': {
                'url': 'https://api.chatanywhere.tech/v1/chat/completions',
                'model': 'gpt-3.5-turbo',
                'api_key': os.getenv('OPENAI_API_KEY', 'sk-vTIWRtY595O8K7NxhNMPohGGrEimNFspS6iLDH1yjORy7Lcj'),
                'max_tokens': 150,
                'temperature': 0.3
            },
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
        self.service_fallback_order = ['deepseek', 'openai', 'gemini']
        
        # 📂 可自定义的文件夹配置
        self.enabled_folders = [
            'blog/',      # blog文件夹
            'develop/',   # develop文件夹
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
        
        # 🌍 语言配置
        self.summary_language = 'zh'
        
        # 延迟初始化标记
        self._initialized = False
    
    @property
    def cache_dir(self):
        """延迟创建缓存目录"""
        if self._cache_dir is None:
            self._cache_dir = Path("site/.ai_cache")
            # 确保父目录存在
            try:
                self._cache_dir.parent.mkdir(parents=True, exist_ok=True)
                self._cache_dir.mkdir(exist_ok=True)
            except (OSError, PermissionError) as e:
                print(f"⚠️ 无法创建缓存目录 {self._cache_dir}: {e}")
                # 使用临时目录作为备选
                import tempfile
                self._cache_dir = Path(tempfile.mkdtemp(prefix="mkdocs_ai_cache_"))
                print(f"📁 使用临时缓存目录: {self._cache_dir}")
        return self._cache_dir
    
    @property
    def service_config_file(self):
        """延迟创建服务配置文件路径"""
        if self._service_config_file is None:
            self._service_config_file = self.cache_dir / "service_config.json"
        return self._service_config_file
    
    def _lazy_init(self):
        """延迟初始化，只在真正需要时执行"""
        if not self._initialized:
            try:
                self._check_service_change()
                self._initialized = True
            except Exception as e:
                print(f"⚠️ AI摘要初始化失败: {e}")
                # 即使初始化失败，也标记为已初始化，避免重复尝试
                self._initialized = True
    
    def _check_service_change(self):
        """检查AI服务是否发生变更，如有变更则自动清理缓存"""
        try:
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
                        self._clear_cache_safe()
                        
                except Exception as e:
                    print(f"读取服务配置失败: {e}")
            
            # 保存当前配置
            try:
                with open(self.service_config_file, 'w', encoding='utf-8') as f:
                    json.dump(current_config, f, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"保存服务配置失败: {e}")
                
        except Exception as e:
            print(f"检查服务变更失败: {e}")
    
    def _clear_cache_safe(self):
        """安全地清理缓存"""
        try:
            # 删除整个缓存目录
            if self.cache_dir.exists():
                shutil.rmtree(self.cache_dir)
                print(f"✅ 已删除缓存文件夹: {self.cache_dir}")
            
            # 重新创建缓存目录
            self.cache_dir.mkdir(parents=True, exist_ok=True)
            print("📁 已重新创建缓存目录")
            
        except Exception as e:
            print(f"❌ 清理缓存失败: {e}")
            # 如果删除失败，尝试清理单个文件
            try:
                self._clear_cache_files()
            except:
                print("⚠️ 缓存清理失败，新摘要可能会混用旧配置的缓存")
    
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

    # ...existing code...
    
    def process_page(self, markdown, page, config):
        """处理页面，生成AI摘要"""
        # 延迟初始化
        self._lazy_init()
        
        if not self.should_generate_summary(page, markdown):
            return markdown
        
        try:
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
                try:
                    self.save_summary_cache(content_hash, {
                        'summary': summary,
                        'service': ai_service,
                        'page_title': page_title
                    })
                except Exception as e:
                    print(f"⚠️ 保存缓存失败: {e}")
            
            # 添加摘要到页面最上面
            summary_html = self.format_summary(summary, ai_service)
            return summary_html + '\n\n' + markdown
            
        except Exception as e:
            print(f"❌ 处理页面摘要时出错 {page.file.src_path}: {e}")
            return markdown

    # ...existing code...

# 创建全局实例
ai_summary_generator = AISummaryGenerator()

# ...rest of the existing code...