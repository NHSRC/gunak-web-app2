import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    ReferenceField,
    required,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceArrayInput,
    SelectArrayInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import Privileges from "../model/Privileges";
import InlineHelp from "../components/InlineHelp";

export const AssessmentToolList = ({privileges, ...props}) => (
    <div>
        <InlineHelp message="Each program can have one or more assessment tools"/>
        <List {...props} title='Assessment Tools' sort={{field: 'assessmentToolMode.name,name', order: 'ASC,ASC'}} perPage={25}>
        <Datagrid>
            <EditButton/>
            <TextField source="name"/>
            {Privileges.hasPrivilege(privileges, 'Checklist_Metadata_Write') && <EditButton/>}
            <ReferenceField label="Program" source="assessmentToolModeId" reference="assessmentToolMode" sortBy="assessmentToolMode.name">
                <TextField source="name"/>
            </ReferenceField>
            <BooleanField source="inactive"/>
            <TextField source="id"/>
            <ReferenceField label="State" source="stateId" reference="state" sortBy="state.name" allowEmpty>
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List></div>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? null : <DisabledInput source="id"/>}
        <GunakReferenceInput label="Program" optionText="name" source="assessmentToolMode"/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive" defaultValue={false}/>
        <ReferenceArrayInput label="Checklists" source="checklistIds" reference="checklist" perPage={1000} style={{width: 400}} sort={{field: "assessmentTools.assessmentToolMode.name", order: "ASC"}}>
            <SelectArrayInput optionText="fullName"/>
        </ReferenceArrayInput>
        <InlineHelp message="Choose states based on applicability." helpNumber={7}/>
        <GunakReferenceInput label="Applicable only for state (leave empty if applicable for all)" optionText="name" source="state"
                             sort={{field: 'name', order: 'ASC'}} mandatory={false}/>
        <FormDataConsumer>
            {({formData}) =>
                formData.stateId ? null : <ReferenceArrayInput label="Not applicable for states" source="excludedStateIds" reference="state"
                                                               sort={{field: 'name', order: 'ASC'}} style={{width: 400}}>
                    <SelectArrayInput optionText="name"/>
                </ReferenceArrayInput>
            }
        </FormDataConsumer>
    </SimpleForm>;
};
export const AssessmentToolEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, false)}
    </Edit>
);

export const AssessmentToolCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);