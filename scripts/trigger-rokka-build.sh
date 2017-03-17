#!/usr/bin/env bash

body='{
"request": {
  "message": "Triggered from rokka-dashboard",
  "branch":"master"
}}'

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token $TRAVIS_TOKEN" \
  -d "$body" \
  https://api.travis-ci.org/repo/rokka-io%2Frokka-site/requests
