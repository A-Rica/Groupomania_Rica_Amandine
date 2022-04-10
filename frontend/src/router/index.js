import { createRouter, createWebHistory } from 'vue-router'
import ConnectPage from '../views/connectPage.vue'
import HomePage from '../views/homePage.vue'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: ConnectPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
