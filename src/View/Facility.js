import React from 'react';

import {BooleanField, Create, Datagrid, DisabledInput, Edit, EditButton, List, ReferenceField, SimpleForm, TextField, TextInput} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";

export const FacilityList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)} label="Add Facility" childResource="facility"/>
        <List {...props} title='Facilities'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <ReferenceField label="Facility Type" source="facilityTypeId" reference="facilityType">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id"/>
        </Datagrid>
    </List></div>
);

let getForm = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <GunakReferenceInput label="Facility type" optionText="name" source="facilityType"/>
        <GunakReferenceInput label="District" optionText="name" source="district" autoComplete={true}/>
    </SimpleForm>;
};

export const FacilityEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);

export const FacilityCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);