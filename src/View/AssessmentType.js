import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const AssessmentTypeList = props => (
    <List {...props} title='Assessment types'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="shortName" />
        </Datagrid>
    </List>
);

export const AssessmentTypeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="shortName" />
        </SimpleForm>
    </Edit>
);