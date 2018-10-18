'use strict';

module.exports = function(sequelize , DataTypes){

const Proposition = sequelize.define('Proposition', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    Proposition.associate = _associate;
    return Proposition;
};

function _associate(models) {
    models.Proposition.belongsTo(models.Category, {
        foreignKey: {
            allowNull: false
        }
    });

    models.Proposition.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    }); 
}