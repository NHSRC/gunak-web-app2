import RestClient from "../framework/RestClient";

class AssessmentService {
    static submitNew(assessmentToolUuid, checklistUuid, assessmentTypeUuid, facilityUuid, facilityName, assessmentFile) {
        return RestClient.postMultipart("facility-assessment/excel/new", {assessmentFile: assessmentFile}, {
            assessmentToolUuid: assessmentToolUuid,
            assessmentTypeUuid: assessmentTypeUuid,
            checklistUuid: checklistUuid,
            facilityUuid: facilityUuid,
            nonExistentFacilityName: facilityName
        });
    }

    static submitExisting(facilityAssessmentUuid, assessmentFile) {
        return RestClient.postMultipart("facility-assessment/excel/update", {assessmentFile: assessmentFile}, {
            facilityAssessmentUuid: facilityAssessmentUuid
        });
    }
}

export default AssessmentService;