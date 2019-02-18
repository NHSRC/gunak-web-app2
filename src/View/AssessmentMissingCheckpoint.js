import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField, Filter} from 'react-admin';

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Facility assessment" source="facilityAssessmentId" reference="facilityAssessment" alwaysOn>
            <SelectInput optionText="id"/>
        </ReferenceInput>
    </Filter>
);

export const AssessmentMissingCheckpointList = props => (
    <List {...props} title='Missing checkpoints in assessment' filters={<EntityFilter/>}>
        <Datagrid rowClick="view">
            <ReferenceField label="Checklist" source="checklistId" reference="checklist" sortable={false}>
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="missingCheckpointName" sortable={false}/>
            <TextField source="measurableElementReference" sortable={false}/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);