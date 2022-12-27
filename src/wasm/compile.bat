emsdk\emsdk_env.bat
emcc -o solver.html solver.c -O3 --shell-file html_template/shell.html -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']"