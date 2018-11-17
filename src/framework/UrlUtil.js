import _ from "lodash";

class UrlUtil {
    static getFindByParentResourcePath(filter) {
        let keys = _.keys(filter);
        return `search/findBy${_.upperFirst(keys[0])}/`;
    }

    static getParentParamString(filter) {
        let keys = _.keys(filter);
        let key = keys[0];
        return `${key}Id=${filter[key]}`;
    }
}

export default UrlUtil;