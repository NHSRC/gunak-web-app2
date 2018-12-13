import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";

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
        <SimpleForm>
            <TextInput source="reference"/>
            <TextInput source="name"/>
            <GunakReferenceInput label="Area of concern" optionText="reference" source="areaOfConcern"/>
        </SimpleForm>
    </Create>
);

export const StandardEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="reference"/>
            <TextInput source="name" />
            <GunakReferenceInput label="Area of concern" optionText="reference" source="areaOfConcern"/>
        </SimpleForm>
    </Edit>
);