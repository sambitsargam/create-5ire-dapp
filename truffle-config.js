const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // set your default environment
  defaultNetwork: "development",
  // set your artifact location
  contracts_build_directory: "./src/abis",

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-testnet.5ire.network`),
      network_id: 997,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },


  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
    
  }
  
}