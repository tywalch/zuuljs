/* jshint indent: 2 */
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device', {
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'deviceId'
    },
    publicDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceId'
    },
    privateDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'privateDeviceId'
    },
    particleDeviceId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleDeviceId'
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceName',
      validate: {
        len: [1,25]
      }
    },
    deviceDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'deviceDescription',
      validate: {
        len: [1,50]
      }
    },
    lastStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'lastStatus'
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
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'dateCreated',
      get: function() {
        return moment(this.getDataValue('dateCreated')).format('YYYY-MM-DD');
      }
    },
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceToken'
    },
    particleDeviceName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleDeviceName'
    }
  }, {
    tableName: 'device'
  });
};
