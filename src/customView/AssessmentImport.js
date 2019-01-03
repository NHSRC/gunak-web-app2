import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BaseCustomComponent from "../components/BaseCustomComponent";
import {AssessmentImportAction} from "../actions/AssessmentImportAction";
import UploadStatusComponent from "../components/UploadStatusComponent";
import FacilitySelectionProcess from "../model/FacilitySelectionProcess";
import GunakModal from "../components/GunakModal";
import FormSelectControl from "../components/FormSelectControl";
import FileUploadControl from "../components/FileUploadControl";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class AssessmentImport extends BaseCustomComponent {
    constructor(props) {
        super(props);
        this.state = AssessmentImportAction.empty();
    }

    componentDidMount() {
        AssessmentImportAction.onLoad(this.state).then(this.setState).catch(this.setState);
    }

    assessmentToolModeSelected(event) {
        AssessmentImportAction.assessmentToolModeSelected(this.state, event.target.value).then(this.setState);
    }

    assessmentToolSelected(event) {
        AssessmentImportAction.assessmentToolSelected(this.state, event.target.value).then(this.setState);
    }

    checklistSelected(event) {
        this.setState(AssessmentImportAction.checklistSelected(this.state, event.target.value));
    }

    stateSelected(event) {
        AssessmentImportAction.stateSelected(this.state, event.target.value).then(this.setState);
    }

    districtSelected(event) {
        AssessmentImportAction.districtSelected(this.state, event.target.value).then(this.setState);
    }

    facilityTypeSelected(event) {
        AssessmentImportAction.facilityTypeSelected(this.state, event.target.value).then(this.setState);
    }

    assessmentTypeSelected(event) {
        this.setState(AssessmentImportAction.assessmentTypeSelected(this.state, event.target.value));
    }

    facilitySelected(event) {
        this.setState(AssessmentImportAction.facilitySelected(this.state, event.target.value));
    }

    facilityNameEntered(event) {
        this.setState(AssessmentImportAction.facilityNameChanged(this.state, event.target.value));
    }

    fileChanged(event) {
        this.setState(AssessmentImportAction.uploadFileSelected(this.state, event.target.files[0]));
    }

    handleUploadConfirmed() {
        this.setState(AssessmentImportAction.uploadProcessConfirmed(this.props.state));
        this.newFileInput.value = this.updateFileInput.value = "";
    }

    onNewAssessmentSubmit(e) {
        e.preventDefault();
        this.setState(AssessmentImportAction.startAssessmentUpload(this.state));
        AssessmentImportAction.submitNewAssessment(this.state).then(this.setState);
    }

    onExistingAssessmentSubmit(e) {
        e.preventDefault();
        this.setState(AssessmentImportAction.startAssessmentUpload(this.state));
        AssessmentImportAction.submitExistingAssessment(this.state).then(this.setState);
    }

    facilityAssessmentChanged(event) {
        this.setState(AssessmentImportAction.facilityAssessmentEntered(this.state, event.target.value));
    }

    render() {
        const {classes} = this.props;
        // if (!GlobalState.initialised) return <div/>;

        // if (!GlobalState.isLoggedIn) {
        //     return <Redirect to={{pathname: '/'}}/>
        // }

        {/*<div className="static-modal">*/
        }
        {/*<Modal.Dialog>*/
        }
        {/*<Modal.Header>*/
        }
        {/*<Modal.Title>Loading....</Modal.Title>*/
        }
        {/*</Modal.Header>*/
        }
        {/*</Modal.Dialog>*/
        }
        {/*</div>*/
        }

        return <div>
            {this.state.loading ?
                <GunakModal/>
                :
                <div>
                    <UploadStatusComponent state={this.state} confirmUpload={this.handleUploadConfirmed.bind(this)}/>
                    <FormControl>
                        <FormLabel component="legend">Program</FormLabel>
                        <RadioGroup
                            aria-label="Program"
                            name="program"
                            className={classes.group}
                            value={this.state.selectedAssessmentToolMode.name}
                            onChange={this.assessmentToolModeSelected.bind(this)}
                        >
                            {this.state.assessmentToolModes.map((assessmentToolMode) => <FormControlLabel value="assessmentToolMode.name" control={<Radio/>}
                                                                                                          label={assessmentToolMode.name}/>)}
                        </RadioGroup>
                    </FormControl>

                    <FormSelectControl options={this.state.assessmentTools} labelName="assessmentTool" label="Assessment Tool"
                                       value={this.state.selectedAssessmentTool.name} onChange={this.assessmentToolSelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>
                    <FormSelectControl options={this.state.checklists} labelName="checklist" label="Checklist"
                                       value={this.state.selectedChecklist.name} onChange={this.checklistSelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>
                    <FormSelectControl options={this.state.states} labelName="state" label="State"
                                       value={this.state.selectedState.name} onChange={this.stateSelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>
                    <FormSelectControl options={this.state.districts} labelName="district" label="District"
                                       value={this.state.selectedDistrict.name} onChange={this.districtSelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>
                    <FormSelectControl options={this.state.facilityTypes} labelName="facilityType" label="Facility type"
                                       value={this.state.selectedFacilityType.name} onChange={this.facilityTypeSelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>
                    <FormSelectControl options={this.state.facilities} labelName="facility" label="Facility"
                                       value={this.state.selectedFacility.name} onChange={this.facilitySelected.bind(this)} displayProperty="name"
                                       valueProperty="name"/>

                    <TextField required
                               id="facilityName"
                               label="Facility name (if not present in list)"
                               className={classes.textField}
                               margin="normal"
                               variant="outlined"
                               value={this.state.facilityName}
                               onChange={this.facilityNameEntered.bind(this)}/>

                    <FormSelectControl valueProperty="name" displayProperty="name" onChange={this.assessmentTypeSelected.bind(this)}
                                       value={this.state.selectedAssessmentType.name} options={this.state.assessmentTypes} label="Assessment type"
                                       labelName="assessmentType"/>

                    <FileUploadControl classes={classes} label="Assessment file (only .XLSX file supported)" accept="*.xlsx" id="assessmentFile"
                                       onUpload={this.fileChanged.bind(this)} ref={ref => this.newFileInput = ref}/>

                    <button type="submit" className="btn btn-primary" disabled={!FacilitySelectionProcess.isSubmittable(this.state)}
                            onClick={this.onNewAssessmentSubmit.bind(this)}>Submit Assessment
                    </button>

                    <br/>
                    <hr/>
                    <br/>

                    <h4>Re-upload (overwrites an already uploaded assessment)</h4>
                    <TextField id="systemIdentifier"
                               label="System identifier (provided by the system when you last uploaded the file)"
                               className={classes.textField}
                               margin="normal"
                               variant="outlined"
                               value={this.state.facilityAssessmentUuid}
                               onChange={this.facilityAssessmentChanged.bind(this)}/>

                    <FileUploadControl classes={classes} label="Assessment file (only .XLSX file supported)" accept="*.xlsx" id="updatedAssessmentFile"
                                       onUpload={this.fileChanged.bind(this)} ref={ref => this.updateFileInput = ref}/>

                    <Button variant="contained" color="primary" className={classes.button} type="submit" action={this.onExistingAssessmentSubmit.bind(this)}
                            disabled={!FacilitySelectionProcess.isUpdatable(this.state)}>Update Assessment</Button>
                </div>
            }
        </div>
    };
}

export default withStyles(styles)(AssessmentImport);