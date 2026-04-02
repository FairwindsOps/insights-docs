---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation: report file storage with RustFS, Amazon S3, or local disk"
---
# File Storage

When clusters report back to Fairwinds Insights, the server stores that data as files (for example JSON report payloads). You need a **report storage** backend that the application can read and write through an S3-style API or, for limited cases, local disk.

The Fairwinds Insights Helm chart configures this via `reportStorage.strategy`. Supported values are:

| Strategy | Use case |
| -------- | -------- |
| **`rustfs`** (default) | In-cluster **[RustFS](https://rustfs.com/)** (installed by the chart) **or** any external **S3-compatible** endpoint (RustFS, R2, etc.) |
| **`s3`** | **Amazon S3** using the default AWS SDK credential chain and **no** custom endpoint (typical AWS installs) |
| **`local`** | Local filesystem inside the pod (mainly development or fixtures) |

Invalid strategies cause the chart templates to **fail** at render time, so typos are caught early.

## Why chart 7.x uses RustFS instead of bundled MinIO

Fairwinds Insights chart **7.x** removed the bundled object-storage / **MinIO** subchart and defaults to **[RustFS](https://rustfs.com/)** for in-cluster report storage. That change reflects:

- **MinIO upstream lifecycle:** The [MinIO server `README.md` on GitHub](https://github.com/minio/minio/blob/master/README.md) states that **the repository is no longer maintained**, that the **community edition is distributed as source only** (no official pre-built community binaries), and that **legacy pre-built releases are no longer maintained**. Continuing to treat chart-bundled MinIO as the default would lean on a dependency whose public maintenance story has shifted.

- **A single supported default path:** Chart **7.x** standardizes on the **[RustFS Helm chart](https://charts.rustfs.com/)**, or on **Amazon S3** / **another S3-compatible store you operate**, so self-hosted docs and values map to one model. See the [fairwinds-insights chart changelog](https://github.com/FairwindsOps/charts/blob/master/stable/fairwinds-insights/CHANGELOG.md).

**If you upgrade from an older chart,** the `reportStorage.strategy: minio` value, `minio:` values, and `reportStorage.minioHost` **no longer exist**. Migrate to **`rustfs`** (in-cluster or external S3-compatible URL) or to **`s3`** for native AWS. The sections below describe each path.

## Default: in-cluster RustFS

For self-hosted installs, the chart defaults to installing the **[RustFS Helm chart](https://charts.rustfs.com/)** as a dependency (`rustfs.install: true`) and sets `reportStorage.strategy: rustfs`.

The chart wires the Insights workloads to:

- **`REPORT_STORAGE_STRATEGY=rustfs`**
- **`REPORT_STORAGE_S3_ENDPOINT`** pointing at the in-cluster RustFS service (for example `http://<release>-fw-rustfs-svc:9000`, where **`<release>` is the Helm release name**—not necessarily the Kubernetes namespace—and the suffix depends on `rustfs.nameOverride`, default `fw-rustfs`)
- **`REPORT_STORAGE_S3_ACCESS_KEY_ID`** / **`REPORT_STORAGE_S3_SECRET_ACCESS_KEY`** from the RustFS credentials secret (keys `RUSTFS_ACCESS_KEY` and `RUSTFS_SECRET_KEY` when RustFS is installed by this chart)

Default `values.yaml` in the chart skews RustFS toward a **small, single-node** footprint (standalone mode, one replica, ingress off). You should tune **persistent volume size** and **resources** for production; see upstream values with:

```bash
helm repo add rustfs https://charts.rustfs.com/
helm show values rustfs/rustfs
```

Example overrides in your own `values.yaml`:

```yaml
reportStorage:
  strategy: rustfs
  bucket: reports
  region: us-east-1

rustfs:
  install: true
  storageclass:
    name: ""              # set your StorageClass if the cluster default is not suitable
    dataStorageSize: 100Gi
  resources:
    requests:
      cpu: 200m
      memory: 512Mi
```

### Bucket creation job

When `rustfs.install` is true, the chart can run an optional **create-bucket** Job (`rustfs.createBucketJob`) that uses a short-lived `aws-cli` pod against the in-cluster endpoint. It is **on by default** (`rustfs.createBucketJob.enabled: true` in chart `values.yaml`). So that the bucket exists before you rely on the app, prefer:

```bash
helm upgrade --install ... --wait --wait-for-jobs
```

If you disable the job or use external storage, create the bucket yourself to match `reportStorage.bucket`.

## External S3-compatible storage (including external RustFS)

If RustFS (or another S3-compatible system) runs **outside** the cluster, turn off the subchart and point Insights at the API with explicit endpoint and credentials.

```yaml
reportStorage:
  strategy: rustfs
  bucket: reports
  region: us-east-1
  s3Endpoint: https://rustfs.example.com   # full URL to the S3 API
  s3CredentialsSecret: my-s3-credentials  # Kubernetes secret in the same namespace

rustfs:
  install: false
```

The secret referenced by `reportStorage.s3CredentialsSecret` must contain:

- **`accessKeyId`**
- **`secretAccessKey`**

(Those key names are used when `rustfs.install` is false; they differ from the in-cluster RustFS secret key names.)

If `strategy` is `rustfs` and `rustfs.install` is false, the chart **requires** `reportStorage.s3Endpoint` and `reportStorage.s3CredentialsSecret`; otherwise template rendering fails.

## Amazon S3 (native)

To use **AWS S3** with the default AWS credential provider chain (no custom S3 endpoint), set:

```yaml
reportStorage:
  strategy: s3
  bucket: your-bucket-name
  region: us-east-1

rustfs:
  install: false
```

Keep **`rustfs.install`** false so the chart does not deploy in-cluster RustFS and does not expect RustFS endpoint variables for this path.

### IAM policy

The IAM user or role used for S3 must have at least the following permissions (replace `your-bucket-name` with your bucket):

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

Provide **`AWS_ACCESS_KEY_ID`** and **`AWS_SECRET_ACCESS_KEY`** in the main Insights secret (by default `fwinsights-secrets`, configurable via `options.secretName`):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: fwinsights-secrets
type: Opaque
stringData:
  AWS_ACCESS_KEY_ID: "..."
  AWS_SECRET_ACCESS_KEY: "..."
```

If you use other AWS integrations (for example SES for email), they typically use the **same** secret keys unless you configure alternatives in the chart.

## Local storage

For `reportStorage.strategy: local`, the server uses a directory inside the container (for example for fixtures or development). Set `rustfs.install: false` when you are not using RustFS. See chart `values.yaml` for `reportStorage.fixturesDir` and related options.

## Summary

- Prefer **`rustfs`** + **`rustfs.install: true`** for the default self-hosted stack (RustFS subchart + PVC-backed data).
- Prefer **`rustfs`** + **`rustfs.install: false`** + **`s3Endpoint`** + **`s3CredentialsSecret`** for any external S3-compatible API.
- Use **`s3`** + **`rustfs.install: false`** + AWS credentials in **`fwinsights-secrets`** for standard Amazon S3.
- Chart **7.x** no longer supports MinIO via `strategy: minio` or embedded MinIO values; use RustFS or AWS S3 instead (see **Why chart 7.x uses RustFS instead of bundled MinIO**).

For the full list of knobs (ingress, affinity, image overrides, etc.), see the **[fairwinds-insights chart README](https://github.com/FairwindsOps/charts/tree/master/stable/fairwinds-insights)** and **`helm show values fairwinds-stable/fairwinds-insights`**.
