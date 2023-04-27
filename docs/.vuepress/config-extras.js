module.exports = {
  base: "/insights-docs",
  title: 'Fairwinds Insights Documentation',
  description: 'Documentation for the Fairwinds Insights Kubernetes auditing platform',
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
    heroText: '',
    sidebarDepth: 2,
    sidebar: [
      ['/', 'Home'],
      {
        title: 'Common Use Cases',
        children: [
          'first-steps/getting-value',
          'first-steps/workload-configuration',
          'first-steps/container-security',
          'first-steps/cost-efficiency',
          'first-steps/policy-enforcement',
        ],
      },
      {
        title: 'Features',
        children: [
          'features/in-cluster-scanning',
          'features/admission-controller',
          'features/infrastructure-as-code-scanning',
          'features/policies',
          'features/automation-rules',
          'features/insights-cli',
          'features/integrations',
          'features/team-management',
        ],
      },
      {
        title: 'Technical Details',
        children: [
          {
            title: 'Architecture',
            children: [
              'technical-details/architecture/architecture',
            ],
          },
          {
            title: 'Security',
            children: [
              'technical-details/security/security',
            ],
          },
          {
            title: 'Reports',
            children: [
              'technical-details/reports/polaris',
              'technical-details/reports/trivy',
              'technical-details/reports/goldilocks',
              'technical-details/reports/resource-metrics',
              'technical-details/reports/opa',
              'technical-details/reports/kube-bench',
              'technical-details/reports/nova',
              'technical-details/reports/pluto',
              'technical-details/reports/rbac-reporter',
              'technical-details/reports/kube-hunter',
              'technical-details/reports/workloads',
              'technical-details/reports/aws-costs',
              'technical-details/reports/falco',
              'technical-details/reports/right-sizer',
              'technical-details/reports/supported-checks',
              'technical-details/reports/new',
            ],
          },
          {
            title: 'API Access',
            children: [
              'technical-details/api/authentication',
            ],
          },
          {
            title: 'Self-Hosted',
            children: [
              'technical-details/self-hosted/installation',
              'technical-details/self-hosted/database',
              'technical-details/self-hosted/file-storage',
              'technical-details/self-hosted/ingress',
              'technical-details/self-hosted/email',
              'technical-details/self-hosted/sessions',
              'technical-details/self-hosted/integrations',
            ]
          },
        ],
      },
      ['/release-notes', 'Release Notes'],
    ],
  },
}
