#!/usr/bin/env bash -

pushd "$(dirname "${BASH_SOURCE[0]}")"

# https://emscripten.org/docs/getting_started/downloads.html
git clone https://github.com/emscripten-core/emsdk.git ./emsdk
cd emsdk
git pull
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

popd
