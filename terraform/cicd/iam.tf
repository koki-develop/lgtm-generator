# TODO: remove
data "aws_iam_openid_connect_provider" "circleci" {
  url = "https://oidc.circleci.com/org/${var.circleci_organization_id}"
}

data "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
}

# TODO: remove
resource "aws_iam_role" "circleci" {
  name               = "${local.legacy_prefix}-role"
  assume_role_policy = data.aws_iam_policy_document.circleci_assume_role_policy.json
}

resource "aws_iam_role" "github_actions" {
  name               = "${local.prefix}-role"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role_policy.json
}

# TODO: remove
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

data "aws_iam_policy_document" "github_actions_assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github_actions.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:koki-develop/lgtm-generator:*"]
    }
  }
}

data "aws_iam_policy" "administrator_access" {
  arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# TODO: remove
resource "aws_iam_role_policy_attachment" "circleci-administrator_access" {
  role       = aws_iam_role.circleci.name
  policy_arn = data.aws_iam_policy.administrator_access.arn
}

resource "aws_iam_role_policy_attachment" "github_actions_administrator_access" {
  role       = aws_iam_role.github_actions.name
  policy_arn = data.aws_iam_policy.administrator_access.arn
}
