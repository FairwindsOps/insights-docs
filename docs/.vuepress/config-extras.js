module.exports = {
  title: "Fairwinds Insights Documentation",
  description: "Documentation for the Fairwinds Insights Kubernetes auditing platform",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    docsRepo: 'FairwindsOps/insights-docs',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'main',
    editLinkText: 'Help us improve this page',
    logo: '/img/logo.svg',
    heroText: "",
    sidebar: [
      ['/', 'Home'],
      ["/release-notes", "Release Notes"],
    {
      title: "Installation",
      children: [
        '/installation/getting-started',
        '/installation/setup',
        '/first-steps/getting-value',
        '/first-steps/workload-configuration',
        '/first-steps/container-security',
        '/first-steps/cost-efficiency',
      ],
    }, {
      title: "Continuous Integration",
      children: [
        "/ci/about",
        "/ci/setup",
        "/ci/configuration",
        "/ci/results",
        "/ci/github",
      ],
    }, {
      title: "Admission Controller",
      children: [
        "/admission/about",
        "/admission/setup",
        "/admission/configuration",
        "/admission/automation",
      ]
    }, {
      title: "In-Cluster Agent",
      children: [
        '/agent/about',
        '/agent/installation',
        '/agent/configuration',
        '/agent/report-hub',
        "/agent/cluster-summary",
        "/agent/action-items",
        "/agent/workloads",
        "/agent/add-ons",
        "/agent/rbac",
        "/agent/cluster-comparison",
      ],
    }, {
      title: "Features",
      children: [
        "/features/policy",
        "/features/rules",
        "/features/cli",
      ],
    }, {
      title: "Reports",
      sidebarDepth: 0,
      children: [
        "/reports/polaris",
        "/reports/trivy",
        "/reports/goldilocks",
        "/reports/resource-metrics",
        "/reports/opa",
        "/reports/kube-bench",
        "/reports/nova",
        "/reports/pluto",
        "/reports/rbac-reporter",
        "/reports/kube-hunter",
        "/reports/kubesec",
        "/reports/workloads",
        "/reports/new",
      ],
    }, {
      title: "Integrations",
      children: [
        "/integrations/slack",
        "/integrations/datadog",
        "/integrations/jira",
        "/integrations/github",
      ],
    }, {
      title: "Management",
      children: [
        "/management/membership",
        "/management/delete",
      ],
    }, {
      title: "API Access",
      children: [
        "/api/authentication",
        "/api/clusters",
        "/api/reports",
        "/api/custom-reports",
      ],
    },
      {
        title: "Self-Hosted",
        children: [
          "/self-hosted/installation",
          "/self-hosted/database",
          "/self-hosted/file-storage",
          "/self-hosted/ingress",
          "/self-hosted/email",
          "/self-hosted/sessions",
        ]
      },
      {
        title: "Architecture",
        children: [
          "/architecture/architecture",
          "/architecture/sample-reports",
        ]
      }
    ],
  },
  plugins: {
    'vuepress-plugin-clean-urls': {
      normalSuffix: '/',
      notFoundPath: '/404.html',
    },
    'check-md': {},
  },
}
