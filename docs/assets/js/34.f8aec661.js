(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{380:function(t,e,a){"use strict";a.r(e);var s=a(42),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"opa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#opa"}},[t._v("#")]),t._v(" OPA")]),t._v(" "),a("p",[t._v("Fairwinds Insights supports the use of custom OPA policies to create Action Items.")]),t._v(" "),a("h2",{attrs:{id:"enable-the-opa-agent"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-the-opa-agent"}},[t._v("#")]),t._v(" Enable the OPA agent")]),t._v(" "),a("p",[t._v("To enable OPA, make sure you pass "),a("code",[t._v("--set opa.enabled=true")]),t._v(" when\n"),a("a",{attrs:{href:"/installation/insights-agent"}},[t._v("installing the insights-agent")])]),t._v(" "),a("h2",{attrs:{id:"designing-policies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#designing-policies"}},[t._v("#")]),t._v(" Designing Policies")]),t._v(" "),a("blockquote",[a("p",[t._v("You may want to familiarize yourself with\n"),a("a",{attrs:{href:"https://www.openpolicyagent.org/docs/latest/policy-language/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Rego"),a("OutboundLink")],1),t._v(",\nthe policy language used by OPA.")])]),t._v(" "),a("p",[t._v("Each Rego policy will recieve an "),a("code",[t._v("input")]),t._v(" parameter, which contains\na Kubernetes resource.")]),t._v(" "),a("p",[t._v("For example, we can check to make sure that "),a("code",[t._v("replicas")]),t._v(" is set on all "),a("code",[t._v("Deployments")])]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("package fairwinds\n\nreplicasRequired[actionItem] {\n  input.spec.replicas == 0\n  actionItem := {}\n}\n")])])]),a("p",[t._v("The "),a("code",[t._v("actionItem")]),t._v(" object is what Insights will examine to determine the details of the\nissue. The following fields can be set:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("title")]),t._v(" - a short title for the Action Item")]),t._v(" "),a("li",[a("code",[t._v("description")]),t._v(" - a longer description of the issue. Can include markdown.")]),t._v(" "),a("li",[a("code",[t._v("remediation")]),t._v(" - instructions for fixing the issue. Can include markdown.")]),t._v(" "),a("li",[a("code",[t._v("category")]),t._v(" - can be Security, Efficiency, or Reliability")]),t._v(" "),a("li",[a("code",[t._v("severity")]),t._v(" - between 0.0 and 1.0. > .66 will become a "),a("code",[t._v("danger")]),t._v(" item")])]),t._v(" "),a("p",[t._v("For instance, on our check above, we could set:")]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('package fairwinds\n\nreplicasRequired[actionItem] {\n  input.spec.replicas == 0\n  actionItem := {\n    "title": concat(" ", [input.kind, "does not have replicas set"]),\n    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",\n    "remediation": "Please set `spec.replicas`",\n    "category": "Reliability",\n    "severity": 0.5\n  }\n}\n')])])]),a("h2",{attrs:{id:"uploading-policies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uploading-policies"}},[t._v("#")]),t._v(" Uploading Policies")]),t._v(" "),a("p",[t._v("To add your policies to Insights, you'll need to use the API. You can find your API key on your organization's\nsettings page (note: you must be an admin for your organization).")]),t._v(" "),a("p",[t._v("Lets upload our "),a("code",[t._v("replicasRequired")]),t._v(" check by creating "),a("code",[t._v("replicas.rego")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('package fairwinds\n\nreplicasRequired[actionItem] {\n  input.spec.replicas == 0\n  actionItem := {\n    "title": concat(" ", [input.kind, "does not have replicas set"]),\n    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",\n    "remediation": "Please set `spec.replicas`",\n    "category": "Reliability",\n    "severity": 0.5\n  }\n}\n')])])]),a("p",[t._v("Then, use the Insights API to add your check:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("checkName")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("replicas\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("organization")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("acme-co "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# your org name in Insights")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("token")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("abcde "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# get this from your org settings page")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X PUT -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type: text/plain"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Authorization: Bearer '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$token")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://insights.fairwinds.com/v0/organizations/'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$organization")]),t._v("/opa/customChecks/"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$checkName")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --data-binary @replicas.rego\n")])])]),a("p",[t._v("Next, we need to create a "),a("code",[t._v("checkInstance")]),t._v(" to tell Insights what sorts of resources to apply our check to:")]),t._v(" "),a("p",[a("strong",[t._v("deployments.yaml")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apps"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kinds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Deployment"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("instanceName")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("deployments\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X PUT -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type: application/x-yaml"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Authorization: Bearer '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$token")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://insights.fairwinds.com/v0/organizations/'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$organization")]),t._v("/opa/customChecks/"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$checkName")]),t._v("/"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$instanceName")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --data-binary @deployments.yaml\n")])])]),a("h2",{attrs:{id:"testing-your-policies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing-your-policies"}},[t._v("#")]),t._v(" Testing your Policies")]),t._v(" "),a("p",[t._v("After uploading new checks, it's good to test that they're working properly. To do so, you can\nmanually create a one-off report:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("kubectl create job my-opa-test --from=cronjob/opa -n insights-agent\n")])])]),a("p",[t._v("Watch the logs for the resulting Job to spot any potential errors in your work.")]),t._v(" "),a("h2",{attrs:{id:"reusing-rego-policies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reusing-rego-policies"}},[t._v("#")]),t._v(" Reusing Rego Policies")]),t._v(" "),a("p",[t._v("You can reuse the same Rego policy, setting different ActionItem attributes in different cases.\nFor instance, say we wanted to apply our "),a("code",[t._v("replicas")]),t._v(" policy above to both "),a("code",[t._v("Deployments")]),t._v(" and "),a("code",[t._v("StatefulSets")]),t._v(",\nbut wanted a higher severity for "),a("code",[t._v("Deployments")]),t._v(".")]),t._v(" "),a("p",[t._v("First, we'd stop specifying "),a("code",[t._v("severity")]),t._v(" inside our OPA, so that it can be set by the instance:\n"),a("strong",[t._v("replicas.rego")])]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('package fairwinds\n\nreplicasRequired[actionItem] {\n  input.spec.replicas == 0\n  actionItem := {\n    "title": concat(" ", [input.kind, "does not have replicas set"]),\n    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",\n    "remediation": "Please set `spec.replicas`",\n    "category": "Reliability",\n  }\n}\n')])])]),a("p",[t._v("Next, we'd create two instances:\n"),a("strong",[t._v("deployments.yaml")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("output")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("severity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".9")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apps"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kinds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Deployment"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[a("strong",[t._v("statefulSets.yaml")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("output")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("severity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".4")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apps"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kinds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"StatefulSet"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("h3",{attrs:{id:"parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),a("p",[t._v("We can also pass parameters to our instances. Say, for instance, that we wanted all Deployments to have at least 3 replicas,\nbut StatefulSets were OK with a single replica. Then we could write:")]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('package fairwinds\n\nreplicasRequired[actionItem] {\n  input.spec.replicas < input.parameters.minReplicas\n  actionItem := {\n    "title": concat(" ", [input.kind, "does not have enough replicas set"]),\n    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",\n    "remediation": "Please set `spec.replicas`",\n    "category": "Reliability",\n  }\n}\n')])])]),a("p",[a("strong",[t._v("deployments.yaml")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("parameters")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("minReplicas")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apps"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kinds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Deployment"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[a("strong",[t._v("statefulSets.yaml")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("parameters")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("minReplicas")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apps"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kinds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"StatefulSet"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("h2",{attrs:{id:"using-the-kubernetes-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-the-kubernetes-api"}},[t._v("#")]),t._v(" Using the Kubernetes API")]),t._v(" "),a("p",[t._v("You can also cross-check resources with other Kubernetes objects. For example, we could use\nthis check to ensure that all "),a("code",[t._v("Deployments")]),t._v(" have an associated "),a("code",[t._v("HorizontalPodAutoscaler")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-rego extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('package fairwinds\n\nhasMatchingHPA(hpas, elem) {\n  hpa := hpas[_]\n  hpa.spec.scaleTargetRef.kind == elem.kind\n  hpa.spec.scaleTargetRef.name == elem.metadata.name\n  hpa.metadata.namespace == elem.metadata.namespace\n  hpa.spec.scaleTargetRef.apiVersion == elem.apiVersion\n}\nhpaRequired[actionItem] {\n  not hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)\n  actionItem := {\n    "title": "No horizontal pod autoscaler found"\n  }\n}\n')])])]),a("h2",{attrs:{id:"more-examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#more-examples"}},[t._v("#")]),t._v(" More Examples")]),t._v(" "),a("p",[t._v("You can find more examples in the "),a("a",{attrs:{href:"https://github.com/FairwindsOps/insights-plugins/tree/master/opa/examples",target:"_blank",rel:"noopener noreferrer"}},[t._v("Insights Plugins repository"),a("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=n.exports}}]);