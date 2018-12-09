import React from 'react';
import PropTypes from 'prop-types';
import ParentResource from "../framework/ParentResource";

const ChildrenField = ({source, parent, parentDisplayField, record = {}}) => {
    let parentResource = new ParentResource(parent, record[parentDisplayField], record["id"]);
    let url = `/#/${source}?filter=${JSON.stringify(parentResource)}`;
    return <a href={url}>View</a>;
};

ChildrenField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    parentDisplayField: PropTypes.string.isRequired
};

export default ChildrenField;