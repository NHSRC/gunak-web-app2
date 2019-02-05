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
        <Typography variant="h5" component="h3">{question}</Typography>
        <Typography component="p">{answer}</Typography>
    </Paper>;
};

function FAQ(props) {
    const {classes} = props;
    return (<div>
        {helpItem(classes, "1. What is the relationship between Program, Assessment tool and checklist?", "A program consists of multiple assessment tools. Each assessment tool consists of multiple checklists.")}
        {helpItem(classes, "2. During edit/create of Area of Concern certain fields - Assessment tool, Checklist, Area of concern, Standard and Measurable elements are not mandatory. Why is that?", "The names of Measurable elements, Standards, Area of concerns are similar/same between various assessment tools, area of concerns and standards. Hence in order to select the right item these items have been provided for filtering purposes.")}
        {helpItem(classes, "3. What does the error message \"Conflict\" mean?", "The error message conflict is shown when there is a uniqueness check failure. This is shown when Checklist, Area of concern, Standard, Measurable elements name/reference already exists.")}
        <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">4. What is checklist duplication check?</Typography>
            <Typography component="p">
                <ul>
                    <li>If a checklist name exists as common, for all states, within an Assessment Tool then the same name cannot be used when creating a checklist for a
                        state.
                    </li>
                    <li>If a checklist name exists in an Assessment Tool for a specific state, then the same name cannot be used as the name for a common checklist. In
                        such a case it is recommended to change the name of the checklist for the state.
                    </li>
                    <li>But, if a checklist name exists for a state, within an Assessment Tool, then the same name can be used in for another state.</li>
                </ul>
            </Typography>
        </Paper>
        {helpItem(classes, "5. When should I choose/filter by state when creating and view checklists?", "If there is no state specific then the same checklist applies to all the states. If you choose a state then you will be shown all checklists belonging to that state as well as common checklists that apply to that state.")}
        {helpItem(classes, "6. How to sort checkpoints within a measurable element?", "The sort order field on checkpoint is used to display them in a logical order in the app when assessor is filling the scores. The checkpoints are displayed in ascending order based on the sort order value. While creating you can set the checkpoint sort order as any value. You can edit the checkpoints and set their sort order. At the bottom of edit checkpoint screen the other checkpoints belonging to the same checklist and in the measurable elements are shown.")}
    </div>);
}

FAQ.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAQ);