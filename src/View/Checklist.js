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
import AppConfiguration from "../framework/AppConfiguration";
import _ from 'lodash';

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() ? <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                                                    onChange={(obj, id) => {
                                                        currentFilter.stateId = id;
                                                    }}>
            <SelectInput optionText="name"/>
        </ReferenceInput> : null}
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100}
                        sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>
    </Filter>
);

export const ChecklistList = props => (
    <div>
        <List {...props} title='Checklists' filters={<EntityFilter/>} perPage={25} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <TextField source={(AppConfiguration.isNHSRC() || (AppConfiguration.isJSS() && !_.isNil(currentFilter.stateId) && !_.isEmpty(currentFilter.stateId))) ? "name" : "fullName"}/>
                <ReferenceField label="Department" source="departmentId" reference="department" sortBy="department.name">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool" sortBy="assessmentTool.name">
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
        <GunakReferenceInput label="Department" optionText="name" source="department"/>
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