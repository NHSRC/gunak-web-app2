import React from 'react';
import {BooleanField, BooleanInput, Datagrid, DisabledInput, Create, Edit, List, ReferenceField, SimpleForm, TextField, TextInput, required} from 'react-admin';
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";
import {GunakReferenceInput} from "../components/Inputs";

export const AssessmentToolList = props => (
    <List {...props} title='Assessment Tools' sort={{ field: 'assessmentToolMode,name', order: 'ASC' }} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField label="Program" source="assessmentToolModeId" reference="assessmentToolMode">
                <TextField source="name"/>
            </ReferenceField>
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
        {isCreate ? null : <ChildrenNameFieldPair history={props.history} parent="assessmentTool" parentDisplayField="name" source="checklist" label="Checklists"/>}
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