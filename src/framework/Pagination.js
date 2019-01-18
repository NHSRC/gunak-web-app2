import _ from "lodash";
import {stringify} from 'query-string';

class Pagination {
    static asSpringUrlPart(raPaginationObject, sort) {
        const {page, perPage} = raPaginationObject;
        const query = {
            page: page - 1,
            size: perPage
        };

        let sortString;
        if (sort instanceof Array) {
            let sortStringParts = sort.map((sortItem) => _.join(_.values(sortItem), ","));
            query.sort = sortStringParts;
        } else if (sort instanceof Object)
            query.sort = _.join(_.values(sort), ",");
        else
            query.sort = sort;

        return stringify(query);
    }
}

export default Pagination;