#!/usr/bin/env bash -

# Exit if any command fails
set -e

# First, cd to the directory of this script
# https://stackoverflow.com/a/10348989
pushd "$(dirname "${BASH_SOURCE[0]}")"

mkdir -p ./output

echo Starting...

# Compile
./emsdk/upstream/emscripten/emcc \
solver.c \
-o output/solver.generated.html \
-O3 \
--shell-file html_template/shell.html \
-s NO_EXIT_RUNTIME=1 \
-s ALLOW_MEMORY_GROWTH=1 \
-s "EXPORTED_RUNTIME_METHODS=['ccall']" \
-s "EXPORTED_FUNCTIONS=['_malloc', '_free']"

echo Compile complete

# Copy compiler output to Sveltekit static output
cp ./output/solver.generated.js ../../static
cp ./output/solver.generated.wasm ../../static

echo Copied output to @/static

# Return to caller's cd
popd

echo Done
