data "aws_iam_openid_connect_provider" "circleci" {
  url = "https://oidc.circleci.com/org/${var.circleci_organization_id}"
}

resource "aws_iam_role" "circleci" {
  name               = "${local.prefix}-role"
  assume_role_policy = data.aws_iam_policy_document.circleci_assume_role_policy.json
}

data "aws_iam_policy_document" "circleci_assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    condition {
      test     = "StringLike"
      variable = "oidc.circleci.com/org/${var.circleci_organization_id}:sub"
      values   = ["org/${var.circleci_organization_id}/project/${var.circleci_project_id}/user/*"]
    }
    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.circleci.arn]
    }
  }
}

data "aws_iam_policy" "administrator_access" {
  arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "circleci-administrator_access" {
  role       = aws_iam_role.circleci.name
  policy_arn = data.aws_iam_policy.administrator_access.arn
}
