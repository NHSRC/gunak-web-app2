import React from 'react';
import ChildrenField from "../components/ChildrenField";

import {
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceField,
    Create,
    ReferenceInput,
    SelectInput,
    required,
    BooleanField,
    LongTextInput,
    BooleanInput,
    NumberInput,
    NumberField
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";

export const FacilityList = props => (
    <List {...props} title='Facilities'>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <ReferenceField label="Facility Type" source="facilityTypeId" reference="facilityType">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
            <TextField source="id"/>
        </Datagrid>
    </List>
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