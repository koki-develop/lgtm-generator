module "aws" {
  source = "./modules/aws"
  providers = {
    aws = aws
  }

  env = terraform.workspace
}
