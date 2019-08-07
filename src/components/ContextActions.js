import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-admin';
import InlineHelp from "./InlineHelp";

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        marginRight: 100
    }
};

const ContextActions = ({userFilter, childResource, label, helpText}) => {
    let record = {};
    _.keys(userFilter).forEach((key) => {
        record[key] = userFilter[key];
    });

    return <div style={styles.root}>
        <AppBar position="static" style={{backgroundColor: 'black'}}>
            <Toolbar>
                <Typography variant="subheading" color="inherit" style={styles.grow}>{helpText}</Typography>
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
    userFilter: PropTypes.object.isRequired,
    childResource: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string
};

export default ContextActions;