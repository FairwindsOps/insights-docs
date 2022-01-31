# AWS Costs
The AWS Costs reports syncs your AWS billing data to Insights, so
Insights can know precisely what you're spending on nodes, and use that
information to infer accurate workload costs.

This requires some setup on your end:
* Ensure nodes for different clusters are tagged in a consistent way
    * E.g. nodes in your staging cluster have tag `cluster=staging`, and your production cluster nodes have `cluster=prod`
* Create an S3 bucket where billing data can be stored
* Create an Athena database for querying the S3 data
* Create a Glue crawler to populate the data
* Finally, install the insights-agent with the aws-costs report configured

For convenience, we've provided some Terraform which can create the necessary AWS
resources below.

## Agent Configuration
Once the AWS resources are in place, you'll need to configure the
AWS agent to start uploading your cost data. Your values.yaml should include
the section below, replacing any values with your own.

```yaml
awscosts:
  enabled: true
  secretName: awscostssecret
  # You only need to specify these if you haven't created the secret above manually
  awsAccessKeyId: ''
  awsSecretAccessKey: ''

  region: us-east-1
  database: athena_cur_database
  table: fairwinds_insights_cur_report
  catalog: AwsDataCatalog
  workgroup: cur_athena_workgroup

  # tagkey is the key used to tag your nodes based on which cluster they belong to
  tagkey: cluster
  # tagvalue is the value used for this particular cluster
  tagvalue: staging
```

## Terraform
Note that you may have to apply the files below twice in order to get them to sync fully.

### provider.tf
```terraform
provider "aws" {
  region  = "us-east-1"
  profile = "default"
}
```

### variables.tf
```terraform
variable "s3_bucket_name" {
  type    = string
  default = "fairwinds-insights-cur-report"
}
variable "s3_region" {
  type    = string
  default = "us-east-1"
}
variable "time_unit" {
  type    = string
  default = "HOURLY"
}
variable "aws_region" {
  type    = string
  default = "us-east-1"
}
```

### iam.tf
```terraform
resource "aws_iam_role" "crawler-service-role" {
  name               = "crawler-service-role"
  assume_role_policy = data.aws_iam_policy_document.crawler-assume-policy.json
}
data "aws_iam_policy_document" "crawler-assume-policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["glue.amazonaws.com"]
    }
  }
}
resource "aws_iam_role_policy_attachment" "AWSGlueServiceRole-attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
  role       = aws_iam_role.crawler-service-role.name
}
resource "aws_iam_policy" "cur-report-s3-access" {
  name   = "cur-report-s3-access"
  path   = "/"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": ["arn:aws:s3:::${var.s3_bucket_name}"],
      "Condition": {}
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.s3_bucket_name}/*"
      ]
    }
  ]
}
EOF
}
resource "aws_iam_role_policy_attachment" "cur-report-s3-access" {
  role       = aws_iam_role.crawler-service-role.name
  policy_arn = aws_iam_policy.cur-report-s3-access.arn
}
resource "aws_s3_bucket_policy" "s3-bucket-cur-report-policy" {
  bucket = aws_s3_bucket.cur_bucket.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "billingreports.amazonaws.com"
      },
      "Action": [
        "s3:GetBucketAcl",
        "s3:GetBucketPolicy"
      ],
      "Resource":"arn:aws:s3:::${var.s3_bucket_name}"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "billingreports.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::${var.s3_bucket_name}/*"
    }
  ]
}
EOF
}
```

### main.tf
```terraform
resource "aws_s3_bucket" "cur_bucket" {
  bucket = var.s3_bucket_name
  acl    = "private"
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}
resource "aws_glue_crawler" "cur_report_crawler" {
  database_name = "athena_cur_database"
  schedule      = "cron(0/15 * * * ? *)"
  name          = "cur_report_crawler"
  role          = "crawler-service-role"
  configuration = jsonencode(
    {
      Grouping = {
        TableGroupingPolicy = "CombineCompatibleSchemas"
      }
      CrawlerOutput = {
        Partitions = { AddOrUpdateBehavior = "InheritFromTable" }
      }
      Version = 1
    }
  )
  s3_target {
    path = format("s3://%s/fairwinds-insights-cur/fairwinds-insights-cur-report/", var.s3_bucket_name)
  }
}
resource "aws_athena_database" "athena_cur_database" {
  name   = "athena_cur_database"
  bucket = var.s3_bucket_name
  force_destroy = true
}
resource "aws_cur_report_definition" "fairwinds_insights_cur_report" {
  report_name                = "fairwinds-insights-cur-report"
  time_unit                  = var.time_unit
  format                     = "Parquet"
  compression                = "Parquet"
  additional_schema_elements = ["RESOURCES"]
  s3_bucket                  = var.s3_bucket_name
  s3_region                  = var.s3_region
  s3_prefix                  = "fairwinds-insights-cur"
  additional_artifacts       = ["ATHENA"]
  report_versioning          = "OVERWRITE_REPORT"
  depends_on                 = [aws_s3_bucket.cur_bucket]
}
resource "aws_athena_workgroup" "cur_athena_workgroup" {
  name = "cur_athena_workgroup"
  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true
    result_configuration {
      output_location = format("s3://%s/fairwinds-insights-cur/fairwinds-insights-cur-report/output", var.s3_bucket_name)
    }
  }
}
```
