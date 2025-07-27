import os
import shutil
import sqlite3
import re
import logging
from mkdocs.plugins import BasePlugin
from bs4 import BeautifulSoup
from lxml import html
from html import escape
from html.parser import HTMLParser
import warnings

# 抑制BeautifulSoup的警告
warnings.filterwarnings("ignore", category=UserWarning, module='bs4')

MKDOCS_DOCS_PATH = None
MKDOCS_SITE_PATH = None
SQLITE_FILE_PATH = None

# 设置更简洁的日志级别
logging.basicConfig(level=logging.WARNING, format='%(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def clean_text_for_search(text):
    """清理文本用于搜索，保留更多格式信息"""
    if not text:
        return ""
    try:
        soup = BeautifulSoup(text, 'lxml')
        text = soup.get_text(separator=' ', strip=True)
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
    url, name = _get_url_and_name(html_path)
    
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

def _get_url_and_name(html_path: str) -> tuple:
    """获取URL和页面名称"""
    global MKDOCS_SITE_PATH
    html_url_relpath = os.path.relpath(html_path, MKDOCS_SITE_PATH)
    url = html_url_relpath.replace("\\index.html", "").replace("\\", "/").lstrip("/")
    name = url.split("/")[-1] if url else "主页"
    return url, name

def _process_images(content_inner, url: str):
    """处理图片元素"""
    for img in content_inner.select('img'):
        try:
            img_src = img.get('src', '')
            if img_src:
                img_url = f"{url}/{img_src}" if url else img_src
                button_html = f'<a href="{escape(img_url)}" target="_blank"><button>查看图片</button></a>'
                img.replace_with(BeautifulSoup(button_html, 'lxml'))
        except Exception:
            img.decompose()

def _extract_headings(content_inner, url: str, name: str) -> list:
    """提取标题和内容"""
    headings = []
    current_title = None
    
    for element in content_inner.children:
        if _is_heading_element(element):
            if current_title:
                current_title['body'] = clean_text_for_search(current_title['body'])
                headings.append(current_title)
            current_title = _create_heading_dict(element, url, name)
        elif current_title and hasattr(element, 'get_text'):
            current_title['body'] += str(element)
    
    if current_title:
        current_title['body'] = clean_text_for_search(current_title['body'])
        headings.append(current_title)
    
    return headings

def _is_heading_element(element) -> bool:
    """判断是否为标题元素"""
    return (hasattr(element, 'name') and 
            hasattr(element, 'find_all') and 
            element.name and 
            element.name.startswith('h'))

def _create_heading_dict(element, url: str, name: str) -> dict:
    """创建标题字典"""
    title_id = element.attrs.get('id', '') if hasattr(element, 'attrs') else ''
    title = element.get_text(strip=True).rstrip("¶")
    return {
        'url': url,
        'name': name,
        'title': title,
        'link': f"#{title_id}" if title_id else "#",
        'body': '',
    }
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except Exception:
        return []
    
    try:
        soup = BeautifulSoup(html_content, 'lxml')
    except Exception as e:
        soup = BeautifulSoup(html_content, 'html.parser')
    
    html_md_content__inner = soup.find(class_='md-content__inner')
    if not html_md_content__inner or not hasattr(html_md_content__inner, 'find_all'):
        return []
    
    for element in html_md_content__inner.find_all(['script', 'style', 'object']):
        if hasattr(element, 'decompose'):
            element.decompose()
    for linenos in html_md_content__inner.select('.md-content .linenos'):
        linenos.decompose()
    
    html_url_relpath_path = os.path.relpath(html_path, MKDOCS_SITE_PATH)
    url = html_url_relpath_path.replace("\\index.html", "").replace("\\", "/").lstrip("/")
    name = url.split("/")[-1] if url else "主页"
    
    for img in html_md_content__inner.select('img'):
        try:
            img_src = img.get('src', '')
            if img_src:
                img_url = f"{url}/{img_src}" if url else img_src
                button_html = f'<a href="{escape(img_url)}" target="_blank"><button>查看图片</button></a>'
                img.replace_with(BeautifulSoup(button_html, 'lxml'))
        except Exception as e:
            img.decompose()
    
    headings = []
    current_title = None
    for element in html_md_content__inner.children:
        if hasattr(element, 'name') and hasattr(element, 'find_all') and hasattr(element, 'name') and element.name and element.name.startswith('h'):
            if current_title:
                current_title['body'] = clean_text_for_search(current_title['body'])
                headings.append(current_title)
            title_id = element.attrs.get('id', '') if hasattr(element, 'attrs') else ''
            title = element.get_text(strip=True).rstrip("¶")
            current_title = {
                'url': url,
                'name': name,
                'title': title,
                'link': f"#{title_id}" if title_id else "#",
                'body': '',
            }
        elif current_title and hasattr(element, 'get_text'):
            current_title['body'] += str(element)
    
    if current_title:
        current_title['body'] = clean_text_for_search(current_title['body'])
        headings.append(current_title)
    
    return headings

def sqlite_index_all_html_files(dir_path: str) -> list:
    print("正在索引HTML文件...")
    html_file_paths = []
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('index.html'):
                html_path = os.path.join(root, file)
                html_file_paths.append(html_path)
    
    docs = []
    for html_path in html_file_paths:
        headings = sqlite_index_html_content(html_path)
        if headings:
            docs.extend(headings)
    
    print(f"索引完成，共处理 {len(docs)} 个文档")
    return docs

def sqlite_create_db_and_insert_data(db_path, datas, table_name='mkdocs'):
    db_directory = os.path.dirname(db_path)
    if not os.path.exists(db_directory):
        os.makedirs(db_directory)
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute(f'''
            SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}';
        ''')
        if cursor.fetchone():
            cursor.execute(f'DROP TABLE {table_name};')
        
        cursor.execute(f'''
            CREATE TABLE {table_name} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                name TEXT NOT NULL,
                title TEXT NOT NULL,
                link TEXT NOT NULL,
                body TEXT,
                raw_content TEXT,
                search_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute(f'CREATE INDEX idx_{table_name}_search ON {table_name}(search_text);')
        cursor.execute(f'CREATE INDEX idx_{table_name}_raw ON {table_name}(raw_content);')
        cursor.execute(f'CREATE INDEX idx_{table_name}_url ON {table_name}(url);')
        
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
        print(f"数据库创建成功，插入 {len(insert_data)} 条记录")
    except Exception as e:
        logger.error(f"数据库操作失败: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()

def on_config(config):
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH, SQLITE_FILE_PATH
    if not MKDOCS_DOCS_PATH: MKDOCS_DOCS_PATH = config['docs_dir']
    if not MKDOCS_SITE_PATH: MKDOCS_SITE_PATH = config['site_dir']
    if not SQLITE_FILE_PATH: SQLITE_FILE_PATH = os.path.join(config.site_dir, "search", "database.sqlite")

def on_page_content(html, page, config, files):
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
                    [data-md-color-scheme="slate"] .md-search-result__article h1 .search-highlight,
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
                let bestContent = content;
                let bestMatch = -1;
                
                // 在原始内容中查找最佳匹配
                if (rawContent) {
                    for (const keyword of keywordList) {
                        const index = rawContent.toLowerCase().indexOf(keyword.toLowerCase());
                        if (index !== -1) {
                            bestContent = rawContent;
                            bestMatch = index;
                            break;
                        }
                    }
                }
                
                // 如果原始内容没有匹配，回退到清理后的内容
                if (bestMatch === -1 && content) {
                    const temp = document.createElement('div');
                    temp.innerHTML = content;
                    const text = temp.textContent || temp.innerText || '';
                    for (const keyword of keywordList) {
                        const index = text.toLowerCase().indexOf(keyword.toLowerCase());
                        if (index !== -1) {
                            bestContent = text;
                            bestMatch = index;
                            break;
                        }
                    }
                }
                
                // 处理最终文本
                let finalText;
                if (bestContent === rawContent) {
                    finalText = rawContent;
                } else {
                    const temp = document.createElement('div');
                    temp.innerHTML = bestContent;
                    finalText = temp.textContent || temp.innerText || '';
                }
                
                let truncatedText = finalText;
                if (finalText.length > maxLength) {
                    let bestStart = 0;
                    if (bestMatch !== -1) {
                        bestStart = Math.max(0, bestMatch - Math.floor(maxLength / 2));
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
                        // 增强搜索逻辑，支持多种匹配模式
                        var searchResults = new Set();
                        
                        // 1. 精确匹配（优先级最高）
                        var exactStmt = db.prepare(
                            "SELECT * FROM mkdocs WHERE title LIKE '%' || ? || '%' OR raw_content LIKE '%' || ? || '%' OR search_text LIKE '%' || ? || '%'"
                        );
                        exactStmt.bind([search_query, search_query, search_query]);
                        while (exactStmt.step()) {
                            var row = Object.values(exactStmt.get());
                            searchResults.add(JSON.stringify(row));
                        }
                        exactStmt.free();
                        
                        // 2. 分词搜索（处理空格分隔的多个关键词）
                        var keywords = search_query.split(/\\s+/).filter(k => k.trim().length > 0);
                        if (keywords.length > 1) {
                            for (var keyword of keywords) {
                                if (keyword.length >= 2) {
                                    var keywordStmt = db.prepare(
                                        "SELECT * FROM mkdocs WHERE title LIKE '%' || ? || '%' OR raw_content LIKE '%' || ? || '%' OR search_text LIKE '%' || ? || '%'"
                                    );
                                    keywordStmt.bind([keyword, keyword, keyword]);
                                    while (keywordStmt.step()) {
                                        var row = Object.values(keywordStmt.get());
                                        searchResults.add(JSON.stringify(row));
                                    }
                                    keywordStmt.free();
                                }
                            }
                        }
                        
                        // 3. 模糊搜索（去除特殊字符后搜索）
                        var fuzzyQuery = search_query.replace(/[^\\w\\s\\u4e00-\\u9fff]/g, ' ').replace(/\\s+/g, ' ').trim();
                        if (fuzzyQuery && fuzzyQuery !== search_query) {
                            var fuzzyStmt = db.prepare(
                                "SELECT * FROM mkdocs WHERE search_text LIKE '%' || ? || '%'"
                            );
                            fuzzyStmt.bind([fuzzyQuery]);
                            while (fuzzyStmt.step()) {
                                var row = Object.values(fuzzyStmt.get());
                                searchResults.add(JSON.stringify(row));
                            }
                            fuzzyStmt.free();
                        }
                        
                        // 转换结果并排序
                        var datas = Array.from(searchResults).map(item => JSON.parse(item));
                        
                        // 按相关性排序
                        datas.sort((a, b) => {
                            var aTitle = a[3] || '';
                            var bTitle = b[3] || '';
                            var aExactTitle = aTitle.toLowerCase().includes(search_query.toLowerCase());
                            var bExactTitle = bTitle.toLowerCase().includes(search_query.toLowerCase());
                            
                            if (aExactTitle && !bExactTitle) return -1;
                            if (!aExactTitle && bExactTitle) return 1;
                            return 0;
                        });
                        
                        // 限制结果数量
                        datas = datas.slice(0, 50);
                        
                        if (datas.length === 0) {
                            search_info.textContent = '没有符合条件的结果';
                            resultList.innerHTML = '';
                            return;
                        }
                        handleQueryResults(datas);
                    } catch (error) {
                        console.error('Error: ' + error.message);
                        search_info.textContent = '搜索出错，请重试';
                    }
                }, 300);
                function handleQueryResults(datas) {
                    if (datas.length === 0) {
                        search_info.textContent = '没有符合条件的结果';
                        return;
                    } else {
                        search_info.textContent = `${datas.length} 个符合条件的结果`;
                    }
                    var new_datas = {};
                    var new_datas_ids = new Set();
                    datas.forEach(value => {
                        const [id, url, name, title, link, body, raw_content] = value;
                        if (!new_datas[url]) {
                            new_datas[url] = { url, name, matches: [] };
                        }
                        if (!new_datas_ids.has(id)) {
                            new_datas_ids.add(id);
                            new_datas[url].matches.push({ title, link, body, raw_content });
                        }
                    });
                    resultList.innerHTML = '';
                    const baseUrl = window.location.origin;
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
                                
                                // 构建带有高亮参数的URL
                                const currentPath = window.location.pathname;
                                const targetPath = targetUrl.startsWith('/') ? targetUrl : '/' + targetUrl;
                                
                                if (currentPath === targetPath) {
                                    // 如果是当前页面，直接高亮
                                    if (window.highlightContent) {
                                        window.highlightContent(query);
                                    }
                                } else {
                                    // 如果是其他页面，跳转并传递高亮参数
                                    const url = new URL(targetPath, window.location.origin);
                                    url.searchParams.set('highlight', query);
                                    window.location.href = url.toString();
                                }
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
    global MKDOCS_DOCS_PATH, MKDOCS_SITE_PATH, SQLITE_FILE_PATH
    
    # Ensure paths are properly initialized
    if not MKDOCS_SITE_PATH:
        MKDOCS_SITE_PATH = config['site_dir']
    if not SQLITE_FILE_PATH:
        SQLITE_FILE_PATH = os.path.join(MKDOCS_SITE_PATH, "search", "database.sqlite")
    
    print("\n\033[94m{'='*30} sqlite 搜索功能 {'='*30}\033[0m")
    docs = sqlite_index_all_html_files(MKDOCS_SITE_PATH)
    sqlite_create_db_and_insert_data(SQLITE_FILE_PATH, docs)
    print(f"\n\033[94m{'='*30} 'sql.js'库 > 本地初始化 {'='*30}\033[0m")
    search_dir = os.path.join(MKDOCS_SITE_PATH, 'search')
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
        shutil.copy(source_js_file, os.path.join(MKDOCS_SITE_PATH, 'search', 'sql-wasm.js'));
        shutil.copy(source_wasm_file, os.path.join(MKDOCS_SITE_PATH, 'search', 'sql-wasm.wasm'));
        print(f'已将 {source_js_file} 复制到 {MKDOCS_SITE_PATH}/search/目录下')
        print(f'已将 {source_wasm_file} 复制到 {MKDOCS_SITE_PATH}/search/目录下')
    else:
        print('未找到以 "sqljs-wasm" 开头的文件夹。')