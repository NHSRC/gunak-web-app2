import React from 'react';
import PropTypes from 'prop-types';

const ChildrenField = ({source, cellLabel, record = {}}) => {
    let url = `/${source}/`;
    return <a href={url}>{cellLabel}</a>;
};

ChildrenField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    cellLabel: PropTypes.string.isRequired
};

export default ChildrenField;