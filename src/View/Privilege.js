import {
    required, Toolbar, SaveButton, Create, Datagrid, DisabledInput, List, Edit, ReferenceField, SimpleForm, TextField, TextInput, EditButton
} from 'react-admin';
import React from 'react';
import {GunakReferenceInput} from "../components/Inputs";

export const PrivilegeList = props => (
    <List {...props} title='Privileges' perPage={25} sortBy="name">
        <Datagrid>
            <EditButton/>
            <TextField source="name"/>
            <TextField source="id"/>
            <ReferenceField label="State" source="stateId" reference="state" sortBy="state.name" allowEmpty>
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Program" source="assessmentToolModeId" reference="assessmentToolMode" sortBy="assessmentToolMode.name" allowEmpty>
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="State" optionText="name" source="state" mandatory={false}/>
        <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode" mandatory={false}/>
    </SimpleForm>;
};

export const PrivilegeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const PrivilegeEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);