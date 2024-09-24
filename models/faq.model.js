const { sequelize } = require("../config/postgres.config.js");
const {DataTypes} = require('sequelize')

const faq = sequelize.define('faq',{
    id : {
     type : DataTypes.UUID,
     defaultValue : DataTypes.UUIDV4,
     primaryKey : true
    },
    catagory_id : {
     type :DataTypes.UUID,
     allowNull : false ,
     references : {
      model : 'catagories',
      key : 'id'
     }
    },
    question : {
     type : DataTypes.STRING,
     allowNull : false
    },
    answer : {
     type : DataTypes.STRING,
     allowNull : false
    }
   },
   {
    timestamps : true,
    createdAt : "created_at",
    updatedAt : "updated_at"
   })
   
   module.exports = faq