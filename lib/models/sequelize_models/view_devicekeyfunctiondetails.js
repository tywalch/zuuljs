/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vDeviceKeyFunctionDetails', {
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
      defaultValue: "0",
      field: 'deviceName'
    },
    lastStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'lastStatus'
    },
    deviceFunctionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'deviceFunctionId'
    },
    publicDeviceFunctionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceFunctionId'
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
    particleFunctionVariable: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleFunctionVariable'
    },
    particleFunctionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'particleFunctionName'
    },
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: 'keyId',
      primaryKey: true
    },
    publicKeyId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'publicKeyId'
    },
    keyUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'keyUserId'
    },
    publicDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceId'
    },
    deviceUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'deviceUserId'
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
    particleToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleToken'
    }
  }, {
    tableName: 'view_devicekeyfunctiondetails',
    scopes: {
      byUserAndPublicKeyIdOrPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            $or: [
              {
                publicKeyId: details.publicKeyId,
                keyUserId: details.userId
              },
              {
                $or: {
                  deviceUserId: details.userId,
                  deviceCreatorId: details.userId
                },
                publicDeviceFunctionId: details.publicDeviceFunctionId
              }
            ]
          }
        }
      }),
      byUserAndPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId,
              keyUserId: details.userId
            }
          }
        }
      }),
      byOwnerAndPublicDeviceFunctionId: (function(details) {
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
      byMakerAndPublicDeviceFunctionId: (function(details) {
        return {
          where: {
            publicDeviceFunctionId: details.publicDeviceFunctionId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byUserAndPublicDeviceId: (function(details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              keyUserId: details.userId
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
      byUserAndPublicKeyId: (function(details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              keyUserId: details.userId
            }
          }
        }
      }),
      byOwnerAndPublicKeyId: (function(details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byMakerAndPublicKeyId: (function(details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byAllAndPublicKeyId: (function(details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              deviceUserId: details.userId,
              deviceCreatorId: details.userId,
              keyUserId: details.userId
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
