import _ from "lodash";
import {parseUrl} from 'query-string';

class Url {
    constructor(path) {
        this.path = path;
        let obj = parseUrl(this.fullString());
        let split = _.split(obj.url, "/", 3);
        if (split.length > 1) this.resource = split[1];
        if (split.length > 2) this.id = split[2];

        this.filter = obj.query.filter;
    }

    isResourceListing() {
        return _.isNil(this.id) && !_.isNil(this.resource);
    }

    isResourcePage() {
        return !_.isNil(this.resource) && !_.isNil(this.id);
    }

    hasFilter() {
        return !_.isNil(this.filter);
    }

    fullString() {
        if (this.path instanceof Object) {
            return this.path.pathname + this.path.search;
        } else {
            return this.path;
        }
    }
}

export default Url;