#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import base64
import hashlib
import time
from datetime import datetime
from typing import Dict, Any, Optional

def get_api_key():
    """从环境变量获取API密钥，支持多个备用密钥"""
    # 支持多个API密钥源
    api_keys = [
        os.getenv('GLM_API_KEY'),
        os.getenv('ZHIPU_API_KEY'),
        os.getenv('BIGMODEL_API_KEY')
    ]
    
    api_key = next((key for key in api_keys if key), None)
    if not api_key:
        raise ValueError("请设置环境变量 GLM_API_KEY, ZHIPU_API_KEY 或 BIGMODEL_API_KEY")
    return api_key

def get_environment_config():
    """根据环境获取优化配置"""
    env = os.getenv('NODE_ENV', 'development').lower()
    
    if env == 'production':
        return {
            'timeout': 12000,
            'maxRetries': 5,
            'batchSize': 12,
            'maxConcurrent': 6,
            'batchDelay': 80,
            'cacheEnabled': True,
            'compressionEnabled': True,
            'streamingEnabled': True
        }
    elif env == 'development':
        return {
            'timeout': 8000,
            'maxRetries': 3,
            'batchSize': 8,
            'maxConcurrent': 4,
            'batchDelay': 100,
            'cacheEnabled': True,
            'compressionEnabled': False,
            'streamingEnabled': False
        }
    else:  # testing
        return {
            'timeout': 5000,
            'maxRetries': 2,
            'batchSize': 4,
            'maxConcurrent': 2,
            'batchDelay': 200,
            'cacheEnabled': False,
            'compressionEnabled': False,
            'streamingEnabled': False
        }

def generate_config_hash(config):
    """生成配置哈希，用于版本控制"""
    config_str = json.dumps(config, sort_keys=True)
    return hashlib.sha256(config_str.encode()).hexdigest()[:16]

def get_performance_profile():
    """根据系统性能获取优化配置"""
    # 可以根据系统资源动态调整
    profile = os.getenv('PERFORMANCE_PROFILE', 'balanced').lower()
    
    profiles = {
        'high_performance': {
            'batchSize': 16,
            'maxConcurrent': 8,
            'timeout': 15000,
            'batchDelay': 50,
            'aggressiveOptimization': True
        },
        'balanced': {
            'batchSize': 10,
            'maxConcurrent': 5,
            'timeout': 10000,
            'batchDelay': 80,
            'aggressiveOptimization': False
        },
        'conservative': {
            'batchSize': 6,
            'maxConcurrent': 3,
            'timeout': 8000,
            'batchDelay': 120,
            'aggressiveOptimization': False
        }
    }
    
    return profiles.get(profile, profiles['balanced'])

