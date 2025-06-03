#!/bin/bash
set -e

# This script fixes deployment issues in the Pet Hospital project

# 1. Fix frontend nginx.conf
echo "Fixing frontend nginx.conf..."
cat > ./frontend/nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/pets {
        proxy_pass http://pet-service:3000/pets;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/hospitals {
        proxy_pass http://hospital-service:3000/hospitals;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/doctors {
        proxy_pass http://doctor-service:3000/doctors;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Billing service not yet implemented
    location /api/billing {
        return 501 '{"error": "Billing service not yet implemented"}';
        add_header Content-Type application/json;
    }

    # Insurance service not yet implemented
    location /api/insurance {
        return 501 '{"error": "Insurance service not yet implemented"}';
        add_header Content-Type application/json;
    }

    # Visit service not yet implemented
    location /api/visits {
        return 501 '{"error": "Visit service not yet implemented"}';
        add_header Content-Type application/json;
    }

    # Vet service not yet implemented
    location /api/vets {
        return 501 '{"error": "Vet service not yet implemented"}';
        add_header Content-Type application/json;
    }
}
EOF

# 2. Create ALB policy document
echo "Creating ALB policy document..."
cat > ./alb-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeRules",
        "elasticloadbalancing:DescribeListenerCertificates",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeTargetGroupAttributes",
        "elasticloadbalancing:DescribeListenerAttributes",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "elasticloadbalancing:ModifyTargetGroupAttributes",
        "elasticloadbalancing:ModifyListener",
        "elasticloadbalancing:ModifyRule",
        "elasticloadbalancing:SetSubnets",
        "elasticloadbalancing:SetSecurityGroups",
        "elasticloadbalancing:SetIpAddressType",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:CreateRule",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DeleteTargetGroup",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DeleteRule",
        "elasticloadbalancing:RegisterTargets",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:AddTags",
        "elasticloadbalancing:RemoveTags",
        "elasticloadbalancing:AddListenerCertificates",
        "elasticloadbalancing:RemoveListenerCertificates",
        "elasticloadbalancing:SetWebAcl",
        "ec2:DescribeVpcs",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeInstances",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeNatGateways",
        "ec2:DescribeRouteTables",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeAvailabilityZones",
        "ec2:CreateSecurityGroup",
        "ec2:CreateTags",
        "ec2:DeleteSecurityGroup",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:RevokeSecurityGroupIngress",
        "ec2:DeleteTags",
        "acm:ListCertificates",
        "acm:DescribeCertificate",
        "iam:CreateServiceLinkedRole",
        "wafv2:GetWebACL",
        "wafv2:GetWebACLForResource",
        "wafv2:AssociateWebACL",
        "wafv2:DisassociateWebACL",
        "shield:GetSubscriptionState",
        "shield:DescribeProtection",
        "shield:CreateProtection",
        "shield:DeleteProtection",
        "cognito-idp:DescribeUserPoolClient"
      ],
      "Resource": "*"
    }
  ]
}
EOF

# 3. Fix Kubernetes manifests
echo "Fixing Kubernetes manifests..."

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text || echo "304930966996")
AWS_REGION="us-west-2"
PROJECT_PREFIX="pet-hospital"

# Update frontend.yaml
echo "Updating frontend.yaml..."
sed -i.bak "s|\${ECR_REPOSITORY_URL}/frontend:latest|${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_PREFIX}-frontend:latest|g" ./k8s/base/frontend.yaml
sed -i.bak "s|image: .*dkr.ecr.*.amazonaws.com/pet-hospital-frontend:latest|image: ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_PREFIX}-frontend:latest|g" ./k8s/base/frontend.yaml

# Check if other service manifests exist and update them
for service in pet-service hospital-service doctor-service; do
  if [ -f "./k8s/base/${service}.yaml" ]; then
    echo "Updating ${service}.yaml..."
    sed -i.bak "s|\${ECR_REPOSITORY_URL}/${service}:latest|${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_PREFIX}-${service}:latest|g" ./k8s/base/${service}.yaml
    sed -i.bak "s|image: .*dkr.ecr.*.amazonaws.com/pet-hospital-${service}:latest|image: ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_PREFIX}-${service}:latest|g" ./k8s/base/${service}.yaml
  fi
done

# Clean up backup files
find ./k8s -name "*.bak" -delete

echo "Deployment fixes applied successfully!"
echo "Now commit these changes and push to your repository."
echo "Then run the GitHub workflow to deploy the fixed application."
