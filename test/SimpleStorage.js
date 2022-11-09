const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
  let simpleStorage, deployer;
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    simpleStorage = await ethers.getContract("SimpleStorage", deployer);
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue)
  });
  it("Should update when we call store function", async function () {
    const expectedValue = "45";
    const response = await simpleStorage.store(expectedValue);
    await response.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  // Extra - this is not in the video
  it("Should work correctly with the people struct and mapping", async function () {
    const expectedName = "kaushlesh";
    const expectedFavNumber = "1993";
    const expectedAge = "29";
    const transactionResponse = await simpleStorage.addPerson(
      expectedName,
      expectedFavNumber,
      expectedAge
    );
    await transactionResponse.wait(1);
    const { name, favNum, age } = await simpleStorage.idToPersonDetails(0);
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedName);

    assert.equal(favNum, expectedFavNumber);

    assert.equal(age, expectedAge);
  });
});
