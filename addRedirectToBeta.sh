aws s3 sync --delete --cache-control "max-age=300, public" --profile rokka --acl public-read public/redirect/  s3://rokka-dashboard/dashboard-beta/
aws cloudfront --profile rokka create-invalidation  --distribution-id E389UMLNXZS9QN  --paths "/dashboard-beta/*" > /dev/null
