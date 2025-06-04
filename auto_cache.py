#!/usr/bin/env python3
"""
自动化 AI 摘要缓存管理脚本
- 自动检测环境
- 自动迁移缓存
- 自动生成缺失的缓存
- 自动提交到 Git
"""

import os
import subprocess
import json
from pathlib import Path
import shutil

def is_git_repo():
    """检查是否在 Git 仓库中"""
    return Path('.git').exists() or subprocess.run(['git', 'rev-parse', '--git-dir'], 
                                                   capture_output=True).returncode == 0

def auto_migrate_cache():
    """自动迁移缓存"""
    old_cache_dir = Path("site/.ai_cache")
    new_cache_dir = Path(".ai_cache")
    
    if old_cache_dir.exists() and not new_cache_dir.exists():
        print("🔄 检测到旧缓存，开始迁移...")
        new_cache_dir.mkdir(exist_ok=True)
        
        cache_files = list(old_cache_dir.glob("*.json"))
        for cache_file in cache_files:
            shutil.copy2(cache_file, new_cache_dir / cache_file.name)
        
        print(f"✅ 迁移完成，共 {len(cache_files)} 个文件")
        return True
    return False

def generate_missing_cache():
    """生成缺失的缓存"""
    print("🤖 开始生成缺失的 AI 摘要缓存...")
    
    # 设置环境变量
    env = os.environ.copy()
    env['AI_SUMMARY_LOCAL_ENABLED'] = 'true'
    env['AI_SUMMARY_CI_ONLY_CACHE'] = 'false'
    
    try:
        result = subprocess.run(['mkdocs', 'build', '--clean'], 
                              env=env, capture_output=True, text=True, timeout=300)
        
        if result.returncode == 0:
            cache_dir = Path('.ai_cache')
            if cache_dir.exists():
                cache_files = list(cache_dir.glob("*.json"))
                print(f"✅ 缓存生成完成，共 {len(cache_files)} 个文件")
                return True
        else:
            print(f"❌ 构建失败: {result.stderr}")
    except Exception as e:
        print(f"❌ 生成缓存失败: {e}")
    
    return False

def auto_commit_cache():
    """自动提交缓存到 Git"""
    if not is_git_repo():
        print("⚠️ 不是 Git 仓库，跳过提交")
        return False
    
    cache_dir = Path('.ai_cache')
    if not cache_dir.exists():
        print("⚠️ 缓存目录不存在，跳过提交")
        return False
    
    try:
        # 添加缓存文件
        subprocess.run(['git', 'add', '.ai_cache/'], check=True)
        
        # 检查是否有变更
        result = subprocess.run(['git', 'diff', '--cached', '--quiet'], 
                              capture_output=True)
        
        if result.returncode != 0:  # 有变更需要提交
            subprocess.run(['git', 'commit', '-m', 
                          '🤖 Auto-update AI summary cache'], check=True)
            print("✅ 缓存文件已提交到本地仓库")
            
            # 询问是否推送
            response = input("是否推送到远程仓库？(y/N): ")
            if response.lower() == 'y':
                subprocess.run(['git', 'push'], check=True)
                print("🚀 已推送到远程仓库")
            return True
        else:
            print("ℹ️ 没有新的缓存文件需要提交")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Git 操作失败: {e}")
        return False

def main():
    """主函数"""
    print("🚀 开始自动化 AI 缓存管理...")
    
    # 1. 自动迁移
    migrated = auto_migrate_cache()
    
    # 2. 生成缺失的缓存
    if input("是否生成/更新 AI 摘要缓存？(y/N): ").lower() == 'y':
        generated = generate_missing_cache()
        
        # 3. 自动提交
        if generated or migrated:
            if input("是否自动提交缓存文件？(y/N): ").lower() == 'y':
                auto_commit_cache()
    
    print("🎉 自动化处理完成！")

if __name__ == '__main__':
    main()
