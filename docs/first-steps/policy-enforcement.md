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

| **Stage**                                                                             | **Admission Controller Mode** | **Policy Group**                          | **Report Violations for Running Workloads?** | **Enforce in CI?**                | **Enforce in Admission Controller?** | **Tips**                                                                                                       |
| ------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Stage 1: Awareness**<br />Alert on policy violations, but do not block.             | Passive                       | Cluster-wide Policies AND Scoped Policies | Yes                                          | Warn (do not block)               | Warn (do not block)                  | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
| **Stage 2: Enforcement**<br />Begin blocking on Cluster-wide Policies.                | Active                        | Cluster-wide Policies                     | Yes                                          | Warn (do not block)               | **Block**                            | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
|                                                                                       |                               | Scoped Policies                           | Yes                                          | Warn (do not block)               | Warn (do not block)                  | Consider integrating Insights in CI to provide these notifications earlier in the development process.         |
| **Stage 3: Compliance**<br />Begin blocking on both Cluster-wide and Scoped Policies. | Active                        | Cluster-wide Policies                     | Yes                                          | **Block**                         | **Block**                            | Consider integrating Insights in CI to enforce Cluster-wide Policies                                           |
|                                                                                       |                               | Scoped Policies                           | Yes                                          | Warn (do not block)<br /> | **Block**                            | Warning in CI ensures teams can get feedback on code, but begin enforcing Scoped Policies at time of Admission |

# Implementing Enforcement Stages in Insights

In this guide, you will learn how to:

