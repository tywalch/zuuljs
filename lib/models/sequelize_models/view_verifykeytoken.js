/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vVerifyKeyToken', {
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      field: 'keyId',
      primaryKey: true
    },
    publicKeyId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'publicKeyId'
    },
    keyToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'keyToken'
    }
  }, {
    tableName: 'view_verifykeytoken',
    scopes: {
      byToken: function (token) {
        return {
          where: {
            keyToken: token
          }
        }
      }
    }
  });
};
