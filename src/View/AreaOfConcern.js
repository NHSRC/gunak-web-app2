import React from 'react';
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, Filter, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';
import ContextActions from "../components/ContextActions";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist" alwaysOn perPage={1000} sort="name">
            <SelectInput optionText="fullReference"/>
        </ReferenceInput>
    </Filter>
);

export const AreaOfConcernList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Area Of Concern" childResource="areaOfConcern"/>
        <List {...props} title='Area of concerns' filters={<EntityFilter />}>
            <Datagrid rowClick="edit">
                <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="reference"/>
                <TextField source="name"/>
                <EditButton/>
                <BooleanField source="inactive"/>
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
        <BooleanInput source="inactive"/>
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