import React from 'react';
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
    required,
    SelectInput,
    SimpleForm,
    TextField,
    ReferenceManyField
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={50}
                        sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                            delete (props.filterValues.checklistId);
                            delete (props.filterValues.areaOfConcernId);
                            delete (props.filterValues.standardId);
                            delete (props.filterValues.measurableElementId);
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>

        {props.filterValues.assessmentToolId &&
        <ReferenceInput label="Checklist" key={props.filterValues.assessmentToolId} source="checklistId" reference="checklist"
                        filter={AppConfiguration.isJSS() && props.filterValues.stateId ? {
                            assessmentToolId: props.filterValues.assessmentToolId,
                            stateId: props.filterValues.stateId
                        } : {assessmentToolId: props.filterValues.assessmentToolId}}
                        alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.checklistId = id;
                            delete (props.filterValues.areaOfConcernId);
                            delete (props.filterValues.standardId);
                            delete (props.filterValues.measurableElementId);
                        }}>
            <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
        </ReferenceInput>}

        {props.filterValues.checklistId &&
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{checklistId: props.filterValues.checklistId}}
                        onChange={(obj, id) => {
                            currentFilter.areaOfConcernId = id;
                            delete (props.filterValues.standardId);
                            delete (props.filterValues.measurableElementId);
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}

        {props.filterValues.areaOfConcernId &&
        <ReferenceInput label="Standard" source="standardId" reference="standard" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{areaOfConcernId: props.filterValues.areaOfConcernId}}
                        onChange={(obj, id) => {
                            currentFilter.standardId = id;
                            delete (props.filterValues.measurableElementId);
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}

        {props.filterValues.standardId &&
        <ReferenceInput label="Measurable element" source="measurableElementId" reference="measurableElement" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{standardId: props.filterValues.standardId}}
                        onChange={(obj, id) => {
                            currentFilter.measurableElementId = id;
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}
    </Filter>
);

export const CheckpointList = props => {
    return (
        <div>
            <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="checkpoint"/>
            <List {...props} title='Checkpoints' perPage={25} filters={<EntityFilter/>}>
                <Datagrid>
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
                    <BooleanField source="inactive"/>
                    <EditButton/>
                    <TextField source="id"/>
                    <ReferenceField label="Checklist" source="checklistId" reference="checklist" sortBy="checklist.name">
                        <TextField source="name"/>
                    </ReferenceField>
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

        <InlineHelp message="Assessment tool, Area of concern, standard are for filtering only" helpNumber={2}/>
        <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool" defaultValue={false} mandatory={false}/>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Checklist" optionText={ChecklistConfiguration.getDisplayProperty()} source="checklist" perPage={100}
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="referenceAndName" source="areaOfConcern" perPage={100}
                                     filter={formData.checklistId ? {checklistId: formData.checklistId} : {}} mandatory={false}
                                     sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Standard" optionText="referenceAndName" source="standard"
                                     filter={formData.areaOfConcernId ? {areaOfConcernId: formData.areaOfConcernId} : {}} mandatory={false}
                                     sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Measurable element" optionText="referenceAndName" source="measurableElement"
                                     filter={formData.standardId ? {standardId: formData.standardId} : {}} sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <NumberInput source="sortOrder" step={1} validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive" defaultValue={false}/>
        {isCreate ? null :<DisabledInput source="id"/>}
        {isCreate ? null :
            <ReferenceManyField label="Other checkpoints in the same measurable element in this checklist" reference="checkpoint"
                                target="checkpointMeasurableElementIdAndChecklistId"
                                sort={{field: 'sortOrder', order: 'ASC'}}>
                <Datagrid>
                    <NumberField source="id"/>
                    <TextField source="name"/>
                    <NumberField source="sortOrder"/>
                </Datagrid>
            </ReferenceManyField>
        }
    </SimpleForm>;
};

export const CheckpointEdit = props => (
    <Edit {...props}>
        {form(false)}
    </Edit>
);

export const CheckpointCreate = (props) => {
    return (<Create {...props}>
        {form(true, props)}
    </Create>);
};