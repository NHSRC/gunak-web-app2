import React from 'react';

import {
    BooleanField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    AutocompleteInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort="name">
            <AutocompleteInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Facility type" source="facilityTypeId" reference="facilityType" alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const FacilityList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Facility" childResource="facility"/>
        <List {...props} title='Facilities' perPage={25} filters={<EntityFilter />}>
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