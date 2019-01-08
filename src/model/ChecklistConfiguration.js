import AppConfiguration from "../framework/AppConfiguration";

class ChecklistConfiguration {
    static getDisplayProperty() {
        return AppConfiguration.isNHSRC() ? "name" : "fullName";
    };
}

export default ChecklistConfiguration;