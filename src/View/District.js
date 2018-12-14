import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, ReferenceField, SimpleForm, TextField, TextInput} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const DistrictList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)} label="Add District" childResource="district"/>
        <List {...props} title='Districts'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField label="State" source="stateId" reference="state">
                <TextField source="name" />
            </ReferenceField>
            <ChildrenField source="facility" label="Facilities" parent="district" parentDisplayField="name" history={props.history}/>
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List></div>
);

export const DistrictCreate = (props) => (
    <Create {...props}>
        {getForm(true, props)}
    </Create>
);

let getForm = function (isCreate, props) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <BooleanInput source="inactive"/>
        <ChildrenNameFieldPair source="facility" label="Facilities" parent="district" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const DistrictEdit = props => (
    <Edit {...props}>
        {getForm(false, props)}
    </Edit>
);