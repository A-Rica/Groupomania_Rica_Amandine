import http from "../http-common";

class connectDataService {

    signup(data) {
        return http.post("/auth/signup", data);
    }

    login(data) {
        return http.post("/auth/login", data)
    }
    signout(data) {
        return http.post("/signout", data);
    }

}
export default new connectDataService();  