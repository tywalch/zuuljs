var textRegex = /[^\w\s]/i;
var timeRegex = /^([1-9]|10|11|12):([0-5])([0-9])\s(am|pm|AM|PM)+$/i;
var dateRegex = /^([0-1])([0-2])\/([0-3])([0-9])\/(20)(\d{2})$/i;
var sqlDateRegex = /^(20)(\d{2})-([0-1])([0-2])-([0-3])([0-9])\s(00)\:(00)\:(00)$/i;
var numberRegex = /[\D]/i;

module.exports = {
    textRegex: textRegex,
    timeRegex: timeRegex,
    dateRegex: dateRegex,
    sqlDateRegex: sqlDateRegex,
    numberRegex: numberRegex
};