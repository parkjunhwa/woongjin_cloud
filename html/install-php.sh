#!/bin/bash

# PHP 설치 스크립트

echo "🔍 PHP 설치 상태 확인 중..."

# Homebrew 확인
if ! command -v brew &> /dev/null; then
    echo "📦 Homebrew가 설치되어 있지 않습니다."
    echo "Homebrew를 설치하시겠습니까? (y/n)"
    read -r answer
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        echo "Homebrew 설치 중..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Homebrew 경로 추가
        if [ -f "/opt/homebrew/bin/brew" ]; then
            eval "$(/opt/homebrew/bin/brew shellenv)"
        elif [ -f "/usr/local/bin/brew" ]; then
            eval "$(/usr/local/bin/brew shellenv)"
        fi
    else
        echo "Homebrew 설치가 필요합니다."
        exit 1
    fi
fi

# PHP 설치 확인
if command -v php &> /dev/null; then
    echo "✅ PHP가 이미 설치되어 있습니다:"
    php -v
else
    echo "📦 PHP 설치 중..."
    brew install php
    
    # PATH에 추가
    if [ -f "/opt/homebrew/bin/php" ]; then
        export PATH="/opt/homebrew/bin:$PATH"
    elif [ -f "/usr/local/bin/php" ]; then
        export PATH="/usr/local/bin:$PATH"
    fi
fi

# PHP 버전 확인
if command -v php &> /dev/null; then
    echo ""
    echo "✅ PHP 설치 완료!"
    php -v
    echo ""
    echo "🚀 서버 실행 방법:"
    echo "   cd $(pwd)"
    echo "   php -S localhost:8000"
else
    echo "❌ PHP 설치에 실패했습니다."
    exit 1
fi

