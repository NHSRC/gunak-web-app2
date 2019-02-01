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

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentType" list={AssessmentTypeList} edit={AssessmentTypeEdit} options={{label: 'Assessment Types'}} create={AssessmentTypeCreate}/>
        <Resource name="department" list={DepartmentList} edit={DepartmentEdit} create={DepartmentCreate} options={{label: 'Departments'}}/>

        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit} create={AssessmentToolModeCreate} options={{label: 'Programs'}}/>
        <Resource name="assessmentTool" list={AssessmentToolList} edit={AssessmentToolEdit} create={AssessmentToolCreate} options={{label: 'Assessment Tools'}}/>
        <Resource name="checklist" list={ChecklistList} edit={ChecklistEdit} create={ChecklistCreate} options={{label: 'Checklists'}}/>
        <Resource name="areaOfConcern" list={AreaOfConcernList} edit={AreaOfConcernEdit} create={AreaOfConcernCreate} options={{label: 'Area of concerns'}}/>
        <Resource name="standard" list={StandardList} create={StandardCreate} edit={StandardEdit} options={{label: 'Standards'}}/>
        <Resource name="measurableElement" list={MeasurableElementList} create={MeasurableElementCreate} edit={MeasurableElementEdit}
                  options={{label: 'Measurable elements'}}/>
        <Resource name="checkpoint" list={CheckpointList} edit={CheckpointEdit} create={CheckpointCreate} options={{label: 'Checkpoints'}}/>

        {AppConfiguration.isNHSRC() ? <Resource name="indicatorDefinition" list={IndicatorDefinitionList} options={{label: 'Indicator definitions'}}/> : <Resource/>}

        <Resource name="state" list={StateList} create={StateCreate} edit={StateEdit} options={{label: 'States'}}/>
        <Resource name="district" list={DistrictList} create={DistrictCreate} edit={DistrictEdit} options={{label: 'Districts'}}/>
        <Resource name="`y" list={FacilityList} create={FacilityCreate} edit={FacilityEdit} options={{label: 'Facilities'}}/>
        <Resource name="facilityType" list={FacilityTypeList} options={{label: 'Facility types'}} create={FacilityTypeCreate} edit={FacilityTypeEdit}/>

        {/*Include device*/}
        <Resource name="facilityAssessment" list={FacilityAssessmentList} options={{label: 'Assessments'}} create={FacilityAssessmentCreate} edit={FacilityAssessmentEdit}/>
        {/*<Resource name="checkpointScore" list={ListGuesser} options={{label: 'Scores'}}/>*/}
        {/*<Resource name="indicator" list={ListGuesser} options={{label: 'Indicators'}}/>*/}
        <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} options={{label: 'Users'}}/>
    </Admin>
);

export default App;