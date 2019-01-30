class AppConfiguration {
    static isJSS() {
        return process.env.REACT_APP_TENANT === "JSS";
    }

    static isNHSRC() {
        return process.env.REACT_APP_TENANT === "NHSRC";
    }
}

export default AppConfiguration;