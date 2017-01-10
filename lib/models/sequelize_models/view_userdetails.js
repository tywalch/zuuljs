/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vUserDetails', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'userId',
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'firstName'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'lastName'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    particleToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'particleToken'
    },
    publicUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicUserId'
    },
    privateUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'privateUserId'
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'bio'
    },
    keyCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: "0",
      field: 'keyCount'
    },
    deviceCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: "0",
      field: 'deviceCount'
    }
  }, {
    tableName: 'view_userdetails',
    scopes: {
      byUser: function (details) {
        return {
          where: {
              userId: details.userId
          }
        }
      },
      byEmail: function (details) {
        return {
          where: {
            email: details.email
          }
        }
      }
    }
  });
};
