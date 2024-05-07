const { db } = require("../db/config.js"); //outside of model folder, inside db folder
const { DataTypes } = require("sequelize"); //so we be able to use the datatypes we need to use

const Deck = db.define("Deck", {
  name: {
    type: DataTypes.STRING,
  },
  xp: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Deck;
