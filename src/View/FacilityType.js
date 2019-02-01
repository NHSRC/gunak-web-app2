import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const FacilityTypeList = props => (
    <List {...props} title='FacilityTypes'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const FacilityTypeEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);

export const FacilityTypeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);