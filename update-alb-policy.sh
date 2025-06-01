#!/bin/bash
set -e

# This script updates the AWS Load Balancer Controller IAM policy

# Create the policy document
cat > alb-policy.json << 'EOF'
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

# Get the policy ARN
POLICY_ARN=$(aws iam list-policies --query "Policies[?PolicyName=='pet-hospital-eks-cluster-AWSLoadBalancerControllerIAMPolicy'].Arn" --output text)

if [ -n "$POLICY_ARN" ]; then
  # Create a new policy version
  aws iam create-policy-version --policy-arn $POLICY_ARN --policy-document file://alb-policy.json --set-as-default
  echo "IAM policy updated successfully"
else
  echo "IAM policy not found, creating new policy..."
  aws iam create-policy --policy-name pet-hospital-eks-cluster-AWSLoadBalancerControllerIAMPolicy --policy-document file://alb-policy.json
  echo "IAM policy created successfully"
fi
