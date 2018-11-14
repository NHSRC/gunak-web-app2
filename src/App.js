import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentToolModeList, AssessmentToolModeEdit} from './View/AssessmentToolMode';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit}/>
        <Resource name="assessmentTool" list={ListGuesser} />
        <Resource name="checklist" list={ListGuesser} />
        <Resource name="areaOfConcern" list={ListGuesser} />
        <Resource name="standard" list={ListGuesser} />
        <Resource name="measurableElement" list={ListGuesser} />
        <Resource name="checkpoint" list={ListGuesser} />
        <Resource name="state" list={ListGuesser} />
        <Resource name="district" list={ListGuesser} />
        <Resource name="facility" list={ListGuesser} />
    </Admin>
);

export default App;