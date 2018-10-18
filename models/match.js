'use strict';

module.exports = function(sequelize , DataTypes){

const Match = sequelize.define('Match', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_user_1:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        id_user_2:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        id_category:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        status_user_1:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status_user_2:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    return Match;
};
