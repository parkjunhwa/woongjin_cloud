<?php
/**
 * 메인 페이지 (PHP 버전)
 * React 버전의 index.tsx를 PHP로 변환한 버전
 */

// 설정 파일 로드
require_once __DIR__ . '/config/theme.php';

// 컴포넌트 로드 (함수만 로드, HTML은 include로 출력)
require_once __DIR__ . '/components/common/card.php';
// sidebar.php와 header.php는 include로만 사용 (HTML 출력용)

// 현재 설정 가져오기
$currentTheme = getTheme();
$currentColorTheme = getColorTheme();
$isSidebarCollapsed = isSidebarCollapsed();
?>
<!DOCTYPE html>
<html lang="ko" <?= getColorThemeAttribute() ?> class="<?= getThemeClass() ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웅진클라우드 - 대시보드 (PHP 버전)</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/main.css">

  <!-- Initial Theme Script (prevent FOUC) -->
              <script>
                (function () {
                  try {
                    var theme = '<?= $currentTheme ?>';
                    var colorTheme = '<?= $currentColorTheme ?>';

                    // 컬러 테마 설정
                    document.documentElement.setAttribute("data-color-theme", colorTheme);

                    // 테마 설정 및 로고 업데이트
                    var isDark = false;
                    if (theme === "dark") {
                      document.documentElement.classList.add("dark");
                      document.documentElement.style.colorScheme = "dark";
                      isDark = true;
                    } else if (theme === "light") {
                      document.documentElement.classList.remove("dark");
                      document.documentElement.style.colorScheme = "light";
                      isDark = false;
                    } else if (theme === "system") {
                      var m = window.matchMedia("(prefers-color-scheme: dark)");
                      if (m.matches) {
                        document.documentElement.classList.add("dark");
                        document.documentElement.style.colorScheme = "dark";
                        isDark = true;
                      } else {
                        document.documentElement.classList.remove("dark");
                        document.documentElement.style.colorScheme = "light";
                        isDark = false;
                      }
                    }
                    
                    // 초기 로고 설정
                    var logoImg = document.getElementById('sidebar-logo-img');
                    if (logoImg) {
                      var logoLight = logoImg.getAttribute('data-logo-light');
                      var logoDark = logoImg.getAttribute('data-logo-dark');
                      if (isDark && logoDark) {
                        logoImg.src = logoDark;
                      } else if (!isDark && logoLight) {
                        logoImg.src = logoLight;
                      }
                    }
                  } catch (e) {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.colorScheme = "light";
                    document.documentElement.setAttribute("data-color-theme", "blue");
                  }
                })();
              </script>
</head>
<body>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 relative">
    <!-- Mobile Overlay -->
    <div id="sidebar-overlay" class="sidebar-overlay" style="display: none;"></div>

    <!-- Sidebar -->
    <?php include __DIR__ . '/components/common/sidebar.php'; ?>

    <!-- Main Content -->
    <div id="main-content-wrapper" class="main-content-wrapper transition-all duration-300 <?= $isSidebarCollapsed ? 'sidebar-collapsed' : '' ?>">
      <!-- Header -->
      <?php include __DIR__ . '/components/common/header.php'; ?>

      <!-- Main Content Area -->
      <main id="main-content" class="w-full px-6 py-6" role="main">
        <div class="w-full flex flex-col gap-3 mb-3">
          
          
          <!-- 현재 설정 표시 -->
          <?php
          $settingsContent = '<div class="space-y-2">';
          $settingsContent .= '<p><strong>현재 테마:</strong> ' . htmlspecialchars($currentTheme, ENT_QUOTES, 'UTF-8') . '</p>';
          $settingsContent .= '<p><strong>컬러 테마:</strong> ' . htmlspecialchars($currentColorTheme, ENT_QUOTES, 'UTF-8') . '</p>';
          $settingsContent .= '<p><strong>사이드바 상태:</strong> ' . ($isSidebarCollapsed ? '접힘' : '펼침') . '</p>';
          $settingsContent .= '</div>';
          
          renderCard('현재 설정', $settingsContent);
          ?>
          
          
        </div>
      </main>
    </div>
  </div>

  <!-- JavaScript -->
  <script>
    // PHP에서 설정한 초기값을 JavaScript로 전달 (theme.js보다 먼저 로드)
    window.initialTheme = '<?= $currentTheme ?>';
    window.initialColorTheme = '<?= $currentColorTheme ?>';
  </script>
  <script src="js/theme.js"></script>
  <script src="js/sidebar.js"></script>
  <script src="js/header.js"></script>
</body>
</html>

