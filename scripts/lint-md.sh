#!/usr/bin/env sh
if [ "$#" -eq 0 ]; then
  exec npx markdownlint-cli2 "**/*.md"
else
  exec npx markdownlint-cli2 "$@"
fi
