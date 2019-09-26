import {assert} from 'chai';
import ErrorResponse from "./ErrorResponse";

describe('ErrorResponse.test.js', () => {
    it('spring admin error message for data integrity violation', () => {
        let springAdminError = ErrorResponse.toSpringAdminError({body: {errorMessage: "blah...DataIntegrityViolationException...blah"}}, "assessmentType");
        assert.equal(springAdminError.message, ErrorResponse.EntityInuseMessage("assessmentType"));
    });

    it('spring admin error message for 404', function () {
        let springAdminError = ErrorResponse.toSpringAdminError({body: null, status: 404, name: "Error"}, "assessmentType");
        assert.equal(springAdminError.message, ErrorResponse.EntityNotFoundMessage("assessmentType"));
    });

    it('should convert to sentence case', function () {
        assert.equal(ErrorResponse.sentence("assessmentType"), "assessment type");
        assert.equal(ErrorResponse.sentence("facility"), "facility");
    });
});