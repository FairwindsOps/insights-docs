const redirects = [{
  prefix: '/reports/',
  redirect: s => '/configure' + s,
}, {
  prefix: '/integrations/',
  redirect: s => '/configure' + s,
}, {
  prefix: '/architecture/',
  redirect: s => '/architecture' + s,
}, {
  prefix: '/installation/insights-agent',
  redirect: '/run/agent/installation',
}, {
  prefix: '/features/rules',
  redirect: '/features/automation-rules',
}, {
  prefix: '/features/continuous-integration',
  redirect: '/features/infrastructure-as-code-scanning',
}, {
  prefix: '/features/workloads',
  redirect: '/features/in-cluster-scanning',
}, {
  prefix: '/run/admission/configuration',
  redirect: '/features/admission-controller',
}, {
  prefix: '/run/agent/configuration',
  redirect: '/features/in-cluster-scanning',
}, {
  prefix: '/run/ci/configuration',
  redirect: '/features/infrastructure-as-code-scanning',
}, {
  prefix: '/run/agent/report-hub',
  redirect: '/features/in-cluster-scanning',
}, {
  prefix: '/run/agent/about',
  redirect: '/features/in-cluster-scanning',
}, {
  prefix: '/run/ci/about',
  redirect: '/features/infrastructure-as-code-scanning',
}, {
  prefix: '/run/ci/results',
  redirect: '/features/infrastructure-as-code-scanning',
}, {
  prefix: '/run/ci/github',
  redirect: '/features/integrations',
}, {
  prefix: '/run/admission/about',
  redirect: '/features/admission-controller',
}, {
  prefix: '/run/admission/setup',
  redirect: '/features/admission-controller',
}, {
  prefix: '/configure/policy/rules',
  redirect: '/features/automation-rules',
}, {
  prefix: '/configure/policy/cli',
  redirect: '/features/insights-cli',
}, {
  prefix: '/configure/integrations',
  redirect: s => '/installation' + s.replace('/configure', ''),
}, {
  prefix: '/configure/reports',
  redirect: s => '/technical-details' + s.replace('/configure', ''), // this isn't right yet
}, {
  prefix: '/run/agent/action-items',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/add-ons',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/rbac',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/vulnerabilities',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/workloads',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/cluster-comparison',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/agent/cluster-summary',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/admission/automation',
  redirect: s => '/code' + s.replace('/run/admission', '')
}, {
  prefix: '/technical-details/architecture/sample-reports',
  redirect: '/code/sample-reports',
}, {
  prefix: "/installation/getting-started",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/installation/setup",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/installation/agent/about",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/installation/agent/setup",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/installation/agent/troubleshooting",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/installation/admission/about",
  redirect: "/features/admission-controller",
}, {
  prefix: "/installation/admission/setup",
  redirect: "/features/admission-controller",
}, {
  prefix: "/installation/ci/about",
  redirect: "/features/infrastructure-as-code-scanning",
}, {
  prefix: "/installation/ci/autoscan",
  redirect: "/features/infrastructure-as-code-scanning",
}, {
  prefix: "/installation/ci/github",
  redirect: "/features/integrations",
}, {
  prefix: "/installation/ci/insights-ci-script",
  redirect: "/features/infrastructure-as-code-scanning",
}, {
  prefix: "/installation/sso/sso",
  redirect: "/features/team-management",
}, {
  prefix: "/installation/integrations/slack",
  redirect: "/features/integrations",
}, {
  prefix: "/installation/integrations/datadog",
  redirect: "/features/integrations",
}, {
  prefix: "/installation/integrations/pagerduty",
}, {
  prefix: "/installation/integrations/jira",
  redirect: "/features/integrations",
}, {
  prefix: "/installation/integrations/azure",
  redirect: "/features/integrations",
}, {
  prefix: "/configure/agent/configuration",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/configure/agent/install-hub",
  redirect: "/features/in-cluster-scanning",
}, {
  prefix: "/configure/admission/configuration",
  redirect: "/features/admission-controller",
}, {
  prefix: "/configure/admission/installhub-and-policies",
  redirect: "/features/admission-controller",
}, {
  prefix: "/configure/ci/autoscan",
  redirect: "/features/infrastructure-as-code-scanning",
}, {
  prefix: "/configure/ci/configuration",
  redirect: "/features/infrastructure-as-code-scanning",
}, {
  prefix: "/configure/policy/configurator",
  redirect: "/features/policies",
}, {
  prefix: "/configure/policy/opa-policy",
  redirect: "/features/policies",
}, {
  prefix: "/configure/policy/opa-v1",
  redirect: "/features/policies",
  redirect: "",
}, {
  prefix: "/configure/automation/rules",
  redirect: "/features/automation-rules",
}, {
  prefix: "/configure/automation/admission-controller",
  redirect: "/features/admission-controller",
}, {
  prefix: "/configure/automation/integrations",
  redirect: "/features/automation-rules",
}, {
  prefix: "/configure/cli/cli",
  redirect: "/features/insights-cli",
}, {
  prefix: "/configure/cli/automation-rules",
  redirect: "/features/automation-rules",
}, {
  prefix: "/configure/cli/opa",
  redirect: "/features/insights-cli",
}, {
  prefix: "/configure/cli/opa-v1",
  redirect: "/features/insights-cli",
}, {
  prefix: "/configure/cli/settings",
  redirect: "/features/insights-cli",
}, {
  prefix: "/configure/management/membership",
  redirect: "/features/team-management/",
}]

export default ({ router }) => {
  // FIXME(rbren): this is the only way I can get redirection to work on S3
  router.beforeEach((to, from, next) => {
    redirects.forEach(redir => {
      if (to.path.startsWith(redir.prefix)) {
        const target = typeof redir.redirect === 'string' ? redir.redirect : redir.redirect(to.path);
        console.log('redirecting from', to.path, 'to', target);
        setTimeout(() => {
          router.push(target);
        });
      }
    });
    next();
  });
}
