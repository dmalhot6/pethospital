resource "aws_dynamodb_table" "this" {
  count = length(var.tables)

  name           = var.tables[count.index].name
  billing_mode   = var.tables[count.index].billing_mode
  hash_key       = var.tables[count.index].hash_key
  
  dynamic "attribute" {
    for_each = var.tables[count.index].attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = merge(
    {
      Name = var.tables[count.index].name
    },
    var.tags
  )
}
