import React from 'react';
import {BooleanField, BooleanInput, Datagrid, DisabledInput, Create, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

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

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <TextInput source="shortName"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const AssessmentTypeEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);

export const AssessmentTypeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);