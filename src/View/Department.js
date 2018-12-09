import React from 'react';
import {Create, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const DepartmentList = props => (
    <List {...props} title='Departments'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const DepartmentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const DepartmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);