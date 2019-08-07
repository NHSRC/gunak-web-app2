import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import Privileges from "../model/Privileges";
import InlineHelp from "../components/InlineHelp";

export const DepartmentList = ({privileges, ...props}) => (
    <div>
        <InlineHelp message="Departments are additional label for a checklist. They are used in checklist and in the app during reports drill down. Same department can be used across programs and assessment tools."/>
        <List {...props} title='Departments' sort={{field: 'name', order: 'ASC'}} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <BooleanField source="inactive"/>
            <TextField source="id"/>
            {Privileges.hasPrivilege(privileges, 'Facility_Metadata_Write') && <EditButton/>}
        </Datagrid>
    </List></div>
);

const getForm = function (props, isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const DepartmentEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);

export const DepartmentCreate = (props) => (
    <Create {...props}>
        {getForm(props, false)}
    </Create>
);