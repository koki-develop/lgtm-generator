resource "aws_acm_certificate" "api" {
  domain_name       = local.api_domain
  validation_method = "DNS"
  tags              = { Name = "${local.prefix}-api" }
}

resource "aws_acm_certificate_validation" "api" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [aws_route53_record.api_certificate_validation.fqdn]
}
