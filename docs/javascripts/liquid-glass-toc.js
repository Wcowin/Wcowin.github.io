/**
 * Liquid Glass TOC 增强脚本
 * 为右侧目录添加动态交互效果
 */

(function() {
    'use strict';

    // @ts-ignore - MkDocs Material 特有的属性
    
    // 等待 DOM 加载完成
    function initLiquidGlassTOC() {
        const tocContainer = document.querySelector('.md-nav--secondary');
        if (!tocContainer) return;
        
        // 检测是否有目录内容
        const tocItems = tocContainer.querySelectorAll('.md-nav__item');
        if (tocItems.length === 0) {
            // 如果没有目录项，隐藏整个容器
            const sidebar = document.querySelector('.md-sidebar--secondary');
            if (sidebar) {
                sidebar.style.display = 'none';
            }
            return;
        }
        
        // 添加滚动检测
        let scrollTimeout;
        function handleScroll() {
            tocContainer.setAttribute('data-scrollable', 'true');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                tocContainer.removeAttribute('data-scrollable');
            }, 1000);
        }
        
        // 监听目录容器滚动
        tocContainer.addEventListener('scroll', handleScroll, { passive: true });
        
        // 增强磁吸效果
        tocItems.forEach(item => {
            const link = item.querySelector('.md-nav__link');
            if (!link) return;
            
            // 鼠标进入时的磁吸效果
            link.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
                this.style.transform = 'translateX(6px) scale(1.008) translateZ(0)';
            });
            
            // 鼠标离开时恢复
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('md-nav__link--active')) {
                    this.style.transform = 'translateX(0) scale(1) translateZ(0)';
                }
                // 延迟移除 will-change 以优化性能
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 300);
            });
            
            // 点击时的反馈效果
            link.addEventListener('mousedown', function() {
                this.style.transform = 'translateX(4px) scale(0.998) translateZ(0)';
            });
            
            link.addEventListener('mouseup', function() {
                if (this.classList.contains('md-nav__link--active')) {
                    this.style.transform = 'translateX(6px) scale(1.008) translateZ(0)';
                }
            });
        });
        
        // 优化活跃状态的视觉反馈
        function updateActiveStates() {
            const activeLink = tocContainer.querySelector('.md-nav__link--active');
            if (activeLink) {
                activeLink.style.transform = 'translateX(6px) scale(1.008) translateZ(0)';
            }
        }
        
        // 监听活跃状态变化
        const observer = new MutationObserver(updateActiveStates);
        observer.observe(tocContainer, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
        
        // 初始化活跃状态
        updateActiveStates();
        
        // 添加键盘导航支持
        tocContainer.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const links = Array.from(this.querySelectorAll('.md-nav__link'));
                const currentIndex = links.findIndex(link => link === document.activeElement);
                
                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
                } else {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
                }
                
                if (links[nextIndex]) {
                    links[nextIndex].focus();
                }
            }
        });
        
        // 性能优化：使用 Intersection Observer 优化滚动性能
        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '20px'
            });
            
            tocItems.forEach(item => {
                scrollObserver.observe(item);
            });
        }
    }
    
    // 在 DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLiquidGlassTOC);
    } else {
        initLiquidGlassTOC();
    }
    
    // 支持 MkDocs Material 的即时加载
    if (typeof window['location$'] !== 'undefined') {
        window['location$'].subscribe(initLiquidGlassTOC);
    }
})();
