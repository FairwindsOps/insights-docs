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
    sidebar: [
      ['/', 'Home'],
      {
        title: 'Installation',
        children: [
          'installation/getting-started',
          'installation/setup',
        ],
      },
      {
        title: 'Common Use Cases',
        children: [
          'first-steps/getting-value',
          'first-steps/workload-configuration',
          'first-steps/container-security',
          'first-steps/cost-efficiency',
        ],
      },
      {
        title: 'Ways to Run',
        children: [
          {
            title: 'Continuous Integration',
            children: [
              'run/ci/about',
              'run/ci/setup',
              'run/ci/configuration',
              'run/ci/results',
              'run/ci/github',
            ],
          }, {
            title: 'Admission Controller',
            children: [
              'run/admission/about',
              'run/admission/setup',
              'run/admission/configuration',
              'run/admission/automation',
            ]
          }, {
            title: 'In-Cluster Agent',
            children: [
              'run/agent/about',
              'run/agent/installation',
              'run/agent/configuration',
              'run/agent/report-hub',
              'run/agent/cluster-summary',
              'run/agent/action-items',
              'run/agent/vulnerabilities',
              'run/agent/workloads',
              'run/agent/add-ons',
              'run/agent/rbac',
              'run/agent/cluster-comparison',
            ],
          },
        ]
      },
      {
        title: 'Configure',
        children: [
          {
            title: 'Policy and Rules',
            children: [
              'configure/policy/policy',
              'configure/policy/rules',
              'configure/policy/cli',
            ],
          }, {
            title: 'Reports',
            children: [
              'configure/reports/polaris',
              'configure/reports/trivy',
              'configure/reports/goldilocks',
              'configure/reports/resource-metrics',
              'configure/reports/opa',
              'configure/reports/kube-bench',
              'configure/reports/nova',
              'configure/reports/pluto',
              'configure/reports/rbac-reporter',
              'configure/reports/kube-hunter',
              'configure/reports/kubesec',
              'configure/reports/workloads',
              'configure/reports/aws-costs',
              'configure/reports/falco',
              'configure/reports/supported-checks',
              'configure/reports/new',
            ],
          }, {
            title: 'Integrations',
            children: [
              'configure/integrations/slack',
              'configure/integrations/datadog',
              'configure/integrations/jira',
              'configure/integrations/github',
              'configure/integrations/pagerduty',
            ],
          }, {
            title: 'Account Management',
            children: [
              'configure/management/membership',
              'configure/management/sso',
              'configure/management/delete',
            ],
          },
        ]
      },
      {
        title: 'Technical Details',
        children: [
          {
            title: 'Architecture',
            children: [
              'technical-details/architecture/architecture',
              'technical-details/architecture/sample-reports',
            ],
          },
          {
            title: 'API Access',
            children: [
              'technical-details/api/authentication',
              'technical-details/api/clusters',
              'technical-details/api/reports',
              'technical-details/api/custom-reports',
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
