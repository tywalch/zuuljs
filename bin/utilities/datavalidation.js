/**
 * Created by tylerwalch on 10/26/16.
 */
var regExp = require('../definitions/regexp');

var getValueType = (function(value, fieldType) {
    var valueType = Object.prototype.toString.call(value);
    valueType = valueType.split(' ')[1];
    valueType = valueType.split(']')[0];
    valueType = valueType.toLowerCase();
    if (valueType === 'string' && fieldType === 'string') return 'string';
    else if (valueType === 'array') return 'array';
    else if (valueType === 'regexp') return 'regexp';
    else if (valueType === 'string' && verifyTime(value) && fieldType === 'time') return 'time';
    else if (valueType === 'string' && verifyDate(value) && fieldType === 'date') return 'date';
    else if (valueType === 'string' && verifyNumber(value) && fieldType === 'number') return 'number';
    else return null;
});

var formatTime = function formatTime(unformattedTime) {
    var regex = /[a]/gi;
    var sansAMPM = unformattedTime.split(' ')[0];
    var hoursAndMinutes = sansAMPM.split(':');

    if (unformattedTime.match(regex) && hoursAndMinutes[0] === '12') hoursAndMinutes[0] = '0';
    else if (!unformattedTime.match(regex)) hoursAndMinutes[0] = parseInt(hoursAndMinutes[0]) + 12;

    var formattedTime = hoursAndMinutes.join(":");
    return formattedTime;

};

var formatDate = function formatDate(unformattedDate) {
    unformattedDate = unformattedDate.split("/");
    var formattedDate = '';
    if (unformattedDate.length > 11) formattedDate = unformattedDate[0] + '/' + unformattedDate[1] + '/' + unformattedDate[2];
    else formattedDate = unformattedDate[2] + '/' + unformattedDate[0] + '/' + unformattedDate[1];
    return formattedDate;
};

var formatText = function formatText(unformattedText) {
    var formattedText = unformattedText.replace(regExp.textRegex, '');
    return formattedText;
};

var formatNumber = function formatText(unformattedNumber) {
    var formattedNumber = unformattedNumber.replace(regExp.numberRegex, '');
    return formattedNumber;
};

var formatArray = function formatArray(unformattedArray) {
    var len = unformattedArray.length;

    var formattedArray = [];

    for (var i = 0; i < len; i++) {
        var formattedValue = formatText(unformattedArray[i]);
        if (formattedValue !== '') formattedArray.push(formattedValue);
    }
    return formattedArray;
};

var verifyTime = (function verifyTime(timeValue) {
    return (regExp.timeRegex.test(timeValue) && 0 <= (timeValue.split(':'))[0] && (timeValue.split(':'))[0] <= 12)
});

var verifyDate = (function verifyDate(dateValue) {
    return (regExp.dateRegex.test(dateValue) || regExp.sqlDateRegex.test(dateValue));
});

var verifyText = (function verifyText(textValue) {
    return !regExp.textRegex.test(textValue);
});

var verifyNumber = (function verifyNumber(numberValue) {
    return !regExp.numberRegex.test(numberValue);
});

var validateRegEx = (function validateRegEx(valueDetails) {
    var value = valueDetails.value;
    var valueType = valueDetails.valueType;
    var regEx = valueDetails.acceptableValues;

    if (valueType !== 'array' && regEx.test(value)) return value;
    else if (valueType !== 'array' && !regEx.test(value)) return null;

    var len = valueDetails.value.length;
    for (var i = 0; i < len; i++) {
        var validatedElement = regEx.test(value[i]);

        if (validatedElement === false) {
            return null;
        }
    }
    return value;
});

var verifyArray = (function verifyArray(valueDetails) {
    if (valueDetails.valueType !== 'array') valueDetails.value = [valueDetails.value];

    var len = valueDetails.value.length;

    for (var i = 0; i < len; i++) {
        var validatedElement = valueDetails.validate(valueDetails.value[i], 'string', true);

        if (validatedElement === null) {
            return false;
        }
    }
    return true;
});

var compareArrayValues = (function (referenceArray, valueDetails) {
    var arrayValue = valueDetails.formattedValue;
    var arrayValueType = valueDetails.valueType;

     if (arrayValueType !== 'array') arrayValue = [arrayValue];
     //else if (arrayValueType !== 'array') return null;

     var len = referenceArray.length;
     var similarValues = [];

     for (var i = 0; i < len; i++) {
        if (referenceArray.indexOf(arrayValue[i]) !== -1) {
            similarValues.push(arrayValue[i]);
        }
     }

    if (similarValues.length === 0) return null;
});

var verifyType = (function(valueDetails) {
        // Valid String
        if (valueDetails.valueType === 'string' && valueDetails.fieldType === 'string') return valueDetails;
        // Valid Date
        else if (valueDetails.valueType === 'date' && valueDetails.fieldType === 'date') return valueDetails;
        // Valid Time
        else if (valueDetails.valueType === 'time' && valueDetails.valueType === 'time') return valueDetails;
        // Valid Array
        else if (valueDetails.valueType === 'array' && valueDetails.fieldType === 'array') return valueDetails;
        // Valid Number
        else if (valueDetails.valueType === 'number' && valueDetails.fieldType === 'number') return valueDetails;
        else return null;
});

