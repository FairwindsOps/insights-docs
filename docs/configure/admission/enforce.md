---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. How to enforce the Admission controller. "
---
# Enforce

Admission Controller will block policies that have a severity > 0.7. You have the ability to increase the severity of a policy or multiple policies in order to serve the needs of your organization. 

Action Item severity is defined as:
* 0.0 - None
* 0.1 to 0.39 - Low
* 0.4 to 0.69 - Medium
* 0.7 to .89 - High (blocking)
* 0.9 to 1.0 - Critical (blocking)

## Polaris
> The below policies will be blocking if Passive Mode has been toggled off. You can customize the severity through Automation Rules

* Capabilities: The following security capabilities should not be added: SYS_ADMIN
* dangerousCapabilites: Container should not have dangerous capabilities
* hostIPCSet: Host IPC should not be configured
* hostPIDSet: Host PID should not be configured
* privilegeEscalationAllowed: Privilege escalation should not be allowed
* runAsPrivileged: Should not be running as privileged
* tagNotSpecified: Image tag should be specified

## Additional Polices 
> Below are additional policies from Polaris that are able to be enforced at the time of Admisson through Automation Rules 

* Api_version_deprecated: An apiVersion for accounts/accounts has been deprecated
* Api_version_removed: An apiVersion for airflow/airflow-redis-master has been removed
* capabilitiesAdded: The following security capabilities should not be added:
* AUDIT_READ, AUDIT_CONTROL
* capabilitiesAddedBeyond: The following security capabilities should not be added:
NET_ADMIN
* cpuLimitsMissing: CPU Limits should be set
* cpuRequestMissing: CPU Request should be set
* memoryLimitMissing: Memory Limit should be set
* memoryRequestMissing: Memory request should be set
* hostNetworkSet: Host network should not be configured
* hostPortSet: Host port should not be configured
* insecureCapabilities: Container should not have insecure capabilities
* livenessProbeMissing: Liveness probe should be configured
* notReadOnlyRootFilesystem: Filesystem should be read only
* pullPolicyNotAlways: Image pull policy should be "Always"
* runAsRootAllowed: Should not be allowed to run as root
* tlsSettingsMissing: Ingress does not have TLS configure

#### Example
> Create an Automation Rule to Increase the severity of specific out of the box policies that you want to Block. 
* In this example if the configuration file does not have memory requests, cpu requests, liveness probes, readiness probes OR Privelege Escalation it will be blocked from entering the intended cluster. 

```js
if (
  ActionItem.EventType === "memoryRequestsMissing" ||
  ActionItem.EventType === "cpuRequestsMissing" ||
  ActionItem.EventType === "livenessProbeMissing" ||
  ActionItem.EventType === "readinessProbeMissing" ||
  ActionItem.EventType === "privilegeEscalationAllowed"
) {
  ActionItem.Severity = 0.7; //Block
} else {
  ActionItem.Severity = 0.1; //Warn
}
```
Customization of which out of the box checks you would like to enforce can be configured with Automation Rules. See [Automation Rules Documentation](/configure/automation/rules) for further documentation on writing rules and additional examples.

If you do not see a check above that meets the requirements of your organization see custom OPA policies.