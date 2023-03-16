---
meta:
  - name: description
    content: Fairwinds provides a powerful and flexible solution for fine grained customization of Admission Controller actions through Automation Rules.
---
# Admission Controller

Fairwinds provides a powerful and flexible solution for fine grained customization of Admission Controller actions through Automation Rules. Organization's can:
* Customize which Action Items should block within a cluster or environment 
* Create Action Item exceptions for resources in a cluster or namespace 


## Examples
### Action Item Exception for Namespace
Here we allow the `privilegeEscalationAllowed` Action Item on the `kube-system` namespace by lowering the severity: 

```js
if (
  ActionItem.EventType === "privilegeEscalationAllowed" &&
  ActionItem.ResourceNamespace === "kube-system"
) {
  ActionItem.Severity = MEDIUM_SEVERITY; //Warn only
}
```
