import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox, filedialog
import pyperclip
import re
import os
import json
from datetime import datetime

def convert_friend_link(text):
    """
    转换友链信息为HTML格式。
    
    支持多种输入格式:
    - 标准格式，带有Name:, Desc:, Link:, Avatar:标签
    - 中文格式，带有名称:, 简介:, 链接:, 头像:标签
    - URL和图片链接自动检测
    - 自由格式文本智能解析
    - 支持标签后有空格的情况，如"Name :"
    - 支持Domain替代Link
    - 支持Icon替代Avatar
    
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
    english_pattern = {
        "name": ["Name:", "Name :", "name:", "name :", "NAME:", "NAME :"],
        "desc": ["Desc:", "Desc :", "Description:", "Description :", "desc:", "desc :", "description:", "description :", "DESC:", "DESC :"],
        "link": ["Link:", "Link :", "URL:", "URL :", "Url:", "Url :", "url:", "url :", "link:", "link :", "LINK:", "LINK :", 
                "Domain:", "Domain :", "domain:", "domain :", "DOMAIN:", "DOMAIN :"],
        "avatar": ["Avatar:", "Avatar :", "Image:", "Image :", "avatar:", "avatar :", "image:", "image :", "AVATAR:", "AVATAR :", 
                  "IMG:", "IMG :", "img:", "img :", "Icon:", "Icon :", "icon:", "icon :", "ICON:", "ICON :"]
    }
    
    chinese_pattern = {
        "name": ["名称:", "名称 :", "网站名:", "网站名 :", "站点:", "站点 :", "博客名:", "博客名 :"],
        "desc": ["简介:", "简介 :", "描述:", "描述 :", "说明:", "说明 :", "介绍:", "介绍 :"],
        "link": ["链接:", "链接 :", "网址:", "网址 :", "地址:", "地址 :", "域名:", "域名 :"],
        "avatar": ["头像:", "头像 :", "图片:", "图片 :", "图像:", "图像 :", "照片:", "照片 :", "图标:", "图标 :"]
    }
    
    # 方法1: 尝试使用标准格式解析（英文或中文标签）
    # 检查是否包含标准格式的标签
    has_name_tag = any(tag in text for tag in english_pattern["name"] + chinese_pattern["name"])
    has_desc_tag = any(tag in text for tag in english_pattern["desc"] + chinese_pattern["desc"])
    has_link_tag = any(tag in text for tag in english_pattern["link"] + chinese_pattern["link"])
    has_avatar_tag = any(tag in text for tag in english_pattern["avatar"] + chinese_pattern["avatar"])
    
    # 方法2: 逐行解析
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        
        # 跳过空行
        if not line:
            continue
            
        # 检查每行中的名称
        if not name and any(tag in line for tag in english_pattern["name"] + chinese_pattern["name"]):
            for tag in english_pattern["name"] + chinese_pattern["name"]:
                if tag in line:
                    name = line.split(tag, 1)[1].strip()
                    break
        
        # 检查每行中的描述
        elif not desc and any(tag in line for tag in english_pattern["desc"] + chinese_pattern["desc"]):
            for tag in english_pattern["desc"] + chinese_pattern["desc"]:
                if tag in line:
                    desc = line.split(tag, 1)[1].strip()
                    break
        
        # 检查每行中的链接
        elif not link and any(tag in line for tag in english_pattern["link"] + chinese_pattern["link"]):
            for tag in english_pattern["link"] + chinese_pattern["link"]:
                if tag in line:
                    link = line.split(tag, 1)[1].strip()
                    break
        
        # 检查每行中的头像
        elif not avatar and any(tag in line for tag in english_pattern["avatar"] + chinese_pattern["avatar"]):
            for tag in english_pattern["avatar"] + chinese_pattern["avatar"]:
                if tag in line:
                    avatar = line.split(tag, 1)[1].strip()
                    break
        
        # 如果行以http开头，尝试识别是链接还是图片
        elif line.startswith(("http://", "https://")):
            if not avatar and re.search(r'\.(png|jpg|jpeg|gif|webp|ico|svg)(\?\S*)?$', line, re.IGNORECASE):
                avatar = line
            elif not link:
                link = line
    
    # 方法3: 从整个文本中智能检测URL
    if not link:
        url_matches = re.findall(r'https?://(?!.*\.(png|jpg|jpeg|gif|webp|ico|svg)(\?\S*)?$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/\S*)?', text, re.IGNORECASE)
        if url_matches:
            link = url_matches[0]
    
    if not avatar:
        img_matches = re.findall(r'https?://\S+\.(png|jpg|jpeg|gif|webp|ico|svg)(\?\S*)?', text, re.IGNORECASE)
        if img_matches:
            avatar = img_matches[0]
    
    # 方法4: 如果有链接但没有名称，提取域名作为名称
    if link and not name:
        # 确保link是字符串类型
        if isinstance(link, str):
            domain_match = re.search(r'https?://(?:www\.)?([a-zA-Z0-9.-]+)\.', link)
            if domain_match:
                name = domain_match.group(1).capitalize()
        else:
            # 如果link不是字符串，记录错误并尝试转换
            print(f"错误: link不是字符串类型，而是 {type(link)}")
            try:
                link = str(link)
                domain_match = re.search(r'https?://(?:www\.)?([a-zA-Z0-9.-]+)\.', link)
                if domain_match:
                    name = domain_match.group(1).capitalize()
            except:
                pass
    
    # 如果没有描述，添加一个默认描述
    if not desc and name:
        desc = f"{name}的个人网站"
    
    # 验证必要字段
    if not name or not link:
        return None, "名称和链接是必填项，请检查输入"
    
    if not avatar:
        avatar = "https://api.ixiaowai.cn/api/api.php"  # 默认随机图片API
    
    # 生成HTML，使用更多的缩进
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
    
    return html, "转换成功"

# 历史记录管理
class HistoryManager:
    def __init__(self, filename="friend_link_history.json"):
        self.filename = filename
        self.history = self.load_history()
    
    def load_history(self):
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return []
        return []
    
    def save_history(self):
        with open(self.filename, 'w', encoding='utf-8') as f:
            json.dump(self.history, f, ensure_ascii=False, indent=2)
    
    def add_entry(self, name, link, desc, avatar, html):
        entry = {
            "name": name,
            "link": link,
            "desc": desc,
            "avatar": avatar,
            "html": html,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.history.append(entry)
        # 保留最近50条记录
        if len(self.history) > 50:
            self.history = self.history[-50:]
        self.save_history()
    
    def get_history(self):
        return self.history

# GUI应用
class FriendLinkConverterApp:
    def __init__(self, root):
        self.root = root
        self.root.title("友链转换器")
        self.root.geometry("950x750")
        self.root.minsize(750, 650)
        
        # 设置默认字体大小
        self.default_font = ("微软雅黑", 12)
        self.code_font = ("Consolas", 12)
        self.heading_font = ("微软雅黑", 14, "bold")
        
        # 设置主题颜色
        self.style = ttk.Style()
        self.style.configure("TButton", padding=6, relief="flat", background="#4CAF50", font=self.default_font)
        self.style.configure("TLabel", padding=6, font=self.default_font)
        self.style.configure("TFrame", background="#f5f5f5")
        self.style.configure("TLabelframe", background="#f5f5f5", font=self.default_font)
        self.style.configure("TLabelframe.Label", background="#f5f5f5", font=self.heading_font)
        self.style.configure("TNotebook.Tab", font=self.default_font, padding=[10, 5])
        
        # 初始化历史记录管理器
        self.history_manager = HistoryManager()
        
        # 创建菜单
        self.create_menu()
        
        # 创建界面组件
        self.create_widgets()
        self.setup_layout()
        
        # 绑定快捷键
        self.bind_shortcuts()
        
        # 设置默认选项卡
        self.tab_control.select(0)
        
        # 清除示例文本
        self.free_text.bind("<FocusIn>", self.clear_example_text)
        
    def create_menu(self):
        menubar = tk.Menu(self.root, font=self.default_font)
        self.root.config(menu=menubar)
        
        # 文件菜单
        file_menu = tk.Menu(menubar, tearoff=0, font=self.default_font)
        menubar.add_cascade(label="文件", menu=file_menu)
        file_menu.add_command(label="导出HTML", command=self.export_html)
        file_menu.add_command(label="导入友链", command=self.import_friend_link)
        file_menu.add_separator()
        file_menu.add_command(label="退出", command=self.root.quit)
        
        # 编辑菜单
        edit_menu = tk.Menu(menubar, tearoff=0, font=self.default_font)
        menubar.add_cascade(label="编辑", menu=edit_menu)
        edit_menu.add_command(label="复制HTML", command=self.copy_to_clipboard)
        edit_menu.add_command(label="清空输入", command=self.clear_input)
        
        # 历史记录菜单
        history_menu = tk.Menu(menubar, tearoff=0, font=self.default_font)
        menubar.add_cascade(label="历史记录", menu=history_menu)
        history_menu.add_command(label="查看历史记录", command=self.show_history)
        history_menu.add_command(label="清空历史记录", command=self.clear_history)
        
        # 视图菜单
        view_menu = tk.Menu(menubar, tearoff=0, font=self.default_font)
        menubar.add_cascade(label="视图", menu=view_menu)
        view_menu.add_command(label="增大字体", command=self.increase_font_size)
        view_menu.add_command(label="减小字体", command=self.decrease_font_size)
        view_menu.add_command(label="重置字体", command=self.reset_font_size)
        
        # 帮助菜单
        help_menu = tk.Menu(menubar, tearoff=0, font=self.default_font)
        menubar.add_cascade(label="帮助", menu=help_menu)
        help_menu.add_command(label="使用说明", command=self.show_help)
        help_menu.add_command(label="关于", command=self.show_about)
    
    def create_widgets(self):
        # 创建标签框架
        self.input_frame = ttk.LabelFrame(self.root, text="输入友链信息")
        self.output_frame = ttk.LabelFrame(self.root, text="HTML输出")
        
        # 创建选项卡
        self.tab_control = ttk.Notebook(self.input_frame)
        
        # 自由文本输入选项卡
        self.tab_free = ttk.Frame(self.tab_control)
        self.tab_control.add(self.tab_free, text="自由文本输入")
        
        # 结构化输入选项卡
        self.tab_structured = ttk.Frame(self.tab_control)
        self.tab_control.add(self.tab_structured, text="结构化输入")
        
        # 历史记录选项卡
        self.tab_history = ttk.Frame(self.tab_control)
        self.tab_control.add(self.tab_history, text="历史记录")
        
        # 自由文本输入区域
        self.free_text_label = ttk.Label(self.tab_free, text="输入任意格式的友链信息:")
        self.free_text = scrolledtext.ScrolledText(self.tab_free, height=10, font=self.code_font)
        self.free_text.insert(tk.END, "示例格式:\nName: 网站名称\nDesc: 网站描述\nLink: https://example.com\nAvatar: https://example.com/avatar.png\n\n或者中文格式:\n名称: 网站名称\n简介: 网站描述\n链接: https://example.com\n头像: https://example.com/avatar.png")
        
        # 结构化输入区域
        self.name_label = ttk.Label(self.tab_structured, text="名称:")
        self.name_entry = ttk.Entry(self.tab_structured, width=50, font=self.default_font)
        
        self.desc_label = ttk.Label(self.tab_structured, text="描述:")
        self.desc_entry = ttk.Entry(self.tab_structured, width=50, font=self.default_font)
        
        self.link_label = ttk.Label(self.tab_structured, text="链接:")
        self.link_entry = ttk.Entry(self.tab_structured, width=50, font=self.default_font)
        
        self.avatar_label = ttk.Label(self.tab_structured, text="头像:")
        self.avatar_entry = ttk.Entry(self.tab_structured, width=50, font=self.default_font)
        
        # 历史记录区域
        self.history_list = tk.Listbox(self.tab_history, height=15, width=50, font=self.default_font)
        self.history_scrollbar = ttk.Scrollbar(self.tab_history, orient="vertical", command=self.history_list.yview)
        self.history_list.configure(yscrollcommand=self.history_scrollbar.set)
        self.history_list.bind('<<ListboxSelect>>', self.on_history_select)
        
        # 加载历史记录
        self.load_history_to_listbox()
        
        # 按钮
        self.convert_btn_free = ttk.Button(self.tab_free, text="转换", command=self.convert_free_text)
        self.convert_btn_structured = ttk.Button(self.tab_structured, text="转换", command=self.convert_structured)
        self.use_history_btn = ttk.Button(self.tab_history, text="使用选中项", command=self.use_selected_history)
        
        # 输出区域
        self.result_text = scrolledtext.ScrolledText(self.output_frame, height=10, font=self.code_font)
        self.button_frame = ttk.Frame(self.output_frame)
        self.copy_btn = ttk.Button(self.button_frame, text="复制到剪贴板", command=self.copy_to_clipboard)
        self.export_btn = ttk.Button(self.button_frame, text="导出HTML", command=self.export_html)
        self.clear_btn = ttk.Button(self.button_frame, text="清空", command=lambda: self.result_text.delete("1.0", tk.END))
        
        self.status_label = ttk.Label(self.output_frame, text="")
        
    def setup_layout(self):
        # 主布局
        self.input_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        self.output_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 选项卡布局
        self.tab_control.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 自由文本选项卡布局
        self.free_text_label.pack(anchor=tk.W, padx=5, pady=2)
        self.free_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        self.convert_btn_free.pack(anchor=tk.E, padx=5, pady=5)
        
        # 结构化输入选项卡布局
        padx = 5
        pady = 5
        
        self.name_label.grid(row=0, column=0, sticky=tk.W, padx=padx, pady=pady)
        self.name_entry.grid(row=0, column=1, sticky=tk.W+tk.E, padx=padx, pady=pady)
        
        self.desc_label.grid(row=1, column=0, sticky=tk.W, padx=padx, pady=pady)
        self.desc_entry.grid(row=1, column=1, sticky=tk.W+tk.E, padx=padx, pady=pady)
        
        self.link_label.grid(row=2, column=0, sticky=tk.W, padx=padx, pady=pady)
        self.link_entry.grid(row=2, column=1, sticky=tk.W+tk.E, padx=padx, pady=pady)
        
        self.avatar_label.grid(row=3, column=0, sticky=tk.W, padx=padx, pady=pady)
        self.avatar_entry.grid(row=3, column=1, sticky=tk.W+tk.E, padx=padx, pady=pady)
        
        self.convert_btn_structured.grid(row=4, column=1, sticky=tk.E, padx=padx, pady=pady)
        
        # 配置列权重
        self.tab_structured.columnconfigure(1, weight=1)
        
        # 历史记录选项卡布局
        self.history_list.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        self.history_scrollbar.pack(side=tk.RIGHT, fill=tk.Y, padx=0, pady=5)
        self.use_history_btn.pack(anchor=tk.E, padx=5, pady=5)
        
        # 输出区域布局
        self.result_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.button_frame.pack(fill=tk.X, padx=5, pady=2)
        self.copy_btn.pack(side=tk.LEFT, padx=5, pady=2)
        self.export_btn.pack(side=tk.LEFT, padx=5, pady=2)
        self.clear_btn.pack(side=tk.RIGHT, padx=5, pady=2)
        
        self.status_label.pack(anchor=tk.W, padx=5, pady=2)
    
    def bind_shortcuts(self):
        # 绑定Ctrl+C复制
        self.root.bind("<Control-c>", lambda e: self.copy_to_clipboard())
        # 绑定Ctrl+S保存
        self.root.bind("<Control-s>", lambda e: self.export_html())
        # 绑定F1显示帮助
        self.root.bind("<F1>", lambda e: self.show_help())
        # 绑定Ctrl+加号增大字体
        self.root.bind("<Control-plus>", lambda e: self.increase_font_size())
        self.root.bind("<Control-equal>", lambda e: self.increase_font_size())
        # 绑定Ctrl+减号减小字体
        self.root.bind("<Control-minus>", lambda e: self.decrease_font_size())
        # 绑定Ctrl+0重置字体
        self.root.bind("<Control-0>", lambda e: self.reset_font_size())
    
    def clear_example_text(self, event):
        # 当用户点击文本框时，如果是示例文本则清空
        if "示例格式:" in self.free_text.get("1.0", tk.END):
            self.free_text.delete("1.0", tk.END)
    
    def convert_free_text(self):
        text = self.free_text.get("1.0", tk.END)
        if text.strip() == "" or "示例格式:" in text:
            self.status_label.config(text="请输入友链信息")
            return
            
        html, message = convert_friend_link(text)
        if html:
            self.result_text.delete("1.0", tk.END)
            self.result_text.insert("1.0", html)
            self.status_label.config(text=message)
            
            # 提取信息以保存到历史记录
            name = ""
            desc = ""
            link = ""
            avatar = ""
            
            # 尝试从HTML中提取信息
            name_match = re.search(r'<a href="[^"]*" target="_blank">([^<]+)</a>', html)
            if name_match:
                name = name_match.group(1)
            
            link_match = re.search(r'<a href="([^"]*)"', html)
            if link_match:
                link = link_match.group(1)
            
            desc_match = re.search(r'<div class="info">\s*([^<]*)\s*</div>', html)
            if desc_match:
                desc = desc_match.group(1).strip()
            
            avatar_match = re.search(r'<img class="ava" src="([^"]*)"', html)
            if avatar_match:
                avatar = avatar_match.group(1)
            
            # 添加到历史记录
            self.history_manager.add_entry(name, link, desc, avatar, html)
            self.load_history_to_listbox()
        else:
            self.status_label.config(text=message)
        
    def convert_structured(self):
        name = self.name_entry.get().strip()
        desc = self.desc_entry.get().strip()
        link = self.link_entry.get().strip()
        avatar = self.avatar_entry.get().strip()
        
        if not name or not link:
            self.status_label.config(text="名称和链接是必填项")
            return
            
        text = f"名称: {name}\n简介: {desc}\n链接: {link}\n头像: {avatar}"
        html, message = convert_friend_link(text)
        if html:
            self.result_text.delete("1.0", tk.END)
            self.result_text.insert("1.0", html)
            self.status_label.config(text=message)
            
            # 添加到历史记录
            self.history_manager.add_entry(name, link, desc, avatar, html)
            self.load_history_to_listbox()
        else:
            self.status_label.config(text=message)
    
    def copy_to_clipboard(self):
        html = self.result_text.get("1.0", tk.END)
        if html.strip() == "":
            self.status_label.config(text="没有内容可复制")
            return
            
        pyperclip.copy(html)
        self.status_label.config(text="HTML已复制到剪贴板")
    
    def export_html(self):
        html = self.result_text.get("1.0", tk.END)
        if html.strip() == "":
            self.status_label.config(text="没有内容可导出")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".html",
            filetypes=[("HTML文件", "*.html"), ("文本文件", "*.txt"), ("所有文件", "*.*")],
            title="保存HTML文件"
        )
        
        if file_path:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(html)
                self.status_label.config(text=f"HTML已保存到: {file_path}")
            except Exception as e:
                self.status_label.config(text=f"保存失败: {str(e)}")
    
    def import_friend_link(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("文本文件", "*.txt"), ("所有文件", "*.*")],
            title="导入友链信息"
        )
        
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                self.free_text.delete("1.0", tk.END)
                self.free_text.insert("1.0", content)
                self.tab_control.select(0)  # 切换到自由文本输入选项卡
                self.status_label.config(text=f"已导入: {file_path}")
            except Exception as e:
                self.status_label.config(text=f"导入失败: {str(e)}")
    
    def clear_input(self):
        current_tab = self.tab_control.index(self.tab_control.select())
        if current_tab == 0:  # 自由文本输入
            self.free_text.delete("1.0", tk.END)
        elif current_tab == 1:  # 结构化输入
            self.name_entry.delete(0, tk.END)
            self.desc_entry.delete(0, tk.END)
            self.link_entry.delete(0, tk.END)
            self.avatar_entry.delete(0, tk.END)
    
    def load_history_to_listbox(self):
        self.history_list.delete(0, tk.END)
        history = self.history_manager.get_history()
        for i, entry in enumerate(reversed(history)):  # 最新的在前面
            self.history_list.insert(tk.END, f"{entry['name']} - {entry['timestamp']}")
    
    def on_history_select(self, event):
        if self.history_list.curselection():
            index = self.history_list.curselection()[0]
            history = self.history_manager.get_history()
            # 因为显示是倒序的，所以需要反转索引
            selected_entry = history[len(history) - 1 - index]
            
            # 在结果区域显示HTML
            self.result_text.delete("1.0", tk.END)
            self.result_text.insert("1.0", selected_entry["html"])
            self.status_label.config(text=f"已加载历史记录: {selected_entry['name']}")
    
    def use_selected_history(self):
        if self.history_list.curselection():
            index = self.history_list.curselection()[0]
            history = self.history_manager.get_history()
            # 因为显示是倒序的，所以需要反转索引
            selected_entry = history[len(history) - 1 - index]
            
            # 填充到结构化输入
            self.name_entry.delete(0, tk.END)
            self.name_entry.insert(0, selected_entry["name"])
            
            self.desc_entry.delete(0, tk.END)
            self.desc_entry.insert(0, selected_entry["desc"])
            
            self.link_entry.delete(0, tk.END)
            self.link_entry.insert(0, selected_entry["link"])
            
            self.avatar_entry.delete(0, tk.END)
            self.avatar_entry.insert(0, selected_entry["avatar"])
            
            # 切换到结构化输入选项卡
            self.tab_control.select(1)
    
    def show_history(self):
        self.tab_control.select(2)  # 切换到历史记录选项卡
    
    def clear_history(self):
        if messagebox.askyesno("确认", "确定要清空所有历史记录吗？"):
            self.history_manager.history = []
            self.history_manager.save_history()
            self.load_history_to_listbox()
            self.status_label.config(text="历史记录已清空")
    
    def increase_font_size(self):
        # 增大字体大小
        current_size = self.code_font[1]
        new_size = current_size + 1
        self.update_font_size(new_size)
        self.status_label.config(text=f"字体大小: {new_size}")
    
    def decrease_font_size(self):
        # 减小字体大小，但不小于8
        current_size = self.code_font[1]
        new_size = max(8, current_size - 1)
        self.update_font_size(new_size)
        self.status_label.config(text=f"字体大小: {new_size}")
    
    def reset_font_size(self):
        # 重置字体大小为默认值
        self.update_font_size(12)
        self.status_label.config(text="字体大小已重置为默认值")
    
    def update_font_size(self, new_size):
        # 更新所有文本组件的字体大小
        self.default_font = ("微软雅黑", new_size)
        self.code_font = ("Consolas", new_size)
        self.heading_font = ("微软雅黑", new_size, "bold")
        
        # 更新样式
        self.style.configure("TButton", font=self.default_font)
        self.style.configure("TLabel", font=self.default_font)
        self.style.configure("TLabelframe", font=self.default_font)
        self.style.configure("TLabelframe.Label", font=self.heading_font)
        self.style.configure("TNotebook.Tab", font=self.default_font)
        
        # 更新文本组件
        self.free_text.configure(font=self.code_font)
        self.name_entry.configure(font=self.default_font)
        self.desc_entry.configure(font=self.default_font)
        self.link_entry.configure(font=self.default_font)
        self.avatar_entry.configure(font=self.default_font)
        self.history_list.configure(font=self.default_font)
        self.result_text.configure(font=self.code_font)
        self.status_label.configure(font=self.default_font)
    
    def show_help(self):
        help_text = """友链转换器使用说明:

1. 自由文本输入:
   - 支持多种格式的友链信息
   - 英文标签: Name:, Desc:, Link:, Avatar:
   - 中文标签: 名称:, 简介:, 链接:, 头像:
   - 自动识别URL和图片链接

2. 结构化输入:
   - 分别填写名称、描述、链接和头像
   - 名称和链接为必填项

3. 历史记录:
   - 自动保存转换记录
   - 点击记录可以查看HTML
   - 使用"使用选中项"可以将记录加载到结构化输入

4. 快捷键:
   - Ctrl+C: 复制HTML
   - Ctrl+S: 导出HTML
   - F1: 显示帮助

5. 其他功能:
   - 导入/导出友链信息
   - 复制HTML到剪贴板
   - 清空输入/历史记录
"""
        messagebox.showinfo("使用说明", help_text)
    
    def show_about(self):
        about_text = """友链转换器 v1.0

一个简单易用的友链HTML生成工具，支持多种输入格式，
自动识别URL和图片链接，生成美观的友链HTML代码。

© 2024 All Rights Reserved
"""
        messagebox.showinfo("关于", about_text)

if __name__ == "__main__":
    root = tk.Tk()
    app = FriendLinkConverterApp(root)
    root.mainloop()
