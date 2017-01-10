var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('access', {
    accessId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'accessId'
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      },
      field: 'userId'
    },
    accessDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'accessDate',
      get: function() {
        return moment(this.getDataValue('accessDate')).format('YYYY/MM/DD');
      }
    },
    requestState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'requestState'
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ipAddress'
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
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'userAgent'
    },
    deviceFunctionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'devicefunction',
        key: 'deviceFunctionId'
      },
      field: 'deviceFunctionId'
    },
    keyId: {
    type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'devicekey',
        key: 'deviceKeyId'
      },
      field: 'keyId'
    }
  }, {
    tableName: 'access'
  });
};
