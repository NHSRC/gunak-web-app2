import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, EmailField, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField, Filter} from 'react-admin';

export const UserList = props => (
    <List {...props} title='Users'>
        <Datagrid rowClick="edit">
            <EmailField source="email"/>
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <TextField source="userType"/>
            <EditButton/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);