const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Card extends Model {};

Card.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: DataTypes.INTEGER,
    color: DataTypes.TEXT,
    list_id: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: "card"
});

module.exports = Card;