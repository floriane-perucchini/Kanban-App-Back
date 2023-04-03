const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class List extends Model {};
List.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    tableName: "list"
});

module.exports = List;