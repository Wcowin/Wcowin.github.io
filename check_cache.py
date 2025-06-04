#!/usr/bin/env python3
"""
检查 AI 摘要缓存状态的脚本
"""

import json
import os
from pathlib import Path
from datetime import datetime

def check_cache_status():
    """检查缓存状态"""
    cache_dir = Path("site/.ai_cache")
    
    print(f"🔍 检查缓存目录: {cache_dir}")
    print(f"📁 缓存目录存在: {cache_dir.exists()}")
    
    if not cache_dir.exists():
        print("❌ 缓存目录不存在")
        return
    
    # 检查缓存文件
    cache_files = list(cache_dir.glob("*.json"))
    print(f"📄 缓存文件数量: {len(cache_files)}")
    
    if not cache_files:
        print("❌ 没有找到缓存文件")
        return
    
    print("\n📋 缓存文件详情:")
    for cache_file in cache_files:
        print(f"\n  文件: {cache_file.name}")
        print(f"  大小: {cache_file.stat().st_size} 字节")
        
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                cache_data = json.load(f)
            
            timestamp = cache_data.get('timestamp', 'unknown')
            summary = cache_data.get('summary', '')
            service = cache_data.get('service', 'unknown')
            page_title = cache_data.get('page_title', 'unknown')
            
            print(f"  时间戳: {timestamp}")
            print(f"  页面标题: {page_title}")
            print(f"  服务: {service}")
            print(f"  摘要长度: {len(summary)} 字符")
            print(f"  摘要预览: {summary[:50]}...")
            
            # 检查是否过期
            if timestamp != 'unknown':
                try:
                    cache_time = datetime.fromisoformat(timestamp)
                    days_old = (datetime.now() - cache_time).days
                    print(f"  缓存年龄: {days_old} 天")
                    if days_old >= 7:
                        print(f"  ⚠️ 缓存已过期")
                    else:
                        print(f"  ✅ 缓存有效")
                except:
                    print(f"  ❌ 时间戳格式错误")
            
        except Exception as e:
            print(f"  ❌ 读取文件失败: {e}")
    
    # 检查 service_config.json
    service_config_file = cache_dir / "service_config.json"
    print(f"\n🔧 服务配置文件: {service_config_file.exists()}")
    if service_config_file.exists():
        try:
            with open(service_config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            print(f"  默认服务: {config.get('default_service', 'unknown')}")
            print(f"  语言设置: {config.get('summary_language', 'unknown')}")
            print(f"  检查时间: {config.get('check_time', 'unknown')}")
        except Exception as e:
            print(f"  ❌ 读取服务配置失败: {e}")

if __name__ == '__main__':
    check_cache_status()
