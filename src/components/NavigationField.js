import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ResourceFilter from "../framework/ResourceFilter";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: 'lightgrey'
    },
});

const NavigationField = ({ classes, targetResource, filterField, display, source, record = {} }) => {
    let filterAsQueryParam = ResourceFilter.filterAsQueryParam(filterField, record[source]);
    return <Paper className={classes.root} elevation={0}>
        <Typography variant="title" component="h4"><a href={`#/${targetResource}?${filterAsQueryParam}`}>{`${display}`}</a></Typography>
    </Paper>
};

NavigationField.propTypes = {
    classes: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    targetResource: PropTypes.string.isRequired,
    filterField: PropTypes.string.isRequired
};

export default withStyles(styles)(NavigationField);