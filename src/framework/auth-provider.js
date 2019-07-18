import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import _ from 'lodash';

function daysFromLastAction() {
    let nowTimeStamp = new Date().getTime();
    let lastActionTime = localStorage.getItem('lastActionTime');
    return Math.floor(Math.abs(lastActionTime - nowTimeStamp )/(1000*60*60*24));
}

function updateLocalStoredTime() {
    let lastActionTime = new Date().getTime();
    localStorage.setItem('LastActionTime',lastActionTime);
}

function clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('LastActionTime');
}

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        let postObject = {email: username, password: password};

        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");

        const request = new Request('/api/login',{
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
        clearLocalStorage();
        return Promise.resolve();
    } else if (type === AUTH_CHECK) {
        if(daysFromLastAction()>=5){
            return Promise.reject();
        }else{
            updateLocalStoredTime();
            return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
        }
    } else if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 400 || status === 401 || status === 403 || status === 404) {
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