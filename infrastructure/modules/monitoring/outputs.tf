output "dashboard_name" {
  description = "Name of the CloudWatch dashboard"
  value       = aws_cloudwatch_dashboard.this.dashboard_name
}

output "dashboard_arn" {
  description = "ARN of the CloudWatch dashboard"
  value       = aws_cloudwatch_dashboard.this.dashboard_arn
}

output "alarm_arns" {
  description = "ARNs of the CloudWatch alarms"
  value = [
    aws_cloudwatch_metric_alarm.api_latency.arn,
    aws_cloudwatch_metric_alarm.error_rate.arn,
    aws_cloudwatch_metric_alarm.cpu_utilization.arn,
    aws_cloudwatch_metric_alarm.memory_utilization.arn
  ]
}
