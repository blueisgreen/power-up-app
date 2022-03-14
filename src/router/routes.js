import MainLayout from 'layouts/MainLayout'
import AccountCenterLayout from 'layouts/AccountCenterLayout'
import WorkbenchLayout from 'layouts/WorkbenchLayout'
import SimpleLayout from 'layouts/SimpleLayout'

const routes = [
  {
    path: '/full/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'FrontPage',
        component: () => import('../pages/Index.vue'),
      },
      {
        path: 'about',
        component: () => import('../pages/about/AboutPage.vue'),
        children: [
          {
            path: '',
            name: 'AboutPage',
            component: () => import('../pages/about/AboutUs.vue'),
          },
          {
            path: 'terms',
            name: 'TermsOfUsePage',
            component: () => import('../pages/about/TermsOfUsePage.vue'),
          },
          {
            path: 'privacy',
            name: 'PrivacyPolicyPage',
            component: () => import('../pages/about/PrivacyPolicyPage.vue'),
          },
        ],
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
            component: () => import('../pages/account/MemberAccountPage.vue'),
          },
          {
            path: 'register',
            name: 'MemberRegistration',
            component: () =>
              import('../pages/account/MemberRegistrationPage.vue'),
          },
        ],
      },
      {
        path: 'learn',
        name: 'LearningCenter',
        component: () => import('../pages/lessons/LearningCenterPage.vue'),
      },
      {
        path: 'messages',
        name: 'SupportCenter',
        component: () => import('../pages/support/SupportPage.vue'),
      },
      {
        path: 'workbench',
        component: WorkbenchLayout,
        meta: {
          requireAuth: true,
          role: 'author',
        },
        children: [
          {
            path: 'articles',
            name: 'ArticleWorkbench',
            component: () => import('../pages/workbench/ArticleWorkbench.vue'),
          },
          {
            path: 'articles/edit/:articleId',
            name: 'ArticleComposer',
            component: () => import('../pages/workbench/ArticleComposer.vue'),
          },
          {
            path: 'lessonMgmt',
            name: 'LessonComposer',
            component: () => import('../pages/workbench/LessonComposer.vue'),
            meta: {
              requireAuth: true,
              role: 'editor',
            },
          },
        ],
      },
      {
        path: 'admin',
        name: 'AdminPanels',
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
      {
        path: 'scratch',
        name: 'Scratch',
        component: () => import('../pages/ScratchPad.vue'),
      },
    ],
  },

  {
    path: '/',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'StartSimple',
        component: () => import('../pages/SimpleStartPage.vue'),
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
