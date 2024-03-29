import _ from 'lodash';
import {stringify} from 'query-string';
import {CREATE, DELETE, DELETE_MANY, fetchUtils, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE, UPDATE_MANY,} from 'react-admin';
import ResourceFilter from "./ResourceFilter";
import SpringResponse from "./SpringResponse";
import Pagination from "./Pagination";
import ErrorResponse from "./ErrorResponse";
import GunakService from "../services/GunakService";

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {
                let pagination = Pagination.asSpringUrlPart(params.pagination, params.sort);
                let filter = params.filter;
                let typeOfListing = ResourceFilter.getTypeOfListing(filter);
                if (typeOfListing === ResourceFilter.ENTITY) {
                    url = `${apiUrl}/${resource}?${pagination}`;
                } else if (typeOfListing === ResourceFilter.ENTITY_BY_PARAM_LIKE) {
                    url = `${apiUrl}/${resource}/search/find?${stringify(filter)}&${pagination}`;
                } else if (typeOfListing === ResourceFilter.ENTITY_BY_PARENT) {
                    url = `${apiUrl}/${resource}/${ResourceFilter.getResourcePath_ByParent(filter)}?${ResourceFilter.getParentParamString(filter)}&${pagination}`;
                }

                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                url = `${apiUrl}/${resource}/search/findAllById?ids=${_.join(params["ids"])}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                let pagination = Pagination.asSpringUrlPart(params.pagination, params.sort);
                let constructedFilter = {};
                let id = params.id ? params.id : -1;
                constructedFilter[params.target] = id;
                url = `${apiUrl}/${resource}/${ResourceFilter.getResourcePath_ByParent(constructedFilter)}?${params.target}=${id}&${pagination}`;
                break;
            }
            case UPDATE:
                url = params.data.files ? `${apiUrl}/${resource}s/withFile` : `${apiUrl}/${resource}s`;
                options.method = 'PUT';
                options.body = params.data.files ? createFormData(params.data) : JSON.stringify(params.data);
                break;
            case CREATE:
                url = params.data.files ? `${apiUrl}/${resource}s/withFile` : `${apiUrl}/${resource}s`;
                options.method = 'POST';
                options.body = params.data.files ? createFormData(params.data) : JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}s/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return {url, options};
    };

    const createFormData = function (data) {
        let formData = new FormData();
        let file = data.files.rawFile;
        formData.append("uploadedFile", file);
        Object.keys(data).forEach(
            (k) => k === 'files' ? null : formData.append(k, data[k]));
        return formData;
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const {json, text} = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return SpringResponse.toReactAdminResourceListResponse(json, resource);
            case GET_MANY:
                return SpringResponse.toReactAdminResourceListResponse(json, resource);
            case CREATE:
                return {data: {...params.data, id: json.id}};
            default:
                return {data: json};
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            let payload = JSON.stringify(params.ids.map(id => Object.assign({id: id}, params.data)));
            let url = `${apiUrl}/${resource}s`;

            return httpClient("/api/ping").then(() => {
                let options = {
                    method: 'PATCH',
                    body: payload,
                    headers: new Headers({'Content-Type': 'application/JSON', 'X-XSRF-TOKEN': GunakService.getCsrfToken()})
                };
                console.log(`[GunakDataProvider][UPDATE_MANY]   URL=${url}   Options: ${JSON.stringify(options)}`);
                return httpClient(url, options).then(responses => {
                    console.log(responses);
                    return {data: responses.json};
                });
            })

        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id => {
                        let url = `${apiUrl}/${resource}/${id}`;
                        let options = {
                            method: 'DELETE',
                        };
                        console.log(`[GunakDataProvider][DELETE_MANY]   URL=${url}   Options: ${JSON.stringify(options)}`);
                        return httpClient(url, options);
                    }
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }

        const {url, options} = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        console.log(`[GunakDataProvider][OTHERS]   URL=${url}   Options: ${JSON.stringify(options)}`);
        return httpClient("/api/ping").then(() => {
            options.headers = new Headers({'Content-Type': 'application/JSON', 'X-XSRF-TOKEN': GunakService.getCsrfToken()})
            return httpClient(url, options).then(response => convertHTTPResponse(response, type, resource, params));
        }).catch((error) => {
            console.log(`[GunakDataProvider][ERROR]   URL=${url}   ${JSON.stringify(error)}`);
            throw ErrorResponse.toSpringAdminError(error, resource);
        });
    };
};
