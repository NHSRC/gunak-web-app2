import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    ReferenceField,
    required,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools' sort={{ field: 'assessmentToolMode,name', order: 'ASC' }} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField label="Program" source="assessmentToolModeId" reference="assessmentToolMode">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode"/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive"/>
    </SimpleForm>;
};
export const AssessmentToolEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);

export const AssessmentToolCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);