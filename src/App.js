import React from 'react';
import {Admin, Resource} from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentTypeCreate, AssessmentTypeEdit, AssessmentTypeList} from './View/AssessmentType';
import {DepartmentCreate, DepartmentEdit, DepartmentList} from './View/Department';
import {AssessmentToolModeCreate, AssessmentToolModeEdit, AssessmentToolModeList} from './View/AssessmentToolMode';
import {AssessmentToolCreate, AssessmentToolEdit, AssessmentToolList} from './View/AssessmentTool';
import {ChecklistCreate, ChecklistEdit, ChecklistList} from './View/Checklist';
import {AreaOfConcernCreate, AreaOfConcernEdit, AreaOfConcernList} from './View/AreaOfConcern';
import {StandardCreate, StandardEdit, StandardList} from './View/Standard';
import {MeasurableElementCreate, MeasurableElementEdit, MeasurableElementList} from './View/MeasurableElement';
import {IndicatorDefinitionList} from './View/IndicatorDefinition';
import {CheckpointCreate, CheckpointEdit, CheckpointList} from "./View/Checkpoint";
import {StateCreate, StateEdit, StateList} from "./View/State";
import {DistrictCreate, DistrictEdit, DistrictList} from "./View/District";
import {FacilityCreate, FacilityEdit, FacilityList} from "./View/Facility";
import {FacilityTypeCreate, FacilityTypeEdit, FacilityTypeList} from "./View/FacilityType";
import {FacilityAssessmentCreate, FacilityAssessmentEdit, FacilityAssessmentList} from "./View/FacilityAssessment";
import {UserCreate, UserEdit, UserList} from "./View/User";
import AppConfiguration from "./framework/AppConfiguration";
import FAQ from "./View/FAQ";
import {AssessmentMissingCheckpointList} from "./View/AssessmentMissingCheckpoint";
import {RoleCreate, RoleEdit, RoleList} from "./View/Role";
import {PrivilegeList} from "./View/Privilege";
import _ from 'lodash';
import Privileges from "./model/Privileges";

const nonExistentResource = <Resource name="placeholder"/>;

const resourceRestrictedIfNotPrivileged = function (privileges, privilege, resource) {
    return Privileges.hasPrivilege(privileges, privilege) ? resource : nonExistentResource;
};

const resourceWithReadWriteRestriction = function (privileges, readPrivilege, writePrivilege, resourceName, list, edit, create, options) {
    return Privileges.hasPrivilege(privileges, readPrivilege) ?
        <Resource name={resourceName} list={list} edit={Privileges.hasPrivilege(privileges, writePrivilege) && edit}
                  create={Privileges.hasPrivilege(privileges, writePrivilege) && create}
                  options={options}/> : nonExistentResource;
};

const resourceWithWriteRestrictionOnly = function (privileges, privilege, resourceName, list, edit, create, options) {
    return <Resource name={resourceName} list={list} edit={Privileges.hasPrivilege(privileges, privilege) && edit}
                     create={Privileges.hasPrivilege(privileges, privilege) && create}
                     options={options}/>;
};

// Assessment_Read
// Assessment_Write
// Checklist_Metadata_Write
// Checklist_Write
// Facility_Metadata_Write
// Facility_Write
// Privilege_Write
// User
// Users_Read
// Users_Write

const faq = function () {
    return <Resource name="FAQ" list={FAQ} options={{label: 'FAQ'}}/>;
};

const assessmentType = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentType", AssessmentTypeList, AssessmentTypeEdit, AssessmentTypeCreate, {label: 'Assessment Types'});
};

const department = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "department", DepartmentList, DepartmentEdit, DepartmentCreate, {label: 'Departments'});
};

const program = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentToolMode", AssessmentToolModeList, AssessmentToolModeEdit, AssessmentToolModeCreate, {label: 'Programs'});
};

const assessmentTool = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentTool", AssessmentToolList, AssessmentToolEdit, AssessmentToolCreate, {label: 'Assessment Tools'});
};

const checklist = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checklist", ChecklistList, ChecklistEdit, ChecklistCreate, {label: 'Checklists'});
};

const areaOfConcern = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "areaOfConcern", AreaOfConcernList, AreaOfConcernEdit, AreaOfConcernCreate, {label: 'Area of concerns'});
};

const standard = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "standard", StandardList, StandardEdit, StandardCreate, {label: 'Standards'});
};

const measurableElement = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "measurableElement", MeasurableElementList, MeasurableElementEdit, MeasurableElementCreate, {label: 'Measurable elements'});
};

const checkpoint = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checkpoint", CheckpointList, CheckpointEdit, CheckpointCreate, {label: 'Checkpoints'});
};

const indicatorDefinition = function (privileges) {
    return AppConfiguration.isNHSRC() ? resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', 'indicatorDefinition', IndicatorDefinitionList, null, null, {label: 'Indicator definitions'}) : nonExistentResource;
};

const state = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "state", StateList, StateEdit, StateCreate, {label: 'States'});
};

const district = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "district", DistrictList, DistrictEdit, DistrictCreate, {label: 'Districts'});
};

const facility = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Write', "facility", FacilityList, FacilityEdit, FacilityCreate, {label: 'Facilities'});
};

const facilityType = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "facilityType", FacilityTypeList, FacilityTypeEdit, FacilityTypeCreate, {label: 'Facility types'});
};

const assessment = function (privileges) {
    return resourceWithReadWriteRestriction(privileges, 'Assessment_Read', 'Assessment_Write', 'facilityAssessment', FacilityAssessmentList, FacilityAssessmentCreate, FacilityAssessmentEdit);
};

const assessmentMissingCheckpoint = function (privileges) {
    return AppConfiguration.isNHSRC() ? resourceRestrictedIfNotPrivileged(privileges, 'Assessment_Write',
        <Resource name="facilityAssessmentMissingCheckpoint" options={{label: 'Missing Checkpoints'}}
                  list={AssessmentMissingCheckpointList}/>) : nonExistentResource;
};

const user = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Users_Write', <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate}
                                                                                  options={{label: 'Users'}}/>);
};

const role = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Privilege_Write', <Resource name="role" list={RoleList} options={{label: 'Roles'}} create={RoleCreate}
                                                                                      edit={RoleEdit}/>);
};

const privilege = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Privilege_Write', <Resource name="privilege" options={{label: 'Privileges'}} list={PrivilegeList}/>);
};

const App = () =>
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        {privileges => [
            faq(),
            assessmentType(privileges),
            department(privileges),

            program(privileges),
            assessmentTool(privileges),
            checklist(privileges),
            areaOfConcern(privileges),
            standard(privileges),
            measurableElement(privileges),
            checkpoint(privileges),
            indicatorDefinition(privileges),
            state(privileges),
            district(privileges),
            facilityType(privileges),
            facility(privileges),

            assessment(privileges),
            assessmentMissingCheckpoint(privileges),
            user(privileges),
            role(privileges),
            privilege(privileges)
        ]}
    </Admin>;

export default App;