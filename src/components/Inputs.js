import React from 'react';
import PropTypes from 'prop-types';
import {required, ReferenceInput, SelectInput} from 'react-admin';

export const GunakReferenceInput = ({label, source, optionText, record, mandatory = true}) => {
    return <ReferenceInput label={label} source={`${source}Id`} reference={`${source}`} validate={mandatory ? [required("Mandatory")] : []}>
        <SelectInput optionText={optionText}/>
    </ReferenceInput>;
};

GunakReferenceInput.propTypes = {
    label: PropTypes.string.isRequired,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    optionText: PropTypes.string.isRequired,
    mandatory: PropTypes.bool
};