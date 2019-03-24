import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import Privileges from "../model/Privileges";

export const AssessmentTypeList = ({privileges, ...props}) => (
    <List {...props} title='Assessment types'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="shortName" />
            <BooleanField source="inactive"/>
            {Privileges.hasPrivilege(privileges, 'Checklist_Metadata_Write') && <EditButton/>}
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <TextInput source="shortName"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const AssessmentTypeEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);

export const AssessmentTypeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);