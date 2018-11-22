import React from 'react';
import {Admin, ListGuesser, Resource} from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentTypeEdit, AssessmentTypeList} from './View/AssessmentType';
import {DepartmentCreate, DepartmentEdit, DepartmentList} from './View/Department';
import {AssessmentToolModeEdit, AssessmentToolModeList} from './View/AssessmentToolMode';
import {AssessmentToolEdit, AssessmentToolList} from './View/AssessmentTool';
import {ChecklistCreate, ChecklistEdit, ChecklistList} from './View/Checklist';
import {AreaOfConcernList} from './View/AreaOfConcern';
import {StandardList} from './View/Standard';
import {MeasurableElementList} from './View/MeasurableElement';
import {IndicatorDefinitionList} from './View/IndicatorDefinition';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentType" list={AssessmentTypeList} edit={AssessmentTypeEdit} options={{ label: 'Programs' }}/>
        <Resource name="department" list={DepartmentList} edit={DepartmentEdit} create={DepartmentCreate} options={{ label: 'Departments' }}/>

        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit} options={{ label: 'Programs' }}/>
        <Resource name="assessmentTool" list={AssessmentToolList} edit={AssessmentToolEdit} options={{ label: 'Assessment Tools' }}/>
        <Resource name="checklist" list={ChecklistList} edit={ChecklistEdit} create={ChecklistCreate} options={{ label: 'Checklists' }}/>
        <Resource name="areaOfConcern" list={AreaOfConcernList} options={{ label: 'Area of concerns' }}/>
        <Resource name="standard" list={StandardList} options={{ label: 'Standards' }}/>
        <Resource name="measurableElement" list={MeasurableElementList} options={{ label: 'Measurable elements' }}/>
        <Resource name="checkpoint" list={ListGuesser} options={{ label: 'Checkpoints' }}/>

        <Resource name="indicatorDefinition" list={IndicatorDefinitionList} options={{ label: 'Indicator definitions' }}/>

        <Resource name="state" list={ListGuesser} options={{ label: 'States' }}/>
        <Resource name="district" list={ListGuesser} options={{ label: 'Districts' }}/>
        <Resource name="facility" list={ListGuesser} options={{ label: 'Facilities' }}/>
        <Resource name="facilityType" list={ListGuesser} options={{ label: 'Facility types' }}/>

        {/*Include device*/}
        <Resource name="facilityAssessment" list={ListGuesser} options={{ label: 'Programs' }}/>
        <Resource name="checkpointScore" list={ListGuesser} options={{ label: 'Programs' }}/>
        <Resource name="indicator" list={ListGuesser} options={{ label: 'Indicators' }}/>

        <Resource name="user" list={ListGuesser} options={{ label: 'Users' }}/>
    </Admin>
);

export default App;