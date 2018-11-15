import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentToolModeList, AssessmentToolModeEdit} from './View/AssessmentToolMode';
import {AssessmentToolList} from './View/AssessmentTool';
import {ChecklistList} from './View/Checklist';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit} options={{ label: 'Programs' }}/>
        <Resource name="assessmentTool" list={AssessmentToolList} options={{ label: 'Assessment Tools' }}/>
        <Resource name="checklist" list={ChecklistList} options={{ label: 'Checklists' }}/>
        <Resource name="areaOfConcern" list={ListGuesser} options={{ label: 'Area of concerns' }}/>
        <Resource name="standard" list={ListGuesser} options={{ label: 'Standards' }}/>
        <Resource name="measurableElement" list={ListGuesser} options={{ label: 'Measurable elements' }}/>
        <Resource name="checkpoint" list={ListGuesser} options={{ label: 'Checkpoints' }}/>
        <Resource name="state" list={ListGuesser} options={{ label: 'States' }}/>
        <Resource name="district" list={ListGuesser} options={{ label: 'Districts' }}/>
        <Resource name="facility" list={ListGuesser} options={{ label: 'Facilities' }}/>
    </Admin>
);

export default App;