import React from 'react';
import PropTypes from 'prop-types';
import {ReferenceInput, required, SelectInput, AutocompleteInput} from 'react-admin';

export const GunakReferenceInput = ({label, source, optionText, record, onChange, sort = "name", filter = {}, mandatory = true, perPage = 100, autoComplete = false}) => {
    return <ReferenceInput label={label} source={`${source}Id`} reference={source} validate={mandatory ? [required("Mandatory")] : []} perPage={perPage} resource={source}
                           sort={sort} filter={filter}>
        {autoComplete ? <AutocompleteInput optionText={optionText} options={{ fullWidth: true }} resettable={true}/> : <SelectInput optionText={optionText} resettable={true}/>}
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