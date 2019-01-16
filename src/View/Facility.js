import React from 'react';

import {
    BooleanField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormDataConsumer,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Facility type" source="facilityTypeId" reference="facilityType" alwaysOn
                        onChange={(obj, id) => {
                            currentFilter.facilityTypeId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                            delete(props.filterValues.districtId);
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        {props.filterValues.stateId && <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort={{field: 'name', order: 'ASC'}}
                                                       filter={{stateId: props.filterValues.stateId}}
                                                       onChange={(obj, id) => {
                                                           currentFilter.districtId = id;
                                                       }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);

export const FacilityList = props => (
    <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="facility"/>
        <List {...props} title='Facilities' perPage={25} filters={<EntityFilter/>} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                <TextField source="name"/>
                <ReferenceField label="Facility Type" source="facilityTypeId" reference="facilityType" sortBy="facilityType.name">
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
        <TextInput source="name" validate={[required("Mandatory")]}/>

        <GunakReferenceInput label="Facility type" optionText="name" source="facilityType"/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="District" optionText="name" source="district"
                                     filter={formData.stateId ? {stateId: formData.stateId} : {}}/>}
        </FormDataConsumer>
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