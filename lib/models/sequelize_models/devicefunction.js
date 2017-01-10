/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devicefunction', {
    deviceFunctionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'deviceFunctionId'
    },
    publicDeviceFunctionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceFunctionId'
    },
    privateDeviceFunctionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'privateDeviceFunctionId'
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
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'functionName',
      validate: {
        len: [1, 25]
      }
    },
    functionDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'functionDescription',
      validate: {
        len: [1, 50]
      }
    },
    functionDataType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'functionDataType'
    },
    particleFunctionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'particleFunctionName'
    },
    particleFunctionVariable: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleFunctionVariable'
    }
  }, {
    tableName: 'devicefunction'
  });
};
