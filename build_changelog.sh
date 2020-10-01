#!/usr/bin/env bash

set -eu

INPUT_FILE=changelog.yml
OUTPUT_DIR='content/changelog'

mkdir -p $OUTPUT_DIR

VERSIONS=$(cat "$INPUT_FILE" | yj | jq -r '.[].version')

for v in $VERSIONS; do
    OUTPUT_FILE=$OUTPUT_DIR/$v.md
    echo "Building $OUTPUT_FILE"
    rm -f "$OUTPUT_FILE"

    echo '---' >>"$OUTPUT_FILE"
    echo "title: \"Version $v\"" >>"$OUTPUT_FILE"
    cat "$INPUT_FILE" | yj | jq ".[] | select(.version==\"$v\")" | yj -r >>"$OUTPUT_FILE"
    echo '---' >>"$OUTPUT_FILE"
done
