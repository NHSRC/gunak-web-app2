import React from 'react';
import {BooleanField, Datagrid, EditButton, List, ReferenceField, TextField, TextInput, BooleanInput, Edit, SimpleForm, DisabledInput, LongTextInput} from 'react-admin';
import {parseUrl} from 'query-string';
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import _ from "lodash";

export const CheckpointList = props => {
    let parentResource = ParentResource.parse(props.history.location.search);
    return (
        <div>
            {_.isNil(parentResource) ? null : <Parent parentResource={parentResource}/>}
            <List {...props} title='Checkpoints'>
                <Datagrid rowClick="edit">
                    <ReferenceField label="Measurable Element" source="measurableElementId" reference="measurableElement">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <TextField source="name"/>
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

export const CheckpointEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <LongTextInput source="name" />
            <LongTextInput source="meansOfVerification" />
            <BooleanInput source="assessmentMethodObservation" />
            <BooleanInput source="assessmentMethodStaffInterview" />
            <BooleanInput source="assessmentMethodObservation" />
            <BooleanInput source="assessmentMethodRecordReview" />
        </SimpleForm>
    </Edit>
);