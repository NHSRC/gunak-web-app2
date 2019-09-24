import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
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
import Privileges from "../model/Privileges";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const DistrictList = ({privileges, ...props}) => (
    <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="district"/>
        <List {...props} title='Districts' perPage={100} filters={<EntityFilter/>} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <EditButton/>
                <TextField source="name"/>
                <ReferenceField label="State" source="stateId" reference="state" sortBy="state.name">
                    <TextField source="name"/>
                </ReferenceField>
                {Privileges.hasPrivilege(privileges, 'Facility_Metadata_Write') && <EditButton/>}
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List></div>
);

export const DistrictCreate = (props) => (
    <Create {...props}>
        {getForm(true, props)}
    </Create>
);

let getForm = function (isCreate, props) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const DistrictEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(false, props)}
    </Edit>
);