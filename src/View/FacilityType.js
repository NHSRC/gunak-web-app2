import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import Privileges from "../model/Privileges";
import AuditView from "../components/AuditView";

export const FacilityTypeList = ({privileges, ...props}) => (
    <List {...props} title='FacilityTypes'>
        <Datagrid>
            <EditButton/>
            <TextField source="name" />
            <BooleanField source="inactive"/>
            <TextField source="id" />
            {Privileges.hasPrivilege(privileges, 'Facility_Metadata_Write') && <EditButton/>}
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive" defaultValue={false}/>
        {AuditView.createdDate()}
        {AuditView.lastModifiedDate()}
    </SimpleForm>;
};

export const FacilityTypeEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);

export const FacilityTypeCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);