import React from 'react';
import { List, Datagrid, BooleanField, ReferenceField, TextField, EmailField, EditButton, SimpleForm, DisabledInput, TextInput, Edit } from 'react-admin';

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mode" />
            <TextField source="inactive" />
        </Datagrid>
    </List>
);