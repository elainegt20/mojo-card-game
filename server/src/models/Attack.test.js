/*

Attack model has title as a string

Attack model has mojoCost as an integer

Attack model has staminaCost as an integer
*/

const { describe, expect, it, beforeAll, afterAll } = require("@jest/globals");
const { db } = require("../db/config");
const { Attack } = require(".");
const { Card } = require(".");

//clear db before each test
beforeAll(async () => {
  await db.sync({ force: true });
});

//clear db after each test
afterAll(async () => {
  await db.sync({ force: true });
});

describe("Attack", () => {
  it("should not accept non-string values for title", async () => {
    try {
      await Attack.create({
        title: 890,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("should not accept non-integer values for mojoCost", async () => {
    try {
      await Attack.create({
        mojoCost: "245",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should not accept non-inteter values for staminaCost", async () => {
    try {
      await Attack.create({
        staminaCost: "789",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  //association test
  it("Each Card may have many Attacks. Each Attack may belong to many Cards", async () => {
    // Creating multiple cards
    const card1 = await Card.create({ name: "Fire Princess" });
    const card2 = await Card.create({ name: "Ice Warrior" });
    const card3 = await Card.create({ name: "Storm Hunter" });

    // Creating multiple attacks
    const attack1 = await Attack.create({
      title: "Fire Blast",
      mojoCost: 20,
      staminaCost: 10,
    });
    const attack2 = await Attack.create({
      title: "Ice Shard",
      mojoCost: 15,
      staminaCost: 5,
    });
    const attack3 = await Attack.create({
      title: "Thunder Strike",
      mojoCost: 25,
      staminaCost: 15,
    });

    // Associating attacks with cards
    await card1.addAttacks([attack1, attack3]);
    await card2.addAttacks([attack2, attack3]);
    await card3.addAttacks([attack1, attack2, attack3]);

    // Checking associations for Card 1
    let attacks = await card1.getAttacks();
    expect(attacks.length).toBe(2);
    expect(attacks.map((a) => a.title)).toEqual(
      expect.arrayContaining(["Fire Blast", "Thunder Strike"])
    );

    // Checking associations for Card 2
    attacks = await card2.getAttacks();
    expect(attacks.length).toBe(2);
    expect(attacks.map((a) => a.title)).toEqual(
      expect.arrayContaining(["Ice Shard", "Thunder Strike"])
    );

    // Checking associations for Card 3
    attacks = await card3.getAttacks();
    expect(attacks.length).toBe(3);
    expect(attacks.map((a) => a.title)).toEqual(
      expect.arrayContaining(["Fire Blast", "Ice Shard", "Thunder Strike"])
    );

    // Additional checks for inverse relations (Attacks to Cards)
    let cardsForAttack = await attack1.getCards();
    expect(cardsForAttack.length).toBe(2);
    expect(cardsForAttack.map((c) => c.name)).toEqual(
      expect.arrayContaining(["Fire Princess", "Storm Hunter"])
    );

    cardsForAttack = await attack2.getCards();
    expect(cardsForAttack.length).toBe(2);
    expect(cardsForAttack.map((c) => c.name)).toEqual(
      expect.arrayContaining(["Ice Warrior", "Storm Hunter"])
    );

    cardsForAttack = await attack3.getCards();
    expect(cardsForAttack.length).toBe(3);
    expect(cardsForAttack.map((c) => c.name)).toEqual(
      expect.arrayContaining(["Fire Princess", "Ice Warrior", "Storm Hunter"])
    );
  });
});
