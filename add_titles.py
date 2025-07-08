#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为blog和develop文件夹下的所有md文件添加标题
从mkdocs.yml中提取对应的标题信息
"""

import os
import re
import yaml
from pathlib import Path

def load_mkdocs_config():
    """加载mkdocs.yml配置文件"""
    with open('mkdocs.yml', 'r', encoding='utf-8') as f:
        content = f.read()

    # 处理特殊的YAML标签，简单替换为字符串
    content = re.sub(r'!ENV \[.*?\]', '"ENV_PLACEHOLDER"', content)
    content = re.sub(r'!!python/.*', '"PYTHON_PLACEHOLDER"', content)

    return yaml.safe_load(content)

def extract_nav_titles(nav_items, path_to_title=None):
    """递归提取导航中的路径和标题映射"""
    if path_to_title is None:
        path_to_title = {}
    
    for item in nav_items:
        if isinstance(item, dict):
            for title, path_or_subnav in item.items():
                if isinstance(path_or_subnav, str):
                    # 这是一个文件路径
                    if path_or_subnav.endswith('.md'):
                        # 标准化路径
                        normalized_path = path_or_subnav.replace('/', os.sep)
                        path_to_title[normalized_path] = title
                elif isinstance(path_or_subnav, list):
                    # 这是一个子导航
                    extract_nav_titles(path_or_subnav, path_to_title)
        elif isinstance(item, str):
            # 直接的文件路径
            if item.endswith('.md'):
                normalized_path = item.replace('/', os.sep)
                # 从文件名推断标题
                filename = os.path.basename(item)
                title = filename.replace('.md', '').replace('-', ' ').replace('_', ' ')
                path_to_title[normalized_path] = title
    
    return path_to_title

def has_title_in_content(content):
    """检查文件内容是否已经有标题"""
    lines = content.strip().split('\n')
    
    # 跳过前置元数据
    start_idx = 0
    if lines and lines[0].strip() == '---':
        # 寻找结束的 ---
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                start_idx = i + 1
                break
    
    # 检查是否有以 # 开头的标题
    for i in range(start_idx, min(start_idx + 5, len(lines))):
        if i < len(lines) and lines[i].strip().startswith('# '):
            return True
    
    return False

def add_title_to_file(file_path, title):
    """为文件添加标题"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经有标题
        if has_title_in_content(content):
            print(f"跳过 {file_path} - 已有标题")
            return False
        
        lines = content.split('\n')
        
        # 检查是否有前置元数据
        if lines and lines[0].strip() == '---':
            # 寻找结束的 ---
            end_meta_idx = -1
            for i in range(1, len(lines)):
                if lines[i].strip() == '---':
                    end_meta_idx = i
                    break
            
            if end_meta_idx != -1:
                # 在元数据后添加标题
                new_lines = lines[:end_meta_idx + 1] + ['', f'# {title}'] + lines[end_meta_idx + 1:]
            else:
                # 没有找到结束的 ---，在开头添加
                new_lines = [f'# {title}', ''] + lines
        else:
            # 没有前置元数据，直接在开头添加标题
            new_lines = [f'# {title}', ''] + lines
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        
        print(f"已为 {file_path} 添加标题: {title}")
        return True
        
    except Exception as e:
        print(f"处理文件 {file_path} 时出错: {e}")
        return False

def process_md_files():
    """处理所有md文件"""
    # 加载配置
    config = load_mkdocs_config()
    nav = config.get('nav', [])
    
    # 提取路径和标题映射
    path_to_title = extract_nav_titles(nav)
    
    # 处理blog和develop文件夹
    folders_to_process = ['docs/blog', 'docs/develop']
    
    processed_count = 0
    skipped_count = 0
    
    for folder in folders_to_process:
        if not os.path.exists(folder):
            print(f"文件夹 {folder} 不存在")
            continue
            
        # 遍历文件夹中的所有md文件
        for root, dirs, files in os.walk(folder):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    
                    # 计算相对路径
                    rel_path = os.path.relpath(file_path, 'docs')
                    rel_path = rel_path.replace(os.sep, '/')
                    
                    # 查找对应的标题
                    title = None
                    for nav_path, nav_title in path_to_title.items():
                        if nav_path.replace(os.sep, '/') == rel_path:
                            title = nav_title
                            break
                    
                    if title:
                        if add_title_to_file(file_path, title):
                            processed_count += 1
                        else:
                            skipped_count += 1
                    else:
                        # 如果在导航中找不到，使用文件名作为标题
                        filename_title = file.replace('.md', '').replace('-', ' ').replace('_', ' ')
                        print(f"在导航中未找到 {rel_path}，使用文件名作为标题: {filename_title}")
                        if add_title_to_file(file_path, filename_title):
                            processed_count += 1
                        else:
                            skipped_count += 1
    
    print(f"\n处理完成！")
    print(f"已处理文件: {processed_count}")
    print(f"跳过文件: {skipped_count}")

if __name__ == "__main__":
    process_md_files()
