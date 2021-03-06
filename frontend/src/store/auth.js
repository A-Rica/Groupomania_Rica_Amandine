import axios from "axios";
import router from "../router"
export default ({
    namespaced: true,

    state: {
        token: null,
        user: null,
    },

    getters: {
        authenficated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
    },

    mutations: {
        USER(state, data) {
            state.user = data
        },
        TOKEN(state, token) {
            state.token = token
        },
    },
    actions: {
        async signin({ dispatch }, credentials) {
            let response = await axios.post("auth/login", credentials)
                .then((response) => {
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("token", response.data.token);
                    dispatch('attempt', response.data.token);
                    router.push({ name: "home" });
                });
            console.log(response);
        },

        async signup(_, credentials) {
            let response = await axios.post("auth/signup", credentials);
            console.log(response.data);
            alert('Vous êtes bien inscrit sur le réseaux de Groupomania. Vous pouvez, à présent, vous connecter.')
        },

        async attempt({ commit, state }, token) {
            if (token) {
                commit('TOKEN', token)
            }

            if (!state.token) {
                return
            }
            try {
                let response = await axios.get('profil/me'

                );
                // localStorage.setItem('user', JSON.stringify(response.data))

                commit('USER', response.data)
            }
            catch (error) {
                commit('TOKEN', null),
                    commit('USER', null)
            }
        },

        signout({ commit }) {
            return axios.post('auth/signout').then(() => {
                commit('TOKEN', null),
                    commit('USER', null)
            })
        }

    },


})