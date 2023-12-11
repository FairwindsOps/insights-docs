# Cloud Costs Report (BETA)
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

## Google Cloud Provider (GCP) Configuration:

The GCP Report is built on [Google Cloud Billing](https://cloud.google.com/billing/docs/how-to/export-data-bigquery).

The first step is setting up Google Cloud Billing to export to BigQuery. To do this, follow these steps:
- Make sure Billing is enabled
- Enable BigQuery for data transfer 
- Create a BigQuery dataset
- Enable Cloud Billing export to the BigQuery dataset

All steps are described in detail at the link below:
[Set up Cloud Billing data export to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

We are going to use table `<projectname>.<datasetName>.gcp_billing_export_resource_v1_<BILLING_ACCOUNT_ID>` which should be created after following the steps above.

It may takes few days for Google to ingest all the billing data into BigQuery table. 

### Create service account to run BigQuery:
In GCP:
1. Go to IAM & Admin > Select Service Account
2. Click Create Service Account
3. Give the service account a name then "Create and Continue"
4. Grant roles: "BigQuery Data Viewer" and "BigQuery Job User" and click Done
5. Make sure Workload Identity is enabled: you can enable at cluster overview page. Autopilot is enabled by default.
Follow instructions from the page below:
[Use Workload Identity ](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)

For GKE Standard:
```bash
gcloud container clusters update your-cluster \
    --region=your-region \
    --workload-pool=your-project.svc.id.goog
```
```bash
gcloud container node-pools update your-pool \
    --cluster=your-cluster \
    --region=your-region \
    --workload-metadata=GKE_METADATA
```

6. Bind your GCP service account and Kubernetes cloudcosts service account:
[Use Workload Identity ](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
Example:
```bash
gcloud iam service-accounts add-iam-policy-binding {service-account-name}@{your-project}.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:{your-project}.svc.id.goog[insights-agent/insights-agent-cloudcosts]"
```

7. Annotate the insights-agent-cloudcosts service account:
Set the annotation in the [values.yaml](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml#L443-L444)
Example:
```yaml
cloudcosts:
  serviceAccount:
    annotations:
      iam.gke.io/gcp-service-account: {service-account-name}@{your-project}.iam.gserviceaccount.com
```

### Support for GKE Autopilot
Insights requires a Prometheus server to collect metrics for workload usage. Typically, this is a Prometheus server that is already running in a Kubernetes cluster, or a Prometheus server that is installed directly via the Insights Agent Helm Chart.

In GKE Autopilot, users are required to use the GCP Managed Prometheus offering to collect the require container metrics. GCP Managed Prometheus may increase your overall cloud costs and requires additional configuration for the Insights Agent to read those metrics:

#### 1. Collect Kubelet/cAdvisor metrics

GCP Managed Prometheus must be configured to scrape the Kubelet for Kubelet and cAdvisor metrics. This can be setup by editing the OperatorConfig resource as documented here:
[Install kubelet-cadvisor](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kubelet-cadvisor)

#### 2. Install `kube-state-metrics`

GCP Managed Prometheus needs a Kube State Metrics instance installed in order to get metrics from the Kubernetes API. Use the configuration in the "Install Kube State Metrics" section at link below to set this up: 
[Configure kube-state-metrics](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kube_state_metrics#install-exporter)

#### 3. Install the GCP Managed Prometheus frontend

Many GCP APIs require OAuth 2.0. The Insights Agent requires an "authentication proxy" to get metrics from GCP Managed Prometheus, and GCP provides a mechanism for this via their Prometheus frontend UI deployment. 

This section will outline the steps to set this up, and will refer to this guide: [Configure a query interface for Google Cloud Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus/query):

- You will need to create Google and Kubernetes service accounts, make sure they have the right permissions, and bind them together. In the guide referenced above, starting from [Set up a namespace](https://cloud.google.com/stackdriver/docs/managed-prometheus/query#namespace-setup) (if you would like a separate namespace for the frontend deployment), proceed through to the end of the [Authorize the service account section](https://cloud.google.com/stackdriver/docs/managed-prometheus/query#authorize-sa).

- Now, do step 1 in the [Deploy the frontend UI](https://cloud.google.com/stackdriver/docs/managed-prometheus/query#promui-deploy) section, with one change to the YAML. In the Deployment spec, add the name of the Kubernetes serviceAccount created in the previous step to spec.spec.serviceAccount: <name of Kubernetes service account>. If you like, you can run the port-forward command in step 2. to verify that the frontend is able to connect and get metrics from GCP Managed Prometheus.

#### 4. Point prometheus-collector to the frontend

This last step configures the prometheus-metrics report in the Insights Agent to get Prometheus metrics through the frontend service. Here are the Helm values to use in the Insights Agent `values.yaml`:
```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: "http://frontend.<frontend namespace>.svc:9090"
```
>NOTE: `<frontend namespace>` is the namespace where the Prometheus frontend UI has been installed.


## Cloud Costs Agent Configuration
Once the GCP resources are in place, you'll need to configure the
`cloudcosts` report in the Insights Agent to start uploading your cost data. Your `values.yaml` should include
the section below, replacing any values with your own.

```yaml
cloudcosts:
  enabled: true
  provider: gcp
  tagvalue: "my-gcp-cluster"
  gcp:
    projectname: "my-project"
    dataset: "insightscosts"
    billingaccount: "123456-777AAA-123456"      
```

* **provider**: provider must be `gcp`
* **tagkey**: optional. `tagkey` is the label name used on GCP to indicate that it's a cluster node. Default value is "goog-k8s-cluster-name".
* **tagvalue**: the value associated to the cluster name label for filtering. Ex: production, staging
* **projectname**: GCP project name
* **dataset**: dataset name you provided when you setup your BigQuery for Billing
* **billingaccount**: your Google Billing Account ID that you can get from Billing console, which is used to get the table name for BigQuery. Example: "1A2B3C-4D5E6F-7G8H9I"
