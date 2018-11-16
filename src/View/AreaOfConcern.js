import React from 'react';
import {Datagrid, EditButton, List, TextField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";

export const AreaOfConcernList = props => (
    <List {...props} title='Area of concerns'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="reference" />
            <TextField source="name" />
            <ChildrenField source="standard" label="Standards"/>
            <EditButton />
        </Datagrid>
    </List>
);