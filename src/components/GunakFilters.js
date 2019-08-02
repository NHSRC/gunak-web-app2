import RAFilterUtil from "../utils/RAFilterUtil";
import ChecklistConfiguration from "../model/ChecklistConfiguration";

class GunakFilters {
    static createAssessmentToolFilter(currentFilter, dependants) {
        return RAFilterUtil.createFilterItem(currentFilter, "Assessment tool", "assessmentToolId", "assessmentTool", {
            field: 'assessmentToolMode.name',
            order: 'ASC'
        }, "fullName", {}, dependants);
    }

    static createChecklistFilter(currentFilter, props, dependants) {
        return RAFilterUtil.createFilterItem(currentFilter, "Checklist", "checklistId", "checklist", {
            field: 'name',
            order: 'ASC'
        }, ChecklistConfiguration.getDisplayProperty(), {
            assessmentToolId: props.filterValues.assessmentToolId
        }, dependants)
    }

    static createAreaOfConcernFilter(currentFilter, props, dependants) {
        return RAFilterUtil.createFilterItem(currentFilter, "Area of concern", "areaOfConcernId", "areaOfConcern", {
            field: 'reference',
            order: 'ASC'
        }, "referenceAndName", {checklistId: props.filterValues.checklistId, assessmentToolId: props.filterValues.assessmentToolId}, dependants)
    }

    static createStandardFilter(currentFilter, props, dependants = []) {
        return RAFilterUtil.createFilterItem(currentFilter, "Standard", "standardId", "standard", {
            field: 'reference',
            order: 'ASC'
        }, "referenceAndName", {areaOfConcernId: props.filterValues.areaOfConcernId}, dependants);
    }
}

export default GunakFilters;