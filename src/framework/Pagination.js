import _ from "lodash";
import {stringify} from 'query-string';

class Pagination {
    static asSpringUrlPart(raPaginationObject, sort) {
        const { page, perPage} = raPaginationObject;
        const query = {
            page: page - 1,
            size: perPage,
            sort: (sort instanceof Object)? _.join(_.values(sort), ",") : sort
        };

        return stringify(query);
    }
}

export default Pagination;