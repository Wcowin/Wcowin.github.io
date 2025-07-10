import re

def convert_friend_link(text):
    """
    转换友链信息为HTML格式。
    
    支持多种输入格式:
    - 标准格式，带有Name:, Desc:, Link:, Avatar:标签
    - 中文格式，带有名称:, 简介:, 链接:, 头像:标签
    - URL和图片链接自动检测
    - 自由格式文本智能解析
    
    输出: 友链的HTML卡片
    """
    # 初始化变量
    name = ""
    desc = ""
    link = ""
    avatar = ""
    
    # 解析输入文本
    text = text.strip()
    
    # 方法1: 带冒号和换行的常规格式（英文标签）
    if "Name:" in text and "Desc:" in text and "Link:" in text and "Avatar:" in text:
        try:
            name_parts = text.split("Name:")[1].split("Desc:")[0].strip()
            desc_parts = text.split("Desc:")[1].split("Link:")[0].strip()
            link_parts = text.split("Link:")[1].split("Avatar:")[0].strip()
            avatar_parts = text.split("Avatar:")[1].strip()
            
            name = name_parts
            desc = desc_parts
            link = link_parts
            avatar = avatar_parts
        except IndexError:
            pass  # 如果解析失败，继续尝试其他方法
    
    # 方法2: 逐行解析
    if not all([name, desc, link, avatar]):
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            
            # 跳过空行
            if not line:
                continue
                
            # 检查每行中的名称、描述、链接和头像
            if not name and ("Name:" in line or line.startswith("Name") or "名称:" in line or line.startswith("名称")):
                name = line.split(":", 1)[1].strip() if ":" in line else ""
            elif not desc and ("Desc:" in line or line.startswith("Desc") or "Description:" in line or 
                              "简介:" in line or line.startswith("简介") or "描述:" in line):
                desc = line.split(":", 1)[1].strip() if ":" in line else ""
            elif not link and ("Link:" in line or line.startswith("Link") or "URL:" in line or 
                              "链接:" in line or line.startswith("链接") or line.startswith("http")):
                # 从行中提取URL
                if ":" in line and not line.startswith("http"):
                    link = line.split(":", 1)[1].strip()
                else:
                    # 尝试在行中查找URL
                    url_match = re.search(r'https?://\S+', line)
                    if url_match:
                        link = url_match.group(0)
            elif not avatar and ("Avatar:" in line or line.startswith("Avatar") or "Image:" in line or 
                                "头像:" in line or line.startswith("头像") or "图片:" in line or
                                ".png" in line or ".jpg" in line or ".jpeg" in line or ".webp" in line or ".gif" in line):
                # 从行中提取图片URL
                if ":" in line and not line.startswith("http"):
                    avatar = line.split(":", 1)[1].strip()
                else:
                    # 尝试在行中查找图片URL
                    img_match = re.search(r'https?://\S+\.(png|jpg|jpeg|gif|webp)', line, re.IGNORECASE)
                    if img_match:
                        avatar = img_match.group(0)
    
    # 方法3: 从整个文本中智能检测URL
    if not link:
        url_matches = re.findall(r'https?://(?!.*\.(png|jpg|jpeg|gif|webp))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/\S*)?', text, re.IGNORECASE)
        if url_matches:
            link = url_matches[0]
    
    if not avatar:
        img_matches = re.findall(r'https?://\S+\.(png|jpg|jpeg|gif|webp)(?:\?\S*)?', text, re.IGNORECASE)
        if img_matches:
            avatar = img_matches[0]
    
    # 方法4: 如果有链接但没有名称，提取域名作为名称
    if link and not name:
        domain_match = re.search(r'https?://(?:www\.)?([a-zA-Z0-9.-]+)\.', link)
        if domain_match:
            name = domain_match.group(1).capitalize()
    
    # 生成HTML
    html = f'''    <div class="card"> 
     <img class="ava" src="{avatar}" /> 
     <div class="card-header"> 
      <div> 
      <a href="{link}" target="_blank">{name}</a> 
      </div> 
      <div class="info">
      {desc}
      </div> 
     </div> 
    </div>'''
    
    return html

if __name__ == "__main__":
    print("友链转换器 - 输入信息 (Ctrl+D 或 Ctrl+Z 结束):")
    print("示例格式:")
    print("Name: 网站名称")
    print("Desc: 网站描述")
    print("Link: https://example.com")
    print("Avatar: https://example.com/avatar.png")
    print("\n或者中文格式:")
    print("名称: 网站名称")
    print("简介: 网站描述")
    print("链接: https://example.com")
    print("头像: https://example.com/avatar.png")
    print("\n--- 在下方输入您的信息 ---")
    
    # 收集输入直到EOF
    try:
        input_text = ""
        while True:
            line = input()
            input_text += line + "\n"
    except EOFError:
        pass
    
    # 转换并打印结果
    html_output = convert_friend_link(input_text)
    print("\n--- HTML 输出 ---")
    print(html_output)
    
    # 如果pyperclip可用，复制到剪贴板
    try:
        import pyperclip
        pyperclip.copy(html_output)
        print("\nHTML已复制到剪贴板！")
    except ImportError:
        print("\n提示: 安装'pyperclip'包以启用剪贴板功能")
        print("     运行: pip install pyperclip")
