export default [
  {
    title: "What's New",
    caption: 'The latest headlines and articles',
    icon: 'fas fa-home',
    route: 'FrontPage',
    exact: true,
  },
  {
    title: 'Account',
    caption: 'Your account information',
    icon: 'fas fa-user',
    route: 'UserAccount',
    exact: true,
    rolesWithAccess: ['member'],
  },
  {
    title: 'Support',
    caption: 'Get help with Power Up',
    icon: 'far fa-life-ring',
    route: 'SupportCenter',
  },
  {
    title: 'Article Workbench',
    caption: 'For creating articles (editors only)',
    icon: 'far fa-edit',
    route: 'ArticleWorkbench',
    rolesWithAccess: ['author', 'editor', 'editorInChief'],
  },
  {
    title: 'Customer Support',
    caption: 'Administrators only',
    icon: 'fas fa-headset',
    route: 'CustomerSupportRep',
    rolesWithAccess: ['admin'],
  },
  {
    title: 'Administration',
    caption: 'Administrators only',
    icon: 'fas fa-tools',
    route: 'AdminPanels',
    rolesWithAccess: ['admin'],
  },
  {
    title: 'About',
    caption: 'About Power Up Magazine',
    icon: 'fas fa-atom',
    route: 'AboutPage',
  },
  {
    title: 'Scratch',
    caption: 'About Power Up Magazine',
    icon: 'fas fa-atom',
    route: 'Scratch',
  },
]
