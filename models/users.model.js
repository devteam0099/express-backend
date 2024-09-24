const { sequelize } = require("../config/postgres.config.js");
const {DataTypes} = require('sequelize')

const users = sequelize.define('Users',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    role : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : true,
    createdAt : "created_at",
    updatedAt : "updated_at"
})
module.exports = users