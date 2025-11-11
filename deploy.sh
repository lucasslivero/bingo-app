#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting deployment...${NC}"

# Get Terraform outputs
echo -e "${BLUE}Fetching infrastructure details...${NC}"
TERRAFORM_DIR="./terraform"  # Adjust if your terraform folder has a different name
BUCKET_NAME=$(terraform -chdir=$TERRAFORM_DIR output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform -chdir=$TERRAFORM_DIR output -raw cloudfront_distribution_id)

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}Error: Could not fetch Terraform outputs. Run 'terraform apply' first.${NC}"
    exit 1
fi

echo -e "${GREEN}Bucket: $BUCKET_NAME${NC}"
echo -e "${GREEN}Distribution: $DISTRIBUTION_ID${NC}"

# Build the application
echo -e "${BLUE}Building Vite application...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: dist directory not found. Build failed.${NC}"
    exit 1
fi

# Sync files to S3
echo -e "${BLUE}Syncing files to S3...${NC}"
aws s3 sync dist/ s3://$BUCKET_NAME \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "index.html" \
    --exclude "*.map"

# Upload index.html separately with no-cache
echo -e "${BLUE}Uploading index.html with no-cache...${NC}"
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
    --cache-control "public, max-age=0, must-revalidate" \
    --content-type "text/html"

# Invalidate CloudFront cache
echo -e "${BLUE}Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo -e "${GREEN}Invalidation created: $INVALIDATION_ID${NC}"

# Wait for invalidation (optional)
read -p "Wait for invalidation to complete? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Waiting for invalidation...${NC}"
    aws cloudfront wait invalidation-completed \
        --distribution-id $DISTRIBUTION_ID \
        --id $INVALIDATION_ID
    echo -e "${GREEN}Invalidation completed!${NC}"
fi

# Get website URL
WEBSITE_URL=$(terraform output -raw website_url)
echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${GREEN}Website URL: $WEBSITE_URL${NC}"
