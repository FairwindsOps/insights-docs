(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{373:function(e,t,s){"use strict";s.r(t);var a=s(42),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"insights-agent"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#insights-agent"}},[e._v("#")]),e._v(" Insights Agent")]),e._v(" "),s("p",[e._v("The Insights Agent runs inside your Cluster, and sends back data to Fairwinds Insights.")]),e._v(" "),s("p",[e._v("The Insights Agent comes with several different open source reporting tools, each of which can be\nconfigured independently using the Report Hub.\nTo read more about the different report types, see the "),s("a",{attrs:{href:"/reports/polaris"}},[e._v("Reports Section")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),s("p",[e._v("The Insights Agent is installed and configured using Helm. To see the full list of options,\nyou can check out the\n"),s("a",{attrs:{href:"https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent",target:"_blank",rel:"noopener noreferrer"}},[e._v("Insights Agent Helm chart"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("In particular, for any given report type, you can set the following options:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("enabled")]),e._v(" - this is typically set to "),s("code",[e._v("true")]),e._v(" by default")]),e._v(" "),s("li",[s("code",[e._v("schedule")]),e._v(" - a cron expression dictating when this report should run. This is typically set to a random minute every hour")]),e._v(" "),s("li",[s("code",[e._v("timeout")]),e._v(" - how long to wait for output, in seconds")]),e._v(" "),s("li",[s("code",[e._v("resources")]),e._v(" - requests and limits for CPU and memory for this report")])]),e._v(" "),s("h2",{attrs:{id:"debugging"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#debugging"}},[e._v("#")]),e._v(" Debugging")]),e._v(" "),s("p",[e._v("If you suspect something is wrong with the Insights Agent, you can use "),s("code",[e._v("kubectl")]),e._v(" to\ndebug the problem.")]),e._v(" "),s("p",[e._v("After the agent runs, "),s("code",[e._v("kubectl get pods")]),e._v(" should show something like this:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("$ kubectl get pods -n insights-agent\nNAME                                                    READY   STATUS      RESTARTS   AGE\ngoldilocks-5sh8s                                        0/2     Completed   0          18m\ngoldilocks-7pgp6                                        0/2     Completed   0          19m\ninsights-agent-goldilocks-controller-5b6b45d678-vgbrk   1/1     Running     0          19m\ninsights-agent-goldilocks-vpa-install-566h8             0/1     Completed   0          19m\nkube-bench-dpvbz                                        0/2     Completed   0          18m\nkube-hunter-tnmsw                                       0/2     Completed   0          18m\npolaris-zk4px                                           0/2     Completed   0          18m\nrbac-reporter-1583952600-kwmfz                          0/2     Completed   0          105s\nrbac-reporter-sf9cz                                     0/2     Completed   0          18m\nrelease-watcher-6lhm7                                   0/2     Completed   0          18m\ntrivy-8nw9d                                             0/2     Completed   0          18m\nworkloads-1583951700-dj6wb                              0/2     Completed   0          16m\nworkloads-q6gzt                                         0/2     Completed   0          18m\n")])])]),s("p",[e._v("If any of the pods there show an error, you can look at the logs. There are typically two containers\nper pod in the Insights Agent - one to run the auditing tool, and another to upload the results.\nFor example, here are typical logs for kube-bench:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("$ kubectl logs kube-bench-dpvbz -n insights-agent -c kube-bench\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("time")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"2020-03-11T18:32:51Z"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("level")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("info "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("msg")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Starting:"')]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("time")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"2020-03-11T18:32:51Z"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("level")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("info "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("msg")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Updating data."')]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("time")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"2020-03-11T18:32:54Z"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("level")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("info "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("msg")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Data updated."')]),e._v("\n")])])]),s("p",[e._v("If nothing suspicious appears there, you might find an answer in the second container, which uploads the results.\nIt should end with something like this:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("$ kubectl logs kube-bench-dpvbz -n insights-agent -c insights-uploader\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -X POST https://staging.insights.fairwinds.com/v0/organizations/acme-co/clusters/staging/data/kube-bench -L -d @/output/kube-bench.json -H "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Authorization: Bearer <REDACTED>'")]),e._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Content-Type: application/json'")]),e._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'X-Fairwinds-Agent-Version: 0.1.3'")]),e._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'X-Fairwinds-Report-Version: 0.1'")]),e._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'X-Fairwinds-Agent-Chart-Version: 0.15.2'")]),e._v(" --fail\n  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n"),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("100")]),e._v("  174k  "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("100")]),e._v("    "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("16")]),e._v("  "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("100")]),e._v("  174k     "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("23")]),e._v("   254k --:--:-- --:--:-- --:--:--  274k\n+ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exit")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Success"')]),e._v(":true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"common-problems"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#common-problems"}},[e._v("#")]),e._v(" Common Problems")]),e._v(" "),s("h4",{attrs:{id:"resource-limits"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resource-limits"}},[e._v("#")]),e._v(" Resource Limits")]),e._v(" "),s("p",[e._v("We have set reasonable resource requests and limits on each of the audits, but some clusters\nmay push the boundaries of our assumptions. If you're seeing out-of-memory errors or other\nresource-related issues, try setting higher resource limits.")]),e._v(" "),s("p",[e._v("If you're using the helm chart, you can do this by adding")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("--set "),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$reportType")]),e._v(".resources.limits.memory"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("1Gi\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# or")]),e._v("\n--set "),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$reportType")]),e._v(".resources.limits.cpu"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("1000m\n")])])]),s("p",[e._v("to your "),s("code",[e._v("helm update --install")]),e._v(" command.")]),e._v(" "),s("h4",{attrs:{id:"timeouts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#timeouts"}},[e._v("#")]),e._v(" Timeouts")]),e._v(" "),s("p",[e._v("We have set a reasonable timeout for each of the audits, but again, some clusters may\npush the boundaries of our assumptions. If you're seeing timeout issues in the "),s("code",[e._v("insights-uploader")]),e._v("\ncontainer in one of the report types, you can adjust the timeout by adding:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("--set "),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$reportType")]),e._v(".timeout"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("3600")]),e._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 3600s = 5min")]),e._v("\n")])])]),s("p",[e._v("to your "),s("code",[e._v("helm update --install")]),e._v(" command.")])])}),[],!1,null,null,null);t.default=n.exports}}]);