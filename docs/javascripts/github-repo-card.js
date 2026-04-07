(function () {
  const CACHE_DURATION = 2 * 60 * 60 * 1000;
  const CACHE_KEY_PREFIX = 'github-repo-card-';

  function parseRepoFromHref(href) {
    if (!href) return null;
    const match = href.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
    if (!match) return null;
    return `${match[1]}/${match[2]}`;
  }

  function buildCardInnerHTML() {
    return `
      <div class="github-repo-card-inner">
        <div class="github-repo-main">
          <div class="github-repo-left">
            <div class="github-repo-avatar-wrapper">
              <div class="github-repo-avatar"></div>
            </div>
            <div class="github-repo-title">
              <span class="github-repo-owner"></span>
              <span class="github-repo-slash">/</span>
              <span class="github-repo-name"></span>
            </div>
          </div>
          <div class="github-repo-logo">
            <span class="github-repo-logo-inner">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.31 1.23A11.5 11.5 0 0 1 12 4.8c1.02.01 2.04.14 3 .41 2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.93.43.37.82 1.1.82 2.23v3.29c0 .32.19.7.8.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <p class="github-repo-description"></p>
        <div class="github-repo-meta">
          <span class="github-repo-meta-item">
            <span class="github-repo-meta-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            </span>
            <span class="github-repo-stars"></span>
          </span>
          <span class="github-repo-meta-item">
            <span class="github-repo-meta-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="6" y1="3" x2="6" y2="15"></line>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
            </span>
            <span class="github-repo-forks"></span>
          </span>
          <span class="github-repo-meta-item">
            <span class="github-repo-meta-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 20h10" />
                <path d="M6 6h12" />
                <path d="M6 6 3 12h6Z" />
                <path d="m21 12-3-6-3 6Z" />
                <path d="M12 6V2" />
                <path d="M12 12v8" />
              </svg>
            </span>
            <span class="github-repo-license"></span>
          </span>
        </div>
      </div>
    `;
  }

  function getCachedData(repo) {
    try {
      const cacheKey = CACHE_KEY_PREFIX + repo;
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheKey + '-time');

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        if (age < CACHE_DURATION) {
          return JSON.parse(cached);
        }
      }
    } catch (e) {
    }
    return null;
  }

  function setCachedData(repo, data) {
    try {
      const cacheKey = CACHE_KEY_PREFIX + repo;
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheKey + '-time', Date.now().toString());
    } catch (e) {
    }
  }

  function fillCardData(card, data, owner, name) {
    const ownerEl = card.querySelector('.github-repo-owner');
    const nameEl = card.querySelector('.github-repo-name');
    const descEl = card.querySelector('.github-repo-description');
    const avatarEl = card.querySelector('.github-repo-avatar');
    const starsEl = card.querySelector('.github-repo-stars');
    const forksEl = card.querySelector('.github-repo-forks');
    const licenseEl = card.querySelector('.github-repo-license');
    
    const customOwner = card.getAttribute('data-owner');
    const customName = card.getAttribute('data-name');
    const customDescription = card.getAttribute('data-description');
    const customAvatar = card.getAttribute('data-avatar');
    const customStars = card.getAttribute('data-stars');
    const customForks = card.getAttribute('data-forks');
    const customLicense = card.getAttribute('data-license');

    if (ownerEl) ownerEl.textContent = customOwner || owner;
    if (nameEl) nameEl.textContent = customName || name;

    if (starsEl) {
      if (customStars !== null) {
        starsEl.textContent = customStars === '0' ? '' : customStars;
      } else if (typeof data.stargazers_count === 'number') {
        starsEl.textContent = data.stargazers_count > 0 ? data.stargazers_count.toString() : '';
      }
    }
    if (forksEl) {
      if (customForks !== null) {
        forksEl.textContent = customForks === '0' ? '' : customForks;
      } else if (typeof data.forks_count === 'number') {
        forksEl.textContent = data.forks_count > 0 ? data.forks_count.toString() : '';
      }
    }
    if (licenseEl) {
      const licenseText = customLicense !== null ? customLicense : ((data.license && (data.license.spdx_id || data.license.name)) || '');
      licenseEl.textContent = licenseText;
      const metaItem = licenseEl.closest('.github-repo-meta-item');
      if (metaItem) {
        if (!licenseText) {
          metaItem.classList.add('github-repo-license-empty');
        } else {
          metaItem.classList.remove('github-repo-license-empty');
        }
      }
    }
    if (descEl) {
      descEl.textContent = customDescription || (data.description || '');
    }
    if (avatarEl) {
      if (customAvatar) {
        avatarEl.style.backgroundImage = `url(${customAvatar})`;
        avatarEl.setAttribute('aria-label', 'Custom avatar');
        avatarEl.setAttribute('role', 'img');
      } else if (data.owner && data.owner.avatar_url) {
        avatarEl.style.backgroundImage = `url(${data.owner.avatar_url})`;
        avatarEl.setAttribute('aria-label', data.owner.login || 'Repository owner avatar');
        avatarEl.setAttribute('role', 'img');
      }
    }
  }

  async function fetchRepoData(repo) {
    const apiUrl = `https://api.github.com/repos/${repo}`;
    const res = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) {
      throw new Error('GitHub API error: ' + res.status);
    }
    return await res.json();
  }

  function hasAllCustomAttributes(card) {
    const customOwner = card.getAttribute('data-owner');
    const customName = card.getAttribute('data-name');
    const customDescription = card.getAttribute('data-description');
    const customAvatar = card.getAttribute('data-avatar');
    const customStars = card.getAttribute('data-stars');
    const customForks = card.getAttribute('data-forks');
    const customLicense = card.getAttribute('data-license');
    
    return customOwner !== null && 
           customName !== null && 
           customDescription !== null && 
           customAvatar !== null && 
           customStars !== null && 
           customForks !== null && 
           customLicense !== null;
  }

  async function initCard(card) {
    if (card.dataset.githubCardInitialized === 'true') return;
    card.dataset.githubCardInitialized = 'true';

    const href = card.getAttribute('href') || '';
    const explicitRepo = card.getAttribute('data-repo');
    const repo = explicitRepo || parseRepoFromHref(href);
    if (!repo) return;

    const [owner, name] = repo.split('/');

    card.innerHTML = buildCardInnerHTML();

    if (hasAllCustomAttributes(card)) {
      fillCardData(card, {}, owner, name);
      return;
    }

    const cachedData = getCachedData(repo);

    if (cachedData) {
      fillCardData(card, cachedData, owner, name);

      fetchRepoData(repo)
        .then(data => {
          setCachedData(repo, data);
          fillCardData(card, data, owner, name);
        })
        .catch(() => {
        });
    } else {
      try {
        const data = await fetchRepoData(repo);
        setCachedData(repo, data);
        fillCardData(card, data, owner, name);
      } catch (e) {
        console.warn('加载 GitHub 仓库信息失败：', repo, e);
        fillCardData(card, {}, owner, name);
      }
    }
  }

  async function initGitHubRepoCards() {
    const cards = document.querySelectorAll('.github-repo-card');
    if (!cards.length) return;
    await Promise.all(Array.from(cards).map((card) => initCard(card)));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitHubRepoCards);
  } else {
    initGitHubRepoCards();
  }
})();
