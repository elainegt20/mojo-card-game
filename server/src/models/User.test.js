/*
User model has name as a string
*/

const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require(".");
const { User } = require(".");
const { db } = require("../db/config");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
  //model tests
  it("should not accept non-string values for name", async () => {
    // expect.assertions(1); // Ensure that a certain number of assertions are called.

    try {
      await User.create({
        name: 7, // Intentionally wrong data type
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Check if it throws an error
    }
  });
  //associations test
  it("One User and only one user can be added to the same Deck", async () => {
    //create a users
    const user1 = await User.create({ username: '"v1per"' });
    const user2 = await User.create({ username: "mr_spoon" });

    //create a deck
    const deck = await Deck.create({ name: "snake pit" });

    //associate user to deck
    await deck.setUser(user1);

    //try to associate user2 to deck
    await deck.setUser(user2);

    // verify that the original association has not changed
    const expectedUser = await deck.getUser();
    expect(expectedUser.id).toBe(user2.id); //new user is set but is not possible to add another
  });
});
