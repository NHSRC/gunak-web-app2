import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const DistrictList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
        <List {...props} title='Districts'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField label="State" source="stateId" reference="state">
                <TextField source="name" />
            </ReferenceField>
            <ChildrenField source="facility" label="Facilities" parent="district" parentDisplayField="name" history={props.history}/>
            <EditButton/>
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
        <ChildrenNameFieldPair source="facility" label="Facilities" parent="district" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const DistrictEdit = props => (
    <Edit {...props}>
        {getForm(false, props)}
    </Edit>
);