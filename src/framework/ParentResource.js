import _ from "lodash";
import {parseUrl} from 'query-string';

class ParentResource {
    constructor(name, display, id) {
        this.name = name;
        this.display = display;
        this.id = id;
    }

    //http://localhost:3000/#/checkpoint?filter=%7B%22stateId%22%3A6%7D&order=DESC&page=1&perPage=30&sort=id
    toFilter() {
        let value = {};
        value[this.name] = this.id;
        return JSON.stringify(value);
    }
}

export default ParentResource;