import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({});

class InlineHelp extends React.Component {
    render() {
        const {classes} = this.props;
        return (<Paper className={classes.root} elevation={1} >
            <Typography variant="h5" component="h4">{`${this.props.message}. Please see more details in `}<a href="#/help">{`Help #${this.props.helpNumber}`}</a></Typography>
        </Paper>);
    }
}

InlineHelp.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    helpNumber: PropTypes.number.isRequired
};

export default withStyles(styles)(InlineHelp);