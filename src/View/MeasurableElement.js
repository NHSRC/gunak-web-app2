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
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar,
    SaveButton
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import InlineHelp from "../components/InlineHelp";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";
import GunakFilters from "../components/GunakFilters";
import _ from 'lodash';

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {<ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}} perPage={50}
                         onChange={(obj, id) => {
                             currentFilter.stateId = id;
                         }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        }

        {ResourceFilter.isSelected(props.filterValues.stateId) && GunakFilters.AssessmentTool(currentFilter, ['checklistId', 'areaOfConcernId', 'standardId'], props)}

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) && GunakFilters.Checklist(currentFilter, props, ['areaOfConcernId', 'standardId'])}

        {ResourceFilter.isSelected(props.filterValues.checklistId) && GunakFilters.AreaOfConcern(currentFilter, props, ['standardId'])}

        {ResourceFilter.isSelected(props.filterValues.areaOfConcernId) && GunakFilters.Standard(currentFilter, props)}
    </Filter>
);

export const MeasurableElementList = ({privileges, ...props}) => {
    return (
        <div>
            <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="measurableElement"/>
            <List {...props} title='Measurable elements' filters={<EntityFilter/>} perPage={50} sort={{field: 'reference', order: 'ASC'}}
                  filter={!_.isEmpty(currentFilter) && {showMEWithoutCheckpoints: true}}>
                <Datagrid>
                    <EditButton/>
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard" sortBy="standard.reference">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <BooleanField source="inactive"/>
                    <TextField source="id" sortable={false}/>
                    {Privileges.hasPrivilege(privileges, 'Checklist_Write') && <EditButton/>}
                </Datagrid>
            </List>
        </div>
    );
};

export const MeasurableElementCreate = (props) => (
    <Create {...props}>
        {getForm(props, false)}
    </Create>
);

let getForm = function (props, isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <br/>
        <InlineHelp message="Use area of concern for narrowing down your standard" helpNumber={2}/>
        {GunakFilters.AreaOfConcernForm()}
        {GunakFilters.StandardForm()}
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);