import re
from textwrap import dedent

def on_page_markdown(markdown, **kwargs):
    page = kwargs['page']
    
    # 提取所有标题
    headers = re.findall(r'^(#{1,6})\s+(.+)$', markdown, re.MULTILINE)
    
    if len(headers) > 3:  # 如果标题超过3个，添加快速导航
        toc_links = []
        for level, title in headers:
            if len(level) <= 3:  # 只显示1-3级标题
                anchor = re.sub(r'[^\w\s-]', '', title).strip().lower().replace(' ', '-')
                toc_links.append(f"[{title}](#{anchor})")
        
        if toc_links:
            quick_nav = dedent(f"""
            !!! abstract "🧭 快速导航"
                {' | '.join(toc_links)}
            
            """)
            return quick_nav + markdown
    
    return markdown