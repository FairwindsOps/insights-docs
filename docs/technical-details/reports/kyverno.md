---
meta:
  - name: title
    content: Kyverno and Fairwinds Insights
---
# Kyverno
Refer to the [Kyverno documentation](https://kyverno.io/docs/) for using Kyverno in your project.

## Setup
Here is an example of installing Kyverno with the `test-org` organization and `prod` cluster:

### Install `insights-agent` with helm and enable Kyverno plugin
```yaml
insights:
  organization: "test-org"
  cluster: "prod"
kyverno:
  enabled: true
```

```bash
kubectx kind-kind
helm repo update
helm upgrade --install insights-agent fairwinds-stable/insights-agent -f values.yaml \
  --version "2.23.*" \
  --create-namespace \
  --namespace insights-agent \
  --wait \
  --atomic

# update schedule
kubectl -n insights-agent patch cronjob kyverno -p '{"spec" : {"schedule" : "*/1 * * * *" }}'
```

### Create Kyverno Policies
```bash
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-pod-requests-limits/require-pod-requests-limits.yaml
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-probes/require-probes.yaml
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/disallow-latest-tag/disallow-latest-tag.yaml
```

### Create `deployment`
```bash
kubectl -n default apply -f nginx-deployment.yaml
```

### Check `PolicyReport` status
```bash
kubectl get policyreport -A
```

### Remediate
```bash
# fix requests/limits
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","resources":{"requests":{"memory":"64Mi","cpu":"250m"},"limits":{"memory":"128Mi","cpu":"500m"}}}]}}}}'
# fix pod probes
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"image":"nginx","imagePullPolicy":"IfNotPresent","name":"nginx","resources":{},"ports":[{"containerPort":80}],"readinessProbe":{"httpGet":{"path":"/","port":80}}}]}}}}'
# fix latest tag
kubectl -n default patch deployment nginx-deployment --type JSON -p '[{"op":"replace","path":"/spec/template/spec/containers/0/image","value":"nginx:1.14.2"}]'
```