var formatValueDetails = (function(valueDetails) {
        var verified;

        // Strings
        if (valueDetails.valueType === 'string') {
            verified = verifyText(valueDetails.value);
            if (verified) valueDetails.formattedValue = valueDetails.value;
            else if (!verified && !valueDetails.strictMatch) valueDetails.formattedValue = formatText(valueDetails.value);
            else if (!verified && valueDetails.strictMatch) return null;
        }

        // Times
        else if (valueDetails.valueType === 'time') valueDetails.formattedValue = formatTime(valueDetails.value);

        // Dates
        else if (valueDetails.valueType === 'date') valueDetails.formattedValue = formatDate(valueDetails.value);

        // Numbers
        else if (valueDetails.valueType === 'number') valueDetails.formattedValue = parseInt(valueDetails.value);

        // Arrays
        else if (valueDetails.valueType === 'array') {
            verified = verifyArray(valueDetails);
            if (verified) valueDetails.formattedValue = valueDetails.value;
            else if (!verified && !valueDetails.strictMatch) valueDetails.formattedValue = formatArray(valueDetails.value);
            else if (!verified && valueDetails.strictMatch) return null;

        }
        else return null;
        return valueDetails;
});


var verifyAcceptableValues = (function(valueDetails) {
        if (valueDetails.acceptableValues !== null) {
            valueDetails.acceptedValues = compareArrayValues(valueDetails.acceptableValues, valueDetails);
        }

        if (valueDetails.forbiddenValues !== null) {
            valueDetails.rejectedValues = compareArrayValues(valueDetails.forbiddenValues,valueDetails);
        }

        if (valueDetails.acceptableValues !== null && valueDetails.acceptedValues === null && valueDetails.strictMatch) {
            return null;
        }
        else if (valueDetails.forbiddenValues !== null && valueDetails.rejectedValues !== null) {
            return null;
        }
        else {
            valueDetails.finalValue = valueDetails.formattedValue;
            return valueDetails;
        }
});

var newField = {
    // newField.create( <true|false>, <'string'|'number'|'array'|'date'|'time'|>, [''|false|array|string], [''|true|false], [''|false|array|string] )
    create: function create(requiredField, fieldType, acceptableValues, strictMatch, forbiddenValues) {
        var instance = Object.create(this);
        instance.requiredField = requiredField;
        instance.fieldType = fieldType;

        var acceptableValuesType = getValueType(acceptableValues);
        if (acceptableValues && (acceptableValuesType === 'regexp' || acceptableValuesType === 'array')) instance.acceptableValues = acceptableValues;
        else if (acceptableValues && acceptableValuesType === 'string') instance.acceptableValues = [acceptableValues];
        else instance.acceptableValues = null;

        if (strictMatch === null || strictMatch === '') instance.strictMatch = false;
        else instance.strictMatch = strictMatch;

        var forbiddenValuesType = getValueType(forbiddenValues);
        if (forbiddenValues && forbiddenValuesType === 'array') instance.forbiddenValues = forbiddenValues;
        else if (forbiddenValues && forbiddenValuesType === 'string') instance.forbiddenValues = [forbiddenValues];
        else instance.forbiddenValues = null;
        return instance;
    },
    validate: function validate(value, typeOverride, strictOverride) {
        var valueDetails = {
            'value': value,
            'fieldType': this.fieldType,
            'acceptableValues': this.acceptableValues,
            'forbiddenValues': this.forbiddenValues,
            'strictMatch': this.strictMatch,
            'requiredField': this.requiredField,
            'valueType': getValueType(value, this.fieldType),
            validate: this.validate
        };

        if (valueDetails.fieldType === 'regexp') {
            return validateRegEx(valueDetails);
        }

        if (typeOverride) {
            valueDetails.fieldType = typeOverride;
            valueDetails.valueType = typeOverride;
        }

        if (strictOverride) {
            valueDetails.strictMatch = strictOverride;
        }


        if (valueDetails.valueType === null) return null;

        if (!valueDetails.requiredField && (!valueDetails.value || valueDetails.value.length === 0)) return '';
        else if (valueDetails.requiredField && (!valueDetails.value || valueDetails.value.length === 0)) return null;

        var verifiedType = verifyType(valueDetails);
        if (verifiedType === null) return null;

        var formatedValue = formatValueDetails(verifiedType);
        if (formatedValue === null) return null;

        var verifiedValues = verifyAcceptableValues(formatedValue);
        if (verifiedValues === null) return null;

        return verifiedValues.finalValue;
    }
};

var nameMatch = (function(value1, value2) {
    var regex = /[\s]/g;
    value1 = (value1.toLowerCase()).replace(regex, "");
    value2 = (value2.toLowerCase()).replace(regex, "");
    return value1 === value2;
});


module.exports = {
    verifyTime: verifyTime,
    verifyDate: verifyDate,
    verifyText: verifyText,
    verifyNumber: verifyNumber,
    nameMatch: nameMatch,
    newField: newField
};
