import React from 'react';
import {Create, Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

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

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="reference"/>
        <TextInput source="name"/>
        <ChildrenNameFieldPair source="standard" label="Standards" parent="areaOfConcern" parentDisplayField="reference" history={props.history}/>
    </SimpleForm>;
};
export const AreaOfConcernEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);

export const AreaOfConcernCreate = (props) => (
    <Create {...props} title="Create new area of concern">
        {getForm(props, true)}
    </Create>
);