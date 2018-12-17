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
    TextInput,
    AutocompleteInput
} from 'react-admin';
import ContextActions from "../components/ContextActions";
import {GunakReferenceInput} from "../components/Inputs";
import ChildrenNameFieldPair from "../components/ChildrenNameFieldPair";

const EntityFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Standard" source="standardId" reference="standard" alwaysOn sort="reference">
            <AutocompleteInput optionText="fullReference"/>
        </ReferenceInput>

    </Filter>
);

export const MeasurableElementList = props => {
    return (
        <div>
            <ContextActions url={props.history.location.search} label="Add Measurable Element" childResource="measurableElement"/>
            <List {...props} title='Measurable elements' filters={<EntityFilter />}>
                <Datagrid rowClick="edit">
                    <TextField source="reference"/>
                    <TextField source="name"/>
                    <ReferenceField label="Standard" source="standardId" reference="standard">
                        <TextField source="reference"/>
                    </ReferenceField>
                    <EditButton/>
                    <BooleanField source="inactive"/>
                    <TextField source="id"/>
                </Datagrid>
            </List>
        </div>
    );
};

export const MeasurableElementCreate = (props) => (
    <Create {...props}>
        {getForm(props, true)}
    </Create>
);

let getForm = function (props, isCreate) {
    return <SimpleForm>
        {isCreate ? <DisabledInput source="id"/> : null}
        <TextInput source="reference"/>
        <TextInput source="name"/>
        <GunakReferenceInput label="Standard" optionText="reference" source="standard"/>
        <BooleanInput source="inactive"/>
        <ChildrenNameFieldPair source="checkpoint" label="Checkpoints" parent="measurableElement" parentDisplayField="name" history={props.history}/>
    </SimpleForm>;
};
export const MeasurableElementEdit = props => (
    <Edit {...props}>
        {getForm(props, false)}
    </Edit>
);