"""Zensical with extra hooks

Run with `python script.py [Zensical-OPTIONS]`
For the initial run, and after any script changes run with `build --clean` first.

Added wrappers for functions that are called back from Rust runtime.
This allows to partially mimic the following events from MkDocs:
- on_config
- on_page_markdown
- on_page_content

If a hook or plugin had its core logic in any of these events, it could be possible
to port it over here before the module system arrives. Most frequent use cases are probably meta
manipulation, update of config.extra, markdown placeholder replacement etc. all this is possible now.

File management is done purely in Rust, and no signal/status about it is sent to Python.

Tested with v0.0.7, the Python API should be stable, I don't expect major changes in the future outside of Rust.

This modification is not endorsed by Zensical Team, so don't report any bugs while using it.
I ask kindly... :)

MIT License 2025 Kamil Krzyśków (HRY)
"""

import re
from textwrap import dedent

import zensical.config as config_module
import zensical.main as main_module
import zensical.markdown as markdown_module
from zensical.config import parse_config
from zensical.markdown import render as markdown_render


# ============ 评论系统配置 ============
# 需要添加评论的目录
COMMENT_DIRECTORIES = ['blog/', 'develop/', 'trip/', 'relax/']

# 排除评论的页面列表
EXCLUDED_PAGES = {
    'blog/index.md',
    'blog/indexblog.md',
    'develop/index.md',
}

# 排除评论的页面模式
EXCLUDED_PATTERNS = [
    r'.*\/index\.md$',
    r'.*\/archive\.md$',
    r'^blog/posts/.*',
    r'^blog/archive/.*',
    r'^blog/category/.*',
]


def is_page_excluded(file_path):
    """检查页面是否应该排除评论"""
    if file_path in EXCLUDED_PAGES:
        return True
    for pattern in EXCLUDED_PATTERNS:
        if re.match(pattern, file_path):
            return True
    return False


def should_add_comments(file_path):
    """检查文件是否应该添加评论"""
    if not file_path.endswith('.md'):
        return False
    if is_page_excluded(file_path):
        return False
    for directory in COMMENT_DIRECTORIES:
        if file_path.startswith(directory):
            return True
    return False


def get_twikoo_html():
    """返回 Twikoo 评论系统的 HTML"""
    return dedent("""
    
    <!-- Twikoo 评论系统 -->
    <div class="twikoo-container" style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.1);">
        <h3 style="margin-bottom: 1rem; font-size: 1.2rem; font-weight: 500;">💬 评论</h3>
        <div id="tcomment" class="loading" style="min-height: 200px;">
            <p style="text-align: center; color: #666; padding: 2rem;">评论系统加载中...</p>
        </div>
    </div>
    
    <style>
    .twikoo-container {
        max-width: 100%;
    }
    
    /* 暗色模式适配 */
    [data-md-color-scheme="slate"] .twikoo-container {
        border-top-color: rgba(255,255,255,0.1);
    }
    
    /* 加载状态样式 */
    #tcomment.loading {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.02);
        border-radius: 8px;
    }
    
    [data-md-color-scheme="slate"] #tcomment.loading {
        background: rgba(255,255,255,0.05);
    }
    </style>
    
    <script>
    (function() {
        if (window.twikooLoaded) {
            return;
        }
        
        function loadTwikoo() {
            if (window.twikoo) {
                initTwikoo();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://registry.npmmirror.com/twikoo/1.6.44/files/dist/twikoo.min.js';
            script.onload = function() {
                console.log('Twikoo 脚本加载成功');
                initTwikoo();
            };
            script.onerror = function() {
                console.error('Twikoo 脚本加载失败');
                const commentEl = document.getElementById('tcomment');
                if (commentEl) {
                    commentEl.classList.remove('loading');
                    commentEl.innerHTML = '<p style="text-align: center; color: #f56565; padding: 2rem;">评论系统加载失败，请刷新页面重试</p>';
                }
            };
            document.head.appendChild(script);
        }
        
        function initTwikoo() {
            const commentEl = document.getElementById('tcomment');
            if (!commentEl) {
                console.warn('评论容器未找到');
                return;
            }
            
            commentEl.classList.remove('loading');
            
            try {
                twikoo.init({
                    envId: 'https://superb-salamander-e730b6.netlify.app/.netlify/functions/twikoo',
                    el: '#tcomment',
                    lang: 'zh-CN',
                    path: location.pathname,
                    onCommentLoaded: function () {
                        console.log('评论加载完成');
                    },
                    onError: function(err) {
                        console.error('Twikoo 初始化失败:', err);
                        commentEl.innerHTML = '<p style="text-align: center; color: #f56565; padding: 2rem;">评论系统初始化失败，请检查网络连接</p>';
                    }
                });
                window.twikooLoaded = true;
            } catch (error) {
                console.error('Twikoo 初始化异常:', error);
                commentEl.innerHTML = '<p style="text-align: center; color: #f56565; padding: 2rem;">评论系统初始化异常</p>';
            }
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadTwikoo);
        } else {
            loadTwikoo();
        }
    })();
    </script>
    """)


def main():
    print("Time to hack")
    markdown_module.render = wrap_markdown(markdown_render)
    config_module.parse_config = wrap_config(parse_config)
    main_module.cli()


def wrap_config(func):
    def wrapper(path: str) -> dict:
        # Load "Config" struct
        config = func(path)
        print("Config was loaded")

        # on_config event
        # replace values in config dict

        # code ...
        # extra = config["extra"]
        # extra["custom_key"] = "Custom Key"

        # sync global _CONFIG between modules
        config_module._CONFIG = config
        markdown_module._CONFIG = config

        return config

    return wrapper


def wrap_markdown(func):
    def wrapper(content: str, path: str) -> dict:
        # on_page_markdown event
        # path 是相对于 docs/ 的路径，如 "blog/post1.md"
        
        # 检查是否需要添加评论
        if should_add_comments(path):
            # 检查 front matter 中是否禁用评论
            disable_comments = False
            if content.startswith('---'):
                # 解析 front matter
                end_idx = content.find('---', 3)
                if end_idx != -1:
                    front_matter = content[3:end_idx]
                    if 'disable_comments: true' in front_matter or 'disable_comments:true' in front_matter:
                        disable_comments = True
            
            if not disable_comments:
                # 在 markdown 末尾添加评论 HTML
                content = content.rstrip() + get_twikoo_html()
                print(f"✓ 已添加评论: {path}")

        # process markdown file and prepare "Page" struct
        result = func(content, path)
        print("Markdown processed", path)

        return result

    return wrapper


if __name__ == "__main__":
    main()

