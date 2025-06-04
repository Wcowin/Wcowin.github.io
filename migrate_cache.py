#!/usr/bin/env python3
"""
迁移 AI 摘要缓存到项目根目录
避免在 CI 构建过程中被清理
"""

import shutil
from pathlib import Path

def migrate_cache():
    """迁移缓存文件"""
    old_cache_dir = Path("site/.ai_cache")
    new_cache_dir = Path(".ai_cache")
    
    print(f"🔄 开始迁移缓存文件...")
    print(f"源目录: {old_cache_dir}")
    print(f"目标目录: {new_cache_dir}")
    
    if not old_cache_dir.exists():
        print("❌ 源缓存目录不存在")
        return
    
    # 创建目标目录
    new_cache_dir.mkdir(exist_ok=True)
    
    # 复制所有 JSON 文件
    cache_files = list(old_cache_dir.glob("*.json"))
    copied_count = 0
    
    for cache_file in cache_files:
        target_file = new_cache_dir / cache_file.name
        shutil.copy2(cache_file, target_file)
        print(f"✅ 复制: {cache_file.name}")
        copied_count += 1
    
    print(f"🎉 迁移完成！共复制 {copied_count} 个缓存文件")
    
    # 更新 .gitignore
    gitignore_path = Path(".gitignore")
    if gitignore_path.exists():
        with open(gitignore_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if "!.ai_cache/" not in content:
            with open(gitignore_path, 'a', encoding='utf-8') as f:
                f.write("\n# AI 摘要缓存目录\n!.ai_cache/\n")
            print("✅ 已更新 .gitignore 文件")
    
    print("\n🎯 下一步操作：")
    print("1. 提交新的缓存目录：")
    print("   git add .ai_cache/")
    print("   git add .gitignore")
    print("   git commit -m 'Migrate AI cache to root directory'")
    print("   git push")
    print("2. 部署时将使用根目录的缓存文件")

if __name__ == '__main__':
    migrate_cache()
