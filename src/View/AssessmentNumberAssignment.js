import {
    CardActions,
    AutocompleteArrayInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    CreateButton,
    EditButton,
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

export const AssessmentNumberAssignmentList = props => (
    <List {...props} title='Facility assessment assignment' perPage={25} sortBy="assessmentNumber">
        <Datagrid>
            <EditButton/>
            <TextField source="assessmentNumber"/>
            <ReferenceField label="Facility" source="facilityId" reference="facility">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Assessment type" source="assessmentTypeId" reference="assessmentType">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

function facilityFilter(formData) {
    let filter = {};
    if (formData && formData.districtId)
        filter.districtId = formData.districtId;
    if (formData && formData.facilityTypeId)
        filter.facilityTypeId = formData.facilityTypeId;
    return filter;
}

function assessmentTypeFilter(formData) {
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
        <fieldset>
            <legend>Find and select the facility</legend>
            <GunakReferenceInput label="State" optionText="name" source="state"/>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="District" optionText="name" source="district"
                                         filter={(formData && formData.stateId) ? {stateId: formData.stateId} : {}}/>}
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Facility type" optionText="name" source="facilityType" mandatory={false}/>}
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Facility" optionText="name" source="facility"
                                         filter={facilityFilter(formData)} perPage={500}/>}
            </FormDataConsumer>
            <br/>
            <br/>
            <br/>
        </fieldset>

        <br/>
        <br/>
        <fieldset>
            <legend>Choose assessment type</legend>
            <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode" mandatory={true}/>
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
    </SimpleForm>;
};

export const AssessmentNumberAssignmentCreate = (props) => (
    <Create {...props} title="Create new assessment number assignment">
        {getForm(false)}
    </Create>
);

const EditActions = ({ basePath, data, resource }) => {
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
