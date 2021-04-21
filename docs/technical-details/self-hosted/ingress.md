# Ingress
The Helm chart comes with an Ingress object in order to expose a URL for connecting to Insights.
Here's an example configuration, using cert-manager and nginx-ingress.

Note that we allow up to `24m` of data in request bodies - this is important, as some of the
reports sent back from clusters can be fairly large.

_values.yaml_
```yaml
ingress:
  enabled: true
  hostedZones:
    - insights.example.com
  annotations:
    kubernetes.io/ingress.class: "nginx-ingress"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    kubernetes.io/ingress.ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/limit-connections: "250"
    nginx.ingress.kubernetes.io/limit-rps: "100"
    nginx.ingress.kubernetes.io/limit-rpm: "5000"
    nginx.ingress.kubernetes.io/proxy-body-size: 24m
```

