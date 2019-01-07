import React from 'react';
import {BooleanField, BooleanInput, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const AssessmentToolModeList = props => (
    <List {...props} title='Programs' sort={{ field: 'name', order: 'ASC' }} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const AssessmentToolModeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <BooleanInput source="inactive"/>
        </SimpleForm>
    </Edit>
);