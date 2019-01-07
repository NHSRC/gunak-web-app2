import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const DepartmentList = props => (
    <List {...props} title='Departments' sort={{ field: 'name', order: 'ASC' }} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <BooleanField source="inactive"/>
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
            <BooleanInput source="inactive"/>
        </SimpleForm>
    </Create>
);