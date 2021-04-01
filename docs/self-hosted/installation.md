# Self-Hosted

> The self-hosted version of Fairwinds Insights is currently in alpha.
> The documentation is incomplete, and it is subject to breaking changes.

## Quickstart
These instructions are good for a quick demo of self-hosted Insights. For production-grade
installations, you'll want to use the instructions here to harden your installation.

```bash
helm repo add fairwinds-stable https://charts.fairwinds.com/stable
# These options are for quickstart only. See documentation for hardening tips
helm install fairwinds-insights fairwinds-stable/fairwinds-insights \
  --namespace fairwinds-insights \
  --create-namespace=true \
  --set image.tag=3.5.0-beta3 \
  --set options.autogenerateKeys=true \
  --set options.allowHTTPCookies=true \
  --set postgresql.sslMode=disable \
  --set postgresql.password=THISISASECRET
```

You can then access the dashboard via port-forward
```
kubectl port-forward -n fairwinds-insights-3 svc/fairwinds-insights-dashboard 8081:80
```

### Hardening
The default configuration will give you a working version of Fairwinds Insights.
But there are a few issues you'll want to solve before starting to use it seriously:
* [Database](database): set up a durable Postgres database for your data
* [File Storage](file-storage): set up a durable place to store files (S3 or Minio).
* [Ingress](ingress): host Insights behind a custom domain
* [Sessions](sessions): Generate permanent session keys in order to preserve running sessions when Insights is updated.
* [Email](email): In order to confirm email addresses and add new users, you'll need to set up an email provider.

Some of these things simply involve passing new data to the Helm chart. Others
may require the creation of new Kubernetes secrets.

For example, a hardened setup might look like this:

_values.yaml_
```yaml
fairwindsInsights:
  host: https://insights.example.com
  adminEmail: admin@example.com
ingress:
  enabled: true
  hostedZones:
    - insights.example.com
  annotations:
    kubernetes.io/ingress.class: "nginx-ingress"
email:
  strategy: smtp
  smtpHost: smtp.gmail.com
  smtpUsername: you@gmail.com
  smtpPort: "465"
postgresql:
  ephemeral: false
  passwordSecret: fwinsights-postgresql
  postgresqlUsername: your_username
  postgresqlDatabase: desired_database_name
  postgresqlHost: your-server.us-east-1.rds.amazonaws.com
  sslMode: require
  service:
    port: 5432
```

_secrets.yaml_
```yaml
apiVersion: v1
data:
    cookie_hash_key: TjZCbzAzMVJ0U1lXS2RPaE9sU0ZERDJJdXpTNFhLeG91VWFYdU9DcU9kTkpmenlFNWFsT29sajZ3VGpNbjNSSA==
    cookie_block_key: RDFNVVhWVzM4QllJd0Z5NXNIT1kxV1RrVWNweWRnbmM=
    session_auth_key: NTczV0o0NGFBeGtXVzduZjZHV25FdFZMb0s5TE5SSWU3bG00YkNtaE93bHZUVW1VSXZUYW9ya2UzdHE2eFZXSA==
    session_encryption_key: ME1LeFRPdTYwOVU0YlVvUGVEUUdQYjZnbTlyZUh4b2I=
    smtp_password: aGVsbG93b3JsZA==
    aws_access_key_id: aGVsbG93b3JsZA==
    aws_secret_access_key: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

_postgres-secret.yaml_
```yaml
apiVersion: v1
data:
    postgresql-password: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-postgresql
type: Opaque
```

