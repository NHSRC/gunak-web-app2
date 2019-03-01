import _ from "lodash";
import {stringify} from 'query-string';

class Pagination {
    static asSpringUrlPart(raPaginationObject, sort) {
        const {page, perPage} = raPaginationObject;
        const query = {
            page: page - 1,
            size: perPage
        };

        if (sort instanceof Array) {
            query.sort = sort.map((sortItem) => _.join(_.values(sortItem), ","));
        } else if (sort instanceof Object)
            query.sort = _.join(_.values(sort), ",");
        else
            query.sort = sort;

        return stringify(query);
    }
}

export default Pagination;