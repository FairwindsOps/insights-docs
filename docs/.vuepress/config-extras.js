module.exports = {
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
    sidebar: {
      '/run/': [
        ['/', 'Home'],
        ['ways-to-run', 'Ways to Run'],
        {
          title: 'Continuous Integration',
          children: [
            'ci/about',
            'ci/setup',
            'ci/configuration',
            'ci/results',
            'ci/github',
          ],
        }, {
          title: 'Admission Controller',
          children: [
            'admission/about',
            'admission/setup',
            'admission/configuration',
            'admission/automation',
          ]
        }, {
          title: 'In-Cluster Agent',
          children: [
            'agent/about',
            'agent/installation',
            'agent/configuration',
            'agent/report-hub',
            'agent/cluster-summary',
            'agent/action-items',
            'agent/vulnerabilities',
            'agent/workloads',
            'agent/add-ons',
            'agent/rbac',
            'agent/cluster-comparison',
          ],
        },
      ],
      '/configure/': [
        ['/', 'Home'],
        {
          title: 'Policy and Rules',
          children: [
            'policy/policy',
            'policy/rules',
            'policy/cli',
          ],
        }, {
          title: 'Reports',
          sidebarDepth: 0,
          children: [
            'reports/polaris',
            'reports/trivy',
            'reports/goldilocks',
            'reports/resource-metrics',
            'reports/opa',
            'reports/kube-bench',
            'reports/nova',
            'reports/pluto',
            'reports/rbac-reporter',
            'reports/kube-hunter',
            'reports/kubesec',
            'reports/workloads',
            'reports/supported-checks',
            'reports/new',
          ],
        }, {
          title: 'Integrations',
          children: [
            'integrations/slack',
            'integrations/datadog',
            'integrations/jira',
            'integrations/github',
          ],
        }, {
          title: 'Account Management',
          children: [
            'management/membership',
            'management/sso',
            'management/delete',
          ],
        },
      ],
      '/technical-details/': [
        ['/', 'Home'],
        {
          title: 'Architecture',
          children: [
            'architecture/architecture',
            'architecture/sample-reports',
          ]
        },
        {
          title: 'API Access',
          children: [
            'api/authentication',
            'api/clusters',
            'api/reports',
            'api/custom-reports',
          ],
        },
        {
          title: 'Self-Hosted',
          children: [
            'self-hosted/installation',
            'self-hosted/database',
            'self-hosted/file-storage',
            'self-hosted/ingress',
            'self-hosted/email',
            'self-hosted/sessions',
            'self-hosted/integrations',
          ]
        },
      ],
      '/': [
        ['/', 'Home'],
        ['/release-notes', 'Release Notes'],
        {
          title: 'Installation',
          children: [
            'installation/getting-started',
            'installation/setup',
          ],
        }, {
          title: 'Common Use Cases',
          children: [
            'first-steps/getting-value',
            'first-steps/workload-configuration',
            'first-steps/container-security',
            'first-steps/cost-efficiency',
          ],
        },
        ['/run/ways-to-run', 'Ways to Run'],
        ['/configure/policy/policy', 'Configure'],
        ['/technical-details/architecture/architecture', 'Technical Details'],
      ],
    },
  },
}
