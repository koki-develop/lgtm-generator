variable "stage" {
  type = string
}

locals {
  prefix = "lgtm-generator-backend-${var.stage}"
}
