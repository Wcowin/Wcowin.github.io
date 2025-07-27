import os
import shutil
import sqlite3
import re
import logging
import hashlib
import json
from mkdocs.plugins import BasePlugin
from bs4 import BeautifulSoup
from lxml import html
from html import escape
from html.parser import HTMLParser
import warnings

# ==================== 配置选项 ====================
# ⚙️ 直接在代码中配置搜索功能（方便快速修改）
# 设置为 True 启用本地搜索，False 禁用本地搜索
LOCAL_SEARCH_ENABLED = False # 🔧 在这里直接修改：True=启用，False=禁用

# 搜索功能开关配置（便于开发时快速禁用）
ENABLE_SEARCH = os.environ.get('MKDOCS_ENABLE_SEARCH', 'true').lower() == 'true'

# 开发模式检测（跳过重建以提升开发速度）
DEV_MODE_SKIP_REBUILD = os.environ.get('MKDOCS_DEV_SKIP_REBUILD', 'true').lower() == 'true'

# GitHub CI/CD 环境检测（在 GitHub Actions 中自动启用搜索）
def is_github_actions():
    """检测是否在 GitHub Actions 环境中运行"""
    return (
        os.environ.get('GITHUB_ACTIONS') == 'true' or
        os.environ.get('CI') == 'true' or
        os.environ.get('GITHUB_WORKFLOW') is not None
    )

# 本地开发时根据配置启用/禁用，GitHub Actions 时自动启用
def should_enable_search():
    """智能判断是否启用搜索功能"""
    # 1. 如果明确设置了环境变量，优先使用环境变量
    if 'MKDOCS_ENABLE_SEARCH' in os.environ:
        enabled = os.environ.get('MKDOCS_ENABLE_SEARCH', 'false').lower() == 'true'
        return enabled
    
    # 2. 如果在 GitHub Actions 环境中，自动启用
    if is_github_actions():
        return True
    
    # 3. 使用本地配置设置
    return LOCAL_SEARCH_ENABLED

# 使用智能检测
ENABLE_SEARCH = should_enable_search()

# 调试模式
DEBUG_MODE = os.environ.get('MKDOCS_DEBUG', 'false').lower() == 'true'

def print_search_status():
    """打印搜索功能状态（简洁版）"""
    if ENABLE_SEARCH:
        if is_github_actions():
            print("🔍 搜索功能: ✅ 启用 (CI/CD 自动启用)")
        elif 'MKDOCS_ENABLE_SEARCH' in os.environ:
            print("🔍 搜索功能: ✅ 启用 (环境变量)")
        else:
            print("🔍 搜索功能: ✅ 启用 (本地配置)")
    else:
        print("🔍 搜索功能: ❌ 禁用")
        if not LOCAL_SEARCH_ENABLED:
            print("   💡 要启用: 修改 LOCAL_SEARCH_ENABLED = True")
        print("   💡 或使用: MKDOCS_ENABLE_SEARCH=true mkdocs serve")

# ==================== 全局变量 ====================
# 抑制所有相关警告
warnings.filterwarnings("ignore", category=UserWarning, module='bs4')
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", message=".*strip_cdata.*")

MKDOCS_DOCS_PATH = None
MKDOCS_SITE_PATH = None
SQLITE_FILE_PATH = None
CACHE_FILE_PATH = None

