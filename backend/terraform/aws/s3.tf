resource "aws_s3_bucket" "lgtms" {
  bucket        = "${local.prefix}-lgtms"
  acl           = "private"
  force_destroy = var.stage != "prod"

  tags = { Name = "${local.prefix}-lgtms" }
}

resource "aws_s3_bucket_policy" "lgtms" {
  bucket = aws_s3_bucket.lgtms.id
  policy = data.aws_iam_policy_document.lgtms_bucket_policy.json
}

data "aws_iam_policy_document" "lgtms_bucket_policy" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.lgtms.arn}/*"]
  }
}
