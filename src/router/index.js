import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/',
      name: 'Products',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('../views/Product.vue')
    },
  ]
})

export default router
