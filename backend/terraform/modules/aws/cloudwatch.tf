resource "aws_cloudwatch_dashboard" "api" {
  dashboard_name = "${local.prefix}-api"
  dashboard_body = jsonencode({
    widgets = [
      {
        height = 6
        properties = {
          metrics = [
            [
              "AWS/ApiGateway",
              "Count",
              "ApiName",
              data.aws_api_gateway_rest_api.api.name,
            ],
          ]
          period  = 300
          region  = "us-east-1"
          stacked = false
          stat    = "Sum"
          title   = "リクエスト数"
          view    = "timeSeries"
        }
        type  = "metric"
        width = 12
        x     = 0
        y     = 0
      },
      {
        height = 6
        properties = {
          metrics = [
            [
              "AWS/ApiGateway",
              "4XXError",
              "ApiName",
              data.aws_api_gateway_rest_api.api.name,
              "Stage",
              var.stage,
              {
                color = "#ff7f0e"
              },
            ],
          ]
          period  = 300
          region  = "us-east-1"
          stacked = false
          stat    = "Sum"
          title   = "4XX エラー"
          view    = "timeSeries"
        }
        type  = "metric"
        width = 12
        x     = 0
        y     = 6
      },
      {
        height = 6
        properties = {
          metrics = [
            [
              "AWS/ApiGateway",
              "5XXError",
              "ApiName",
              data.aws_api_gateway_rest_api.api.name,
              {
                color = "#d62728"
              },
            ],
          ]
          period  = 300
          region  = "us-east-1"
          stacked = false
          stat    = "Sum"
          title   = "5XX エラー"
          view    = "timeSeries"
        }
        type  = "metric"
        width = 12
        x     = 12
        y     = 6
      },
      {
        height = 6
        properties = {
          metrics = [
            [
              "AWS/ApiGateway",
              "レイテンシー",
              "ApiName",
              data.aws_api_gateway_rest_api.api.name,
              {
                color = "#17becf"
              },
            ],
          ]
          period  = 300
          region  = "us-east-1"
          stacked = false
          stat    = "Average"
          view    = "timeSeries"
        }
        type  = "metric"
        width = 12
        x     = 12
        y     = 0
      },
    ]
  })
}
