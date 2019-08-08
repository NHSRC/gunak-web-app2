import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import _ from 'lodash';

const sessionDurationSeconds = 1000 * 60 * 60 * 24 * 5;
const lastActionTimeStorageKey = "LAST_ACTION_TIME";

function sessionExpired() {
    let nowTimeStamp = new Date().getTime();
    let lastActionTime = localStorage.getItem(lastActionTimeStorageKey);
    let difference = Math.abs((lastActionTime ? lastActionTime : nowTimeStamp) - nowTimeStamp);
    console.log('[AUTH PROVIDER][AUTH_LOGIN]', 'Inactivity period duration in seconds: ', difference/1000);
    return difference > sessionDurationSeconds;
}

function updateLocalStoredTime() {
    let lastActionTime = new Date().getTime();
    localStorage.setItem(lastActionTimeStorageKey, lastActionTime);
}

function clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem(lastActionTimeStorageKey);
}

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        let postObject = {email: username, password: password};

        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");

        const request = new Request('/api/login', {
            method: 'POST',
            body: formBody,
            headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
        });

        const verifyLoginRequest = new Request('/api/currentUser', {
            method: 'GET'
        });

        console.log(`[AUTH PROVIDER][AUTH_LOGIN]   Request: ${JSON.stringify(request)}`);
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
            })
            .then(() => {
                console.log(`[AUTH PROVIDER][VERIFY_LOGIN]   Request: ${JSON.stringify(verifyLoginRequest)}`);
                return fetch(verifyLoginRequest);
            })
            .then((verifyLoginResponse) => {
                if (verifyLoginResponse.status < 200 || verifyLoginResponse.status >= 300) {
                    throw new Error(verifyLoginResponse.statusText);
                }
                return verifyLoginResponse.json();
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                updateLocalStoredTime();
            });
    } else if (type === AUTH_LOGOUT) {
        console.log(`[AUTH PROVIDER][AUTH_LOGOUT] Clearing local storage`);
        clearLocalStorage();
        return Promise.resolve();
    } else if (type === AUTH_CHECK) {
        if (sessionExpired()) {
            console.log("[AuthProvider][AUTH_CHECK]   Session expired");
            return Promise.reject();
        }
        updateLocalStoredTime();
        return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
    } else if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403 || status === 404) {
            clearLocalStorage();
            return Promise.reject();
        }
        return Promise.resolve();
    } else if (type === AUTH_GET_PERMISSIONS) {
        let userAsJSON = localStorage.getItem('user');
        return userAsJSON ? Promise.resolve(JSON.parse(userAsJSON)["privileges"]) : Promise.reject();
    }
    return Promise.resolve();
}