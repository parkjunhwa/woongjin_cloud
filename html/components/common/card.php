<?php
/**
 * Card 컴포넌트
 * React의 Card 컴포넌트를 PHP로 변환
 * 
 * 사용법:
 * <?php include 'components/common/card.php'; ?>
 * <?php renderCard('제목', '<p>내용</p>'); ?>
 */

function renderCard($title = '', $content = '') {
  ?>
  <div class="break-inside-avoid rounded-sm border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
    <?php if (!empty($title)): ?>
      <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
      </h2>
    <?php endif; ?>
    <?= $content ?>
  </div>
  <?php
}

// 클래스 방식으로도 사용 가능
class Card {
  private $title;
  private $content;
  
  public function __construct($title = '', $content = '') {
    $this->title = $title;
    $this->content = $content;
  }
  
  public function render() {
    ?>
    <div class="break-inside-avoid rounded-sm border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
      <?php if (!empty($this->title)): ?>
        <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          <?= htmlspecialchars($this->title, ENT_QUOTES, 'UTF-8') ?>
        </h2>
      <?php endif; ?>
      <?= $this->content ?>
    </div>
    <?php
  }
}
?>

