import { createRouter, createWebHistory } from 'vue-router'
import ConnectPage from '../views/connectPage.vue'
import HomePage from '../views/homePage.vue'
import MembersPage from '../views/membersPage.vue'
import ModifPage from '../views/modifyProfilPage.vue'
const routes = [
  {
    path: '/',
    name: 'connexion',
    component: ConnectPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,

  },
  {
    path: '/members',
    name: 'members',
    component: MembersPage
  },
  {
    path: '/profilModif',
    name: 'modifyProfil',
    component: ModifPage
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
