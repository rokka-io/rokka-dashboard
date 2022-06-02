#!/usr/bin/env bash

set -e

export PUBLIC_URL='/dashboard'

npm run build



aws s3 sync --delete --cache-control "max-age=300, public" --profile rokka --acl public-read  build/ s3://rokka-dashboard${PUBLIC_URL}
aws s3 cp --cache-control "max-age=300, public" --profile rokka --acl public-read  build/index.html s3://rokka-dashboard/

aws cloudfront --profile rokka create-invalidation  --distribution-id E389UMLNXZS9QN  --paths "${PUBLIC_URL}/*" > /dev/null

echo ""
echo "The site can be reached at: "
echo "https://rokka.io${PUBLIC_URL}"
echo ""
