import React from 'react';
import PropTypes from 'prop-types';
import {required, ReferenceInput, SelectInput, AutocompleteInput} from 'react-admin';

export const GunakReferenceInput = ({label, source, optionText, record, onChange, sort = "name", filter = {}, mandatory = true, perPage = 25, autoComplete = false}) => {
    return <ReferenceInput label={label} source={`${source}Id`} reference={source} validate={mandatory ? [required("Mandatory")] : []} perPage={perPage} resource={source}
                           sort={sort} filter={filter}>
        {autoComplete ? <AutocompleteInput source={source} optionText={optionText} allowEmpty={false}/> : <SelectInput optionText={optionText}/>}
    </ReferenceInput>;
};

GunakReferenceInput.propTypes = {
    label: PropTypes.string.isRequired,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    optionText: PropTypes.string.isRequired,
    mandatory: PropTypes.bool,
    autoComplete: PropTypes.bool,
    filter: PropTypes.object,
    perPage: PropTypes.number,
    sort: PropTypes.string
};