const Greeter = artifacts.require("Greeter");

contract("Greeter", () => {
  let greeter;

  beforeEach(async () => {
    greeter = await Greeter.new("Hello, world!");
  });

  it("should return the greeting", async () => {
    const greeting = await greeter.greet();
    assert.strictEqual(greeting, "Hello, world!");
  });

  it("should set the greeting", async () => {
    const newGreeting = "Hello, Truffle!";
    await greeter.setGreeting(newGreeting);
    const greeting = await greeter.greet();
    assert.strictEqual(greeting, newGreeting);
  });
});
