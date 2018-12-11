import _ from "lodash";

class Filter {
    static ENTITY = "ENTITY";
    static ENTITY_BY_PARENT = "ENTITY_BY_PARENT";
    static ENTITY_BY_PARAM_LIKE = "ENTITY_BY_PARAM_LIKE";

    static getTypeOfListing(filter) {
        if (_.isNil(filter) || _.isEmpty(filter)) {
            return Filter.ENTITY;
        } else if (!_.isNil(filter["q"])) {
            return Filter.ENTITY_BY_PARAM_LIKE;
        } else {
            return this.ENTITY_BY_PARENT;
        }
    }
}

export default Filter;