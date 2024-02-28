---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: About the App Groups."
---

# App Groups

App Groups is a way for organization owners to specify the Policies they'd like to run for a collection of Kubernetes resources. For example, a user may want to create an App Group for system resources, individual teams or a business unit.

### Benefits of App Groups
- Flexible Resource Selection: Create flexible App Groups that match on any Kubernetes metadata, like namespace, namespace labels, workload names, etc.

## AppGroup examples:

### Selects all resources:

```yaml
type: AppGroup
name: match-all
spec: {}
```

### Matching a very strict workload by every available option:

```yaml
type: AppGroup
name: match-strict
spec:
  match:
    -
      clusters: ["store-*"] # starts with "store-"
      containers: [api]
      kinds: [Deployment, StatefulSet, Pod] # select "Deployment", "StatefulSet" and "Pod"
      names: [api]
      namespaces: [prod]
      labels:
        - app: api
      namespaceLabels:
        - business_unit: store
```

### Same as above but we want to target all `kinds` expect `StatefulSet`:

```yaml
type: AppGroup
name: match-strict-expect-stateful-set
spec:
  match:
    -
      clusters: ["store-*"]
      containers: [api]
      names: [api]
      namespaces: [prod]
      labels:
        - app: api
      namespaceLabels:
        - business_unit: store
  exclude:
    -
      kind: [StatefulSet] 
```

## Managing App Groups

For managing App Groups via CLI, refer to [insights CLI - App Groups](/features/insights-cli#app-groups).