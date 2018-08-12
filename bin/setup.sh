#!/bin/sh

cp .github/.git_pre_push .git/hooks/pre-push
chmod +x .git/hooks/pre-push
git config --local commit.template ./.github/commit_template
npm install
brew cask install postgres
psql -d postgres -a -f setup-db.sql