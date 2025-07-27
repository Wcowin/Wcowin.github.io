document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时检查URL是否包含高亮参数
    checkForHighlightParams(); 
});

/**
 * 检查 URL 参数中的高亮关键词并执行高亮
 */
function checkForHighlightParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightParam = urlParams.get('highlight');
    
    if (highlightParam) {
        // 关键词可能以空格或逗号分隔
        const keywords = highlightParam.split(/[,\s]+/).map(kw => kw.trim()).filter(kw => kw.length > 0);
        if (keywords.length > 0) {
            setTimeout(() => highlightContent(keywords), 300);
        }
    }
}

/**
 * 高亮页面内容
 * @param {string|string[]} keywords - 单个关键词或关键词数组
 */
function highlightContent(keywords) {
    if (!keywords || (Array.isArray(keywords) && keywords.length === 0)) return;

    // 移除现有的高亮
    clearHighlights();

    const keywordsArray = Array.isArray(keywords) ? keywords : [keywords];
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

    // 对每个关键词进行高亮
    keywordsArray.forEach((keyword, index) => {
        if (!keyword.trim()) return; // 跳过空关键词
        const color = colors[index % colors.length];
        highlightKeyword(contentArea, keyword, color);
    });

    // 滚动到第一个高亮元素
    setTimeout(() => {
        const firstHighlight = document.querySelector('.search-highlight');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

/**
 * 高亮单个关键词
 * @param {Element} element - 要搜索的元素
 * @param {string} keyword - 关键词
 * @param {string} color - 高亮颜色
 */
function highlightKeyword(element, keyword, color) {
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

/**
 * 清除所有高亮
 */
function clearHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        }
    });
}

// 搜索结果点击处理现在由 optimized-search.js 处理

// 搜索输入增强功能现在由 optimized-search.js 处理
// 这里只保留高亮相关的全局函数供外部调用

// 暴露高亮函数到全局，供其他脚本调用
window.highlightContent = highlightContent;
window.clearHighlights = clearHighlights;
window.highlightKeyword = highlightKeyword;
