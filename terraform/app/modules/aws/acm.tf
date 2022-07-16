resource "aws_acm_certificate" "api" {
  domain_name       = local.api_domain
  validation_method = "DNS"
  tags              = { Name = "${local.prefix_backend}-api" }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "api" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [aws_route53_record.api_certificate_validation.fqdn]
}

resource "aws_acm_certificate" "images" {
  domain_name       = local.images_domain
  validation_method = "DNS"
  tags              = { Name = "${local.prefix_backend}-images" }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "images" {
  certificate_arn         = aws_acm_certificate.images.arn
  validation_record_fqdns = [aws_route53_record.images_certificate_validation.fqdn]
}

resource "aws_acm_certificate" "ui" {
  count = var.stage == "prod" ? 1 : 0

  domain_name       = local.domain
  validation_method = "DNS"
  tags              = { Name = local.prefix_frontend }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "ui" {
  count = var.stage == "prod" ? 1 : 0

  certificate_arn         = aws_acm_certificate.ui[0].arn
  validation_record_fqdns = [aws_route53_record.ui_certificate_validation[0].fqdn]
}
