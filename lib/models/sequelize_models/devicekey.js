/* jshint indent: 2 */
var moment = require('moment');
var keyDefinitions = require('../../../bin/definitions/keydefinitions');
var timezones = require('../../../bin/definitions/timezones');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devicekey', {
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'keyId'
    },
    publicKeyId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicKeyId'
    },
    privateKeyId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'privateKeyId'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'userId'
      },
      field: 'userId'
    },
    creatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      },
      field: 'creatorId'
    },
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'device',
        key: 'deviceId'
      },
      field: 'deviceId'
    },
    keyToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'keyToken'
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'dateCreated',
      get: function() {
        return moment(this.getDataValue('dateCreated')).format('YYYY-MM-DD');
      }
    },
    dateRegistered: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dateRegistered',
      get: function() {
        return moment(this.getDataValue('dateRegistered')).format('YYYY-MM-DD');
      }
    },
    accessActivationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'accessActivationDate',
      get: function() {
        if (this.getDataValue('accessActivationDate')) {
          return moment(this.getDataValue('accessActivationDate')).format('YYYY-MM-DD');
        }
      }
    },
    accessExpirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'accessExpirationDate',
      get: function() {
        if (this.getDataValue('accessExpirationDate')) {
          return moment(this.getDataValue('accessExpirationDate')).format('YYYY-MM-DD');
        }
      }
    },
    accessFrequency: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'accessFrequency',
      set: function(data) {
        if (data) data = parseInt(data);
        this.setDataValue('accessFrequency', data)
      }
    },
    accessFrequencyUnits: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'accessFrequencyUnits',
      validate: {
        isIn: [keyDefinitions.keyFrequencyTypes]
      }
    },
    accessType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'accessType'
    },
    accessTimeStart: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'accessTimeStart',
    },
    accessTimeEnd: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'accessTimeEnd',
    },
    keyActive: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "1",
      field: 'keyActive'
    },
    keyTimeZone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'keyTimeZone',
      validate: {
        isIn: [timezones.timezoneUSPreference]
      }
    }
  }, {
    tableName: 'devicekey',
    scopes: {
      byUser: function (value) {
        return {
          where: {
            userId: value.userId
          }
        }
      }
    }
  });
};
