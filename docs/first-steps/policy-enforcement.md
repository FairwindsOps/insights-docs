---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to enable Policy Enforcement use cases with Fairwinds Insights"
---
# Policy Enforcement

At Fairwinds, we encourage organizations to take a phased approach to rolling out policy enforcement using the Insights Admission Controller. Specifically, we believe in the following stages:

-   Stage 1: Awareness
-   Stage 2: Enforcement
-   Stage 3: Compliance

Many organizations subscribe to the idea of policy enforcement, but may struggle with the implementation strategy. This is where Fairwinds can help. Using the stages above, policy enforcement increases over time, helping platform engineering teams to balance shipping fast while driving security and reliability improvements.

# Define Policy "Groups"

We recommend two groups of policies:

| **Policy Group**          | **Policies in scope**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cluster-wide policies** | Best practices that should apply to all workloads. General recommendation includes:<br />- Memory requests should be set <br />- CPU requests should be set <br />- Liveness probes should be set <br />- Readiness probes should be set <br />- Image pull policy should be “Always” <br />- Container should not have dangerous capabilities <br />- Image tag should be specified                                                                                                                                                                                                                                         |
| **Scoped policies**       | Policies that may be scoped/targeted to specific resources - such as specific workload labels, namespaces, etc.<br />- Container should not have insecure capabilities <br />- Host IPC should not be configured <br />- Host PID should not be configured <br />- Privilege escalation should not be allowed <br />- Should not be running as privileged <br />- Container should not be running as root<br /><br />Fairwinds supports additional policies, including those references under [<u>Profile Level 1 in the CNCF Mult-Tenancy Benchmark</u>](https://github.com/kubernetes-sigs/multi-tenancy/tree/master/benchmarks) |

# Implementing Enforcement Stages

| **Stage**                                                                         | **Admission Controller Mode** | **Policy Group**                          | **Report Violations for Running Workloads?** | **Enforce in CI/CD or Admission Controller?**                                    | **Tips**                                                                                                  |
| --------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Stage 1: Awareness<br />Alert on policy violations, but do not block.             | Passive                       | Cluster-wide Policies AND Scoped Policies | Yes                                          | CI/CD: Warn, but do not block<br />Admission: Do not block, but notify via Slack | Consider integrating Insights in CI/CD to provide these notifications earlier in the development process. |
| Stage 2: Enforcement<br />Begin blocking on cluster-wide policies.                | Active                        | Cluster-wide policies                     | Yes                                          | CI/CD: Block<br />Admission: Block via Admission Controller                      | Consider integrating Insights in CI/CD to provide these notifications earlier in the development process. |
|                                                                                   |                               | Scoped Policies                           | Yes                                          | CI/CD: Warn, but do not block<br />Admission: Do not block, but notify via Slack | Consider integrating Insights in CI/CD to provide these notifications earlier in the development process. |
| Stage 3: Compliance<br />Begin blocking on both cluster-wide and scoped policies. | Active                        | Cluster-wide Policies AND Scoped Policies | Yes                                          | CI/CD: Block<br />Admission: Block via Admission Controller                      | Consider integrating Insights in CI/CD to enforce policies                                                |

# Managing Exceptions

To configure a workload to bypass the Admission Controller, there are two possible options:

**Bypass Admission Controller using YAML Annotations**

-   RECOMMENDED: Add a specific annotation to that workload, and use an Automation Rule to bypass Admission Controller

    1.  With this option, security engineers and platform engineers are encouraged to use Git workflows to review/approve annotations added by development teams. This provides an audit trail for exceptions, and follows policy-as-code best practices.

**Automation Rule: `ignore-via-annotation`**

Context: Admission Controller

```javascript
//Bypass Admission Controller if an annotation such as 'insights.fairwinds.com/ignore: runAsRootAllowed' exists
policyException =
  ActionItem.ResourceAnnotations["insights.fairwinds.com/ignore"];

if (policyException) {
  exceptions = JSON.parse(policyException);
  if (exceptions.indexOf(ActionItem.EventType) !== -1) {
    //Reduce severity and resolve this ActionItem so it can bypass the Admission Controller
    ActionItem.Severity = LOW_SEVERITY;
    ActionItem.Resolution = WORKING_AS_INTENDED_RESOLUTION;
  }
}
```

**Bypass Admission Controller using an Allow List**

-   Create an "allow list" within an Insights Automation Rule that forces the Severity of that Action Item to Low.

    1.  With this option, security engineers and platform engineers carry the burden of maintaining an exception list. This is useful if development teams are still not fully responsible for their Kubernetes workload configurations.

**Automation Rule: ``ignore-via-allowlist``**

Context: Admission Controller

```javascript
exceptionList = new Array();

//Create an allowlist using EventType, ResourceNamespace, and ResourceName combination.
//Below is an exception example for kube-system workloads that need to run as root
exceptionList["runAsRootAllowed"] = [
  "kube-system/cert-manager",
  "kube-system/external-dns",
];

//Enforcement logic for the Allow List
if (exceptionList[ActionItem.EventType].length > 0) {
  if (
    exceptionList[ActionItem.EventType][
      ActionItem.ResourceNamespace + "/" + ActionItem.ResourceName
    ]
  ) {
    //Reduce severity and resolve this ActionItem so it can bypass the Admission Controller
    ActionItem.Severity = LOW_SEVERITY;
    ActionItem.Resolution = WORKING_AS_INTENDED_RESOLUTION;
  }
}
```

# Configuring Enforcement Stages in Insights
_Check back soon for additional steps and documentation!_
