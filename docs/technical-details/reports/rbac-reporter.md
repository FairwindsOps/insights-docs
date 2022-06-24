---
meta:
  - name: title
    content: RBAC Reporter and Fairwinds Insights
  - name: description
    content: RBAC Reporter is used to generate the RBAC report feature in Fairwinds Insights. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, open source, RBAC Reporter
---

# RBAC Reporter
RBAC Reporter uploads a list of `Roles`, `ClusterRoles`, `RoleBindings` and `ClusterRoleBindings`
in your cluster. This information is used to generate the RBAC report.

RBAC Reporter does not create any Action Items.

## Sample Report 
RBAC Reporter reports contain a list of Roles, ClusterRoles, RoleBindings and ClusterRoleBindings.
```json
{
    "cluster_role_bindings": [
        {
            "metadata": {
                "annotations": {
                    "rbac.authorization.kubernetes.io/autoupdate": "true"
                },
                "creationTimestamp": "2020-01-30T10:36:18Z",
                "labels": {
                    "kubernetes.io/bootstrapping": "rbac-defaults"
                },
                "name": "cluster-admin",
                "resourceVersion": "96",
                "selfLink": "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/cluster-admin",
                "uid": "297abf64-0f2f-4263-b15d-7fb74f75f154"
            },
            "roleRef": {
                "apiGroup": "rbac.authorization.k8s.io",
                "kind": "ClusterRole",
                "name": "cluster-admin"
            },
            "subjects": [
                {
                    "apiGroup": "rbac.authorization.k8s.io",
                    "kind": "Group",
                    "name": "system:masters"
                }
            ]
        }
    ],
    "cluster_roles": [
        {
            "metadata": {
                "annotations": {
                    "rbac.authorization.kubernetes.io/autoupdate": "true"
                },
                "creationTimestamp": "2020-01-30T10:36:18Z",
                "labels": {
                    "kubernetes.io/bootstrapping": "rbac-defaults"
                },
                "name": "cluster-admin",
                "resourceVersion": "45",
                "selfLink": "/apis/rbac.authorization.k8s.io/v1/clusterroles/cluster-admin",
                "uid": "ad307e81-e1f3-4d57-a2f3-19dbfe196c9d"
            },
            "rules": [
                {
                    "apiGroups": [
                        "*"
                    ],
                    "resources": [
                        "*"
                    ],
                    "verbs": [
                        "*"
                    ]
                },
                {
                    "nonResourceURLs": [
                        "*"
                    ],
                    "verbs": [
                        "*"
                    ]
                }
            ]
        }
    ]
}
```