// Header 기능 JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Popover 관리
  const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
  const popovers = document.querySelectorAll('[data-popover-content]');
  
  popoverTriggers.forEach(trigger => {
    const popoverId = trigger.closest('[data-popover]')?.getAttribute('data-popover');
    const popover = document.querySelector(`[data-popover="${popoverId}"] [data-popover-content]`);
    
    if (!popover) return;
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = popover.style.display !== 'none';
      
      // 모든 popover 닫기
      popovers.forEach(p => p.style.display = 'none');
      
      if (!isOpen) {
        // 현재 popover 열기
        const rect = trigger.getBoundingClientRect();
        popover.style.display = 'block';
        popover.style.top = (rect.bottom + 8) + 'px';
        popover.style.right = (window.innerWidth - rect.right) + 'px';
      }
    });
  });
  
  // 외부 클릭 시 popover 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-popover]')) {
      popovers.forEach(p => p.style.display = 'none');
    }
  });
  
  // 테마 변경
  const themeButtons = document.querySelectorAll('[data-theme-option]');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-option');
      fetch('api/theme.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
      }).then(() => {
        // 테마 즉시 적용 (페이지 리로드 전)
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        } else if (theme === 'system') {
          const m = window.matchMedia('(prefers-color-scheme: dark)');
          if (m.matches) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
          }
        }
        // 로고 업데이트
        if (typeof updateLogo === 'function') {
          updateLogo();
        }
        // 페이지 리로드
        setTimeout(() => location.reload(), 100);
      });
    });
  });
  
  // 컬러 테마 변경
  const colorButtons = document.querySelectorAll('.color-palette-item');
  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      fetch('api/theme.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colorTheme: color })
      }).then(() => location.reload());
    });
  });
  
  // 언어 변경
  const languageButtons = document.querySelectorAll('[data-language-option]');
  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-language-option');
      fetch('api/theme.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang })
      }).then(() => location.reload());
    });
  });
  
  // 탭 토글
  const tabsToggle = document.getElementById('header-tabs-toggle');
  if (tabsToggle) {
    tabsToggle.addEventListener('click', () => {
      fetch('api/theme.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tabsEnabled: true })
      }).then(() => location.reload());
    });
  }
  
  // 전체화면 토글
  const fullscreenToggle = document.getElementById('header-fullscreen-toggle');
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
  
  // 검색
  const searchForm = document.getElementById('header-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('header-search-input');
      if (input && input.value.trim()) {
        console.log('검색:', input.value);
        // 검색 로직 구현
      }
    });
  }
});

