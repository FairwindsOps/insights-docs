(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{221:function(e,t,s){"use strict";s.r(t);var a=s(30),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"cluster-comparison"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cluster-comparison"}},[e._v("#")]),e._v(" Cluster Comparison")]),e._v(" "),s("p",[e._v("If you have the Insights Agent installed on multiple Kubernetes clusters, you\ncan use Fairwinds Insights to compare the workloads in those clusters.\nThis is particularly useful if you've got "),s("strong",[e._v("staging")]),e._v(" and "),s("strong",[e._v("production")]),e._v(" clusters,\nor multiple clusters that are meant to mirror one another.")]),e._v(" "),s("p",[e._v("In the example below, we examine the differences in the "),s("code",[e._v("kube-system")]),e._v(" namespace\nbetween a production cluster and a staging cluster:")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/img/compare-namespace.png"),alt:"compare kube-system namespace"}}),e._v(" "),s("p",[e._v("We can see that "),s("code",[e._v("vpa-admission-controller")]),e._v(" and "),s("code",[e._v("vpa-updater")]),e._v(" are in "),s("code",[e._v("staging")]),e._v(", but not "),s("code",[e._v("production")]),e._v(".\nThis could be a mistake - typically we want production and staging to be aligned.")]),e._v(" "),s("p",[e._v("We can also see when the images or resources of a particular workload have changed.\nIn the example below, we can see that the "),s("code",[e._v("oauth2-proxy")]),e._v(" deployment doesn't have\nresource requests or limits set in production, though it does in staging.")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/img/compare-resources.png"),alt:"compare kube-system namespace"}})])}),[],!1,null,null,null);t.default=n.exports}}]);