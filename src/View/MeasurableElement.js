import React from 'react';
import {Create, Datagrid, DisabledInput, Edit, EditButton, List, ReferenceField, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {parseUrl} from 'query-string';
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import {GunakReferenceInput} from "../components/Inputs";

export const MeasurableElementList = props => {
    return (
        <div>
            <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
            <List {...props} title='Measurable elements'>
                <Datagrid rowClick="edit">
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <ChildrenField source="checkpoint" label="Checkpoints" parent="measurableElement" parentDisplayField="name"/>
                    <EditButton/>
                    <TextField source="id"/>
                </Datagrid>
            </List>
        </div>
    );
};

export const MeasurableElementCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="reference"/>
            <TextInput source="name"/>
            <GunakReferenceInput label="Standard" optionText="reference" source="standard"/>
        </SimpleForm>
    </Create>
);

export const MeasurableElementEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="reference"/>
            <TextInput source="name" />
            <GunakReferenceInput label="Standard" optionText="reference" source="standard"/>
        </SimpleForm>
    </Edit>
);