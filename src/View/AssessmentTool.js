import React from 'react';
import {BooleanField, BooleanInput, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="mode" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const AssessmentToolEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <BooleanInput source="inactive"/>
            <ChildrenNameFieldPair history={props.history} parent="assessmentTool" parentDisplayField="name" source="checklist" label="Checklists"/>
        </SimpleForm>
    </Edit>
);