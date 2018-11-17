import React from 'react';
import {Datagrid, EditButton, List, ReferenceField, TextField} from 'react-admin';
import ChildrenField from "../components/ChildrenField";
import {parseUrl} from 'query-string';
import ParentResource from "../framework/ParentResource";
import Parent from "../components/Parent";
import _ from "lodash";

export const MeasurableElementList = props => {
    let parentResource = ParentResource.parse(props.history.location.search);
    return (
        <div>
            {_.isNil(parentResource) ? null : <Parent parentResource={parentResource}/>}
            <List {...props} title='Measurable elements'>
                <Datagrid rowClick="edit">
                    <TextField source="id"/>
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <ChildrenField source="checkpoint" label="Checkpoints" parent="measurableElement" parentDisplayField="name"/>
                    <EditButton/>
                </Datagrid>
            </List>
        </div>
    );
};