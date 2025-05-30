resource "null_resource" "install_argocd" {
  # Add explicit dependency on the EKS cluster
  triggers = {
    cluster_endpoint = var.cluster_endpoint
  }

  provisioner "local-exec" {
    command = <<-EOT
      # Sleep to ensure EKS cluster is fully ready
      sleep 30
      
      # Update kubeconfig to connect to the EKS cluster
      aws eks update-kubeconfig --name ${var.cluster_name} --region ${data.aws_region.current.name}
      
      # Create ArgoCD namespace
      kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
      
      # Install ArgoCD
      kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
      
      # Wait for ArgoCD to be ready
      kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
      
      # Create ArgoCD application for the pet hospital services
      cat <<EOF | kubectl apply -f -
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name: pethospital
        namespace: argocd
      spec:
        project: default
        source:
          repoURL: ${var.git_repository_url}
          targetRevision: HEAD
          path: k8s/overlays/${var.environment}
        destination:
          server: https://kubernetes.default.svc
          namespace: pethospital
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
          syncOptions:
            - CreateNamespace=true
      EOF
    EOT
  }
}

# Get current AWS region
data "aws_region" "current" {}
