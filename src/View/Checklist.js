import React from 'react';
import {
    FormDataConsumer,
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
    TextInput,
    ReferenceArrayInput,
    SelectArrayInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import AppConfiguration from "../framework/AppConfiguration";
import _ from 'lodash';
import InlineHelp from "../components/InlineHelp";
import ContextActions from "../components/ContextActions";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100}
                        sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>
    </Filter>
);

export const ChecklistList = props => (
    <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="checklist"/>
        <h4>To view checklist belonging to all states please leave the filter blank.</h4>
        <List {...props} title='Checklists' filters={<EntityFilter/>} perPage={25} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <TextField
                    source={(AppConfiguration.isNHSRC() || (AppConfiguration.isJSS() && !_.isNil(currentFilter.stateId) && !_.isEmpty(currentFilter.stateId))) ? "name" : "fullName"}/>
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
        <InlineHelp message="Leave state as empty if you want checklist to be available for all states" helpNumber={4}/>
        <GunakReferenceInput label="State" optionText="name" source="state" mandatory={false}/>
        <GunakReferenceInput label="Assessment Tool" optionText="name" source="assessmentTool"/>
        <br/>
        <GunakReferenceInput label="Department" optionText="name" source="department"/>
        <FormDataConsumer>
            {({formData, ...rest}) =>
                <ReferenceArrayInput label="Area of concerns" source="areaOfConcernIds" reference="areaOfConcern"
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}} sort={{field: 'reference', order: 'ASC'}}>
                    <SelectArrayInput optionText="referenceAndName"/>
                </ReferenceArrayInput>
            }
        </FormDataConsumer>
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