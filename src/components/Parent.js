import React from 'react';
import PropTypes from 'prop-types';
import ParentResource from "../framework/ParentResource";
import _ from "lodash";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    Link
} from 'react-admin';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        marginRight: 100
    }
};

const Parent = ({parentResource, childResource, label}) => {
    if (_.isNil(parentResource)) return null;

    let record = {};
    record[`${parentResource.name}Id`] = parentResource.id;
    return <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="subheading" color="inherit" style={styles.grow}>{ParentResource.toDisplay(parentResource)}</Typography>
                <Button
                    component={Link}
                    color="default"
                    variant="raised"
                    to={{
                        pathname: `/${childResource}/create`,
                        state: {record: record},
                    }}>{label}</Button>
            </Toolbar>
        </AppBar>
    </div>;
};

Parent.propTypes = {
    parentResource: PropTypes.object,
    childResource: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default Parent;