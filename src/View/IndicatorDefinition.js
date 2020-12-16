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
    NumberField,
    NumberInput,
    ReferenceField,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceInput,
    SelectInput,
    LongTextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import Privileges from "../model/Privileges";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment Tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100} sort={{field: 'sortOrder', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                        }} filter={{assessmentToolType: "INDICATOR"}} >
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const IndicatorDefinitionList = ({privileges, ...props}) => (
    <List {...props} title='Indicator definitions' filters={<EntityFilter/>}>
        <Datagrid rowClick="edit">
            <NumberField source="sortOrder"/>
            <TextField source="name" style={{width: "30em"}}/>
            <TextField source="dataType"/>
            <TextField source="formula"/>
            <BooleanField source="output"/>
            <TextField source="symbol"/>
            <TextField source="codedValues"/>
            {currentFilter.assessmentToolId && <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool" sortBy="assessmentTool.name">
                <TextField source="name"/>
            </ReferenceField>}
            <BooleanField source="inactive"/>
            <TextField source="id"/>
            {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
        </Datagrid>
    </List>
);

let getForm = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <NumberInput source="sortOrder"/>
        <LongTextInput source="name"/>
        <TextInput source="dataType"/>
        <LongTextInput source="description"/>
        <TextInput source="formula"/>
        <BooleanInput source="output"/>
        <TextInput source="symbol"/>
        <TextInput source="codedValues"/>
        <BooleanInput source="inactive" defaultValue={false}/>
        <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
    </SimpleForm>;
};
export const IndicatorDefinitionEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(false)}
    </Edit>
);

export const IndicatorDefinitionCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);