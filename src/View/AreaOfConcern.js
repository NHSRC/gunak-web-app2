import React from 'react';
import {Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";

export const AreaOfConcernList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
        <List {...props} title='Area of concerns'>
            <Datagrid rowClick="edit">
                <TextField source="reference"/>
                <TextField source="name"/>
                <ChildrenField source="standard" label="Standards" parent="areaOfConcern" parentDisplayField="reference" history={props.history}/>
                <EditButton/>
                <TextField source="id"/>
            </Datagrid>
        </List>
    </div>
);

export const AreaOfConcernEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="reference"/>
            <TextInput source="name"/>
        </SimpleForm>
    </Edit>
);

export const AreaOfConcernCreate = (props) => (
    <Create {...props} title="Create new area of concern">
        <SimpleForm>
            <TextInput source="reference"/>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);