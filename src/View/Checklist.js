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
        {process.env.REACT_APP_TENANT === "NHSRC" ? null :
            <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}>
                <SelectInput optionText="name"/>
            </ReferenceInput>}
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const ChecklistList = props => (
    <div>
        <List {...props} title='Checklists' filters={<EntityFilter/>} perPage={25} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <TextField source="name"/>
                <ReferenceField label="Department" source="departmentId" reference="department">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                    <TextField source="name"/>
                </ReferenceField>
                <EditButton/>
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List></div>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="State" optionText="name" source="state" mandatory={false}/>
        <br/>
        <p>Leave state as empty if you want checklist to be available for all states</p>
        <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
        <br/>
        <GunakReferenceInput label="Department" optionText="name" source="department" mandatory={false}/>
        <BooleanInput source="inactive" defaultValue={false}/>
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