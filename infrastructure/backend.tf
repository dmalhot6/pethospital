terraform {
  # Note: Variables cannot be used in the backend configuration
  # If you need to change the region or prefix, you'll need to update this file
  # and run terraform init -reconfigure
  backend "s3" {
    bucket         = "pet-hospital-terraform-state-us-west-2"
    key            = "terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "pet-hospital-terraform-locks"
    encrypt        = true
  }
}
