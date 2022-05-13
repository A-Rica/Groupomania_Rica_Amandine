import { createRouter, createWebHistory } from 'vue-router'
import ConnectPage from '../views/connectPage.vue'
import HomePage from '../views/homePage.vue'
import MembersPage from '../views/membersPage.vue'
import ModifPage from '../views/modifyProfilPage.vue'
import MessagePage from '../views/messagePage.vue'
import Dashboard from '../views/dashBoard.vue'

// import store from '../store'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: ConnectPage,

  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/members',
    name: 'members',
    component: MembersPage,
  },
  {
    path: '/profil/:id',
    name: 'modifyProfil',
    component: ModifPage,
  },
  {
    path: '/message/:id',
    name: 'message',
    component: MessagePage,
    props: true,

  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: Dashboard,
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
// router.beforeEach((to, from, next) => {
//   // mise en place d'une condition pour voir si l'utilisateur est connecté.
//   // utilisation to.matched.some test la meta requiresAuth lier aux routes.

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const userConnected = store.getters['auth/authenficatedToken']
//     console.log(userConnected);
//     if (!userConnected && to.name !== 'connexion') {

//       return { name: 'connexion'}
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })
export default router
