import React from 'react';
import ChildrenField from "../components/ChildrenField";
import {Datagrid, DisabledInput, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceField, Create, ReferenceInput, SelectInput, required, BooleanField, LongTextInput, BooleanInput, NumberInput, NumberField} from 'react-admin';

export const FacilityTypeList = props => (
    <List {...props} title='FacilityTypes'>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
        </Datagrid>
    </List>
);