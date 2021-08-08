import MainLayout from '../layouts/MainLayout'
import DiscussionBoardsPage from '../pages/big-ideas/DiscussionBoardsPage'

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
        path: 'register',
        name: 'MemberRegisteration',
        component: () => import('pages/membership/MemberRegistrationPage.vue'),
      },
      {
        path: 'login/landing',
        name: 'LoginLanding',
        component: () => import('pages/membership/LoginLandingPage.vue'),
      },
      {
        path: 'profile',
        name: 'MemberProfile',
        component: () => import('pages/membership/MemberProfilePage.vue'),
        meta: {
          requireAuth: true,
          role: 'member',
        },
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
        component: DiscussionBoardsPage,
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
