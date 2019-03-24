import {Create, Datagrid, DisabledInput, List, ReferenceField, SimpleForm, TextField, TextInput} from 'react-admin';
import React from 'react';
import {GunakReferenceInput} from "../components/Inputs";

export const PrivilegeList = props => (
    <List {...props} title='Privileges' perPage={25} sortBy="name">
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <TextField source="id"/>
            <ReferenceField source="stateId" allowEmpty/>
            <ReferenceField source="assessmentToolModeId" allowEmpty/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <GunakReferenceInput label="Program" optionText="name" source="assessmentTool"/>
    </SimpleForm>;
};

export const PrivilegeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);