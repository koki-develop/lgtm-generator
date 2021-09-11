data "aws_route53_zone" "default" {
  name         = "lgtmgen.org"
  private_zone = false
}

resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.default.id
  name    = local.api_domain
  type    = "A"

  alias {
    name                   = aws_api_gateway_domain_name.api.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api.cloudfront_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_certificate_validation" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = aws_acm_certificate.api.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.api.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.api.domain_validation_options.*.resource_record_value[0]]
  ttl     = 60
}

resource "aws_route53_record" "images" {
  zone_id = data.aws_route53_zone.default.id
  name    = local.images_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.images.domain_name
    zone_id                = aws_cloudfront_distribution.images.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "images_certificate_validation" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = aws_acm_certificate.images.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.images.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.images.domain_validation_options.*.resource_record_value[0]]
  ttl     = 60
}
