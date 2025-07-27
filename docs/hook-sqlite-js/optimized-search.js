/**
 * 优化的 SQLite 搜索功能
 * 包含防SQL注入、性能优化、错误处理等功能
 */

class OptimizedSearch {
    constructor() {
        this.db = null;
        this.searchInput = null;
        this.searchInfo = null;
        this.resultList = null;
        this.debounceTimeout = null;
        this.isInitialized = false;
        this.cache = new Map(); // 搜索结果缓存
    }

    async init() {
        try {
            // 初始化DOM元素
            this.initDOMElements();
            
            // 加载数据库
            await this.loadDatabase();
            
            // 绑定事件
            this.bindEvents();
            
            this.isInitialized = true;
            console.log('搜索功能初始化完成');
            
        } catch (error) {
            console.error('搜索功能初始化失败:', error);
            this.showError('搜索功能初始化失败');
        }
    }

    initDOMElements() {
        this.searchInput = document.querySelector('.md-search__input');
        this.searchInfo = document.querySelector('.md-search-result__meta');
        this.resultList = document.querySelector('.md-search-result__list');
        
        if (!this.searchInput || !this.searchInfo || !this.resultList) {
            throw new Error('找不到必要的DOM元素');
        }
    }

    async loadDatabase() {
        try {
            this.showStatus('正在加载搜索数据库...');
            
            // 并行加载 SQL.js 和数据库文件
            const [SQL, arrayBuffer] = await Promise.all([
                initSqlJs({
                    locateFile: file => `/search/${file}`
                }),
                fetch("/search/database.sqlite").then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.arrayBuffer();
                })
            ]);
            
