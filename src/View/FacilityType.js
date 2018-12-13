import React from 'react';
import {BooleanField, Datagrid, List, TextField} from 'react-admin';

export const FacilityTypeList = props => (
    <List {...props} title='FacilityTypes'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);