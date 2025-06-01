#!/bin/bash
set -e

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
AWS_REGION=us-west-2
ECR_REPO_NAME=pet-hospital-frontend

# Build the Docker image
echo "Building frontend Docker image..."
cd frontend
docker build -t ${ECR_REPO_NAME}:latest .

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Tag and push the image
echo "Tagging and pushing image to ECR..."
docker tag ${ECR_REPO_NAME}:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:latest

# Restart the frontend deployment
echo "Restarting frontend deployment..."
kubectl rollout restart deployment/frontend -n pethospital-dev

echo "Frontend rebuild and redeploy complete!"
