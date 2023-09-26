require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

// 给合约验证进行代理设置，使用前需要先安装undici，安装命令：npm install undici/yarn add -dev undici
const { setGlobalDispatcher, ProxyAgent } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:8890") // 代理地址,8890是梯子的代理端口
setGlobalDispatcher(proxyAgent)

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "http://sepolia:8545"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "keys"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "keys"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "keys"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL, // 你的私链地址
            accounts: [PRIVATE_KEY], // 你的私钥
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
        },
    },
    solidity: "0.8.19",
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
        timeout: 600000,
    },
    gasReporter: {
        enabled: true,
        output: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}
