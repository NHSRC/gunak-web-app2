import {
    required,
    Toolbar,
    SaveButton,
    Create,
    Datagrid,
    DisabledInput,
    List,
    Edit,
    ReferenceField,
    SimpleForm,
    TextField,
    TextInput,
    EditButton,
    ReferenceArrayInput,
    SelectArrayInput
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

let getForm = function (isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="assessmentNumber" validate={[required("Mandatory")]}/>
        <GunakReferenceInput label="Facility" optionText="name" source="facility" mandatory={true}/>
        <GunakReferenceInput label="Assessment type" optionText="name" source="assessmentType" mandatory={true}/>
        <ReferenceArrayInput label="Users" source="userIds" reference="user" perPage={100} style={{width: 400}}>
            <SelectArrayInput optionText="email"/>
        </ReferenceArrayInput>
    </SimpleForm>;
};

export const AssessmentNumberAssignmentCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const AssessmentNumberAssignmentEdit = props => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);
