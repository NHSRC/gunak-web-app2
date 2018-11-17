import React from 'react';
import PropTypes from 'prop-types';

const ChildrenField = ({source, parent, record = {}}) => {
    // e.g. /#/measurableElement?parentId=1&parent=standard`;
    let parentInfo = {};
    parentInfo[parent] = record["id"];
    let filter = JSON.stringify(parentInfo);
    let url = `/#/${source}?filter=${filter}`;
    return <a href={url}>View</a>;
};

ChildrenField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired
};

export default ChildrenField;