# 设置日志级别
log_level = logging.DEBUG if DEBUG_MODE else logging.ERROR
logging.basicConfig(level=log_level, format='%(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def debug_print(message):
    """调试打印函数"""
    if DEBUG_MODE:
        print(f"🔧 DEBUG: {message}")

def calculate_file_hash(file_path):
    """计算文件的MD5哈希值"""
    try:
        with open(file_path, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    except:
        return None

def load_file_cache():
    """加载文件缓存"""
    if not CACHE_FILE_PATH or not os.path.exists(CACHE_FILE_PATH):
        return {}
    try:
        with open(CACHE_FILE_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {}

def save_file_cache(cache):
    """保存文件缓存"""
    if not CACHE_FILE_PATH:
        return
    try:
        os.makedirs(os.path.dirname(CACHE_FILE_PATH), exist_ok=True)
        with open(CACHE_FILE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.warning(f"保存缓存失败: {e}")

def get_changed_files(site_path):
    """获取变更的HTML文件列表"""
    cache = load_file_cache()
    changed_files = []
    current_files = {}
    
    # 扫描所有HTML文件
    for root, dirs, files in os.walk(site_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                file_hash = calculate_file_hash(file_path)
                rel_path = os.path.relpath(file_path, site_path)
                current_files[rel_path] = file_hash
                
                # 检查是否为新文件或已变更文件
                if rel_path not in cache or cache[rel_path] != file_hash:
                    changed_files.append(file_path)
    
    # 保存新的缓存
    save_file_cache(current_files)
    
    return changed_files, len(current_files)

def clean_text_for_search(text):
    """清理文本用于搜索，保留更多格式信息"""
    if not text:
        return ""
    try:
        soup = BeautifulSoup(text, 'lxml')
        text = soup.get_text(separator=' ', strip=True)
        # 更彻底地清理Markdown语法
        text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # 移除加粗标记
        text = re.sub(r'\*(.*?)\*', r'\1', text)      # 移除斜体标记
        text = re.sub(r'`(.*?)`', r'\1', text)        # 移除行内代码标记
        text = re.sub(r'~~(.*?)~~', r'\1', text)      # 移除删除线标记
        text = re.sub(r'_{2}(.*?)_{2}', r'\1', text)  # 移除下划线加粗
        text = re.sub(r'_(.*?)_', r'\1', text)        # 移除下划线斜体
        text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text) # 移除链接，保留文本
        text = re.sub(r'#{1,6}\s*(.*)', r'\1', text)  # 移除标题标记
        # 清理特殊符号，但保留中文标点
        text = re.sub(r'[：:]\s*', ' ', text)  # 处理冒号
        text = re.sub(r'[，,]\s*', ' ', text)  # 处理逗号
        text = re.sub(r'[。.]\s*', ' ', text)  # 处理句号
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    except Exception as e:
        logger.warning(f"解析文本时出错: {e}")
        return text.strip() if text else ""

def extract_raw_content(text):
    """提取原始内容，保留特殊字符和格式"""
    if not text:
        return ""
    try:
        soup = BeautifulSoup(text, 'lxml')
        # 移除script和style标签
        for script in soup(["script", "style"]):
            script.decompose()
        # 获取文本但保留更多原始格式
        text = soup.get_text(separator='\n', strip=True)
        # 更彻底地清理Markdown语法
        text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # 移除加粗标记
        text = re.sub(r'\*(.*?)\*', r'\1', text)      # 移除斜体标记
        text = re.sub(r'`(.*?)`', r'\1', text)        # 移除行内代码标记
        text = re.sub(r'~~(.*?)~~', r'\1', text)      # 移除删除线标记
        text = re.sub(r'_{2}(.*?)_{2}', r'\1', text)  # 移除下划线加粗
        text = re.sub(r'_(.*?)_', r'\1', text)        # 移除下划线斜体
        text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text) # 移除链接，保留文本
        text = re.sub(r'#{1,6}\s*(.*)', r'\1', text)  # 移除标题标记
        # 清理特殊符号，但保留中文标点
        text = re.sub(r'[：:]\s*', ' ', text)  # 处理冒号
        text = re.sub(r'[，,]\s*', ' ', text)  # 处理逗号
        text = re.sub(r'[。.]\s*', ' ', text)  # 处理句号
        # 保留重要的特殊字符
        text = re.sub(r'\n+', '\n', text)
        return text.strip()
    except:
        return text.strip() if text else ""

def sqlite_index_html_content(html_path: str) -> list:
    """
    从HTML文件中提取内容并建立索引
    
    Args:
        html_path: HTML文件路径
    Returns:
        包含索引内容的列表
    """
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH
    
    # 读取HTML内容
    html_content = _read_html_file(html_path)
    if not html_content:
        return []
    
    # 解析HTML
    soup = _parse_html_content(html_content)
    if not soup:
        return []
        
    # 获取主要内容区域
    content_inner = _get_content_inner(soup)
    if not content_inner:
        return []
    
    # 清理不需要的元素
    _clean_content(content_inner)
    
    # 获取URL和页面名称
    url, name = _get_url_and_name(html_path, soup)
    
    # 处理图片元素
    _process_images(content_inner, url)
    
    # 提取标题和内容
    return _extract_headings(content_inner, url, name)

def _read_html_file(html_path: str) -> str:
    """读取HTML文件内容"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception:
        return ''

def _parse_html_content(html_content: str) -> BeautifulSoup | None:
    """解析HTML内容"""
    try:
        return BeautifulSoup(html_content, 'lxml')
    except Exception:
        try:
            return BeautifulSoup(html_content, 'html.parser')
        except Exception:
            return None

def _get_content_inner(soup: BeautifulSoup):
    """获取主要内容区域"""
    content_inner = soup.find(class_='md-content__inner')
    if not content_inner or not hasattr(content_inner, 'find_all'):
        return None
    return content_inner

def _clean_content(content_inner):
    """清理不需要的元素"""
    for element in content_inner.find_all(['script', 'style', 'object']):
        if hasattr(element, 'decompose'):
            element.decompose()
    for linenos in content_inner.select('.md-content .linenos'):
        linenos.decompose()

def _get_url_and_name(html_path: str, soup: BeautifulSoup) -> tuple:
    """获取URL和页面名称"""
    global MKDOCS_SITE_PATH
    html_url_relpath = os.path.relpath(html_path, MKDOCS_SITE_PATH)
    url = html_url_relpath.replace(os.sep, "/")
    
    # 优先从HTML的<title>标签获取页面名称
    try:
        title_tag = soup.find('title')
        if title_tag:
            name = title_tag.get_text(strip=True)
            # 移除mkdocs添加的站点名称后缀
            name = re.sub(r'\s+-\s+.*$', '', name, 1)
        else:
            raise ValueError("No title tag found")
    except Exception:
        # 回退到从路径生成名称
        path_for_name = url
        if path_for_name.endswith('/index.html'):
            path_for_name = path_for_name[:-11]
        elif path_for_name == 'index.html':
            path_for_name = ''
        name = path_for_name.split('/')[-1] if path_for_name else "主页"

    # 清理URL，移除 index.html
    if url.endswith('/index.html'):
        url = url[:-10]  # 保留末尾的'/'
    elif url == 'index.html':
        url = '/'
    
    # 确保URL以'/'开头
    if not url.startswith('/'):
        url = '/' + url

    return url, name

def _process_images(content_inner, url: str):
    """处理图片元素"""
    for img in content_inner.select('img'):
        try:
            img_src = img.get('src', '')
            if img_src:
                img_url = f"{url.rstrip('/')}/{img_src}" if url != '/' else f"/{img_src}"
                button_html = f'<a href="{escape(img_url)}" target="_blank"><button>查看图片</button></a>'
                img.replace_with(BeautifulSoup(button_html, 'lxml'))
        except Exception:
            img.decompose()

def _extract_headings(content_inner, url: str, name: str) -> list:
    """提取标题和内容"""
    headings = []
    current_title = None
    
    # 为整个页面创建一个文档
    page_body = str(content_inner)
    headings.append({
        'url': url,
        'name': name,
        'title': name, # 页面主标题
        'link': '', # 指向页面本身
        'body': page_body,
    })

    for element in content_inner.children:
        if _is_heading_element(element):
            title_id = element.attrs.get('id', '') if hasattr(element, 'attrs') else ''
            title_text = element.get_text(strip=True).rstrip("¶")
            if title_text:
                headings.append({
                    'url': url,
                    'name': name,
                    'title': title_text,
                    'link': f"#{title_id}" if title_id else "",
                    'body': str(element.find_next_sibling()) if element.find_next_sibling() else ''
                })
    
    return headings

def _is_heading_element(element) -> bool:
    """判断是否为标题元素"""
    return (hasattr(element, 'name') and 
            hasattr(element, 'find_all') and 
            element.name and 
            element.name.startswith('h'))

def sqlite_index_all_html_files(dir_path: str) -> list:
    print("📁 正在索引文档...")
    html_file_paths = []
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.html'):
                html_path = os.path.join(root, file)
                html_file_paths.append(html_path)
    
    docs = []
    for html_path in html_file_paths:
        headings = sqlite_index_html_content(html_path)
        if headings:
            docs.extend(headings)
    
    print(f"✅ 索引完成: {len(docs)} 个文档")
    return docs

def sqlite_create_db_and_insert_data(db_path, datas, table_name='mkdocs'):
    db_directory = os.path.dirname(db_path)
    if not os.path.exists(db_directory):
        os.makedirs(db_directory)
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute(f'DROP TABLE IF EXISTS {table_name};')
        
        cursor.execute(f'''
            CREATE TABLE {table_name} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                name TEXT NOT NULL,
                title TEXT NOT NULL,
                link TEXT NOT NULL,
                body TEXT,
                raw_content TEXT,
                search_text TEXT
            )
        ''')
        
        insert_data = []
        for data in datas:
            raw_content = extract_raw_content(data['body'])
            search_text = f"{data['title']} {clean_text_for_search(data['body'])} {raw_content}"
            insert_data.append((
                data['url'],
                data['name'],
                data['title'],
                data['link'],
                data['body'],
                raw_content,
                search_text
            ))
        
        cursor.executemany(f'''
            INSERT INTO {table_name} (url, name, title, link, body, raw_content, search_text)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', insert_data)
        conn.commit()
        print(f"💾 数据库就绪: {len(insert_data)} 条记录")
    except Exception as e:
        logger.error(f"数据库操作失败: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()

def sqlite_index_changed_files(changed_files, db_path):
    """只索引变更的文件"""
    if not changed_files:
        print("📄 无文件变更，跳过索引")
        return
    
    print(f"📁 增量索引: {len(changed_files)} 个文件")
    
    docs = []
    for html_path in changed_files:
        headings = sqlite_index_html_content(html_path)
        if headings:
            docs.extend(headings)
    
    if not docs:
        print("📄 无新内容")
        return
    
    # 更新数据库
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 删除变更文件的旧记录
        for html_path in changed_files:
            html_url_relpath = os.path.relpath(html_path, MKDOCS_SITE_PATH)
            url = html_url_relpath.replace(os.sep, "/")
            
            # 处理URL格式
            if url.endswith('/index.html'):
                url = url[:-10]
            elif url == 'index.html':
                url = '/'
            
            if not url.startswith('/'):
                url = '/' + url
                
            cursor.execute("DELETE FROM mkdocs WHERE url = ?", (url,))
        
        # 插入新记录
        insert_data = []
        for data in docs:
            raw_content = extract_raw_content(data['body'])
            search_text = f"{data['title']} {clean_text_for_search(data['body'])} {raw_content}"
            insert_data.append((
                data['url'],
                data['name'],
                data['title'],
                data['link'],
                data['body'],
                raw_content,
                search_text
            ))
        
        cursor.executemany('''
            INSERT INTO mkdocs (url, name, title, link, body, raw_content, search_text)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', insert_data)
        
        conn.commit()
        print(f"💾 增量更新完成: {len(insert_data)} 条记录")
        
    except Exception as e:
        logger.error(f"增量更新失败: {e}")
        if conn:
            conn.rollback()
        # 如果增量更新失败，回退到全量重建
        print("⚠️ 增量更新失败，回退全量重建...")
        docs = sqlite_index_all_html_files(MKDOCS_SITE_PATH)
        sqlite_create_db_and_insert_data(SQLITE_FILE_PATH, docs)
    finally:
        if conn:
            conn.close()

def on_config(config):
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH, SQLITE_FILE_PATH, CACHE_FILE_PATH
    
    # 打印简洁的搜索功能状态
    print_search_status()
    
    MKDOCS_DOCS_PATH = config['docs_dir']
    MKDOCS_SITE_PATH = config['site_dir']
    SQLITE_FILE_PATH = os.path.join(config.site_dir, "search", "database.sqlite")
    
    # 将缓存文件放到项目根目录，避免被清理
    project_root = os.path.dirname(config.config_file_path or os.getcwd())
    cache_dir = os.path.join(project_root, ".mkdocs_cache")
    CACHE_FILE_PATH = os.path.join(cache_dir, "search_file_cache.json")
    
    # 确保缓存目录存在
    os.makedirs(cache_dir, exist_ok=True)

def on_page_content(html, page, config, files):
    """页面内容处理钩子"""
    # 如果搜索功能被禁用，不添加搜索脚本
    if not ENABLE_SEARCH:
        return html
    
    script_code = """
    <script src="/search/sql-wasm.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var nav = document.querySelector('nav.md-header__inner.md-grid')
            var new_content = `
                <!-- ============ 新插入的 ======================== -->
                <!-- 移动端的 搜索按钮图标 -->
                <label class="md-header__button md-icon" for="__search">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5"></path></svg>
                </label>
                <!-- 电脑端 搜索按钮输入框 -->
                <div class="md-search" data-md-component="search" role="dialog">
                    <!-- 搜索框 > 遮挡区域, 用于点击任意区域 退出 搜索结果的显示 -->
                    <label class="md-search__overlay" for="__search"></label>
                    <div class="md-search__inner" role="search">
                        <form class="md-search__form" name="search">
                            <!-- 搜索框 > 文本输入区域 -->
                            <input type="text" class="md-search__input" name="query" aria-label="搜索" placeholder="搜索" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" data-md-component="search-query" required="">
                            <!-- 搜索框 > 放大镜图标, 只是图标 不能点击 -->
                            <label class="md-search__icon md-icon" for="__search">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z"></path></svg>
                            </label>
                            <!-- 搜索框 > 清除按钮, 默认: aria-label="查找" -->
                            <nav class="md-search__options" aria-label="清除">
                                <button type="reset" class="md-search__icon md-icon" title="清空当前内容" aria-label="清空当前内容" tabindex="-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </button>
                            </nav>
                        </form>
                        <!-- 搜索结果显示的内容 -->
                        <div class="md-search__output">
                            <div class="md-search__scrollwrap" tabindex="0">
                                <div class="md-search-result" data-md-component="search-result">
                                    <!-- 搜索结果 > 搜索结果信息的提示 -->
                                    <div class="md-search-result__meta">键入以开始搜索</div>
                                    <!-- 搜索结果 > 真正的结果 List 容器, 子元素为 li.md-search-result__item -->
                                    <ol class="md-search-result__list" role="presentation"></ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    /* 搜索功能 > 显示的内容 > 页面x 的内容部分 > 修复大屏时左边距过大, 影响视觉 */
                    @media screen and (min-width: 60em) {
                        /* 针对后续的 article（搜索结果）, 使用css选择器, 从 */
                        ol.md-search-result__list li.md-search-result__item a article:nth-child(n+2)  {
                            padding-left: 0.8rem;
                        }
                    }
                    /* 搜索关键词高亮样式 */
                    .search-highlight {
                        background-color: #ffeb3b;
                        color: #000;
                        padding: 1px 2px;
                        border-radius: 2px;
                        font-weight: 500;
                    }
                    /* 深色主题下的高亮样式 */
                    [data-md-color-scheme="slate"] .search-highlight {
                        background-color: #ffa726;
                        color: #000;
                    }
                    /* 搜索结果标题高亮 */
                    .md-search-result__article h1 .search-highlight,
                    .md-search-result__article h2 .search-highlight {
                        background-color: #4caf50;
                        color: #fff;
                    }
                    /* 深色主题下标题高亮 */
                    [data-md_color-scheme="slate"] .md-search-result__article h1 .search-highlight,
                    [data-md_color-scheme="slate"] .md-search-result__article h2 .search-highlight {
                        background-color: #66bb6a;
                        color: #000;
                    }
                </style>
                `
            // 查找仓库链接元素
            var repoElement = nav.querySelector('.md-header__source');
            if (repoElement) {
                // 如果找到仓库链接，在它之前插入搜索框
                repoElement.insertAdjacentHTML('beforebegin', new_content);
            } else {
                // 如果没有找到仓库链接，在nav的最后面插入
                nav.insertAdjacentHTML('beforeend', new_content);
            }
            var search_input = nav.querySelector('.md-search .md-search__inner .md-search__form .md-search__input')
            var toggle = document.querySelector(
                'input.md-toggle[data-md-toggle="search"]'
            )
            search_input.addEventListener('focus', function () {
                this.classList.add('focus-visible')
                this.setAttribute('data-focus-visible-added', '')
                toggle.checked = true
            })
        });

        document.addEventListener('DOMContentLoaded', async function () {
            var search_input = document.querySelector('.md-search .md-search__inner .md-search__form .md-search__input')
            var search_info = document.querySelector('.md-search-result__meta')
            var resultList = document.querySelector('.md-search-result__list')
            let debounceTimeout;
            let currentSearchQuery = '';
            const sqlPromise = initSqlJs({
                locateFile: file => `/search/${file}`
            });
            const dataPromise = fetch("/search/database.sqlite").then(res => res.arrayBuffer());
            const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
            const db = new SQL.Database(new Uint8Array(buf));
            const clearButton = document.querySelector('.md-search .md-search__inner .md-search__form .md-search__icon.md-icon');
            clearButton.addEventListener('click', function() {
                resultList.innerHTML = '';
                search_input.value = '';
                currentSearchQuery = '';
                search_input.focus();
            });
            
            function normalizeQuery(query) {
                // 清理查询字符串，处理各种标点符号
                return query
                    .replace(/[：:]/g, ' ')      // 冒号替换为空格
                    .replace(/[，,]/g, ' ')      // 逗号替换为空格
                    .replace(/[。.]/g, ' ')      // 句号替换为空格
                    .replace(/[！!]/g, ' ')      // 感叹号替换为空格
                    .replace(/[？?]/g, ' ')      // 问号替换为空格
                    .replace(/[；;]/g, ' ')      // 分号替换为空格
                    .replace(/\\s+/g, ' ')       // 多个空格合并为一个
                    .trim();
            }
            
            function highlightKeywords(text, keywords) {
                if (!keywords || !text) return escapeHtml(text);
                const keywordList = keywords.split(/\\s+/).filter(k => k.trim().length > 0);
                if (keywordList.length === 0) return escapeHtml(text);
                let highlightedText = escapeHtml(text);
                keywordList.forEach(keyword => {
                    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
                    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
                    highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
                });
                return highlightedText;
            }
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            function truncateAndHighlight(content, rawContent, maxLength, keywords) {
                if (!content && !rawContent) return '';
                
                // 优先使用原始内容进行匹配
                const keywordList = keywords.split(/\\s+/).filter(k => k.trim().length > 0);
                let bestContent = rawContent || content;
                let bestMatch = -1;
                
                const textToSearch = (rawContent || (content ? new DOMParser().parseFromString(content, "text/html").body.textContent : "")).toLowerCase();

                for (const keyword of keywordList) {
                    const index = textToSearch.indexOf(keyword.toLowerCase());
                    if (index !== -1) {
                        bestMatch = index;
                        break;
                    }
                }
                
                let finalText = textToSearch;
                
                let truncatedText = finalText;
                if (finalText.length > maxLength) {
                    let bestStart = 0;
                    if (bestMatch !== -1) {
                        bestStart = Math.max(0, bestMatch - Math.floor(maxLength / 3));
                    }
                    truncatedText = finalText.substring(bestStart, bestStart + maxLength);
                    if (bestStart > 0) truncatedText = '...' + truncatedText;
                    if (bestStart + maxLength < finalText.length) truncatedText += '...';
                }
                
                return highlightKeywords(truncatedText, keywords);
            }
            search_input.addEventListener('input', function () {
                if(!db){
                    search_info.textContent = '正在初始化中...'
                    return;
                }
                var search_query = this.value.trim(); // 去除首尾空白
                currentSearchQuery = search_query;
                if (!search_query) {
                    search_info.textContent = '键入以开始搜索'
                    resultList.innerHTML = '';
                    return
                }
                if (search_query.length < 2) {
                    search_info.textContent = '请输入2个以上的字符'
                    return
                }
                if (debounceTimeout) clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(function () {
                    if (!search_query) {
                        search_info.textContent = '键入以开始搜索';
                        return;
                    }
                    if (search_query.length < 2) {
                        search_info.textContent = '请输入2个以上的字符';
                        return;
                    }
                    try {
                        // 标准化查询字符串
                        const normalizedQuery = normalizeQuery(search_query);
                        const keywords = normalizedQuery.split(/\\s+/).filter(k => k.trim().length >= 1);
                        
                        if (keywords.length === 0) return;

                        // 改进的搜索策略：使用OR逻辑而不是AND逻辑
                        let queryParts = [];
                        let params = [];
                        
                        // 完整查询匹配（最高优先级）
                        queryParts.push("(title LIKE ? OR search_text LIKE ?)");
                        params.push(`%${search_query}%`, `%${search_query}%`);
                        
                        // 标准化查询匹配
                        if (normalizedQuery !== search_query) {
                            queryParts.push("(title LIKE ? OR search_text LIKE ?)");
                            params.push(`%${normalizedQuery}%`, `%${normalizedQuery}%`);
                        }
                        
                        // 单个关键词匹配
                        keywords.forEach(kw => {
                            if (kw.length >= 2) {
                                queryParts.push("(title LIKE ? OR search_text LIKE ?)");
                                params.push(`%${kw}%`, `%${kw}%`);
                            }
                        });
                        
                        const sqlQuery = `SELECT * FROM mkdocs WHERE ${queryParts.join(' OR ')}`;
                        const stmt = db.prepare(sqlQuery);
                        stmt.bind(params);
                        
                        const results = new Map();
                        while (stmt.step()) {
                            const row = stmt.getAsObject();
                            
                            let score = 0;
                            const lowerQuery = search_query.toLowerCase();
                            const lowerNormalizedQuery = normalizedQuery.toLowerCase();
                            const lowerTitle = (row.title || '').toLowerCase();
                            const lowerContent = (row.raw_content || '').toLowerCase();
                            const lowerSearchText = (row.search_text || '').toLowerCase();

                            // 完整查询匹配（最高分）
                            if (lowerTitle.includes(lowerQuery)) score += 100;
                            if (lowerSearchText.includes(lowerQuery)) score += 80;
                            
                            // 标准化查询匹配
                            if (lowerTitle.includes(lowerNormalizedQuery)) score += 90;
                            if (lowerSearchText.includes(lowerNormalizedQuery)) score += 70;
                            
                            // 标题完全匹配
                            if (lowerTitle === lowerQuery || lowerTitle === lowerNormalizedQuery) score += 200;
                            
                            // 关键词匹配加分
                            keywords.forEach(kw => {
                                const lowerKw = kw.toLowerCase();
                                if (lowerTitle.includes(lowerKw)) score += 30;
                                if (lowerContent.includes(lowerKw)) score += 10;
                            });
                            
                            // 多关键词同时出现加分
                            let matchedKeywords = 0;
                            keywords.forEach(kw => {
                                if (lowerSearchText.includes(kw.toLowerCase())) {
                                    matchedKeywords++;
                                }
                            });
                            if (matchedKeywords > 1) {
                                score += matchedKeywords * 15;
                            }

                            if (results.has(row.id)) {
                                results.get(row.id).score += score;
                            } else {
                                results.set(row.id, { data: Object.values(row), score: score });
                            }
                        }
                        stmt.free();
                        
                        const sortedResults = Array.from(results.values())
                            .sort((a, b) => b.score - a.score)
                            .slice(0, 50)
                            .map(item => item.data);

                        handleQueryResults(sortedResults);
                    } catch (error) {
                        console.error('Error: ' + error.message);
                        search_info.textContent = '搜索出错，请重试';
                    }
                }, 300);
                function handleQueryResults(datas) {
                    if (datas.length === 0) {
                        search_info.textContent = '没有符合条件的结果';
                        resultList.innerHTML = '';
                        return;
                    } else {
                        search_info.textContent = `${datas.length} 个符合条件的结果`;
                    }
                    var new_datas = {};
                    var global_content_set = new Set(); // 全局去重集合

                    datas.forEach(value => {
                        const [id, url, name, title, link, body, raw_content] = value;
                        const pageUrl = url.endsWith('/') ? url : url + '/';
                        
                        if (!new_datas[pageUrl]) {
                            new_datas[pageUrl] = { url: pageUrl, name, matches: [] };
                        }

                        // 改进的去重逻辑：使用更精确的标识符
                        const normalizedTitle = title.trim().toLowerCase();
                        const normalizedContent = (raw_content || '').trim().toLowerCase();
                        
                        // 创建更精确的内容指纹
                        const contentFingerprint = `${pageUrl}|${normalizedTitle}|${normalizedContent.substring(0, 200)}`;
                        
                        // 检查是否为页面主标题与页面名称相同的情况
                        const isPageMainTitle = normalizedTitle === name.trim().toLowerCase() && link === '';
                        
                        // 如果是页面主标题且已经有其他匹配项，则跳过
                        if (isPageMainTitle && new_datas[pageUrl].matches.length > 0) {
                            return;
                        }
                        
                        // 如果不是重复内容，则添加
                        if (!global_content_set.has(contentFingerprint)) {
                            new_datas[pageUrl].matches.push({ title, link, body, raw_content });
                            global_content_set.add(contentFingerprint);
                        }
                    });

                    // 清理空的页面条目
                    Object.keys(new_datas).forEach(pageUrl => {
                        if (new_datas[pageUrl].matches.length === 0) {
                            delete new_datas[pageUrl];
                        }
                    });

                    resultList.innerHTML = '';
                    const resultItems = Object.values(new_datas).map(data => `
                        <li class="md-search-result__item" style="border: 2px solid #bababa; margin: 10px; border-radius: 8px;">
                            <div class="md-search-result__link search-result-main" style="border-bottom:1px solid #bababa; cursor: pointer; text-decoration: none;" data-url="${data.url}" data-query="${escapeHtml(currentSearchQuery)}">
                                <article class="md-search-result__article md-typeset">
                                    <div class="md-search-result__icon md-icon"></div>
                                    <h1>${highlightKeywords(data.name, currentSearchQuery)}</h1>
                                </article>
                            </div>
                            ${data.matches.map(match => `
                                <div class="md-search-result__link search-result-item" style="cursor: pointer; text-decoration: none;" data-url="${data.url}${match.link}" data-query="${escapeHtml(currentSearchQuery)}">
                                    <article class="md-search-result__article md-typeset">
                                        <h2>${highlightKeywords(match.title, currentSearchQuery)}</h2>
                                        <div class="search-content-preview">
                                            ${truncateAndHighlight(match.body, match.raw_content, 200, currentSearchQuery)}
                                        </div>
                                    </article>
                                </div>
                            `).join('')}
                        </li>
                    `).join('');
                    resultList.innerHTML = resultItems;
                    
                    // 添加点击事件处理
                    const resultLinks = resultList.querySelectorAll('.search-result-main, .search-result-item');
                    resultLinks.forEach(link => {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const targetUrl = link.getAttribute('data-url');
                            const query = link.getAttribute('data-query');
                            
                            if (targetUrl && query) {
                                // 关闭搜索框
                                const toggle = document.querySelector('input[data-md-toggle="search"]');
                                if (toggle) {
                                    toggle.checked = false;
                                }
                                
                                const url = new URL(targetUrl, window.location.origin);
                                url.searchParams.set('highlight', query);
                                window.location.href = url.toString();
                            }
                        });
                    });
                }
            })
        })
    </script>
    """
    html += script_code
    return html

def on_post_build(config):
    """构建后钩子函数"""
    # 搜索功能开关检查
    if not ENABLE_SEARCH:
        return  # 静默返回，不重复打印禁用信息
    
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH, SQLITE_FILE_PATH
    
    # 检测开发模式
    is_dev_mode = getattr(config, 'dev_addr', None) is not None
    debug_print(f"开发模式: {is_dev_mode}")
    
    if not MKDOCS_SITE_PATH:
        MKDOCS_SITE_PATH = config['site_dir']
    if not SQLITE_FILE_PATH:
        SQLITE_FILE_PATH = os.path.join(MKDOCS_SITE_PATH, "search", "database.sqlite")
    
    # 开发模式优化策略
    if is_dev_mode and DEV_MODE_SKIP_REBUILD:
        if os.path.exists(SQLITE_FILE_PATH):
            file_size = os.path.getsize(SQLITE_FILE_PATH)
            debug_print(f"数据库文件大小: {file_size} bytes")
            
            if file_size > 1024:  # 大于1KB说明有内容
                print("⚡ 开发模式: 使用缓存数据库")
                _copy_sqljs_files()
                return
            else:
                print("🔄 数据库异常，重新构建...")
        else:
            print("📦 首次构建搜索数据库...")
        
        # 执行构建
        docs = sqlite_index_all_html_files(MKDOCS_SITE_PATH)
        sqlite_create_db_and_insert_data(SQLITE_FILE_PATH, docs)
    
    elif not is_dev_mode:
        # 生产模式使用增量索引
        if not os.path.exists(SQLITE_FILE_PATH):
            print("📦 首次构建搜索数据库...")
            docs = sqlite_index_all_html_files(MKDOCS_SITE_PATH)
            sqlite_create_db_and_insert_data(SQLITE_FILE_PATH, docs)
        else:
            changed_files, total_files = get_changed_files(MKDOCS_SITE_PATH)
            if changed_files:
                print(f"📊 检测到 {len(changed_files)}/{total_files} 个文件变更")
                sqlite_index_changed_files(changed_files, SQLITE_FILE_PATH)
            else:
                print("📄 无文件变更")
    
    else:
        # 开发模式但不跳过重建
        print("🔄 开发模式: 完整重建...")
        docs = sqlite_index_all_html_files(MKDOCS_SITE_PATH)
        sqlite_create_db_and_insert_data(SQLITE_FILE_PATH, docs)
    
    # 复制SQL.js文件
    _copy_sqljs_files()
    
    print("🎉 搜索功能构建完成")

def _copy_sqljs_files():
    """复制SQL.js文件的独立函数"""
    if not MKDOCS_SITE_PATH:
        logger.error("MKDOCS_SITE_PATH is not set")
        return
    search_dir = os.path.join(MKDOCS_SITE_PATH, 'search')
    sql_wasm_js = os.path.join(search_dir, 'sql-wasm.js')
    
    if not os.path.exists(sql_wasm_js):
        if not os.path.exists(search_dir):
            os.makedirs(search_dir)
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        latest_folder = max(
            (folder for folder in os.listdir(current_dir)
            if folder.startswith('sqljs-wasm') and os.path.isdir(os.path.join(current_dir, folder))),
            key=lambda folder: os.path.getmtime(os.path.join(current_dir, folder)),
            default=None
        );
        
        if latest_folder:
            source_js_file = os.path.join(current_dir, latest_folder, 'sql-wasm.js');
            source_wasm_file = os.path.join(current_dir, latest_folder, 'sql-wasm.wasm');
            
            shutil.copy(source_js_file, os.path.join(search_dir, 'sql-wasm.js'));
            shutil.copy(source_wasm_file, os.path.join(search_dir, 'sql-wasm.wasm'));
            
            debug_print("SQL.js 库文件复制完成")
        else:
            print("❌ 未找到 SQL.js 库文件")