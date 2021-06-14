import axios from 'axios';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedToken';

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
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
        this.setupAxiosInterceptors(this.createBearerAuthToken(token));
    }

    isUserLoggedIn() {
        return !!sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    getAuthenticatedUser() {
        if (this.isUserLoggedIn()) {
            return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
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
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME)
    }
}

export default new AuthenticationService();