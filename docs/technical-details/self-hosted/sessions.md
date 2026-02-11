---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation: Session Keys"
---
# Session keys
In the default install we autogenerate session and cookie keys each time the application is
installed or upgraded, which could cause disruption for users. Instead you should generate
these tokens once and save them in a Kubernetes secret. In that case, set `options.autogenerateKeys` to `false`.

> Most secrets (with the exception of your PostgreSQL password) must be stored in a secret
> named `fwinsights-secrets`. This is the default value for `options.secretName`; override it
> if you want to use a different secret name.

We'll need the following keys:
* cookie_hash_key (64 chars)
* cookie_block_key (32 chars)
* session_auth_key (64 chars)
* session_encryption_key (32 chars)
* AES cypher key (32 chars)

An easy way to generate these keys is:
```bash
cookie_hash_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64 | base64 -w 0)
cookie_block_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 | base64 -w 0)
session_auth_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64 | base64 -w 0)
session_encryption_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 | base64 -w 0)
aes_base64_cypher_key=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 | base64 -w 0)
```

You should use these values to populate `secrets.yaml`:
```yaml
apiVersion: v1
data:
    COOKIE_HASH_KEY: TjZCbzAzMVJ0U1lXS2RPaE9sU0ZERDJJdXpTNFhLeG91VWFYdU9DcU9kTkpmenlFNWFsT29sajZ3VGpNbjNSSA==
    COOKIE_BLOCK_KEY: RDFNVVhWVzM4QllJd0Z5NXNIT1kxV1RrVWNweWRnbmM=
    SESSION_AUTH_KEY: NTczV0o0NGFBeGtXVzduZjZHV25FdFZMb0s5TE5SSWU3bG00YkNtaE93bHZUVW1VSXZUYW9ya2UzdHE2eFZXSA==
    SESSION_ENCRYPTION_KEY: ME1LeFRPdTYwOVU0YlVvUGVEUUdQYjZnbTlyZUh4b2I=
    AES_BASE64_CYPHER_KEY: ejdGNDVRYWdYRUh5TVc2UEZEbktFTEZ3NUxSQ2JQNFo=
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

```bash
kubectl apply -f secrets.yaml -n fairwinds-insights
```

For the example above, your `values.yaml` would look like:

```yaml
options:
  autogenerateKeys: false
  secretName: fwinsights-secrets
```

Consider using
[SOPS](https://github.com/mozilla/sops)
to encrypt your secrets file and store it in your git repository.

