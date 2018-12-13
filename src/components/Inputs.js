import React from 'react';
import PropTypes from 'prop-types';
import {required, ReferenceInput, SelectInput, AutocompleteInput} from 'react-admin';

export const GunakReferenceInput = ({label, source, optionText, record, mandatory = true, autoComplete = false}) => {
    return <ReferenceInput label={label} source={`${source}Id`} reference={`${source}`} validate={mandatory ? [required("Mandatory")] : []} perPage={20} resource={`${source}`}>
        {autoComplete ? <AutocompleteInput source={source} optionText={optionText} allowEmpty={false}/> : <SelectInput optionText={optionText}/>}
    </ReferenceInput>;
};

GunakReferenceInput.propTypes = {
    label: PropTypes.string.isRequired,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    optionText: PropTypes.string.isRequired,
    mandatory: PropTypes.bool,
    autoComplete: PropTypes.bool
};