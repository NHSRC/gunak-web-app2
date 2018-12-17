import React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {GunakReferenceInput} from "../components/Inputs";
import ContextActions from "../components/ContextActions";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Area of concern" source="areaOfConcernId" reference="areaOfConcern" alwaysOn sort="reference">
            <TextInput optionText="fullReference"/>
        </ReferenceInput>
    </Filter>
);

export const StandardList = props => (
    <div>
        <ContextActions url={props.history.location.search} label="Add Standard" childResource="standard"/>
        <List {...props} title='Standards' perPage={25} filters={<EntityFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="reference" />
            <TextField source="name" />
            <ReferenceField label="Area of concern" source="areaOfConcernId" reference="areaOfConcern">
                <TextField source="reference" />
            </ReferenceField>
            <EditButton />
            <BooleanField source="inactive"/>
            <TextField source="id" />
        </Datagrid>
    </List></div>
);

export const StandardCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? <DisabledInput source="id"/> : null}
        <TextInput source="reference"/>
        <TextInput source="name"/>
        <GunakReferenceInput label="Area of concern" optionText="reference" source="areaOfConcern"/>
        <BooleanInput source="inactive"/>
        <ChildrenNameFieldPair source="measurableElement" label="Measurable Elements" parent="standard" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};

export const StandardEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);