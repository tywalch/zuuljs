/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vParticleDeviceKeyDetails', {
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'deviceId'
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceName'
    },
    particleDeviceName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleDeviceName'
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
    publicDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicDeviceId'
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
    },
    deviceCreatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'deviceCreatorId'
    },
    keyUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'keyUserId'
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
    particleToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleToken'
    }
  }, {
    tableName: 'view_particledevicekeydetails',
    scopes: {
      byAllAndPublicKeyId: (function (details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              keyUserId: details.userId,
              deviceUserId: details.userId,
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byUserAndPublicKeyId: (function (details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              keyUserId: details.userId
            }
          }
        }
      }),
      byOwnerAndPublicKeyId: (function (details) {
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
      byMakerAndPublicKeyId: (function (details) {
        return {
          where: {
            publicKeyId: details.publicKeyId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      }),
      byAllAndPublicKeyId: (function (details) {
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
      byUserAndPublicDeviceId: (function (details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              keyUserId: details.userId
            }
          }
        }
      }),
      byOwnerAndPublicDeviceId: (function (details) {
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
      byMakerAndPublicDeviceId: (function (details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              deviceCreatorId: details.userId
            }
          }
        }
      })
    }
  });
};
