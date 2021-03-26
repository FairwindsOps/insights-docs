# Admission Controller
> **This feature is currently in beta**

Fairwinds Insights can also run as an Admission Controller -
it will reject any Kubernetes resources from entering your cluster
if they don't conform to your organization's policies.

## Requirements
The default installation requires [cert-manager](https://cert-manager.io/docs/installation/kubernetes/)
v1.0 or greater.

If you don't have cert-manager, or if you'd like to provide your own certificate for the webhook, you can use the
`caBundle` and `secretName` parameters to pass a CA Bundle and the location of a TLS certificate
stored in your cluster.

## Installation
To use the Admission Controller, install it on your cluster:

```bash
helm repo add fairwinds-stable https://charts.fairwinds.com/stable

kubectl create namespace insights-admission

helm upgrade --install insights-admission fairwinds-stable/insights-admission \
  --namespace insights-admission \
  --set insights.organization=acme-co \
  --set insights.cluster=staging \
  --set insights.base64token="dG9rZW4="
```

You can find the correct values for `organization`, `cluster`, and `base64token`
on your cluster's settings page, inside the `helm upgrade` command shown there.

To test it out, let's try and create a deployment that would create a `danger` Action Item
by allowing privilige escalation:

**bad-config.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox-deployment
  namespace: testing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: busybox
  template:
    metadata:
      labels:
        app: busybox
    spec:
      containers:
      - name: busybox
        image: busybox:1.32
        securityContext:
          allowPrivilegeEscalation: true
```

```bash
kubectl create ns testing
kubectl apply -f bad-config.yaml
```

You should see a message saying:
```
Error from server (Privilege escalation should not be allowed: Failure: true): error when creating "STDIN": admission webhook "insights.fairwinds.com" denied the request: Privilege escalation should not be allowed: Failure: true
```

## Resources
By default, the Admission Controller will monitor the following resources:
* `apps/(v1|v1beta1|v1beta2)`
  * Deployments
  * DaemonSets
  * StatefulSets
* `batch/(v1|v1beta1)`
  * Jobs
  * CronJobs
* `core/v1`
  * Pods
  * ReplicationControllers

If you'd like to add additional resources, you can use the `rules`
setting on the Helm chart:
```yaml
rules:
- apiGroups:
  - custom
  apiVersions:
  - v1
  operations:
  - CREATE
  - UPDATE
  resources:
  - customResource
  scope: Namespaced
```

## Configuration
You can fine-tune which checks are applied by the admission controller. Any check with a `danger` severity will instruct the Admission Controller to deny the deployment. 

Specifically, the following auditing tools
can be enabled or disabled as part of admission control:
* Polaris - checks for security and best practices
* OPA - apply custom policies to resources ([see docs](/reports/opa))
* Pluto - disallow resources that have been deprecated

> **IMPORTANT:** By default, each of these auditing tools are enabled in Admission Controller when you first set it up. Polaris, which has some out-of-the-box checks that default to `danger`, may cause some deployments to fail. See the Polaris section below for more information.

To enable or disable a particular report, run:
```bash
curl -X POST https://insights.fairwinds.com/v0/organizations/$org/admission/reports/$report \
  -H "Authorization: Bearer $token" \
  -d '{"enabled": false}'
```

where:
* `$report` is one of `polaris`, `opa`, or `pluto`
* `$org` is your organization's name in Insights
* `$token` is the admin token found on your organization settings page

### Polaris
You can also upload a custom
[Polaris configuration](https://polaris.docs.fairwinds.com/customization/checks/)
to set which checks are marked as `danger`, and will therefore cause a workload to be rejected.

> **IMPORTANT:** For a list of Polaris checks that default to `danger`, and therefore will cause the Admission Controller to deny a deployment, please see:
> * [Security](https://polaris.docs.fairwinds.com/checks/security/) checks (e.g., `securityContext.privileged`, `securityContext.capabilities`, `securityContext.allowPrivilegeEscalation`)
> * [Efficiency](https://polaris.docs.fairwinds.com/checks/efficiency/) checks
> * [Reliability](https://polaris.docs.fairwinds.com/checks/reliability/) checks (e.g., when an image tag is either not specified or `latest`.)

You can also use the Polaris configuration to write
[custom checks using JSON Schema](https://polaris.docs.fairwinds.com/customization/custom-checks/)

```
curl -X POST https://insights.fairwinds.com/v0/organizations/$org/admission/reports/polaris/config \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: text/yaml" \
  -d @polaris-config.yaml
```

### OPA
To create custom OPA policies for your organization, see the
[OPA docs](/reports/opa). To reject a resource, you'll need to ensure that
your OPA policy generates an Action Item with `severity >= 0.67`.
