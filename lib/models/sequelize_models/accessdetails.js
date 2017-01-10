/* jshint indent: 2 */
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accessdetails', {
    accessId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'accessId',
      primaryKey: true
    },
    publicDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceId'
    },
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'deviceId'
    },
    accessedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'accessedBy'
    },
    accessDate: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      field: 'accessDate',
      get: function() {
        return moment(this.getDataValue('accessDate')).format('YYYY-MM-DD');
      }
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ipAddress'
    },
    requestState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'requestState'
    },
    accessSuccess: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'accessSuccess'
    },
    responseState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'responseState'
    },
    deviceCreatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'deviceCreatorId'
    },
    deviceUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'deviceUserId'
    },
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'functionName'
    },
    keyId: {
    type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'functionName'
    }
  }, {
    tableName: 'view_accessdetails',
    scopes: {
      byOwnerAndPublicDeviceId: function (details) {
        return {
          where: {
            $or: {
              deviceCreatorId: details.userId,
              deviceUserId: details.userId
            },
            publicDeviceId: details.publicDeviceId
          }
        }
      }
    }
  });
};
