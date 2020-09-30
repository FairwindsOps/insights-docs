module.exports = {
  title: "Fairwinds Insights Documentation",
  description: "Documentation for the Fairwinds Insights Kubernetes auditing platform",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    docsRepo: 'FairwindsOps/insights-docs',
    editLinks: true,
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
        '/installation/insights-agent',
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
        "/features/cluster-comparison",
        "/features/workloads",
        "/features/add-ons",
        "/features/rbac",
        "/features/continuous-integration",
        "/features/admission-controller.md",
      ],
    }, {
      title: "Reports",
      sidebarDepth: 0,
      children: [
        "/reports/polaris",
        "/reports/goldilocks",
        "/reports/trivy",
        "/reports/opa",
        "/reports/kubesec",
        "/reports/kube-hunter",
        "/reports/nova",
        "/reports/rbac-reporter",
        "/reports/workloads",
        "/reports/rbac-requirements",
        "/reports/new",
      ],
    }, {
      title: "Integrations",
      children: [
        "/integrations/slack",
        "/integrations/datadog",
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
      //["/architecture", "Architecture"],
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
      normalSuffix: '',
      notFoundPath: '/404.html',
    },
    'check-md': {},
  },
}
