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

function FAQ(props) {
    const {classes} = props;
    return (<div>
        {helpItem(classes, "1. What is the relationship between Program, Assessment tool and checklist?", "A program consists of multiple assessment tools. Each assessment tool consists of multiple checklists.")}
        {helpItem(classes, "2. During edit/create of Area of Concern certain fields - Assessment tool, Checklist, Area of concern, Standard and Measurable elements are not mandatory. Why is that?", "The names of Measurable elements, Standards, Area of concerns are similar/same between various assessment tools, area of concerns and standards. Hence in order to select the right item these items have been provided for filtering purposes.")}
        {helpItem(classes, "3. What does the error message \"Conflict\" mean?", "The error message conflict is shown when there is a uniqueness check failure. This is shown when Checklist, Area of concern, Standard, Measurable elements name/reference already exists.")}
        <Paper className={classes.root} elevation={1}>
            <Typography variant="title" component="h3">4. What is checklist duplication and state movement check?</Typography>
            <Typography variant="subheading" component="p">
                <li>If a checklist name exists as common, for all states, within an Assessment Tool then the same name cannot be used when creating a checklist for a
                    state.
                </li>
                <li>If a checklist name exists in an Assessment Tool for a specific state, then the same name cannot be used as the name for a common checklist. In
                    such a case it is recommended to change the name of the checklist for the state.
                </li>
                <li>But, if a checklist name exists for a state, within an Assessment Tool, then the same name can be used in for another state.</li>
                <li>A checklist cannot be moved to another state if there are checkpoints within the checklist that belong to common or to another state.</li>
            </Typography>
        </Paper>
        {helpItem(classes, "5. When should I choose/filter by state when creating and view checklists?", "If there is no state specific then the same checklist applies to all the states. If you choose a state then you will be shown all checklists belonging to that state as well as common checklists that apply to that state.")}
        {helpItem(classes, "6. How to sort checkpoints within a measurable element?", "The sort order field on checkpoint is used to display them in a logical order in the app when assessor is filling the scores. The checkpoints are displayed in ascending order based on the sort order value. While creating you can set the checkpoint sort order as any value. You can edit the checkpoints and set their sort order. At the bottom of edit checkpoint screen the other checkpoints belonging to the same checklist and in the measurable elements are shown.")}
        {helpItem(classes, "7. How to create checkpoints specific to a state?", "A checkpoint can belong a checklist which is common. In such a case one can choose the state and that checkpoint will be visible only to that state. Also, a checkpoint can belong to a checklist that is for a state. In such cases setting the state is not required and will be ignored.")}
        {helpItem(classes, "8. Why certain sheets/rows could not be imported?", "While importing the sheet name in the excel is used to identify the checklist, using the name match. If the checklist with the same name in the assessment tool, cannot be found then those are displayed under missing checklist. If a checkpoint in the excel file is not present in the database then those are listed as missing checkpoints.")}
        <Paper className={classes.root} elevation={1}>
            <Typography variant="title" component="h3">Understanding relationship between - PROGRAMS, ASSESSMENT TOOL and CHECKLIST - from left to right.</Typography>
            <br/>
            <img src="./images/programs.png" height="300" width="300" alt="Programs"/>
            <img src="./images/assessmentTools.png" height="300" width="350" alt="Assessment Tools" style={{"margin-left": "30px"}}/>
            <img src="./images/checklists.png" height="300" width="300" alt="Checklists" style={{"margin-left": "30px"}}/>
        </Paper>
    </div>);
}

FAQ.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAQ);