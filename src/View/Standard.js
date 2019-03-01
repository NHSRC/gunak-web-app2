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
import InlineHelp from "../components/InlineHelp";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() &&
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn
                        sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                            delete(props.filterValues.areaOfConcernId);
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>

        {props.filterValues.assessmentToolId &&
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist"
                        filter={AppConfiguration.isJSS() && props.filterValues.stateId ? {
                            assessmentToolId: props.filterValues.assessmentToolId,
                            stateId: props.filterValues.stateId
                        } : {assessmentToolId: props.filterValues.assessmentToolId}} alwaysOn sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.checklistId = id;
                        }}>
            <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
        </ReferenceInput>}

        {props.filterValues.checklistId &&
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{checklistId: props.filterValues.checklistId}}
                        onChange={(obj, id) => {
                            currentFilter.areaOfConcernId = id;
                        }}>
            <SelectInput optionText="referenceAndName"/>
        </ReferenceInput>}
    </Filter>
);

export const StandardList = props => (
    <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="standard"/>
        <List {...props} title='Standards' filters={<EntityFilter/>} perPage={25}
              sort={{field: 'reference', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                {!currentFilter.assessmentToolId &&
                <ReferenceField label="Assessment tool" source="assessmentToolId" reference="assessmentTool" sortBy="assessmentTool.name" sortable={false}>
                    <TextField source="name"/>
                </ReferenceField>}
                <TextField source="reference"/>
                <TextField source="name"/>
                <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" sortable={false}>
                    <TextField source="reference"/>
                </ReferenceField>
                <EditButton/>
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List></div>
);

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
        <br/>
        <InlineHelp message="Assessment tool and Checklist are for filtering only" helpNumber={2}/>
        <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool" mandatory={false}/>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Checklist" optionText={ChecklistConfiguration.getDisplayProperty()} source="checklist" perPage={100}
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}} mandatory={false}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="referenceAndName" source="areaOfConcern" perPage={100}
                                     filter={formData.checklistId ? {checklistId: formData.checklistId} : {}} sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const StandardEdit = props => (
    <Edit {...props}>
        {getForm(props, true)}
    </Edit>
);