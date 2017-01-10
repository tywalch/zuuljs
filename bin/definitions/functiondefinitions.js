//var functionType = ['Analog', 'Switch', 'Invocation', 'Numeric Value', 'String Value'];

var functionType = [
        {displayName: 'Digital/Switch', saveName: 'switch'},
        {displayName: 'Invocation', saveName: 'invocation'},
        {displayName: 'Numeric Value', saveName: 'numeric'},
        {displayName: 'String', saveName: 'string'}
    ];

var functionSaveTypes = ['switch', 'invocation', 'numeric', 'string'];

module.exports = {
    functionType: functionType,
    functionSaveTypes: functionSaveTypes
};