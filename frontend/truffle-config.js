require('dotenv').config({ path: '.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const secret = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(secret, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
      network_id: 80001,
      gas: 20000000,
      gasPrice: 40000000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
  },
  contracts_directory: './contracts',
  contracts_build_directory: './abis',
  compilers: {
    solc: {
      version: '^0.8.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  db: {
    enabled: false,
  },

  plugins: ['truffle-plugin-verify'],

  api_keys: {
    polygonscan: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
  },
};
