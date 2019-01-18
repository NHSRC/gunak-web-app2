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
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    required,
    FormDataConsumer
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";

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

        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={50} sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                            delete(props.filterValues.checklistId);
                            delete(props.filterValues.areaOfConcernId);
                            delete(props.filterValues.standardId);
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>

        {props.filterValues.assessmentToolId &&
        <ReferenceInput label="Checklist" key={props.filterValues.assessmentToolId} source="checklistId" reference="checklist"
                        filter={AppConfiguration.isJSS() && props.filterValues.stateId ? {
                            assessmentToolId: props.filterValues.assessmentToolId,
                            stateId: props.filterValues.stateId
                        } : {assessmentToolId: props.filterValues.assessmentToolId}}
                        alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.checklistId = id;
                            delete(props.filterValues.areaOfConcernId);
                            delete(props.filterValues.standardId);
                        }}>
            <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
        </ReferenceInput>}

        {props.filterValues.checklistId &&
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{checklistId: props.filterValues.checklistId}}
                        onChange={(obj, id) => {
                            currentFilter.areaOfConcernId = id;
                            delete(props.filterValues.standardId);
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        {props.filterValues.areaOfConcernId &&
        <ReferenceInput label="Standard" source="standardId" reference="standard" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{areaOfConcernId: props.filterValues.areaOfConcernId}}
                        onChange={(obj, id) => {
                            currentFilter.standardId = id;
                        }}>
            <SelectInput optionText="reference"/>
        </ReferenceInput>}
    </Filter>
);

export const MeasurableElementList = props => {
    return (
        <div>
            <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="measurableElement"/>
            <List {...props} title='Measurable elements' filters={<EntityFilter/>} perPage={50} sort={{field: 'reference', order: 'ASC'}}>
                <Datagrid rowClick="edit">
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard" sortBy="standard.reference">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <EditButton/>
                    <BooleanField source="inactive"/>
                    <TextField source="id" sortable={false}/>
                </Datagrid>
            </List>
        </div>
    );
};

export const MeasurableElementCreate = (props) => (
    <Create {...props}>
        {getForm(props, false)}
    </Create>
);

let getForm = function (props, isEdit) {
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool"/>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Checklist" optionText={ChecklistConfiguration.getDisplayProperty()} source="checklist" perPage={100}
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="name" source="areaOfConcern" perPage={100}
                                     filter={formData.checklistId ? {checklistId: formData.checklistId} : {}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Standard" optionText="reference" source="standard"
                                     filter={formData.areaOfConcernId ? {areaOfConcernId: formData.areaOfConcernId} : {}}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props}>
        {getForm(props, true)}
    </Edit>
);