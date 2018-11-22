import React from 'react';
import {Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput, ReferenceField} from 'react-admin';

export const IndicatorDefinitionList = props => (
    <List {...props} title='Indicator definitions'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="dataType" />
            <ReferenceField label="Program" source="assessmentToolId" reference="assessmentTool">
                <TextField source="reference"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export const IndicatorDefinitionEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="shortName" />
        </SimpleForm>
    </Edit>
);