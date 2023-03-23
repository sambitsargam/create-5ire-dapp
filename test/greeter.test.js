const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter contract", function() {
  let greeter;

  beforeEach(async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();
  });

  it("Should return the initial greeting", async function() {
    const greeting = await greeter.read();
    expect(greeting).to.equal("Hello, world!");
  });

  it("Should update the greeting", async function() {
    const newGreeting = "Hola, 5ire!";
    await greeter.write(newGreeting);
    const greeting = await greeter.read();
    expect(greeting).to.equal(newGreeting);
  });
});
