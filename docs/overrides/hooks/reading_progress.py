"""
阅读进度条 - 显示文章阅读进度
作者: Wcowin
版本: 1.0.0
"""

def on_page_markdown(markdown, **kwargs):
    """在页面内容中添加阅读进度条的JavaScript"""
    # 添加阅读进度条的JavaScript和CSS
    progress_script = """
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);
    
    // 计算阅读进度
    function updateProgress() {
        const docElement = document.documentElement;
        const winScroll = docElement.scrollTop || document.body.scrollTop;
        const height = docElement.scrollHeight - docElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // 显示/隐藏进度条
        if (winScroll > 100) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
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
</style>
"""
    
    # 将脚本直接添加到页面内容的末尾
    return markdown + "\n\n" + progress_script
