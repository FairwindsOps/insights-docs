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

## Define Policy "Groups"

We recommend two groups of policies:

| **Policy Group**          | **Policies in scope (EventType)**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cluster-wide Policies** | Best practices that should apply to all workloads. General recommendation includes:<br />- Memory requests should be set (memoryRequestsMissing) <br />- CPU requests should be set (cpuRequestsMissing) <br />- Liveness probes should be set (livenessProbeMissing) <br />- Readiness probes should be set (readinessProbeMissing) <br />- Image pull policy should be “Always” (pullPolicyNotAlways) <br />- Container should not have dangerous capabilities (dangerousCapabilities) <br />- Image tag should be specified (tagNotSpecified)                                                                                                                                                                                                |
| **Scoped Policies**       | Policies that may be scoped/targeted to specific resources - such as specific workload labels, namespaces, etc.<br />- Container should not have insecure capabilities (insecureCapabilities) <br />- Host IPC should not be configured (hostIPCSet) <br />- Host PID should not be configured (hostPIDSet) <br />- Privilege escalation should not be allowed (privilegeEscalationAllowed) <br />- Should not be running as privileged (runAsPrivileged) <br />- Container should not be running as root (runAsRootAllowed)<br /><br />Fairwinds supports additional policies, including those references under [<u>Profile Level 1 in the CNCF Mult-Tenancy Benchmark</u>](https://github.com/kubernetes-sigs/multi-tenancy/tree/master/benchmarks) |

## Policy Enforcement Stages

Below is an example strategy for gradually rolling out Policy Enforcement in your organization.

> Generally speaking, a brand new cluster without active usage is usually the best time to introduce a policy enforcement strategy. This establishes a strong baseline of "best practices" from the start — lowering the cost of compliance on a go-forward basis.
<br /><br />
That said, the below strategy is designed for more real-world scenarios where policy enforcement is needed for existing, running clusters with active usage. The three enforcement stages allow you to gradually roll out policy to these users/teams so best practices can be applied over time.

| **Stage**                                                                             | **Admission Controller Mode** | **Policy Group**                          | **In-cluster Reporting?** | **Enforce in CI?**                | **Enforce in Admission Controller?** | **Tips**                                                                                                       |
| ------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Stage 1: Awareness**<br />Alert on policy violations, but do not block.             | Passive                       | Cluster-wide Policies AND Scoped Policies | Yes                                          | Warn (do not block)               | Warn (do not block)                  | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
| **Stage 2: Enforcement**<br />Begin blocking on Cluster-wide Policies.                | Active                        | Cluster-wide Policies                     | Yes                                          | Warn (do not block)               | **Block**                            | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
|                                                                                       |                               | Scoped Policies                           | Yes                                          | Warn (do not block)               | Warn (do not block)                  | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
| **Stage 3: Compliance**<br />Begin blocking on both Cluster-wide and Scoped Policies. | Active                        | Cluster-wide Policies                     | Yes                                          | **Block**                         | **Block**                            | Consider integrating Insights in CI to enforce Cluster-wide Policies                                           |
|                                                                                       |                               | Scoped Policies                           | Yes                                          | Warn (do not block)<br /> | **Block**                            | Warning in CI ensures teams can get feedback on code, but begin enforcing Scoped Policies at time of Admission |

# Implementing Enforcement Stages in Insights

In this guide, you will learn how to:

1.  Create your first [App Groups](/features/app-groups)
2.  Create your first [Policy Mappings](/features/policy-mappings) for Cluster-wide and Scoped Policies 
3.  Enable/disable Admission Controller
4.  Setup Insights in your [CI/CD pipeline](/features/infrastructure-as-code-scanning)
5.  Turn on enforcement by enabling the ["Focused" Scan Mode](/features/policy-mappings#scan-mode)

## Pre-work: Design your initial App Groups and Policy Mappings

Both [App Groups](/features/app-groups) and [Policy Mappings](/features/policy-mappings) are intentionally  flexible concepts, which makes it possible for you to design them around your business needs.

Here's an example of how most organizations get started:

### 1. Configure in-cluster reporting of policy violations

**1A. Create a `match-all` App Group that matches on everything** -- [example here](/features/app-groups#selects-all-resources)
|App Group Setting |   |
|--|--|
| App Group Name |`match-all`|
| Match | _everything_ |
| Exclude| _nothing_|


**1B. Create a Policy Mapping with broad reporting of in-cluster policy violations** - [example here](/features/policy-mappings#only-report-specific-policies-in-agent-context)

|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`cluster-wide-reporting`|
| Linked App Group| `match-all`|
| Policies | `polaris, trivy, nova, pluto, prometheus-metrics`|
|Context| Agent|
|Block| null|


### 2. Configure "Cluster-wide Policies" to enforce

**2B. Create a Policy Mapping with narrow enforcement of basic configuration hygiene at time of Admission** - [example here](/features/policy-mappings#enforce-a-baseline-policy-across-all-your-clusters)

|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`cluster-wide-enforcement`|
| Linked App Group| `match-all`|
| Policies | `polaris.memoryRequestsMissing, polaris.cpuRequestsMissing, ...`|
|Context| Admission|
|Block| false|


### 3. Configure "Scoped Policies" targeting specific Kubernetes resources
_Scoped Policies target resources associated with teams, apps, or business units with specific policies (such as security or reliability checks)._

**3A. Create an App Group focused on specific workloads** -- [example here](/features/app-groups#matching-a-very-strict-workload-by-every-available-option)

|App Group Setting |   |
|--|--|
| App Group Name |`payment-business-unit`|
| Match | `namespace: payment-apps` |
| Exclude| _nothing_ |


**3B. Create a Policy Mapping with specific policies, and link it to that App Group** -- [example here](/features/policy-mappings#scan-only-polaris-livenessprobemissing-policy) 

|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`scoped-policy-enforcement`|
| Linked App Group| `payment-business-unit`|
| Policies | `polaris.runAsRootAllowed, polaris.insecureCapabilities ...`|
|Context| Admission|
|Block| false|


### Important: Policy Mappings are additive

A single Kubernetes resource can be subject to multiple Policy Mappings. The `policies` within a Policy Mapping are additive, so that Kubernetes resource will be evaluated against the unique, aggregate list of policies across all those Policy Mappings. For example:
  1. `Policy-Mapping-A` has 2 policies `polaris.runAsRootAllowed`, `polaris.cpuRequestsRequired`
  2. `Policy-Mapping-B` has 2 policies `polaris.memoryRequestsRequired`, `polaris.cpuRequestsRequired`
  3. Workload `api-server` matches both Policy Mappings, and therefore will be scanned for 3 unique policies:
      - `polaris.runAsRootAllowed`
      - `polaris.cpuRequestsRequired`
      - `polaris.memoryRequestsRequired`

> NOTE: [It's possible for Kubernetes resources to be subject to conflicting `block` directives](/features/policy-mappings#when-a-kubernetes-resource-has-conflicting-block-directives)

## Implementing Stage 1: Awareness

_In this stage, we want to setup Insights to report in-cluster policy violations._

_We also want to report (but NOT block) Admission requests and CI scans that contain policy violations. This is to help with raising awareness of configuration standards._



### 2. Install Admission Controller

You can install the Admission Controller using the Install Hub. [Learn how to install Admission Controller here](/features/admission-controller).

### 3. Set Admission Controller to Passive Mode

Admission Controller is set to Passive Mode by default. [Learn more how to enable/disable Passive Mode in Admission Controller here](/features/admission-controller#installation).

### 4. OPTIONAL: Install Insights in your CI pipeline to warn users of Policy violations

[Learn how to setup the Insights Continuous Integration (CI) feature here.](/features/infrastructure-as-code-scanning)

> By default, the Insights CI integration is configured NOT to fail CI pipelines.
>
> Verify that your `fairwinds-insights.yaml` file at the root of your repo has the `options.setExitCode` set to `false`. [Learn more about gating pull requests with the Insights CI integration here](/features/infrastructure-as-code-scanning#gating-pull-requests).

### 5. Turn on "Focused" Scan Mode
Navigate to the Policies > Policy Mapping page and set the [Scan Mode](/features/policy-mappings#scan-mode) to "Focused". 

At this point, you will now see:
- In-cluster reporting of specific policies (via `cluster-wide-reporting` Policy Mapping)
- Reporting of (but NO blocking of) policy violations at time of Admission for both Cluster-wide Policies (via `cluster-wide-enforcement` Policy Mapping) and Scoped Policies (via `scoped-policy-enforcement` Policy Mapping)

* * *

## Implementing Stage 2: Enforcement

_In this stage, we want to enforce our Cluster-wide Policies at time of Admission, but only notify on Scoped Policy violations._

Before proceeding, please verify:

-   Admission Controller is installed and set to Passive Mode
-   The Insights CI integration continues to warn when Action Items are found in CI pipelines -- but will not block pipelines. Verify you have `options.setExitCode` set to `false`.

### 1. Update Policy Mappings to enforce Cluster-wide Policies at Admission
Return to your `cluster-wide-enforcement` Policy Mapping and update the `block` setting to `true`.
|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`cluster-wide-enforcement`|
|Block| **true**|

### 2. Disable Passive Mode in Admission Controller

Disabling Admission Controller is done on a per-cluster basis. [Learn more how to enable/disable Passive Mode in Admission Controller here](/features/admission-controller#installation).

### 3. OPTIONAL: Create Policy Exemptions
Please read: [Using App Groups to create Exemptions](#using-app-groups-to-create-exemptions).

* * *

## Implementing Stage 3: Compliance

_In this stage, we want to enforce our Cluster-wide Policies AND Scoped policies_

_Optionally, we can enable the Insights CI script to fail pipelines where Cluster-wide Policy issues are present._

Before proceeding, please verify:

-   Admission Controller is installed and Passive Mode is disabled
-   The Insights CI integration is installed on at least one pipeline and continues to have `options.setExitCode` set to `false`

### 1. Update Policy Mapping to enforce Scoped Policies at Admission
Return to your `scoped-policy-enforcement` Policy Mapping and update the `block` setting to `true`.
|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`scoped-policy-enforcement`|
|Block| **true**|

### 2. OPTIONAL: Configure Insights to enforce Cluster-wide Policies in CI
Return to your `cluster-wide-enforcement` Policy Mapping and update the `contexts` setting to `CI, Admission`.
|Policy Mapping Setting |   |
|--|--|
| Policy Mapping Name |`cluster-wide-enforcement`|
|Contexts| **`CI, Admission`**|

## Managing Exceptions

### Manual Exceptions for Admission Controller Requests
As a Platform Engineer, you may have come to rely on Admission Controllers to ensure deployments are consistently configured with your organization’s best practices. 

From time to time, there are workloads that may need to bypass admission controller — for example, some workloads may not need replicas set, or other workloads don’t need CPU limits. 

In these scenarios, you can Resolve or Snooze an Action Item within an admission request. 
- A Resolution, such as "Won't fix" will carry forward for that particular workload, and means that Action Item will not be evaluated in the decision-logic for blocking an Admission Request. 
- A Snoozed Resolution is time-based and temporary, meaning the exception you’re granting will go away after the Snooze period (e.g., 1 day).

You can always "undo" a Resolution by navigating to the most recent admission request and selecting "Resolve > None" or "Snooze > Unsnooze". 

### Using App Groups to create Exemptions
[App Groups] provide a way to "exclude" resources from everything gathered by the "matched" resources. You can see an [example here](/features/app-groups#appgroup-examples).

**Example: Global Namespace Exemptions**

For example, we created a `match-all` App Group in the [Pre-work section of this document](/features/policy-enforcement#1-configure-in-cluster-reporting-of-policy-violations). You may choose to list specific namespaces that should be excluded from reporting or enforcement by adding them to the "exclude" section of the App Group. This would essentially match all resources except for the namespaces you list.