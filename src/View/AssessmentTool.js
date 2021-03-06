import React from 'react';
import {
    NumberField,
    NumberInput,
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
    SelectArrayInput,
    FormDataConsumer,
    Filter,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import Privileges from "../model/Privileges";
import InlineHelp from "../components/InlineHelp";
import AppConfiguration from "../framework/AppConfiguration";
import AuditView from "../components/AuditView";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isNHSRC() &&
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                        perPage={50}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);

export const AssessmentToolList = ({privileges, ...props}) => (
    <div>
        <List {...props} title='Assessment Tools' sort={{field: 'assessmentToolMode.name,name', order: 'ASC,ASC'}} perPage={25} filters={<EntityFilter/>}>
        <Datagrid>
            <EditButton/>
            <TextField source="name"/>
            {Privileges.hasPrivilege(privileges, 'Checklist_Metadata_Write') && <EditButton/>}
            <ReferenceField label="Program" source="assessmentToolModeId" reference="assessmentToolMode" sortBy="assessmentToolMode.name">
                <TextField source="name"/>
            </ReferenceField>
            <NumberField source="sortOrder"/>
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
        <NumberInput source="sortOrder" step={1} validate={[required("Mandatory")]}/>
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
        {AuditView.createdDate()}
        {AuditView.lastModifiedDate()}
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