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
    FormDataConsumer,
    List,
    ReferenceArrayInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import Privileges from "../model/Privileges";
import ResourceFilter from "../framework/ResourceFilter";
import GunakFilters from "../components/GunakFilters";
import Logger from "../utils/Logger";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        {AppConfiguration.isJSS() && <ReferenceInput label="State" source="stateId" reference="state" alwaysOn sort={{field: 'name', order: 'ASC'}}
                                                     onChange={(obj, id) => {
                                                         currentFilter.stateId = id;
                                                     }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        }

        {GunakFilters.AssessmentTool(currentFilter, ['checklistId', 'areaOfConcernId', 'standardId'])}

        {ResourceFilter.isSelected(props.filterValues.assessmentToolId) && GunakFilters.Checklist(currentFilter, props, ['areaOfConcernId', 'standardId'])}

        {ResourceFilter.isSelected(props.filterValues.checklistId) && GunakFilters.AreaOfConcern(currentFilter, props, ['standardId'])}

        {ResourceFilter.isSelected(props.filterValues.areaOfConcernId) && GunakFilters.Standard(currentFilter, props)}
    </Filter>
);

export const MeasurableElementList = ({privileges, ...props}) => {
    return (
        <div>
            <ContextActions userFilter={currentFilter} label="Create (with filter values)" childResource="measurableElement"/>
            <List {...props} title='Measurable elements' filters={<EntityFilter/>} perPage={50} sort={{field: 'reference', order: 'ASC'}}>
                <Datagrid rowClick="edit">
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
    return <SimpleForm>
        {isEdit && <DisabledInput source="id"/>}
        <TextInput source="reference" validate={[required("Mandatory")]}/>
        <TextInput source="name" validate={[required("Mandatory")]}/>
        <br/>
        <InlineHelp message="Use assessment tool, checklist and area of concern for narrowing down your standard" helpNumber={2}/>
        {GunakFilters.AreaOfConcernForm()}
        <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Standard" optionText="referenceAndName" source="standard"
                                     filter={formData.areaOfConcernId ? {areaOfConcernId: formData.areaOfConcernId} : {}} sort={{field: 'reference', order: 'ASC'}}/>
            }
        </FormDataConsumer>
        <BooleanInput source="inactive" defaultValue={false}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(props, true)}
    </Edit>
);