export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://localhost:8080/differenziaquila/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/"
    }
}

export const STORAGE_KEYS = {
    USER: "differenziaquila_user"
}
