'use strict';

module.exports = function(sequelize , DataTypes){

const Proposition = sequelize.define('User', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false
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

    return Proposition;
};
