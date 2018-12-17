import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    LongTextInput,
    NumberField,
    NumberInput,
    ReferenceField,
    SimpleForm,
    TextField,
    Filter,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import ParentResource from "../framework/ParentResource";
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist" alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const CheckpointList = props => {
    return (
        <div>
            <ContextActions url={props.history.location.search} label="Add Checkpoint" childResource="checkpoint"/>
            <List {...props} title='Checkpoints' perPage={25} filters={<EntityFilter />}>
                <Datagrid>
                    <ReferenceField label="Measurable Element" source="measurableElementId" reference="measurableElement">
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
                    <ReferenceField label="Checklist" source="checklistId" reference="checklist">
                        <TextField source="name"/>
                    </ReferenceField>
                </Datagrid>
            </List>
        </div>
    );
};

let form = function (isCreate, props) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <GunakReferenceInput label="Checklist" optionText="name" source="checklist"/>
        <GunakReferenceInput label="Measurable element" optionText="reference" source="measurableElement" autoComplete={true}/>
        <LongTextInput source="name"/>
        <LongTextInput source="meansOfVerification"/>
        <NumberInput source="sortOrder" step={1}/>
        <BooleanInput source="assessmentMethodObservation"/>
        <BooleanInput source="assessmentMethodStaffInterview"/>
        <BooleanInput source="assessmentMethodPatientInterview"/>
        <BooleanInput source="assessmentMethodRecordReview"/>
        <BooleanInput source="inactive"/>
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