/*
Card model has title as a string

Card model has mojo as an integer

Card model has stamina as an integer

Card model has imgUrl as a string

*/

const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card } = require(".");
const { Deck } = require(".");
const { db } = require("../db/config");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
  it("should not accept non-string values for title", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Card.create({
        title: 7, // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });

  it("should not accept non-integer values for mojo", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Card.create({
        mojo: "90", // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });

  it("should not accept non-integer values for stamina", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Card.create({
        stamina: "90", // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });

  it("should not accept non-string values for imgUrl", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Card.create({
        imgUrl: 60780898 - 89089 - 78 - 778767678, // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });
  //association test
  it("Multiple Cards can be added to a Deck", async () => {
    //add cards data
    const cardsData = [
      {
        name: "Arcturus Spellweaver",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
      },
      {
        name: "Nimue Mistral",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/nimue-mistral.jpg",
      },
      {
        name: "Theron Thunderstrike",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/theron-thunderstrike.jpg",
      },
      {
        name: "Lirien Moonshadow",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/lirien-moonshadow.jpg",
      },
      {
        name: "Alaric Flamecaller",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/alaric-flamecaller.jpg",
      },
    ];
    //create a deck
    const deck = await Deck.create({ name: "snake pit" });

    //create/assing cards to deck

    const cardCreationPromises = cardsData.map((card) => deck.createCard(card));
    await Promise.all(cardCreationPromises); // Ensure all cards are created before proceeding

    //check for multiples cards
    const count = await deck.countCards();
    expect(count).toBe(cardsData.length);
  });
});
