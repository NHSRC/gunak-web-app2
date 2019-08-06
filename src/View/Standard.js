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
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";
import GunakFilters from "../components/GunakFilters";

let currentFilter = {};

const EntityFilter = (props) => {
    return <Filter {...props}>
        {AppConfiguration.isJSS() &&
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        {GunakFilters.AssessmentTool(currentFilter, ['checklistId', 'areaOfConcernId'])}

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) && GunakFilters.Checklist(currentFilter, props, ['areaOfConcernId'])}

        {ResourceFilter.isSelected(props.filterValues.checklistId) && GunakFilters.AreaOfConcern(currentFilter, props)}
    </Filter>
};

export const StandardList = ({privileges, ...props}) => {
    return <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="standard"/>
        <List {...props} title='Standards' filters={<EntityFilter/>} perPage={25}
              sort={{field: 'reference', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                <TextField source="reference"/>
                <TextField source="name"/>
                <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" sortable={false}>
                    <TextField source="reference"/>
                </ReferenceField>
                {!ResourceFilter.isSelected(currentFilter.assessmentToolId) &&
                <TextField source="assessmentToolNames" label="Assessment tools" style={{width: 160}} sortable={false}/>
                }
                <BooleanField source="inactive"/>
                <TextField source="id"/>
                {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
            </Datagrid>
        </List>
    </div>
};

export const StandardCreate = (props) => (
    <Create {...props}>
        {getForm(props, false)}
    </Create>
);

let getForm = function (props, isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        {GunakFilters.AreaOfConcernForm()}
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const StandardEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);