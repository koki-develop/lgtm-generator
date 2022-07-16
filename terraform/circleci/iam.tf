data "aws_iam_openid_connect_provider" "circleci" {
  url = "https://oidc.circleci.com/org/${var.circleci_organization_id}"
}
