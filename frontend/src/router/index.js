import { createRouter, createWebHistory } from 'vue-router'
import ConnectPage from '../views/connectPage.vue'
import HomePage from '../views/homePage.vue'
import MembersPage from '../views/membersPage.vue'
import ModifPage from '../views/modifyProfilPage.vue'
import MessagePage from '../views/messagePage.vue'
import Dashboard from '../views/dashBoard.vue'
import axios from 'axios'

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
    component: HomePage, beforeEnter: () => {
      let token = localStorage.getItem('token')
      if (token) {
        return true
      }
      router.push({ name: 'connexion' })
    }
  },
  {
    path: '/members',
    name: 'members',
    component: MembersPage, beforeEnter: () => {
      let token = localStorage.getItem('token')
      if (token) {
        return true
      }
      router.push({ name: 'connexion' })
    }
  },
  {
    path: '/profil/:id',
    name: 'modifyProfil',
    component: ModifPage, beforeEnter: () => {
      let token = localStorage.getItem('token')
      if (token) {
        return true
      }
      router.push({ name: 'connexion' })
    }
  },
  {
    path: '/message/:id',
    name: 'message',
    component: MessagePage,
    props: true, beforeEnter: () => {
      let token = localStorage.getItem('token')
      if (token) {
        return true
      }
      router.push({ name: 'connexion' })
    }

  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: Dashboard, beforeEnter: () => {
      axios.get("http://localhost:3000/api/profil/me").then((user) => {
        console.log(user.data.role);
        let administrateur = user.data.role
        if (administrateur == 'administrateur') {
          return true
        }

        router.push({ name: 'home' })
      })
    }
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
