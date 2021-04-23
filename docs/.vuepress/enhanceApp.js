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
