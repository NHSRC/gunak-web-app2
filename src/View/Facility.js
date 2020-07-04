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
    TextInput,
    BooleanInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";
import RAFilterUtil from "../utils/RAFilterUtil";
import AuditView from "../components/AuditView";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Facility type" source="facilityTypeId" reference="facilityType" alwaysOn
                        onChange={(obj, id) => {
                            currentFilter.facilityTypeId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>

        {RAFilterUtil.createFilterItem(currentFilter, "State", "stateId", "state", {field: 'name', order: 'ASC'}, "name", {}, ["districtId"])}

        {ResourceFilter.isSelected(props.filterValues.stateId) && <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort={{field: 'name', order: 'ASC'}}
                                                       filter={{stateId: props.filterValues.stateId}}
                                                       onChange={(obj, id) => {
                                                           currentFilter.districtId = id;
                                                       }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);

export const FacilityList = ({privileges, ...props}) => (
    <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="facility"/>
        <List {...props} title='Facilities' perPage={25} filters={<EntityFilter/>} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <EditButton/>
                <TextField source="name"/>
                <ReferenceField label="Facility Type" source="facilityTypeId" reference="facilityType" sortBy="facilityType.name">
                    <TextField source="name"/>
                </ReferenceField>
                {Privileges.hasPrivilege(privileges, 'Facility_Write') && <EditButton/>}
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
        <BooleanInput source="inactive" defaultValue={false}/>
        {AuditView.createdDate()}
        {AuditView.lastModifiedDate()}
    </SimpleForm>;
};

export const FacilityEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(false)}
    </Edit>
);

export const FacilityCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);