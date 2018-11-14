import { AUTH_LOGIN } from 'react-admin';
import _ from 'lodash';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        let postObject = { email: username, password: password };

        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");

        const request = new Request('/api/login', {
            method: 'POST',
            body: formBody,
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    }
    return Promise.resolve();
}