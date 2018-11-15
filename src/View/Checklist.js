import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, SimpleForm, DisabledInput, TextInput, Edit } from 'react-admin';

export const ChecklistList = props => (
    <List {...props} title='Checklists'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ChecklistEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);