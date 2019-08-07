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
import {PrivilegeCreate, PrivilegeEdit, PrivilegeList} from "./View/Privilege";
import Privileges from "./model/Privileges";
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChecklistIcon from '@material-ui/icons/CheckBox';
import FacilityIcon from '@material-ui/icons/LocalHospital';
import GeoIcon from '@material-ui/icons/Map';
import FolderIcon from '@material-ui/icons/Folder';
import HelpIcon from '@material-ui/icons/QuestionAnswer';
import PersonIcon from '@material-ui/icons/PersonOutline';
import AppHelp from "./View/GunakMobileAppHelp";

const nonExistentResource = <Resource name="placeholder" context="registration" options={{}}/>;

const resourceRestrictedIfNotPrivileged = function (privileges, privilege, resource) {
    return Privileges.hasPrivilege(privileges, privilege) ? resource : nonExistentResource;
};

const resourceWithReadWriteRestriction = function (privileges, readPrivilege, writePrivilege, resourceName, list, edit, create, options, icon) {
    return Privileges.hasPrivilege(privileges, readPrivilege) ?
        <Resource name={resourceName} list={list} edit={Privileges.hasPrivilege(privileges, writePrivilege) ? edit : null}
                  create={Privileges.hasPrivilege(privileges, writePrivilege) ? create : null}
                  options={options} icon={icon} context="route"/> : nonExistentResource;
};

const resourceWithWriteRestrictionOnly = function (privileges, privilege, resourceName, list, edit, create, options, icon) {
    return <Resource name={resourceName} list={list} edit={Privileges.hasPrivilege(privileges, privilege) ? edit : null}
                     create={Privileges.hasPrivilege(privileges, privilege) ? create : null}
                     options={options} icon={icon} context="route"/>;
};

const faq = function () {
    return <Resource name="FAQ" list={FAQ} options={{label: 'FAQ'}} icon={HelpIcon} context="route"/>;
};

const userHelp = function () {
    return <Resource name="userHelp" list={AppHelp} options={{label: 'User Help'}} icon={HelpIcon} context="route"/>;
};

const assessmentType = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentType", AssessmentTypeList, AssessmentTypeEdit, AssessmentTypeCreate, {label: 'Assessment Types'}, FolderIcon);
};

const department = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "department", DepartmentList, DepartmentEdit, DepartmentCreate, {label: 'Departments'}, FolderIcon);
};

const program = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentToolMode", AssessmentToolModeList, AssessmentToolModeEdit, AssessmentToolModeCreate, {label: 'Programs'}, ChecklistIcon);
};

const assessmentTool = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentTool", AssessmentToolList, AssessmentToolEdit, AssessmentToolCreate, {label: 'Assessment Tools'}, ChecklistIcon);
};

const checklist = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checklist", ChecklistList, ChecklistEdit, ChecklistCreate, {label: 'Checklists'}, ChecklistIcon);
};

const areaOfConcern = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "areaOfConcern", AreaOfConcernList, AreaOfConcernEdit, AreaOfConcernCreate, {label: 'Area of concerns'}, ChecklistIcon);
};

const standard = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "standard", StandardList, StandardEdit, StandardCreate, {label: 'Standards'}, ChecklistIcon);
};

const measurableElement = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "measurableElement", MeasurableElementList, MeasurableElementEdit, MeasurableElementCreate, {label: 'Measurable elements'}, ChecklistIcon);
};

const checkpoint = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checkpoint", CheckpointList, CheckpointEdit, CheckpointCreate, {label: 'Checkpoints'}, ChecklistIcon);
};

const indicatorDefinition = function (privileges) {
    return AppConfiguration.isNHSRC() ? resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', 'indicatorDefinition', IndicatorDefinitionList, null, null, {label: 'Indicator definitions'}, ChecklistIcon) : nonExistentResource;
};

const state = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "state", StateList, StateEdit, StateCreate, {label: 'States'}, GeoIcon);
};

const district = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "district", DistrictList, DistrictEdit, DistrictCreate, {label: 'Districts'}, GeoIcon);
};

const facility = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Write', "facility", FacilityList, FacilityEdit, FacilityCreate, {label: 'Facilities'}, FacilityIcon);
};

const facilityType = function (privileges) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "facilityType", FacilityTypeList, FacilityTypeEdit, FacilityTypeCreate, {label: 'Facility types'}, FacilityIcon);
};

const assessment = function (privileges) {
    return resourceWithReadWriteRestriction(privileges, 'Assessment_Read', 'Assessment_Write', 'facilityAssessment', FacilityAssessmentList, FacilityAssessmentEdit, FacilityAssessmentCreate, {label: "Assessments"}, AssessmentIcon);
};

const assessmentMissingCheckpoint = function (privileges) {
    return AppConfiguration.isNHSRC() ? resourceRestrictedIfNotPrivileged(privileges, 'Assessment_Write',
        <Resource name="facilityAssessmentMissingCheckpoint" options={{label: 'Missing Checkpoints'}}
                  list={AssessmentMissingCheckpointList} icon={AssessmentIcon} context="route"/>) : nonExistentResource;
};

const checklistProgress = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Assessment_Write', <Resource name="checklistProgress" context="registration" options={{}}/>);
};

const user = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Users_Write', <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate}
                                                                                  options={{label: 'Users'}} icon={PersonIcon} context="route"/>);
};

const role = function (privileges) {
    return Privileges.hasPrivilege(privileges, 'Users_Write') && <Resource name="role" list={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleList : null}
                                                                           edit={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleEdit : null}
                                                                           create={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleCreate : null}
                                                                           options={{label: 'Roles'}}
                                                                           icon={PersonIcon} context="route"/>;
};

const privilege = function (privileges) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Privilege_Write', <Resource name="privilege" options={{label: 'Privileges'}} list={PrivilegeList} create={PrivilegeCreate}
                                                                                      edit={PrivilegeEdit} icon={PersonIcon} context="route"/>);
};

const App = () =>
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        {privileges => [
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
            checklistProgress(privileges),
            user(privileges),
            role(privileges),
            privilege(privileges),

            userHelp(),
            faq()
        ]}
    </Admin>;

export default App;