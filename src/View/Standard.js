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
    FormDataConsumer,
    required
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import AppConfiguration from "../framework/AppConfiguration";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>

        {props.filterValues.assessmentToolId &&
        <ReferenceInput label="Checklist" key={props.filterValues.assessmentToolId} source="checklistId" reference="checklist"
                        filter={{assessmentToolId: props.filterValues.assessmentToolId}} alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText={AppConfiguration.isNHSRC() ? "name" : "fullName"}/>
        </ReferenceInput>}

        {props.filterValues.checklistId &&
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort={{field: 'reference', order: 'ASC'}}
                        filter={{assessmentToolId: props.filterValues.assessmentToolId}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);

export const StandardList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Standard" childResource="standard"/>
        <List {...props} title='Standards' perPage={25} filters={<EntityFilter/>}>
            <Datagrid rowClick="edit">
                <TextField source="reference" validate={[required("Mandatory")]}/>
                <TextField source="name"/>
                <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern">
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
        <GunakReferenceInput label="Assessment tool" optionText="name" source="assessmentTool"/>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Checklist" optionText="fullName" source="checklist" perPage={100}
                                     filter={formData.assessmentToolId ? {assessmentToolId: formData.assessmentToolId} : {}}/>
            }
        </FormDataConsumer>
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="name" source="areaOfConcern" perPage={100}
                                     filter={formData.checklistId ? {checklistId: formData.checklistId} : {}}/>
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