variable "tables" {
  description = "List of DynamoDB tables to create"
  type = list(object({
    name         = string
    billing_mode = string
    hash_key     = string
    attributes = list(object({
      name = string
      type = string
    }))
  }))
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}
