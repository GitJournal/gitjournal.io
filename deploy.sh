#!/usr/bin/env bash

set -eu

REPO_PATH=../GitJournal.github.io

rm -rf public
hugo
rm -rf "$REPO_PATH/*"
cp -r public/* "$REPO_PATH/"
cd "$REPO_PATH"
git add .
git commit -m "Update website"
git push origin master
