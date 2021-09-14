---
meta:
  - name: title
    content: Fairwinds Insights RBAC Config Check
  - name: description
    content: The Fairwinds Insights RBAC tab shows you a list of Roles and ClusterRoles in your cluster. Read the docs.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, RBAC
---
# RBAC
<!-- TODO: use npm -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">

The RBAC page shows you a list of `Roles` and `ClusterRoles` in your cluster.
It ranks these by their level of access:

Roles that don't have any associated bindings are treated as
being safe, and will appear below any roles with bindings.

<img :src="$withBase('/img/rbac.png')" alt="rbac tab">

You can also expand each role to view its individual permissions:

<img :src="$withBase('/img/rbac-expanded.png')" alt="rbac expanded">
