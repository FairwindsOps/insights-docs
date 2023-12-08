# Cloud Costs ( BETA )
The Cloud Costs report syncs your Cloud billing data to Insights so
it can know precisely what you're spending on nodes and use that
information to infer accurate workload costs.

We currently support AWS and GCP (Standard and Autopilot).

## AWS Configuration:

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

### Agent Configuration
Once the AWS resources are in place, you'll need to configure the
AWS agent to start uploading your cost data. Your `values.yaml` should include
the section below, replacing any values with your own.

```yaml
cloudcosts:
  enabled: true
  provider: aws
  # Credentials to AWS can be done with either access keys or IRSA. Choose one of the following:

  # Credentials with AWS Access Keys:
  # The AWS credentials should come from the aws-costs-service-account created below.
  # We recommend creating the awscostssecret yourself and specify secretName, but you can
  # also pass awsAccessKeyId and awsSecretAccessKey directly to the helm chart.
  secretName: awscostssecret

# Credentials with IRSA:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT_ID:role/IAM_ROLE_NAME
    # tagkey is the key used to tag your nodes based on which cluster they belong to
  tagkey: kubernetes_cluster
  # tagvalue is the value used for this particular cluster
  tagvalue: staging
  aws:  
    awsAccessKeyId: ''
    awsSecretAccessKey: ''
    region: us-east-1
    database: athena_cur_database
    table: fairwinds_insights_cur_report
    catalog: AwsDataCatalog
    workgroup: cur_athena_workgroup
```

* **database**: the database created on AWS Glue Data
* **table**: aws cur report name
* **tagkey**: tag key is the tag used on EC2 to indicate that it's a cluster node. Ex: KubernetesCluster (in case of Kops). The column name in Athena has a prefix resource_tags_user_. Also AWS applies pascal camel to split the tag name. In this example the column in Athena will be: resource_tags_user_kubernetes_cluster.
* **tagvalue**: the value associated to the tag for filtering. Ex: production, staging
* **catalog**: default AWS Glue Catalog is AwsDataCatalog
* **workgroup**: workgroup created on Athena to be used on querying

### Terraform
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

## Google Cloud Provider Configuration:

The GCP Report is built on [Google Cloud Billing](https://cloud.google.com/billing/docs/how-to/export-data-bigquery).

The first step is setting up Cloud Billing to export to BigQuery:
- Make sure Billing is enabled
- Enable BigQuery for Data transfer 
- Create a BigQuery dataset
- Enable Cloud Billing export to the BigQuery dataset
All steps are decribed detailed at the link below:
[Set up Cloud Billing data export to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

We are gonna use table "<projectname>.<datasetName>.gcp_billing_export_resource_v1_<BILLING_ACCOUNT_ID>" which should be created after following the steps above.
It may takes few days for Google to ingest all data into BigQuery table. You can keep checking out querying the BigQuery data at GCP console to see if the table is up-to-date.

### Create service account to run bq query:
- Go to IAM & Admin > Select Service Account
- Click Create Service Account
1) Give a name then "Create and Continue"
2) Grant roles: "BigQuery Data Viewer" and "BigQuery Job User" and hit Done
3) Click on you service account and add a private Key as JSON
4) Save and Download the JSON file. It will be something like:
```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "123a4a5d06bd78dc9f80bf1234567e12345fde3f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQ ............ ASDKJHASDKJHADKJHAKJSHDASDKJH=\n-----END PRIVATE KEY-----\n",
  "client_email": "bigqueryaccess@your-project.iam.gserviceaccount.com",
  "client_id": "13254654456564456456",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bigqueryaccess%40your-project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### Only if you are using GKE Autopilot
One of Insights' plugins, prometheus-collector, requires a Prometheus server to collect metrics that are needed for workload usage. Typically, this would be a Prometheus server that is already running in a Kubernetes cluster, or it would be installed through the Insights Helm Chart.
GKE Autopilot makes it hard to allow a self-installed Prometheus server, however it does have GCP Managed Prometheus set up by default. GCP Managed Prometheus can provide the metrics that are required, and prometheus-collector can retrieve metrics from GCP Managed Prometheus, with some additional configuration.
1. CollectKubelet/cAdvisor metrics
GCP Managed Prometheus must be configured to scrape the Kubelet for Kubelet and cAdvisor metrics. This can be set up by editing the OperatorConfig resource as documented here:
[Install kubelet-cadvisor](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kubelet-cadvisor)

2. Install kube-state-metrics
GCP Managed Prometheus needs a Kube State Metrics instance installed in order to get metrics from the Kubernetes API. Use the configuration in the "Install Kube State Metrics" section at link below to set this up. install Kube State Metrics. You only need to use this part of the document, you don't need the "Define rules and alerts" section.
[Configure kubec state metrics](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kube_state_metrics#install-exporter)

3. Install the GCP Managed Prometheus frontend
Many GCP APIs require OAuth 2.0. The prometheus-collector requires an "authentication proxy" to get metrics from GCP Managed Prometheus, and GCP provides a mechanism for this through their Prometheus frontend UI deployment. This section will outline the steps in this document that are needed to set this up.
First, you will need to create Google and Kubernetes service accounts, make sure they have the right permissions, and bind them together. Starting from Set up a namespace (if you would like a separate namespace for the frontend deployment), proceed through the Authorize the service account section.
Next, do step 1. in the Deploy the frontend UI section, with one change to the YAML. In the Deployment spec, add the name of the Kubernetes serviceAccount created in the previous step to spec.spec.serviceAccount: <name of Kubernetes service account>. If you like, you can run the port-forward command in step 2. to verify that the frontend is able to connect and get metrics from GCP Managed Prometheus.
[Configure a query interface for Google Cloud Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus/query)

4. Point prometheus-collector to the frontend
This last step configures the prometheus-collector to get Prometheus metrics through the frontend service. Here are the Helm values to set in our values.yaml:
```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: "http://frontend.<frontend namespace>.svc:9090"
```
where <frontend namespace> is the namespace where the frontend has ben installed.

Install the insights-agent with the cloudcosts report configured

## Agent Configuration
Once the GCP resources are in place, you'll need to configure the
cloudcosts agent to start uploading your cost data. Your `values.yaml` should include
the section below, replacing any values with your own.

```yaml
cloudcosts:
  enabled: true
  provider: gcp
  tagvalue: "my-gcp-cluster"
  gcp:
    applicationCredentials: '{"type": "service_account", "project_id": "my-project", "private_key_id": "12345", "private_key": "-----BEGIN PRIVATE KEY-----\nABC=\n-----END PRIVATE KEY-----\n", "client_email": "bigqueryaccess@my-project.iam.gserviceaccount.com",  "client_id": "1234567890", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bigqueryaccess%40my-project.iam.gserviceaccount.com",  "universe_domain": "googleapis.com"}'
    projectname: "my-project"
    dataset: "insightscosts"
    billingaccount: "123456-777AAA-123456"      
```

* **provider**: provider must be "gcp"
* **tagkey**: optional, tag key is the label name used on GCP to indicate that it's a cluster node. Default value is "goog-k8s-cluster-name".
* **tagvalue**: the value associated to the cluster name label for filtering. Ex: production, staging
* **projectname**: GCP project name
* **dataset**: dataset name you provided when you setup your BigQuery for Billing
* **billingaccount**: your Google Billing Account ID that you can get from Billing console, it's used to get the table name for BigQuery. It's something like "1A2B3C-4D5E6F-7G8H9I"
* **applicationCredentials**: key config from service account you have created for BigQuery access

