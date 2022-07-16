locals {
  prefix_backend = "lgtm-generator-backend-${var.stage}"

  sub_domain    = var.stage == "prod" ? "" : "${var.stage}."
  api_domain    = "${local.sub_domain}api.lgtmgen.org"
  images_domain = "${local.sub_domain}images.lgtmgen.org"
}
