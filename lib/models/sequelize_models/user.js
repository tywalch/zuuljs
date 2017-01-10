/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'userId'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  }, {
    tableName: 'user'
  });
};
