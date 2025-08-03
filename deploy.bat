@echo off
echo 正在部署到GitHub...

REM 檢查是否已經初始化Git
if not exist .git (
    echo 初始化Git倉庫...
    git init
)

REM 檢查是否已經添加遠程倉庫
git remote | findstr origin >nul
if errorlevel 1 (
    echo 添加遠程倉庫...
    git remote add origin https://github.com/xiaonaofua/exchangeRates.git
) else (
    echo 更新遠程倉庫URL...
    git remote set-url origin https://github.com/xiaonaofua/exchangeRates.git
)

REM 添加所有文件
echo 添加文件到Git...
git add .

REM 提交更改
echo 提交更改...
git commit -m "Initial commit: Multi-currency real-time exchange rate converter with multi-language support"

REM 設置主分支
echo 設置主分支...
git branch -M main

REM 推送到GitHub
echo 推送到GitHub...
git push -u origin main

echo.
echo 部署完成！
echo 請前往 GitHub 倉庫設置頁面啟用 GitHub Pages
echo 倉庫地址: https://github.com/xiaonaofua/exchangeRates
echo 設置完成後可通過以下地址訪問: https://xiaonaofua.github.io/exchangeRates/
echo.
pause
