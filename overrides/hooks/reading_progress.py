"""
阅读进度条 - 显示文章阅读进度
作者: Wcowin
版本: 1.1.0
"""

def on_page_markdown(markdown, **kwargs):
    """在页面内容中添加阅读进度条和百分比显示的JavaScript"""
    # 添加阅读进度条的JavaScript和CSS
    progress_script = """
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);
    
    // 创建进度百分比显示元素
    const progressPercentage = document.createElement('div');
    progressPercentage.className = 'reading-progress-percentage';
    progressPercentage.innerHTML = '0%';
    
    // 将百分比显示添加到右侧目录区域
    const tocContainer = document.querySelector('.md-sidebar--secondary');
    if (tocContainer) {
        // 创建一个容器来包裹百分比显示
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.appendChild(progressPercentage);
        
        // 将容器插入到目录的顶部
        const tocNav = tocContainer.querySelector('.md-nav');
        if (tocNav) {
            tocContainer.insertBefore(progressContainer, tocNav);
        } else {
            tocContainer.appendChild(progressContainer);
        }
    }
    
    // 计算阅读进度
    function updateProgress() {
        const docElement = document.documentElement;
        const winScroll = docElement.scrollTop || document.body.scrollTop;
        const height = docElement.scrollHeight - docElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // 更新进度条宽度
        progressBar.style.width = scrolled + '%';
        
        // 更新百分比显示
        progressPercentage.innerHTML = Math.round(scrolled) + '%';
        
        // 显示/隐藏进度条
        if (winScroll > 100) {
            progressBar.classList.add('visible');
            progressContainer.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
            progressContainer.classList.remove('visible');
        }
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', updateProgress);
    
    // 初始更新
    updateProgress();
});
</script>

<style>
.reading-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, width 0.1s;
}

.reading-progress-bar.visible {
    opacity: 1;
}

.progress-container {
    padding: 10px 0;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.progress-container.visible {
    opacity: 1;
}

.reading-progress-percentage {
    font-size: 1rem;
    font-weight: bold;
    color: var(--md-primary-fg-color);
    background: -webkit-linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
}

/* 深色模式适配 */
[data-md-color-scheme="slate"] .reading-progress-percentage {
    background: -webkit-linear-gradient(45deg, #5c9aff, #4eca6a, #ffce38, #ff6c52);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
"""
    
    # 将脚本直接添加到页面内容的末尾
    return markdown + "\n\n" + progress_script
