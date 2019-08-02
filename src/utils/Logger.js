class Logger {
    static log(message, ...otherArgs) {
        console.log(message, ...otherArgs);
        return true;
    }
}

export default Logger;