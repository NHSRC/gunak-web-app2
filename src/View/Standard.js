import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const StandardList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
        <List {...props} title='Standards'perPage={30}>
        <Datagrid rowClick="edit">
            <TextField source="reference" />
            <TextField source="name" />
            <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern">
                <TextField source="reference" />
            </ReferenceField>
            <ChildrenField source="measurableElement" label="Measurable Elements" parent="standard" parentDisplayField="name" history={props.history}/>
            <EditButton />
            <TextField source="id" />
        </Datagrid>
    </List></div>
);

export const StandardCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? <DisabledInput source="id"/> : null}
        <TextInput source="reference"/>
        <TextInput source="name"/>
        <GunakReferenceInput label="Area of concern" optionText="reference" source="areaOfConcern"/>
        <ChildrenNameFieldPair source="measurableElement" label="Measurable Elements" parent="standard" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};

export const StandardEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);