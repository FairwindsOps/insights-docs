# Database
Fairwinds Insights requires a Postgres database to store backend data.

## Ephemeral Postgres
By default, Insights will install Postgres via
[its helm chart](https://github.com/helm/charts/tree/master/stable/postgresql).
We don't recommend running databases in Kubernetes, due to the possibility of lost data.
If you use this option, keep in mind you'll be responsible for maintaining
and backing up that database.

```yaml
postgresql:
  ephemeral: true
  postgresqlPassword: fwinsightstmp
  postgresqlUsername: postgres
  postgresqlDatabase: fairwinds_insights
  service:
    port: 5432
  persistence:
    enabled: false
  replication:
    enabled: false
```

## BYO Postgres
If you'd like to use your own Postgres instance (e.g. on Amazon RDS),
you'll need to point the Insights chart to your database:

_values.yaml_
```yaml
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
The password for your postgres database should be in a secret stored in Kubernetes,
using the key `postgresql-password`. Make sure the `name` matches `passwordSecret` above.

This example creates a secret with the text `helloworld`:
```bash
echo -n "helloworld" | base64
# aGVsbG93b3JsZA==
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
```bash
kubectl apply -f postgres-secret.yaml -n fwinsights
```


