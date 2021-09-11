data "aws_route53_zone" "default" {
  name         = "lgtmgen.org"
  private_zone = false
}

resource "aws_route53_record" "certificate_validation" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = aws_acm_certificate.default.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.default.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.default.domain_validation_options.*.resource_record_value[0]]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "default" {
  certificate_arn         = aws_acm_certificate.default.arn
  validation_record_fqdns = [aws_route53_record.certificate_validation.fqdn]
}

resource "aws_route53_record" "default" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = local.domain
  type    = "A"
  records = [local.vercel_domain_ip]
  ttl     = 60
}
