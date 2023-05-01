import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },    
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/createPage.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/productPage.vue')
    }
  ]
})

export default router
