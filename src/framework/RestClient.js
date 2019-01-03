import _ from 'lodash';
import request from 'superagent';

class RestClient {
    static get(path, params) {
        let url = _.isNil(params) ? `${path}/` : `${path}?${RestClient._makeParams(params)}`;

        let headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
        return request.get(`/api/${url}`).set({
            headers: headers
        });
    }

    static getJSON(path, params) {
        return RestClient.get(path, params).then((streamedResponse) => streamedResponse.body);
    }

    static _makeParams(obj) {
        return _.toPairs(obj).map((kv) => kv.join('=')).join("&");
    }

    static postMultipart(path, files, params) {
        let promise = request.post(`/api/${path}`);
        _.toPairs(files).forEach((file) => {
            promise = promise.attach(file[0], file[1]);
        });
        _.toPairs(params).forEach((param) => {
            promise = promise.field(param[0], param[1]);
        });
        return promise.then((streamedResponse) => streamedResponse.body);
    }

    static post(path, obj) {
        let encodedObj = _.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        let formBody = encodedObj.join("&");

        return request.post(path).set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8').send(formBody);
    }
}

export default RestClient;