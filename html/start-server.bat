@echo off
REM PHP 서버 시작 스크립트 (Windows)
REM 사용법: start-server.bat [포트번호]

set PORT=%1
if "%PORT%"=="" set PORT=8000

echo PHP 서버를 시작합니다...
echo 주소: http://localhost:%PORT%
echo 디렉토리: %CD%
echo.
echo 종료하려면 Ctrl+C를 누르세요
echo.

php -S localhost:%PORT%

