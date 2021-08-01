import Account from 'pages/MemberProfilePage'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      {
        path: 'profile',
        name: 'register',
        component: () => import('pages/MemberProfilePage.vue'),
      },
      {
        path: 'learn',
        component: () => import('pages/LearningCenterPage.vue'),
      },
      {
        path: 'boards',
        component: () => import('pages/DiscussionBoardsPage.vue'),
      },
      {
        path: 'simulation',
        component: () => import('pages/SimulationsPage.vue'),
      },
      {
        path: 'calculators',
        component: () => import('pages/CalculatorsPage.vue'),
      },
      { path: 'support', component: () => import('pages/SupportPage.vue') },
      {
        path: 'composer',
        component: () => import('src/pages/ContentComposerPage.vue'),
      },
      { path: 'admin', component: () => import('pages/AdminPage.vue') },
      {
        path: 'login/landing',
        component: () => import('pages/LoginLandingPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
