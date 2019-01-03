import _ from "lodash";

class GetCurrentUserResponse {
    static failed() {
        let getCurrentUserResponse = new GetCurrentUserResponse();
        getCurrentUserResponse.success = false;
        return getCurrentUserResponse;
    }

    static success(user) {
        let getCurrentUserResponse = new GetCurrentUserResponse();
        getCurrentUserResponse.success = true;
        getCurrentUserResponse.user = user;
        return getCurrentUserResponse;
    }
}

export default GetCurrentUserResponse;