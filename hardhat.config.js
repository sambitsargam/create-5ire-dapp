require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "testnet_5ire",
  networks: {
    testnet_5ire: {
      chainId: 997,
      url: "https://rpc-testnet.5ire.network/",
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
};
