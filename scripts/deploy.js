const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "PwangFirstContract"
    )
    console.log("deploying contract...")
    const simpleStorage = await simpleStorageFactory.deploy()
    // deployed()函数已经弃用了，现在需要使用waitForDeployment（）函数
    await simpleStorage.waitForDeployment()
    console.log(
        "contract deployed to:",
        (await simpleStorage.getAddress()).toString()
    )

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Wating for block txes")
        const contractresponse = simpleStorage.deploymentTransaction()
        // 等待6个区块确认
        await contractresponse.wait(6)
        await verify((await simpleStorage.getAddress()).toString(), [])
    }

    // 与合约交互

    // const currentValue = await simpleStorage.retrieve()
    // console.log("current value:", currentValue.toString())
    // const transcationResponse = await simpleStorage.store(13)
    // await transcationResponse.wait(1)
    // const updatedValue = await simpleStorage.retrieve()
    // console.log("updated value:", updatedValue.toString())
}

// 验证合约
// 声明function的另一种方法
// const verify = async (contractAddress, args) => {
async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
