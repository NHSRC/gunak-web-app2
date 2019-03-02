import _ from "lodash";

class Privileges {
    static hasPrivilege(privileges, privilege) {
        return _.some(privileges, (x) => x.name === privilege);
    }
}

export default Privileges;