import React from 'react';
import {Datagrid, List, TextField, DisabledInput, SimpleForm, Edit, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="mode" />
            <ChildrenField history={props.history} parent="assessmentTool" parentDisplayField="name" source="checklist" label="Checklists"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const AssessmentToolEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <ChildrenNameFieldPair history={props.history} parent="assessmentTool" parentDisplayField="name" source="checklist" label="Checklists"/>
        </SimpleForm>
    </Edit>
);