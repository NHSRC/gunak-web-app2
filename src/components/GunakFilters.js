import React from 'react';
import RAFilterUtil from "../utils/RAFilterUtil";
import ChecklistConfiguration from "../model/ChecklistConfiguration";
import AppConfiguration from "../framework/AppConfiguration";
import {GunakReferenceInput} from "./Inputs";
import {FormDataConsumer} from 'react-admin';

class GunakFilters {
    static AssessmentTool(currentFilter, dependants) {
        return RAFilterUtil.createFilterItem(currentFilter, "Assessment tool", "assessmentToolId", "assessmentTool", {
            field: 'assessmentToolMode.name',
            order: 'ASC'
        }, "fullName", {}, dependants);
    }

    static Checklist(currentFilter, props, dependants) {
        let filter = AppConfiguration.isJSS() && props.filterValues.stateId ? {
            assessmentToolId: props.filterValues.assessmentToolId,
            stateId: props.filterValues.stateId
        } : {
            assessmentToolId: props.filterValues.assessmentToolId
        };
        return RAFilterUtil.createFilterItem(currentFilter, "Checklist", "checklistId", "checklist", {
            field: 'name',
            order: 'ASC'
        }, ChecklistConfiguration.getDisplayProperty(), filter, dependants)
    }

    static AreaOfConcern(currentFilter, props, dependants) {
        return RAFilterUtil.createFilterItem(currentFilter, "Area of concern", "areaOfConcernId", "areaOfConcern", {
            field: 'reference',
            order: 'ASC'
        }, "referenceAndName", {checklistId: props.filterValues.checklistId, assessmentToolId: props.filterValues.assessmentToolId}, dependants)
    }

    static Standard(currentFilter, props, dependants = []) {
        return RAFilterUtil.createFilterItem(currentFilter, "Standard", "standardId", "standard", {
            field: 'reference',
            order: 'ASC'
        }, "referenceAndName", {areaOfConcernId: props.filterValues.areaOfConcernId}, dependants);
    }

    static AreaOfConcernForm() {
        return <FormDataConsumer>
            {({formData}) =>
                <GunakReferenceInput label="Area of concern" optionText="fullyQualifiedName" source="areaOfConcern" perPage={100} sort={{field: 'id', order: 'ASC'}} autoComplete={false}/>
            }
        </FormDataConsumer>
    }
}

export default GunakFilters;