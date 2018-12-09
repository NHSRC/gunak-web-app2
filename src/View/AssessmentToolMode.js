import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const AssessmentToolModeList = props => (
    <List {...props} title='Programs'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const AssessmentToolModeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);