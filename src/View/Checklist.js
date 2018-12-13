import React from 'react';
import {
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceField,
    Create,
    ReferenceInput,
    SelectInput,
    required
} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {GunakReferenceInput} from "../components/Inputs";
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

export const ChecklistList = props => (
    <div>
        <Parent parentResource={ParentResource.parse(props.history.location.search)}/>
        <List {...props} title='Checklists'>
            <Datagrid>
                <TextField source="name"/>
                <ReferenceField label="Department" source="departmentId" reference="department">
                    <TextField source="name"/>
                </ReferenceField>
                <ChildrenField source="checkpoint" label="Checkpoints" parent="checklist" parentDisplayField="name" history={props.history}/>
                <EditButton/>
                <TextField source="id"/>
                <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                    <TextField source="name"/>
                </ReferenceField>
            </Datagrid>
        </List></div>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? <DisabledInput source="id"/> : null}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
        <GunakReferenceInput label="Department" optionText="name" source="department"/>
        <ChildrenNameFieldPair source="checkpoint" label="Checkpoints" parent="checklist" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const ChecklistEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);

export const ChecklistCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);