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
import ContextActions from "../components/ContextActions";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";

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

        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn
                        sort={{field: 'assessmentToolMode.name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                            delete (props.filterValues.areaOfConcernId);
                            delete (props.filterValues.checklistId);
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) &&
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist"
                        filter={AppConfiguration.isJSS() && props.filterValues.stateId ? {
                            assessmentToolId: props.filterValues.assessmentToolId,
                            stateId: props.filterValues.stateId
                        } : {assessmentToolId: props.filterValues.assessmentToolId}} alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.checklistId = id;
                            delete (props.filterValues.areaOfConcernId);
                        }}>
            <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
        </ReferenceInput>}

        {ResourceFilter.isSelected(props.filterValues.checklistId) &&
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{checklistId: props.filterValues.checklistId, assessmentToolId: props.filterValues.assessmentToolId}}
                        onChange={(obj, id) => {
                            currentFilter.areaOfConcernId = id;
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}
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
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="fullyQualifiedName" source="areaOfConcern" perPage={100} sort={{field: 'id', order: 'ASC'}} autoComplete={false}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const StandardEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);