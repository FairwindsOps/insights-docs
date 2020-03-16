# RBAC
<!-- TODO: use npm -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">

The RBAC tab shows you a list of `Roles` and `ClusterRoles` in your cluster.
It ranks these by their level of access:

<i class="text-danger fa fa-fw fa-exclamation-triangle"></i> These roles are able to access secrets or edit RBAC permissions.

<i class="text-warning fa fa-fw fa-pen"></i> These roles are able to make changes to the cluster.

<i class="text-success fa fa-fw fa-book-open"></i> These roles are only able to read resources that aren't secrets.

Roles that don't have any associated bindings are treated as
being safe, and will appear below any roles with bindings.

<img :src="$withBase('/img/rbac.png')" alt="rbac tab">

You can also expand each role to view its individual permissions:

<img :src="$withBase('/img/rbac-expanded.png')" alt="rbac expanded">
