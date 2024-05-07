const { db } = require("../db/config.js"); //outside of model folder, inside db folder
const { DataTypes } = require("sequelize"); //so we be able to use the datatypes we need to use

const Attack = db.define("Attack", {
  title: {
    type: DataTypes.STRING,
  },
  mojoCost: {
    type: DataTypes.INTEGER,
  },
  staminaCost: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Attack;
