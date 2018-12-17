import React from 'react';
import {AutocompleteInput, Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from 'react-admin';

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