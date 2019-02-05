import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        backgroundColor: 'grey'
    },
});

function InlineHelp(props) {
    const {classes} = props;
    return (<Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h4">{`${props.message}. Please see more details in `}<a href="#/help">{`Help #${props.helpNumber}`}</a></Typography>
    </Paper>);
}

InlineHelp.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    helpNumber: PropTypes.number.isRequired
};

export default withStyles(styles)(InlineHelp);