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
import AppConfiguration from "../framework/AppConfiguration";
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import ChecklistConfiguration from "../model/ChecklistConfiguration";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={() => {
                            delete(props.filterValues.checklistId);
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>

        {props.filterValues.assessmentToolId &&
        <ReferenceInput
            label="Checklist"
            key={props.filterValues.assessmentToolId}
            source="checklistId"
            reference="checklist"
            filter={{assessmentToolId: props.filterValues.assessmentToolId}}
            alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText={ChecklistConfiguration.getDisplayProperty()}/>
        </ReferenceInput>}
    </Filter>
);

export const AreaOfConcernList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Area Of Concern" childResource="areaOfConcern"/>
        <List {...props} title='Area of concerns' filters={<EntityFilter/>} perPage={100} sort={{field: 'reference', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="reference"/>
                <TextField source="name"/>
                <EditButton/>
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List>
    </div>
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
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const AreaOfConcernEdit = props => (
    <Edit {...props}>
        {getForm(props, true)}
    </Edit>
);

export const AreaOfConcernCreate = (props) => (
    <Create {...props} title="Create new area of concern">
        {getForm(props, false)}
    </Create>
);