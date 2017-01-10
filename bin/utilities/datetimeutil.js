var moment = require('moment-timezone');
var regExpDefinitions = require('../definitions/regexp');

var getTimeAndDateByTimeZone = (function getTimeAndDateByTimeZone(timeZone) {
    var current = moment();
    var dateTime = current.tz(timeZone).format('YYYY-MM-DD HH:MM:ss');
    var date = current.tz(timeZone).format('YYYY-MM-DD');
    var time = current.tz(timeZone).format('HH:MM:ss');
    return {
        date: date,
        time: time,
        dateTime: dateTime
    }
});

var dateDisplayFormat = (function dateDisplayFormat(date) {
    return date.substring(0,10);
});

var timeDisplayFormat = (function dateDisplayFormat(time) {
    time = time.split(":");
    if (time[0] > 12) {
        time[0] = time[0] - 12;
        time[3] = "pm"
    } else {
        time[3] = "am"
    }
    var newTime = time[0] + ":" + time[1] + " " + time[3];
    if (newTime[0] == "0") return newTime.substr(1,8);
    return newTime;
});

var timeDatabaseFormat = (function dateDisplayFormat(time) {
    var regex = /[aA]/gi;
    if (time.match(regex)) {
        time = time.split(' ');
        return time[0];
    } else {
        time = time.split(":");
        time[0] = parseInt(time[0]) + 12;
        time = time.join(":");
        time = time.split(' ');
        return time[0];
    }
});



/*
getTzIds().then(function tzId(ids) {
    //console.log("var timezone = {");
    for (var idName in ids) {
        var tz = ids[idName];

        //console.log("'"+tz+"': "+"'"+tz+"', ");

        var now = new time.Date();
        now.setTimezone(tz);
        var azDate = new time.Date(2010, 0, 1, 'America/Phoenix');
        console.log(azDate);
    }
    //console.log("}");
});
*/

module.exports = {
    getTimeAndDateByTimeZone: getTimeAndDateByTimeZone,
    dateDisplayFormat: dateDisplayFormat,
    timeDisplayFormat: timeDisplayFormat,
    timeDatabaseFormat: timeDatabaseFormat
};