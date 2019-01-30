import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR} from 'react-admin';
import _ from 'lodash';

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

        const verifyLoginRequest = new Request('/api/loginSuccess', {
            method: 'GET'
        });

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
            })
            .then(() => {
                return fetch(verifyLoginRequest);
            })
            .then((verifyLoginResponse) => {
                if (verifyLoginResponse.status < 200 || verifyLoginResponse.status >= 300) {
                    throw new Error(verifyLoginResponse.statusText);
                }
            })
            .then(() => {
                localStorage.setItem('token', "LOGGED IN");
            });
    }
    else if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    else if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    else if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403 || status === 404) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    return Promise.resolve();
}