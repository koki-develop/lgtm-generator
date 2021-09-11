resource "aws_cloudfront_distribution" "lgtms" {
  enabled      = true
  aliases      = [local.images_domain]
  http_version = "http2"

  origin {
    origin_id   = aws_s3_bucket.lgtms.id
    domain_name = "${aws_s3_bucket.lgtms.id}.s3.amazonaws.com"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.lgtms.cloudfront_access_identity_path
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.images.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.lgtms.id
    viewer_protocol_policy = "redirect-to-https"
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    default_ttl            = 3600
    max_ttl                = 86400
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

resource "aws_cloudfront_origin_access_identity" "lgtms" {}
