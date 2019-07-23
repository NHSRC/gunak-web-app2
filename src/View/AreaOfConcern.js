import React from 'react';
import {
    BooleanField,
    BooleanInput,
    ChipField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput
} from 'react-admin';
import AppConfiguration from "../framework/AppConfiguration";
import Privileges from "../model/Privileges";
import InlineHelp from "../components/InlineHelp";

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

        <ReferenceInput label="Assessment tool"
                        source="assessmentToolId"
                        reference="assessmentTool"
                        alwaysOn perPage={100} sort={[{field: 'id', order: 'ASC'}, {field: 'name', order: 'ASC'}]}
                        onChange={(obj, id) => {
                            currentFilter.assessmentToolId = id;
                        }}>
            <SelectInput optionText="fullName"/>
        </ReferenceInput>
    </Filter>
);

export const AreaOfConcernList = ({privileges, ...props}) => (
    <div>
        <InlineHelp message="Area of concerns that are not associated to any checklist will show assessment tool as empty"/>
        <List {...props} title='Area of concerns' filters={<EntityFilter/>} perPage={100} sort={{field: 'reference', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                <ReferenceField label="Assessment tool" source="assessmentToolId" reference="assessmentTool" sortBy="checklists.assessmentTool.name" allowEmpty>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="reference"/>
                <TextField source="name"/>
                {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
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
        <BooleanInput source="inactive" defaultValue={false}/>
        <InlineHelp message="Associate to checklist if it is created. If not then create checklist. You can also associate area of concern while creating checklist"/>
        <ReferenceInput label="Checklist" source="checklistId" reference="checklist"
                        sort={[{field: 'assessmentTool.assessmentToolMode.id', order: 'ASC'}, {field: 'assessmentTool.name', order: 'ASC'}, {
                            field: 'name',
                            order: 'ASC'
                        }]} perPage={1000}>
            <SelectInput optionText="fullReference" style={{width: 600}}/>
        </ReferenceInput>
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