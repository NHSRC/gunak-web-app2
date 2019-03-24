import React from 'react';
import {
    ChipField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    ReferenceArrayField,
    ReferenceArrayInput,
    SelectArrayInput,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput
} from 'react-admin';
import Privileges from "../model/Privileges";

export const RoleList = ({privileges, ...props}) => (
    <List {...props} title='Roles'>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <ReferenceArrayField label="Privileges" reference="privilege" source="privilegeIds">
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ReferenceArrayField>
            {Privileges.hasPrivilege(privileges, 'Privilege_Write') && <EditButton/>}
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <ReferenceArrayInput label="Privileges" source="privilegeIds" reference="privilege" sort={{field: 'name', order: 'ASC'}}>
            <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
    </SimpleForm>;
};

export const RoleCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const RoleEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);