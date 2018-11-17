import React from 'react';
import {Datagrid, EditButton, List, ReferenceField, TextField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";

export const StandardList = props => (
    <List {...props} title='Standards'>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="reference" />
            <TextField source="name" />
            <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern">
                <TextField source="reference" />
            </ReferenceField>
            <ChildrenField source="measurableElement" label="Measurable Elements" parent="standard"/>
            <EditButton />
        </Datagrid>
    </List>
);