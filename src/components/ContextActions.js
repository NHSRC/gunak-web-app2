import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    Link
} from 'react-admin';
import ResourceFilter from "../framework/ResourceFilter";

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        marginRight: 100
    }
};

const ContextActions = ({url, childResource, label}) => {
    if (_.isNil(url)) return null;

    let resourceFilter = ResourceFilter.parse(url);
    let record = {};
    _.keys(resourceFilter).forEach((key) => {
        record[key] = resourceFilter[key];
    });

    return <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="subheading" color="inherit" style={styles.grow}/>
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

ContextActions.propTypes = {
    url: PropTypes.object,
    childResource: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default ContextActions;