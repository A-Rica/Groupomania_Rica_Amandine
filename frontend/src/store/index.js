import { createStore } from 'vuex'
import auth from './auth'
// import axios from 'axios'


export default createStore({
  state: {
    // user: {
    //   name: '',
    //   lastname: '',
    //   email: '',
    //   id: '',
    //   token: '',
    //   userIsAdmin: false
    // }
  },
  getters: {
  },
  mutations: {
    // saveInfos(state, [name, lastname, email, userId, userIsAdmin]) {
    //   state.user.name = name,
    //     state.user.lastname = lastname,
    //     state.user.email = email,
    //     state.user.id = userId,
    //     state.user.userIsAdmin = userIsAdmin
    // },

  },
  actions: {


    // UserInfos(infoUser) {
    //   axios
    //     .get("http://localhost:3000/api/profil/user", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token")
    //       }
    //     })
    //     .then(response => {
    //       console.log(response);
    //       infoUser.commit('saveInfos', [response.data.name, response.data.lastname, response.data.userId, response.data.email, response.data.userIsAdmin])
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
  },
  modules: {
    auth,
  }
})
