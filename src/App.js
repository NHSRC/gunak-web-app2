import React from 'react';
import {Admin, ListGuesser, Resource} from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentToolModeEdit, AssessmentToolModeList} from './View/AssessmentToolMode';
import {AssessmentToolList} from './View/AssessmentTool';
import {ChecklistList} from './View/Checklist';
import {AreaOfConcernList} from './View/AreaOfConcern';
import {StandardList} from './View/Standard';
import {MeasurableElementList} from './View/MeasurableElement';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit} options={{ label: 'Programs' }}/>
        <Resource name="assessmentTool" list={AssessmentToolList} options={{ label: 'Assessment Tools' }}/>
        <Resource name="checklist" list={ChecklistList} options={{ label: 'Checklists' }}/>
        <Resource name="areaOfConcern" list={AreaOfConcernList} options={{ label: 'Area of concerns' }}/>
        <Resource name="standard" list={StandardList} options={{ label: 'Standards' }}/>
        <Resource name="measurableElement" list={MeasurableElementList} options={{ label: 'Measurable elements' }}/>
        <Resource name="checkpoint" list={ListGuesser} options={{ label: 'Checkpoints' }}/>
        <Resource name="state" list={ListGuesser} options={{ label: 'States' }}/>
        <Resource name="district" list={ListGuesser} options={{ label: 'Districts' }}/>
        <Resource name="facility" list={ListGuesser} options={{ label: 'Facilities' }}/>
    </Admin>
);

export default App;