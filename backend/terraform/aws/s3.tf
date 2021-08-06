resource "aws_s3_bucket" "lgtms" {
  bucket        = "${local.prefix}-lgtms"
  acl           = "private"
  force_destroy = var.stage != "prod"

  tags = { Name = "${local.prefix}-lgtms" }
}
