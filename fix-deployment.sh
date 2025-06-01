#!/bin/bash
set -e

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
AWS_REGION=us-west-2

# Update ECR secret
echo "Updating ECR registry secret..."
kubectl delete secret ecr-registry-secret -n pethospital-dev --ignore-not-found
aws ecr get-login-password --region ${AWS_REGION} | \
kubectl create secret docker-registry ecr-registry-secret \
  --docker-server=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com \
  --docker-username=AWS \
  --docker-password=$(aws ecr get-login-password --region ${AWS_REGION}) \
  --namespace=pethospital-dev

# Delete problematic pods
echo "Deleting problematic pods..."
kubectl delete pod -l app=frontend -n pethospital-dev --force --grace-period=0

# Restart deployments
echo "Restarting deployments..."
kubectl rollout restart deployment/frontend -n pethospital-dev
kubectl rollout restart deployment/pet-service -n pethospital-dev
kubectl rollout restart deployment/hospital-service -n pethospital-dev
kubectl rollout restart deployment/doctor-service -n pethospital-dev

echo "Deployment fix complete!"
