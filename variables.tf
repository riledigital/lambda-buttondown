
# Variables
variable "myregion" {
  description = "AWS Region"
  type        = string
  default     = "us-east-2"
}

variable "buttondown_secret" {
  description = "Key for Buttondown API"
  type        = string
  default     = "UNASSIGNED"
}
