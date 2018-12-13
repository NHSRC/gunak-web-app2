import React from 'react';
import PropTypes from 'prop-types';
import ChildrenField from "./ChildrenField";

const ChildrenNameFieldPair = ({source, parent, parentDisplayField, history, label, record = {}}) => {
    return <ChildrenField history={history} parent={parent} parentDisplayField={parentDisplayField} source={source} record={record} label={label}/>
};

ChildrenNameFieldPair.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    parentDisplayField: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

ChildrenNameFieldPair.defaultProps = {
    addLabel: true
};

export default ChildrenNameFieldPair;