#!/bin/bash
set -eo pipefail

rm -rf all-links.txt
for dir in ./docs/*; do
  if [[ $dir == "./docs/node_modules" ]]; then
    continue
  fi
  if [[ $dir == *".json" ]]; then
    continue
  fi
  grep -r "](" $dir | grep -v "](http" >> all-links.txt || true
  sed -ri 's/^.*]\(([^)]*)\).*$/\1/' all-links.txt
  # TODO: validate anchors
  sed -i 's/#.*//g' all-links.txt
done

missing=0
while read link; do
  file="./docs/$link.md"
  if ! test -f "$file"; then
    echo $link not found
    missing=1
  fi
done <all-links.txt

if [[ $missing -eq 1 ]]; then
  echo "Found some broken links. See above"
  exit 1
fi

echo "All links OK!"
