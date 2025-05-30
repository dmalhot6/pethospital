resource "aws_cloudwatch_dashboard" "this" {
  dashboard_name = "${var.cluster_name}-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/ApplicationELB", "TargetResponseTime", "LoadBalancer", "app/${var.cluster_name}-alb/*"]
          ]
          period = 300
          stat   = "Average"
          region = data.aws_region.current.name
          title  = "API Latency"
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/ApplicationELB", "HTTPCode_Target_5XX_Count", "LoadBalancer", "app/${var.cluster_name}-alb/*"],
            ["AWS/ApplicationELB", "HTTPCode_Target_4XX_Count", "LoadBalancer", "app/${var.cluster_name}-alb/*"]
          ]
          period = 300
          stat   = "Sum"
          region = data.aws_region.current.name
          title  = "HTTP Errors"
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/EKS", "cluster_failed_node_count", "ClusterName", var.cluster_name]
          ]
          period = 300
          stat   = "Maximum"
          region = data.aws_region.current.name
          title  = "Failed Nodes"
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 6
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/EKS", "pod_cpu_utilization", "ClusterName", var.cluster_name],
            ["AWS/EKS", "pod_memory_utilization", "ClusterName", var.cluster_name]
          ]
          period = 300
          stat   = "Average"
          region = data.aws_region.current.name
          title  = "Pod Resource Utilization"
        }
      }
    ]
  })
}

# API Latency Alarm
resource "aws_cloudwatch_metric_alarm" "api_latency" {
  alarm_name          = "${var.cluster_name}-api-latency"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "TargetResponseTime"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Average"
  threshold           = var.api_latency_threshold / 1000 # Convert from ms to seconds
  alarm_description   = "This metric monitors API latency"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.ok_actions
  
  dimensions = {
    LoadBalancer = "app/${var.cluster_name}-alb/*"
  }
  
  tags = var.tags
}

# Error Rate Alarm
resource "aws_cloudwatch_metric_alarm" "error_rate" {
  alarm_name          = "${var.cluster_name}-error-rate"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Sum"
  threshold           = var.error_rate_threshold
  alarm_description   = "This metric monitors API error rate"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.ok_actions
  
  dimensions = {
    LoadBalancer = "app/${var.cluster_name}-alb/*"
  }
  
  tags = var.tags
}

# CPU Utilization Alarm
resource "aws_cloudwatch_metric_alarm" "cpu_utilization" {
  alarm_name          = "${var.cluster_name}-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "pod_cpu_utilization"
  namespace           = "AWS/EKS"
  period              = 300
  statistic           = "Average"
  threshold           = var.cpu_utilization_threshold
  alarm_description   = "This metric monitors pod CPU utilization"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.ok_actions
  
  dimensions = {
    ClusterName = var.cluster_name
  }
  
  tags = var.tags
}

# Memory Utilization Alarm
resource "aws_cloudwatch_metric_alarm" "memory_utilization" {
  alarm_name          = "${var.cluster_name}-memory-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "pod_memory_utilization"
  namespace           = "AWS/EKS"
  period              = 300
  statistic           = "Average"
  threshold           = var.memory_utilization_threshold
  alarm_description   = "This metric monitors pod memory utilization"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.ok_actions
  
  dimensions = {
    ClusterName = var.cluster_name
  }
  
  tags = var.tags
}

# Get current AWS region
data "aws_region" "current" {}
