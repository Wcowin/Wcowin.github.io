#!/bin/bash

echo "🚀 开始生成 AI 摘要缓存..."

# 设置环境变量启用本地 AI 摘要生成
export AI_SUMMARY_LOCAL_ENABLED=true
export AI_SUMMARY_CI_ONLY_CACHE=false

# 检查是否存在 .env 文件
if [ ! -f .env ]; then
    echo "⚠️ 未发现 .env 文件"
    echo "请创建 .env 文件并添加 AI API 密钥："
    echo "DEEPSEEK_API_KEY=your_deepseek_api_key"
    echo "或者"
    echo "OPENAI_API_KEY=your_openai_api_key"
    read -p "是否继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 用户取消操作"
        exit 1
    fi
fi

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf site/

# 构建文档并生成 AI 摘要
echo "🔨 开始构建文档并生成 AI 摘要..."
mkdocs build --clean

# 检查是否成功生成缓存
if [ -d "site/.ai_cache" ] && [ "$(ls -A site/.ai_cache 2>/dev/null)" ]; then
    echo "✅ AI 摘要缓存生成成功！"
    echo "📁 缓存目录: site/.ai_cache"
    echo "📄 生成的缓存文件："
    ls -la site/.ai_cache/
    
    echo ""
    echo "🎯 提交缓存文件到 Git 仓库..."
    
    # 添加缓存文件到 Git
    git add site/.ai_cache/
    
    # 检查是否有变更需要提交
    if git diff --cached --quiet; then
        echo "ℹ️ 没有新的缓存文件需要提交"
    else
        # 提交缓存文件
        git commit -m "feat: 添加 AI 摘要缓存文件

- 为 blog 文件夹下的文章生成 AI 摘要缓存
- 部署时将使用这些缓存避免重复调用 AI API
- 提高构建速度并节省 API 费用"
        
        echo "✅ 缓存文件已提交到本地仓库"
        echo ""
        echo "🚀 下一步：推送到远程仓库"
        echo "运行：git push"
        echo ""
        echo "部署后将自动使用这些缓存的 AI 摘要"
    fi
else
    echo "❌ 未生成缓存文件，可能的原因："
    echo "1. 没有配置 AI API 密钥"
    echo "2. API 密钥无效或网络连接问题"
    echo "3. 没有符合条件的文章内容"
    echo ""
    echo "请检查 .env 文件中的 API 密钥配置"
fi
