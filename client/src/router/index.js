import { createRouter, createWebHistory } from 'vue-router'


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
    },
    {
      path: '/myitems',
      name: 'myitems',
      component: () => import('../views/myListings.vue')
    },
    {
      path: '/edit/product/:id',
      name: 'editProduct',
      component: () => import('../views/editPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notFoundPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isloggedIn = (localStorage.isloggedIn === 'true');
  if (to.path !== '/' && !(isloggedIn)){
    console.log("inside")
    next('/');
  } else {
    next();
  }

  
});

export default router
