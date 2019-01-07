import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

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

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const StateCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);

export const StateEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);