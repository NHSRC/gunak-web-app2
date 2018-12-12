import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";

export const DistrictList = props => (
    <List {...props} title='Districts'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);

export const DistrictCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);

let getForm = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
    </SimpleForm>;
};
export const DistrictEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);