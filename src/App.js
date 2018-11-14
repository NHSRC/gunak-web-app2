import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './framework/gunak-data-provider';
import authProvider from './framework/auth-provider';

const App = () => (
    <Admin dataProvider={dataProvider('/api')} authProvider={authProvider}>
        <Resource name="assessmentToolMode" list={ListGuesser} />
        <Resource name="assessmentTool" list={ListGuesser} />
    </Admin>
);

export default App;