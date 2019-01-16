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
    NumberField,
    NumberInput,
    ReferenceField,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";

export const IndicatorDefinitionList = props => (
    <List {...props} title='Indicator definitions'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="dataType" />
            <TextField source="formula" />
            <BooleanField source="output"/>
            <TextField source="symbol"/>
            <NumberField source="sortOrder"/>
            <TextField source="codedValues"/>
            <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool" sortBy="assessmentTool.name">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <TextInput source="dataType"/>
        <TextInput source="formula"/>
        <BooleanInput source="output"/>
        <TextInput source="symbol"/>
        <NumberInput source="sortOrder"/>
        <TextInput source="codedValues"/>
        <BooleanInput source="inactive" defaultValue={false}/>
        <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
    </SimpleForm>;
};
export const IndicatorDefinitionEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);

export const IndicatorDefinitionCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);