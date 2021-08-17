---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted install Documentation. "
---
# Installation

> The self-hosted version of Fairwinds Insights is currently in alpha.
> The documentation is incomplete, and it is subject to breaking changes.

> You'll need a code provided by the Fairwinds team in order to try out
> the self-hosted version of Insights. If you're interested,
> [schedule some time to chat](https://www.fairwinds.com/fairwinds-insights-demo)

## Quickstart
These instructions are good for a quick demo of self-hosted Insights. For production-grade
installations, you'll want to use the instructions here to harden your installation.

```bash
helm repo add fairwinds-stable https://charts.fairwinds.com/stable
# These options are for quickstart only. See documentation for hardening tips
helm install fairwinds-insights fairwinds-stable/fairwinds-insights \
  --namespace fairwinds-insights \
  --create-namespace=true \
  --set options.autogenerateKeys=true \
  --set options.allowHTTPCookies=true \
  --set postgresql.sslMode=disable \
  --set postgresql.password=THISISASECRET \
  --set installationCode="CODE PROVIDED BY FAIRWINDS"
```

You can then access the dashboard via port-forward
```
kubectl port-forward -n fairwinds-insights svc/fairwinds-insights-dashboard 8080:80
```

### Hardening
The default configuration will give you a working version of Fairwinds Insights.
But there are a few issues you'll want to solve before starting to use it seriously:
* [Database](/technical-details/self-hosted/database): set up a durable Postgres database for your data
* [File Storage](/technical-details/self-hosted/file-storage): set up a durable place to store files (S3 or Minio).
* [Ingress](/technical-details/self-hosted/ingress): host Insights behind a custom domain
* [Sessions](/technical-details/self-hosted/sessions): Generate permanent session keys in order to preserve running sessions when Insights is updated.
* [Email](/technical-details/self-hosted/email): In order to confirm email addresses and add new users, you'll need to set up an email provider.

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
    COOKIE_HASH_KEY: TjZCbzAzMVJ0U1lXS2RPaE9sU0ZERDJJdXpTNFhLeG91VWFYdU9DcU9kTkpmenlFNWFsT29sajZ3VGpNbjNSSA==
    COOKIE_BLOCK_KEY: RDFNVVhWVzM4QllJd0Z5NXNIT1kxV1RrVWNweWRnbmM=
    SESSION_AUTH_KEY: NTczV0o0NGFBeGtXVzduZjZHV25FdFZMb0s5TE5SSWU3bG00YkNtaE93bHZUVW1VSXZUYW9ya2UzdHE2eFZXSA==
    SESSION_ENCRYPTION_KEY: ME1LeFRPdTYwOVU0YlVvUGVEUUdQYjZnbTlyZUh4b2I=
    SMTP_PASSWORD: aGVsbG93b3JsZA==
    AWS_ACCESS_KEY_ID: aGVsbG93b3JsZA==
    AWS_SECRET_ACCESS_KEY: aGVsbG93b3JsZA==
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


