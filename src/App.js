import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';
import {AssessmentToolModeList, AssessmentToolModeEdit} from './View/AssessmentToolMode';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentToolMode" list={AssessmentToolModeList} edit={AssessmentToolModeEdit}/>
        <Resource name="assessmentTool" list={ListGuesser} />
    </Admin>
);

export default App;