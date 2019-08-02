import _ from "lodash";
import {change} from 'redux-form';

class RAFilterUtil {
    static handleFilterChange(currentFilter, currentFilterSource, filterValue, dispatchFn, dependentFilterSources = []) {
        currentFilter[currentFilterSource] = filterValue;
        dispatchFn(change('filterForm', 'districtId', null));
        dependentFilterSources.forEach(dependentFilterSource => dispatchFn(change('filterForm', dependentFilterSource, null)));
    }
}

export default RAFilterUtil;