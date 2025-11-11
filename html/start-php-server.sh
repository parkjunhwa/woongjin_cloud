#!/bin/bash

# PHP 서버 시작 스크립트

cd "$(dirname "$0")"

# PHP 경로 찾기
PHP_PATH=""
if [ -f "/opt/homebrew/bin/php" ]; then
    PHP_PATH="/opt/homebrew/bin/php"
elif [ -f "/usr/local/bin/php" ]; then
    PHP_PATH="/usr/local/bin/php"
elif command -v php &> /dev/null; then
    PHP_PATH=$(which php)
else
    echo "❌ PHP를 찾을 수 없습니다."
    echo "다음 명령어로 PHP를 설치하세요:"
    echo "  brew install php"
    echo ""
    echo "또는 install-php.sh 스크립트를 실행하세요:"
    echo "  ./install-php.sh"
    exit 1
fi

echo "🚀 PHP 서버 시작 중..."
echo "📍 주소: http://localhost:8000/index.php"
echo "📁 디렉토리: $(pwd)"
echo ""
echo "종료하려면 Ctrl+C를 누르세요"
echo ""

$PHP_PATH -S localhost:8000
