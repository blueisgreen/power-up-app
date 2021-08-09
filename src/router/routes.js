import MainLayout from 'layouts/MainLayout'
import AccountCenterLayout from 'layouts/AccountCenterLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'FrontPage',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'account',
        component: AccountCenterLayout,
        children: [
          {
            path: '',
            name: 'UserAccount',
            component: () =>
              import('src/pages/account/UserAccountOverviewPage.vue'),
          },
          {
            path: '/login/landing',
            name: 'LoginLanding',
            component: () => import('pages/account/LoginLandingPage.vue'),
          },
          {
            path: 'register',
            name: 'MemberRegistration',
            component: () => import('pages/account/MemberRegistrationPage.vue'),
          },
          {
            path: 'profile',
            name: 'MemberProfile',
            component: () => import('pages/account/MemberProfilePage.vue'),
            meta: {
              requireAuth: true,
              role: 'member',
            },
          },
        ],
      },
      {
        path: 'learn',
        name: 'LearningCenter',
        component: () => import('pages/lessons/LearningCenterPage.vue'),
      },
      {
        path: 'support',
        name: 'SupportCenter',
        component: () => import('pages/SupportPage.vue'),
      },
      {
        path: 'drafting',
        name: 'Composer',
        component: () => import('pages/admin/ContentComposerPage.vue'),
        meta: {
          requireAuth: true,
          role: 'editor',
        },
      },
      {
        path: 'admin',
        name: 'AdminPanel',
        component: () => import('pages/admin/AdminPage.vue'),
        meta: {
          requireAuth: true,
          role: 'admin',
        },
      },
      {
        path: 'boards',
        name: 'DiscussionBoards',
        component: () => import('pages/big-ideas/DiscussionBoardsPage.vue'),
      },
      {
        path: 'sims',
        name: 'Simulations',
        component: () => import('pages/big-ideas/SimulationsPage.vue'),
      },
      {
        path: 'calcs',
        name: 'Calculators',
        component: () => import('pages/big-ideas/CalculatorsPage.vue'),
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
