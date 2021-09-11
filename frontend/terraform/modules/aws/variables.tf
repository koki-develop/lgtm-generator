variable "stage" {
  type = string
}

locals {
  domain           = "lgtmgen.org"
  prefix           = "lgtm-generator-frontend-${var.stage}"
  vercel_domain_ip = "76.76.21.21"
}
