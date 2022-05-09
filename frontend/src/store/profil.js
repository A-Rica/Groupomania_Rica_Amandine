import axios from "axios"
export default ({

    namespaced: true,

    state: {
        name: null,
        lastname: null,
        email: null,
        password: null,
        id: null,
    },
    getters: {},
    mutation: {},
    actions: {
        async getId(_, credentials) {
            let response = axios.get("profil/me", credentials)
            console.log(response);
        }
    },
})