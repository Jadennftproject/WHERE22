require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
     
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/018a1557b0e34090a84c111da5c01426",
      accounts: ["PRIVATE_KEY"],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/9e4c4b48907f4beba4ca0f3cc9d50ea2",
      accounts: ["PRIVATE_KEY"],
      gas: 2100000,
      gasPrice: 30000000000,
    },/**,
    ropsten: {
      url: "https://ropsten.infura.io/v3/nada",
      accounts: ["nada"],
      gas: 2100000,
      gasPrice: 8000000000,
    }
    
    /** 
     *     hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/9e4c4b48907f4beba4ca0f3cc9d50ea2",
      accounts: ["nada"]
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/9e4c4b48907f4beba4ca0f3cc9d50ea2",
      accounts: ["nada"]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9e4c4b48907f4beba4ca0f3cc9d50ea2",
      accounts: ["nada"]
    }
    */
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "ETHERSCAN_KEY"
  }
};
