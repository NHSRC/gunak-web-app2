import React from 'react';
import {BooleanField, BooleanInput, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const AssessmentTypeList = props => (
    <List {...props} title='Assessment types'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="shortName" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const AssessmentTypeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="shortName" />
            <BooleanInput source="inactive" defaultValue={false}/>
        </SimpleForm>
    </Edit>
);