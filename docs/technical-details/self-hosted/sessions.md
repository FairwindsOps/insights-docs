---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation. Session Keys. "
---
# Session keys
In the default install, we autogenerate session and cookie keys each time the application is
installed or upgraded, which could cause disruption for users. Instead, you should generate
these tokens once and save them in a Kubernetes secret.

> Most secrets (with the exception of your PostgreSQL password) must stored in a secret
> named `fwinsights-secrets`

We'll need the following keys:
* cookie_hash_key (64 chars)
* cookie_block_key (32 chars)
* session_auth_key (64 chars)
* session_encryption_key (32 chars)

An easy way to generate these keys is:
```bash
cookie_hash_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64 | base64 -w 0)
cookie_block_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 | base64 -w 0)
session_auth_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64 | base64 -w 0)
session_encryption_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 | base64 -w 0)
```

You should use these values to populate _secrets.yaml_:
```yaml
apiVersion: v1
data:
    cookie_hash_key: TjZCbzAzMVJ0U1lXS2RPaE9sU0ZERDJJdXpTNFhLeG91VWFYdU9DcU9kTkpmenlFNWFsT29sajZ3VGpNbjNSSA==
    cookie_block_key: RDFNVVhWVzM4QllJd0Z5NXNIT1kxV1RrVWNweWRnbmM=
    session_auth_key: NTczV0o0NGFBeGtXVzduZjZHV25FdFZMb0s5TE5SSWU3bG00YkNtaE93bHZUVW1VSXZUYW9ya2UzdHE2eFZXSA==
    session_encryption_key: ME1LeFRPdTYwOVU0YlVvUGVEUUdQYjZnbTlyZUh4b2I=
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

```bash
kubectl apply -f secrets.yaml -n fwinsights
```
Consider using
[SOPS](https://github.com/mozilla/sops)
to encrypt your secrets file and store it in your git repository.

