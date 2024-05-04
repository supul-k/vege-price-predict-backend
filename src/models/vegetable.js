const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

class Vegetable extends Model {}

Vegetable.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todayprice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tomorrowprice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weeklyprice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'vegetable'
});

module.exports = Vegetable;