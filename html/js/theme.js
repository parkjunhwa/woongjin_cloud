// 테마 관리 JavaScript

// 로고 이미지 업데이트 함수 (전역으로 노출)
function updateLogo() {
  const logoImg = document.getElementById('sidebar-logo-img');
  if (!logoImg) return;
  
  const isDark = document.documentElement.classList.contains('dark');
  const logoLight = logoImg.getAttribute('data-logo-light');
  const logoDark = logoImg.getAttribute('data-logo-dark');
  
  if (isDark && logoDark) {
    logoImg.src = logoDark;
  } else if (!isDark && logoLight) {
    logoImg.src = logoLight;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // 초기 로고 설정
  updateLogo();
  
  // 테마 변경 감지 (MutationObserver 사용)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        updateLogo();
      }
    });
  });
  
  // html 요소의 class 변경 감지
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  // 시스템 테마 변경 감지 (system 모드일 때)
  const theme = window.initialTheme || 'light';
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = function(e) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
      updateLogo();
    };
    
    // 초기 설정
    handleSystemThemeChange(mediaQuery);
    
    // 변경 감지
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  }
});

