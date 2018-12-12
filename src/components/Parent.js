import React from 'react';
import PropTypes from 'prop-types';
import ParentResource from "../framework/ParentResource";
import _ from "lodash";

const Parent = ({parentResource}) => {
    if (_.isNil(parentResource)) return null;

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