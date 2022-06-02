#!/usr/bin/env bash

set -e

aws s3 sync --delete --cache-control "max-age=300, public" --profile rokka --acl public-read  dist/ s3://rokka-dashboard/dashboard/
aws s3 cp --cache-control "max-age=300, public" --profile rokka --acl public-read  dist/index.html s3://rokka-dashboard/

aws cloudfront --profile rokka create-invalidation  --distribution-id E389UMLNXZS9QN  --paths '/dashboard/*' > /dev/null

echo ""
echo "The site can be reached at: "
echo "https://rokka.io/dashboard/"
echo ""
