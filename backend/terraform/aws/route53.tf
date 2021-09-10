data "aws_route53_zone" "default" {
  name         = "lgtmgen.org"
  private_zone = false
}

resource "aws_route53_record" "api_certificate_validation" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = aws_acm_certificate.api.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.api.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.api.domain_validation_options.*.resource_record_value[0]]
  ttl     = 60
}
