/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viewDevicefunctiondetails', {
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
      field: 'publicDeviceFunctionId',
      primaryKey: true
    },
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'functionName'
    },
    functionDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'functionDescription'
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
      field: 'deviceId',
      primaryKey: true
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceName'
    },
    deviceDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'deviceDescription'
    },
    lastStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'lastStatus'
    },
    deviceCreatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'deviceCreatorId'
    },
    particleDeviceId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleDeviceId'
    },
    deviceUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'deviceUserId'
    }
  }, {
    tableName: 'view_devicefunctiondetails',
    scopes: {
      byUserAndPublicDeviceId: (function(details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byOwnerAndPublicDeviceId: (function(details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byMakerAndPublicDeviceId: (function(details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byUserAndPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byUserAndPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byAllAndPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId,
            $or: {
              deviceCreatorId: details.userId,
              deviceUserId: details.userId,
              keyUserId: details.userId,
            }
          }
        }
      })
    }
  });
};
