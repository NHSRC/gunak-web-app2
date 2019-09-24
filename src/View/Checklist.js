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
    FormDataConsumer,
    List,
    ReferenceArrayInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import AppConfiguration from "../framework/AppConfiguration";
import _ from 'lodash';
import InlineHelp from "../components/InlineHelp";
import ContextActions from "../components/ContextActions";
import Privileges from "../model/Privileges";
import GunakFilters from "../components/GunakFilters";
import RAFilterUtil from "../utils/RAFilterUtil";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>

        {GunakFilters.AssessmentTool(currentFilter)}
    </Filter>
);

export const ChecklistList = ({privileges, ...props}) => {
    let displayName = AppConfiguration.isNHSRC() || (AppConfiguration.isJSS() && !_.isNil(currentFilter.stateId) && !_.isEmpty(currentFilter.stateId));
    return <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="checklist"
                        helpText="Each assessment tool can have one or more checklists. To view checklist belonging to all states please leave the State filter blank."/>
        <List {...props} title='Checklists' filters={<EntityFilter/>} perPage={50} sort={{field: 'assessmentTools.name,name', order: 'ASC,ASC'}}>
            <Datagrid>
                <EditButton/>
                <TextField source="assessmentToolNames" label="Assessment tools"/>
                <TextField source={displayName ? "name" : "fullName"} label={displayName ? "Checklist" : "Checklist - [State]"} sortable={false}/>
                <ReferenceField label="Department" source="departmentId" reference="department" sortBy="department.name">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="State" source="stateId" reference="state" sortBy="state.name" allowEmpty>
                    <TextField source="name"/>
                </ReferenceField>
                {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List></div>

};

let formFilter = {};

let getForm = function (props, isCreate) {
    return <SimpleForm>
        <InlineHelp message="Leave state as empty if you want checklist to be available for all states" helpNumber={4}/>
        {isCreate ? null : <DisabledInput source="id"/>}
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="State" optionText="name" source="state" mandatory={false}/>
        <ReferenceArrayInput label="Assessment tools" source="assessmentToolIds" reference="assessmentTool"
                             sort={{field: 'assessmentToolMode.name,name', order: 'ASC,ASC'}}
                             onChange={(data) => {
                                 formFilter.assessmentToolIds = RAFilterUtil.valuesFromMultiSelectFilter(data);
                             }}>
            <SelectArrayInput optionText="fullName"/>
        </ReferenceArrayInput>
        <br/>
        <GunakReferenceInput label="Department" optionText="name" source="department"/>
        <ReferenceArrayInput label="Area of concerns" source="areaOfConcernIds" reference="areaOfConcern" perPage={1000} style={{width: 400}}>
            <SelectArrayInput optionText="fullyQualifiedName"/>
        </ReferenceArrayInput>

        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const ChecklistEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, false)}
    </Edit>
);

export const ChecklistCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);