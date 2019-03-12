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
        marginBottom: theme.spacing.unit * 2
    },
});

let helpItem = function (classes, question, answer) {
    return <Paper className={classes.root} elevation={1}>
        <Typography variant="title" component="h3">{question}</Typography>
        <Typography variant="subheading" component="p">{answer}</Typography>
    </Paper>;
};

function GunakMobileAppHelp(props) {
    const {classes} = props;
    return (<div>
        {helpItem(classes, "Gunak App doesn't work even after uninstalling and installing it", "Uninstall the app. Install it, but do not open the app yet. Go to Android Settings -> Apps -> Storage -> Clear Cache and App Data both. Open the Gunak app now.")}
    </div>);
}

GunakMobileAppHelp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GunakMobileAppHelp);