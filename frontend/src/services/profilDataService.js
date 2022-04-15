import http from "../http-common";
// import authHeader from "./auth-header";
class profilDataService {

    get(data) {
        return http.get(`/profil/user`, data);
    }
    put(data) {
        return http.post("/profil/user", data)
    }
    delete(data) {
        return http.post("/profil/user", data);
    }

}
export default new profilDataService();  