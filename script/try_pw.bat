@echo off 


@REM 用法
@REM try_pw.bat
@REM try_pw.bat name
@REM try_pw.bat name repo_url
@REM try_pw.bat tabs https://gitee.com/engalar/mendix-pluggable-widget-tabs.git

if [%1]==[] (set repo=template) else (set repo=%1)
if [%2]==[] (set repo_url=https://gitee.com/engalar/mendix-pluggable-widget-%repo%.git) else (set repo_url=%2)

set target_dir=mendix-pluggable-widget-%repo%

setlocal
call :setESC

cls

chcp 65001


echo %ESC%[32m克隆前端组件项目%ESC%[0m
git clone --depth=1 %repo_url%

echo %ESC%[32m进入前端组件项目%ESC%[0m
cd %target_dir%

echo %ESC%[32m下载初始测试项目%ESC%[0m
call npm run testProject

echo %ESC%[32m还原测试项目和数据%ESC%[0m
call npm run restoreTestProject

echo %ESC%[32m启动测试项目%ESC%[0m
start tests/testProject/testProject.mpr

:setESC
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set ESC=%%b
  exit /B 0
)

exit /B 0