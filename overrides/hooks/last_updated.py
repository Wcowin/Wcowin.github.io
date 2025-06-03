import os
import datetime
from textwrap import dedent

def on_page_markdown(markdown, **kwargs):
    page = kwargs['page']
    
    # 获取文件最后修改时间
    file_path = page.file.abs_src_path
    if os.path.exists(file_path):
        mtime = os.path.getmtime(file_path)
        last_updated = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M')
        
        # 在页面底部添加更新时间
        update_info = dedent(f"""
        
        ---
        *最后更新时间: {last_updated}*
        """)
        
        return markdown + update_info
    
    return markdown