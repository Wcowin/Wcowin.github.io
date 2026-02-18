(function () {
  const CELL = 11;
  const GAP = 2;
  const ROWS = 7;
  const LEVEL_OPACITY = [0.05, 0.25, 0.5, 0.75, 1.0];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function buildHeatmapInnerHTML(username) {
    return `
      <div class="github-heatmap-glass-container">
        <div class="github-heatmap-glass-card">
          <div class="github-heatmap-header">
            <span class="github-heatmap-title">GitHub</span>
            <span class="github-heatmap-stats">
              ${username}过去一年 <strong class="github-heatmap-count">--</strong> 次贡献
            </span>
            <div class="github-heatmap-legend">
              <span class="legend-label">少</span>
              <div class="legend-cell" style="--opacity: 0.05;"></div>
              <div class="legend-cell" style="--opacity: 0.25;"></div>
              <div class="legend-cell" style="--opacity: 0.5;"></div>
              <div class="legend-cell" style="--opacity: 0.75;"></div>
              <div class="legend-cell" style="--opacity: 1;"></div>
              <span class="legend-label">多</span>
            </div>
          </div>
          <div class="github-heatmap-content">
            <svg class="github-heatmap-svg" preserveAspectRatio="xMidYMid meet"></svg>
          </div>
        </div>
        <div class="github-heatmap-tooltip">
          <div class="github-heatmap-tooltip__arrow"></div>
          <div class="github-heatmap-tooltip__content"></div>
        </div>
      </div>
    `;
  }

  async function loadHeatmap(container) {
    const username = container.getAttribute('data-username') || 'Wcowin';
    container.innerHTML = buildHeatmapInnerHTML(username);

    const svg = container.querySelector('.github-heatmap-svg');
    const statsEl = container.querySelector('.github-heatmap-count');
    const tooltipEl = container.querySelector('.github-heatmap-tooltip');

    if (!svg || !statsEl || !tooltipEl) return;

    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      const data = await response.json();
      renderHeatmap(container, data, username);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      statsEl.textContent = '--';
    }
  }

  function renderHeatmap(container, data, username) {
    const svg = container.querySelector('.github-heatmap-svg');
    const statsEl = container.querySelector('.github-heatmap-count');
    const tooltipEl = container.querySelector('.github-heatmap-tooltip');

    if (!svg || !statsEl || !tooltipEl) return;

    statsEl.textContent = data.total.lastYear;

    const weeks = Math.ceil(data.contributions.length / ROWS);
    const labelOffset = 28;
    const headerOffset = 16;
    const svgWidth = labelOffset + weeks * (CELL + GAP);
    const svgHeight = headerOffset + ROWS * (CELL + GAP);

    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svg.innerHTML = '';

    const monthLabels = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const idx = w * ROWS;
      if (idx < data.contributions.length) {
        const month = new Date(data.contributions[idx].date).getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTHS[month], x: labelOffset + w * (CELL + GAP) });
          lastMonth = month;
        }
      }
    }

    const ns = 'http://www.w3.org/2000/svg';

    monthLabels.forEach((m) => {
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', m.x);
      text.setAttribute('y', 11);
      text.setAttribute('class', 'heatmap-label');
      text.setAttribute('font-size', 10);
      text.textContent = m.label;
      svg.appendChild(text);
    });

    DAYS.forEach((d, i) => {
      if (d) {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', headerOffset + i * (CELL + GAP) + CELL - 1);
        text.setAttribute('class', 'heatmap-label');
        text.setAttribute('font-size', 9);
        text.textContent = d;
        svg.appendChild(text);
      }
    });

    data.contributions.forEach((day, idx) => {
      const col = Math.floor(idx / ROWS);
      const row = idx % ROWS;
      const rect = document.createElementNS(ns, 'rect');

      rect.setAttribute('x', labelOffset + col * (CELL + GAP));
      rect.setAttribute('y', headerOffset + row * (CELL + GAP));
      rect.setAttribute('width', CELL);
      rect.setAttribute('height', CELL);
      rect.setAttribute('rx', 2);
      rect.setAttribute('ry', 2);
      rect.setAttribute('class', 'heatmap-cell');
      rect.setAttribute('data-date', day.date);
      rect.setAttribute('data-count', day.count);

      const opacity = LEVEL_OPACITY[Math.min(day.level, 4)];
      rect.setAttribute('fill', `rgba(35, 154, 59, ${opacity})`);

      rect.addEventListener('mouseenter', (e) => {
        const date = rect.getAttribute('data-date');
        const count = parseInt(rect.getAttribute('data-count') || '0', 10);
        tooltip(date, count, e);
      });

      rect.addEventListener('mousemove', (e) => {
        const date = rect.getAttribute('data-date');
        const count = parseInt(rect.getAttribute('data-count') || '0', 10);
        tooltip(date, count, e);
      });

      rect.addEventListener('mouseleave', () => {
        tooltipEl.classList.remove('visible');
      });

      rect.addEventListener('click', () => {
        const date = day.date;
        const url = `https://github.com/${username}?tab=overview&from=${date}&to=${date}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });

      svg.appendChild(rect);
    });

    if (!document.querySelector('style[data-heatmap-style]')) {
      const style = document.createElement('style');
      style.setAttribute('data-heatmap-style', '');
      style.textContent = `
        .heatmap-label {
          fill: rgba(0, 0, 0, 0.4);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          font-size: 10px;
        }
        [data-md-color-scheme="slate"] .heatmap-label {
          fill: rgba(255, 255, 255, 0.7);
        }
        .heatmap-cell {
          transition: opacity 150ms, filter 150ms;
          cursor: default;
          filter: drop-shadow(0 0 0 rgba(35, 154, 59, 0));
        }
        .heatmap-cell:hover {
          opacity: 1 !important;
          filter: drop-shadow(0 2px 6px rgba(35, 154, 59, 0.4));
        }
      `;
      document.head.appendChild(style);
    }

    function tooltip(date, count, event) {
      const text = count > 0 ? `${formatDate(date)}: ${count} 次贡献` : `${formatDate(date)}: 无贡献`;
      const contentEl = tooltipEl.querySelector('.github-heatmap-tooltip__content');
      if (contentEl) {
        contentEl.textContent = text;
      }
      tooltipEl.classList.add('visible');

      const target = event.currentTarget;
      const margin = 8;
      const gap = 8;

      if (target && target.getBoundingClientRect) {
        const cellRect = target.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        let x = cellRect.left + cellRect.width / 2 - tooltipRect.width / 2;
        let y = cellRect.top - tooltipRect.height - gap;
        let arrowPosition = cellRect.left + cellRect.width / 2;
        let isAbove = true;

        const maxX = window.innerWidth - tooltipRect.width - margin;
        x = Math.max(margin, Math.min(x, maxX));

        if (y < margin) {
          y = cellRect.bottom + gap;
          isAbove = false;
        }

        tooltipEl.style.left = x + 'px';
        tooltipEl.style.top = y + 'px';

        tooltipEl.classList.remove('arrow-top', 'arrow-bottom');
        tooltipEl.classList.add(isAbove ? 'arrow-bottom' : 'arrow-top');

        const arrowEl = tooltipEl.querySelector('.github-heatmap-tooltip__arrow');
        if (arrowEl) {
          const arrowOffset = arrowPosition - x;
          arrowEl.style.left = arrowOffset + 'px';
        }
      }
    }
  }

  async function initHeatmaps() {
    const containers = document.querySelectorAll('.github-heatmap');
    if (!containers.length) return;
    await Promise.all(Array.from(containers).map((c) => loadHeatmap(c)));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeatmaps);
  } else {
    initHeatmaps();
  }
})();

