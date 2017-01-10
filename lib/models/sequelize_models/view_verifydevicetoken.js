/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vVerifyDeviceToken', {
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'deviceId',
      primaryKey: true
    },
    publicDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceId'
    },
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceToken'
    }
  }, {
    tableName: 'view_verifydevicetoken',
    scopes: {
      byToken: function (token) {
        return {
          where: {
            deviceToken: token
          }
        }
      }
    }
  });
};
