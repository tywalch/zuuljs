/* jshint indent: 2 */
var moment = require('moment');
var keyStatus = require('../../../bin/definitions/keydefinitions').keyStatus;
var dateTimeUtil = require('../../../bin/utilities/datetimeutil');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vVerifyKeyTerms', {
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'keyId',
      primaryKey: true
    },
    publicKeyId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicKeyId'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'userId'
    },
    keyCreatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'keyCreatorId'
    },
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'deviceId'
    },
    accessActivationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'accessActivationDate',
      get: function() {
        if (this.getDataValue('accessActivationDate') !== '0000-00-00') {
          return moment(this.getDataValue('accessActivationDate')).format('YYYY-MM-DD');
        }
        return ''
      }
    },
    accessExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'accessExpirationDate',
      get: function() {
        if (this.getDataValue('accessExpirationDate') !== '0000-00-00') {
          return moment(this.getDataValue('accessExpirationDate')).format('YYYY-MM-DD');
        }
        return 'Never'
      }
    },
    accessTimeStart: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'accessTimeStart'
    },
    accessTimeEnd: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'accessTimeEnd'
    },
    lastAccessed: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "0000-00-00 00:00:00",
      field: 'lastAccessed',
      get: function() {
        if (this.getDataValue('lastAccessed')) return moment(this.getDataValue('lastAccessed')).format('MM-DD-YYYY HH:MM');
        else return 'Not Yet Accessed'
      }
    },
    accessFrequency: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'accessFrequency',
      get: function() {
        if (this.getDataValue('accessFrequency') === 0) return 'Infinite';
        else return this.getDataValue('accessFrequency');
      }
    },
    accessFrequencyUnits: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'accessFrequencyUnits'
    },
    keyTimeZone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'keyTimeZone'
    },
    remainingCalls: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'remainingCalls',
      get: function() {
        if (this.getDataValue('remainingCalls') === 'Infinite') return this.getDataValue('remainingCalls');
        else return parseInt(this.getDataValue('remainingCalls'));
      }
    },
    keyActive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'keyActive'
    },
    keyStatus: {
      type: DataTypes.VIRTUAL,
      get: function() {

        if (!this.getDataValue('keyActive')) return keyStatus.expired;

        function validKeyTime(timeDetails) {
          var timeStart = timeDetails.accessTimeStart; //9:00
          var timeEnd = timeDetails.accessTimeEnd; //8:00
          var currentDateTime = dateTimeUtil.getTimeAndDateByTimeZone(timeDetails.keyTimeZone);
          if (timeStart === '00:00:00' && timeEnd === '00:00:00') return true;
          if (timeStart > timeEnd) {
            if (currentDateTime.time > timeStart && currentDateTime.time > timeEnd) return true;
            else if (currentDateTime.time < timeStart && currentDateTime.time < timeEnd) return true;
            return false;
          }
          return (currentDateTime.time > timeStart && currentDateTime.time < timeEnd);
        }

        function validKeyDate(dateDetails) {
          var dateStart = dateDetails.accessActivationDate;
          var dateEnd = dateDetails.accessExpirationDate;
          var currentDateTime = dateTimeUtil.getTimeAndDateByTimeZone(dateDetails.keyTimeZone);
          if (dateStart === '0000-00-00' && dateEnd === '0000-00-00') return true;
          return (currentDateTime.date > dateStart && currentDateTime.date < dateEnd);
        }

        function keyNotYetActive(dateDetails) {
          var dateStart = dateDetails.accessActivationDate;
          var currentDateTime = dateTimeUtil.getTimeAndDateByTimeZone(dateDetails.keyTimeZone);
          return (currentDateTime.date > dateStart)
        }

        var accessExpirationDate = this.getDataValue('accessExpirationDate');
        var accessActivationDate = this.getDataValue('accessActivationDate');
        if (accessExpirationDate !== '0000-00-00') accessExpirationDate = moment(accessExpirationDate).format('YYYY-MM-DD');
        if (accessActivationDate !== '0000-00-00') accessActivationDate = moment(accessActivationDate).format('YYYY-MM-DD');

        var accessDetails = {
          accessTimeStart: this.getDataValue('accessTimeStart'),
          accessTimeEnd: this.getDataValue('accessTimeEnd'),
          accessExpirationDate: accessExpirationDate,
          accessActivationDate: accessActivationDate,
          keyTimeZone: this.getDataValue('keyTimeZone')
        };

        var validDateTime = (validKeyTime(accessDetails) && validKeyDate(accessDetails));
        var validDate = validKeyDate(accessDetails);
        var validTime = validKeyTime(accessDetails);
        var unlimitedUse = (this.getDataValue('remainingCalls') === 'Infinite');
        var validCalls = unlimitedUse ? true: (parseInt(this.getDataValue('remainingCalls')) >= 0);

        if (validDateTime) {
          if (unlimitedUse) return keyStatus.active;
          else if (validCalls) return keyStatus.active;
          return keyStatus.locked
        } else if (validDate) {
          return keyStatus.locked;
        } else if (validTime) {
          if (keyNotYetActive(accessDetails)) return keyStatus.locked;
          else return keyStatus.expired;
        } else return keyStatus.expired;
      }
    }
  }, {
    tableName: 'view_verifykeyterms',
    scopes: {
      byUserAndPublicKeyId: function (details) {
        return {
          where: {
            userId: details.userId,
            publicKeyId: details.publicKeyId
          }
        }
      },
      byDevice: function (details) {
        return {
          where: {
            deviceId: details.deviceId
          }
        }
      }
    }
  });
};
