const { db } = require("../db/config.js"); //outside of model folder, inside db folder
const { DataTypes } = require("sequelize"); //so we be able to use the datatypes we need to use

const Card = db.define("Card", {
  name: {
    type: DataTypes.STRING,
  },
  mojo: {
    type: DataTypes.INTEGER,
  },
  stamina: {
    type: DataTypes.INTEGER,
  },
  imgUrl: {
    type: DataTypes.STRING,
  },
});

module.exports = Card;
