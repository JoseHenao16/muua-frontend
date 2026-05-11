// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'catalogo',
        name: 'catalogo',
        component: () => import('pages/CatalogoPage.vue')
      },
      {
        path: 'catalogo/:codigo',
        name: 'pieza',
        component: () => import('pages/PiezaPage.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
