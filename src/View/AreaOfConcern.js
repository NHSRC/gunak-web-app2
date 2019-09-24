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
    ReferenceArrayInput,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import AppConfiguration from "../framework/AppConfiguration";
import Privileges from "../model/Privileges";
import InlineHelp from "../components/InlineHelp";
import GunakFilters from "../components/GunakFilters";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() &&
        <ReferenceInput label="State" source="stateId" reference="state" alwaysOn perPage={100} sort={{field: 'name', order: 'ASC'}}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        {GunakFilters.AssessmentTool(currentFilter)}
    </Filter>
);

export const AreaOfConcernList = ({privileges, ...props}) => (
    <div>
        <InlineHelp message="Area of concerns that are not associated to any checklist will show assessment tool as empty"/>
        <List {...props} title='Area of concerns' filters={<EntityFilter/>} perPage={100}
              sort={{
                  field: 'reference',
                  order: 'ASC'
              }}>
            <Datagrid>
                <EditButton/>
                <TextField source="reference"/>
                <TextField source="name"/>
                <TextField source="assessmentToolNames" label="Assessment tools"/>
                {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
                <BooleanField source="inactive"/>
                <TextField source="id"/>
            </Datagrid>
        </List>
    </div>
);

let getForm = function (props, isEdit) {
    return <SimpleForm>
        <InlineHelp
            message="Checklist and area of concern are associated to each other. A checklist can be associated to multiple area of concern and vice-versa"/>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <BooleanInput source="inactive" defaultValue={false}/>
        <ReferenceArrayInput label="Checklists" source="checklistIds" reference="checklist" sort={[{field: 'assessmentTools.name', order: 'ASC'}, {
            field: 'name',
            order: 'ASC'
        }]} style={{width: 400}} perPage={1000}>
            <SelectArrayInput optionText="fullName"/>
        </ReferenceArrayInput>
    </SimpleForm>;
};
export const AreaOfConcernEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);

export const AreaOfConcernCreate = (props) => (
    <Create {...props} title="Create new area of concern">
        {getForm(props, false)}
    </Create>
);