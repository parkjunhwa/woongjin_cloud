// Sidebar 기능 JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileToggle = document.getElementById('sidebar-mobile-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  const mainWrapper = document.getElementById('main-content-wrapper');
  
  // 모바일 여부 확인
  const isMobile = window.innerWidth < 768;
  
  // 사이드바 접기/펼치기
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isCollapsed = sidebar.classList.contains('collapsed');
      const isMobileOpen = sidebar.classList.contains('mobile-open');
      
      // 모바일에서 사이드바가 열려있으면 닫기
      if (isMobile && isMobileOpen) {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
        return;
      }
      
      // 데스크톱에서 접기/펼치기
      if (!isMobile) {
        fetch('api/theme.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sidebarCollapsed: !isCollapsed })
        }).then(() => {
          location.reload();
        }).catch(err => {
          console.error('Error toggling sidebar:', err);
        });
      }
    });
  }
  
  // 모바일 햄버거 버튼 토글
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = sidebar.classList.contains('mobile-open');
      
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
      } else {
        sidebar.classList.add('mobile-open');
        if (overlay) overlay.style.display = 'block';
      }
    });
  }
  
  // 오버레이 클릭 시 닫기
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.style.display = 'none';
    });
  }
  
  // 모바일에서 사이드바 메뉴 클릭 시 닫기
  const sidebarLinks = document.querySelectorAll('.sidebar-menu-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile) {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
      }
    });
  });
  
  // 윈도우 리사이즈 시 모바일 상태 업데이트
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobileNow = window.innerWidth < 768;
      if (!isMobileNow && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
      }
    }, 250);
  });
});

