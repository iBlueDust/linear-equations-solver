@echo off

:: %~dp0 refers to the directory of this script file

if not exist %~dp0\output (
	mkdir %~dp0\output
	
	if NOT %ERRORLEVEL% == 0 (
		echo Failed to create ./outputs folder
		echo Error Level: %ERRORLEVEL%
		exit /b %ERRORLEVEL%
	)
)

echo Starting...

:: Compile
call %~dp0\emsdk\upstream\emscripten\emcc ^
%~dp0\solver.c ^
-o %~dp0\output\solver.generated.html ^
-O3 ^
--shell-file %~dp0\html_template/shell.html ^
-s NO_EXIT_RUNTIME=1 ^
-s ALLOW_MEMORY_GROWTH=1 ^
-s "EXPORTED_RUNTIME_METHODS=['ccall']" ^
-s "EXPORTED_FUNCTIONS=['_malloc', '_free']"

if NOT %ERRORLEVEL% == 0 (
	echo Compile error
	echo Error Level: %ERRORLEVEL%
	exit /b %ERRORLEVEL%
)

echo Compile complete

:: Copy compiler output to Sveltekit static output
copy %~dp0\output\solver.generated.js %~dp0\..\..\static

if NOT %ERRORLEVEL% == 0 (
	echo Copy error
	exit /b %ERRORLEVEL%
)

copy %~dp0\output\solver.generated.wasm %~dp0\..\..\static

if NOT %ERRORLEVEL% == 0 (
	echo Copy error
	exit /b %ERRORLEVEL%
)

echo Copied output to @/static

echo Done
