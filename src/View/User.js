import React from 'react';
import {Create, Datagrid, DisabledInput, Edit, EditButton, List, required, SimpleForm, TextField, TextInput, EmailField, BooleanField, BooleanInput, email} from 'react-admin';

const validateEmail = email();

export const UserList = props => (
    <List {...props} title='Users'>
        <Datagrid rowClick="edit">
            <EmailField source="email"/>
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <BooleanField source="inactive"/>
            <EditButton/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="email" type="email" validate={[required("Mandatory"), validateEmail]}/>
        <TextInput source="firstName" validate={[required("Mandatory")]}/>
        <TextInput source="lastName" validate={[required("Mandatory")]}/>
        <TextInput label="New password" source="password" type="password" validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const UserCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const UserEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);