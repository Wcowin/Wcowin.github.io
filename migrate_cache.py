#!/usr/bin/env python3
"""
迁移 AI 摘要缓存到项目根目录
避免在 CI 构建过程中被清理
"""

import shutil
import json
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
        return False
    
    # 创建目标目录
    new_cache_dir.mkdir(exist_ok=True)
    
    # 复制所有 JSON 文件
    cache_files = list(old_cache_dir.glob("*.json"))
    copied_count = 0
    
    for cache_file in cache_files:
        target_file = new_cache_dir / cache_file.name
        try:
            shutil.copy2(cache_file, target_file)
            print(f"✅ 复制: {cache_file.name}")
            copied_count += 1
        except Exception as e:
            print(f"❌ 复制失败 {cache_file.name}: {e}")
    
    print(f"🎉 迁移完成！共复制 {copied_count} 个缓存文件")
    
    if copied_count > 0:
        print("\n📋 迁移的缓存文件详情:")
        for cache_file in new_cache_dir.glob("*.json"):
            if cache_file.name != "service_config.json":
                try:
                    with open(cache_file, 'r', encoding='utf-8') as f:
                        cache_data = json.load(f)
                    page_title = cache_data.get('page_title', 'unknown')
                    service = cache_data.get('service', 'unknown')
                    print(f"  - {cache_file.name}: {page_title} ({service})")
                except:
                    print(f"  - {cache_file.name}: (读取失败)")
    
    return copied_count > 0

def update_gitignore():
    """更新 .gitignore 文件"""
    gitignore_path = Path(".gitignore")
    
    if not gitignore_path.exists():
        print("⚠️ .gitignore 文件不存在")
        return
    
    with open(gitignore_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已经包含根目录缓存配置
    if "!.ai_cache/" not in content:
        # 添加配置
        new_content = content.rstrip() + "\n\n# AI 摘要缓存目录（项目根目录）\n!.ai_cache/\n"
        
        with open(gitignore_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✅ 已更新 .gitignore 文件")
    else:
        print("ℹ️ .gitignore 已包含缓存配置")

if __name__ == '__main__':
    success = migrate_cache()
    
    if success:
        update_gitignore()
        
        print("\n🎯 下一步操作：")
        print("1. 提交新的缓存目录：")
        print("   git add .ai_cache/")
        print("   git add .gitignore")
        print("   git commit -m 'Migrate AI cache to root directory to avoid CI cleanup'")
        print("   git push")
        print("\n2. 下次部署时将使用根目录的缓存文件")
        print("3. CI 构建不会再清理这些缓存文件")
    else:
        print("\n❌ 迁移失败，请检查源缓存目录是否存在")
        print("您可能需要先在本地生成缓存文件：")
        print("1. 设置环境变量：export AI_SUMMARY_LOCAL_ENABLED=true")
        print("2. 运行构建：mkdocs build --clean")
        print("3. 再次运行此迁移脚本")
