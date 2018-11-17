import React from 'react';
import PropTypes from 'prop-types';
import ParentResource from "../framework/ParentResource";

const Parent = ({parentResource}) => {
    return <div>
        <b>{ParentResource.toDisplay(parentResource)}</b>
        <br/>
        <br/>
        <br/>
    </div>;
};

Parent.propTypes = {
    parentResource: PropTypes.object.isRequired
};

export default Parent;