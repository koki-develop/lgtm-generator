resource "aws_s3_bucket" "images" {
  bucket        = "${local.prefix_backend}-images"
  force_destroy = false

  tags = {
    Name = "${local.prefix_backend}-images"
  }
}
