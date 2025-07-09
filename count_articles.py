# 统计网站中的文章数量和总字数
import os
import re
from functools import lru_cache

# 复用你现有的正则表达式模式
YAML_FRONT_PATTERN = re.compile(r'---.*?---', re.DOTALL)
HTML_TAG_PATTERN = re.compile(r'<.*?>', re.DOTALL)
IMAGE_PATTERN = re.compile(r'!\[.*?\]\(.*?\)', re.DOTALL)
LINK_PATTERN = re.compile(r'\[(.*?)\]\(.*?\)', re.DOTALL)
CODE_BLOCK_PATTERN = re.compile(r'```.*?```', re.DOTALL)
INLINE_CODE_PATTERN = re.compile(r'`.*?`', re.DOTALL)
CHINESE_CHARS_PATTERN = re.compile(r'[\u4e00-\u9fff]')

@lru_cache(maxsize=256)
def clean_markdown_content_for_chinese(content_hash, markdown):
    """清理Markdown内容，只保留中文文本用于统计（添加缓存）"""
    content = markdown
    
    # 使用预编译的正则表达式
    content = YAML_FRONT_PATTERN.sub('', content)
    content = HTML_TAG_PATTERN.sub('', content)
    content = IMAGE_PATTERN.sub('', content)
    content = LINK_PATTERN.sub(r'\1', content)
    content = CODE_BLOCK_PATTERN.sub('', content)
    content = INLINE_CODE_PATTERN.sub('', content)
    
    return content

def count_stats_for_file(file_path):
    """统计单个文件的字符数"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 生成内容哈希用于缓存
        content_hash = hash(content)
        
        # 使用缓存的清理函数
        clean_content = clean_markdown_content_for_chinese(content_hash, content)
        chinese_chars = len(CHINESE_CHARS_PATTERN.findall(clean_content))
        
        return chinese_chars
    except Exception as e:
        print(f"处理文件 {file_path} 时出错: {e}")
        return 0

def count_all_articles(docs_dir="docs"):
    """统计所有文章数量和总字数"""
    total_articles = 0
    total_chars = 0
    
    # 遍历docs目录下的所有.md文件
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                chars = count_stats_for_file(file_path)
                
                if chars > 0:  # 只计算有内容的文件
                    total_articles += 1
                    total_chars += chars
                    print(f"文件: {file_path}, 字数: {chars}")
    
    return total_articles, total_chars

if __name__ == "__main__":
    articles, chars = count_all_articles()
    print(f"\n总计: {articles} 篇文章, {chars} 个中文字符")
    print(f"平均每篇文章: {chars // articles if articles > 0 else 0} 个中文字符")