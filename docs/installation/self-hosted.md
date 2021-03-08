---
meta:
 - name: title
   content: Fairwinds Insights Self Hosted Installation
 - description:
   content: Installing Fairwinds Insights on your own infrastructure.
 - name: keywords
   content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Self Hosted Installation

Fairwinds Insights can be installed locally in your own Kubernetes cluster so that your data never has to leave your control.

## Configuration
Fairwinds Insights is installed and configured using Helm. To see the full list of options,
you can check out the
[Fairwinds Insights Helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/fairwinds-insights)

To get started quickly you can configure the following values.

`ingress.hostedZones` an Array of hostnames to listen for on the Ingress
`options.autoGenerateKeys` set to `true` to generate encryption values. If you use this option then sessions will be invalidated every time you do an upgrade. If this is false (by default) you need to create a secret named fwinsights-secrets with at a minimum the following fields.
```
apiVersion: v1
data:
    COOKIE_HASH_KEY:
    COOKIE_BLOCK_KEY:
    SESSION_AUTH_KEY:
    SESSION_ENCRYPTION_KEY:
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

`postgresql.sslMode` in order to use a postgres installation inside your cluster set this to `disable`
`postgresql.password` if this isn't specified then postgres will be created with a random password. This will break on an upgrade of this chart.
`postgresql.existingSecret` Use an existing secret for the Postgres password instead of creating a new one.
`ingressApi.enabled` Enable Ingress for the API
`ingressDashboard.enabled` Enable ingress for the Dashboard
`ingress.annotations` Set the following annotitions on each Ingress object.

To use an external Postgres.
`postgresql.ephemeral` to `false` to not install Postgres.
`postgresql.postgresqlUsername` the username to use to authenticate to Postgres.
`postgresql.postgresqlDatabase` the database to connect to in Postgres.
`postgresql.postgresqlHost` the hostname to use to connect to Postgres.
`postgresql.existingSecret` the name of the secret containing your Postgres password.

To use S3 for file storage.
In the `fwinsights-secrets` secret you need to include the following fields.
```
data:
    AWS_ACCESS_KEY_ID:
    AWS_SECRET_ACCESS_KEY:
```
`reportStorage.strategy` `s3`
`reportStorage.bucket` the name of the bucket in S3 to use.
`reportStorage.awsRegion` the region of AWS to connect to.
`minio.install` `false` so Minio doesn't get installed.

