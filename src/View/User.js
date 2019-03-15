import React from 'react';
import {
    ReferenceArrayField,
    SingleFieldList,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    required,
    SimpleForm,
    TextField,
    TextInput,
    EmailField,
    BooleanField,
    BooleanInput,
    email,
    ReferenceArrayInput,
    SelectArrayInput,
    ChipField
} from 'react-admin';
import Privileges from "../model/Privileges";

const validateEmail = email();

export const UserList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid rowClick="edit">
            <EmailField source="email"/>
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <ReferenceArrayField label="Roles" reference="role" source="roleIds" allowEmpty>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <BooleanField source="inactive"/>
            <TextField source="id"/>
            {Privileges.hasPrivilege(privileges, 'Users_Write') && <EditButton/>}
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="email" type="email" validate={[required("Mandatory"), validateEmail]}/>
        <TextInput source="firstName" validate={[required("Mandatory")]}/>
        <TextInput source="lastName" validate={[required("Mandatory")]}/>
        <TextInput label="New password" source="password" type="password" validate={isEdit ? [] : [required("Mandatory")]}/>
        <ReferenceArrayInput label="Roles" source="roleIds" reference="role" sort={{field: 'name', order: 'ASC'}}>
            <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const UserCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const UserEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);