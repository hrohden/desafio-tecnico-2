import axios from 'axios';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios
          .post(`/api/auth`, { username, password });
    }

    createBearerAuthToken(token) {
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBearerAuthToken(token));
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getAuthenticatedUser() {
        if (this.isUserLoggedIn()) {
            return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        }
    }

    hasAdminPrivileges() {
        return !!this.getAuthenticatedUser();
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(config => {
            if (this.isUserLoggedIn()) {
                config.headers.authorization = token;
            }
            return config;
        })
    }

    logout() {
        axios.post('/api/logout')
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }
}

export default new AuthenticationService();