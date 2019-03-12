import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, required} from 'react-admin';
import Privileges from "../model/Privileges";

export const StateList = ({privileges, ...props}) => (
    <List {...props} title='States' perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            {Privileges.hasPrivilege(privileges, 'Facility_Write') && <EditButton/>}
            <BooleanField source="inactive"/>
            <TextField source="id"/>
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
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);