
import Account from 'pages/MemberProfilePage'

const routes = [
  {
    path: '/',  
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'profile', component: () => import('pages/MemberProfilePage.vue') },
      { path: 'learn', component: () => import('pages/LearningCenterPage.vue') },
      { path: 'boards', component: () => import('pages/DiscussionBoardsPage.vue') },
      { path: 'simulation', component: () => import('pages/SimulationsPage.vue') },
      { path: 'calculators', component: () => import('pages/CalculatorsPage.vue') },
      { path: 'support', component: () => import('pages/SupportPage.vue') },
      { path: 'composer', component: () => import('src/pages/ContentComposerPage.vue') },
      { path: 'admin', component: () => import('pages/AdminPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
