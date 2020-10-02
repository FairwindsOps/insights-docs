(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{358:function(e,t,s){"use strict";s.r(t);var r=s(42),a=Object(r.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"insights-architecture"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#insights-architecture"}},[e._v("#")]),e._v(" Insights Architecture")]),e._v(" "),s("p",[e._v("Fairwinds Insights consists of two main components:")]),e._v(" "),s("ul",[s("li",[e._v("The Client - this consists of the users's cluster, where the Insights Agent runs each of the enabled reports")]),e._v(" "),s("li",[e._v("The Server - this consists of the Insights backend, database, and file storage")])]),e._v(" "),s("img",{attrs:{src:e.$withBase("/img/architecture.png"),alt:"Insights Architecture"}}),e._v(" "),s("p",[e._v("While each report has its own requirements, there are some baseline requirements needed by the\nInsights Agent:")]),e._v(" "),s("ul",[s("li",[e._v("Sufficient RBAC permissions to create new Jobs in the cluster")]),e._v(" "),s("li",[e._v("The "),s("code",[e._v("view")]),e._v(" ClusterRole")]),e._v(" "),s("li",[e._v("Network access to "),s("code",[e._v("insights.fairwinds.com")])])]),e._v(" "),s("p",[e._v("Additional architecture notes and RBAC requirements for different reports are listed below.\nNote that the Insights Agent only requires "),s("em",[e._v("egress")]),e._v(" from the cluster - you will not need to\nopen up access for any kind of network ingress.")]),e._v(" "),s("h2",{attrs:{id:"network-egress"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#network-egress"}},[e._v("#")]),e._v(" Network Egress")]),e._v(" "),s("p",[e._v("Fairwinds Insights will need access to the following domains:")]),e._v(" "),s("ul",[s("li",[e._v("insights.fairwinds.com")]),e._v(" "),s("li",[e._v("quay.io")]),e._v(" "),s("li",[e._v("hub.docker.com (kube-hunter)")]),e._v(" "),s("li",[e._v("raw.githubusercontent.com (goldilocks)")]),e._v(" "),s("li",[e._v("github.com (trivy)")]),e._v(" "),s("li",[e._v("github-production-release-asset-*.s3.amazonaws.com (trivy)")])]),e._v(" "),s("h2",{attrs:{id:"report-architectures"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#report-architectures"}},[e._v("#")]),e._v(" Report Architectures")]),e._v(" "),s("p",[e._v("Typically, each report runs as a CronJob on a configurable schedule (usually once/hour by default).\nThe report will analyze resources in the cluster, then send a JSON report with its findings\nto "),s("code",[e._v("insights.fairwinds.com")]),e._v(".")]),e._v(" "),s("p",[e._v("Any exceptions or additions to this flow are listed below.")]),e._v(" "),s("h3",{attrs:{id:"goldilocks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#goldilocks"}},[e._v("#")]),e._v(" Goldilocks")]),e._v(" "),s("p",[e._v("In addition to the typical cronjob, Goldilocks will run a long-lived Deployment for controlling\nVPA objects. Goldilocks will add a VPA (in "),s("code",[e._v("recommend")]),e._v(" mode) to any incoming Deployment in order to\nprovide resource recommendations.")]),e._v(" "),s("p",[e._v("Goldilocks needs access to "),s("code",[e._v("raw.githubusercontent.com")]),e._v(" in order to access the CRDs for VPA objects,\nwhich will be installed in the cluster alongside the Insights Agent.")]),e._v(" "),s("p",[e._v("Goldilocks also requires a metrics-server installation.")]),e._v(" "),s("h3",{attrs:{id:"kube-bench"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kube-bench"}},[e._v("#")]),e._v(" kube-bench")]),e._v(" "),s("p",[e._v("kube-bench can run in one of two modes:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("cronjob")]),e._v(" (default) - this runs the report for a single node")]),e._v(" "),s("li",[s("code",[e._v("daemonset")]),e._v(" - this runs the report on all nodes")])]),e._v(" "),s("p",[e._v("If your nodes are homogenous (i.e. you only have a single node pool), the "),s("code",[e._v("cronjob")]),e._v(" mode\nis sufficient. But if your nodes have different configurations, you'll likely want to run\nkube-bench as a DaemonSet.")]),e._v(" "),s("p",[e._v("kube-bench needs access to some resources on the node in order to perform its audit, including:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("/var/lib")])]),e._v(" "),s("li",[s("code",[e._v("/etc/systemd")])]),e._v(" "),s("li",[s("code",[e._v("/etc/kubernetes")])]),e._v(" "),s("li",[s("code",[e._v("/usr/local/mount-from-host/bin")])]),e._v(" "),s("li",[e._v("root access")])]),e._v(" "),s("h3",{attrs:{id:"kube-hunter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kube-hunter"}},[e._v("#")]),e._v(" kube-hunter")]),e._v(" "),s("p",[e._v("kube-hunter runs in "),s("a",{attrs:{href:"https://github.com/aquasecurity/kube-hunter#pod",target:"_blank",rel:"noopener noreferrer"}},[e._v("pod mode"),s("OutboundLink")],1),e._v(" in order to discover what\nrunning a malicious container can do/discover on your cluster.")]),e._v(" "),s("h3",{attrs:{id:"kubesec"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubesec"}},[e._v("#")]),e._v(" kubesec")]),e._v(" "),s("p",[e._v("kubesec only needs "),s("code",[e._v("view")]),e._v(" access to the cluster in order to analyze workloads for misconfigurations.")]),e._v(" "),s("h3",{attrs:{id:"nova"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nova"}},[e._v("#")]),e._v(" Nova")]),e._v(" "),s("p",[e._v("Nova needs access to "),s("code",[e._v("Secrets")]),e._v(", which contain metadata about installed Helm charts.")]),e._v(" "),s("p",[e._v("Nova will also need network access to any third-party Helm repositories from which Helm charts have\nbeen installed (e.g. "),s("code",[e._v("https://kubernetes-charts.storage.googleapis.com")]),e._v(").")]),e._v(" "),s("p",[e._v("Nova will find all Helm charts installed in the cluster, then cross-check those charts with the upstream\nrepositories to check for new versions.")]),e._v(" "),s("h3",{attrs:{id:"opa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#opa"}},[e._v("#")]),e._v(" OPA")]),e._v(" "),s("p",[e._v("The OPA report will reach out to the Insights API to pull down any Rego policies that have been added to your\norganization. It will need "),s("code",[e._v("view")]),e._v(" access to the cluster in order to run those policies against existing resources.")]),e._v(" "),s("h3",{attrs:{id:"pluto"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pluto"}},[e._v("#")]),e._v(" Pluto")]),e._v(" "),s("p",[e._v("Pluto needs "),s("code",[e._v("view")]),e._v(" access to the cluster in order to check for deprecated API versions.")]),e._v(" "),s("h3",{attrs:{id:"polaris"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#polaris"}},[e._v("#")]),e._v(" Polaris")]),e._v(" "),s("p",[e._v("Polaris needs "),s("code",[e._v("view")]),e._v(" access to the cluster in order to analyze workload configurations. It also needs\naccess to Secrets in order to examine Helm charts.")]),e._v(" "),s("h3",{attrs:{id:"rbac-reporter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rbac-reporter"}},[e._v("#")]),e._v(" RBAC Reporter")]),e._v(" "),s("p",[e._v("RBAC Reporter needs "),s("code",[e._v("view")]),e._v(" access to the cluster to aggregate information about RBAC roles and bindings.")]),e._v(" "),s("h3",{attrs:{id:"trivy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#trivy"}},[e._v("#")]),e._v(" Trivy")]),e._v(" "),s("p",[e._v("Trivy will download a list of known CVEs "),s("a",{attrs:{href:"https://github.com/aquasecurity/trivy-db",target:"_blank",rel:"noopener noreferrer"}},[e._v("from GitHub"),s("OutboundLink")],1),e._v(",\nthen cross-check these against images in your cluster.")]),e._v(" "),s("p",[e._v("You may need to grant Trivy access to "),s("a",{attrs:{href:"/reports/trivy#private-images"}},[e._v("private images")]),e._v(" if your nodes\ndon't automatically have access to your private Docker registries.")]),e._v(" "),s("h3",{attrs:{id:"workloads"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#workloads"}},[e._v("#")]),e._v(" Workloads")]),e._v(" "),s("p",[e._v("The Workloads report only needs "),s("code",[e._v("view")]),e._v(" access to your cluster.")]),e._v(" "),s("h2",{attrs:{id:"rbac-requirements"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rbac-requirements"}},[e._v("#")]),e._v(" RBAC requirements")]),e._v(" "),s("p",[e._v("Each Fairwinds Insights plugin requires a unique set of permissions in order to do its job.\nHere we provide a list of permissions requested by each plugin - you can also review\nthe "),s("a",{attrs:{href:"https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent",target:"_blank",rel:"noopener noreferrer"}},[e._v("helm chart"),s("OutboundLink")],1),e._v(" to\nsee the exact RBAC configurations for each plugin.")]),e._v(" "),s("p",[e._v("Notably, some plugins require "),s("strong",[e._v("read access to secrets")]),e._v(". This is because they examine Helm 3\nreleases, which store metadata inside of a "),s("code",[e._v("Secret")]),e._v(" object.")]),e._v(" "),s("p",[e._v("If a particular plugin requires permissions that you're uncomfortable with, you can disable it\nin the Helm chart by adding "),s("code",[e._v("--set $plugin.enabled=false")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"permission-list"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#permission-list"}},[e._v("#")]),e._v(" Permission List")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Plugin")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("View Secrets")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("View Resources (non-secrets)")]),e._v(" "),s("th",[e._v("Other/Notes")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[e._v("kube-bench")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("kube-hunter")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Polaris")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Kubesec")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("RBAC reporter")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Trivy")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Workloads")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Goldilocks")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}}),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td",[e._v("Create/Delete VPAs")])]),e._v(" "),s("tr",[s("td",[e._v("Release Watcher")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td",[e._v("Needs secrets to view Helm releases")])]),e._v(" "),s("tr",[s("td",[e._v("Pluto")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("✅")]),e._v(" "),s("td",[e._v("Needs secrets to view Helm releases")])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);