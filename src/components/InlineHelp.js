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
    let faqNumberPrefixMessage = props.helpNumber ? ' Please see more details in ' : '';
    let messageWithoutLink = `${props.message}.`;
    let linkedMessage = <a href="#/faq">{`FAQ #${props.helpNumber}`}</a>;
    return (<Paper className={classes.root} elevation={1}>
        <Typography variant="title" component="h4">{messageWithoutLink}{props.helpNumber ? linkedMessage : ''}</Typography>
    </Paper>);
}

InlineHelp.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    helpNumber: PropTypes.number.isRequired
};

export default withStyles(styles)(InlineHelp);