#!/bin/bash

# Default values
PREFIX="pet-hospital"
REGION="us-west-2"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    --prefix)
      PREFIX="$2"
      shift
      shift
      ;;
    --region)
      REGION="$2"
      shift
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--prefix PREFIX] [--region REGION]"
      exit 1
      ;;
  esac
done

echo "Setting up Terraform state storage with prefix: ${PREFIX} in region: ${REGION}"

# Create S3 bucket for Terraform state
aws s3api create-bucket \
  --bucket ${PREFIX}-terraform-state-${REGION} \
  --region ${REGION} \
  --create-bucket-configuration LocationConstraint=${REGION}

# Enable versioning on the S3 bucket
aws s3api put-bucket-versioning \
  --bucket ${PREFIX}-terraform-state-${REGION} \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name ${PREFIX}-terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ${REGION}

echo "Terraform state storage has been set up successfully."
echo ""
echo "Important: Update backend.tf with these values if they differ from defaults:"
echo "  bucket         = \"${PREFIX}-terraform-state-${REGION}\""
echo "  region         = \"${REGION}\""
echo "  dynamodb_table = \"${PREFIX}-terraform-locks\""
