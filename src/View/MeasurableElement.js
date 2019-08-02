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
    TextInput,
    ReferenceArrayInput,
    SelectArrayInput
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import Privileges from "../model/Privileges";
import RAFilterUtil from "../utils/RAFilterUtil";
import ResourceFilter from "../framework/ResourceFilter";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() && <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                                                     onChange={(obj, id) => {
                                                         currentFilter.stateId = id;
                                                     }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        }

        <FormDataConsumer form={'filterForm'} alwaysOn>
            {({formData, dispatch, ...rest}) => (
                <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={50} key="1"
                                sort={{field: 'assessmentToolMode.name', order: 'ASC'}}
                                onChange={(obj, id) => {
                                    RAFilterUtil.handleFilterChange(currentFilter, 'assessmentToolId', id, dispatch, ['checklistId', 'areaOfConcernId', 'standardId']);
                                }}>
                    <SelectInput optionText="fullName"/>
                </ReferenceInput>
            )}
        </FormDataConsumer>

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) &&
        <FormDataConsumer form={'filterForm'} alwaysOn>
            {({formData, dispatch, ...rest}) => (
                <ReferenceInput label="Checklist" source="checklistId" reference="checklist"
                                filter={AppConfiguration.isJSS() && props.filterValues.stateId ? {
                                    assessmentToolId: props.filterValues.assessmentToolId,
                                    stateId: props.filterValues.stateId
                                } : {assessmentToolId: props.filterValues.assessmentToolId}} alwaysOn sort={{field: 'name', order: 'ASC'}}
                                perPage={100}
                                onChange={(obj, id) => {
                                    RAFilterUtil.handleFilterChange(currentFilter, 'checklistId', id, dispatch, ['areaOfConcernId', 'standardId']);
                                }}>
                    <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
                </ReferenceInput>
            )}
        </FormDataConsumer>}

        {ResourceFilter.isSelected(props.filterValues.checklistId) &&
        <FormDataConsumer form={'filterForm'} alwaysOn>
            {({formData, dispatch, ...rest}) => (
                <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                                filter={{checklistId: props.filterValues.checklistId, assessmentToolId: props.filterValues.assessmentToolId}}
                                onChange={(obj, id) => {
                                    RAFilterUtil.handleFilterChange(currentFilter, 'areaOfConcernId', id, dispatch, ['standardId']);
                                }}>
                    <SelectInput optionText="referenceAndName"/>
                </ReferenceInput>)}
        </FormDataConsumer>}

        {ResourceFilter.isSelected(props.filterValues.areaOfConcernId) &&
        <FormDataConsumer form={'filterForm'} alwaysOn>
            {({formData, dispatch, ...rest}) => (
                <ReferenceInput label="Standard" source="standardId" reference="standard" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                                filter={{areaOfConcernId: props.filterValues.areaOfConcernId}}
                                onChange={(obj, id) => {
                                    RAFilterUtil.handleFilterChange(currentFilter, 'standardId', id, dispatch);
                                }}>
                    <SelectInput optionText="referenceAndName"/>
                </ReferenceInput>)}
        </FormDataConsumer>}
    </Filter>
);

export const MeasurableElementList = ({privileges, ...props}) => {
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
                    <BooleanField source="inactive"/>
                    <TextField source="id" sortable={false}/>
                    {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
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
        <br/>
        <InlineHelp message="Use assessment tool, checklist and area of concern for narrowing down your standard" helpNumber={2}/>
        <ReferenceArrayInput label="Assessment tools" source="assessmentToolIds" reference="assessmentTool" sort={{field: 'name', order: 'ASC'}} mandatory={false}>
            <SelectArrayInput optionText="fullName"/>
        </ReferenceArrayInput>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Checklist" optionText={ChecklistConfiguration.getDisplayProperty()} source="checklist" perPage={100}
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}} mandatory={false}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="referenceAndName" source="areaOfConcern" perPage={100}
                                     filter={formData.checklistId ? {checklistId: formData.checklistId} : {}} mandatory={false}
                                     sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Standard" optionText="referenceAndName" source="standard"
                                     filter={formData.areaOfConcernId ? {areaOfConcernId: formData.areaOfConcernId} : {}} sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);