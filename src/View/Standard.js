import React from 'react';
import {
    Toolbar,
    SaveButton,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormDataConsumer,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    CardActions,
    ShowButton
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";
import GunakFilters from "../components/GunakFilters";
import AuditView from "../components/AuditView";

let currentFilter = {};

const EntityFilter = (props) => {
    return <Filter {...props}>
        {<ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}} perPage={50}
                        onChange={(obj, id) => {
                            currentFilter.stateId = id;
                        }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}

        {ResourceFilter.isSelected(props.filterValues.stateId) && GunakFilters.AssessmentTool(currentFilter, ['checklistId', 'areaOfConcernId'], props)}

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) && GunakFilters.Checklist(currentFilter, props, ['areaOfConcernId'])}

        {ResourceFilter.isSelected(props.filterValues.checklistId) && GunakFilters.AreaOfConcern(currentFilter, props)}
    </Filter>
};

export const StandardList = ({privileges, ...props}) => {
    return <div>
        <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="standard"/>
        <List {...props} title='Standards' filters={<EntityFilter/>} perPage={25}
              sort={{field: 'reference', order: 'ASC'}}>
            <Datagrid>
                <EditButton/>
                <TextField source="reference"/>
                <TextField source="name"/>
                <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" sortable={false}>
                    <TextField source="reference"/>
                </ReferenceField>
                {!ResourceFilter.isSelected(currentFilter.assessmentToolId) &&
                <TextField source="assessmentToolNames" label="Assessment tools" style={{width: 160}} sortable={false}/>
                }
                <BooleanField source="inactive"/>
                <TextField source="id"/>
                {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
            </Datagrid>
        </List>
    </div>
};

export const StandardCreate = (props) => (
    <Create {...props}>
        {getForm(props, false)}
    </Create>
);

let getForm = function (props, isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        {GunakFilters.AreaOfConcernForm()}
        <BooleanInput source="inactive" defaultValue={false}/>
        {AuditView.createdDate()}
        {AuditView.lastModifiedDate()}
    </SimpleForm>;
};

const EditActions = ({ basePath, data, resource }) => {
    // Remove areaOfConcernUUID field because it is not edited by the user
    if (data)
        data["areaOfConcernUUID"] = undefined;
    return <CardActions>
        <ShowButton basePath={basePath} record={data}/>
    </CardActions>;
};

export const StandardEdit = props => (
    <Edit {...props} undoable={false} actions={<EditActions/>}>
        {getForm(props, true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);