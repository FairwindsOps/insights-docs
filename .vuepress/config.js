module.exports = {
  title: "Fairwinds Insights Documentation",
  description: "Documentation for the Fairwinds Insights Kubernetes auditing platform",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  base: '/insights-docs',
  themeConfig: {
    docsRepo: 'FairwindsOps/insights-docs',
    editLinks: true,
    editLinkText: 'Help us improve this page',
    logo: 'img/logo.svg',
    heroText: "",
    sidebar: [
      ['/', 'Home'],
      '/getting-started.html',
    ],
  }
}
