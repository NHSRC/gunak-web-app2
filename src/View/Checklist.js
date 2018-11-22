import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {GunakReferenceInput} from "../components/Inputs";

export const ChecklistList = props => (
    <List {...props} title='Checklists'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Department" source="departmentId" reference="department">
                <TextField source="name"/>
            </ReferenceField>
            <ChildrenField source="checkpoint" label="Checkpoints" parent="checklist" parentDisplayField="name"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const ChecklistEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={[required("Mandatory")]}/>
            <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
            <GunakReferenceInput label="Department" optionText="name" source="department"/>
        </SimpleForm>
    </Edit>
);

export const ChecklistCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required("Mandatory")]}/>
            <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
            <GunakReferenceInput label="Department" optionText="name" source="department"/>
        </SimpleForm>
    </Create>
);