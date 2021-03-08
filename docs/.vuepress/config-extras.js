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
      collapsable: false,
      children: [
        '/installation/getting-started',
        '/installation/report-hub',
        '/installation/insights-agent',
        '/installation/self-hosted',
      ],
    }, {
      title: 'First Steps',
      sidebarDepth: 0,
      children: [
        '/first-steps/getting-value',
        '/first-steps/workload-configuration',
        '/first-steps/container-security',
        '/first-steps/cost-efficiency',
      ],
    }, {
      title: "Features",
      children: [
        "/features/cluster-summary",
        "/features/action-items",
        "/features/workloads",
        "/features/policy",
        "/features/continuous-integration",
        "/features/admission-controller",
        "/features/rules",
        "/features/cli",
        "/features/add-ons",
        "/features/rbac",
        "/features/cluster-comparison",
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
