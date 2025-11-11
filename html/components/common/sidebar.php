<?php
/**
 * Sidebar 컴포넌트
 */
require_once __DIR__ . '/../../config/theme.php';

$isCollapsed = isSidebarCollapsed();
$currentPath = $_SERVER['REQUEST_URI'] ?? '/';
$currentTheme = getTheme();

// 로고 이미지 결정 (system 모드는 JavaScript에서 처리)
$logoImage = 'images/logo_b.svg'; // 기본값 (라이트 모드)
if ($currentTheme === 'dark') {
  $logoImage = 'images/logo_w.svg';
}

$navItems = [
  [
    'label' => '대시보드',
    'href' => '/index.php',
    'icon' => '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
  ],
  [
    'label' => '퍼블리싱',
    'href' => '/published.php',
    'icon' => '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
  ],
];
?>
<aside id="sidebar" class="sidebar <?= $isCollapsed ? 'collapsed' : '' ?>" data-sidebar>
  <div class="sidebar-header">
    <div class="sidebar-logo" id="sidebar-logo">
      <img id="sidebar-logo-img" src="<?= htmlspecialchars($logoImage, ENT_QUOTES, 'UTF-8') ?>" alt="woongjin cloud" class="sidebar-logo-img" data-logo-light="images/logo_b.svg" data-logo-dark="images/logo_w.svg" />
      <span class="sidebar-logo-text">클라우드</span>
    </div>
    <button id="sidebar-toggle" class="sidebar-toggle-btn" aria-label="<?= $isCollapsed ? '사이드바 펼치기' : '사이드바 접기' ?>" aria-expanded="<?= $isCollapsed ? 'false' : 'true' ?>">
      <?php if ($isCollapsed): ?>
        <!-- 접힘 상태: 햄버거 아이콘 -->
        <svg class="sidebar-toggle-icon w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      <?php else: ?>
        <!-- 펼침 상태: 왼쪽 화살표 (데스크톱에서만 표시) -->
        <svg class="sidebar-toggle-icon w-5 h-5 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      <?php endif; ?>
    </button>
  </div>

  <nav class="sidebar-nav" id="sidebar-nav">
    <ul class="sidebar-menu" id="sidebar-menu">
      <?php foreach ($navItems as $item): 
        $isActive = strpos($currentPath, $item['href']) !== false;
      ?>
      <li class="sidebar-menu-item">
        <a href="<?= htmlspecialchars($item['href']) ?>" class="sidebar-menu-link <?= $isActive ? 'active' : '' ?>">
          <span class="sidebar-menu-icon"><?= $item['icon'] ?></span>
          <span class="sidebar-menu-label"><?= htmlspecialchars($item['label']) ?></span>
        </a>
      </li>
      <?php endforeach; ?>
    </ul>
  </nav>

  <div class="sidebar-footer">
    <div class="sidebar-footer-text">© 2024 웅진클라우드</div>
  </div>
</aside>