1.  Enable/disable Admission Controller
2.  Setup Insights in your [CI/CD pipeline](https://insights.docs.fairwinds.com/installation/ci/insights-ci-script/)
3.  Use the [Insights CLI](https://insights.docs.fairwinds.com/configure/cli/cli/) to manage [Policy Configurator](https://insights.docs.fairwinds.com/configure/cli/settings/)
4.  [Create Automation Rules](https://insights.docs.fairwinds.com/configure/automation/rules/#writing-automation-rules) to fine-tune your policy enforcement behaviors in CI and at time of Admission

## Implementing Stage 1: Awareness

_In this stage, we want to warn users when their YAML code or Admission requests contain misconfigurations found in our Cluster-wide Policies or Scoped Policies._

_The simplest way to do this is enabling Admission Controller in your cluster and setting it to Passive Mode (which is enabled by default). Additionally, you can install Insights in your CI pipeline to surface misconfigurations sooner in the process._

### 1. Install Admission Controller

You can install the Admission Controller using the Install Hub. [Learn how to install Admission Controller here](https://insights.docs.fairwinds.com/installation/admission/setup/).

### 2. Set Admission Controller to Passive Mode

Admission Controller is set to Passive Mode by default. [Learn more how to enable/disable Passive Mode in Admission Controller here](https://insights.docs.fairwinds.com/installation/admission/setup/#installation).

### 3. OPTIONAL: Install Insights in your CI pipeline to warn users of Policy violations

[Learn how to setup the Insights Continuous Integration (CI) feature here.](https://insights.docs.fairwinds.com/installation/ci/insights-ci-script/)

> By default, the Insights CI integration is configured NOT to fail CI pipelines.
>
> Verify that your `fairwinds-insights.yaml` file at the root of your repo has the `options.setExitCode` set to `false`. [Learn more about gating pull requests with the Insights CI integration here](https://insights.docs.fairwinds.com/configure/ci/configuration/#gating-pull-requests).

* * *

* * *

## Implementing Stage 2: Enforcement

_In this stage, we want to enforce our Cluster-wide Policies at time of Admission, but only notify on Scoped Policy violations._

Before proceeding, please verify:

-   Admission Controller is installed and set to Passive Mode
-   The Insights CI integration continues to warn when Action Items are found in CI pipelines -- but will not block pipelines. Verify you have `options.setExitCode` set to `false` .

### 1. Disable Passive Mode in Admission Controller

Disabling Admission Controller is done on a per-cluster basis. [Learn more how to enable/disable Passive Mode in Admission Controller here](https://insights.docs.fairwinds.com/installation/admission/setup/#installation).

### 2. Use Policy Configurator to enforce Cluster-wide Policies at Admission

1. Download the [Insights CLI](https://insights.docs.fairwinds.com/configure/cli/cli/)
2. Create a `settings.yaml` file with the configuration below.
3. Upload `settings.yaml` using the Insights CLI. [Learn how to manage Policy Configurator using the Insights CLI here](https://insights.docs.fairwinds.com/configure/cli/settings/).

Example `settings.yaml`:
```yaml
checks:
  polaris:
    memoryRequestsMissing:
      admission:
        block: true
    cpuRequestsMissing:
      admission:
        block: true
    pullPolicyNotAlways:
      admission:
        block: true
    livenessProbeMissing:
      admission:
        block: true
    readinessProbeMissing:
      admission:
        block: true
    dangerousCapabilities:
      admission:
        block: true
    tagNotSpecified:
      admission:
        block: true
```

### 3. Create Automation Rule to keep blocking mode focused on Cluster-wide Policies only
1. Navigate to the Automation page
2. Click 'Create Custom Rule'
3. Create a new Automation Rule with the following settings:

Automation Rule: `0002-enforce-cluster-wide-policies-only`

Context: Admission Controller

```javascript
//Note: Admission Controller will automatically block when Action Items with a 0.7 severity or higher (High and Critical) are found. This lowers severities to avoid unncessary enforcement.
if (ActionItem.Severity >= 0.7) {
  ActionItem.Severity = MEDIUM_SEVERITY;
}
```

* * *

## Implementing Stage 3: Compliance

_In this stage, we want to enforce our Cluster-wide Policies and Scoped policies_

_Optionally, we can enable the Insights CI script to fail pipelines where Cluster-wide Policy issues are present._

Before proceeding, please verify:

-   Admission Controller is installed and Passive Mode is disabled
-   The Insights CI integration is installed on at least one pipeline and continues to have `options.setExitCode` set to `false`

### 1. Disable the '`0002-enforce-cluster-wide-policies-only`' Automation Rule

To disable the Automation Rule:

-   Ensure you have `Owner` permissions in Insights
-   Navigate to the Automation page
-   Click on the `0002-enforce-cluster-wide-policies-only` Automation Rule
-   In the upper-right, toggle off the 'Enable' switch
-   Click 'Update Rule'

In the next step, you will create a new Automation Rule that enforces Scoped Policies for specific Namespaces.

### 2. Create Automation Rule to enforce Cluster-wide and Scoped Policies at Admission

1. Navigate to the Automation page
2. Click 'Create Custom Rule'
3. Create a new Automation Rule with the following settings:

Automation Rule: `0003-enforce-all-policies`

Context: Admission Controller

```javascript
//Define Namespaces to apply policy to, as well as the specific policies to enforce.
namespaceScope = new Array("business-app", "production");
policyScope = new Array(
  "insecureCapabilities",
  "hostIPCSet",
  "hostPIDSet",
  "privilegeEscalationAllowed",
  "runAsPrivileged",
  "runAsRootAllowed"
);

//If Namespace Annotations are set, use this to define specific policies to enforce. Else, use what's configured in the policyScope variable.
policiesToEnforce = new Array();
if (ActionItem.NamespaceAnnotations["insights.fairwinds.com/enforce"]) {
  policiesToEnforce = JSON.parse(
    ActionItem.NamespaceAnnotations["insights.fairwinds.com/enforce"]
  );
} else if (namespaceScope.indexOf(ActionItem.ResourceNamespace) !== -1) {
  policiesToEnforce = policyScope;
}

//Policy Enforcement logic
//Note: Admission Controller will automatically block when Action Items with a 0.7 severity or higher (High and Critical) are found. This lowers severities to avoid unncessary enforcement.
if (ActionItem.Severity >= 0.7) {
  ActionItem.Severity = MEDIUM_SEVERITY;
}

if (policiesToEnforce.length > 0) {
  if (policiesToEnforce.indexOf(ActionItem.EventType) !== -1) {
    //Enforce the policy specified in the Namespace Annotation
    ActionItem.Severity = CRITICAL_SEVERITY;
    //Send optional Slack notification
    //sendSlackNotification("infra-notifications", "A deployment failed due to the following issue: "+JSON.stringify(ActionItem));
  }
}
```

**OPTIONAL: Use Namespace Annotations to customize which policies you'd like to enforce at the Namespace level**

The above `0003-enforce-all-policies` Automation Rule allows you to define a custom list of policies you'd like to enforce for a given namespace using the `insights.fairwinds.com/enforce` annotation.

Here's an example of how to use this:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    insights.fairwinds.com/enforce: ['runAsRootAllowed','insecureCapabilities'];
```

### 3. OPTIONAL: Configure Insights to enforce Cluster-wide Policies in CI

#### **3A) Set the Insights CI integration to gate pull requests**

Open the `fairwinds-insights.yaml` file at the root of your Git repo and set `options.setExitCode` to `true`.

#### **3B) Update Policy Configurator to enforce Cluster-wide Policies in CI**

1. Download the [Insights CLI](https://insights.docs.fairwinds.com/configure/cli/cli/)
2. Update your existing `settings.yaml` file with the configuration below.
3. Upload `settings.yaml` using the Insights CLI. [Learn how to manage Policy Configurator using the Insights CLI here](https://insights.docs.fairwinds.com/configure/cli/settings/).

Example `settings.yaml`:

```yaml
checks:
  polaris:
    memoryRequestsMissing:
      ci:
        block: true
      admission:
        block: true
    cpuRequestsMissing:
      ci:
        block: true
      admission:
        block: true
    pullPolicyNotAlways:
      ci:
        block: true
      admission:
        block: true
    livenessProbeMissing:
      ci:
        block: true
      admission:
        block: true
    readinessProbeMissing:
      ci:
        block: true
      admission:
        block: true
    dangerousCapabilities:
      ci:
        block: true
      admission:
        block: true
    tagNotSpecified:
      ci:
        block: true
      admission:
        block: true
```

## Managing Exceptions

To configure a workload to bypass the Admission Controller, there are two possible options:

### RECOMMENDED: Bypass Admission Controller using YAML Annotations


Add a specific annotation to that workload, and use an Automation Rule to bypass Admission Controller

  - With this option, security engineers and platform engineers are encouraged to use Git workflows to review/approve annotations added by development teams. This provides an audit trail for exceptions, and follows policy-as-code best practices.

Automation Rule: `ignore-via-annotation`

Context: Admission Controller

```javascript
//Bypass Admission Controller if an annotation like this exists: insights.fairwinds.com/ignore: "[\"runAsRootAllowed\"]"
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

### Bypass Admission Controller using an Allow List

Create an "allow list" within an Insights Automation Rule that forces the Severity of that Action Item to Low.

- With this option, security engineers and platform engineers carry the burden of maintaining an exception list. This is useful if development teams are still not fully responsible for their Kubernetes workload configurations.

Automation Rule: `ignore-via-allowlist`

Context: Admission Controller

```javascript
exceptionList = new Array();

//Create an allowlist using EventType, ResourceNamespace, and ResourceName combination.
//Below is an exception example for kube-system workloads that need to run as root
exceptionList["runAsRootAllowed"] = new Array(
  "kube-system/cert-manager",
  "kube-system/external-dns"
);

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