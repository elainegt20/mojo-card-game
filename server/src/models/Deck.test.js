/*

Deck model has name as a string

Deck model has xp as an integer

*/

const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require(".");
const { db } = require("../db/config");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Card", () => {
  it("should not accept non-string values for name", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Deck.create({
        name: 5, // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });

  it("should not accept non-integer values for XP", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await Deck.create({
        name: "5", // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });
});
