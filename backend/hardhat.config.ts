/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "@openzeppelin/hardhat-upgrades";
import "solidity-coverage";

import { HardhatUserConfig, task } from "hardhat/config";

require("dotenv").config();

const config: HardhatUserConfig & {
  namedAccounts: {
    deployer: number
  }
} = {
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: ">=0.4.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: ">= 0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    localTest: {
      chainId: 31337,
      gas: 3000000,
      url: "http://127.0.0.1:8545/",
      accounts: [process.env.PK1!],
    },
    local: {
      chainId: 31337,
      gas: 3000000,
      url: "http://0.0.0.0:8545",
    },
    polygonTestnet: {
      gas: 3000000,
      chainId: 80001,
      url: "https://polygon-mumbai.g.alchemy.com/v2/Jcsa7sP9t3l4NPGg2pg9FDUMvVXt4Im-",
      accounts: [process.env.PK1!],
    },

  },
  // deterministicDeployment: (network: string) => {
  //   // Skip on hardhat's local network.
  //   if (network === "31337") {
  //       return undefined;
  //   }
  //   return {
  //       factory: "0x2222229fb3318a6375fa78fd299a9a42ac6a8fbf",
  //       deployer: "0x90899d3cc800c0a9196aec83da43e46582cb7435",
  //       // Must be deployed manually. Required funding may be more on
  //       // certain chains (e.g. Ethereum mainnet).
  //       funding: "10000000000000000",
  //       signedTx: "0x00",
  //   };
  // },
  paths: {
    sources: "contracts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
