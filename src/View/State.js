import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const StateList = props => (
    <List {...props} title='States'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ChildrenField source="district" label="Districts" parent="state" parentDisplayField="name" history={props.history}/>
            <EditButton/>
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name"/>
        <BooleanInput source="inactive"/>
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