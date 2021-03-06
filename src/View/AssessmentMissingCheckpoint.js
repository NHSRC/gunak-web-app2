import React from 'react';
import {Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from 'react-admin';

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Facility assessment" source="facilityAssessmentId" reference="facilityAssessment" alwaysOn
                        onChange={(obj, id) => {
                            currentFilter.facilityAssessmentId = id;
                        }}>
            <SelectInput optionText="id"/>
        </ReferenceInput>
        {props.filterValues.facilityAssessmentId &&
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist" alwaysOn sort={{field: 'missingCheckpoint.checklist.name', order: 'ASC'}}
                        filter={{facilityAssessmentId: props.filterValues.facilityAssessmentId}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);

export const AssessmentMissingCheckpointList = props => (
    <List {...props} title='Missing checkpoints in assessment' filters={<EntityFilter/>} sort={{field: 'missingCheckpoint.measurableElementReference', order: 'ASC'}}>
        <Datagrid>
            <ReferenceField label="Checklist" source="checklistId" reference="checklist" sortable={false}>
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="missingCheckpointName" sortable={false}/>
            <TextField source="measurableElementReference" sortable={false}/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);