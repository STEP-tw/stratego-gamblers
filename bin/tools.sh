#!/usr/bin/env sh

if ! [ -x "$(command -v apm)" ]; then
  echo 'Error: atom is not installed.' >&2
else
  apm install editorconfig
fi

npm install -g mocha
npm install -g nyc
npm install -g eslint
npm install -g nodemon