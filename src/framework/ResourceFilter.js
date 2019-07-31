import _ from "lodash";
import {stringify} from 'query-string';

class ResourceFilter {
    static ENTITY = "ENTITY";
    static ENTITY_BY_PARENT = "ENTITY_BY_PARENT";
    static ENTITY_BY_PARAM_LIKE = "ENTITY_BY_PARAM_LIKE";

    static regexForStringEndingWithId = new RegExp("Id$");
    static regexForStringEndingWithAmpersand = new RegExp("&$");

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

    static filterAsQueryParam(filterField, filterValue) {
        let filterWrapper = {};
        let filter = {};
        filter[filterField] = filterValue;
        filterWrapper["filter"] = JSON.stringify(filter);
        return stringify(filterWrapper);
    }

    static isSelected(filterValue) {
        let toNumber = _.toNumber(filterValue);
        return !(toNumber === 0 || isNaN(toNumber));
    }
}

export default ResourceFilter;