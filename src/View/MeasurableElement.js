import React from 'react';
import {BooleanField, BooleanInput, Create, Datagrid, DisabledInput, Edit, EditButton, List, ReferenceField, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import {GunakReferenceInput} from "../components/Inputs";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const MeasurableElementList = props => {
    return (
        <div>
            <Parent parentResource={ParentResource.parse(props.history.location.search)} label="Add Measurable Element" childResource="measurableElement"/>
            <List {...props} title='Measurable elements'>
                <Datagrid rowClick="edit">
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <ChildrenField source="checkpoint" label="Checkpoints" parent="measurableElement" parentDisplayField="name" history={props.history}/>
                    <EditButton/>
                    <BooleanField source="inactive"/>
                    <TextField source="id"/>
                </Datagrid>
            </List>
        </div>
    );
};

export const MeasurableElementCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? <DisabledInput source="id"/> : null}
        <TextInput source="reference"/>
        <TextInput source="name"/>
        <GunakReferenceInput label="Standard" optionText="reference" source="standard"/>
        <BooleanInput source="inactive"/>
        <ChildrenNameFieldPair source="checkpoint" label="Checkpoints" parent="measurableElement" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);