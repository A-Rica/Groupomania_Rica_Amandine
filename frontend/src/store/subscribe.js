import store from '.';
import axios from 'axios'
store.subscribe((mutations) => {
    switch (mutations.type) {
        case 'auth/TOKEN':
            if (mutations.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutations.payload}`
                localStorage.setItem('token', mutations.payload);
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token');

            }
    }
})