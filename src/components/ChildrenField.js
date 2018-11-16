import React from 'react';
import PropTypes from 'prop-types';

const ChildrenField = ({source, record = {}}) => {
    let url = `/${source}/`;
    return <a href={url}>View</a>;
};

ChildrenField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired
};

export default ChildrenField;