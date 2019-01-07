import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100} sort="name">
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const ChecklistList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Checklist" childResource="checklist"/>
        <List {...props} title='Checklists' filters={<EntityFilter />} perPage={25} sort={{ field: 'name', order: 'ASC' }}>
            <Datagrid>
                <TextField source="name"/>
                <ReferenceField label="Department" source="departmentId" reference="department">
                    <TextField source="name"/>
                </ReferenceField>
                <EditButton/>
                <BooleanField source="inactive"/>
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
        <BooleanInput source="inactive"/>
        <ChildrenNameFieldPair source="checkpoint" label="Checkpoints" parent="checklist" parentDisplayField="name" history={props.history} />
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