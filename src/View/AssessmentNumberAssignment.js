import {
    BooleanField,
    BooleanInput,
    AutocompleteArrayInput,
    CardActions,
    Create,
    CreateButton,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormDataConsumer,
    List,
    ReferenceArrayInput,
    ReferenceField,
    required,
    SaveButton,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar
} from 'react-admin';
import React from 'react';
import {GunakReferenceInput} from "../components/Inputs";
import ResourceFilter from "../framework/ResourceFilter";
import GunakFilters from "../components/GunakFilters";
import FacilitySelect from "../components/FacilitySelect";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {GunakFilters.State(currentFilter, props, ["districtId"])}
        {ResourceFilter.isSelected(props.filterValues.stateId) && GunakFilters.District(currentFilter, props)}
    </Filter>
);


export const AssessmentNumberAssignmentList = props => (
    <List {...props} title='Facility assessment assignment' perPage={25} sortBy="assessmentNumber" filters={<EntityFilter/>}>
        <Datagrid>
            <EditButton/>
            <TextField source="assessmentNumber"/>
            <ReferenceField label="State" source="stateId" reference="state">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="District" source="districtId" reference="district">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Facility" source="facilityId" reference="facility">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Assessment tool" source="assessmentToolId" reference="assessmentTool">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Assessment type" source="assessmentTypeId" reference="assessmentType">
                <TextField source="name"/>
            </ReferenceField>
            <BooleanField source="inactive"/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

function assessmentTypeFilter(formData) {
    let filter = {};
    if (formData && formData.assessmentToolModeId)
        filter.assessmentToolModeId = formData.assessmentToolModeId;
    return filter;
}

function assessmentToolFilter(formData) {
    let filter = {};
    if (formData && formData.assessmentToolModeId)
        filter.assessmentToolModeId = formData.assessmentToolModeId;
    return filter;
}

let getForm = function (isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="assessmentNumber" validate={[required("Mandatory")]}/>

        <br/>
        <br/>
        <FacilitySelect/>

        <br/>
        <br/>
        <fieldset>
            <legend>Choose assessment tool and assessment type</legend>
            <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode" mandatory={true}/>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool"
                                         filter={assessmentToolFilter(formData)} perPage={100} mandatory={true}/>}
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Assessment type" optionText="name" source="assessmentType"
                                         filter={assessmentTypeFilter(formData)} perPage={20} mandatory={true}/>}
            </FormDataConsumer>
            <br/>
            <br/>
            <br/>
        </fieldset>

        <br/>
        <br/>
        <ReferenceArrayInput source="userIds" reference="user" label="Users" validate={[required("Mandatory")]} filter={{inactive: false}}>
            <AutocompleteArrayInput optionText="email"/>
        </ReferenceArrayInput>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};

export const AssessmentNumberAssignmentCreate = (props) => (
    <Create {...props} title="Create new assessment number assignment">
        {getForm(false)}
    </Create>
);

const EditActions = ({basePath, data, resource}) => {
    return <CardActions>
        <CreateButton basePath={basePath}/>
    </CardActions>;
};

export const AssessmentNumberAssignmentEdit = props => (
    <Edit {...props} title="Edit assessment number assignment" actions={<EditActions/>}>
        {getForm(true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);
