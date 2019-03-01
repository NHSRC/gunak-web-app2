import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField, Filter} from 'react-admin';
import React from 'react';

export const PrivilegeList = props => (
    <List {...props} title='Privileges' perPage={25} sortBy="name">
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);