import React from 'react';
import {
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceField,
    Create,
    ReferenceInput,
    SelectInput,
    required,
    BooleanField,
    LongTextInput,
    BooleanInput,
    NumberInput,
    NumberField,
    Filter,
    AutocompleteInput,
    FileInput,
    FileField,
    DateInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import {FormDataConsumer} from 'react-admin';

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn sort="name">
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort="name">
            <AutocompleteInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const FacilityAssessmentList = props => (
    <List {...props} title='FacilityAssessments' filters={<EntityFilter/>}>
        <Datagrid rowClick="edit">
            <TextField source="facilityName" label="Facility Name"/>
            <TextField source="startDate"/>
            <TextField source="endDate"/>
            <TextField source="series"/>
            <ReferenceField label="Assessment Type" source="assessmentTypeId" reference="assessmentType">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Facility" source="facilityId" reference="facility" allowEmpty={true}>
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let getForm = function (isCreate) {
    console.log("getForm");
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool"/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <FormDataConsumer>
            {({formData, ...rest}) =>
                <GunakReferenceInput label="District" optionText="name" source="district" perPage={100}
                                     filter={formData.stateId ? {stateId: formData.stateId} : {}}/>
            }
        </FormDataConsumer>
        <GunakReferenceInput label="Facility type" optionText="name" source="facilityType"/>
        <FormDataConsumer>
            {({formData, ...rest}) => {
                let filter = {};
                if (formData.districtId) filter["districtId"] = formData.districtId;
                if (formData.facilityTypeId) filter["facilityTypeId"] = formData.facilityTypeId;
                return <GunakReferenceInput label="Facility" optionText="name" source="facility" perPage={200}
                                     filter={filter} mandatory={false}/>;
            }
            }
        </FormDataConsumer>
        <TextInput source="facilityName" label="Facility (mandatory if not found above)" mandatory={false}/>
        <GunakReferenceInput label="Assessment type" optionText="name" source="assessmentType"/>
        <DateInput source="startDate" label="Assessment start date" mandatory={true}/>
        <DateInput source="endDate" label="Assessment end date" mandatory={true}/>
        <FileInput source="files" label="Assessment file (only .XLSX file supported)" accept="application/xlsx">
            <FileField source="uploadFile" title="title"/>
        </FileInput>
    </SimpleForm>;
};

export const FacilityAssessmentCreate = (props) => (
    <Create {...props}>
        {getForm(true)}
    </Create>
);

export const FacilityAssessmentEdit = props => (
    <Edit {...props}>
        {getForm(false)}
    </Edit>
);