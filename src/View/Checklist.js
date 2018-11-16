import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, FunctionField, List, ReferenceManyField, SimpleForm, TextField, TextInput, UrlField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";

export const ChecklistList = props => (
    <List {...props} title='Checklists'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ChildrenField source="areaOfConcern" label="Area of concerns" cellLabel="View"/>
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