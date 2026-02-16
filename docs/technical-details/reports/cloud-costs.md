# Cloud Costs Report
The Fairwinds Cloud Costs report syncs your Cloud billing data with Insights so
it can know precisely what you're spending on nodes and use that
information to infer accurate workload costs.

We currently support AWS, GCP (including GKE Standard and GKE Autopilot), and Azure (Alpha).

## AWS Billing Integration

The AWS Costs Report is built on [AWS Costs and Usage Report](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html).

The first step is to create the Athena infrastructure using Terraform, CloudFormation, etc. The CUR report is created by AWS and stored in an AWS S3 bucket. 

The Athena process in AWS collects CUR data from S3 and makes it available as a SQL table that can be queried.

If you use AWS Glue, you can see the infrastructure previously created to connect S3 CUR data into Athena.

> Note: You will need to setup the one [CUR Processing Infrastructure Setup](#cur-processing-infrastructure-setup) per AWS account.

### CUR Processing Infrastructure Setup

Follow the steps below to setup your CUR Processing Infrastructure for each AWS account:

* Ensure nodes for different clusters are tagged in a consistent way
    * E.g. nodes in your staging cluster have tag `cluster=staging` and your production cluster nodes have `cluster=prod`
* Following the AWS CUR docs, create an S3 bucket where billing data can be stored
* Create an Athena database for querying the S3 data
* Create a Glue crawler to populate the data
* Finally, [configure the `cloudcosts` report within the `values.yaml` file of your Insights Agent](#configuring-the-insights-cloudcosts-report-for-aws)

>For convenience, we've provided some [Terraform scripts](#terraform), which can create the necessary AWS resources below.

### Configuring the Insights `cloudcosts` report for AWS 
Once the AWS resources are in place, you'll need to configure the
Insights Agent to start uploading your cost data from AWS.

Your Insights Agent `values.yaml` should include
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
    # tagprefix is prefix AWS CUR adds to your tag key to create a new column at Athena column
    tagprefix: 'resource_tags_user_'  # if not user custom tag, value should be resource_tags_
    region: us-east-1
    database: athena_cur_database
    table: fairwinds_insights_cur_report
    catalog: AwsDataCatalog
    workgroup: cur_athena_workgroup
```

* **database**: the database created on AWS Glue Data
* **table**: aws cur report name
* **tagkey**: tag key is the tag used on EC2 to indicate that it's a cluster node. Ex: `KubernetesCluster` (in case of Kops). The column name in Athena has a prefix resource_tags_user_. Also AWS applies pascal camel to split the tag name. In this example the column in Athena will be: resource_tags_user_kubernetes_cluster.
Tags with special characters must be replaced with underscores. Example: `aws:eks:cluster-name`  should be aws_eks_cluster_name.
* **tagprefix**: tagprefix is a prefix AWS adds to your tag in order to create Athena column. In this example the column in Athena will be: resource_tags_user_kubernetes_cluster.
Ex: `KubernetesCluster` (in case of Kops). The column name in Athena has a prefix resource_tags_user_. 
In the case you are using a tag provided by AWS the prefix can be a little bit different like resource_tags_.
Ex: if you are using standard tag `aws:eks:cluster-name` from AWS EKS you need to set:
```yaml
tagprefix = resource_tags_
tagkey    = aws_eks_cluster_name
```
Athena column in this case is resource_tags_aws_eks_cluster_name
* **tagvalue**: the value associated to the tag for filtering. Ex: production, staging
* **catalog**: default AWS Glue Catalog is AwsDataCatalog
* **workgroup**: workgroup created on Athena to be used on querying

### Terraform
Note that you may have to apply the files below twice in order to get them to sync fully.

#### provider.tf
```terraform
provider "aws" {
  region  = "us-east-1"
  profile = "default"
}
```

#### variables.tf
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

#### iam.tf
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

#### main.tf
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

## Google Cloud Provider (GCP) Billing Integration

The GCP Report is built on [Google Cloud Billing](https://cloud.google.com/billing/docs/how-to/export-data-bigquery).

The first step is setting up Google Cloud Billing to export to BigQuery. To do this, follow these steps:
- Make sure Billing is enabled
- Enable BigQuery for data transfer 
- Create a BigQuery dataset
- Enable Cloud Billing export to the BigQuery dataset

All steps are described in detail at the link below:
[Set up Cloud Billing data export to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

Fairwinds will use this table, which is created once you execute the above steps: `<projectname>.<datasetName>.gcp_billing_export_resource_v1_<BILLING_ACCOUNT_ID>` 

> NOTE: It may takes few days for Google to ingest all the billing data into BigQuery table. 

### Create service account to run BigQuery
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

6. Bind your GCP service account and Kubernetes cloud costs service account:
[Use Workload Identity ](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
Example:
```bash
gcloud iam service-accounts add-iam-policy-binding {service-account-name}@{your-project}.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:{your-project}.svc.id.goog[insights-agent/insights-agent-cloudcosts]"
```

7. Annotate the `insights-agent-cloudcosts` service account:
Set the annotation in the [values.yaml](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml#L443-L444)
Example:
```yaml
cloudcosts:
  serviceAccount:
    annotations:
      iam.gke.io/gcp-service-account: {service-account-name}@{your-project}.iam.gserviceaccount.com
```

### Configuring the Insights `cloudcosts` report for GCP 
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
* **projectname**: GCP project name, required if table is not provided
* **dataset**: dataset name you provided when you setup your BigQuery for Billing, required if table is not provided
* **billingaccount**: your Google Billing Account ID that you can get from Billing console, which is used to get the table name for BigQuery. Example: "1A2B3C-4D5E6F-7G8H9I", required if table is not provided
* **table**: you can provide the GCP BigQuery table instead of providing projectname/dataset/billingaccount

## Azure Billing Integration (Alpha)

The Azure Cloud Costs report uses [Azure Cost Management](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/) and [Azure AD Workload Identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) so the Insights Agent can read cost data without storing credentials. Your AKS cluster must have workload identity (OIDC) enabled.

Azure cost data is always sent in FOCUS format.

### Create Azure AD Workload Identity for cloud-costs

When using `cloudcosts` with `provider: azure`, the Insights Agent uses a federated credential. Create an **App registration** (or user-assigned managed identity) in Microsoft Entra ID and add a **federated identity credential** that matches your AKS cluster and the cloud-costs service account.

1. **Create an App registration** (or use an existing one) in [Microsoft Entra ID](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade). Note the **Application (client) ID** and **Directory (tenant) ID**; you will set these as `cloudcosts.azure.workloadIdentity.clientId` and `cloudcosts.azure.workloadIdentity.tenantId`.

2. **Get your AKS cluster OIDC issuer URL** (use the exact value, including a trailing slash if present):

   ```bash
   az aks show --name <cluster-name> --resource-group <resource-group> \
     --query "oidcIssuerProfile.issuerUrl" -o tsv
   ```

3. **Create a federated identity credential** on the App registration. In Azure Portal: **App registrations** → your app → **Certificates & secrets** → **Federated credentials** → **Add credential**. Or with Azure CLI (replace `<app-object-id>`, `<issuer-url>`, and `<credential-name>`):

   ```bash
   az ad app federated-credential create \
     --id <app-object-id> \
     --parameters '{
       "name": "<credential-name>",
       "issuer": "<issuer-url>",
       "subject": "system:serviceaccount:insights-agent:insights-agent-cloudcosts",
       "description": "AKS workload identity for insights-agent cloud-costs",
       "audiences": ["api://AzureADTokenExchange"]
     }'
   ```

   - **Subject** must be exactly: `system:serviceaccount:insights-agent:insights-agent-cloudcosts` (namespace `insights-agent`, service account `insights-agent-cloudcosts`). If you install the Insights Agent in a different namespace, use `system:serviceaccount:<namespace>:insights-agent-cloudcosts`.
   - **Issuer** must match the URL from step 2 exactly (including or excluding a trailing slash as returned).
   - **Audiences**: `api://AzureADTokenExchange`.

   To get the app object ID for `--id`: `az ad app show --id <client-id> --query id -o tsv`.

4. **Assign RBAC** so the identity can read cost data. Grant the app's service principal **Reader** and **Cost Management Reader** on the subscription:

   ```bash
   az role assignment create --role "Reader" \
     --assignee <client-id> --scope /subscriptions/<subscription-id>
   az role assignment create --role "Cost Management Reader" \
     --assignee <client-id> --scope /subscriptions/<subscription-id>
   ```

   Use the same **client ID** as `cloudcosts.azure.workloadIdentity.clientId` and your subscription ID as `cloudcosts.azure.subscription`.

### Configuring the Insights `cloudcosts` report for Azure

After the App registration and federated credential are in place, configure the Insights Agent. Your `values.yaml` should include:

```yaml
cloudcosts:
  enabled: true
  provider: azure
  azure:
    subscription: "<your-subscription-id>"
    workloadIdentity:
      clientId: "<application-client-id>"
      tenantId: "<directory-tenant-id>"
  # optional: tagkey/tagvalue for filtering
  # tagkey: ""
  # tagvalue: ""
  # days: 5
```

* **provider**: must be `azure`
* **subscription**: Azure subscription ID (required)
* **workloadIdentity.clientId**: Application (client) ID of the App registration (required)
* **workloadIdentity.tenantId**: Directory (tenant) ID (required)
* **tagkey** / **tagvalue**: optional; use to filter resources by tags
* **days**: number of days of cost data to query (default: 5)

No Kubernetes Secret is needed for Azure; authentication uses workload identity only.

## Terraform
Terraform for Google Cloud Provider (GCP) Billing Integration

#### versions.tf
```terraform
terraform {
  required_version = ">= 0.13"
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}
```

#### variables.tf
```terraform
variable "project_name" {
  type = string
}
```
#### gcp-cloud-costs.auto.tfvars
```terraform
project_name = "my-gcp-project"
```

#### main.tf
```terraform
resource "google_service_account" "bigqueryaccess" {
  account_id   = "bigqueryaccess"
  display_name = "Big query Access"
}

resource "google_project_iam_member" "bigquery_iam_member_dataViewer" {
  role    = "roles/bigquery.dataViewer"
  member  = "serviceAccount:${google_service_account.bigqueryaccess.email}"
  project = "${var.project_name}"
}

resource "google_project_iam_member" "bigquery_iam_member_jobUser" {
  role    = "roles/bigquery.jobUser"
  member  = "serviceAccount:${google_service_account.bigqueryaccess.email}"
  project = "${var.project_name}"
}

resource "google_service_account_iam_binding" "bigqueryaccess_workload_identity" {
  service_account_id = google_service_account.bigqueryaccess.name
  role               = "roles/iam.workloadIdentityUser"
  members = [
    "serviceAccount:${var.project_name}.svc.id.goog[insights-agent/insights-agent-cloudcosts]",
  ]
}

##########################################################
# Standard GKE only ADDITIONAL STEPS, ignore if Autopilot
# For standard GKE add these in your google_container_cluster resource
# To enable workload identity
#
#workload_identity_config {
#    identity_namespace = "${var.google_project}.svc.id.goog"
#}
# To enable workload identity in node pools
#workload_metadata_config {
#    node_metadata = "GKE_METADATA_SERVER"
#}
##########################################################

```
