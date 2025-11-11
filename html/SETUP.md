# PHP 서버 실행 가이드

## PHP 설치 확인

PHP가 설치되어 있지 않은 것 같습니다. 다음 방법으로 설치할 수 있습니다:

### 방법 1: Homebrew로 설치 (권장)

```bash
# Homebrew 설치 (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# PHP 설치
brew install php
```

### 방법 2: macOS 기본 PHP 사용

macOS에는 기본적으로 PHP가 포함되어 있지만, 경로가 다를 수 있습니다:

```bash
# PHP 경로 찾기
find /usr -name php 2>/dev/null
find /opt -name php 2>/dev/null
```

## 서버 실행 방법

PHP 설치 후:

```bash
cd html
php -S localhost:8000
```

또는:

```bash
cd /Users/bagjunhwa/Documents/웅진클라우드/html
php -S localhost:8000
```

## 브라우저 접속

서버 실행 후 브라우저에서 다음 주소로 접속:

**http://localhost:8000/index.php**

## 대안: 정적 HTML 버전

PHP가 없어도 기본적인 HTML/CSS/JS 버전으로 확인할 수 있습니다.
`index.html` 파일을 브라우저에서 직접 열면 됩니다.

