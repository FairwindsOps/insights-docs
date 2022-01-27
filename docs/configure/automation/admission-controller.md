# Admission Controller

Fairwinds provides a powerful, flexible solution for fine-grained customization of Admission Controller actions through Automation Rules. 
* Ability to block specific policies based on your organizations requirements
* Customize which resources you want to block within a cluster or environment 
* Create exceptions for resources in a cluster or namespace 


#### Examples 
> Create an Automation Rule to Increase the Severity of an out of the box policy to enforce at the time of Admission

```js
if (ActionItem.EventType === 'memoryRequestsMissing' ||
ActionItem.EventType === 'cpuRequestsMissing' ||
ActionItem.EventType === 'livenessProbeMissing' ||
ActionItem.EventType === ‘pullPolicyNotAlways’)
{
ActionItem.Severity = 0.75; //Block
```

> Block Privilege Escalation from being configured for workloads in application-specific namespaces, but allow it for system namespace like `kube-system`

```js
if (ActionItem.EventType === 'privilegeEscalationAllowed' &&
ActionItem.ResourceNamespace === 'kube-system')
{
ActionItem.Severity = 0.5; //Warn only
}
```
The main input is `ActionItem`, which contains
information about the issue detected. The following fields are available:
* `Cluster`
* `ResourceName`
* `ResourceNamespace`
* `ResourceKind`
* `ReportType`
* `EventType`
* `Severity`
* `Category`
* `IsNew`
* `ResourceLabels`
* `ResourceAnnotations`

Action Item severity is defined as:
* 0.0 - None
* 0.1 to 0.39 - Low
* 0.4 to 0.69 - Medium
* 0.7 to .89 - High (Admission Controller will block)
* 0.9 to 1.0 - Critical  (Admission Controller will block)