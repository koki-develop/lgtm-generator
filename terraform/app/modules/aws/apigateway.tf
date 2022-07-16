data "aws_api_gateway_rest_api" "api" {
  name = local.prefix_backend
}

resource "aws_api_gateway_domain_name" "api" {
  certificate_arn = aws_acm_certificate.api.arn
  domain_name     = local.api_domain
  security_policy = "TLS_1_2"
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = data.aws_api_gateway_rest_api.api.id
  stage_name  = var.stage
  domain_name = aws_api_gateway_domain_name.api.domain_name
}
