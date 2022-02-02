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
  redirect: '/configure/policy/rules',
}, {
  prefix: '/features/continuous-integration',
  redirect: '/run/ci/about',
}, {
  prefix: '/features/continuous-integration',
  redirect: '/run/ci/about',
}, {
  prefix: '/features/workloads',
  redirect: '/run/agent/workloads',
}, {
  prefix: '/features/admission-controller',
  redirect: '/run/admission/about',
}, {
  prefix: '/features/cli',
  redirect: '/configure/policy/cli',
}, {
  prefix: '/run/admission/configuration',
  redirect: '/configure/admission/configuration',
}, {
  prefix: '/run/agent/configuration',
  redirect: '/configure/agent/configuration',
}, {
  prefix: '/run/ci/configuration',
  redirect: '/configure/ci/configuration',
}, {
  prefix: '/run/agent/report-hub',
  redirect: '/configure/agent/install-hub',
}, {
  prefix: '/run/agent/about',
  redirect: '/installation/agent/setup',
}, {
  prefix: '/run/ci/about',
  redirect: '/installation/ci/about',
}, {
  prefix: '/run/ci/results',
  redirect: '/installation/ci/results',
}, {
  prefix: '/run/ci/github',
  redirect: '/installation/ci/github',
}, {
  prefix: '/run/admission/about',
  redirect: '/installation/admission/about',
}, {
  prefix: '/run/admission/setup',
  redirect: '/installation/admission/setup',
}, {
  prefix: '/configure/policy/rules',
  redirect: '/configure/automation/integrations', // maybe pick a different one here
}, {
  prefix: '/configure/policy/cli',
  redirect: '/configure/cli/cli',
}, {
  prefix: '/configure/integrations',
  redirect: s => '/installation' + s.replace('/configure', ''),
}, {
  prefix: '/configure/reports',
  redirect: s => '/technical-details' + s.replace('/configure', ''), // this isn't right yet
}, {
  prefix: '/run/agent',
  redirect: s => '/code' + s.replace('/run/agent', '')
}, {
  prefix: '/run/admission',
  redirect: s => '/code' + s.replace('/run/admission', '')
}, {
  prefix: '/technical-details/architecture/sample-reports',
  redirect: '/code/sample-reports',
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
