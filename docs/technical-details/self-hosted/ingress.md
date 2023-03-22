---
meta:
  - name: description
    content: "Fairwinds Insights | Self-hosted Documentation: The Helm chart comes with an Ingress object to expose a URL for connecting to Insights"
---
# Ingress
The Helm chart comes with an Ingress object in order to expose a URL for connecting to Insights.
Here's an example configuration using cert-manager and nginx-ingress.

Note that we allow up to `24m` of data in request bodies. This is important as some of the
reports sent back from clusters can be fairly large.

`values.yaml`:
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

## Self-signed SSL Certificate

This section applies if the Insights Ingress uses a custom SSL certificate which is not chained to any intermediate or root Certificate Authority. These instructions do not apply if using an SSL certificate provided by Letsencrypt or another recognized certificate issuer.

### Self-signed SSL Certificate Validation - Insights Agent

The [Insights agent](/configure/agent/configuration) needs to be provided a certificate to validate communication with the Insights API. This can be accomplished by creating a Kubernetes Secret containing the certificate, then including Helm values that instruct the agent chart to use that certificate.

1. Create a Kubernetes Secret in each cluster where you will install the Insights agent. For example, to manually create a Secret using the local file myca.crt:  `kubectl create secret generic certificateauthority --from-file=ca.crt=myca.crt`
2. Include these Helm values when installing the `insights-agent` chart:

```
global:
  sslCertFile:
    secretName: certificateauthority
    secretKey: ca.crt
```

### Self-signed SSL Certificate Validation - CI/CD

The [CI/CD scan](/installation/ci/about) needs to be provided a certificate to validate communication with the Insights API. This can be accomplished by running our CI image with a volume that provides a certificate file, and setting an environment variable causing our `insights-ci` binary to include that certificate in its validation chain. Below are two examples of how this could be accomplished.

* If running our CI image via Docker, you can accomplish this by including the Docker flags `-e SSL_CERT_FILE=/ssl-cert-file/ca.crt` and `-v `mycert.crt:/ssl-cert-file/ca.crt`.

* Here is an example Dockerfile that illustrates building your own version of our CI image, including a custom certificate:

```
# This Dockerfile demonstrates how to create a custom Insights CI image,
# including a self-signed certificate authority.
# Replace the `latest` below, with a tag from
#   https://quay.io/repository/fairwinds/insights-ci?tab=tags
FROM quay.io/fairwinds/insights-ci:latest
# This myca.crt file represents your certificate authority.
COPY myca.crt /ssl-cert-file/ca.crt
# The SSL_CERT_FILE environment variable causes the above file to be used by
# our `ci` plugin, when communicating with the Insights API.
# Go binaries continue to also use the system-provided certificate authorities.
ENV SSL_CERT_FILE=/ssl-cert-file/ca.crt
```


