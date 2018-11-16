import React from 'react';
import {Datagrid, List, TextField} from 'react-admin';

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mode" />
            <TextField source="inactive" />
        </Datagrid>
    </List>
);