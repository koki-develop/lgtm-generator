locals {
  app            = "lgtm-generator"
  prefix         = "${local.app}-${var.stage}"
  prefix_backend = "${local.app}-backend-${var.stage}"

  domain = "lgtmgen.org"

  sub_domain    = var.stage == "prod" ? "" : "${var.stage}."
  api_domain    = "${local.sub_domain}api.${local.domain}"
  images_domain = "${local.sub_domain}images.${local.domain}"
}
