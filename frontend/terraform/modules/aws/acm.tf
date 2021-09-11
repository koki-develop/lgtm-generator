resource "aws_acm_certificate" "default" {
  domain_name       = local.domain
  validation_method = "DNS"
  tags              = { Name = local.prefix }
}
