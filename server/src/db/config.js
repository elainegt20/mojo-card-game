// add your database connection here

//config---all contections in config folder

//import sequelize class
const Sequelize = require("sequelize");

//create an intance of the sequelize class
const db = new Sequelize({
  dialect: "sqlite",
  storage: "./my-database.sqlite",
});

module.exports = { db };
