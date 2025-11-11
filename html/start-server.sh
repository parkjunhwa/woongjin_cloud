#!/bin/bash

# PHP 서버 시작 스크립트 (Homebrew PHP 경로 사용)

cd "$(dirname "$0")"

# Homebrew PHP 경로
PHP_PATH="/opt/homebrew/opt/php/bin/php"

# PHP 경로 확인
if [ ! -f "$PHP_PATH" ]; then
    echo "❌ PHP를 찾을 수 없습니다: $PHP_PATH"
    echo "다음 명령어로 PHP를 설치하세요:"
    echo "  brew install php"
    exit 1
fi

echo "🚀 PHP 서버 시작 중..."
echo "📍 주소: http://localhost:8000/index.php"
echo "📁 디렉토리: $(pwd)"
echo ""
echo "종료하려면 Ctrl+C를 누르세요"
echo ""

$PHP_PATH -S localhost:8000