            this.db = new SQL.Database(new Uint8Array(arrayBuffer));
            this.showStatus('键入以开始搜索');
            
        } catch (error) {
            console.error('数据库加载失败:', error);
            throw new Error('无法加载搜索数据库');
        }
    }

    bindEvents() {
        // 搜索输入事件
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });

        // 清空按钮事件
        const clearButton = document.querySelector('.md-search__options button[type="reset"]');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // ESC键退出搜索
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const toggle = document.querySelector('input[data-md-toggle="search"]');
                if (toggle) {
                    toggle.checked = false;
                }
            }
        });
    }

    handleSearchInput(query) {
        // 清除之前的延迟执行
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        // 输入验证
        if (!query) {
            this.showStatus('键入以开始搜索');
            this.clearResults();
            return;
        }

        if (query.length < 2) {
            this.showStatus('请输入至少2个字符');
            this.clearResults();
            return;
        }

        // 防抖处理
        this.debounceTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    async performSearch(query) {
        if (!this.db) {
            this.showError('数据库未初始化');
            return;
        }

        try {
            // 检查缓存
            const cacheKey = query.toLowerCase();
            if (this.cache.has(cacheKey)) {
                this.displayResults(this.cache.get(cacheKey));
                return;
            }

            // 使用参数化查询防止 SQL 注入
            const stmt = this.db.prepare(`
                SELECT * FROM mkdocs 
                WHERE search_text LIKE ? 
                ORDER BY 
                    CASE 
                        WHEN title LIKE ? THEN 1  -- 标题匹配优先
                        WHEN search_text LIKE ? THEN 2  -- 完全匹配其次
                        ELSE 3  -- 部分匹配最后
                    END,
                    LENGTH(title) ASC,  -- 更短的标题优先
                    url ASC  -- 按URL排序保持稳定结果
                LIMIT 100
            `);

            stmt.bind([`%${query}%`, `%${query}%`, `%${query}%`]);
            const results = [];
            while (stmt.step()) {
                results.push(stmt.getAsObject());
            }
            stmt.free();

            if (results.length === 0) {
                this.showStatus('没有符合条件的结果');
                this.clearResults();
                return;
            }

            // 缓存结果
            this.cache.set(cacheKey, results);

            // 分组并显示结果
            const groupedResults = this.groupResultsByUrl(results);
            this.displayResults(groupedResults);

        } catch (error) {
            console.error('搜索执行失败:', error);
            this.showError('搜索出错，请重试');
        }
    }

    displayResults(results) {
        if (results.length === 0) {
            this.showStatus('没有找到相关结果');
            this.clearResults();
            return;
        }

        this.showStatus(`找到 ${results.length} 个相关结果`);

        // 按URL分组结果
        const groupedResults = this.groupResultsByUrl(results);
        
        // 生成HTML
        const html = this.generateResultsHTML(groupedResults);
        
        // 更新DOM
        this.resultList.innerHTML = html;
        
        // 添加点击事件监听器
        this.addResultClickHandlers();
    }

    groupResultsByUrl(results) {
        const grouped = new Map();
        
        results.forEach(result => {
            if (!grouped.has(result.url)) {
                grouped.set(result.url, {
                    url: result.url,
                    name: result.name,
                    matches: []
                });
            }
            
            grouped.get(result.url).matches.push({
                title: result.title,
                link: result.link,
                body: result.body
            });
        });
        
        return Array.from(grouped.values());
    }

    generateResultsHTML(groupedResults) {
        const currentQuery = this.searchInput.value.trim();

        return groupedResults.map(group => `
            <li class="md-search-result__item" style="border: 2px solid #e0e0e0; margin: 10px; border-radius: 8px;">
                <div class="md-search-result__link search-result-main" 
                     style="border-bottom: 1px solid #e0e0e0; display: block; padding: 12px; cursor: pointer; text-decoration: none;" 
                     data-url="${group.url}"
                     data-query="${this.escapeHtml(currentQuery)}">
                    <article class="md-search-result__article md-typeset">
                        <div class="md-search-result__icon md-icon"></div>
                        <h1 style="margin: 0; font-size: 1.1rem; color: #1976d2;">${this.escapeHtml(group.name)}</h1>
                    </article>
                </div>
                ${group.matches.map(match => `
                    <div class="md-search-result__link search-result-item" 
                         style="display: block; padding: 8px 12px; cursor: pointer; text-decoration: none;"
                         data-url="${group.url}${match.link}"
                         data-query="${this.escapeHtml(currentQuery)}">
                        <article class="md-search-result__article md-typeset">
                            <h2 style="margin: 8px 0; font-size: 1rem; color: #333;">${this.escapeHtml(match.title)}</h2>
                            <div style="color: #666; font-size: 0.9rem; line-height: 1.4;">
                                ${this.truncateContent(match.body, 200)}
                            </div>
                        </article>
                    </div>
                `).join('')}
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    truncateContent(content, maxLength) {
        if (!content) return '';
        
        // 移除HTML标签用于显示摘要
        const temp = document.createElement('div');
        temp.innerHTML = content;
        const text = temp.textContent || temp.innerText || '';
        
        if (text.length <= maxLength) {
            return this.escapeHtml(text);
        }
        
        return this.escapeHtml(text.substring(0, maxLength)) + '...';
    }

    showStatus(message) {
        if (this.searchInfo) {
            this.searchInfo.textContent = message;
        }
    }

    showError(message) {
        if (this.searchInfo) {
            this.searchInfo.innerHTML = `<span style="color: #f44336;">${this.escapeHtml(message)}</span>`;
        }
    }

    clearResults() {
        if (this.resultList) {
            this.resultList.innerHTML = '';
        }
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.focus();
        }
        this.clearResults();
        this.showStatus('键入以开始搜索');
    }

    addResultClickHandlers() {
        const resultLinks = this.resultList.querySelectorAll('.search-result-main, .search-result-item');
        
        resultLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetUrl = link.getAttribute('data-url');
                const query = link.getAttribute('data-query');
                
                if (targetUrl && query) {
                    this.navigateToResult(targetUrl, query);
                }
            });
        });
    }

    navigateToResult(targetUrl, query) {
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
            this.highlightInCurrentPage(query);
        } else {
            // 如果是其他页面，跳转并传递高亮参数
            const url = new URL(targetPath, window.location.origin);
            url.searchParams.set('highlight', query);
            window.location.href = url.toString();
        }
    }

    highlightInCurrentPage(query) {
        // 清除之前的高亮
        this.clearHighlights();
        
        // 高亮关键词
        this.highlightContent(query);
        
        // 滚动到第一个高亮位置
        setTimeout(() => {
            const firstHighlight = document.querySelector('.search-highlight');
            if (firstHighlight) {
                firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    clearHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    highlightContent(query) {
        if (!query || query.length < 2) return;
        
        const keywords = query.split(/\s+/).filter(k => k.length >= 2);
        const colors = ['#ffeb3b', '#ff9800', '#4caf50', '#2196f3', '#9c27b0'];
        
        // 获取主要内容区域
        const contentSelectors = [
            '.md-content__inner',
            '.md-typeset',
            'main',
            'article',
            '.content'
        ];
        
        let contentArea = null;
        for (const selector of contentSelectors) {
            contentArea = document.querySelector(selector);
            if (contentArea) break;
        }
        
        if (!contentArea) {
            contentArea = document.body;
        }
        
        keywords.forEach((keyword, index) => {
            const color = colors[index % colors.length];
            this.highlightKeyword(contentArea, keyword, color);
        });
    }

    highlightKeyword(element, keyword, color) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // 跳过脚本、样式和已高亮的元素
                    const parent = node.parentElement;
                    if (parent && (
                        parent.tagName === 'SCRIPT' ||
                        parent.tagName === 'STYLE' ||
                        parent.classList.contains('search-highlight')
                    )) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            if (regex.test(text)) {
                const highlightedHTML = text.replace(regex, 
                    `<span class="search-highlight" style="background-color: ${color}; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>`
                );
                
                const wrapper = document.createElement('div');
                wrapper.innerHTML = highlightedHTML;
                
                const fragment = document.createDocumentFragment();
                while (wrapper.firstChild) {
                    fragment.appendChild(wrapper.firstChild);
                }
                
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }
}

// 初始化搜索功能
document.addEventListener('DOMContentLoaded', async function() {
    const search = new OptimizedSearch();
    await search.init();
    
    // 将搜索实例暴露到全局，便于调试
    window.mkdocsSearch = search;
});