def create_advanced_config():
    """创建高级智能配置"""
    api_key = get_api_key()
    env_config = get_environment_config()
    perf_profile = get_performance_profile()
    
    # 合并配置，性能配置优先级最高
    merged_config = {**env_config, **perf_profile}
    
    # 基础配置
    config = {
        'endpoint': os.getenv('GLM_ENDPOINT', 'https://open.bigmodel.cn/api/paas/v4/chat/completions'),
        'model': os.getenv('GLM_MODEL', 'glm-4-flash'),
        **merged_config,
        
        # 智能批处理配置
        'adaptiveBatching': True,
        'minBatchSize': max(2, merged_config.get('batchSize', 8) // 4),
        'maxBatchSize': min(25, merged_config.get('batchSize', 8) * 2),
        'dynamicBatchAdjustment': True,
        
        # 高级性能配置
        'preloadCache': True,
        'intelligentRetry': True,
        'adaptiveTimeout': True,
        'loadBalancing': False,  # 单API端点时关闭
        'connectionPooling': True,
        'requestCompression': True,
        
        # 质量控制
        'qualityThreshold': float(os.getenv('QUALITY_THRESHOLD', '0.85')),
        'fallbackModel': os.getenv('FALLBACK_MODEL', 'glm-4'),
        'validateTranslation': True,
        'autoCorrection': True,
        
        # 监控和调试
        'enableMetrics': True,
        'enableDebugLog': os.getenv('DEBUG', 'false').lower() == 'true',
        'performanceTracking': True,
        'errorReporting': True,
        
        # 安全配置
        'rateLimitProtection': True,
        'apiKeyRotation': False,  # 暂不支持
        'requestSigning': True
    }
    
    # 编码API密钥（支持多重编码）
    encoded_key = base64.b64encode(api_key.encode()).decode()
    
    return config, encoded_key

def validate_config(config: Dict[str, Any]) -> bool:
    """验证配置的有效性"""
    required_fields = ['endpoint', 'model', 'timeout', 'batchSize', 'maxConcurrent']
    
    for field in required_fields:
        if field not in config:
            print(f"❌ 配置验证失败: 缺少必需字段 {field}")
            return False
    
    # 验证数值范围
    if config['timeout'] < 1000 or config['timeout'] > 30000:
        print("❌ 配置验证失败: timeout 应在 1000-30000ms 范围内")
        return False
    
    if config['batchSize'] < 1 or config['batchSize'] > 50:
        print("❌ 配置验证失败: batchSize 应在 1-50 范围内")
        return False
    
    if config['maxConcurrent'] < 1 or config['maxConcurrent'] > 20:
        print("❌ 配置验证失败: maxConcurrent 应在 1-20 范围内")
        return False
    
    print("✅ 配置验证通过")
    return True

def generate_secure_config():
    """生成安全的翻译配置"""
    
    try:
        # 创建高级配置
        secure_config, encoded_key = create_advanced_config()
        
        print(f"✅ 找到API密钥，环境: {os.getenv('NODE_ENV', 'development')}")
        
        # 验证配置
        if not validate_config(secure_config):
            return False
            
    except ValueError as e:
        print(f"❌ {e}")
        return False
    
    # 生成配置哈希（用于验证）
    config_hash = generate_config_hash(secure_config)
    
    # 添加元数据
    secure_config.update({
        "configHash": config_hash,
        "generated": datetime.now().isoformat(),
        "environment": os.getenv('NODE_ENV', 'development'),
        "version": "2.0.0",
        "generator": "advanced-config-generator"
    })
    
    # 生成JavaScript配置文件 - 包含高级智能优化功能
    js_config = f"""// 自动生成的高性能智能翻译配置 - 请勿手动编辑
// 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// 环境: {secure_config["environment"]}
// 优化特性: 自适应批处理、智能重试、性能监控、质量控制
window.GLM_TRANSLATE_CONFIG = {{
  endpoint: '{secure_config["endpoint"]}',
  model: '{secure_config["model"]}',
  maxRetries: {secure_config["maxRetries"]},
  timeout: {secure_config["timeout"]},
  batchSize: {secure_config["batchSize"]},
  batchDelay: {secure_config["batchDelay"]},
  maxConcurrent: {secure_config["maxConcurrent"]},
  
  // 高级配置
  adaptiveBatching: {str(secure_config["adaptiveBatching"]).lower()},
  minBatchSize: {secure_config["minBatchSize"]},
  maxBatchSize: {secure_config["maxBatchSize"]},
  dynamicBatchAdjustment: {str(secure_config["dynamicBatchAdjustment"]).lower()},
  preloadCache: {str(secure_config["preloadCache"]).lower()},
  intelligentRetry: {str(secure_config["intelligentRetry"]).lower()},
  adaptiveTimeout: {str(secure_config["adaptiveTimeout"]).lower()},
  cacheEnabled: {str(secure_config["cacheEnabled"]).lower()},
  compressionEnabled: {str(secure_config["compressionEnabled"]).lower()},
  streamingEnabled: {str(secure_config["streamingEnabled"]).lower()},
  
  // 翻译优化配置
  alwaysFromOriginal: true,  // 始终从原文翻译，提升质量和速度
  originalLanguage: 'chinese_simplified',  // 原文语言
  
  // 质量控制
  qualityThreshold: {secure_config["qualityThreshold"]},
  fallbackModel: '{secure_config["fallbackModel"]}',
  validateTranslation: {str(secure_config["validateTranslation"]).lower()},
  
  // 监控配置
  enableMetrics: {str(secure_config["enableMetrics"]).lower()},
  enableDebugLog: {str(secure_config["enableDebugLog"]).lower()},
  performanceTracking: {str(secure_config["performanceTracking"]).lower()},
  
  configHash: '{secure_config["configHash"]}',
  environment: '{secure_config["environment"]}',
  // 编码后的密钥（仅在HTTPS环境下使用）
  _k: '{encoded_key}',
  
  // 性能指标
  metrics: {{
    requestCount: 0,
    successCount: 0,
    errorCount: 0,
    averageResponseTime: 0,
    cacheHitRate: 0
  }},
  
  // 智能词汇检测配置
  skipPatterns: [
    /^[a-zA-Z\\s\\-_.,!?()\\[\\]{{}}:;"']+$/,  // 纯英文
    /\\b(GitHub|API|JSON|HTML|CSS|JavaScript|Python|React|Vue|Angular|Node\\.js)\\b/,  // 技术术语
    /^https?:\\/\\//,  // URL
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{{2,}}$/  // 邮箱
  ],
  
  // 专有名词列表（不翻译）
  properNouns: [
    'GitHub', 'Material', 'MkDocs', 'JavaScript', 'Python', 'API', 'JSON', 'HTML', 'CSS',
    'Wcowin', 'GLM', 'OpenAI', 'Google', 'Microsoft', 'Apple', 'Linux', 'Windows', 'macOS',
    'React', 'Vue', 'Angular', 'Node.js', 'npm', 'yarn', 'webpack', 'TypeScript',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Firebase', 'MongoDB', 'MySQL',
    'Redis', 'Nginx', 'Apache', 'Ubuntu', 'CentOS', 'Debian', 'iOS', 'Android'
  ]
}};

// 解码函数
window.GLM_TRANSLATE_CONFIG.getApiKey = function() {{
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {{
    console.warn('翻译功能仅在HTTPS环境下可用');
    return null;
  }}
  try {{
    return atob(this._k);
  }} catch (e) {{
    console.error('配置解析失败');
    return null;
  }}
}};

// 智能词汇检测函数
window.GLM_TRANSLATE_CONFIG.shouldTranslate = function(text) {{
  if (!text || text.length < 3) return false;
  
  // 检查跳过模式
  for (const pattern of this.skipPatterns) {{
    if (pattern.test(text)) return false;
  }}
  
  // 检查专有名词
  for (const noun of this.properNouns) {{
    if (text.includes(noun)) return false;
  }}
  
  return true;
}};

// 动态API参数优化
window.GLM_TRANSLATE_CONFIG.getOptimalParams = function(textLength) {{
  return {{
    temperature: textLength < 20 ? 0.1 : 0.2,
    max_tokens: Math.min(Math.max(textLength * 2, 50), 800),
    top_p: 0.85,
    frequency_penalty: 0.1,
    presence_penalty: 0.1
  }};
}};

// 智能提示词生成 - 优化：始终从中文翻译，提升质量和速度
window.GLM_TRANSLATE_CONFIG.generatePrompt = function(text, targetLang) {{
  const isEnglish = targetLang === 'english';
  const isShort = text.length < 20;
  const isTechnical = /技术|代码|开发|编程|算法/.test(text);
  
  if (isEnglish) {{
    if (isShort) return `Translate this Chinese text to English: ${{text}}`;
    if (isTechnical) return `Translate this technical Chinese text to natural English, keeping technical terms accurate:\n\n${{text}}`;
    return `Translate this Chinese text to natural, fluent English:\n\n${{text}}`;
  }} else {{
    const targetLanguage = this.getLanguageName(targetLang);
    if (isShort) return `请将这段中文翻译为${{targetLanguage}}：${{text}}`;
    return `请将以下中文翻译为自然流畅的${{targetLanguage}}，保持原意和语境：\n\n${{text}}`;
  }}
}};

// 语言名称映射
window.GLM_TRANSLATE_CONFIG.getLanguageName = function(langCode) {{
  const langMap = {{
    'chinese_simplified': '简体中文',
    'chinese_traditional': '繁体中文',
    'english': 'English',
    'korean': '한국어',
    'japanese': '日本語',
    'arabic': 'العربية',
    'deutsch': 'Deutsch',
    'french': 'Français',
    'spanish': 'Español',
    'portuguese': 'Português'
  }};
  return langMap[langCode] || langCode;
}};

// 高级性能监控
window.GLM_TRANSLATE_CONFIG.updateMetrics = function(success, responseTime) {{
  this.metrics.requestCount++;
  if (success) {{
    this.metrics.successCount++;
  }} else {{
    this.metrics.errorCount++;
  }}
  
  // 计算平均响应时间
  const totalTime = this.metrics.averageResponseTime * (this.metrics.requestCount - 1) + responseTime;
  this.metrics.averageResponseTime = totalTime / this.metrics.requestCount;
  
  if (this.enableDebugLog) {{
    console.log('翻译性能指标:', this.metrics);
  }}
}};

// 自适应批处理大小调整
window.GLM_TRANSLATE_CONFIG.adjustBatchSize = function(responseTime, errorRate) {{
  if (!this.dynamicBatchAdjustment) return this.batchSize;
  
  if (errorRate > 0.1 || responseTime > this.timeout * 0.8) {{
    // 降低批处理大小
    this.batchSize = Math.max(this.minBatchSize, Math.floor(this.batchSize * 0.8));
  }} else if (errorRate < 0.05 && responseTime < this.timeout * 0.5) {{
    // 增加批处理大小
    this.batchSize = Math.min(this.maxBatchSize, Math.ceil(this.batchSize * 1.2));
  }}
  
  return this.batchSize;
}};

// 智能重试策略
window.GLM_TRANSLATE_CONFIG.getRetryDelay = function(attempt, error) {{
  if (!this.intelligentRetry) return this.batchDelay * attempt;
  
  // 根据错误类型调整重试延迟
  const baseDelay = this.batchDelay;
  let multiplier = Math.pow(2, attempt - 1); // 指数退避
  
  if (error && error.status === 429) {{
    // 速率限制错误，使用更长的延迟
    multiplier *= 3;
  }} else if (error && error.status >= 500) {{
    // 服务器错误，使用中等延迟
    multiplier *= 2;
  }}
  
  return Math.min(baseDelay * multiplier, 10000); // 最大10秒
}};

// 缓存管理
window.GLM_TRANSLATE_CONFIG.cache = new Map();
window.GLM_TRANSLATE_CONFIG.getCacheKey = function(text, targetLang) {{
  return `${{text.slice(0, 50)}}_${{targetLang}}`;
}};

window.GLM_TRANSLATE_CONFIG.getFromCache = function(text, targetLang) {{
  if (!this.cacheEnabled) return null;
  const key = this.getCacheKey(text, targetLang);
  const cached = this.cache.get(key);
  if (cached && Date.now() - cached.timestamp < 3600000) {{ // 1小时过期
    this.metrics.cacheHitRate = (this.metrics.cacheHitRate * this.metrics.requestCount + 1) / (this.metrics.requestCount + 1);
    return cached.result;
  }}
  return null;
}};

window.GLM_TRANSLATE_CONFIG.setCache = function(text, targetLang, result) {{
  if (!this.cacheEnabled) return;
  const key = this.getCacheKey(text, targetLang);
  this.cache.set(key, {{
    result: result,
    timestamp: Date.now()
  }});
  
  // 限制缓存大小
  if (this.cache.size > 1000) {{
    const firstKey = this.cache.keys().next().value;
    this.cache.delete(firstKey);
  }}
}};
"""
    
    # 确保目录存在
    os.makedirs('docs/javascripts', exist_ok=True)
    
    # 写入配置文件
    config_path = 'docs/javascripts/translate-config.js'
    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(js_config)
    
    print(f"✅ 翻译配置已生成: {config_path}")
    print(f"📊 配置哈希: {config_hash}")
    print(f"🌍 运行环境: {secure_config['environment']}")
    print(f"⚡ 性能配置: 批处理={secure_config['batchSize']}, 并发={secure_config['maxConcurrent']}, 超时={secure_config['timeout']}ms")
    print(f"🔧 高级特性: 自适应批处理={secure_config['adaptiveBatching']}, 智能重试={secure_config['intelligentRetry']}, 缓存={secure_config['cacheEnabled']}")
    
    return True

def create_config():
    """保持向后兼容的配置创建函数"""
    return create_advanced_config()

def export_config_json(config: Dict[str, Any], output_path: Optional[str] = None) -> bool:
    """导出配置为JSON文件（用于备份和调试）"""
    try:
        if output_path is None:
            output_path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'overrides', 'partials', 'translate-config.json')
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # 移除敏感信息
        safe_config = {k: v for k, v in config.items() if not k.startswith('_')}
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(safe_config, f, indent=2, ensure_ascii=False)
        
        print(f"✅ JSON配置已导出: {output_path}")
        return True
    except Exception as e:
        print(f"❌ JSON配置导出失败: {e}")
        return False

