/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyFunctionAssignment', {
    keyFunctionAssignmentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'keyFunctionAssignmentId'
    },
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'devicekey',
        key: 'keyId'
      },
      field: 'keyId'
    },
    deviceFunctionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'devicefunction',
        key: 'deviceFunctionId'
      },
      field: 'deviceFunctionId'
    }
  }, {
    tableName: 'keyfunctionassignment',
    scopes: {
      byKey: function (details) {
        return {
          where: {
              keyId: details.keyId
          }
        }
      }
    }
  });
};
