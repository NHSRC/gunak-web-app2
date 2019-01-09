import React from 'react';
import {Datagrid, EditButton, EmailField, List, TextField} from 'react-admin';

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