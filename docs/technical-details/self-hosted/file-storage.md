---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation: Insights stores that data as a JSON file. See what it supports"
---
# File Storage
When clusters report back to Fairwinds Insights,
Insights stores that data as a JSON file. In order to use Insights, you'll need a place to store those
files. Currently we support two options

* Amazon S3
* [Minio](https://min.io/), an open source alternative to S3

In the default installation we use an ephemeral instance of Minio
but you'll want something more resilient when running in production to ensure you don't lose
any data.

## Amazon S3
To use Amazon S3, set your bucket name and region in `values.yaml`:

```yaml
reportStorage:
  strategy: s3
  bucket: your-bucket-name
  region: us-east-1
```

### IAM Policy

The IAM user or role used for S3 must have the following permissions (replace `your-bucket-name` with your bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::your-bucket-name"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": ["arn:aws:s3:::your-bucket-name/*"]
    }
  ]
}
```

### Credentials

You'll also need to specify your AWS access key and secret in `secrets.yaml`:
```yaml
apiVersion: v1
data:
    AWS_ACCESS_KEY_ID: aGVsbG93b3JsZA==
    AWS_SECRET_ACCESS_KEY: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

Note that if you're using other AWS integrations (like SES below) they will use the same AWS credentials.

## Minio
You can use your own instance of Minio or install a copy of Minio alongside Insights.

To have the Insights chart install Minio, you can configure it with the `minio` option:

```yaml
reportStorage:
  strategy: minio
minio:
  install: true
  accessKey: fwinsights
  secretKey: fwinsights
  persistence:
    enabled: true
```

In particular you should set `minio.persistence.enabled=true` to use a PersistentVolume for your
data. You can see the [full chart configuration here](https://github.com/helm/charts/tree/master/stable/minio)

To use an existing installation of Minio, just set `reportStorage.minioHost`
```yaml
reportStorage:
  strategy: minio
  minioHost: minio.example.com
```

