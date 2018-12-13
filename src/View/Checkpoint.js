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
    TextField
} from 'react-admin';
import {parseUrl} from 'query-string';
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import {GunakReferenceInput} from "../components/Inputs";

export const CheckpointList = props => {
    return (
        <div>
            <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
            <List {...props} title='Checkpoints'perPage={30}>
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

let form = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <GunakReferenceInput label="Checklist" optionText="name" source="checklist"/>
        <GunakReferenceInput label="Measurable element" optionText="reference" source="measurableElement" autoComplete={true}/>
        <LongTextInput source="name"/>
        <LongTextInput source="meansOfVerification"/>
        <NumberInput source="sortOrder" step={1}/>
        <BooleanInput source="assessmentMethodObservation"/>
        <BooleanInput source="assessmentMethodStaffInterview"/>
        <BooleanInput source="assessmentMethodPatientInterview"/>
        <BooleanInput source="assessmentMethodRecordReview"/>
    </SimpleForm>;
};
export const CheckpointEdit = props => (
    <Edit {...props}>
        {form(false)}
    </Edit>
);

export const CheckpointCreate = (props) => (
    <Create {...props}>
        {form(true)}
    </Create>
);