// create your User model here

const { db } = require("../db/config.js"); //outside of model folder, inside db folder
const { DataTypes } = require("sequelize"); //so we be able to use the datatypes we need to use

const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
