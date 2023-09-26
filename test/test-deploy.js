const { ethers } = require("hardhat")
const { expect, address, assert } = require("chai")

// 声明function的两种方法
// describe("PwangFirstContract",  () => {})
describe("PwangFirstContract", function () {
    let simpleStorageFactory, simpleSotrage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory(
            "PwangFirstContract"
        )
        simpleSotrage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleSotrage.retrieve()
        const expectedValue = 0

        assert.equal(currentValue, expectedValue)
        expect(currentValue).to.equal(expectedValue)
    })
    it.only("Should update when call store", async function () {
        const expectedValue = 13
        const transcationResponse = await simpleSotrage.store(expectedValue)
        await transcationResponse.wait(1)
        const currentValue = await simpleSotrage.retrieve()
        assert.equal(currentValue, expectedValue)
    })
})
