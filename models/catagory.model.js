const { sequelize } = require("../config/postgres.config.js");
const {DataTypes} = require('sequelize')
const faq = require('./faq.model.js')

const catagory = sequelize.define('catagory',{
    id : {
     type : DataTypes.UUID,
     defaultValue : DataTypes.UUIDV4,
     primaryKey : true,
     allowNull : false
    },
    name : {
     type : DataTypes.STRING,
     allowNull : false
    },
    description : {
     type : DataTypes.STRING,
     allowNull : false
    }
  },
  {
   timestamps : true,
   createdAt : "created_at" ,
   updatedAt : "updated_at"
  })

  catagory.hasMany(faq,{foreignKey : 'catagory_id',onDelete : 'CASCADE'})
  faq.belongsTo(catagory,{foreignKey : "catagory_id"})
  module.exports = catagory