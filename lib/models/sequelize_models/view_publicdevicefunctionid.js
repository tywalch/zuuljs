/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vPublicDeviceFunctionId', {
    deviceFunctionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'deviceFunctionId',
      primaryKey: true
    },
    publicDeviceFunctionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceFunctionId'
    }
  }, {
    tableName: 'view_publicdevicefunctionid',
    scopes: {
      byPublicDeviceFunctionId: function (details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId
          }
        }
      }
    }
  });
};
