import React from 'react';
import PropTypes from 'prop-types';
import ChildrenField from "./ChildrenField";
import InputLabel from '@material-ui/core/InputLabel';

const ChildrenNameFieldPair = ({source, parent, parentDisplayField, history, label, record = {}}) => {
    return <div>
        <br/>
        <br/>
        <br/>
        <InputLabel>{label}</InputLabel>
        <br/>
        <ChildrenField history={history} parent={parent} parentDisplayField={parentDisplayField} source={source} record={record} label={label}/>
    </div>
};

ChildrenNameFieldPair.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    parentDisplayField: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default ChildrenNameFieldPair;