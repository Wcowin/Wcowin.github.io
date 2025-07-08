import requests
import tkinter as tk
from tkinter import filedialog, messagebox
import os
import json
import pyperclip  # 用于复制URL到剪贴板

def upload_image():
    # 创建一个临时的根窗口
    root = tk.Tk()
    root.withdraw()  # 隐藏主窗口
    
    # 打开文件选择对话框
    file_path = filedialog.askopenfilename(
        title="选择要上传的图片",
        filetypes=[
            ("图片文件", "*.jpg *.jpeg *.png *.gif *.bmp"),
            ("所有文件", "*.*")
        ]
    )
    
    # 如果用户取消选择，则返回
    if not file_path:
        print("未选择任何文件")
        return
    
    # 显示选择的文件路径
    print(f"已选择文件: {file_path}")
    
    # 使用SM.MS图床API
    api_url = 'https://sm.ms/api/v2/upload'
    api_token = 'l6kPWD1qzIL3cl3vFtxbr5u3NDXtuIIt'  # 替换为您的SM.MS API Token
    
    # 如果没有API Token，可以使用匿名上传
    headers = {}
    if api_token and api_token != 'YOUR_SMMS_API_TOKEN':
        headers = {'Authorization': api_token}
    
    # 准备上传
    try:
        with open(file_path, 'rb') as image_file:
            files = {'smfile': image_file}
            
            # 发送请求
            print("正在上传图片...")
            response = requests.post(api_url, files=files, headers=headers)
            
            # 处理响应
            result = response.json()
            
            if result['success'] or (not result['success'] and 'image already exists' in result.get('message', '')):
                # 成功上传或图片已存在
                print("\n上传成功!")
                
                # 获取URL (如果图片已存在，URL在data字段中)
                if result['success']:
                    image_url = result['data']['url']
                else:
                    image_url = result['images']
                
                print(f"图片URL: {image_url}")
                
                # 复制URL到剪贴板
                try:
                    pyperclip.copy(image_url)
                    print("(URL已复制到剪贴板)")
                except:
                    print("无法复制到剪贴板，请手动复制URL")
                
                # 格式化输出完整响应
                print("\n完整响应:")
                print(json.dumps(result, indent=2, ensure_ascii=False))
                
                # 显示成功消息框
                root.deiconify()  # 显示窗口以便显示消息框
                messagebox.showinfo("上传成功", f"图片已上传成功!\nURL: {image_url}\n\n(URL已复制到剪贴板)")
                root.destroy()
            else:
                print(f"上传失败: {result.get('message', '未知错误')}")
                
                # 显示错误消息框
                root.deiconify()
                messagebox.showerror("上传失败", f"上传失败: {result.get('message', '未知错误')}")
                root.destroy()
    
    except Exception as e:
        print(f"发生错误: {str(e)}")
        
        # 显示错误消息框
        root.deiconify()
        messagebox.showerror("错误", f"发生错误: {str(e)}")
        root.destroy()

if __name__ == "__main__":
    upload_image()