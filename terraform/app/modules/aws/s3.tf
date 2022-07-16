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
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.images.iam_arn]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.images.arn}/*"]
  }
}
