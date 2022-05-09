import { createRouter, createWebHistory } from 'vue-router'
import ConnectPage from '../views/connectPage.vue'
import HomePage from '../views/homePage.vue'
import MembersPage from '../views/membersPage.vue'
import ModifPage from '../views/modifyProfilPage.vue'
import MessagePage from '../views/messagePage.vue'


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
    meta: { requiresAuth: [localStorage.getItem('userId'), localStorage.getItem('token')] }
  },
  {
    path: '/members',
    name: 'members',
    component: MembersPage,
    meta: { requiresAuth: [localStorage.getItem('userId'), localStorage.getItem('token')] }
  },
  {
    path: '/profil/:id',
    name: 'modifyProfil',
    component: ModifPage,
    meta: { requiresAuth: [localStorage.getItem('userId'), localStorage.getItem('token')] }
  },
  {
    path: '/message/:id',
    name: 'message',
    component: MessagePage,
    props: true,
    meta: { requiresAuth: [localStorage.getItem('userId'), localStorage.getItem('token')] }
  },


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
router.beforeEach((to, from) => {
  // const userId = localStorage.getItem('userId');
  // const token = localStorage.getItem('token');
  // const requiresAuth = [userId, token];
  // console.log(requiresAuth);
  console.log(to);
  console.log(from);
  console.log(to.matched.some(record => record.meta.requiresAuth));
})
export default router
