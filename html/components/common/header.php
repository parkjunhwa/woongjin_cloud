<?php
/**
 * Header 컴포넌트
 */
require_once __DIR__ . '/../../config/theme.php';

$currentTheme = getTheme();
$currentColorTheme = getColorTheme();
$isTabsEnabled = isTabsEnabled();
$isFullscreen = isFullscreen();
$currentLanguage = getLanguage();

$colorOptions = [
  ['name' => 'blue', 'value' => '#3b82f6', 'label' => '블루'],
  ['name' => 'red', 'value' => '#ef4444', 'label' => '레드'],
  ['name' => 'green', 'value' => '#22c55e', 'label' => '그린'],
  ['name' => 'yellow', 'value' => '#eab308', 'label' => '옐로우'],
  ['name' => 'purple', 'value' => '#a855f7', 'label' => '퍼플'],
  ['name' => 'pink', 'value' => '#ec4899', 'label' => '핑크'],
  ['name' => 'indigo', 'value' => '#6366f1', 'label' => '인디고'],
  ['name' => 'teal', 'value' => '#14b8a6', 'label' => '틸'],
  ['name' => 'orange', 'value' => '#f97316', 'label' => '오렌지'],
  ['name' => 'gray', 'value' => '#6b7280', 'label' => '그레이'],
  ['name' => 'cyan', 'value' => '#06b6d4', 'label' => '시안'],
  ['name' => 'emerald', 'value' => '#10b981', 'label' => '에메랄드'],
  ['name' => 'violet', 'value' => '#8b5cf6', 'label' => '바이올렛'],
  ['name' => 'fuchsia', 'value' => '#d946ef', 'label' => '푸시아'],
  ['name' => 'rose', 'value' => '#f43f5e', 'label' => '로즈'],
  ['name' => 'amber', 'value' => '#f59e0b', 'label' => '앰버'],
  ['name' => 'lime', 'value' => '#84cc16', 'label' => '라임'],
  ['name' => 'sky', 'value' => '#0ea5e9', 'label' => '스카이'],
];

$languageMap = [
  'ko' => '한국어',
  'en' => 'English',
  'zh' => '中文',
  'es' => 'Español',
];

$languageFlags = [
  'ko' => '🇰🇷',
  'en' => '🇺🇸',
  'zh' => '🇨🇳',
  'es' => '🇪🇸',
];
?>
<header id="header" class="header sticky top-0 z-50 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex flex-row shadow-sm">
  <div class="w-full px-4 h-[63px] flex items-center">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Mobile Hamburger Button -->
        <button id="sidebar-mobile-toggle" class="md:hidden rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" aria-label="메뉴 열기/닫기">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div class="flex items-center gap-3">
        <!-- User Menu -->
        <div class="header-item" data-popover="user-menu">
          <button id="header-user-trigger" class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none rounded-sm px-1 py-1" data-popover-trigger aria-label="사용자 메뉴">
            <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">홍길동/사업부서명</span>
          </button>
          <div id="header-user-menu" class="header-popover" data-popover-content style="display: none;">
            <button class="header-popover-item">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              정보수정
            </button>
            <button class="header-popover-item">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              프로필보기
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Tab Toggle -->
          <div class="hidden md:block">
            <button id="header-tabs-toggle" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= $isTabsEnabled ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300' ?>" aria-label="탭 기능 토글" aria-pressed="<?= $isTabsEnabled ? 'true' : 'false' ?>">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </button>
          </div>

          <!-- Color Palette -->
          <div class="hidden md:block" data-popover="color-palette">
            <button id="header-color-palette-trigger" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" data-popover-trigger aria-label="컬러 팔레트">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>
            <div id="header-color-palette-popover" class="header-popover header-popover-large" data-popover-content style="display: none;">
              <div class="color-palette-grid" id="color-palette-grid">
                <?php foreach ($colorOptions as $color): ?>
                <button class="color-palette-item" data-color="<?= htmlspecialchars($color['name']) ?>" style="background-color: <?= htmlspecialchars($color['value']) ?>; <?= $currentColorTheme === $color['name'] ? 'border: 2px solid #111827; transform: scale(1.1);' : '' ?>" aria-label="<?= htmlspecialchars($color['label']) ?>">
                </button>
                <span class="color-palette-label"><?= htmlspecialchars($color['label']) ?></span>
                <?php endforeach; ?>
              </div>
            </div>
          </div>

          <!-- Theme Dropdown -->
          <div class="hidden md:block" data-popover="theme">
            <button id="header-theme-trigger" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" data-popover-trigger aria-label="테마 선택">
              <?php if ($currentTheme === 'light'): ?>
                <svg id="header-theme-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              <?php elseif ($currentTheme === 'dark'): ?>
                <svg id="header-theme-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              <?php else: ?>
                <svg id="header-theme-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              <?php endif; ?>
            </button>
            <div id="header-theme-menu" class="header-popover" data-popover-content style="display: none;">
              <button class="header-popover-item" data-theme-option="light">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                라이트 모드
                <?php if ($currentTheme === 'light'): ?>
                  <svg class="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                <?php endif; ?>
              </button>
              <button class="header-popover-item" data-theme-option="dark">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                다크 모드
                <?php if ($currentTheme === 'dark'): ?>
                  <svg class="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                <?php endif; ?>
              </button>
              <div class="header-popover-separator my-1 h-px bg-gray-200 dark:bg-gray-800"></div>
              <button class="header-popover-item" data-theme-option="system">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                시스템 설정
                <?php if ($currentTheme === 'system'): ?>
                  <svg class="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                <?php endif; ?>
              </button>
            </div>
          </div>

          <!-- Fullscreen Button -->
          <div class="hidden md:block">
            <button id="header-fullscreen-toggle" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" aria-label="전체화면" aria-pressed="<?= $isFullscreen ? 'true' : 'false' ?>">
              <?php if ($isFullscreen): ?>
                <svg id="header-fullscreen-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              <?php else: ?>
                <svg id="header-fullscreen-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              <?php endif; ?>
            </button>
          </div>

          <!-- Language Selector -->
          <div class="hidden md:block" data-popover="language">
            <button id="header-language-trigger" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 flex items-center justify-center" data-popover-trigger aria-label="언어 선택">
              <span class="text-xl" id="header-language-flag"><?= $languageFlags[$currentLanguage] ?? '🇰🇷' ?></span>
            </button>
            <div id="header-language-popover" class="header-popover" data-popover-content style="display: none;">
              <?php foreach ($languageMap as $lang => $name): ?>
              <button class="header-popover-item" data-language-option="<?= $lang ?>">
                <span class="text-lg"><?= $languageFlags[$lang] ?></span>
                <span><?= $name ?></span>
                <?php if ($currentLanguage === $lang): ?>
                  <svg class="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                <?php endif; ?>
              </button>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Search -->
          <div data-popover="search">
            <button id="header-search-trigger" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" data-popover-trigger aria-label="검색">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div id="header-search-popover" class="header-popover header-popover-search" data-popover-content style="display: none;">
              <form id="header-search-form" class="header-search-form">
                <div class="header-search-input-wrapper">
                  <label for="header-search-input" class="sr-only">검색어 입력</label>
                  <input id="header-search-input" type="text" placeholder="검색어를 입력하세요" class="header-search-input" />
                  <button type="button" id="header-search-clear" class="header-search-clear" style="display: none;" aria-label="삭제">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="header-search-actions">
                  <button type="button" id="header-search-cancel" class="header-search-btn-cancel">취소</button>
                  <button type="submit" class="header-search-btn-submit">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    검색
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Logout -->
          <button id="header-logout" class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" aria-label="로그아웃">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>

