const User = require("./User");
const Deck = require("./Deck");
const Attack = require("./Attack");
const Card = require("./Card");
// import the rest of your models above

// set up the associations here

/*

User/Deck
Associate Users and Decks with a one-to-one relationship.

Each User may create exactly one Deck


*/

//one-to-one --->one element of A link to one element of B, and vice versa
//foreing key defined in target model (B)

User.hasOne(Deck);
Deck.belongsTo(User);

/*

Deck/Card
Associate Decks and Cards with a one-to-many association

Each Deck may contain many Cards. A Card may only belong to one Deck.


*/

Deck.hasMany(Card);
Card.belongsTo(Deck);

/*
Card/Attack
Associate Cards and Attacks with a many-to-many association

Each Card may have many Attacks. Each Attack may belong to many Cards.
*/

Card.belongsToMany(Attack, { through: "CardAttacks" });
Attack.belongsToMany(Card, { through: "CardAttacks" });

// and then export them all below
module.exports = { User, Deck, Attack, Card };
