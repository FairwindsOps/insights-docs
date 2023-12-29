# AWS Costs
The AWS Costs report syncs your AWS billing data to Insights so
it can know precisely what you're spending on nodes and use that
information to infer accurate workload costs.

The AWS Costs Report is built on [AWS costs and Usage Report](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html).

The first step is to create the Athena infrastructure using Terraform, CloudFormation, etc. The CUR report is created by AWS and stored in AWS S3.
The Athena process AWS collects CUR data from S3, and makes it available as a SQL table that can be queried.

If you go to AWS Glue you can see there the infrastructure previously created to connect S3 CUR data into Athena.

This requires some setup:
* Ensure nodes for different clusters are tagged in a consistent way
    * E.g. nodes in your staging cluster have tag `cluster=staging` and your production cluster nodes have `cluster=prod`
* From AWS CUR docs, create an S3 bucket where billing data can be stored
* Create an Athena database for querying the S3 data
* Create a Glue crawler to populate the data
* Finally, install the insights-agent with the aws-costs report configured

For convenience, we've provided some Terraform which can create the necessary AWS
resources below.

## Agent Configuration
Once the AWS resources are in place, you'll need to configure the
AWS agent to start uploading your cost data. Your `values.yaml` should include
the section below, replacing any values with your own.

```yaml
awscosts:
  enabled: true

  # Credentials to AWS can be done with either access keys or IRSA. Choose one of the following:

  # Credentials with AWS Access Keys:
  # The AWS credentials should come from the aws-costs-service-account created below.
  # We recommend creating the awscostssecret yourself and specify secretName, but you can
  # also pass awsAccessKeyId and awsSecretAccessKey directly to the helm chart.
  secretName: awscostssecret
  
  awsAccessKeyId: ''
  awsSecretAccessKey: ''

  # Credentials with IRSA:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT_ID:role/IAM_ROLE_NAME

  region: us-east-1
  database: athena_cur_database
  table: fairwinds_insights_cur_report
  catalog: AwsDataCatalog
  workgroup: cur_athena_workgroup

  # tagkey is the key used to tag your nodes based on which cluster they belong to
  tagkey: kubernetes_cluster
  # tagprefix is prefix AWS CUR adds to your tag key to create a new column at Athena column
  tagprefix: resource_tags_user_  # resource_tags_user_ is our default, but we may need to update this to resource_tags_ in the case you use tags provided by AWS, like aws_eks_cluster_name 
  # tagvalue is the value used for this particular cluster
  tagvalue: staging
```

* **database**: the database created on AWS Glue Data
* **table**: aws cur report name
* **tagkey**: tag key is the tag used on EC2 to indicate that it's a cluster node. Ex: `KubernetesCluster` (in case of Kops). The column name in Athena has a prefix resource_tags_user_. Also AWS applies pascal camel to split the tag name. In this example the column in Athena will be: resource_tags_user_kubernetes_cluster.
Tags with special characters must be replaced with underscores. Example: `aws:eks:cluster-name`  should be aws_eks_cluster_name.
* **tagprefix**: tagprefix is a prefix AWS adds to your tag in order to create Athena column. In this example the column in Athena will be: resource_tags_user_kubernetes_cluster.
Ex: `KubernetesCluster` (in case of Kops). The column name in Athena has a prefix resource_tags_user_. 
In the case you are using a tag provided by AWS the prefix can be a little bit different like resource_tags_.
Ex: if you are using standard tag `aws:eks:cluster-name` from AWS EKS you need to set:
tagprefix = resource_tags_
tagkey    = aws_eks_cluster_name
Athena column in this case is resource_tags_aws_eks_cluster_name
* **tagvalue**: the value associated to the tag for filtering. Ex: production, staging
* **catalog**: default AWS Glue Catalog is AwsDataCatalog
* **workgroup**: workgroup created on Athena to be used on querying


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

resource "aws_iam_user" "aws-costs-service-account" {
  name = "aws-costs-service-account"
  path = "/"
  tags = {
    tag-key = "service-account"
  }
}
resource "aws_iam_user_policy" "aws-costs-service-policy" {
  name = "aws-costs-service-policy"
  user = aws_iam_user.aws-costs-service-account.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults",
        "glue:GetDatabase",
        "glue:GetTable",
        "glue:GetPartition",
        "glue:GetPartitions",
        "glue:GetCrawler",
        "glue:GetTags"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
          "s3:GetBucketLocation",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:ListBucketMultipartUploads",
          "s3:ListMultipartUploadParts",
          "s3:PutObject"
      ],
      "Resource": [
          "arn:aws:s3:::${var.s3_bucket_name}",
          "arn:aws:s3:::${var.s3_bucket_name}/*"
      ]
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

