import _ from "lodash";
import {parseUrl} from 'query-string';

class ParentResource {
    constructor(name, display, id) {
        this.name = name;
        this.display = display;
        this.id = id;
    }

    static getResourcePath_ByParent(parentResource) {
        return `search/findBy${_.upperFirst(parentResource.name)}/`;
    }

    static getParentParamString(parentResource) {
        return `${parentResource.name}Id=${parentResource.id}`;
    }

    static parse(queryString) {
        if (_.isEmpty(queryString)) return null;
        let parsed = parseUrl(queryString);
        let filterString = parsed["query"]["filter"];
        return JSON.parse(filterString);
    }

    static toDisplay(parentResource) {
        return `${_.startCase(parentResource.name)}: ${parentResource.display}`;
    }
}

export default ParentResource;