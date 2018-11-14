import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const AssessmentToolModeList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);