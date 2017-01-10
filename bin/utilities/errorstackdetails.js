function getErrorStackDetails() {
    var errorStackDetails = {};

    Object.defineProperty(errorStackDetails, '__stackDetails', {
        get: function () {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function (_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });

    Object.defineProperty(errorStackDetails, '__parentInvocationFunction', {
        get: function() {
            return errorStackDetails.__stackDetails[4].getFunctionName();
        }
    });

    Object.defineProperty(errorStackDetails, '__parentLine', {
        get: function() {
            return errorStackDetails.__stackDetails[3].getLineNumber();
        }
    });

    Object.defineProperty(errorStackDetails, '__parentFunction', {
        get: function() {
            return errorStackDetails.__stackDetails[3].getFunctionName();
        }
    });

    function __getCallerFile() {
        try {
            var err = new Error();
            var callerFile;
            var currentFile;

            Error.prepareStackTrace = function (err, stack) { return stack; };
            currentFile = err.stack.shift().getFileName();

            while (err.stack.length) {
                callerFile = err.stack.shift().getFileName();

                if(currentFile !== callerFile) {
                    callerFile = err.stack.shift().getFileName();
                    var callerParts = callerFile.split('/');
                    var fileName = callerParts[(callerParts.length - 1)];

                    return fileName;
                }
            }
        } catch (err) {}
        return undefined;
    }

    errorStackDetails.problemModule = __getCallerFile();
    //errorStackDetails.methodInvocationFunction = errorStackDetails.__parentInvocationFunction;
    //errorStackDetails.problemFunction = errorStackDetails.__parentFunction;
    errorStackDetails.problemLine = errorStackDetails.__parentLine;
    
    return errorStackDetails;
}

module.exports = {
    getErrorStackDetails: getErrorStackDetails
};