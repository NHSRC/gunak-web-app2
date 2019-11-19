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
import GunakRALayout from "./framework/layout/Layout";

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

const faq = function (menuCategory) {
    return <Resource name="FAQ" list={FAQ} options={{label: 'FAQ',menuCategory:menuCategory}} icon={HelpIcon} context="route"/>;
};

const userHelp = function (menuCategory) {
    return <Resource name="userHelp" list={AppHelp} options={{label: 'User Help', menuCategory:menuCategory}} icon={HelpIcon} context="route"/>;
};

const assessmentType = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentType", AssessmentTypeList, AssessmentTypeEdit, AssessmentTypeCreate, {label: 'Assessment Types',menuCategory:menuCategory}, FolderIcon);
};

const department = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "department", DepartmentList, DepartmentEdit, DepartmentCreate, {label: 'Departments', menuCategory:menuCategory}, FolderIcon);
};

const program = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentToolMode", AssessmentToolModeList, AssessmentToolModeEdit, AssessmentToolModeCreate, {label: 'Programs',menuCategory:menuCategory}, ChecklistIcon);
};

const assessmentTool = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Metadata_Write', "assessmentTool", AssessmentToolList, AssessmentToolEdit, AssessmentToolCreate, {label: 'Assessment Tools', menuCategory:menuCategory}, ChecklistIcon);
};

const checklist = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checklist", ChecklistList, ChecklistEdit, ChecklistCreate, {label: 'Checklists',menuCategory:menuCategory}, ChecklistIcon);
};

const areaOfConcern = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "areaOfConcern", AreaOfConcernList, AreaOfConcernEdit, AreaOfConcernCreate, {label: 'Area of concerns', menuCategory:menuCategory}, ChecklistIcon);
};

const standard = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "standard", StandardList, StandardEdit, StandardCreate, {label: 'Standards',menuCategory:menuCategory}, ChecklistIcon);
};

const measurableElement = function (privileges,menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "measurableElement", MeasurableElementList, MeasurableElementEdit, MeasurableElementCreate, {label: 'Measurable elements',menuCategory:menuCategory}, ChecklistIcon);
};

const checkpoint = function (privileges, menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', "checkpoint", CheckpointList, CheckpointEdit, CheckpointCreate, {label: 'Checkpoints', menuCategory:menuCategory}, ChecklistIcon);
};

const indicatorDefinition = function (privileges, menuCategory) {
    return AppConfiguration.isNHSRC() ? resourceWithWriteRestrictionOnly(privileges, 'Checklist_Write', 'indicatorDefinition', IndicatorDefinitionList, null, null, {label: 'Indicator definitions', menuCategory:menuCategory}, ChecklistIcon) : nonExistentResource;
};

const state = function (privileges, menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "state", StateList, StateEdit, StateCreate, {label: 'States', menuCategory:menuCategory}, GeoIcon);
};

const district = function (privileges, menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "district", DistrictList, DistrictEdit, DistrictCreate, {label: 'Districts', menuCategory:menuCategory}, GeoIcon);
};

const facility = function (privileges, menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Write', "facility", FacilityList, FacilityEdit, FacilityCreate, {label: 'Facilities', menuCategory:menuCategory}, FacilityIcon);
};

const facilityType = function (privileges, menuCategory) {
    return resourceWithWriteRestrictionOnly(privileges, 'Facility_Metadata_Write', "facilityType", FacilityTypeList, FacilityTypeEdit, FacilityTypeCreate, {label: 'Facility types', menuCategory:menuCategory}, FacilityIcon);
};

const assessment = function (privileges, menuCategory) {
    return resourceWithReadWriteRestriction(privileges, 'Assessment_Read', 'Assessment_Write', 'facilityAssessment', FacilityAssessmentList, FacilityAssessmentEdit, FacilityAssessmentCreate, {label: "Assessments", menuCategory:menuCategory}, AssessmentIcon);
};

const assessmentMissingCheckpoint = function (privileges, menuCategory) {
    return AppConfiguration.isNHSRC() ? resourceRestrictedIfNotPrivileged(privileges, 'Assessment_Write',
        <Resource name="facilityAssessmentMissingCheckpoint" options={{label: 'Missing Checkpoints' , menuCategory:menuCategory}}
                  list={AssessmentMissingCheckpointList} icon={AssessmentIcon} context="route"/>) : nonExistentResource;
};

const checklistProgress = function (privileges, menuCategory) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Assessment_Write', <Resource name="checklistProgress" context="registration" options={{menuCategory:menuCategory}}/>);
};

const user = function (privileges, menuCategory) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Users_Write', <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate}
                                                                                  options={{label: 'Users', menuCategory:menuCategory}} icon={PersonIcon} context="route"/>);
};

const role = function (privileges, menuCategory) {
    return Privileges.hasPrivilege(privileges, 'Users_Write') && <Resource name="role" list={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleList : null}
                                                                           edit={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleEdit : null}
                                                                           create={Privileges.hasPrivilege(privileges, 'Privilege_Write') ? RoleCreate : null}
                                                                           options={{label: 'Roles', menuCategory:menuCategory}}
                                                                           icon={PersonIcon} context="route"/>;
};

const privilege = function (privileges, menuCategory) {
    return resourceRestrictedIfNotPrivileged(privileges, 'Privilege_Write', <Resource name="privilege" options={{label: 'Privileges' , menuCategory:menuCategory}} list={PrivilegeList} create={PrivilegeCreate}
                                                                                      edit={PrivilegeEdit} icon={PersonIcon} context="route"/>);
};


const BASIC_SETUP = "basicSetup";
const CHECKLIST_INDICATOR = "checkListIndicators";
const FACILITIES = "facilities";
const ASSESSMENTS = "assessments";
const USERS = "users";

const App = () =>
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider} appLayout={GunakRALayout}>
        {privileges => [
            assessmentType(privileges,BASIC_SETUP),
            department(privileges,BASIC_SETUP),

            program(privileges,BASIC_SETUP),
            assessmentTool(privileges, ASSESSMENTS),
            checklist(privileges, CHECKLIST_INDICATOR),
            areaOfConcern(privileges, BASIC_SETUP),
            standard(privileges, BASIC_SETUP),
            measurableElement(privileges, BASIC_SETUP),
            checkpoint(privileges, CHECKLIST_INDICATOR),
            indicatorDefinition(privileges, CHECKLIST_INDICATOR),
            state(privileges, BASIC_SETUP),
            district(privileges, BASIC_SETUP),
            facilityType(privileges, FACILITIES),
            facility(privileges, FACILITIES),

            assessment(privileges, ASSESSMENTS),
            assessmentMissingCheckpoint(privileges, CHECKLIST_INDICATOR ),
            checklistProgress(privileges, CHECKLIST_INDICATOR),
            user(privileges, USERS),
            role(privileges, USERS),
            privilege(privileges, USERS),

            userHelp(BASIC_SETUP),
            faq(BASIC_SETUP)
        ]}
    </Admin>;

export default App;
