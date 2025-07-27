// 文档加载完毕后执行
document.addEventListener('DOMContentLoaded', function () {
    //======================================== 插入 搜索框html代码 =============================================================
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
            /* TODO: 失败的 */
            /* 搜索功能 > 显示的内容 > 页面x 的内容部分 > 修复大屏时左边距过大, 影响视觉 */
            @media screen and (min-width: 60em) {
                /* 针对后续的 article（搜索结果）, 使用css选择器, 从 */
                ol.md-search-result__list li.md-search-result__item a article:nth-child(n+2)  {
                    padding-left: 0.8rem;
                }
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
    //======================================== end 插入 搜索框html代码 =============================================================

    //======================================== 搜索框点击触发 =============================================================
    // 得到输入框对象, 从 nav 中查找
    var search_input = nav.querySelector('.md-search .md-search__inner .md-search__form .md-search__input')

    // 针对勾选框: "<input class="md-toggle" data-md-toggle="search" type="checkbox" id="__search" autocomplete="off">"
    var toggle = document.querySelector(
        'input.md-toggle[data-md-toggle="search"]'
    ) // 精确选择特定的复选框

    // 插入 搜索框 获得焦点事件
    // 不需要失去焦点事件，即使关闭 Material 主题的搜索功能，新插入的搜索框仍会受其控制，启用后搜索结果的链接无法点击，且生成的搜索结果会异常。
    search_input.addEventListener('focus', function () {
        this.classList.add('focus-visible') // 添加 "focus-visible" 类
        this.setAttribute('data-focus-visible-added', '') // 标记 "data-focus-visible-added" 属性
        toggle.checked = true // 焦点时切换复选框为开
    })

    //======================================== end 搜索框点击触发 =============================================================
});


//======================================== 搜索框输入查询 sqlite =============================================================
// document.addEventListener('DOMContentLoaded', function () {
document.addEventListener('DOMContentLoaded', async function () {
    let currentSearchQuery = ''; // Declare currentSearchQuery here
    
    // 得到输入框 "文本输入框" 对象
    var search_input = document.querySelector('.md-search .md-search__inner .md-search__form .md-search__input')
    
    // 得到输入框 "显示结果信息" 对象
    var search_info = document.querySelector('.md-search-result__meta')
    
    // 获取结果列表的容器
    var resultList = document.querySelector('.md-search-result__list') 

    // 定义一个变量来存储延迟执行查询的 ID
    let debounceTimeout;

    // ----------- 初始化 Web Worker 并加载数据库 ----------------------------------
    search_info.textContent = '数据库加载中...'; // 显示加载提示
    let dbReady = false;
    const searchWorker = new Worker('/hook-sqlite-js/search-worker.js'); // 确保路径正确

    searchWorker.postMessage({ type: 'load_db' });

    searchWorker.onmessage = function(e) {
        const { type, results, error } = e.data;
        if (type === 'db_loaded') {
            dbReady = true;
            search_info.textContent = '键入以开始搜索'; // 数据库加载成功
        } else if (type === 'db_error') {
            dbReady = false;
            search_info.textContent = '数据库加载失败: ' + error;
            console.error("Main: Failed to load database via worker:", error);
        } else if (type === 'search_results') {
            handleQueryResults(results);
        } else if (type === 'search_error') {
            search_info.textContent = '搜索出错: ' + error;
            console.error("Main: Search error from worker:", error);
        }
    };

    // 清空按钮的 点击事件
    const clearButton = document.querySelector('.md-search .md-search__inner .md-search__form .md-search__icon.md-icon');
    clearButton.addEventListener('click', function(e) {
        // 阻止表单默认重置行为，避免页面刷新
        if (e) e.preventDefault();
        resultList.innerHTML = ''; // 清空结果列表
        search_input.value = ''; // 清空输入框内容
        search_info.textContent = '键入以开始搜索'; // 恢复默认提示
        search_input.blur(); // 先失焦再聚焦，确保光标重置
        setTimeout(() => search_input.focus(), 10);
        // 关闭高亮导航面板（如有）
        const navPanel = document.querySelector('.highlight-nav-container');
        if (navPanel) navPanel.remove();
    });
    // 这一段代码看起来是数据库加载失败的错误处理，但它位于 clearButton 事件监听器之外，
    // 并且没有被任何条件包围，这可能会导致它在不应该执行的时候执行。
    // 同时，变量 err 在这里未定义。我将注释掉这段代码，因为它看起来是错误的或者未完成的。
    /*
    search_info.textContent = '数据库加载失败: ' + err; // 如果加载失败
    console.error("Failed to load database:", err);
    return; // 数据库加载失败，则不继续执行
    */

    // -------------- 监听 输入事件 -------------------------------------------------
    search_input.addEventListener('input', function () {
        if(!dbReady){
            search_info.textContent = '数据库尚未准备好...'; // 如果数据库未通过 worker 加载
            return;
        }
        
        var search_query = this.value // 获取输入框的当前值
        currentSearchQuery = search_query; // 更新全局变量，以便高亮函数使用
        // console.log('当前输入:', search_query); // 你可以根据需要处理这个值

        // 如果未输入任何内容
        if (!search_query) {
            search_info.textContent = '键入以开始搜索' // 如果未输入文本
            return
        }

        // 如果输入的内容低于2个字符
        if (search_query.length < 2) {
            search_info.textContent = '请输入2个以上的字符' // 如果未输入文本
            return
        }

        
        // -------------------------- 使用已加载的数据库查询数据 -------------------------------
        
        // 使用 setTimeout 实现延迟执行查询
        debounceTimeout = setTimeout(function () {
            // 如果未输入任何内容
            if (!search_query) {
                search_info.textContent = '键入以开始搜索'; // 如果未输入文本
                return;
            }

            // 如果输入的内容低于2个字符
            if (search_query.length < 2) {
                search_info.textContent = '请输入2个以上的字符'; // 如果未输入文本
                return;
            }

            // 通过 Web Worker 执行查询
            searchWorker.postMessage({ type: 'search', query: search_query });

        }, 300); // 300ms 后执行查询
        
        // -------------------------- 结束 sql.js 查询 --------------------------------

        
        // 处理查询结果的函数
        function handleQueryResults(datas) {
            // 判断得到的搜索结果
            if (datas.length === 0) {
                search_info.textContent = '没有符合条件的结果'; // 如果没有结果
                return;
            } else {
                search_info.textContent = `${datas.length} 个符合条件的结果`; // 显示结果数量
            }

            // 初始化一个对象来存储每个 URL 的结果
            var new_datas = {};
            var new_datas_ids = new Set(); // 用于跟踪已添加的 id
            // 遍历 datas 数组
            datas.forEach(value => {
                const [id, url, name, title, link, body] = value; // 解构赋值

                // 如果该 URL 尚未在 new_datas 中，初始化一个数组
                if (!new_datas[url]) {
                    new_datas[url] = { url, name, matches: [] }; // 使用简洁的对象字面量
                }

                // 检查 id 是否已存在
                if (!new_datas_ids.has(id)) {
                    new_datas_ids.add(id); // 添加到已见集合中
                    // 将匹配项的文本和链接添加到对应 URL 的数组中
                    new_datas[url].matches.push({ title, link, body });
                }
            });

            // console.log('整理结果:', new_datas); // 输出整理后的结果

            // 清空之前的结果
            resultList.innerHTML = '';

            // 获取当前页面的基本 URL
            const baseUrl = window.location.origin;
            const keywordsForUrlHighlight = currentSearchQuery.trim().split(/\s+/).filter(kw => kw.length > 0).join(',');
            const resultItems = Object.values(new_datas).map(data => `
                <li class="md-search-result__item search-result-item" style="border: 2px solid #bababa; margin: 10px; border-radius: 8px;">
                    <a href="${baseUrl}/${encodeURI(data.url)}?highlight=${encodeURIComponent(keywordsForUrlHighlight)}" class="md-search-result__link" style="border-bottom:1px solid #bababa;" tabindex="-1">
                        <article class="md-search-result__article md-typeset">
                            <div class="md-search-result__icon md-icon"></div>
                            <h1>${highlightKeywords(data.name, currentSearchQuery)}</h1>
                        </article>
                    </a>
                    ${data.matches.map(match => `
                        <a href="${baseUrl}/${encodeURI(data.url)}${match.link}?highlight=${encodeURIComponent(keywordsForUrlHighlight)}" class="md-search-result__link" tabindex="-1">
                            <article class="md-search-result__article md-typeset">
                                <h2>${highlightKeywords(match.title, currentSearchQuery)}</h2>
                                <div class="search-content-preview">
                                    ${truncateAndHighlight(match.body, 200, currentSearchQuery)}
                                </div>
                            </article>
                        </a>
                    `).join('')}
                </li>
            `).join('');
            resultList.innerHTML = resultItems; // 一次性插入所有结果
        }

    });
});