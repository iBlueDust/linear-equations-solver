@echo off

:: https://emscripten.org/docs/getting_started/downloads.html
git clone https://github.com/emscripten-core/emsdk.git ./emsdk
cd %~dp0\emsdk
git pull
call emsdk install latest
call emsdk activate latest
call emsdk_env.bat
