import React from 'react';
import {Datagrid, EditButton, List, ReferenceField, TextField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {parseUrl} from 'query-string';
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import _ from "lodash";

export const CheckpointList = props => {
    let parentResource = ParentResource.parse(props.history.location.search);
    return (
        <div>
            {_.isNil(parentResource) ? null : <Parent parentResource={parentResource}/>}
            <List {...props} title='Checkpoints'>
                <Datagrid rowClick="edit">
                    <TextField source="id"/>
                    <TextField source="name"/>
                    <TextField source="meansOfVerification"/>
                    <TextField source="assessmentMethodObservation"/>
                    <TextField source="assessmentMethodStaffInterview"/>
                    <TextField source="assessmentMethodPatientInterview"/>
                    <TextField source="assessmentMethodRecordReview"/>
                    <ReferenceField label="Checklist" source="checklistId" reference="checklist">
                        <TextField source="name"/>
                    </ReferenceField>
                    <EditButton/>
                </Datagrid>
            </List>
        </div>
    );
};