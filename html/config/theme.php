<?php
/**
 * 테마 관리 시스템
 * React의 ThemeProvider를 PHP로 변환
 */

// 세션 시작 (이미 시작되었다면 무시)
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

/**
 * 현재 테마 가져오기
 * @return string 'light' | 'dark' | 'system'
 */
function getTheme() {
  return $_SESSION['theme'] ?? 'light';
}

/**
 * 테마 설정
 * @param string $theme 'light' | 'dark' | 'system'
 */
function setTheme($theme) {
  if (in_array($theme, ['light', 'dark', 'system'])) {
    $_SESSION['theme'] = $theme;
    return true;
  }
  return false;
}

/**
 * 현재 컬러 테마 가져오기
 * @return string
 */
function getColorTheme() {
  return $_SESSION['colorTheme'] ?? 'blue';
}

/**
 * 컬러 테마 설정
 * @param string $color
 */
function setColorTheme($color) {
  $allowedColors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'indigo', 'teal', 'orange', 'gray', 'cyan', 'emerald', 'violet', 'fuchsia', 'rose', 'amber', 'lime', 'sky'];
  if (in_array($color, $allowedColors)) {
    $_SESSION['colorTheme'] = $color;
    return true;
  }
  return false;
}

/**
 * 사이드바 접힘 상태 가져오기
 * @return bool
 */
function isSidebarCollapsed() {
  return $_SESSION['sidebarCollapsed'] ?? false;
}

/**
 * 사이드바 접힘 상태 설정
 * @param bool $collapsed
 */
function setSidebarCollapsed($collapsed) {
  $_SESSION['sidebarCollapsed'] = (bool)$collapsed;
}

/**
 * 탭 기능 활성화 여부
 * @return bool
 */
function isTabsEnabled() {
  return $_SESSION['tabsEnabled'] ?? false;
}

/**
 * 탭 기능 활성화 설정
 * @param bool $enabled
 */
function setTabsEnabled($enabled) {
  $_SESSION['tabsEnabled'] = (bool)$enabled;
}

/**
 * 전체화면 모드 여부
 * @return bool
 */
function isFullscreen() {
  return $_SESSION['fullscreen'] ?? false;
}

/**
 * 전체화면 모드 설정
 * @param bool $fullscreen
 */
function setFullscreen($fullscreen) {
  $_SESSION['fullscreen'] = (bool)$fullscreen;
}

/**
 * 현재 언어 가져오기
 * @return string
 */
function getLanguage() {
  return $_SESSION['language'] ?? 'ko';
}

/**
 * 언어 설정
 * @param string $lang
 */
function setLanguage($lang) {
  $allowedLangs = ['ko', 'en', 'zh', 'es'];
  if (in_array($lang, $allowedLangs)) {
    $_SESSION['language'] = $lang;
    return true;
  }
  return false;
}

/**
 * HTML에 테마 클래스 적용
 * @return string
 */
function getThemeClass() {
  $theme = getTheme();
  if ($theme === 'system') {
    // 시스템 설정에 따라 결정 (클라이언트 사이드에서 처리)
    return '';
  }
  return $theme === 'dark' ? 'dark' : '';
}

/**
 * 컬러 테마 속성 반환
 * @return string
 */
function getColorThemeAttribute() {
  return 'data-color-theme="' . htmlspecialchars(getColorTheme(), ENT_QUOTES, 'UTF-8') . '"';
}
?>

