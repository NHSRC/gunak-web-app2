import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';

export const FacilityAssessmentList = props => (
    <List {...props} title='FacilityAssessments'>
        <Datagrid rowClick="edit">
            <TextField source="facilityName" label="Facility Name"/>
            <TextField source="startDate"/>
            <TextField source="endDate"/>
            <TextField source="series"/>
            <ReferenceField label="Assessment Type" source="assessmentTypeId" reference="assessmentType">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Facility" source="facilityId" reference="facility" allowEmpty={true}>
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="id"/>
        </Datagrid>
    </List>
);