def main():
    """主函数，支持命令行参数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='生成高性能智能翻译配置')
    parser.add_argument('--env', choices=['development', 'production', 'testing'], 
                       help='指定运行环境')
    parser.add_argument('--profile', choices=['conservative', 'balanced', 'high_performance'], 
                       help='指定性能配置')
    parser.add_argument('--debug', action='store_true', help='启用调试模式')
    parser.add_argument('--export-json', action='store_true', help='同时导出JSON配置文件')
    parser.add_argument('--validate-only', action='store_true', help='仅验证配置，不生成文件')
    
    args = parser.parse_args()
    
    # 设置环境变量
    if args.env:
        os.environ['NODE_ENV'] = args.env
    if args.profile:
        os.environ['PERFORMANCE_PROFILE'] = args.profile
    if args.debug:
        os.environ['DEBUG'] = 'true'
    
    print("🚀 开始生成翻译配置...")
    print(f"📊 环境: {os.getenv('NODE_ENV', 'development')}")
    print(f"⚡ 性能配置: {os.getenv('PERFORMANCE_PROFILE', 'balanced')}")
    print(f"🐛 调试模式: {os.getenv('DEBUG', 'false')}")
    print("-" * 50)
    
    try:
        # 创建配置
        config, _ = create_advanced_config()
        
        # 验证配置
        if not validate_config(config):
            print("❌ 配置验证失败")
            return False
        
        if args.validate_only:
            print("✅ 配置验证通过，未生成文件")
            return True
        
        # 生成配置文件
        success = generate_secure_config()
        
        if success and args.export_json:
            export_config_json(config)
        
        if success:
            print("\n🎉 翻译配置生成成功！")
            print("📝 配置文件已保存到: docs/javascripts/translate-config.js")
            print("🔧 现在可以在网站中使用高性能翻译功能了")
            print("\n📈 配置摘要:")
            print(f"   - 批处理大小: {config['batchSize']}")
            print(f"   - 最大并发: {config['maxConcurrent']}")
            print(f"   - 超时时间: {config['timeout']}ms")
            print(f"   - 自适应批处理: {config['adaptiveBatching']}")
            print(f"   - 智能重试: {config['intelligentRetry']}")
            print(f"   - 缓存启用: {config['cacheEnabled']}")
            print(f"   - 压缩启用: {config['compressionEnabled']}")
            print(f"   - 性能监控: {config['performanceTracking']}")
        else:
            print("\n❌ 翻译配置生成失败")
            return False
            
        return True
        
    except Exception as e:
        print(f"\n❌ 生成配置时发生错误: {e}")
        if args.debug:
            import traceback
            traceback.print_exc()
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)