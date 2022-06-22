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
    sidebarDepth: 2,
    sidebar: [
      ['/', 'Home'],
      {
        title: 'Installation',
        children: [
          {
            title: 'First steps',
            children: [
              'installation/getting-started',
              'installation/setup',
            ],
          }, {
            title: 'Insights Agent',
            children: [
              'installation/agent/about',
              'installation/agent/setup',
              'installation/agent/troubleshooting',
            ],
          }, {
            title: 'Admission Controller',
            children: [
              'installation/admission/about',
              'installation/admission/setup',
            ]
          }, {
            title: 'Continuous Integration',
            children: [
              'installation/ci/about',
              'installation/ci/github',
              'installation/ci/autoscan',
              'installation/ci/insights-ci-script',
            ],
          }, {
            title: 'Single Sign-On',
            children: [
              'installation/sso/sso',
            ],
          }, {
            title: 'Integrations',
            children: [
              'installation/integrations/slack',
              'installation/integrations/datadog',
              'installation/integrations/pagerduty',
              'installation/integrations/jira',
            ],
          },
        ]
      },
      {
        title: 'Configure',
        children: [
          {  
            title: 'Insights Agent',
            children: [
              'configure/agent/configuration',
              'configure/agent/install-hub',
            ],
          },
          {
            title: 'Admission Controller',
            children: [
              'configure/admission/configuration',
              'configure/admission/installhub-and-policies',
            ],
          },
          {
            title: 'Continuous Integration',
            children: [
              'configure/ci/configuration',
            ],
          }, {    
            title: 'Policies',
            children: [
              'configure/policy/opa-policy',
              'configure/policy/opa-v1',
            ],
          }, {
            title: 'Automation Rules',
            children: [
              'configure/automation/rules',
              'configure/automation/admission-controller',
              'configure/automation/integrations',
            ],
          }, {
            title: 'Insights CLI',
            children: [
              'configure/cli/cli',
              'configure/cli/automation-rules',
              'configure/cli/opa',
              'configure/cli/opa-v1',
              'configure/cli/settings',
            ],
          }, {  
            title: 'Account Management',
            children: [
              'configure/management/membership',
            ],
          },
        ]
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
        title: 'Technical Details',
        children: [
          {
            title: 'Architecture',
            children: [
              'technical-details/architecture/architecture',
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
