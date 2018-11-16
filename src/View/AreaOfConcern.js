import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, FunctionField, List, ReferenceManyField, SimpleForm, TextField, TextInput, UrlField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";

export const AreaOfConcernList = props => (
    <List {...props} title='Area of concerns'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="reference" />
            <TextField source="name" />
            <ChildrenField source="standard" label="Standards" cellLabel="View"/>
            <EditButton />
        </Datagrid>
    </List>
);