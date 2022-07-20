---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation: Fairwinds Insights requires a Postgres database to store backend data"
---
# Database
Fairwinds Insights requires a Postgres database to store backend data, as well as a Timescale database for time-series data.

## Ephemeral Databases
By default, Insights will install Postgres via
[its Helm chart](https://github.com/helm/charts/tree/master/stable/postgresql).
We don't recommend running databases in Kubernetes due to the possibility of lost data.
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

Similarly, we will install an ephemeral Timescale using a subchart. Again, this is
not recommended for a production installation due to the possibility of data loss.

```yaml
timescale:
  replicaCount: 1
  clusterName: timescale
  ephemeral: true
  sslMode: require
  postgresqlHost: timescale
  postgresqlUsername: postgres
  postgresqlDatabase: fairwinds_timescale
  secrets:
    certificateSecretName: fwinsights-timescale-ca
    credentialsSecretName: fwinsights-timescale
  loadBalancer:
    enabled: false
  resources:
    limits:
      cpu: 1
      memory: 1Gi
    requests:
      cpu: 75m
      memory: 256Mi
```

## Bring-your-own Database
If you'd like to use your own Postgres instance (e.g. on Amazon RDS or Timescale.com),
you'll need to point the Insights chart to your database:

`values.yaml`:
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
timescale:
  ephemeral: false
  postgresqlHost: abc.def.vpc.tsdb.forge.timescale.com
  postgresqlDatabase: tsdb
  postgresqlUsername: tsdbadmin
  service:
    primary:
      port: 5432
    replica:
      port: 5432
  secrets:
    credentialsSecretName: fwinsights-postgresql
```

The password for both databases should be in a secret stored in Kubernetes. The secret
should include two keys:

* `postgresql-password` (if you're setting up an external Postgres)
* `timescale-password` (if you're setting up an external Timescale)

The name of the secret should match `passwordSecret` and `credentialsSecretName` above.

This example creates the secret with password `helloworld` for both databases:
```bash
echo -n "helloworld" | base64
# aGVsbG93b3JsZA==
```

`database-secrets.yaml`:
```yaml
apiVersion: v1
data:
    postgresql-password: aGVsbG93b3JsZA==
    timescale-password: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-postgresql
type: Opaque
```

```bash
kubectl apply -f postgres-secret.yaml -n fwinsights
```


