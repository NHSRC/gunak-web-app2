import React from 'react';
import {FormDataConsumer, ReferenceInput, SelectInput} from 'react-admin';
import {change} from 'redux-form';
import _ from 'lodash';

class RAFilterUtil {
    static handleFilterChange(currentFilter, currentFilterSource, filterValue, dispatchFn, dependentFilterSources = []) {
        currentFilter[currentFilterSource] = filterValue;
        dependentFilterSources.forEach(dependentFilterSource => dispatchFn(change('filterForm', dependentFilterSource, null)));
    }

    static createFilterItem(currentFilter, label, source, reference, sort, optionText, filter = {}, dependants = []) {
        return <FormDataConsumer form={'filterForm'} alwaysOn>
            {({formData, dispatch, ...rest}) => (
                <ReferenceInput label={label} source={source} reference={reference} alwaysOn perPage={100} sort={sort}
                                onChange={(obj, id) => {
                                    this.handleFilterChange(currentFilter, source, id, dispatch, dependants);
                                }}
                                filter={filter} allowEmpty>
                    <SelectInput optionText={optionText}/>
                </ReferenceInput>
            )}
        </FormDataConsumer>
    }

    static valuesFromMultiSelectFilter(filter) {
        return _.filter(_.keys(filter), (filterKey) => !_.isNaN(_.toNumber(filterKey))).map(filterKey => filter[filterKey]);
    }
}

export default RAFilterUtil;