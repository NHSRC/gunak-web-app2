import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField, Filter, AutocompleteInput, FileInput, FileField} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn sort="name">
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort="name">
            <AutocompleteInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const FacilityAssessmentList = props => (
    <List {...props} title='FacilityAssessments' filters={<EntityFilter />}>
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

export const FacilityAssessmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode"/>
            <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool"/>
            <GunakReferenceInput label="Checklist" optionText="name" source="checklist"/>
            <GunakReferenceInput label="State" optionText="name" source="state" autoComplete={false} mandatory={false}/>
            <GunakReferenceInput label="Facility" optionText="name" source="facility" autoComplete={true} mandatory={false}/>
            <TextInput source="facilityName" label="Facility name"/>
            <GunakReferenceInput label="Assessment type" optionText="name" source="assessmentType"/>
            <FileInput source="files" label="Assessment file (only .XLSX file supported)" accept="application/xlsx">
                <FileField source="uploadFile" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);