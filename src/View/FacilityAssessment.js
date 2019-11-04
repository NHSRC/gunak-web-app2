import React from 'react';
import {
    Toolbar,
    SaveButton,
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateInput,
    DisabledInput,
    Edit,
    EditButton,
    FileField,
    FileInput,
    Filter,
    FormDataConsumer,
    List,
    NumberField,
    ReferenceArrayField,
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
import {GunakReferenceInput} from "../components/Inputs";
import AppConfiguration from "../framework/AppConfiguration";
import InlineHelp from "../components/InlineHelp";
import NavigationField from "../components/NavigationField";
import Privileges from "../model/Privileges";
import RAFilterUtil from "../utils/RAFilterUtil";
import ResourceFilter from "../framework/ResourceFilter";

let currentFilter = {};

const EntityFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Facility Name" source="facilityName" alwaysOn/>
        <ReferenceInput label="Assessment tool" source="assessmentToolId" reference="assessmentTool"  sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Assessment Type" source="assessmentTypeId" reference="assessmentType"  sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Facility Type" source="facilityTypeId" reference="facilityType"  sort={{field: 'name', order: 'ASC'}}>
            <SelectInput optionText="name"/>
        </ReferenceInput>


        {RAFilterUtil.createFilterItem(currentFilter, "State", "stateId", "state", {field: 'name', order: 'ASC'}, "name", {}, ["districtId"])}

        {ResourceFilter.isSelected(props.filterValues.stateId) && <ReferenceInput label="District" source="districtId" reference="district" alwaysOn sort={{field: 'name', order: 'ASC'}}
                                                                                  filter={{stateId: props.filterValues.stateId}}
                                                                                  onChange={(obj, id) => {
                                                                                      currentFilter.districtId = id;
                                                                                  }}>
            <SelectInput optionText="name"/>
        </ReferenceInput>}
    </Filter>
);



export const FacilityAssessmentList = ({privileges, ...props}) => (
    <List {...props} title='FacilityAssessments' perPage={25} filters={<EntityFilter/>}>
        <Datagrid>
            <EditButton label="View"/>
            <ReferenceField label="Assessment Tool" source="assessmentToolId" reference="assessmentTool" sortBy="assessmentTool.name">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Facility" source="facilityId" reference="facility" allowEmpty sortBy="facility.name">
                <TextField source="name"/>
            </ReferenceField>
            {AppConfiguration.isNHSRC() ? <TextField source="facilityName" label="Non-coded Facility Name"/> : null}
            <TextField source="series"/>
            <ReferenceField label="Assessment Type" source="assessmentTypeId" reference="assessmentType" sortBy="assessmentType.name">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="startDate"/>
            <TextField source="endDate"/>
            <BooleanField source="inactive"/>
            {Privileges.hasPrivilege(privileges, 'Assessment_Write') && <EditButton/>}
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let displayMissingReport = function (isEdit) {
    return AppConfiguration.isNHSRC() && isEdit;
};

let getForm = function (isEdit) {
    return <SimpleForm toolbar={<EditToolbar/>}>
        {isEdit && <DisabledInput source="id"/>}
        <GunakReferenceInput label="Assessment tool" optionText="fullName" source="assessmentTool" sort={{field: "assessmentToolMode.name", order: 'ASC'}}/>
        <GunakReferenceInput label="State" optionText="name" source="state"/>
        <FormDataConsumer>
            {({formData, ...rest}) =>
                <GunakReferenceInput label="District" optionText="name" source="district" perPage={100}
                                     filter={formData.stateId ? {stateId: formData.stateId} : {}}/>
            }
        </FormDataConsumer>
        <GunakReferenceInput label="Facility type" optionText="name" source="facilityType"/>
        <FormDataConsumer>
            {({formData}) => {
                let filter = {};
                if (formData.districtId) filter["districtId"] = formData.districtId;
                if (formData.facilityTypeId) filter["facilityTypeId"] = formData.facilityTypeId;
                return <GunakReferenceInput label="Facility" optionText="name" source="facility" perPage={200} filter={filter} mandatory={false}/>;
            }
            }
        </FormDataConsumer>
        {AppConfiguration.isNHSRC() && <TextInput source="facilityName" label="Facility name (if not given above)"/>}
        <GunakReferenceInput label="Assessment type" optionText="name" source="assessmentType"/>
        <DateInput source="startDate" label="Assessment start date" validate={[required("Mandatory")]}/>
        <DateInput source="endDate" label="Assessment end date" validate={[required("Mandatory")]}/>
        {AppConfiguration.isNHSRC() && <BooleanInput source="inactive" defaultValue={false}/>}
        {AppConfiguration.isNHSRC() &&
        <FileInput source="files" label="Assessment file (only .XLSX file supported)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <FileField source="uploadFile" title="title"/>
        </FileInput>}
        {isEdit && <InlineHelp message="Table below provides information about the checklists where any score was filled and which area of concerns were completed."/>}
        {isEdit && <ReferenceManyField addLabel={false} reference="checklistProgress"
                                       target="facilityAssessmentId">
            <Datagrid>
                <ReferenceField label="Checklist" source="checklistId" reference="checklist">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern">
                    <TextField source="reference"/>
                </ReferenceField>
                <NumberField source="completed"/>
                <NumberField source="total"/>
            </Datagrid>
        </ReferenceManyField>}
        {displayMissingReport(isEdit) && <InlineHelp helpNumber={8}
                                                     message="Rows/Sheets that could not be imported because not present in the database. If empty then all rows were successfully imported or submission happened via mobile."/>}
        {displayMissingReport(isEdit) &&
        <ReferenceArrayField addLabel={false} label="Missing checklists" reference="missingChecklist" target="facilityAssessmentId">
            <SingleFieldList>
                <TextField source="name"/>
            </SingleFieldList>
        </ReferenceArrayField>
        }
        {displayMissingReport(isEdit) &&
        <ReferenceManyField addLabel={false} label="Checkpoints not found" reference="facilityAssessmentMissingCheckpoint"
                            target="facilityAssessmentId"
                            sort={{field: 'missingCheckpoint.checklist.name', order: 'ASC'}}>
            <Datagrid rowClick="edit">
                <ReferenceField label="Checklist" source="checklistId" reference="checklist" style={{width: 160}}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="missingCheckpointName"/>
                <TextField source="measurableElementReference"/>
            </Datagrid>
        </ReferenceManyField>}
        {displayMissingReport(isEdit) &&
        <NavigationField display="All missing checkpoints for this assessment" targetResource="facilityAssessmentMissingCheckpoint"
                         filterField="facilityAssessmentId" source="id"/>}
    </SimpleForm>;
};

export const FacilityAssessmentCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const FacilityAssessmentEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);
