import _ from "lodash";

class ErrorResponse {
    static EntityInuseMessage(resource) {
        return `Cannot delete ${this.sentence(resource)} because it is used by another entity.`;
    }

    static EntityNotFoundMessage(resource) {
        return `Could not find such ${this.sentence(resource)}`;
    }

    static sentence(resource) {
        return _.join(_.words(resource), ' ').toLowerCase();
    }

    static toSpringAdminError(error, resource) {
        let springAdminError = {status: error.status};
        if (error.status === 404) {
            springAdminError.message = this.EntityNotFoundMessage(resource);
        } else if (!_.isNil(error.body) && !_.isNil(error.body.errorMessage) && error.body.errorMessage.includes("DataIntegrityViolationException")) {
            springAdminError.message = ErrorResponse.EntityInuseMessage(resource);
        } else {
            springAdminError.message = error.message;
        }
        return springAdminError;
    }
}

export default ErrorResponse;