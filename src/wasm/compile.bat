call emsdk\upstream\emscripten\emcc -o solver.generated.html solver.c -O3 --shell-file html_template/shell.html -s NO_EXIT_RUNTIME=1 -s ALLOW_MEMORY_GROWTH=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free']"
copy solver.generated.js ..\..\static
copy solver.generated.wasm ..\..\static