import React from 'react';
import {
    BooleanField,
    BooleanInput,
    ChipField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    email,
    EmailField,
    List,
    ReferenceArrayField,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput,
    AutocompleteArrayInput
} from 'react-admin';
import Privileges from "../model/Privileges";
import FacilitySelect from "../components/FacilitySelect";
import InlineHelp from "../components/InlineHelp";

const validateEmail = email();

export const UserList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid>
            <EditButton/>
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
        <InlineHelp message="Password must be between 12 to 20 character, with 1 upper case, 1 lower case, 1 number and 1 special character."/>
        <ReferenceArrayInput label="Roles" source="roleIds" reference="role" sort={{field: 'name', order: 'ASC'}} perPage={200}>
            <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <BooleanInput source="inactive" defaultValue={false}/>
        <ReferenceArrayField label="Accessible facilities" reference="facility" source="accessibleFacilityIds">
            <SingleFieldList>
                <ChipField source="name"/>
            </SingleFieldList>
        </ReferenceArrayField>
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
