module.exports = {
  title: "Fairwinds Insights Documentation",
  description: "Documentation for the Fairwinds Insights Kubernetes auditing platform",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  base: '/insights-docs/',
  themeConfig: {
    docsRepo: 'FairwindsOps/insights-docs',
    editLinks: true,
    editLinkText: 'Help us improve this page',
    logo: '/img/logo.svg',
    heroText: "",
    sidebar: [
      ['/intro', 'Home'],
    {
      title: "Installation",
      collapsable: false,
      children: [
        '/getting-started',
        '/insights-agent',
      ],
    }, {
      title: "Features",
      collapsable: false,
      children: [
        "/features/action-items",
      ],
    }],
  },
  plugins: {
    'vuepress-plugin-clean-urls': {
      normalSuffix: '',
      notFoundPath: '/404.html',
    },
    redirect: {
      redirectors: [
        {
          base: '/',
          alternative: [
            'intro',
          ],
        },
      ],
    },
  },
}
