# Permissions to Install the Agent

This is the required set of permissions to install the Fairwinds insights-agent and insights-admission charts. Note, this is not guaranteed to include any sub-charts that might be installed, however we have attempted to include resources for some additional dependencies. Please refer to the chart maintainers for that information.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fairwinds-insights-agent-installer
rules:
- apiGroups:
  - 'apps'
  resources:
  - deployments
  - daemonsets
  - replicasets
  - statefulsets
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - cronjobs
  - jobs
  verbs:
  - '*'
- apiGroups:
  - autoscaling
  resources:
  - horizontalpodautoscalers
  - verticalpodautoscalers
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - configmaps
  - persistentvolumeclaims
  - pods
  - serviceaccounts
  - services
  - secrets
  verbs:
  - '*'
- apiGroups:
  - cert-manager.io
  resources:
  - certificates
  - issuers
  verbs:
  - '*'
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  - validatingwebhookconfigurations
  verbs:
  - '*'
- apiGroups:
  - rbac.authorization.k8s.io
  - authorization.k8s.io
  resources:
  - clusterrolebindings
  - rolebindings
  - clusterroles
  - roles
  verbs:
  - '*'
- apiGroups:
  - policy
  resources:
  - poddisruptionbudgets
  verbs:
  - '*'
- apiGroups:
  - scheduling.k8s.io
  resources:
  - priorityclasses
  verbs:
  - '*'
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  - networkpolicies
  verbs:
  - '*'
```
