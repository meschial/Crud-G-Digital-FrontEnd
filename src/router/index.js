import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/marcas',
    name: 'Marcas',
    component: () => import('../views/Marcas.vue')
  },
  {
    path: '/modelos',
    name: 'Modelos',
    component: () => import('../views/Modelos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
