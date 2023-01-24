resource "aws_s3_bucket" "images" {
  bucket        = "${local.prefix_backend}-images"
  force_destroy = false

  tags = {
    Name = "${local.prefix_backend}-images"
  }
}

resource "aws_s3_bucket_policy" "images" {
  bucket = aws_s3_bucket.images.id
  policy = data.aws_iam_policy_document.images_bucket_policy.json
}

data "aws_iam_policy_document" "images_bucket_policy" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.images.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.images.arn]
    }
  }
}

resource "aws_s3_bucket_public_access_block" "images" {
  bucket = aws_s3_bucket.images.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "images" {
  bucket = aws_s3_bucket.images.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
