#!/bin/bash

set +e

#
# Set Colors
#

bold="\e[1m"
dim="\e[2m"
underline="\e[4m"
blink="\e[5m"
reset="\e[0m"
red="\e[31m"
green="\e[32m"
blue="\e[34m"

#
# Common Output Styles
#

h1() {
  printf "\n${bold}${underline}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
h2() {
  printf "\n${bold}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
info() {
  printf "${dim}➜ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
success() {
  printf "${green}✔ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
error() {
  printf "${red}${bold}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
warnError() {
  printf "${red}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
warnNotice() {
  printf "${blue}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
note() {
  printf "\n${bold}${blue}Note:${reset} ${blue}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}

typeExists() {
  if [ $(type -P $1) ]; then
    return 0
  fi
  return 1
}

if ! typeExists "git-chglog"; then
  error "git-chglog is not installed"
  note "To install run: go get -u github.com/git-chglog/git-chglog/cmd/git-chglog"
  exit 1
fi

VERSION="v$(grep '\"version\":' package.json | grep -v git-chglog | grep -v release.sh | awk -F '\"' '{print $4}')"

if [ "x${VERSION}x" = "xx" ]; then
  error "Must supply version number as first argument"
  exit 1
fi

h1 "Preparing release of $VERSION"

h2 "Updating distribution"
npm run build
VERSION=${VERSION} npm run minify:release

h2 "Updating docs"
npm run build:docs
if [[ "$(git status -s docs/** 2>/dev/null | wc -l)" == "0" ]]; then
  note "No changes to docs"
else
  note "Committing changes to docs"
  git add docs/**
  git commit -m "chore(docs): updating docs for version $VERSION"
fi

h2 "Updating CHANGELOG.md"
git-chglog --next-tag $VERSION -o CHANGELOG.md && git add CHANGELOG.md
git commit -m "chore(release): updating CHANGELOG for $VERSION"

note "Commands to run:"
note "1. git push origin main"
note "2. git push origin $VERSION"
note "3. npm publish"

success "Done!"
