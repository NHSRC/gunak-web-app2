import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import Privileges from "../model/Privileges";
import AuditView from "../components/AuditView";

export const AssessmentToolModeList = ({privileges, ...props}) => (
    <List {...props} title='Programs' sort={{ field: 'name', order: 'ASC' }} perPage={25}>
        <Datagrid>
            <EditButton/>
            <TextField source="name" />
            {Privileges.hasPrivilege(privileges, 'Checklist_Metadata_Write') && <EditButton/>}
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive" defaultValue={false}/>
        {AuditView.createdDate()}
        {AuditView.lastModifiedDate()}
    </SimpleForm>;
};
export const AssessmentToolModeEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(false)}
    </Edit>
);

export const AssessmentToolModeCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);