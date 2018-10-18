'use strict';

module.exports = function(sequelize , DataTypes){

const Match = sequelize.define('Match', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        status_user_1:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_user_2:{
            type: DataTypes.INTEGER,
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

    Match.associate = _associate;
    return Match;
};

function _associate(models) {
    models.Match.belongsTo(models.User, {
        foreignKey: {
            name: 'user_id_1',
            allowNull: false
        }
    });
    models.Match.belongsTo(models.User, {
        foreignKey: {
            name: 'user_id_2',
            allowNull: false
        }
    });
    models.Match.belongsTo(models.Category, {
        foreignKey: {
            allowNull: false
        }
    }); 
}
