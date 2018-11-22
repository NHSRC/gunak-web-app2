import React from 'react';
import {Datagrid, List, TextField, DisabledInput, SimpleForm, Edit, TextInput} from 'react-admin';

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mode" />
        </Datagrid>
    </List>
);

export const AssessmentToolEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);