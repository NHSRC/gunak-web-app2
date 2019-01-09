import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, required} from 'react-admin';

export const StateList = props => (
    <List {...props} title='States' perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (props, isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const StateCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const StateEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);