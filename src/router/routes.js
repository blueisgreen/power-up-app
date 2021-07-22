
import Account from 'pages/MemberProfilePage'

const routes = [
  {
    path: '/',  
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'profile', component: () => import('pages/MemberProfilePage.vue') },
      { path: 'learn', component: () => import('pages/ComingSoon.vue') },
      { path: 'boards', component: () => import('pages/ComingSoon.vue') },
      { path: 'simulation', component: () => import('pages/ComingSoon.vue') },
      { path: 'calculators', component: () => import('pages/ComingSoon.vue') },
      { path: 'support', component: () => import('pages/ComingSoon.vue') },
      { path: 'composer', component: () => import('pages/ComingSoon.vue') },
      { path: 'admin', component: () => import('pages/ComingSoon.vue') },
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
