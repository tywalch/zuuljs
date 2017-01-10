/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vDeviceDetails', {
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'userId'
    },
    creatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'creatorId'
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
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deviceToken'
    }
  }, {
    tableName: 'view_devicedetails',
    scopes: {
      byMakerAndPublicDeviceId: function (details) {
        return {
          where: {
            creatorId: details.userId,
            publicDeviceId: details.publicDeviceId
          }
        }
      },
      byOwnerAndPublicDeviceId: function (details) {
        return {
          where: {
            publicDeviceId: details.publicDeviceId,
            $or: {
              userId: details.userId,
              creatorId: details.userId
            }
          }
        }
      },
      byOwner: function (details) {
        return {
          where: {
            $or: {
              userId: details.userId,
              creatorId: details.userId
            }
          }
        }
      }
    }
  });
};
