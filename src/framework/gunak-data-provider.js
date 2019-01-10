import _ from 'lodash';
import {stringify} from 'query-string';
import {CREATE, DELETE, DELETE_MANY, fetchUtils, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE, UPDATE_MANY,} from 'react-admin';
import ResourceFilter from "./ResourceFilter";
import SpringResponse from "./SpringResponse";
import Pagination from "./Pagination";

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
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([
                        (page - 1) * perPage,
                        page * perPage - 1,
                    ]),
                    filter: JSON.stringify({
                        ...params.filter,
                        [params.target]: params.id,
                    }),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}s`;
                options.method = 'PUT';
                options.body = params.data.files ? createFormData(params.data) : JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}s`;
                options.method = 'POST';
                options.body = params.data.files ? createFormData(params.data) : JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
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
        const {json} = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return SpringResponse.toReactAdminResourceListResponse(json, resource);
            case GET_MANY:
                return {
                    data: json['_embedded'][resource]
                };
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
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
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
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };


};