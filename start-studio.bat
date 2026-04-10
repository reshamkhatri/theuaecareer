@echo off
echo.
echo ============================================
echo   STARTING SANITY STUDIO
echo ============================================
echo.
echo Project: theuaecareer
echo Studio will open at: http://localhost:3333
echo.
echo Press Ctrl+C to stop the studio
echo ============================================
echo.

cd /d "%~dp0"
npm run sanity:dev

pause
