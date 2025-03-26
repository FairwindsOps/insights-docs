package fairwinds

replicasRequired[actionItem] {
  # List the Kubernetes Kinds to which this policy should apply.
  kinds := {"Deployment", "StatefulSet"}
  # List severities for each of the above Kinds. Kind.
  severityByKind := {
    "StatefulSet": 0.4,
    "Deployment": 0.9,
  }
  # Iterate Kinds{} and only continue if input.kind is one of them.
  kind := kinds[_]
  input.kind == kind
  input.spec.replicas == 0
  # Set the severity based on the Kind.
  dynamicSeverity := severityByKind[input.kind]
  actionItem := {
    "title": "Deployment does not have replicas set",
    "description": "All workloads at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": dynamicSeverity,
  }
}