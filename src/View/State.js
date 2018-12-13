import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const StateList = props => (
    <List {...props} title='States'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ChildrenField source="district" label="Districts" parent="state" parentDisplayField="name" history={props.history}/>
            <EditButton/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <ChildrenNameFieldPair source="district" label="Districts" parent="state" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const StateCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);

export const StateEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);