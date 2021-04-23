export default ({ router }) => {
  router.addRoutes([
    { path: '/reports/:target', redirect: to => {
      return '/configure/reports/' + to.params.target;
    }},
    { path: '/integrations/:target', redirect: to => {
      return '/configure/integrations/' + to.params.target;
    }},
    { path: '/architecture/architecture', redirect: to => {
      return '/technical-details/architecture/architecture';
    }},
    { path: '/installation/insights-agent', redirect: to => {
      return '/run/agent/installation';
    }},
    { path: '/features/rules', redirect: to => {
      return '/configure/policy/rules';
    }},
    { path: '/features/continuous-integration', redirect: to => {
      return '/run/ci/about';
    }},
    { path: '/features/workloads', redirect: to => {
      return '/run/agent/workloads';
    }},
    { path: '/features/admission-controller', redirect: to => {
      return '/run/admission/about';
    }},
    { path: '/404', redirect: to => {
      return '/';
    }},
    { path: '/404.html', redirect: to => {
      return '/';
    }},
  ])
}
