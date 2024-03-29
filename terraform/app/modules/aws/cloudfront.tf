resource "aws_cloudfront_distribution" "images" {
  enabled      = true
  aliases      = [local.images_domain]
  http_version = "http2"

  origin {
    origin_id                = aws_s3_bucket.images.id
    domain_name              = "${aws_s3_bucket.images.id}.s3.amazonaws.com"
    origin_access_control_id = aws_cloudfront_origin_access_control.images.id
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.images.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.images.id
    viewer_protocol_policy = "redirect-to-https"
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    default_ttl            = 86400
    max_ttl                = 604800
    min_ttl                = 0
    forwarded_values {
      query_string = false
      headers      = []
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "images" {
  name                              = "${local.prefix}-images"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_origin_access_identity" "images" {}
