import React, {Fragment} from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormDataConsumer,
    List,
    LongTextInput,
    NumberField,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    SimpleForm,
    TextField
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import Privileges from "../model/Privileges";
import ToggleActiveInactiveButton from '../components/ToggleActiveInactiveButton';
import GunakFilters from "../components/GunakFilters";
import ResourceFilter from "../framework/ResourceFilter";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() &&
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        {GunakFilters.AssessmentTool(currentFilter, ['checklistId', 'areaOfConcernId', 'standardId', 'measurableElementId'])}

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) && GunakFilters.Checklist(currentFilter, props, ['areaOfConcernId', 'standardId', 'measurableElementId'])}

        {ResourceFilter.isSelected(props.filterValues.checklistId) && GunakFilters.AreaOfConcern(currentFilter, props, ['standardId', 'measurableElementId'])}

        {ResourceFilter.isSelected(props.filterValues.areaOfConcernId) && GunakFilters.Standard(currentFilter, props, ['measurableElementId'])}

        {ResourceFilter.isSelected(props.filterValues.standardId) &&
        <ReferenceInput label="Measurable element" source="measurableElementId" reference="measurableElement" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{standardId: props.filterValues.standardId, checklistId: props.filterValues.checklistId}}
                        onChange={(obj, id) => {
                            currentFilter.measurableElementId = id;
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}
    </Filter>
);

const BulkActionButtons = props => (
    <Fragment>
        <ToggleActiveInactiveButton label="Active" inactive={false} {...props}/>
        <ToggleActiveInactiveButton label="Inactive" inactive={true} {...props} />
    </Fragment>
);

export const CheckpointList = ({privileges, ...props}) => {
    return (
        <div>
            <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="checkpoint"/>
            <List {...props} title='Checkpoints' perPage={25} filters={<EntityFilter/>} bulkActionButtons={<BulkActionButtons/>} sort={{field: 'measurableElement.reference', order: 'ASC'}}>
                <Datagrid rowClick="edit">
                    <ReferenceField label="Measurable Element" source="measurableElementId" reference="measurableElement" sortBy="measurableElement.reference">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <TextField source="name"/>
                    <NumberField source="sortOrder"/>
                    <TextField source="meansOfVerification"/>
                    <BooleanField source="assessmentMethodObservation" label="AM Obs"/>
                    <BooleanField source="assessmentMethodStaffInterview" label="AM Staff Interview"/>
                    <BooleanField source="assessmentMethodPatientInterview" label="AM Patient Interview"/>
                    <BooleanField source="assessmentMethodRecordReview" label="AM Record Review"/>
                    <BooleanField source="optional"/>
                    <BooleanField source="inactive"/>
                    <TextField source="id"/>
                    <ReferenceField label="Checklist" source="checklistId" reference="checklist" sortBy="checklist.name">
                        <TextField source="name"/>
                    </ReferenceField>
                    <ReferenceField label="State" source="stateId" reference="state" sortBy="state.name" allowEmpty>
                        <TextField source="name"/>
                    </ReferenceField>
                    {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
                </Datagrid>
            </List>
        </div>
    );
};

let form = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <LongTextInput source="name" validate={[required("Mandatory")]}/>
        <LongTextInput source="meansOfVerification" validate={[required("Mandatory")]}/>
        <BooleanInput source="assessmentMethodObservation" validate={[required("Mandatory")]} defaultValue={false}/>
        <BooleanInput source="assessmentMethodStaffInterview" validate={[required("Mandatory")]} defaultValue={false}/>
        <BooleanInput source="assessmentMethodPatientInterview" validate={[required("Mandatory")]} defaultValue={false}/>
        <BooleanInput source="assessmentMethodRecordReview" validate={[required("Mandatory")]} defaultValue={false}/>
        <BooleanInput source="optional" validate={[required("Mandatory")]} defaultValue={false}/>

        <GunakReferenceInput label="Checklist" optionText="fullName" source="checklist" perPage={100} sort={{field: "assessmentTools.name"}}/>

        <InlineHelp message="Use area of concern, standard for narrowing down your measurable element" helpNumber={2}/>
        {GunakFilters.AreaOfConcernForm()}
        {GunakFilters.StandardForm()}
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Measurable element" optionText="referenceAndName" source="measurableElement"
                                     filter={formData.standardId ? {standardId: formData.standardId} : {}} sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={AppConfiguration.isNHSRC()}/>
        {isCreate ? <NumberInput source="sortOrder" step={1} validate={[required("Mandatory")]}/> : null}
        <InlineHelp message="Choose state if this checkpoint is specific to a state" helpNumber={7}/>
        <GunakReferenceInput label="State" optionText="name" source="state" sort={{field: 'name', order: 'ASC'}} mandatory={false}/>
        {isCreate ? null : <InlineHelp message="Refer below for setting sort order" helpNumber={6}/>}
        {isCreate ? null : <DisabledInput label="CURRENT CHECKPOINT ID" source="id"/>}
        {isCreate ? null : <NumberInput source="sortOrder" step={1} validate={[required("Mandatory")]}/>}
        {isCreate ? null :
            <ReferenceManyField label="Other checkpoints in the same measurable element in this checklist" reference="checkpoint"
                                target="checkpointMeasurableElementIdAndChecklistId"
                                sort={{field: 'sortOrder', order: 'ASC'}}>
                <Datagrid>
                    <NumberField source="id" options={{style: 'decimal', useGrouping: false}}/>
                    <TextField source="name"/>
                    <NumberField source="sortOrder"/>
                </Datagrid>
            </ReferenceManyField>
        }
    </SimpleForm>;
};

export const CheckpointEdit = props => (
    <Edit {...props} undoable={false}>
        {form(false)}
    </Edit>
);

export const CheckpointCreate = (props) => {
    return (<Create {...props}>
        {form(true, props)}
    </Create>);
};