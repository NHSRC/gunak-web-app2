import _ from "lodash";
import {parseUrl} from 'query-string';

class ResourceFilter {
    static ENTITY = "ENTITY";
    static ENTITY_BY_PARENT = "ENTITY_BY_PARENT";
    static ENTITY_BY_PARAM_LIKE = "ENTITY_BY_PARAM_LIKE";

    static regexForStringEndingWithId = new RegExp("Id$");
    static regexForStringEndingWithAmpersand = new RegExp("&$");

    static parse(queryString) {
        if (_.isEmpty(queryString)) return null;

        let parsed = parseUrl(queryString);
        let filterString = parsed["query"]["filter"];
        return JSON.parse(filterString);
    }

    static getTypeOfListing(filter) {
        if (_.isNil(filter) || _.isEmpty(filter)) {
            return ResourceFilter.ENTITY;
        } else if (!_.isNil(filter["q"])) {
            return ResourceFilter.ENTITY_BY_PARAM_LIKE;
        } else {
            return this.ENTITY_BY_PARENT;
        }
    }

    static getResourcePath_ByParent(filter) {
        if (_.keys(filter).length === 1) {
            return `search/findBy${_.upperFirst(_.keys(filter)[0].replace(this.regexForStringEndingWithId, ''))}`;
        } else {
            return "search/find";
        }
    }

    static getParentParamString(filter) {
        let paramString = '';
        _.keys(filter).forEach((key) => {
            paramString += `${key}=${filter[key]}&`;
        });
        return paramString.replace(this.regexForStringEndingWithAmpersand, '');
    }
}

export default ResourceFilter;