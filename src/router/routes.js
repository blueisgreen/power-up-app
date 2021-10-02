import MainLayout from 'layouts/MainLayout'
import AccountCenterLayout from 'layouts/AccountCenterLayout'
import WorkbenchLayout from 'layouts/WorkbenchLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'FrontPage',
        component: () => import('../pages/Index.vue'),
      },
      {
        path: 'article/:articleId',
        name: 'ArticlePage',
        component: () => import('../pages/ArticleReaderPage.vue'),
        props: true,
      },
      {
        path: '/login/landing',
        name: 'LoginLanding',
        component: () => import('../pages/account/LoginLandingPage.vue'),
      },
      {
        path: 'account',
        component: AccountCenterLayout,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'UserAccount',
            component: () =>
              import('../pages/account/UserAccountOverviewPage.vue'),
          },
          {
            path: 'register',
            name: 'MemberRegistration',
            component: () =>
              import('../pages/account/MemberRegistrationPage.vue'),
          },
          {
            path: 'profile',
            name: 'MemberProfile',
            component: () => import('../pages/account/MemberProfilePage.vue'),
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
        component: () => import('../pages/lessons/LearningCenterPage.vue'),
      },
      {
        path: 'support',
        name: 'SupportCenter',
        component: () => import('../pages/SupportPage.vue'),
      },
      {
        path: 'lessonMgmt',
        name: 'Composer',
        component: () => import('../pages/authoring/LessonComposerPage.vue'),
        meta: {
          requireAuth: true,
          role: 'editor',
        },
      },
      {
        path: 'workbench',
        component: WorkbenchLayout,
        // meta: {
        //   requireAuth: true,
        //   role: 'editor',
        // },
        children: [
          {
            path: 'articles',
            name: 'ArticleWorkbench',
            component: () =>
              import('../pages/authoring/ArticleProductionPage.vue'),
          },
          {
            path: 'articles/edit/:articleId',
            name: 'ArticleEditor',
            component: () => import('../pages/authoring/ArticleEditPage.vue'),
          },
        ],
      },
      {
        path: 'admin',
        name: 'AdminPanel',
        component: () => import('../pages/admin/AdminPage.vue'),
        meta: {
          requireAuth: true,
          role: 'admin',
        },
      },
      {
        path: 'csr',
        name: 'CustomerSupportRep',
        component: () => import('../pages/csr/CustomerSupportCenter.vue'),
      },
      {
        path: 'boards',
        name: 'DiscussionBoards',
        component: () => import('../pages/big-ideas/DiscussionBoardsPage.vue'),
      },
      {
        path: 'sims',
        name: 'Simulations',
        component: () => import('../pages/big-ideas/SimulationsPage.vue'),
      },
      {
        path: 'calcs',
        name: 'Calculators',
        component: () => import('../pages/big-ideas/CalculatorsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/Error404.vue'),
  },
]

export default routes
