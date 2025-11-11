<?php
/**
 * 테마 설정 API
 */
header('Content-Type: application/json');

require_once __DIR__ . '/../config/theme.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  
  if (isset($input['theme'])) {
    setTheme($input['theme']);
  }
  
  if (isset($input['colorTheme'])) {
    setColorTheme($input['colorTheme']);
  }
  
  if (isset($input['sidebarCollapsed'])) {
    setSidebarCollapsed($input['sidebarCollapsed']);
  }
  
  if (isset($input['tabsEnabled'])) {
    setTabsEnabled($input['tabsEnabled']);
  }
  
  if (isset($input['language'])) {
    setLanguage($input['language']);
  }
  
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'error' => 'Invalid method']);
}

